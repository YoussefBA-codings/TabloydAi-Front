import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

// Hooks Imports
import { useAppSelector, useAppDispatch } from '@SRC/hooks/store.hook';

// Store Imports
import {
  filesSelector,
  countFilesSelector
} from '@SRC/store/converter/selector';
import {
  appendFilesAction,
  removeFilesAction
} from '@SRC/store/converter/actions';

// CSS Imports
import dropzoneStyle from '@SRC/styles/dropzone.module.scss';

// MUI Imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

// Components Imports

const baseStyle = {
  height: '150px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#DDD',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#777',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function DropzoneComponent() {
  const dispatch = useAppDispatch();
  const files = useAppSelector(filesSelector);
  const countFiles = useAppSelector(countFilesSelector);

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      console.log(await acceptedFiles[0].arrayBuffer());
      dispatch(appendFilesAction(acceptedFiles));
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { 'application/pdf': [] }, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Card variant="outlined" className={dropzoneStyle.dropzoneArea}>
      <CardActions>
        <div {...getRootProps({ style } as any)}>
          <input {...getInputProps()} />
          <p>Drop Here</p>
        </div>
      </CardActions>
      {files ? (
        <CardContent>
          <aside>
            <p>countFiles : {countFiles}</p>
            <ul>
              {files.map((file: any, index: number) => (
                <li key={index}>
                  {file.path} - {file.size} bytes
                  <span> . </span>
                  <span
                    className="deleteFile"
                    onClick={() => dispatch(removeFilesAction(file))}>
                    x
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </CardContent>
      ) : null}
    </Card>
  );
}
