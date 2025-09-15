import { useState, useEffect } from "react";
import Login from "./components/Login";
import Notes from "./components/Notes";
import { getToken } from "./auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {loggedIn ? <Notes /> : <Login onLogin={() => setLoggedIn(true)} />}
    </div>
  );
}

export default App;
