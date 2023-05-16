import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { KeyOutlined, Logout, ManageAccounts } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileItemList from "../../component/Profile/ProfileItemList";
import ChangeNewPassword from "../../component/Profile/ProfileChangePassword";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const drawerWidth = 240;

export default function ProfilePage() {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  if (!idUser && !username) {
    window.location.href = "http://localhost:3000/login";
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navigate = useNavigate();
  const [indexSubItem, setIndexSubItem] = useState(0);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Profile Setting
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <IconButton onClick={() => navigate("/home")}>
          <ArrowBack />
          <Typography> Back </Typography>
        </IconButton>
        <Divider />
        <List>
          <ListItem key={"account-setting"} disablePadding>
            <ListItemButton onClick={() => setIndexSubItem(0)}>
              <ListItemIcon>
                <ManageAccounts />
              </ListItemIcon>
              <ListItemText primary={"Account"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"logout-setting"} disablePadding>
            <ListItemButton onClick={() => handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={"Log out"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {indexSubItem === 0 ? <ProfileItemList /> : <ChangeNewPassword />}
      </Box>
    </Box>
  );
}
