import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const authService = {
  async register(name, email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, "Users", user.uid), {
      name,
      email,
      role: "user",
      createdAt: new Date()
    });

    return user;
  },

  async login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  async logout() {
    return await signOut(auth);
  },

  async resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
  }
};
