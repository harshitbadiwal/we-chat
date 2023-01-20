



import { useNavigate } from 'react-router-dom'
import { FormGroup, FormControl, Input, InputLabel, Typography, variant, Button, styled, imageListClasses } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { storage } from '../Firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from 'react-router-dom'
import { click } from '@testing-library/user-event/dist/click';
import { useState } from 'react';
import { useUserAuth } from '../context/AuthContext';
// import userServices from '../service/userservices';
import firebase from "../Firebase";
import 'firebase/compat/auth'
import 'firebase/compat/firestore';
import { Login } from '@mui/icons-material';

const initalVal = {
    name: '',
    username: '',
    email: '',
    phone: '',

}

const FirebaseAuth = firebase.auth();
const firestore = firebase.firestore();

const Container = styled(FormGroup)`
width: 60%;
display:flex;
margin: 5% auto 0 auto;
border:2px solid blue;
border-radius: 50px;
padding:2vw;
&> div{
    margin:15px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex:coloum ;
    width:80%;
    margin:auto;
    margin-bottom:25px
}`


const Register = () => {
    const [userimage, setuserimage] = useState('')
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [progresspercent, setProgresspercent] = useState(0);
    const navigate = useNavigate()
    const image = () => {
        const input = document.querySelector('.a')
        input.click()
    }
    const { signUp } = useUserAuth()
    console.log(email)


    const registeruser = async () => {
        console.log("registeruser called");
        const result = await FirebaseAuth.createUserWithEmailAndPassword(email, password);
        console.log("///////////////", result.user.uid);
        const users = await firestore.collection('users').doc(result.user.uid).set({
            name: name,
            email: result.user.email,
            image: userimage,
            uid: result.user.uid
        })
        navigate('/')
    }
    console.log("=============", userimage);

    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setuserimage(downloadURL)
                });
            }
        );
    }

    return <>
        <Container >

            <Typography variant="h4" sx={{textAlign:"center"}} >Register Account</Typography>
            <FormControl>
                <form onSubmit={handleSubmit} className='form '>
                    <input hidden   type='file'className='a' />
                    <AddCircleOutlineIcon onClick={()=>image()} />
                    <button type='submit'>Upload</button>
                </form>
            </FormControl>
            <FormControl>
                <InputLabel >Email</InputLabel>
                <Input name="email"
              
                    onChange={(e) => setemail(e.target.value)}
                />

            </FormControl>



            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input name="name"
                    onChange={(e) => setname(e.target.value)}
                />

            </FormControl>

            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input name="password"
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                />

            </FormControl>



            <FormControl>
                <Button variant="contained" onClick={() => registeruser()} >Register Account </Button>
            </FormControl>


        </Container>



    </>
}



export default Register