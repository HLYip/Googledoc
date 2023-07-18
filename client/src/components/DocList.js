import React, { useEffect, useState } from 'react'
import { shareDocFile, addDocument,getDocsList,deleteDocFile } from '../service/DocService';
import './Home.css'
import Doc from './Doc';
import { toast } from 'react-toastify';

const DocList = () => {
    const   [docList, setDocList] = useState([]);
    const [title, setTitle] = useState("");
    const userEmail = localStorage.getItem("userEmail");

    const addDocumentHandler = async () => {
        await addDocument(userEmail,title);
        setTitle("")
        toast.success("document added1")
        getDocs(userEmail)
    }

    const getDocs = async (userEmail) =>{
        const docs = await getDocsList(userEmail);
        setDocList(docs);
        console.log(docs)
    }

    const deleteDoc = async(id)=>{
        await deleteDocFile(id);
        toast.success("File Deleted")
        getDocs(userEmail)

    }

    const shareDoc = async(docId, email) =>{
        try{
        const result = await shareDocFile(docId, email); 
        console.log(result)
        if(result.success){
            toast.success("file shared");
        }else{
            toast.error("file share failed")
        }
    }catch(err){
        console.error(err);
    }
        

    }
    useEffect(()=>{
        
        getDocs(userEmail);

    },[])

  return (
    <div>
        
    
    <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
    <input value={title} className="add-title" onChange={(e)=>{setTitle(e.target.value)}} placeholder='add a title'/>
        <button onClick={addDocumentHandler} className='add-doc'>ADD DOC</button>
    </div>
    <div className='doc-grid-main'>
    {docList.map((doc)=>(
        <Doc key={doc.id} doc={doc} deleteDoc={deleteDoc} shareDoc={shareDoc}/>

    ))}
    </div>

    </div>
  )
}

export default DocList