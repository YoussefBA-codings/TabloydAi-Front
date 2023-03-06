import React from 'react';

// CSS Import
import converterStyle from '@/styles/converter/index.module.scss';

// MUI Export
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

// Components Export
import Submit from '@/components/Submit.component';
import DropzoneComponent from '@/components/Dorpzone.component';

export default function UploadComponent() {
  return (
    <Card className={converterStyle.uploadArea}>
      <CardActions>
        <Stack
          className={converterStyle.uploadArea__stack}
          divider={<Divider flexItem />}
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="space-around">
          <DropzoneComponent />
          {/* <p>Facultative Infos</p> */}
          <Submit />
        </Stack>
      </CardActions>
    </Card>
  );
}
