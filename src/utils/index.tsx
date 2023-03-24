export const getFileNameFromSrc = (fileName: string) =>
fileName.substring(fileName.lastIndexOf("/") + 1);