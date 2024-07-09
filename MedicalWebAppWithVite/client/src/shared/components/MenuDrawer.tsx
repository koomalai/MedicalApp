import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useState } from "react";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const menuItems = [
    {
        icon: <HomeIcon />,
        name: "Home",
        path: "/homepage",
    },
    {
        icon: <InboxIcon />,
        name: "Inbox",
        path: "/",
    },
];

const MenuDrawer = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <IconButton size='large' edge='start' color='inherit' onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ display: "inline-flex", flexDirection: "column", minHeight: "100%" }}>
                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        href="/homepage"
                        sx={{
                            m: 2,
                            fontFamily: "Roboto",
                            fontWeight: 700,
                            letterSpacing: "0rem",
                            color: "blue",
                            textDecoration: "none",
                            alignText: "center",
                            display: "inline-flex"
                        }}
                    >
                        <div><Logo sx={{ display: "inline-flex", direction: "column", alignItems: "center", justifyContent: "center" }} /> My Medical Shop</div>
                    </Typography>
                    <List component="nav" sx={{ p: 2.5 }}>
                        {menuItems.map((item) => (
                            <ListItem
                                key={item.name}
                                {...{ to: item.path }}
                                component={Link}
                                sx={{ alignSelf: 'center' }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ color: "inherit", bgcolor: "transparent" }}>
                                        {item.icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List component="nav" sx={{ p: 1 }}>
                        <ListItem>
                            <ListItemButton aria-label="logout"
                                color="secondary">
                                <ListItemAvatar>
                                    <Avatar sx={{ color: "blue", bgcolor: "transparent" }}>
                                        <ExitToAppIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={"Log Out"}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
export default MenuDrawer