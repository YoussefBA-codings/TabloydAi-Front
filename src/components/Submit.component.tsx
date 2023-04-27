import React from 'react';
// import { appUseSelector, appUseDispatch } from 'react-redux'

// Hooks import
import { useAppDispatch } from '@SRC/hooks';

// Store Imports
import { sendingFile } from '@SRC/store/converter';

// CSS Import

// MUI Export
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// Components Export

export default function UploadComponent({ disabled }: any) {
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        variant="contained"
        disabled={disabled}
        endIcon={<SendIcon />}
        onClick={() => {
          dispatch(sendingFile);
        }}>
        Send PDF
      </Button>
    </>
  );
}
