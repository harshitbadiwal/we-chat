import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'react-router-dom'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css'
import Sidebar from './Sidebar';
import Sidebarchat from './Sidebarchat';
import firebase from "../Firebase";
import Userservices from '../service/userServices';

const firestore = firebase.firestore();
const Chat = () => {
    // const [seed, setseed] = useState()
    const [input, setinput] = useState('')
    const [user, setuser] = useState('')
    const [usermessages, setusermessages] = useState("")
    const { id } = useParams()

    // useEffect(() => {
    //     setseed(Math.floor(Math.random() * 5000))

    // }, [])


    useEffect(() => {
        getuserdata();
        getFirebaseData(id)
       
    }, [id])

    useEffect(() => {
        getFirebaseData(id)
    }, [input])
    
    const getuserdata = async () => {
        let res = await Userservices.getusers(id)
        const response = res.data()
        setuser(response)
        // console.log("....////....", user )
        // console.log("id",id);
        // let res = await firestore.collection('users').doc(id).get()
        // const data = res.data();
        // console.log("data :: ", data);
    }
    

    // async function getAllUsersMessages(id){
    //     const refs = firebase
    //     .firestore()
    //     .collection("users");
    //   const snapshot = await refs.get();
    //   snapshot.forEach(doc => {
    //     getFirebaseData(doc.id)
    //   });   
    // }

    const image = () => {
        const input = document.querySelector('.a')
        input.click()
    }


    async function getFirebaseData(id) {
        const refs = firebase.firestore().collection("users").doc(id).collection("messages");
        const snapshot = await refs.get();
        console.log("start end ", id);
        console.log("snapshot",snapshot);
        const chat=[]
        snapshot.forEach((doc) => {
            console.log("doc.data()",doc.data().chat);
            chat.unshift(doc.data().chat )
        });

        setusermessages(chat);
        // console.log("users", messages)

    }
  
    
    const sendMessage = (e) => {
        e.preventDefault()
        console.log("........", input)

        firebase
            .firestore().collection("users").doc(id).collection("messages").add({
                message: input,

            })


        setinput('')
    }


    return <>
        <div>


            <div className='chat'>
                <div className='chat_header'>
                    <Avatar src={user.image} />
                    <div className='chat_header_info'>
                        <h3>{user.name}</h3>
                        <p>last seen .....</p>
                    </div>
                    <div className='chat_header_right'>
                        <IconButton>
                            <SearchIcon />
                        </IconButton> <form className='form '>
                            <input hidden type='file' className='a' />
                            <IconButton>
                                <AttachFileIcon onClick={() => image()} />
                            </IconButton>

                        </form>

                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </div>
                <div className='chat_body'>

                    <div className={`chat_message ${true && 'chat_reciever'}`}>
                        
                        {
                            usermessages ? usermessages.map(message => <div className='chat_reciver chat_message'>
                                <span className='chat_name'>{usermessages.name}</span>{message}</div>) : <h1>"please wait "</h1>
                        }
                        
                        </div>
                </div>
                <div className='Chat_footer'>
                    <IconButton>
                        <InsertEmoticonIcon />
                    </IconButton>
                    <form>
                        <input value={input} onChange={(e) => setinput(e.target.value)} type="text" placeholder='Type a message' />
                        <button onClick={sendMessage} type="submit">send a message</button>
                    </form>
                    <IconButton>
                        <MicIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    </>
}

export default Chat