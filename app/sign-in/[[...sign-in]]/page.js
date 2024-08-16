import { AppBar,Container, Toolbar, Button, Typography, Box } from "@mui/material"
import Link from 'next/link'
import {SignIn} from '@clerk/nextjs';

export default function SignUpPage(){
    return (
        <Container maxWidth="100vw">
        <Box
        display="flex"
        flexDirection= "column"
        alignItems="center"
        justifyContent="center"
        >
        <Typography variant="h4"> Sign In</Typography>
        <SignIn />
        </Box>
    </Container>
    )
}