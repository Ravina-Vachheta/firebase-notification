import logo from "./logo.svg";
import "./App.css";
import { Button, Toast } from "react-bootstrap";
import { useState } from "react";
import "./firebase";
import { getNotificationToken, onMessageListener } from "./firebase";

function App() {
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  getNotificationToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
        icon: payload.notification.image,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      <Toast
        show={show}
        onClose={() => setShow(false)}
        delay={3000}
        autohide
        animation
        style={{ position: "absolute", top: 20, right: 20 }}
      >
        <Toast.Header>
          <img
            src={notification.icon}
            className="rounded me-2"
            alt=""
            height="25"
            width="25"
          />
          <strong className="mr-auto justify-content">
            {notification.title}
          </strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>
    </div>
  );
}

export default App;
