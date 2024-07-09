import { Avatar, Box, Container, CssBaseline, Grid, IconButton, InputAdornment, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useRegister } from "../../services/Hooks/User/UseUserRegister";
import { useSnackbar } from "../../shared/components/Contexts/SnackbarProvider";
import { UserRegister } from "./Types/UserRegister";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        My Medical Shop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Register = () => {
  const defaultTheme = createTheme();
  const { isRegistering, register } = useRegister();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  
  const handleRegister = (Values: UserRegister) => {
    register(Values)
      .then((response: boolean) => {
        if (response) {
          navigate('/login', { replace: true });
          snackbar.showSnackBar("Successfully Registered", "success", "Success Message");
          console.log("Registered", response);
        }
        else {
          snackbar.showSnackBar("Check if user already exists", "error", "Error Message");
        }
      })
      .catch(() =>{
        console.log("API not good");
        snackbar.showSnackBar("Cannot register", "error", "Error Message")
      });
  };

  const formik = useFormik({
    initialValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
      ConfirmPassword: ""
    },
    validationSchema: Yup.object({
      Firstname: Yup.string()
        .required("Firstname is required"),
      Lastname: Yup.string()
        .required("Lastname is required"),
      Email: Yup.string()
        .email("Email not valid")
        .required("Email is required")
        .matches(
          /^[A-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail|accenture)+\.(com)$/i,
          "Email does not match format"
        ),
      Password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be 8 characters")
        .max(8, "Password must be 8 characters")
        .test("IsValidPass", "Not valid password", (value, context) => {
          const hasUpperCase = /[A-Z]/.test(value as string);
          const hasNumber = /[0-9]/.test(value as string);
          const hasSymbol = /[!@#%&$^*()-+]/.test(value as string);
          let validConditions = 0;
          const numberOfMustBeValidConditions = 3;
          const conditions = [hasUpperCase, hasNumber, hasSymbol];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions === numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
        ),
      ConfirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("Password")], "Passwords must match"),
    }),
    onSubmit: (values) => handleRegister(values),
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1.5, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5" data-testid="sign-up-text">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <TextField
                  id="Firstname"
                  label="Firstname"
                  name="Firstname"
                  autoComplete="Firstname"
                  type="text"
                  required
                  fullWidth
                  value={formik.values.Firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Firstname && Boolean(formik.errors.Firstname)}
                  helperText={formik.touched.Firstname && formik.errors.Firstname}
                  inputProps={{ "data-testid": "sign-up-firstname" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="Lastname"
                  label="Lastname"
                  name="Lastname"
                  autoComplete="Lastname"
                  type="text"
                  required
                  fullWidth
                  value={formik.values.Lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Lastname && Boolean(formik.errors.Lastname)}
                  helperText={formik.touched.Lastname && formik.errors.Lastname}
                  inputProps={{ "data-testid": "sign-up-lastname" }}
                />
              </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1.5 }}>
              <Grid item xs={12}>
                <TextField
                  id="Email"
                  label="Email"
                  name="Email"
                  autoComplete="Email"
                  type="email"
                  required
                  fullWidth
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Email && Boolean(formik.errors.Email)}
                  helperText={formik.touched.Email && formik.errors.Email}
                  inputProps={{ "data-testid": "sign-up-email" }}
                />
              </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1.5 }}>
              <Grid item xs={5.5}>
                <TextField
                  id="Password"
                  label="Password"
                  name="Password"
                  autoComplete="Password"
                  InputProps={{ 
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          data-testid= "sign-up-show-password"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  type= {showPassword ? "text" : "password"}
                  required
                  fullWidth
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Password && Boolean(formik.errors.Password)}
                  helperText={formik.touched.Password && formik.errors.Password}
                  inputProps={{ "data-testid": "sign-up-password" }}
                />
              </Grid>
              <Grid item xs={6.5}>
                <TextField
                  id="ConfirmPassword"
                  label="confirm Password"
                  name="ConfirmPassword"
                  autoComplete="ConfirmPassword"
                  InputProps={{ 
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowConfirmPassword}
                          data-testid= "sign-up-show-confirm-password"
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  type= {showConfirmPassword ? "text" : "password"}
                  required
                  fullWidth
                  value={formik.values.ConfirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.ConfirmPassword && Boolean(formik.errors.ConfirmPassword)}
                  helperText={formik.touched.ConfirmPassword && formik.errors.ConfirmPassword}
                  inputProps={{ "data-testid": "sign-up-confirm-password" }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1.5, mb: 1.5 }}
              loading={isRegistering}
              disabled={!(formik.values.Firstname && formik.values.Lastname && formik.values.Email && formik.values.Password && formik.values.ConfirmPassword)}
              data-testid="sign-up-button"
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?
                <Link to="/login">Sign In</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Register;