import { createSlice } from "@reduxjs/toolkit";

const note = {
  id: "abc123",
  title: "",
  body: "",
  date: 1234567,
  imageUrl: [],
};

const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  activeNote: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    isCreatingNewNote: (state, { payload }) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      state.notes = state.notes.map((note) => {
        return note.id === payload.id ? payload : note;
      });
      state.isSaving = false;
      state.messageSaved = `${payload.title} actualizada`;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.activeNote.imageURLs = [...state.activeNote.imageURLs, ...payload];
      state.isSaving = false;
    },
    deleteNoteById: (state, action) => {},
  },
});
export const {
  isCreatingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
} = journalSlice.actions;
