import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const reportService = {
  async reportMessage(messageId, reporterId, reason) {
    return await addDoc(collection(db, "Reports"), {
      messageId,
      reporterId,
      reason,
      createdAt: new Date()
    });
  },

  async getReports() {
    const snapshot = await getDocs(collection(db, "Reports"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getReportsByMessage(messageId) {
    const q = query(collection(db, "Reports"), where("messageId", "==", messageId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
