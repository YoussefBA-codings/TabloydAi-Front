import dynamic from 'next/dynamic';
import React from 'react';

// CSS Import
import converterStyle from '@/styles/converter/index.module.scss';

// MUI Export
import { Grid } from '@mui/material';

// Components Export
import UploadComponent from '@/components/UploadComponent.component';
const NoSsrCheckerComponent = dynamic(
  () => import('@/components/CheckerComponent.component'),
  { ssr: false }
);

export default function Converter() {
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        rowSpacing={0}
        className={converterStyle.converterContainer}>
        <Grid item lg={4} className={converterStyle.converterGridItems}>
          <UploadComponent />
        </Grid>
        <Grid item lg={8} className={converterStyle.converterGridItems}>
          <NoSsrCheckerComponent />
        </Grid>
      </Grid>
    </>
  );
}
