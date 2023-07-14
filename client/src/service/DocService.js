import { db,auth , storage} from '../config/firebase';
import { collection, addDoc,getDocs,deleteDoc,doc, updateDoc } from 'firebase/firestore';
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
            type: "ydoc"
        } )

        
    }catch(err){
        console.error(err)
    }


}


export const getDocsList = async () =>{

    try{
        const data = await getDocs(docsRef);
    const filterData = data.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
    }))
    return filterData;

    }catch(err){
        console.error(err)
    }

}

export const deleteDocFile = async(id) =>{

    const DocFile = doc(db, "docs-data",id )
    await deleteDoc(DocFile)
}