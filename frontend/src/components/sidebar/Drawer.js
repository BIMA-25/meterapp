import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import BookIcon from '@mui/icons-material/Book';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between', // Adjusted to space between
}));

// Import halaman-halaman dari direktori pages
const CekTagihan = React.lazy(() => import('../../pages/CekTagihan'));
const CekKeuangan = React.lazy(() => import('../../pages/CekKeuangan'));
const CatatMeter = React.lazy(() => import('../../pages/CatatMeter'));
const CatatKeuangan = React.lazy(() => import('../../pages/CatatKeuangan'));
const TarifPelanggan = React.lazy(() => import('../../pages/TarifPelanggan'));
const ManagemenAkun = React.lazy(() => import('../../pages/ManagemenAkun'));

// Mapping judul menu dengan ikon yang sesuai
const menuIcons = {
  'Cek Tagihan': <PaymentOutlinedIcon />,
  'Cek Keuangan': <RateReviewOutlinedIcon />,
  'Catat Meter': <AccountBalanceIcon />,
  'Catat Keuangan': <PaymentIcon />,
  'Tarif Pelanggan': <BookIcon />,
  'Managemen Akun': <SettingsIcon />,
};

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('MeterApp');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (title) => {
    setPageTitle(title);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
<DrawerHeader sx={{ backgroundColor: '#1E90FF' }}>
  <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
    MeterApp
  </Typography>
  <IconButton onClick={handleDrawerClose}>
    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
  </IconButton>
</DrawerHeader>

          <Divider />
          {/* Menu Section 1: Cek Tagihan & Cek Keuangan */}
          <List >
            {[
              { text: 'Cek Tagihan', component: CekTagihan },
              { text: 'Cek Keuangan', component: CekKeuangan },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={`/${item.text.toLowerCase().replace(/\s/g, '-')}`} onClick={() => handleMenuClick(item.text)}>
                  <ListItemIcon>
                    {menuIcons[item.text]}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          {/* Menu Section 2: Menu Lainnya */}
          <List>
            {[
              { text: 'Catat Meter', component: CatatMeter },
              { text: 'Catat Keuangan', component: CatatKeuangan },
              { text: 'Tarif Pelanggan', component: TarifPelanggan },
              { text: 'Managemen Akun', component: ManagemenAkun },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={`/${item.text.toLowerCase().replace(/\s/g, '-')}`} onClick={() => handleMenuClick(item.text)}>
                  <ListItemIcon>
                    {menuIcons[item.text]}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {[
                { text: 'Cek Tagihan', component: CekTagihan },
                { text: 'Cek Keuangan', component: CekKeuangan },
                { text: 'Catat Meter', component: CatatMeter },
                { text: 'Catat Keuangan', component: CatatKeuangan },
                { text: 'Tarif Pelanggan', component: TarifPelanggan },
                { text: 'Managemen Akun', component: ManagemenAkun },
              ].map((item) => (
                <Route
                  key={item.text}
                  path={`/${item.text.toLowerCase().replace(/\s/g, '-')}`}
                  element={<item.component />}
                />
              ))}
            </Routes>
          </Suspense>
        </Main>
      </Box>
    </Router>
  );
}