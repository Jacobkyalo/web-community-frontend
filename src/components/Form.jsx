import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const Form = () => {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    year: null,
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post(
      "https://web-community-backend.onrender.com/attendance",
      state
    );
    console.log(res);
    navigate("/confirm");
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-header">
          Please fill the following fields to submit your attendance!
        </h2>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                placeholder="Firstname"
                name="firstname"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                placeholder="Lastname"
                name="lastname"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year of Study</label>
              <input
                type="number"
                placeholder="Year of Study"
                name="year"
                min="1"
                max="4"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                cols="30"
                rows="3"
                placeholder="Message about the today's session"
                required
                onChange={handleChange}
              />
            </div>
            <input type="submit" value="Submit Attendance" />
          </form>
        </div>
      </div>
    </div>
  );
};
