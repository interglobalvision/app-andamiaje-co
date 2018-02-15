export const getResizedImageUrl = (file, size, square) => {

  if(file === undefined) {
    return;
  }

  const name = file.name.replace(/\.[^/.]+$/, '');

  let thumbSuffixfix = '_' + size;

  if (square) {
    thumbSuffixfix += 'x' + size;
  }

  thumbSuffixfix += '_thumb';

  return file.downloadURL.replace(name, name + thumbSuffixfix);
};
