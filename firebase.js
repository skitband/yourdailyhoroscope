
import Firebase from 'Firebase/app';
import 'Firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzl0_Xdtt_0bKsh-VmQKMEkm6jAoU7n3A",
  authDomain: "yourdailyhoroscope-39036.firebaseapp.com",
  projectId: "yourdailyhoroscope-39036",
  storageBucket: "yourdailyhoroscope-39036.appspot.com",
  messagingSenderId: "592461061749",
  appId: "1:592461061749:web:3ed09e65475dfceff1a23c"
};

// Initialize Firebase
if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig)
}

export default Firebase;