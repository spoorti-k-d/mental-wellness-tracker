import { Link } from "react-router-dom";

function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (

    <div style={{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      background:"#4CAF50",
      padding:"10px 20px",
      color:"white"
    }}>

      <h3>Mental Wellness</h3>

      <div>

        <Link to="/assessment" style={linkStyle}>
          Assessment
        </Link>

        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <button
          onClick={handleLogout}
          style={{
            background:"white",
            border:"none",
            padding:"6px 10px",
            borderRadius:"5px",
            cursor:"pointer"
          }}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

const linkStyle = {
  color:"white",
  marginRight:"15px",
  textDecoration:"none",
  fontWeight:"bold"
};

export default Navbar;