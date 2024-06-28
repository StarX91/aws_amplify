import logo from './logo.svg';
import './App.css';
import LoginButton from './components/login';
import Logout from './components/logout'; // Change this line
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "261778488059-r3p7jn1uctichj37qi3kq21j1fghclns.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
    <div className="App">
      <LoginButton />
      <Logout /> {/* Change this line */}
    </div>
  );
}

export default App;
