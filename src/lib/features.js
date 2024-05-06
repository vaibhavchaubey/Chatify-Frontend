const fileFormat = (url = '') => {
  const fileExe = url.split('.').pop();
  if (fileExe === 'mp4' || fileExe === 'webm' || fileExe === 'ogg') {
    return 'video';
  }

  if (fileExe === 'mp3' || fileExe === 'wav') {
    return 'audio';
  }

  if (
    fileExe === 'png' ||
    fileExe === 'jpg' ||
    fileExe === 'jpeg' ||
    fileExe === 'gif'
  ) {
    return 'image';
  }

  return 'file';
};

const transformImage = (url, width = 100) => url;

export { fileFormat, transformImage };
