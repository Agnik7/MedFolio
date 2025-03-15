import {initializeApp} from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import firebaseConfig from "./firebase.config";
export const uploadImageToFirebase = async (file) => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace(/[-T:/]/g, '');
    const storageRef = ref(storage, `files/${file.name.split('.')[0]}-${formattedDate}.${file.name.split('.')[1]}`);
    const metadata = {
      contentType: file.type,
    };
    const snapshot = await uploadBytesResumable(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };