import { updateCurrentUser } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../config/firebase"; 


export const updateUserData = async (user) => {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        // if user does not exist, create a new document
        await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            friendList: [], // Initialize friendList as an empty array
            // Add any other necessary fields here
        });
    } else {
        // if user exists, update the current user document
        await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            // No update to friendList here. Add fields that you want to update.
        }, { merge: true });
    }

    console.log("user set")
}