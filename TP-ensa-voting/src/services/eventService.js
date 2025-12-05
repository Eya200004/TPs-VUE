import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  runTransaction,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { auth } from "../firebase";

export function subscribeEvents(callback) {
  const eventsCol = collection(db, "Events");
  const q = query(eventsCol, orderBy("date", "asc"));
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(events);
  });
}

export async function voteEvent(eventId, vote) {
  const user = auth.currentUser;
  if (!user) throw new Error("Utilisateur non authentifié");

  const voteDocId = `${eventId}_${user.uid}`;
  const voteRef = doc(db, "Votes", voteDocId);
  const eventRef = doc(db, "Events", eventId);

  return runTransaction(db, async (tx) => {
    const vSnap = await tx.get(voteRef);
    if (vSnap.exists()) {
      throw new Error("Vous avez déjà voté pour cet événement.");
    }

    const eSnap = await tx.get(eventRef);
    if (!eSnap.exists()) throw new Error("Événement introuvable.");

    tx.set(voteRef, {
      eventId,
      userId: user.uid,
      vote,
      createdAt: serverTimestamp()
    });

    if (vote === "yes") {
      tx.update(eventRef, {
        yesVotes: (eSnap.data().yesVotes || 0) + 1,
        updatedAt: serverTimestamp()
      });
    } else {
      tx.update(eventRef, {
        noVotes: (eSnap.data().noVotes || 0) + 1,
        updatedAt: serverTimestamp()
      });
    }
  });
}
