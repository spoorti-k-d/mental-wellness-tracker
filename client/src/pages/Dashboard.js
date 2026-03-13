import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Dashboard() {

  const [scores,setScores] = useState([]);

  const [breathing,setBreathing] = useState(false);
  const [time,setTime] = useState(60);

  useEffect(()=>{

    const fetchHistory = async()=>{

      const userId = localStorage.getItem("userId");

      const res = await axios.get(
        `http://localhost:5000/api/assessment/history/${userId}`
      );

      const data = res.data.map(a=>a.score);

      setScores(data);

    };

    fetchHistory();

  },[]);

  useEffect(()=>{

    if(!breathing) return;

    if(time === 0){
      setBreathing(false);
      setTime(60);
      return;
    }

    const timer = setTimeout(()=>{
      setTime(time - 1);
    },1000);

    return ()=>clearTimeout(timer);

  },[breathing,time]);

  const latestScore = scores.length > 0 ? scores[scores.length-1] : 0;

  const getRecommendation = () => {

    if(latestScore <= 10){
      return {
        level:"Low Stress",
        tips:[
          "You seem relaxed. Keep maintaining healthy habits.",
          "Continue regular exercise and good sleep.",
          "Spend time on hobbies you enjoy."
        ]
      };
    }

    if(latestScore <= 20){
      return {
        level:"Moderate Stress",
        tips:[
          "Take short breaks during work.",
          "Try deep breathing or stretching exercises.",
          "Limit screen time and go for a walk."
        ]
      };
    }

    return {
      level:"High Stress",
      tips:[
        "Try meditation or mindfulness for 5–10 minutes.",
        "Talk with a friend, mentor, or counselor.",
        "Write down your thoughts to release mental pressure."
      ]
    };

  };

  const recommendation = getRecommendation();

  // Motivational Quotes
  const quotes = [
    "Take care of your mind, it is your greatest asset.",
    "Small steps every day lead to big changes.",
    "Your mental health is just as important as your physical health.",
    "Pause. Breathe. Reset.",
    "Progress, not perfection."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const chartData = {
    labels: scores.map((_,i)=>`Test ${i+1}`),
    datasets:[
      {
        label:"Stress Score",
        data:scores,
        borderColor:"green",
        backgroundColor:"lightgreen"
      }
    ]
  };

  return(

    <>
    <Navbar />

    <div style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      background:"#f0f4f8",
      minHeight:"90vh",
      padding:"40px"
    }}>

      <h2>Mental Wellness Dashboard</h2>

      <div style={{
        background:"white",
        padding:"20px",
        borderRadius:"10px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
        marginBottom:"20px",
        textAlign:"center",
        width:"250px"
      }}>
        <h3>Latest Stress Score</h3>
        <h1>{latestScore}</h1>
      </div>

      <div style={{
        background:"white",
        padding:"20px",
        borderRadius:"10px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
        width:"450px"
      }}>
        <Line data={chartData} />
      </div>

      <div style={{
        marginTop:"20px",
        background:"#fff3cd",
        padding:"20px",
        borderRadius:"10px",
        width:"450px",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h3>Wellness Tips ({recommendation.level})</h3>

        <ul style={{textAlign:"left"}}>
          {recommendation.tips.map((tip,i)=>(
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <div style={{
        marginTop:"20px",
        background:"#d1ecf1",
        padding:"20px",
        borderRadius:"10px",
        width:"450px",
        textAlign:"center",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
      }}>

        <h3>Breathing Exercise</h3>

        {breathing ? (
          <>
            <p style={{fontSize:"20px"}}>
              Breathe slowly and relax
            </p>

            <h1>{time}s</h1>
          </>
        ) : (
          <button
            onClick={()=>setBreathing(true)}
            style={{
              padding:"10px 20px",
              background:"#17a2b8",
              color:"white",
              border:"none",
              borderRadius:"6px",
              cursor:"pointer"
            }}
          >
            Start 1-Minute Breathing
          </button>
        )}

      </div>

      {/* Motivational Quote */}

      <div style={{
        marginTop:"20px",
        background:"white",
        padding:"20px",
        borderRadius:"10px",
        width:"450px",
        textAlign:"center",
        boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
      }}>

        <h3>Daily Motivation</h3>

        <p style={{
          fontStyle:"italic",
          fontSize:"16px"
        }}>
          "{randomQuote}"
        </p>

      </div>

    </div>
    </>

  );

}

export default Dashboard;