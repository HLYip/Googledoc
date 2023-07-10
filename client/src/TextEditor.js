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



const wrapperRef = useCallback((wrapper)=>{
    if(wrapper == null) return
    wrapper.innerHTML = ''
    const editor = document.createElement('div')
    wrapper.append(editor)
    new Quill(editor, {theme: "snow", modules:{toolbar:TOOLBAR_OPTIONS}})

},

[])


  return (
    <div class="container" ref={wrapperRef}> </div>
  )
}
