import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";


function Header(props) {
  const logOut = () => {
    props.onLogOut();
  }

  return (
    <header className="navbar">
      <div className="container-fluid">
      <h1>
        <DescriptionIcon />
        Noted
      </h1>
      <button onClick={logOut} className="btn btn-outline-danger">Log Out</button>
      </div>
    </header>
  );
}

export default Header;
