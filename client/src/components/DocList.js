import React, { useEffect, useRef, useState } from 'react'
import { uploadFile,shareDocFile, addDocument,getDocsList,deleteDocFile } from '../service/DocService';
import './Home.css'
import Doc from './Doc';
import { toast } from 'react-toastify';

const DocList = () => {
    const   [docList, setDocList] = useState([]);
    const [title, setTitle] = useState("");
    const userEmail = localStorage.getItem("userEmail");
    const [fileUpload, setFileUpload] = useState(null);
    const fileUploadRef = useRef();




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

    const deleteDoc = async(id,isFile,filePath)=>{
        await deleteDocFile(id,isFile,filePath);
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


    const uploadFileHandler = async(author, file) =>{
        try{
            console.log(file)
            const id = await uploadFile(author, file); 
            if(id != null){
                toast.success("File upload sucess");
            }else{
                toast.error("file not uploaded");
            }
            fileUploadRef.current.value = "";
            getDocs(userEmail);

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
        <button onClick={addDocumentHandler} style={{ marginRight: '10px' }} className='add-doc'>ADD DOC</button>
        <input ref={fileUploadRef} onChange={(e)=>{setFileUpload(e.target.files[0])}}  type="file"/>
        <button onClick={()=>uploadFileHandler(userEmail,fileUpload)} className='add-file'>Upload File</button>
    </div>
    <div className='doc-grid-main'>
    {docList.map((doc)=>(
        <Doc key={doc.id} doc={doc} deleteDoc={deleteDoc} shareDoc={shareDoc} mimeType={doc.type}/>

    ))}
    </div>

    </div>
  )
}

export default DocList