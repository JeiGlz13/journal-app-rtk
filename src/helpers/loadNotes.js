import {
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { firebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "") => {
  const collectionRef = collection(firebaseDB, "notes");
  const queryRef = query(collectionRef, where("uid", "==", uid));
  const { docs } = await getDocs(queryRef);
  const notes = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return notes;
};
