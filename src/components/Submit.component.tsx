import React from 'react';
// import { appUseSelector, appUseDispatch } from 'react-redux'

// Hooks import
import { useAppDispatch, useAppSelector } from '@/hooks';

// Store Imports
import { sendingFile, countFilesSelector } from '@/store/converter';

// CSS Import
import converterStyle from '@/styles/converter/index.module.scss';

// MUI Export
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// Components Export

export default function UploadComponent({ disabled }: any) {
  const dispatch = useAppDispatch();
  // const countFiles = useAppSelector(countFilesSelector);

  return (
    <>
      <Button
        variant="contained"
        disabled={disabled}
        // disabled={countFiles > 0 ? undefined : true}
        endIcon={<SendIcon />}
        onClick={() => {
          dispatch(sendingFile);
        }}>
        Send PDF
      </Button>
    </>
  );
}
