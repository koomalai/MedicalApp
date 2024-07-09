import { ShoppingCart } from "@mui/icons-material"
import { AppBar, Avatar, Badge, Box, Container, IconButton, Toolbar, Typography } from "@mui/material"
import MenuDrawer from "./MenuDrawer";

const Header = () => {
    return (
        <div>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box>
                            <MenuDrawer />
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: "0 rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            My Medical Shop
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        </Box>
                        <IconButton color="inherit" >
                            <Badge badgeContent={1} color="error">
                                <ShoppingCart color="inherit" />
                            </Badge>
                        </IconButton>
                        <Box sx={{ flexGrow: 0 }}>
                        </Box>
                        <IconButton>
                            <Avatar />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
export default Header;