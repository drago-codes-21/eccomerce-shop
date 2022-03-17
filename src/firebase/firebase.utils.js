import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDuC_6mJXe3H78nVcbhEYlbIQUNgP-cldU",
  authDomain: "crwn-proj-bb84f.firebaseapp.com",
  projectId: "crwn-proj-bb84f",
  storageBucket: "crwn-proj-bb84f.appspot.com",
  messagingSenderId: "435008979623",
  appId: "1:435008979623:web:20415b424bb78a5ca35182",
};
// const config = {
//   apiKey: "AIzaSyDuC_6mJXe3H78nVcbhEYlbIQUNgP-cldU",
//   authDomain: "crwn-proj-bb84f.firebaseapp.com",
//   projectId: "crwn-proj-bb84f",
//   storageBucket: "crwn-proj-bb84f.appspot.com",
//   messagingSenderId: "435008979623",
//   appId: "1:435008979623:web:20415b424bb78a5ca35182",
// };

const app = initializeApp(config);
const db = getFirestore(app);

export const userAuth = getAuth(app);
export const firestore = getFirestore(app);
export const createAccount = createUserWithEmailAndPassword;
export const signInAccount = signInWithEmailAndPassword;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  signInWithPopup(userAuth, provider).catch((error) => console.log(error));
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return {
    userRef,
    onSnapshot,
  };
};
