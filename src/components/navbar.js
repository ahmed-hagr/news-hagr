import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchBar from "./SearchBar"; 
import FeedIcon from "@mui/icons-material/Feed";
import { useTheme } from "@mui/material/styles";

const navItems = [
  { text: "news-org", link: "/news-org" },
  { text: "api-new", link: "/api-new" },
  { text: "setting", link: "/setting" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        textAlign: "center",
        "& .MuiListItemButton-root": {
          justifyContent: "center",
        },
      }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <List>
        {navItems.map((item,index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.link}
              sx={{ textAlign: "center", color: theme.palette.text.primary }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box className="mb-3" sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar  position="fixed" sx={{ backgroundColor: "#09c" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FeedIcon sx={{ mr: 1 }} />
            news feed
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: "auto" }}>
            {navItems.map((item,index) => (
              <Button
                key={index}
                sx={{ color: "#fff", textTransform: "none" }}
              >
                <RouterLink
                  to={item.link}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  {item.text}
                </RouterLink>
              </Button>
            ))}
          </Box>
          <SearchBar />
        </Toolbar>
      </AppBar>
      <Toolbar />{" "}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
