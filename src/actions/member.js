import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { showNotification } from './toastActions';
import { Firebase, FirebaseRef } from '../lib/firebase';
import { Actions } from 'react-native-router-flux';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import Sentry from 'sentry-expo';

export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'USER_ERROR',
    data: message,
  })));
}
/**
  * Sign Up to Firebase
  */
export function signUp(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Send user details to Firebase database
        if (res && res.uid) {
          FirebaseRef.child(`users/${res.uid}`).set({
            firstName,
            lastName,
            signedUp: Firebase.database.ServerValue.TIMESTAMP,
            lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
          }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));
        }
      }).catch(reject);
  }).catch(async (err) => {

    // capture the exception
    Sentry.captureException(new Error(error));

    await statusMessage(dispatch, 'error', err.message); throw err.message;
  });
}

/**
  * Get this User's Details
  */
function getUserData(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;

  const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    // Set the user context in Sentry
    Sentry.setUserContext({
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role,
      tokens: userData.tokens,
    });

    return dispatch({
      type: 'USER_DETAILS_UPDATE',
      data: userData,
    });
  });
}

/**
  * Get this User's Details
  */
export function getUser(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) {
    return () => new Promise(resolve => resolve());
  }

  return dispatch => new Promise(resolve => FirebaseRef.child(`users/${UID}`)
    .on('value', (snapshot) => {
      const userData = snapshot.val() || [];

      // Set the user context in Sentry
      Sentry.setUserContext({
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        tokens: userData.tokens,
      });

      return resolve(dispatch({
        type: 'USER_DETAILS_UPDATE',
        data: userData,
      }));
    }))
    .catch(error => {
      console.log(error);

      // capture the exception
      Sentry.captureException(new Error(error));
    });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {
  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) {
      showNotification(dispatch, ErrorMessages.missingEmail);
      return reject(new Error(ErrorMessages.missingEmail));
    }
    if (!password) {
      showNotification(dispatch, ErrorMessages.missingPassword);
      return reject(new Error(ErrorMessages.missingPassword));
    }

    // Go to Firebase
    return Firebase.auth()
      .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
      .then(() =>
        Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (res) => {
            if (res && res.uid) {
              // Update last logged in data
              FirebaseRef.child(`users/${res.uid}`).update({
                lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
              });

              // Send verification Email when email hasn't been verified
              if (res.emailVerified === false) {
                Firebase.auth().currentUser
                  .sendEmailVerification()
                  .catch(() => console.log('Verification email failed to send'));
              }

              // Get User Data
              getUserData(dispatch);
            }

            await statusMessage(dispatch, 'loading', false);

            // Send Login data to Redux
            return resolve(dispatch({
              type: 'USER_LOGIN',
              data: res,
            }));
          }).catch(reject));
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);

    let toastMessage = err.message;

    if (err.code === 'auth/invalid-email') { toastMessage = ErrorMessages.invalidEmail }
    if (err.code === 'auth/invalid-password') { toastMessage = ErrorMessages.wrongPassword }
    if (err.code === 'auth/wrong-password') { toastMessage = ErrorMessages.wrongPassword }
    if (err.code === 'auth/user-not-found') { toastMessage = ErrorMessages.userNotFound }
    if (err.code === 'auth/auth/internal-error') { toastMessage = ErrorMessages.internalError }

    showNotification(dispatch, toastMessage);

    throw err.message;
  });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => statusMessage(dispatch, 'loading', false).then(resolve(dispatch({ type: 'USER_RESET' }))))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
    }

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ firstName, lastName })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        await getUserData(dispatch);
        await statusMessage(dispatch, 'success', 'Profile Updated');
        resolve();
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'USER_RESET' });
        Actions.login({type: 'reset'});
        setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Wishlist
  */
export function addToWishlist(addedLote) {

  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  // remove undefined data
  const cleanLote = _omitBy(addedLote, _isNil);

  return (dispatch) => {
    // Get user ID
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: 'Not logged in' });

    // push lote to wishlist on firebase
    return new Promise(resolve => FirebaseRef.child(`users/${UID}/wishlist`)
      .push(cleanLote).then(() => {

        // dispatch action to add lote to wishlist on state
        return resolve(dispatch({
          type: 'USER_WISHLIST_ADD',
          addedLote: cleanLote,
        }));
      }))
      .then(showNotification(dispatch, 'Añadida a tu lista de Deseos'))
      .catch((e) => {
        console.log(e);
        // capture the exception
        Sentry.captureException(new Error(e));
      });
  }
}

export function removeFromWishlist(removedLote) {

  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return (dispatch) => {
    // Get user ID
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: 'Not logged in' });
    let wishlist = {};

    return new Promise((resolve) => FirebaseRef.child(`users/${UID}/wishlist`)
      .once('value')
      .then((snapshot) => {
        wishlist = snapshot.val() || {};

        // delete lote from object
        for(var lote in wishlist) {
          if(wishlist[lote].id == removedLote.id) {
            delete wishlist[lote];
          }
        }

        // update wishlish object in firebase
        FirebaseRef.child(`users/${UID}`).update({wishlist: wishlist});
      })
      .then(() => {

        // dispatch action to remove lote from wishlist on state
        return resolve(dispatch({
          type: 'USER_WISHLIST_REMOVE',
          wishlist,
        }));

      }))
      .then(showNotification(dispatch, 'Eliminada de tu lista de Deseos'))
      .catch((e) => {
        console.log(e);
        // capture the exception
        Sentry.captureException(new Error(e));
      });
  }

}
