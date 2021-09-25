import firebase from 'firebase';
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBRdOWqAPClJfFyO84SemuP2VkCXc1dWLI",
    authDomain: "task-48980.firebaseapp.com",
    projectId: "task-48980",
    storageBucket: "task-48980.appspot.com",
    messagingSenderId: "403429009282",
    appId: "1:403429009282:web:c79ede835638cbbbaf519b",
    measurementId: "G-MCMK6DEVN0"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = firebase.firestore();
  export default database;