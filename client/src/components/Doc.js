import React, { useState } from 'react'
import './Home.css'

const Doc = ({doc, deleteDoc, shareDoc}) => {
  const [shareUser, setShareUser] = useState();
  return (
    <div className='doc-grid-child'>
        <a target="_blank" href={`documents/${doc.url}`}><img src={`${process.env.PUBLIC_URL}/wordicon.jpg`} alt="Word document"  /></a>
        <p>{doc.title}</p>
        <p>{doc.author}</p>
        <p><input value={shareUser} onChange={(e)=>setShareUser(e.target.value)} placeholder='share with...'/><button onClick={()=> {shareDoc(doc.id, shareUser); setShareUser("")}}>Share</button></p>
       <p><button onClick={()=> deleteDoc(doc.id)} >Delete</button></p>
        
        

    </div>
  )
}

export default Doc