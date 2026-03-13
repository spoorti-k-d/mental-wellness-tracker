import { useState } from "react";
import axios from "axios";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email,password }
      );

      alert("Login Successful");

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("userId",res.data.userId);

      window.location.href = "/assessment";

    } catch(err) {

      alert("Login Failed");

    }

  };

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#f0f4f8"
    }}>

      <div style={{
        background:"white",
        padding:"40px",
        borderRadius:"10px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
        textAlign:"center",
        width:"300px"
      }}>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"15px",
              borderRadius:"6px",
              border:"1px solid #ccc"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              width:"100%",
              padding:"10px",
              marginBottom:"20px",
              borderRadius:"6px",
              border:"1px solid #ccc"
            }}
          />

          <button
            type="submit"
            style={{
              width:"100%",
              padding:"10px",
              background:"#4CAF50",
              color:"white",
              border:"none",
              borderRadius:"6px",
              cursor:"pointer",
              fontWeight:"bold"
            }}
          >
            Login
          </button>

        </form>

        <p style={{marginTop:"15px"}}>
          New user? <a href="/register">Register</a>
        </p>

      </div>

    </div>

  );

}

export default Login;