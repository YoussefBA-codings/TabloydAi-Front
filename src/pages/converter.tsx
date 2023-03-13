import dynamic from 'next/dynamic';
import React from 'react';
import { useSelector } from 'react-redux';

// Store Import
import { RootState } from '@/store';

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
  const fileXls = useSelector((state: RootState) => {
    return state.converter.fileXls;
  });

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
          {fileXls ? <NoSsrCheckerComponent /> : null}
        </Grid>
      </Grid>
    </>
  );
}
