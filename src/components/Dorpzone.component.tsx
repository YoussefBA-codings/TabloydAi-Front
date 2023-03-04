import React,{ useCallback, useMemo} from 'react';
import {useDropzone} from "react-dropzone";

// CSS Import
import dropzoneStyle from "./../styles/dropzone.module.scss"

// MUI Import
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

// Components Import



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

let filesElement: any = null



export default function DropzoneComponent() {

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    filesElement = acceptedFiles.map((file: any) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ))
  }, [])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({ accept: { 'image/*': [] }, onDrop })
  
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);


  return (
    <Card variant="outlined" className={dropzoneStyle.dropzoneArea}>
      <CardActions>
        <div {...getRootProps({style} as any)}>
          <input {...getInputProps()}/>
          <p>Drop Here</p>
        </div>
      </CardActions>
      {
        filesElement
        ? <CardContent>
          <aside>
          <ul>{filesElement}</ul>
          </aside>
        </CardContent>
        : null
      }
    </Card>
  );
};

