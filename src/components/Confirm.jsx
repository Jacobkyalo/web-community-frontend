import { useNavigate } from "react-router-dom";

export const Confirm = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="card">
          <p>Attendance submitted successfully</p>
          <button type="submit" className="btn" onClick={() => navigate("/")}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
