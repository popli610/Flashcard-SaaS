"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getStripe from "@/utils/get-stripe";
import { useSearchParams } from "next/navigation";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Button,
} from "@mui/material";

const ResultPage = () => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const session_id = searchparams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (error) {
        setError("An error occurred while fetching the session data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h5" sx={{ mt: 2, color: "#5D4C46" }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" sx={{ color: "#FF6F61" }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
        mt: 8,
        py: 4,
        bgcolor: "#FFF7F0",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {session.payment_status === "paid" ? (
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#5D4C46", mb: 4 }}
          >
            Thank You for Your Purchase!
          </Typography>
          <Typography variant="h6" sx={{ color: "#FF6F61" }}>
            Session ID: {session_id}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: "#5D4C46" }}>
            We have received your payment. You can now Enjoy Premium Features.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              background: "linear-gradient(135deg, #FF8B60, #FF6F61)",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "25px",
              padding: "10px 24px",
            }}
            onClick={() => router.push("/")} // Redirect to a dashboard or homepage
          >
            Return Back
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#5D4C46", mb: 4 }}
          >
            Payment Failed
          </Typography>
          <Typography variant="body1" sx={{ color: "#5D4C46" }}>
            Your payment was not successful. Please try again.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              mt: 4,
              color: "#FF6F61",
              borderColor: "#FF6F61",
              textTransform: "none",
              borderRadius: "25px",
              padding: "10px 24px",
            }}
            onClick={() => router.push("/")} // Redirect to retry payment or pricing page
          >
            Go back
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ResultPage;
