const mongoose = require('mongoose')
const Document = require('./Document')


mongoose.connect('mongodb://127.0.0.1:27017/my-google-doc');



const io = require('socket.io')(3001,{
    cors: {
        origin:'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

const defaultValue =""

io.on("connection",socket =>{
    console.log("connected")
    socket.on('get-document', documentId =>{
        console.log("getting document")
        const document = findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit("load-document",document.data)

        socket.on('send-changes', delta =>{
            console.log(delta)
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        socket.on("save-document", async data =>{
            console.log("saving")
            await Document.findByIdAndUpdate(documentId, {data})
            console.log("document saved")
        })
    })
    
   
} )

async function findOrCreateDocument(id){
    if (id == null) return 
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({_id:id, data:defaultValue})

}