export const filesSelector = ({ converter: { files } }: any) => files;
export const countFilesSelector = ({ converter: { files } }: any) =>
  files.length;
export const convertedFilesSelector = ({ converter: { fileXls } }: any) =>
  fileXls;
