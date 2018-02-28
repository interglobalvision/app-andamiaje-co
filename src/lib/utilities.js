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

export const getBestImageSize = (containerWidth = Dimensions.get('window').width) => {
  let bestImageSize = 0;

  for (i = 1; i < imageSizes.length; i++) {
    bestImageSize = imageSizes[i];

    if (bestImageSize > containerWidth) {
      break;
    }
  }

  return bestImageSize;
}

export const getScaledImageDimensions = (imageWidth, imageHeight, containerWidth = Dimensions.get('window').width) => {
  let imageDimensions = {};

  if (imageHeight > imageWidth) {
    const imageStyleWidth = (containerWidth / imageHeight) * imageWidth;

    imageDimensions = {
      height: containerWidth,
      width: imageStyleWidth
    }
  } else {
    const imageStyleHeight = (containerWidth / imageWidth) * imageHeight;

    imageDimensions = {
      width: containerWidth,
      height: imageStyleHeight
    }
  }

  return imageDimensions;
}

export const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);
