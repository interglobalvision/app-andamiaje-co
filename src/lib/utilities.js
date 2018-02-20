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
