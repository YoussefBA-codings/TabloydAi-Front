import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';

interface ConverterState {
  files: any[];
}

const initialState: ConverterState = {
  files: []
};

export const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    appendFile: (state, action: PayloadAction<[]>) => {
      if (Array.isArray(action.payload)) state.files.push(...action.payload);
      else state.files.push(action.payload);
    },
    removeFile: (state, action: PayloadAction<number>) => {
      state.files.splice(state.files.indexOf(action.payload), 1);
    },
    sendFile: (state, action: PayloadAction<[]>) => {
      // TODO: Use API route to convert PDF file to XLS file
    }
  }
});

export const { appendFile, removeFile, sendFile } = converterSlice.actions;

export const files = (state: RootState) => state.converter.files;
export const filesCount = (state: RootState) => state.converter.files.length;

export default converterSlice.reducer;
