const admin = require('firebase-admin');
const serviceAccount = require('./keys/shareddrive-b0a0f-firebase-adminsdk-riyyg-a8cd6e9ad4.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const io = require('socket.io')(3001,{
    cors: {
        origin:'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})



io.on("connection", socket => {
    console.log("connected")
    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument(documentId);
        console.log(document);
        socket.join(documentId);
        socket.emit("load-document", document.body);
        socket.emit("load-title", document.title);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        });

        socket.on('send-title', (title) => {
            console.log(title);
            socket.broadcast.to(documentId).emit('load-title', title); // broadcast title to all clients except the sender
        });

        socket.on("save-document", async data => {
            let documentRef = db.collection('docs-data');
            let snapshot = await documentRef.where('url', '==', documentId).get();
    
            if (!snapshot.empty) {
                // Update the first matching document
                await snapshot.docs[0].ref.update({ body: data });
                console.log("document saved");
            }
        });

        socket.on('save-title', async (title) => {
            console.log(title);
            let documentRef = db.collection('docs-data');
            let snapshot = await documentRef.where('url', '==', documentId).get();
    
            if (!snapshot.empty) {
                // Update the first matching document
                await snapshot.docs[0].ref.update({ title });
                console.log("title saved");
            }
        });
    })
});

async function findOrCreateDocument(url){
    if (url == null) return;
    let documentRef = db.collection('docs-data');
    let snapshot = await documentRef.where('url', '==', url).get();
    
    if (!snapshot.empty) {
        // We'll just return the first document if there are multiple matches
        return snapshot.docs[0].data();
    } else {
        return null; // or handle this case appropriately
    }
    // await db.collection('docs-data').doc(id).set({_id:id, data:defaultValue, title: defaultValue})
    // document = await db.collection('docs-data').doc(id).get()
    // return document.data()
}