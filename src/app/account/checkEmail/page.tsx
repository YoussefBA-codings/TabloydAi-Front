'use client';
import * as React from 'react';
import * as Router from 'next/navigation';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Services Imports
import { AuthService } from '@SRC/services';

export default function SignUp() {
  const [error, setError] = React.useState(Object);
  const searchParams = Router.useSearchParams();
  const registrationToken: string | null | undefined =
    searchParams?.get('token');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { verificationCode } = event.currentTarget;
    await AuthService.register(
      registrationToken as string,
      verificationCode.value
    ).catch((error) => {
      setError(error);
    });

    if (
      !error ||
      (error && typeof error === 'object' && Object.keys(error).length === 0)
    ) {
      window.location.href = `${process.env.NEXTAUTH_URL}/account/signin`;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify your email.
        </Typography>
        {error ? <div>{error?.data?.message}</div> : ''}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="verificationCode"
                label="Verification Code"
                name="verificationCode"
                autoComplete="verificationCode"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
