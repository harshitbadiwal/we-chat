

import firebase from "../Firebase";
import 'firebase/compat/auth'
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const FirebaseAuth = firebase.auth()

const UserAuthContext = createContext()


export function UserAuthContextProvider ({children}) {
  const [user,setuser] = useState("")

  const Signup = async (email,password)=>{
      return FirebaseAuth.createUserWithEmailAndPassword(email,password)
  }
  const Login = async (email,password) =>{
      return FirebaseAuth.signInWithEmailAndPassword(email,password)
  }

  
useEffect(() => {
  const unsubscribe = FirebaseAuth.onAuthStateChanged((currentUser) => {
    setuser(currentUser);
  });
  return () => {
    unsubscribe();
  };
}, []);

  return (
      <UserAuthContext.Provider value={{user,Signup,Login}} >{children}</UserAuthContext.Provider>
  )
}

export function useUserAuth(){
  return useContext(UserAuthContext)
}