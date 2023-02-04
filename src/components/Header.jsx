import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className="logo">Web Community Attendance</h2>
      </Link>
    </header>
  );
};
