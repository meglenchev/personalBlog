import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.js";

export const uploadImage = async (imageFile) => {
    const imageRef = ref(storage, `images/${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(snapshot.ref);
};