import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Assessment() {

  const [answers,setAnswers] = useState([1,1,1,1,1]);

  const handleChange = (index,value) => {

    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);

    setAnswers(newAnswers);

  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    const userId = localStorage.getItem("userId");

    try {

      const res = await axios.post(
        "http://localhost:5000/api/assessment/submit",
        { userId,answers }
      );

      alert(
        "Score: " +
        res.data.score +
        " | Mood: " +
        res.data.moodLevel
      );

      window.location.href = "/dashboard";

    } catch(err) {

      alert("Submission failed");

    }

  };

  return (

    <>
    <Navbar />

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"90vh",
      background:"#f0f4f8"
    }}>

      <div style={{
        background:"white",
        padding:"40px",
        borderRadius:"10px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
        width:"350px"
      }}>

        <h2 style={{textAlign:"center"}}>Mental Wellness Assessment</h2>

        <form onSubmit={handleSubmit}>

          <p>1. How stressed do you feel today?</p>
          <input
            type="number"
            min="1"
            max="5"
            onChange={(e)=>handleChange(0,e.target.value)}
            style={inputStyle}
          />

          <p>2. How well did you sleep?</p>
          <input
            type="number"
            min="1"
            max="5"
            onChange={(e)=>handleChange(1,e.target.value)}
            style={inputStyle}
          />

          <p>3. Do you feel anxious?</p>
          <input
            type="number"
            min="1"
            max="5"
            onChange={(e)=>handleChange(2,e.target.value)}
            style={inputStyle}
          />

          <p>4. Do you feel motivated?</p>
          <input
            type="number"
            min="1"
            max="5"
            onChange={(e)=>handleChange(3,e.target.value)}
            style={inputStyle}
          />

          <p>5. Do you feel overwhelmed?</p>
          <input
            type="number"
            min="1"
            max="5"
            onChange={(e)=>handleChange(4,e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            Submit Assessment
          </button>

        </form>

      </div>

    </div>
    </>

  );

}

const inputStyle = {
  width:"100%",
  padding:"8px",
  marginBottom:"10px",
  borderRadius:"6px",
  border:"1px solid #ccc"
};

const buttonStyle = {
  width:"100%",
  padding:"10px",
  background:"#4CAF50",
  color:"white",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer",
  fontWeight:"bold",
  marginTop:"10px"
};

export default Assessment;