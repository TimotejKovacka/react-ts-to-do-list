import { useState, useRef } from "react";
import "./App.css";
import { Box, Container, Menu } from "@mui/material";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Category from "./components/Category";

function App() {
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(moreAnchorEl);

  const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(e.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  return (
    <Container
      maxWidth='sm'
      sx={{ border: "1px solid #505050", position: "relative" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 0 }}>
        <Tooltip title='Back' arrow placement='right'>
          <IconButton color='primary'>
            <ChevronLeftIcon fontSize='large' />
          </IconButton>
        </Tooltip>
        <Tooltip title='More' arrow placement='left'>
          <IconButton color='primary' onClick={handleMoreClick}>
            <MoreHorizIcon fontSize='large' />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={moreAnchorEl} open={open} onClose={handleMoreClose}>
          <MenuItem onClick={handleMoreClose}>Profile</MenuItem>
          <MenuItem onClick={handleMoreClose}>My account</MenuItem>
          <MenuItem onClick={handleMoreClose}>Logout</MenuItem>
        </Menu>
      </Box>
      <Box
        sx={{
          padding: "2rem 0",
          gap: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant='h4' component='h4'>
          😎 Personal
        </Typography>
        <Category title='Skincare' />
        <Category title='Housework' />
      </Box>
    </Container>
  );
}

export default App;
