import Register from "./pages/Register";

import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.scss";
import {
  BrowserRouter,
  // RouterProvider,
  Routes,
  Route,
  Navigate,
  // Link,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} = useContext(AuthContext);
  
  const ProctectedRoute = ({children}) =>{
    // console.log("l1",children);
    if(!currentUser){
      return <Navigate to="/login"/>;
    }
    return children
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProctectedRoute>
                                   <Home />
                                </ProctectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
