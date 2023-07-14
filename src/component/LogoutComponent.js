import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';



export default function LogOutComponent() {

  const navigate = useNavigate()

  const handleLogOutButton = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SIMESSI
        </Typography>
        <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
          Sistem Informasi Mahasiswa Sistem Informasi
        </Typography>
        <Button color="inherit" onClick={handleLogOutButton}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );

}

