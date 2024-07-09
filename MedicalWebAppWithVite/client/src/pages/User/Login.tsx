import { Avatar, Box, Container, CssBaseline, Grid, IconButton, InputAdornment, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { UserLogin } from "./Types/UserLogin";
import { useLogin } from "../../services/Hooks/User/UseUserLogin";
import { useAuth } from "../../shared/components/Contexts/AuthProvider";
import { useSnackbar } from "../../shared/components/Contexts/SnackbarProvider";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/homepage">
        My Medical Shop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const defaultTheme = createTheme();

  const { isLoggingIn, login } = useLogin();
  const {setAuthenticated} = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const handleLogin = (Values: UserLogin) => {
    login(Values)
      .then((response: any) => {
        if (response) {
          console.log('response',response);
          setAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(response));
          navigate('/homepage');
          snackbar.showSnackBar("Welcome to My Medical Shop", "success", "Success Message");
        }
        else{
          console.log('Credential not good');
          snackbar.showSnackBar("Check if password or email exist", "error", "Error Message");
        }
      })
      .catch(() =>
        {
          console.log('catch err')
          
          snackbar.showSnackBar("Cannot Login", "error", "Error Message")}
      );
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: ""
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email("Email not valid")
        .required("Email is required")
        .matches(
          /^[A-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)+\.(com)$/i,
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
    }),
    onSubmit: (values) => handleLogin(values),
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
          <Typography component="h1" variant="h5" data-testid="login_text">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
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
                  helperText={formik.touched.Email && formik.errors.Email }
                  inputProps={{ "data-testid": "login-email" }}
                />
              </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: 1.5 }}>
              <Grid item xs={12}>
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
                          data-testid= "show-password" 
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  type={showPassword ? "text" : "password"}
                  required
                  fullWidth
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Password && Boolean(formik.errors.Password)}
                  helperText={formik.touched.Password && formik.errors.Password}
                  inputProps={{ "data-testid": "login-password" }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1.5, mb: 1.5 }}
              loading={isLoggingIn}
              loadingIndicator= 'Loading...'
              data-testid="login-submit"
              disabled={!(formik.values.Email && formik.values.Password && formik.isValid)}
            >
              Login
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Do not have an account?
                <Link to="/register">Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Login;