import { collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
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
import { fileUpload } from "../../helpers/fileUpload";
// import { loadNotes } from "../../helpers/loadNotes";

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
    // const notes = await loadNotes(uid);

    const collectionRef = collection(firebaseDB, "notes");
    const queryRef = query(collectionRef, where("uid", "==", uid));
    onSnapshot(queryRef, docsSnap => {
      let notes = [];
      docsSnap.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
      });

      dispatch(setNotes(notes));
    });
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
