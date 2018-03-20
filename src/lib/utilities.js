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

export const getBestVideoSrc = (targetWidth, sources) => {
  const targetSource = Object.keys(sources).find( index => index > targetWidth);
  return sources[targetSource];
}

export const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);

// requestAnimationFrame() shim by Paul Irish
requestAnimFrame = (function() {
	return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		};
})();

/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
export const requestInterval = (fn, delay) => {
	if( !window.requestAnimationFrame &&
	    !window.webkitRequestAnimationFrame &&
	    !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
	    !window.oRequestAnimationFrame &&
	    !window.msRequestAnimationFrame )
		return window.setInterval(fn, delay);

	var start = new Date().getTime(),
		handle = new Object();

	function loop() {
		var current = new Date().getTime(),
			delta = current - start;

		if(delta >= delay) {
			fn.call();
			start = new Date().getTime();
		}

		handle.value = requestAnimFrame(loop);
	};

	handle.value = requestAnimFrame(loop);
	return handle;
}

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
export const clearRequestInterval = (handle) => {
  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
  window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
  window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
  window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
  window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
  window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
  clearInterval(handle);
};
