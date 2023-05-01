import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  isCreatingNewNote,
  setActiveNote,
  setNotes,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(isCreatingNewNote());
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
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
