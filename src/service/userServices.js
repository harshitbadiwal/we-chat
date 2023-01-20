import firebase from "../Firebase";
import 'firebase/compat/firestore';
const firestore = firebase.firestore();


class Userservices {
    // adduser = async (newUser) => {
    //     console.log('====================================');
    //     console.log("newUser",newUser);
    //     console.log('====================================');
    //     return firestore.collection('users').add(newUser)
    // }
    getusers = async (id) => {
        return firestore.collection('users').doc(id).get();
    }
}

export default new Userservices