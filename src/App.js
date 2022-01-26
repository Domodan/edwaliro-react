import Main from "./components/Main";
import Login from "./components/Login";
import { useEffect, useState } from "react";

function App() {
  const token = sessionStorage.getItem('token');
  const [user, setUser] = useState(false);
  
  useEffect(() => {
    if(token !== null) {
      setUser(true);
    }
  }, [token]);
  
  return (
    <div>
      {
        user ? (
          <>
            <Main />
          </>
        ):
        (
          <>
            <Login />
          </>
        )
      }
    </div>
  );
}

export default App;
