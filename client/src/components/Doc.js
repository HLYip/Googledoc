import React, { useState } from 'react'
import './Home.css'

const Doc = ({doc, deleteDoc, shareDoc}) => {
  const [shareUser, setShareUser] = useState();

  const getFileDisplay = (type) => {
    if (type.includes("image")) {
      return <img src={doc.url} alt={doc.name} />;
    } else if (type.includes("video")) {
      return <video width="320" height="240" controls>
                <source src={doc.url} type={type} />
                Your browser does not support the video tag.
             </video>;
    } else if (type.includes("vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      return <img src={`${process.env.PUBLIC_URL}/wordicon.jpg`} alt="Word document" />;
    } else if (type === 'ydoc') {
      return <img src={`${process.env.PUBLIC_URL}/ydoc.jpg`} alt="Ydoc document" />;
    } else {
      // fallback for any other file types you haven't specifically handled
      return <img src={`${process.env.PUBLIC_URL}/defaulticon.jpg`} alt="Default" />;
    }
  };

  const getHref = (type) => {
    if (type === 'ydoc') {
      return `documents/${doc.url}`;
    } else {
      return doc.url;
    }
  };

  return (
    <div className='doc-grid-child'>
        <a target="_blank" rel="noreferrer" href={getHref(doc.type)}>
            {getFileDisplay(doc.type)}
        </a>
        <p>{doc.title ? doc.title : doc.name}</p>
        <p>{doc.author}</p>
        <p>
            <input value={shareUser} onChange={(e)=>setShareUser(e.target.value)} placeholder='share with...' />
            <button onClick={()=> {shareDoc(doc.id, shareUser); setShareUser("")}}>Share</button>
        </p>
        <p><button onClick={()=> deleteDoc(doc.id,doc.isFile, doc.filePath)}>Delete</button></p>
    </div>
  )
}

export default Doc;