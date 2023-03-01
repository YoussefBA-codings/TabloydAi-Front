import React from 'react';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';

import ResponsiveAppBar from '@/components/navbar'
import UploadComponent from '@/components/UploadComponent.component'
import CheckerComponent from '@/components/CheckerComponent.component'

const converter = () => {
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />

      <Grid container justifyContent="space-between" sx={{ padding: '24px', height: '100vh', backgroundColor: 'pink' }}>
        <Grid item lg={3.7}>
          <UploadComponent />
        </Grid>
        <Grid item>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item lg={8}>
          <CheckerComponent />
        </Grid>
      </Grid>
    </>
  );
};

export default converter;