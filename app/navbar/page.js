import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Flashcard Saas
        </Typography>
        <SignedOut>
          <Button color="inherit" href="sign-in">
            Login
          </Button>
          <Button color="inherit" href="sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar

