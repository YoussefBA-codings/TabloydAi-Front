import React from 'react';
import { Card, CardActions, Grid, Box, Stack, Divider } from '@mui/material';

const UploadComponent = () => {
  return (
    <Card sx={{ backgroundColor: 'grey', }}>
      <CardActions>
        <Stack direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ 'max-width': '100%' }}>
          <p>D&D</p>
          <p>Facultative Infos</p>
          <p>Convert</p>
        </Stack>

        {/* <Grid container>
          <Grid id="dragAndDrop" item lg={12} sx={{ backgroundColor: 'red' }}>D&D</Grid>
          <Grid id="facultativeInfos" item lg={12} sx={{ backgroundColor: 'green' }}>Facultative Infos</Grid>
          <Grid id="submitConvert" item lg={12} sx={{ backgroundColor: 'blue' }}>Convert</Grid>
        </Grid> */}
      </CardActions>
    </Card >
  );
};

export default UploadComponent;