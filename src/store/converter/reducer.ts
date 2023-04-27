import { AnyAction, Dispatch } from '@reduxjs/toolkit';

import {
  APPEND_FILE_ACTION,
  LOAD_CONVERTED_FILE_ACTION,
  REMOVE_FILE_ACTION
} from '@SRC/store/constants';
import { loadedFilesAction } from '@SRC/store/converter/actions';
import { RootState } from '@SRC/store';
import { ConverterService } from '@SRC/services/converter.service';

interface ConverterState {
  files: File[];
  fileXls: string;
}

const initialState: ConverterState = {
  files: [],
  fileXls: ''
};

export const converterReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case APPEND_FILE_ACTION:
      if (Array.isArray(action.payload))
        return { ...state, files: [...state.files, ...action.payload] };
      else return { ...state, files: [...state.files, action.payload] };

    case REMOVE_FILE_ACTION:
      const files = JSON.parse(JSON.stringify(state.files));
      files.splice(files.indexOf(action.payload), 1);
      return { ...state, files };

    case LOAD_CONVERTED_FILE_ACTION:
      return { ...state, fileXls: action.payload };

    default:
      return state;
  }
};

export const sendingFile = async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const {
    converter: { files }
  } = getState();

  const formData = new FormData();
  formData.append('file', files[0]);

  const response = await ConverterService.convert(formData);

  const xlsBlob = new ArrayBuffer(response.length);
  console.log(xlsBlob);

  // TODO : Extraire DATA
  // const urlXls = URL.createObjectURL(xlsBlob);
  // const xlsReadableStream = fs.createReadStream(urlXls);

  dispatch(loadedFilesAction(xlsBlob));
};
