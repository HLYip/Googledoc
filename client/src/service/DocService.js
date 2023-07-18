import { db,auth , storage} from '../config/firebase';
import { query, where, collection, addDoc,getDocs,deleteDoc,doc, updateDoc, arrayUnion } from 'firebase/firestore';
import {ref,uploadBytes,listAll,getDownloadURL, deleteObject} from "firebase/storage"
import {v4} from 'uuid'


const docsRef = collection(db,"docs-data")

export const addDocument = async (author, title) =>{
    console.log(author)
    try{
        await addDoc(docsRef,{
            author,
            title: title || "",
            url: `${v4()}`,
            body: "",
            share:[],
            type: "ydoc"
        } )

        
    }catch(err){
        console.error(err)
    }


}


export const getDocsList = async (userEmail) => {
    try {
      const docsRef = collection(db, 'docs-data');
      const data = await getDocs(docsRef);
      let filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
  
      // Filter documents to only include those created by the user or shared with the user
      filterData = filterData.filter(doc => doc.author === userEmail || (doc.share && doc.share.includes(userEmail)));
  
      return filterData;
    } catch(err) {
      console.error(err)
    }
  };

export const deleteDocFile = async(id) =>{

    const DocRef = doc(db, "docs-data",id )
    await deleteDoc(DocRef)
}

export const shareDocFile = async (docId, email) => {
    // Query the 'users' collection for a user with the entered email
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      // User exists, share the document
      const docRef = doc(db, "docs-data", docId);
      try {
        await updateDoc(docRef, {
          share: arrayUnion(email)
        });
        return {
            success: true,
            message: "Document shared successfully",
          };
      } catch (error) {
        console.error("Error sharing document:", error);
      }
    } else {
        return {
            success: false,
            message: "The user does not exist",
          };
    }
  };