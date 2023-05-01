import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import { useMemo } from "react";

export const NoteView = () => {
  const { activeNote } = useSelector((state) => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);
  return (
    <Grid
      container
      className="animate__animated animate__fadeIn"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          name="body"
          value={body}
          onChange={onInputChange}
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
        />
      </Grid>

      {/* Image gallery */}
      <ImageGallery />
    </Grid>
  );
};
