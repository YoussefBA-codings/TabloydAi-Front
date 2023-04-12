import React from 'react';
// Types Import
import { User } from '#/@types/user';

// CSS Import
import converterStyle from '@/styles/converter/index.module.scss';

// MUI Export
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

// Components Export
import Submit from '@/components/Submit.component';
import DropzoneComponent from '@/components/Dorpzone.component';

// Service Import
import { UserService } from '@/services';

// Hooks import
import { useAppDispatch, useAppSelector } from '@/hooks';

// Store Imports
import { sendingFile, countFilesSelector } from '@/store/converter';

export default function UploadComponent() {
  const countFiles = useAppSelector(countFilesSelector);
  const [isConnected, setIsConnected] = React.useState(false);
  const [user, setUser] = React.useState<User>({
    id: '',
    userName: '',
    email: ''
  });

  React.useEffect(() => {
    const us = new UserService(localStorage.getItem('user'));
    setIsConnected(us.isConnected);

    if (isConnected) {
      us.getConnectedUser().then((user) => {
        setUser(user);
      });
    }
  }, [isConnected]);

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
          {isConnected ? (
            <div>
              <p>Username : {user.userName}</p>
              <p>Credit : {user.conversionToken}</p>
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
          <Submit disabled={countFiles > 0 && isConnected ? undefined : true} />
        </Stack>
      </CardActions>
    </Card>
  );
}
