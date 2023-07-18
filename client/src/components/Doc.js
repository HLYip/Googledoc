import React from 'react'
import './Home.css'

const Doc = ({doc, deleteDoc}) => {
  return (
    <div className='doc-grid-child'>
        <a target="_blank" href={`documents/${doc.url}`}><img src={`${process.env.PUBLIC_URL}/wordicon.jpg`} alt="Word document"  /></a>
        <p>{doc.title}</p>
        <p>{doc.author}</p>
       <p><button onClick={()=> deleteDoc(doc.id)} >Delete</button></p>
        
        
        

    </div>
  )
}

export default Doc