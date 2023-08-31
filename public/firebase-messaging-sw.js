/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCzpA2Kmd9LBcJUyHCNlh8B5d6QYKUmEGQ",
  authDomain: "auth-demo-b0dd5.firebaseapp.com",
  projectId: "auth-demo-b0dd5",
  storageBucket: "auth-demo-b0dd5.appspot.com",
  messagingSenderId: "108370000680",
  appId: "1:108370000680:web:15ff1f0e99f4f24f72ee1d",
  measurementId: "G-KC3S237BZN",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    action: [{ action: "show", title: "Show" }],
  };
  self.addEventListener(
    "notificationclick",
    function (event) {
      event.notification.close();
      clients.openWindow("/");
    },
    false
  );
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
