import express from 'express'
import cors from 'cors'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCevU23_-oNunDP1Nk5DpLc9yHJUklgxGs",
    authDomain: "proyecto-backfront-e8e6c.firebaseapp.com",
    projectId: "proyecto-backfront-e8e6c",
    storageBucket: "proyecto-backfront-e8e6c.appspot.com",
    messagingSenderId: "444175226881",
    appId: "1:444175226881:web:2862b2a9a6ce56c5a28800"
  }

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

//ruta para borrar con el boton delete
app.get('/delete/:id', async (req, res) => {
   // console.log('@@@ param =>', req.params.id)
    const id = req.params.id
    try{
        await deleteDoc (doc(db, 'Users', id))
        res.send({
            'msg': 'user deleted'
        })
    } catch(error)  {
        res.send({
            'msg': 'error',
            'data': 'error'
        })
    } 
    
})

app.get('/get-update/:id', async (req, res) => {
    const id = req.params.id

    const userRef = doc(db, 'Users', id)
    const user = await getDoc(userRef)

    if (user.exists()) {
        res.send({
            'msg': 'success',
            'data': user.data()
        })
    } else{
        res.send({
            'msg': 'User doesnt exists'
        })
    }
})

// Prendemos el servidor
app.listen(9000, () => {
    console.log('Servidor Trabajando')
})