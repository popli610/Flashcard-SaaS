"use client";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import {
  Container,
  Button,
  Typography,
  Box,
  Paper,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardActionArea,
  CardContent,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
} from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import FileUploader from "../fileUploader/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { Bolt, LightbulbCircleOutlined } from "@mui/icons-material";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("text");
  const [fileContent, setFileContent] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    const content = selectedOption === "text" ? text : fileContent;
    console.log(content);
    fetch("api/generate", {
      method: "POST",
      body: content,
    })
      .then((res) => res.json())
      .then((data) => {
        setFlashcards(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error generating flashcards:", error);
        setLoading(false);
      });
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const handleFileProcessed = (content) => {
    setFileContent(content);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with the same name already exists.");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const CardDocRef = doc(colRef);
      batch.set(CardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <Box
      sx={{
        // backgroundImage: "url('/generatebg.png')",
        background: "linear-gradient(135deg, #FFFFFF, #FBCEB1)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mt: 2,
          fontWeight: 600,
          fontSize: "3rem",
          textAlign: "center",
          color: "#5D4C46", // Flashcards
          "& span": {
            color: "#FFC107", // AI
          },
        }}
      >
        Flashcards <span>AI</span>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontWeight: 300,
          mb: 4,
          color: "#5D4C46",
          textAlign: "center",
          px: 2,
          fontSize: "1rem",
          opacity: 0.8,
        }}
      >
        Upload a document or paste your notes to automatically generate
        flashcards with AI.
        <Bolt
          sx={{ color: "#FFC107", fontSize: "1.6rem", verticalAlign: "middle" }}
        />
      </Typography>

      <Container maxWidth="md">
        <Box
          sx={{
            mt: 2,
            mb: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              p: 4,
              width: "100%",
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", // Subtle elevation
              backgroundColor: "#FFF7F0", // Soft neutral background to match the theme
              mb: 4, // Margin-bottom to separate it from the preview section
            }}
          >
            {/* <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                mb: 2,
                color: "#5D4C46",
                textAlign: "center",
              }}
            >
              Create Your Flashcards
            </Typography> */}
            {selectedOption === "text" && (
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="Enter Text"
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                sx={{
                  mb: 3,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 2,
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent", // Matching input border to the theme
                    },
                    "&:hover fieldset": {
                      borderColor: "#FFD3B6", // Darker border on hover
                    },
                    "&.Mui-focused fieldset": {
                      color: "#FFAD90",
                      borderColor: "#FFD3B6", // Focused border color
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#5D4C46", // Label color when focused
                  },
                }}
              />
            )}

            {selectedOption === "document" && (
              <FileUploader onFileProcessed={handleFileProcessed} /> // Render the FileUploader
            )}

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  fullWidth
                  sx={{
                    position: "relative", // Set relative positioning for the pseudo-element
                    zIndex: 1, // Ensure the button content stays on top
                    color: "#5D4C46", // Text color to match the theme
                    fontSize: "1rem",
                    py: 1,
                    textTransform: "none",
                    borderRadius: 3, // Border-radius for the button
                    backgroundColor: "#FFF7E8", // Very light orange background
                    overflow: "hidden", // Ensure pseudo-element is constrained by the button
                    "&::before": {
                      content: '""', // Empty content for the pseudo-element
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "inherit", // Inherits border-radius from the button
                      padding: "2px", // Border thickness
                      background:
                        "linear-gradient(90deg, #FFD700, #FFC107, #FFB74D, #FFA726, #FF8F00)", // Matching gradient for border
                      backgroundSize: "300% 300%", // Make the gradient larger for animation
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", // Creates a cutout effect
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude", // Ensures only the border is visible
                      zIndex: -1, // Places the pseudo-element behind the button content
                      animation: "borderRun 4s linear infinite", // Running border animation by default
                    },
                    "&:hover::before": {
                      animationPlayState: "paused", // Pauses the running border on hover
                    },
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    "&:hover": {
                      backgroundColor: "#FFF7E8", // Slightly darker on hover
                    },
                    "@keyframes borderRun": {
                      "0%": {
                        backgroundPosition: "0% 50%", // Start position of the gradient
                      },
                      "100%": {
                        backgroundPosition: "100% 50%", // End position, creating the running effect
                      },
                    },
                  }}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? "Generating..." : "Generate"}
                </Button>
              </Grid>

              <Grid item xs={4}>
                <ToggleButtonGroup
                  value={selectedOption}
                  exclusive
                  onChange={handleOptionChange}
                  fullWidth
                  sx={{
                    backgroundColor: "#FFF7F0", // Light background for the toggle group
                    borderRadius: "50px", // Rounded corners for the group
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add subtle shadow for depth
                    padding: "4px", // Padding inside the group for space between buttons
                  }}
                >
                  <ToggleButton
                    value="text"
                    sx={{
                      textTransform: "none",
                      borderRadius: "50px !important", // Rounded button shape
                      border: "none", // Remove default border
                      color: "#5D4C46 !important", // Dark text color for contrast
                      backgroundColor:
                        selectedOption === "text"
                          ? "#FFD3B6 !important"
                          : "transparent", // Soft orange for active button
                      padding: "8px 16px", // Padding for the button
                      fontWeight: 600, // Bold text
                      boxShadow:
                        selectedOption === "text"
                          ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                          : "none", // Shadow for active button
                    }}
                  >
                    Text
                  </ToggleButton>
                  <ToggleButton
                    value="document"
                    sx={{
                      textTransform: "none",
                      borderRadius: "50px !important", // Rounded button shape
                      border: "none", // Remove default border
                      color: "#5D4C46 !important", // Dark text color for contrast
                      backgroundColor:
                        selectedOption === "document"
                          ? "#FFD3B6 !important"
                          : "transparent", // Soft orange for active button
                      padding: "8px 16px", // Padding for the button
                      fontWeight: 600, // Bold text
                      boxShadow:
                        selectedOption === "document"
                          ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                          : "none",
                    }}
                  >
                    Document
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        {loading ? (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, mb: 3, color: "#5D4C46" }}
            >
              Flashcards Preview
            </Typography>
            <Grid container spacing={3}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={280}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, mb: 3, color: "#5D4C46" }}
              >
                Flashcards Preview
              </Typography>
              <Grid container spacing={3}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s ease",
                        backgroundColor: "#FDF7F2",
                        "&:hover": {
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => {
                          handleCardClick(index);
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              perspective: "1000px",
                              "& > div": {
                                transition: "transform 0.6s",
                                transformStyle: "preserve-3d",
                                position: "relative",
                                width: "100%",
                                height: "280px",
                                transform: flipped[index]
                                  ? "rotateY(180deg)"
                                  : "rotateY(0deg)",
                              },
                              "& > div > div": {
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                boxSizing: "border-box",
                              },
                              "& > div > div:nth-of-type(2)": {
                                transform: "rotateY(180deg)",
                              },
                            }}
                          >
                            <div>
                              <div>
                                <Typography
                                  variant="h6"
                                  component="div"
                                  sx={{ color: "#5D4C46" }}
                                >
                                  {flashcard.front}
                                </Typography>
                              </div>
                              <div>
                                <Typography
                                  variant="h6"
                                  component="div"
                                  sx={{ color: "#5D4C46" }}
                                >
                                  {flashcard.back}
                                </Typography>
                              </div>
                            </div>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  sx={{
                    color: "#FFF", // White text for contrast
                    background: "linear-gradient(135deg, #FF8B60, #FF6F61)", // Matching gradient
                    padding: "10px 24px", // Larger padding for a premium feel
                    borderRadius: "25px", // Rounded corners for a smooth look
                    fontWeight: 600, // Bold font for emphasis
                    textTransform: "none", // No text transformation for a softer look
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Shadow for depth
                    transition: "all 0.3s ease-in-out", // Smooth transitions
                    ":hover": {
                      backgroundColor: "#FF4F41", // Stronger hover effect to match the theme
                    },
                  }}
                >
                  Save Flashcards
                </Button>
              </Box>
            </Box>
          )
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#FFF7F0", // Subtle background color
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Elevated shadow for depth
              padding: 2, // Add padding around content
            },
          }}
        >
          <DialogTitle
            sx={{
              color: "#5D4C46", // Matching title color with the rest of the theme
              fontWeight: 700, // Make the title bolder
              fontSize: "1.6rem", // Slightly larger font size
              textAlign: "center", // Centered text
            }}
          >
            Save Flashcards
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{
                color: "#6D6D6D", // A lighter gray for the description
                mb: 3,
                textAlign: "center", // Center the description
                fontSize: "1rem", // Slightly larger font for better readability
              }}
            >
              Please enter a name for your flashcards collection.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Collection Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                //padding:2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent", // Matching input border to the theme
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFAD90", // Darker border on hover
                  },
                  "&.Mui-focused fieldset": {
                    color: "#FFAD90",
                    borderColor: "#FFAD90", // Focused border color
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFAD90", // Label color when focused
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
            <Button
              onClick={handleClose}
              sx={{
                color: "#888888", // Softer color for cancel button
                borderColor: "#888888",
                "&:hover": {
                  color: "#666666", // Match hover color with theme
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={saveFlashcards}
              sx={{
                backgroundColor: "#FFAD90", // Warm pink-orange tone that fits the theme
                color: "#FFF",
                px: 4,
                "&:hover": {
                  backgroundColor: "#FF8B60", // Darker shade for hover effect
                },
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
