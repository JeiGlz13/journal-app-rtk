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
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state) => {},
    updateNote: (state, action) => {},
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
  deleteNoteById,
} = journalSlice.actions;
