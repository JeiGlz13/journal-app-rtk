import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../../hooks/useForm";
import { startCreatingUserWithEmailPassword } from "../../../redux/auth/thunks/authThunks";

const initialForm = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations = {
  email: [
    (value) => value.includes("@") && value.includes("."),
    "El correo no es valido",
  ],
  password: [
    (value) => value.length > 5,
    "El password debe contener mas de 5 caracteres",
  ],
  displayName: [
    (value) => value.length > 4,
    "El displayName debe contener mas de 4 caracteres",
  ],
};

export const RegisterPage = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const {
    displayName,
    displayNameValid,
    email,
    emailValid,
    password,
    passwordValid,
    onInputChange,
    formState,
    onResetForm,
    isFormValid,
  } = useForm(initialForm, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };
  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && isFormSubmitted}
              helperText={displayNameValid}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && isFormSubmitted}
              helperText={emailValid}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && isFormSubmitted}
              helperText={passwordValid}
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{ color: "white" }}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
