import { Avatar } from "@mui/material";

import React, { useEffect, useState } from "react";
import {useParams,Link} from 'react-router-dom'

import "./Sidebarchat.css";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import firebase from "../Firebase";
import { Logout } from "@mui/icons-material";

const firestore = firebase.firestore();

const Sidebarchat = ({ addNewChat }) => {
  const [seed, setseed] = useState();
  const [user, setuser] = useState("");
  const [f, setF] = useState(false);
  const {uid} = useParams()
  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);
  const Createchat = () => {
    const roomName = prompt("Please enter name of chat");

    if (roomName) {
    }
  };

  useEffect(() => {
    (async () => {
      const res = await firestore.collection("users").get();
      // console.log("././././././././",res.doc())
      let data = null;
      data = res.docs.map((d) => ({ ...d.data(), id: d.id }));

      // console.log("data :: ", data);

      // var value= [data]
      // console.log("Before user ....   .....", user);
      setuser(data);
      setF(true);
      // setTimeout(() => {
      //   console.log('After user ....   .....', user)
      // }, 10000);
    })();
  }, []);
  useEffect(() => {
    // console.log("============user==========", user);
  }, [f]);
 

  return !addNewChat ? (
    user ? (
      
   <div>
        {user.map((e) => (
          <Link to={`/home/${e.id}`}>
          <div className="sidebarChat" key={e.id}>
               <Avatar src={e.image} />
          <div className="sidebarchat_info">
       
          <h2>{e.name}</h2>
          <p>Last message ......</p>
          </div>
          </div>
          </Link>
        ))}
     </div>
     
    ) : (
      <h2>please wait for a while</h2>
    )
  ) : (
    <>
      <div onClick={Createchat}>
        <div className="sidebarChat">
          <h3>Add new Chat</h3>
        </div>
      </div>
    </>
  );

  
};

export default Sidebarchat;
