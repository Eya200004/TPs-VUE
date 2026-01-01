import { db } from "../firebase";
import { 
  collection, addDoc, getDocs, doc, getDoc, query, where, serverTimestamp, updateDoc, deleteDoc 
} from "firebase/firestore";

export const discussionService = {
  async createDiscussion(title, content, category, authorId, authorName) {
    return await addDoc(collection(db, "Discussions"), {
      title,
      content,
      category,
      authorId,
      authorName,
      createdAt: serverTimestamp()
    });
  },
  async getAllDiscussions() {
    const snapshot = await getDocs(collection(db, "Discussions"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getDiscussionById(id) {
    const docRef = doc(db, "Discussions", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  },
  async getDiscussionsByCategory(category) {
    const q = query(collection(db, "Discussions"), where("category", "==", category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async updateDiscussion(id, updatedData) {
    const docRef = doc(db, "Discussions", id);
    return await updateDoc(docRef, updatedData);
  },
  async deleteDiscussion(id) {
    const docRef = doc(db, "Discussions", id);
    return await deleteDoc(docRef);
  }
};
