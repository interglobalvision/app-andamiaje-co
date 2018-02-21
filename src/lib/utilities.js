import { Dimensions } from 'react-native';
import imageSizes from '../native/constants/imageSizes';

export const getResizedImageUrl = (file, size, square) => {

  if(file === undefined) {
    return;
  }

  let name = file.name.replace(/\.[^/.]+$/, '');

  let thumbSuffixfix = '_' + size;

  if (square) {
    thumbSuffixfix += 'x' + size;
  }

  thumbSuffixfix += '_thumb';

  // Encode string
  name = encodeURIComponent(name);
  thumbSuffixfix = encodeURIComponent(thumbSuffixfix);

  return file.downloadURL.replace(name, name + thumbSuffixfix);
};

export const getBestImageSize = () => {
  let bestImageSize = 0;
  const windowWidth = Dimensions.get('window').width;

  for (i = 1; i < imageSizes.length; i++) {
    bestImageSize = imageSizes[i];

    if (bestImageSize > windowWidth) {
      break;
    }
  }

  return bestImageSize;
}

export const getScaledImageDimensions = (imageWidth, imageHeight) => {
  let imageDimensions = {};
  const windowWidth = Dimensions.get('window').width;

  if (imageHeight > imageWidth) {
    const imageStyleWidth = (windowWidth / imageHeight) * imageWidth;

    imageDimensions = {
      height: windowWidth,
      width: imageStyleWidth
    }
  } else {
    const imageStyleHeight = (windowWidth / imageWidth) * imageHeight;

    imageDimensions = {
      width: windowWidth,
      height: imageStyleHeight
    }
  }

  return imageDimensions;
}
