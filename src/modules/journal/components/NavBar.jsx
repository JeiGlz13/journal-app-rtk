import { useDispatch } from "react-redux";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { startLogout } from "../../../redux/auth/thunks/authThunks";

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(startLogout());
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "white" }}
          >
            Journal
          </Typography>

          <IconButton
            sx={{
              backgroundColor: "secondary.main",

              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
            onClick={onLogout}
          >
            <LogoutOutlined sx={{ color: "white" }} />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
