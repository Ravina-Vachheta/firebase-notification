import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCzpA2Kmd9LBcJUyHCNlh8B5d6QYKUmEGQ",
  authDomain: "auth-demo-b0dd5.firebaseapp.com",
  projectId: "auth-demo-b0dd5",
  storageBucket: "auth-demo-b0dd5.appspot.com",
  messagingSenderId: "108370000680",
  appId: "1:108370000680:web:15ff1f0e99f4f24f72ee1d",
  measurementId: "G-KC3S237BZN",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getNotificationToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_NOTIFICATION_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("error occured while registering token: ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
