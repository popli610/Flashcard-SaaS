//Authorization GUI changes

/** @jsxImportSource @emotion/react */
"use client";
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import { SignIn, SignUp } from "@clerk/nextjs";
import { css, keyframes } from "@emotion/react";

// Define the keyframes for the animations

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

export default function SignUpPage() {
  return (
    <Container maxWidth="100vw" disableGutters>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(45deg, #FF6F61, #FFB74D, #FF8A65)",
          background: "linear-gradient(135deg, #FFFFFF, #FBCEB1)",
          px: 15,
          position: "relative",
          overflow: "hidden",
          pb: 12,
        }}
      >
        {/* Background SVG */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.2,
          }}
        >
          <svg
            className="w-96 h-96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <path
              d="M50 50c-16.67 0-30 13.33-30 30s13.33 30 30 30 30-13.33 30-30-13.33-30-30-30z"
              stroke="#FF6F61"
              strokeWidth="3"
              fill="none"
              css={css`
                animation: ${pulse} 3s infinite;
              `}
            />
          </svg>
        </Box>

        {/* Welcome Text and Sign-In Heading */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingRight: 3,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#5D4C46",
            }}
          >
            Welcome To Insight<span style={{ color: "#FF8B60" }}>Ink</span>
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 3, pr: 20, color: "#5D4C46" }}
          >
            Instantly turn your PDFs, Documents, Txt files, Notes into
            flashcards with InsightInk. Our AI quickly generates a complete set
            of flashcards in just seconds.{" "}
          </Typography>
        </Box>

        {/* Sign-Up Component */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: "relative",
            backgroundColor: "#FFF",
            border: "2px solid #FFB3B3",
            borderRadius: "12px",
            padding: 3,
            width: "100%",
            maxWidth: "450px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
            },
            zIndex: 1,
            cursor: "default",
          }}
        >
          {/* Flashcard Stripe */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top right, #FF6F61, #FFB74D)",
              borderRadius: "10px",
              filter: "blur(20px)",
              zIndex: -1,
              opacity: 0.1,
            }}
          />

          <SignUp />
        </Box>
      </Box>
    </Container>
  );
}