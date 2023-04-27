import React from 'react';
import { useSession } from 'next-auth/react';

// CSS Import
import converterStyle from '@SRC/styles/converter/index.module.scss';

// MUI Export
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

// Components Export
import Submit from '@SRC/components/Submit.component';
import DropzoneComponent from '@SRC/components/Dorpzone.component';

// Service Import

// Hooks import
import { useAppSelector } from '@SRC/hooks';

// Store Imports
import { countFilesSelector } from '@SRC/store/converter';

export default function UploadComponent() {
  const { data: session } = useSession();
  const countFiles = useAppSelector(countFilesSelector);

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
          {session?.user ? (
            <div>
              <p>Username : {session?.user.userName}</p>
              <p>Credit : {session?.user.conversionToken}</p>
            </div>
          ) : (
            <div>
              Sign In{' '}
              <Link href="/account/signin" variant="body2">
                here
              </Link>{' '}
              to use the converter.
            </div>
          )}
          {/* <p>Facultative Infos</p> */}
          <Submit
            disabled={countFiles > 0 && session?.user ? undefined : true}
          />
        </Stack>
      </CardActions>
    </Card>
  );
}
