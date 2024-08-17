'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

export default function PremiumUpgradeModal({ open, handleClose }) {
  const [selectedPlan, setSelectedPlan] = useState("yearly");

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm" // Make the dialog smaller in width as well
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#FFF7F0", // Background color consistent with theme
          borderRadius: "15px", // Soft rounded corners
          padding: "16px", // Reduce padding
          maxHeight: "80vh", // Limit height to 80% of the viewport
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.8rem", // Slightly smaller font size
          color: "#5D4C46", // Consistent color
          mb: 1, // Decrease margin below title
        }}
      >
        Boost Your Learning Efficiency 🚀
      </DialogTitle>

      <DialogContent sx={{ padding: "0 16px", textAlign: "center" }}>
        {" "}
        {/* Reduce padding inside content */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: "#5D4C46", // Muted color
            mb: 2, // Reduced margin-bottom
            fontSize: "0.9rem", // Slightly smaller font
          }}
        >
          Trusted by Millions of Students Worldwide
        </Typography>
        {/* Plan Options */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card
              onClick={() => handlePlanSelect("yearly")}
              sx={{
                backgroundColor:
                  selectedPlan === "yearly" ? "#FFD3B6" : "transparent", // Background for selected plan
                borderRadius: "12px", // Soft rounding
                textAlign: "center",
                padding: "12px", // Smaller padding inside card
                cursor: "pointer",
                border:
                  selectedPlan === "yearly" ? "none" : "2px solid #FFD3B6",
                "&:hover": {
                  border:
                    selectedPlan === "yearly" ? "none" : "2px solid #FFAD90", // Hover effect
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "1.1rem", color: "#5D4C46" }}
                >
                  Yearly Plan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#5D4C46", fontSize: "0.9rem" }}
                >
                  Save 50%
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mt: 1,
                    fontSize: "1.4rem",
                    color: selectedPlan === "yearly" ? "#5D4C46" : "#5D4C46",
                  }}
                >
                  $3.99/mo
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              onClick={() => handlePlanSelect("monthly")}
              sx={{
                backgroundColor:
                  selectedPlan === "monthly" ? "#FFD3B6" : "transparent", // Background for selected plan
                borderRadius: "12px", // Soft rounding
                textAlign: "center",
                padding: "12px", // Smaller padding inside card
                cursor: "pointer",
                border:
                  selectedPlan === "monthly" ? "none" : "2px solid #FFD3B6",
                "&:hover": {
                  border:
                    selectedPlan === "monthly" ? "none" : "2px solid #FFAD90", // Hover effect
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "1.1rem", color: "#5D4C46" }}
                >
                  Monthly Plan
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#5D4C46", fontSize: "0.9rem" }}
                >
                  Pay per month
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mt: 1,
                    fontSize: "1.4rem",
                    color: selectedPlan === "monthly" ? "#5D4C46" : "#5D4C46",
                  }}
                >
                  $8.99/mo
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Feature List */}
        <Box sx={{ mt: 3 }}>
          {" "}
          {/* Reduced margin-top */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#5D4C46",
              textAlign: "center",
              mb: 1, // Smaller margin-bottom
            }}
          >
            Upgrade to Premium and Get Access to
          </Typography>
          {/* <Typography
            variant="body2"
            sx={{
              color: "#5D4C46",
              textAlign: "center",
              fontSize: "0.9rem",
              mb: 1,
            }}
          >
            Get access to all of InsightInk’s features:
          </Typography> */}
          <ul style={{ padding: 0, listStyleType: "none", margin: 0 }}>
            {" "}
            {/* Remove padding and margin */}
            <li>
              <Typography
                variant="body2"
                sx={{ color: "#5D4C46", fontSize: "0.9rem" }}
              >
                ✓ Unlimited AI notes/documents
              </Typography>
            </li>
            <li>
              <Typography
                variant="body2"
                sx={{ color: "#5D4C46", fontSize: "0.9rem" }}
              >
                ✓ Unlimited AI changes
              </Typography>
            </li>
            <li>
              <Typography
                variant="body2"
                sx={{ color: "#5D4C46", fontSize: "0.9rem" }}
              >
                ✓ Text upload
              </Typography>
            </li>
            <li>
              <Typography
                variant="body2"
                sx={{ color: "#5D4C46", fontSize: "0.9rem" }}
              >
                ✓ Unlimited documents upload
              </Typography>
            </li>
          </ul>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", padding: "8px" }}>
        {" "}
        {/* Reduced padding for dialog actions */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFD3B6", // Soft orange for consistency
            color: "#5D4C46",
            padding: "10px 20px", // Smaller padding for button
            borderRadius: "20px",
            fontWeight: 600,
            ":hover": {
              backgroundColor: "#FFAD90", // Slightly darker on hover
            },
          }}
        >
          Upgrade Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}
