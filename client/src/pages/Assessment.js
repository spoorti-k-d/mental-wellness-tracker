import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialState = {
  answers: [1, 1, 1, 1, 1],
  userId: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ANSWERS":
      return { ...state, answers: action.answers };
    case "UPDATE_USER_ID":
      return { ...state, userId: action.userId };
    case "UPDATE_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

function Assessment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, dispatchState] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      dispatchState({ type: "UPDATE_USER_ID", userId: storedUserId });
    }
  }, []);

  const handleChange = (index, value) => {
    const newAnswers = [...state.answers];
    newAnswers[index] = parseInt(value);
    dispatchState({ type: "UPDATE_ANSWERS", answers: newAnswers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userId, answers } = state;

    if (!userId || !answers) {
      dispatchState({ type: "UPDATE_ERROR", error: "Please fill in all fields" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/assessment/submit",
        { userId, answers },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Accept",
          },
        }
      );

      dispatchState({ type: "UPDATE_ERROR", error: null });
      history.push("/dashboard");
    } catch (error) {
      dispatchState({ type: "UPDATE_ERROR", error: error.message });
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", background: "#f0f4f8" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", width: "350px" }}>
          <h2 style={{ textAlign: "center" }}>Mental Wellness Assessment</h2>

          <form onSubmit={handleSubmit}>
            <p>1. How stressed do you feel today?</p>
            <input
              type="number"
              min="1"
              max="5"
              onChange={(e) => handleChange(0, e.target.value)}
              style={inputStyle}
              required
            />

            <p>2. How well did you sleep?</p>
            <input
              type="number"
              min="1"
              max="5"
              onChange={(e) => handleChange(1, e.target.value)}
              style={inputStyle}
              required
            />

            <p>3. Do you feel anxious?</p>
            <input
              type="number"
              min="1"
              max="5"
              onChange={(e) => handleChange(2, e.target.value)}
              style={inputStyle}
              required
            />

            <p>4. Do you feel motivated?</p>
            <input
              type="number"
              min="1"
              max="5"
              onChange={(e) => handleChange(3, e.target.value)}
              style={inputStyle}
              required
            />

            <p>5. Do you feel overwhelmed?</p>
            <input
              type="number"
              min="1"
              max="5"
              onChange={(e) => handleChange(4, e.target.value)}
              style={inputStyle}
              required
            />

            <button type="submit" style={buttonStyle}>
              Submit Assessment
            </button>

            {state.error && (
              <div style={{ color: "red" }}>{state.error}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px",
};

export default Assessment;