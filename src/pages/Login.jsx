import React, {useState} from "react"; 
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
  
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    }catch(err){
      // console.log(err)
      setErr(true);
    }
   
    
  }
    return (
      <div className="formContainer">
        <div className="formWrapper">
            <span className="logo"> Chat App</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter Email" />
                <input type="password" placeholder="Enter Password"/>
                
                <button>Sign In</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    );
  };
  
  export default Login;
  