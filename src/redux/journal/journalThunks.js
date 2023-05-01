import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  isCreatingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(isCreatingNewNote());
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageURLs: [],
      uid,
    };

    const newDoc = doc(collection(firebaseDB, "notes"));
    await setDoc(newDoc, newNote);
    const savedNote = {
      ...newNote,
      id: newDoc.id,
    };
    dispatch(setActiveNote(savedNote));
    dispatch(addNewEmptyNote(savedNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID no existe");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeNote } = getState().journal;

    const { id, ...noteToFirestore } = activeNote;
    const docRef = doc(firebaseDB, `notes/${id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });
    dispatch(updateNote(activeNote));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    const filesURLs = await Promise.all(
      Object.values(files).map(async (file) => await fileUpload(file))
    );
    dispatch(setPhotosToActiveNote(filesURLs));
  };
};

export const startDeletingNote = (id) => {
  return async (dispatch) => {
    const docRef = doc(firebaseDB, `notes/${id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById(id));
  };
};
