"use client"
import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  InputAdornment, 
  IconButton 
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordHelperText, setPasswordHelperText] = useState<string>("");

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input) {
      setEmailError(true);
      setEmailHelperText("Email should be entered");
      return false;
    } else if (!emailRegex.test(input)) {
      setEmailError(true);
      setEmailHelperText("Please enter valid email");
      return false;
    } else {
      setEmailError(false);
      setEmailHelperText("");
      return true;
    }
  };
  const validatePassword = (input: string) => {
    if (!input) {
      setPasswordError(true);
      setPasswordHelperText("Password should be entered");
      return false;
    } 
           // We check that is the password length more than 8 or equals
    else if (input.length <= 8) {
      setPasswordError(true);
      setPasswordHelperText("Password should be at least 8 characters");
      return false;
    } 
       // We check that is there any upper cases
    else if (!/[A-Z]/.test(input)) {
      setPasswordError(true);
      setPasswordHelperText("There must be one at least upper case");
      return false;
    } 
    // We check that is there symbols
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(input)) {
      setPasswordError(true);
      setPasswordHelperText("There should be 1 symbol at least");
      return false;
    } 
    // If everything is okay
    else {
      setPasswordError(false);
      setPasswordHelperText("");
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password)
    if (isEmailValid && isPasswordValid ) {
      postData();
    }
    console.log("Logging in:", { email, password });
  };
  async function postData() {
    try{
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }) 
  .then(res => res.json())
  .then(data => console.log("Successfully posted:", data));
  setEmail("");
  setPassword("");
  router.push("/")
}
catch(error){
  throw error
}}



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fff5eb 0%, #ffe0cc 100%)",
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0px 10px 30px rgba(249, 115, 22, 0.1)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f97316",
              color: "white",
              borderRadius: "50%",
              p: 1.5,
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoginOutlined fontSize="large" />
          </Box>

          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", color: "#431407" }}>
            Welcome!
          </Typography>
          <Typography variant="body2" sx={{ color: "#7c2d12", mb: 3 }}>
            Please Log in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              error={emailError}
              helperText={emailHelperText}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#f97316" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#f97316" },
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter your password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (passwordError) validatePassword(e.target.value);
              }}
              onBlur={() => validatePassword(password)}
              error={passwordError}
              helperText={passwordHelperText}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#f97316" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#f97316" },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
            onClick={()=>handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: "#f97316",
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#ea580c",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}