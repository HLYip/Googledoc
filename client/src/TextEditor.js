import {useCallback, useEffect, useRef} from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"

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



const containerRef = useRef(); // to store the container div

  useEffect(() => {
    
      containerRef.current.innerHTML = ""; // clear the container div
      const editor = document.createElement("div");
      containerRef.current.append(editor); // append a new div to the container div
      new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } }); // create quill instance with the new div
    
  }, []); // empty dependency array to run only once on component mount
//
  return <div class="container" ref={containerRef}></div>; // assigning ref to the div
  //
}
