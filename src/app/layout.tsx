'use client';
import { ReactNode } from 'react';

// Store Imports
import { Provider } from 'react-redux';
import store from '@SRC/store';

// Sessions Import
import { SessionProvider } from 'next-auth/react';

// MUI Imports
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components Imports
import Copyright from '@SRC/components/Copyright.component';
import MainNavbar from '@SRC/components/MainNavbar.component';

interface IProps {
  children: ReactNode;
  session: any;
}

const theme = createTheme();

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="fr">
      <head>
        <title>Tablify</title>
      </head>
      <body>
        <Provider store={store}>
          <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MainNavbar />
              {children}
              <Copyright sx={{ mt: 5 }} />
            </ThemeProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
