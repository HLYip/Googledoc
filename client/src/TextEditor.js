import {useCallback, useEffect, useRef, useState} from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import {io} from 'socket.io-client'
import { useParams } from 'react-router-dom'

const SAVE_INTERVAL = 5000
const TOOLBAR_OPTIONS =[
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]

export default function TextEditor() {
    const {id:documentId} = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const [title, setTitle] = useState('')

    //connect to server socket
    useEffect(()=>{
       const s = io("http://localhost:3001")
       setSocket(s)
       return () =>{
        s.disconnect()
       }
    },[])  

    //detect quill changes
    useEffect(()=>{
        if (socket == null || quill == null) return 
        const handler = (delta, oldDelta,source)=>{
            if (source !== 'user') return
            socket.emit("send-changes", delta)
        }

        quill.on('text-change', handler)

        return () =>{
            quill.off('text-change',handler)
        }

    },[socket,quill])


    //socket load based on documentId
    useEffect(()=>{
        if (socket == null || quill == null) return 

        socket.once("load-document", document =>{
            quill.setContents(document)
            quill.enable()
        })
        socket.emit('get-document', documentId)
       

    },[socket,quill, documentId])

    //load title
    useEffect(() => {
        if (socket == null) return;

        const handler = title => {
            setTitle(title);
        };

        socket.on('load-title', handler);

        return () => {
            socket.off('load-title', handler);
        };
    }, [socket,title,documentId]);



    //socket changes
    useEffect(()=>{
        if (socket == null || quill == null) return 
        const handler = (delta)=>{
            quill.updateContents(delta)
        }

        socket.on('receive-changes', handler)

        return () =>{
            socket.off('receive-changes',handler)
        }

    },[socket,quill])

    //save changes
    useEffect(()=>{
        if (socket == null || quill == null) return 
        const interval = setInterval(()=>{
            socket.emit('save-document', quill.getContents())
        
        }, SAVE_INTERVAL)

        return () => {
            clearInterval(interval)

        }
    },[socket,quill])

// const wrapperRef = useCallback((wrapper)=>{
//     if(wrapper == null) return
//     wrapper.innerHTML = ''
//     const editor = document.createElement('div')
//     wrapper.append(editor)
//     new Quill(editor, {theme: "snow", modules:{toolbar:TOOLBAR_OPTIONS}})

// },

// [])


//   return (
//     <div class="container" ref={wrapperRef}> </div>
//   )

//set title
useEffect(()=>{
    if (socket == null) return 
    
    console.log(title)
    socket.emit('save-title', title)
    
},[socket,title])


const updateTitle = (e) => {
    setTitle(e.target.value);
    socket.emit('send-title', e.target.value);
    console.log(e.target.value)
};
const containerRef = useRef(); // to store the container div

  useEffect(() => {
    
    containerRef.current.innerHTML = ""; // clear the container div
    const editor = document.createElement("div");
    containerRef.current.append(editor); // append a new div to the container div
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } }); // create quill instance with the new div
    q.disable()
    q.setText("loading please wait")
    setQuill(q)
    
  }, []); // empty dependency array to run only once on component mount
//
  return (
  <div>

    <input type="text" value={title} onChange={updateTitle} placeholder='untitled file'/>
  <div className="container" ref={containerRef}>
    
  </div>
  </div>
  
  ) // assigning ref to the div
  //
}
