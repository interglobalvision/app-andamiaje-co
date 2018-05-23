// Redux Persist Migration
// https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
export const migrations = {
  1: ({ _persist }) =>
    ({ _persist }), // reset all state, except version
  2: state => ({
    ...state,
    catalogos: undefined,
    countdown: undefined,
    calendar: undefined,
  }),
  3: state => ({
    ...state,
    catalogos: undefined,
    countdown: undefined,
    calendar: undefined,
  }),
  4: state =>
    ({
      ...state,
      countdown: undefined,
      calendar: undefined,
    }), // reset countdown and calendar
  5: state =>
    ({
      ...state,
      countdown: undefined,
      calendar: undefined,
    }), // reset countdown and calendar
  6: state =>
    ({
      ...state,
      lotes: undefined,
      obras: undefined,
      collection: undefined,
    }), // reset lotes, obras and collection
};
