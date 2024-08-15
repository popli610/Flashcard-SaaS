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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    fetch("api/generate", {
      method: "POST",
      body: text,
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
    <Container
      maxWidth="md"
      sx={{
        backgroundImage: "url('/generateflashcardbg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 2, color: "#5D4C46" }}
        >
          Generate Flashcards
        </Typography>
        <Paper
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#F5EEDC",
          }}
        >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              mb: 2,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{
              fontSize: "1rem",
              py: 1.5,
              textTransform: "none",
              backgroundColor: "#FFD3B6",
              "&:hover": {
                backgroundColor: "#FFAD90",
              },
            }}
          >
            Generate Flashcards
          </Button>
        </Paper>
      </Box> */}
      <Box
        sx={{
          mt: 4,
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
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              mb: 2,
              color: "#5D4C46",
              textAlign: "center",
            }}
          >
            Create Your Flashcards
          </Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              mb: 3, // More spacing between the text field and button
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)", // Light shadow for an elevated feel
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{
              fontSize: "1rem",
              py: 1.5,
              textTransform: "none",
              borderRadius: 3,
              backgroundColor: "#FFD3B6",
              "&:hover": {
                backgroundColor: "#FFAD90",
              },
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Generating..." : "Generate Flashcards"}
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
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
                            height: "200px",
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
              color="secondary"
              onClick={handleOpen}
              sx={{
                fontSize: "1rem",
                py: 1.5,
                textTransform: "none",
                backgroundColor: "#C1E1C1",
                "&:hover": {
                  backgroundColor: "#A9D1A1",
                },
              }}
            >
              Save Flashcards
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#5D4C46" }}>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#5D4C46" }}>
            Please enter a name for your flashcards collection
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
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards} sx={{ backgroundColor: "#FFD3B6" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
