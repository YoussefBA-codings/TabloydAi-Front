import * as React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

// MUI Export
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Link,
  Container,
  Avatar,
  Tooltip,
  MenuItem
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

const settings = ['Porfile', 'Logout'];

export default function MainNavbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: string) => {
    if (/logout/i.test(setting)) {
      signOut();
    }

    setAnchorElUser(null);
  };

  const { data: session } = useSession();
  console.log(session);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none'
            }}>
            Tablify
          </Typography>

          {session?.user ? null : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  margin: '0 20px 0 0',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => signIn()}>
                SignIn
              </Link>
              <Link
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  margin: '0 20px 0 0',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                href="/account/signup">
                SignUp
              </Link>
            </Box>
          )}

          {session?.user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={
                      session?.user.fullName &&
                      typeof session.user.fullName !== 'string'
                        ? `${session?.user.fullName.firstName} ${session?.user.fullName.lastName}`
                        : session?.user.userName
                    }
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
