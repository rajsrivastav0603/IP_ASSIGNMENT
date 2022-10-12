const firebase = require('firebase');
const express = require("express")

const app = express();

const firebaseConfig = {
    apiKey: "AIzaSyCJU_A8RWvrXxDMUFqR1Ot-7HmXHM2TedI",
    authDomain: "nodetofirebase.firebaseapp.com",
    projectId: "nodetofirebase",
    storageBucket: "nodetofirebase.appspot.com",
    messagingSenderId: "43750731263",
    appId: "1:43750731263:web:f34c85bcb8cb845bf28bca",
    measurementId: "G-H86FXEJEBN"
  };

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
app.get('/' , (req , res)=>{
    (async()=>{
        try {
            let response = []
            await db.collection('users').get().then(querysnapshot=>{
                let docs  = querysnapshot.docs;
                for(let doc of docs){
                    response.push(doc.data())
                }
                return res.status(200).send(response)
            })
        }catch(error){
            return res.status(500).send(error)
        }
    })()
})

const port = process.env.port || 5000

app.listen(port , ()=>{
    console.log("server is running on port" , port)
})