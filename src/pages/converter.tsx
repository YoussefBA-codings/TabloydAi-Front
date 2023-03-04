import React from 'react';

// CSS Import
import converterStyle from "@/styles/converter/index.module.scss"

// MUI Export
import Grid from '@mui/material/Grid';

// Components Export
import UploadComponent from '@/components/UploadComponent.component'
import CheckerComponent from '@/components/CheckerComponent.component'



export default function Converter() {
  return (
    <>
      <Grid container justifyContent="space-between" rowSpacing={0} className={converterStyle.converterContainer}>
        <Grid item lg={4} className={converterStyle.converterGridItems}>
          <UploadComponent />
        </Grid>
        <Grid item lg={8} className={converterStyle.converterGridItems}>
          <CheckerComponent />
        </Grid>
      </Grid>
    </>
  );
};