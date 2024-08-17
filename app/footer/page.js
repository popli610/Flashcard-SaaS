import React from "react";
import { Box, Grid, Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer">
      <Box
        sx={{
          background: "linear-gradient(135deg, #FFFFFF, #FBCEB1)",
          color: "#5D4C46",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Column 1: Company Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                InsightInk
              </Typography>
              <Typography variant="body2" sx={{ color: "#5D4C46", mb: 2 }}>
                Your go-to platform for AI-powered flashcards and study tools.
              </Typography>
              <Typography variant="body2" sx={{ color: "#5D4C46" }}>
                &copy; {new Date().getFullYear()} InsightInk. All rights
                reserved.
              </Typography>
            </Grid>

            {/* Column 2: Quick Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Quick Links
              </Typography>
              <Link
                href="/"
                color="inherit"
                underline="none"
                sx={{ display: "block", mb: 1 }}
              >
                Home
              </Link>
              <Link
                href="/flashcards"
                color="inherit"
                underline="none"
                sx={{ display: "block", mb: 1 }}
              >
                Flashcards
              </Link>
              <Link
                href="/sign-in"
                color="inherit"
                underline="none"
                sx={{ display: "block", mb: 1 }}
              >
                Sign In
              </Link>
              <Link
                href="/upgrade"
                color="inherit"
                underline="none"
                sx={{ display: "block", mb: 1 }}
              >
                Upgrade
              </Link>
            </Grid>

            {/* Column 3: Social Media Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Follow Us
              </Typography>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ display: "inline-block", mr: 2 }}
              >
                <img
                  src="/icons/facebook-icon.png"
                  alt="Facebook"
                  style={{ width: 24, height: 24 }}
                />
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ display: "inline-block", mr: 2 }}
              >
                <img
                  src="/icons/twitter-icon.png"
                  alt="Twitter"
                  style={{ width: 24, height: 24 }}
                />
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="none"
                sx={{ display: "inline-block", mr: 2 }}
              >
                <img
                  src="/icons/instagram-icon.png"
                  alt="Instagram"
                  style={{ width: 24, height: 24 }}
                />
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
