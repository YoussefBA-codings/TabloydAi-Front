import {
  APPEND_FILE_ACTION,
  REMOVE_FILE_ACTION,
  LOAD_CONVERTED_FILE_ACTION
} from '@SRC/store/constants';

export const appendFilesAction = (files: any) => ({
  type: APPEND_FILE_ACTION,
  payload: files
});

export const removeFilesAction = (file: any) => ({
  type: REMOVE_FILE_ACTION,
  payload: file
});

export const loadedFilesAction = (convertFiles: any) => ({
  type: LOAD_CONVERTED_FILE_ACTION,
  payload: convertFiles
});
