import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";


import getStripe from "@/utils/get-stripe";

export default function Pricing() {
  

  const handleAnnualSubmit = async () => {
    const response = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan: "annual" }),
    });
    const session = await response.json();
    if (session.id) {
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };

  const handleMonthlySubmit = async () => {
    const response = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan: "monthly" }),
    });
    const session = await response.json();
    if (session.id) {
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };

  return (
    <Container>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#5D4C46" }}
      >
        Pricing
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card
            raised
            sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#FFFFFF" }}
          >
            <CardContent sx={{ textAlign: "center", py: 4, borderRadius: 3 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#F9A826" }}
              >
                Basic
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ my: 2, fontWeight: "bold", color: "#2B2D42" }}
              >
                $0 / month
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#3D3E42" }}>
                No subscription required
              </Typography>
              <Box sx={{ my: 3 }}>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ Three AI notes
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ Five AI changes per note
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>✔ Text upload</Typography>
                <Typography sx={{ color: "#B2B2B2" }}>
                  ✘ No document upload
                </Typography>
                <Typography sx={{ color: "#B2B2B2" }}>
                  ✘ Queues during peak times
                </Typography>
                <Typography sx={{ color: "#B2B2B2" }}>
                  ✘ Limited new features
                </Typography>
              </Box>
              <Button
                variant="contained"
                disabled
                sx={{ mt: 4, bgcolor: "#E4E4E7", color: "#2B2D42" }}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            raised
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              bgcolor: "#FFFFFF",
              background: "linear-gradient(135deg, #FFF7E3, #FFE8C5)",
              position: "relative",
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 4,
                borderRadius: 3,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  bgcolor: "#F35A4A",
                  color: "#FFF",
                  borderRadius: "50%",
                  width: 80,
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  pr: 1.5,
                }}
              >
                Best Value
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#F35A4A" }}
              >
                Annual
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ my: 2, fontWeight: "bold", color: "#2B2D42" }}
              >
                $3.99 / month
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#3D3E42" }}>
                Billed annually
              </Typography>
              <Box sx={{ my: 3 }}>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ Unlimited AI notes/documents
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ Unlimited AI changes
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>✔ Text upload</Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ PDF, Word, and Txt upload
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ Skip the queue
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ New features soon
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={handleAnnualSubmit}
                sx={{
                  mt: 4,
                  color: "#FFFFFF",
                  background: "linear-gradient(135deg, #FF8B60, #FF6F61)",
                }}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            raised
            sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#FFFFFF" }}
          >
            <CardContent sx={{ textAlign: "center", py: 4, borderRadius: 3 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#6C63FF" }}
              >
                Monthly
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ my: 2, fontWeight: "bold", color: "#2B2D42" }}
              >
                $8.99 / month
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#3D3E42" }}>
                Billed monthly
              </Typography>
              <Box sx={{ my: 3 }}>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ Unlimited AI notes/documents
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ Unlimited AI changes
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>✔ Text upload</Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ PDF, Word, and Txt upload
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ Skip the queue
                </Typography>
                <Typography sx={{ color: "#3D3E42" }}>
                  ✔ New features soon
                </Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={handleMonthlySubmit}
                sx={{ mt: 4, borderColor: "#6C63FF", color: "#6C63FF" }}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
