import express from 'express'
import cors from 'cors'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBzwKUAmRfQnHN3zMvEd1PpgqN0GqaExlI",
    authDomain: "proyecto-backfront.firebaseapp.com",
    projectId: "proyecto-backfront",
    storageBucket: "proyecto-backfront.appspot.com",
    messagingSenderId: "480219900439",
    appId: "1:480219900439:web:2ec2a3c07c7fd13872ca52"
  };

const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

//Settings de la aplicacion
const app = express()
app.use(express.json())
app.use(cors())



//Creacion de rutas
app.get('/', async(req, res) => {
    try{
        //conexion a la coleccion de la base de datos
        const Users = await collection(db, 'Users')
        const listUsers = await getDocs(Users)
        const aux = []
        listUsers.forEach((doc) => {
            const obj = {
                id: doc.id,
                ...doc.data()
            }
            aux.push(obj)
        })
        res.send({
            'msg': 'success',
            'data': aux
        })
    } catch (error){
        res.send({
            'msg': 'error',
            'data': error
        })
        
    }
})


app.post('/create', async (req,res) => {
    try{
        const body = req.body
        const Users = await collection(db, 'Users')
        await addDoc(Users, body)
        res.send({
            'msg': 'success'
        })
    } catch (error){
        res.send({
            'msg': 'error',
            'data': error
        })
    }
})

// Prendemos el servidor
app.listen(9000, () => {
    console.log('Servidor Trabajando')
})