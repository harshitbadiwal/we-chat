import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Chat from "../wechatComponent/Chat"
import Sidebar from "../wechatComponent/Sidebar"
import Button from '@mui/material/Button';
import './Home.css'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import { SwitchVideoSharp } from "@mui/icons-material"
import { useUserAuth } from "../context/AuthContext";
import backround from "../images/backround.jpg"


const Home =()=>{
    const {Logout} = useUserAuth()
    const navigate = useNavigate()
    

        
        
        // useEffect((res) => {
        //     let token = localStorage.setItem("token", res.user._delegate.accessToken);
        //     if (!token) {
        //         navigate("/")
        //     }
        // }, )

        // const signout =()=>{
        //      Logout()
        //    let token= localStorage.clear()

        //  }
    return<>
    <div className="app">
    <div className="app_body">
    <Sidebar/>
    <div className="image">
        <img src={backround} />
       
    </div>
    {/* <div className="btn">

    <Button onClick={()=>signout()}>Logout</Button>
    </div> */}
   
    </div>

    </div>
    </>
}
export default Home