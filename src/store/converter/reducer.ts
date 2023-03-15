import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import fs from 'fs';

import {
  APPEND_FILE_ACTION,
  LOAD_CONVERTED_FILE_ACTION,
  REMOVE_FILE_ACTION
} from '@/store/constants';
import { loadedFilesAction } from '@/store/converter/actions';
import { RootState } from '@/store';

const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU4ODI0YTI2ZjFlY2Q1NjEyN2U4OWY1YzkwYTg4MDYxMTJhYmU5OWMiLCJ0eXAiOiJKV1QifQ.eyJleHBpcmVzSW4iOjEsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS90YWJsb3lkYWkiLCJhdWQiOiJ0YWJsb3lkYWkiLCJhdXRoX3RpbWUiOjE2Nzg0Njc5NjQsInVzZXJfaWQiOiIwMDI4YTI1YS03MzdhLTQyNGEtOWVlYy1mYTViZDA0NDE0ZjgiLCJzdWIiOiIwMDI4YTI1YS03MzdhLTQyNGEtOWVlYy1mYTViZDA0NDE0ZjgiLCJpYXQiOjE2Nzg0Njc5NjQsImV4cCI6MTY3ODQ3MTU2NCwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.FPJoLXoRkrgNbAzPeQfIaRnI46mlztx2cEQO_Bf6UKUeIGFka01BMmo2P_2xIIjvOyggQO4ENLtt98lymzSBiZ2Smm4EpBbnXeOywvqx-89gTepogBg2y7W-iknXtNh0P7kJgottFBuxB_L8enuivSwAtzM6VXtP3baseCgtpFGg-wb9zxn7cl4Niw2CARqGgD01NC52w84xFXzeSpUCoWNPMcX8--LToH8rP0RH_Pgq2uzkSRzhwr-6r-AV3IXTTL1FJVvXPJeSp-EN8BMKiYXhLn8Rx2_95vmE1WMAG_qVvkt5ynBhpFjxrKFNRZw8UsGdg6qJd7nf6oDCZqz-5w';

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

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  const response = await axios({
    headers: {
      'content-type': 'multipart/form-data'
    },
    url: 'http://localhost:3000/api/upload',
    method: 'post',
    data: formData
  });

  const xlsBlob = new ArrayBuffer(response.data.length);
  // console.log(response);
  console.log(xlsBlob);

  // TODO : Extraire DATA
  // const urlXls = URL.createObjectURL(xlsBlob);
  // const xlsReadableStream = fs.createReadStream(urlXls);

  dispatch(loadedFilesAction(xlsBlob));
};
