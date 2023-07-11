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
    socket.on('get-document',async documentId =>{
        //console.log("getting document")
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit("load-document",document.data)
        socket.emit("load-title", document.title)



        socket.on('send-changes', delta =>{
            //console.log(delta)
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        socket.on('send-title', (title) => {
            console.log(title)
            socket.broadcast.to(documentId).emit('load-title', title)// broadcast title to all clients except the sender
        });


        socket.on("save-document", async data =>{
            //console.log("saving")
            await Document.findByIdAndUpdate(documentId, {data})
            console.log("document saved")
        })

        socket.on('save-title', async (title) => {
            // update the title in the database
            console.log(title)
            await Document.findByIdAndUpdate(documentId, { title });
            console.log("title saved ")
        });
    })
    
   
} )

async function findOrCreateDocument(id){
    if (id == null) return 
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({_id:id, data:defaultValue, title: defaultValue})

}