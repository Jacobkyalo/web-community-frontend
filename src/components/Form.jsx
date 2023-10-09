import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLL_ID, DB_ID, databases } from "../config/appwrite";
import { ID } from "appwrite";
import { toast } from "react-toastify";

export const Form = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    year: "",
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

    try {
      setLoading(true);
      await databases.createDocument(DB_ID, COLL_ID, ID.unique(), state);
      setState({
        firstname: "",
        lastname: "",
        year: "",
        message: "",
      });
      setLoading(false);
      toast.success("Your attendance submitted successfully");
    } catch (error) {
      toast.error(error.message);
    }

    // navigate("/");
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <h2 className="text-md opacity-80 mb-4">
            Please fill the following fields to submit your attendance!
          </h2>
          <div className="mb-2">
            <label htmlFor="firstname" className="block mb-1">
              Firstname
            </label>
            <input
              type="text"
              placeholder="Firstname"
              className="border rounded-md p-3 w-full outline-none"
              name="firstname"
              id="firstname"
              value={state.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastname" className="block mb-1">
              Lastname
            </label>
            <input
              type="text"
              placeholder="Lastname"
              className="border rounded-md p-3 w-full outline-none"
              name="lastname"
              id="lastname"
              value={state.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="year" className="block mb-1">
              Year of Study
            </label>
            <select
              name="year"
              id="year"
              // defaultValue={"Select year"}
              value={state.year}
              onChange={handleChange}
              className="border rounded-md p-3 w-full outline-none"
              placeholder="Select year"
            >
              <option value="Select year">Select year</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            {/* <input
              type="number"
              placeholder="Year of Study"
              className="border rounded-md p-3 w-full"
              name="year"
              min="1"
              max="4"
              required
              onChange={handleChange}
            /> */}
          </div>
          <div className="form-group">
            <label htmlFor="message" className="block mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              value={state.message}
              rows="5"
              placeholder="Message about the today's session"
              className="border rounded-md p-3 w-full outline-none"
              required
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="py-3 w-full bg-green-600 text-white text-lg rounded-md mt-6"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
