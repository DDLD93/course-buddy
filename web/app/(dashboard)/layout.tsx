"use client"
import React from 'react'
import Header from '../(components)/Header'
import { Grid } from '@mui/material'
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { closeSidebar } from '../utils';

function Layout({ children }) {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin");
  //   },
  // });
  return (
    <Grid   >
      {/* side navigation */}
      <Sheet
        className="Sidebar"
        sx={{
          position: {
            xs: 'fixed',
            md: 'sticky',
          },
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
            md: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 10000,
          height: '100vh',
          width: 'var(--Sidebar-width)',
          top: 0,
          p: 2,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          // gap: 2,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <GlobalStyles
          styles={(theme) => ({
            ':root': {
              '--Sidebar-width': '220px',
              [theme.breakpoints.up('lg')]: {
                '--Sidebar-width': '240px',
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: 'fixed',
            zIndex: 9998,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            opacity: 'var(--SideNavigation-slideIn)',
            backgroundColor: 'var(--joy-palette-background-backdrop)',
            transition: 'opacity 0.4s',
            transform: {
              xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
              lg: 'translateX(-100%)',
            },
          }}
          // onClick={() => closeSidebar()}
        />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton>
          <Typography level="title-lg">Acme Co.</Typography>
        </Box>
        <Divider />
        <Box
        // sx={{
        //   minHeight: 0,
        //   overflow: 'hidden auto',
        //   flexGrow: 1,
        //   display: 'flex',
        //   flexDirection: 'column',
        //   [`& .${listItemButtonClasses.root}`]: {
        //     gap: 0,
        //   },
        // }}
        >
          <List
            size="sm"
            sx={{
              mt: 3,
              flexGrow: 0,
              '--ListItem-radius': (theme) => theme.vars.radius.sm,
              '--List-gap': '8px',
              mb: 2,
            }}
          >
            <ListItem>
              <ListItemButton>
                <SupportRoundedIcon />
                Support
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <SettingsRoundedIcon />
                Settings
              </ListItemButton>
            </ListItem>
          </List>
          <Card
            invertedColors
            variant="soft"
            color="warning"
            size="sm"
            sx={{ boxShadow: 'none' }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography level="title-sm">Used space</Typography>
              <IconButton size="sm">
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
            <Typography level="body-xs">
              Your team has used 80% of your available space. Need more?
            </Typography>
            <LinearProgress variant="outlined" value={80} determinate sx={{ my: 1 }} />
            <Button size="sm" variant="solid">
              Upgrade plan
            </Button>
          </Card>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Avatar
            variant="outlined"
            size="sm"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">Siriwat K.</Typography>
            <Typography level="body-xs">siriwatk@test.com</Typography>
          </Box>
          <IconButton size="sm" variant="plain" color="neutral">
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Sheet>
      <Grid>
      <Header />
        {children}
      </Grid>
    </Grid>
  )
}

export default Layout
