import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Store Imports
import { RootState } from '@/store';
import { sendFile } from '@/store/converter';

// CSS Import
import converterStyle from '@/styles/converter/index.module.scss';

// MUI Export
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// Components Export

export default function UploadComponent() {
  const dispatch = useDispatch();
  const countFiles = useSelector((state: RootState) => {
    return state.converter.files.length;
  });

  return (
    <>
      <Button
        variant="contained"
        disabled={countFiles > 0 ? undefined : true}
        endIcon={<SendIcon />}
        onClick={() => {
          dispatch(sendFile);
        }}>
        Send PDF
      </Button>
    </>
  );
}
