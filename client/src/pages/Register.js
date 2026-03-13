import { useState } from "react";
import axios from "axios";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name,email,password }
      );

      alert(res.data.message);

      window.location.href = "/";

    } catch(err) {

      alert(err.response?.data?.message || "Registration failed");

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
        width:"320px"
      }}>

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={inputStyle}
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
            Register
          </button>

        </form>

        <p style={{marginTop:"15px"}}>
          Already have an account? <a href="/">Login</a>
        </p>

      </div>

    </div>

  );

}

const inputStyle = {
  width:"100%",
  padding:"10px",
  marginBottom:"15px",
  borderRadius:"6px",
  border:"1px solid #ccc"
};

export default Register;