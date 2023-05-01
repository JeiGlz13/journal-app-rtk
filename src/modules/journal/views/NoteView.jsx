import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components";
import { useForm } from "../../../hooks/useForm";

import { setActiveNote } from "../../../redux/journal/journalSlice";
import {
  startSaveNote,
  startUploadingFiles,
  startDeletingNote,
} from "../../../redux/journal/journalThunks";

export const NoteView = () => {
  const { activeNote, messageSaved, isSaving } = useSelector(
    (state) => state.journal
  );
  const dispatch = useDispatch();
  const { title, body, date, onInputChange, formState } = useForm(activeNote);

  const fileInputRef = useRef();
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        icon: "success",
        title: "Nota actualizada",
        text: messageSaved,
      });
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files.legth === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote(activeNote.id));
  };

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
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
          accept="image/*"
          onChange={onFileInputChange}
        />

        <Tooltip title="Subir archivos">
          <span>
            <IconButton
              color="primary"
              disabled={isSaving}
              onClick={() => fileInputRef.current.click()}
            >
              <UploadFileOutlined />
            </IconButton>
          </span>
        </Tooltip>

        <Button
          color="primary"
          variant="contained"
          disabled={isSaving}
          onClick={onSaveNote}
          sx={{ color: "white", ml: 2 }}
          startIcon={<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />}
        >
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="outlined"
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
          variant="outlined"
          fullWidth
          multiline
          name="body"
          value={body}
          onChange={onInputChange}
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteOutline />}
          onClick={onDelete}
          sx={{ mt: 2 }}
        >
          Borrar
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery images={activeNote.imageURLs} />
    </Grid>
  );
};
