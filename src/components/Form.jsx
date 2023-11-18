import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BUCKET_ID,
  COLL_ID,
  DB_ID,
  databases,
  storage,
} from "../config/appwrite";
import { ID } from "appwrite";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Form = () => {
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    year: yup.string().required(),
    message: yup.string().required(),
    snippet: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleFileUpload = async () => {
    try {
      await storage.createFile(BUCKET_ID, ID.unique(), snippet);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = async (e, data) => {
    e.preventDefault();

    try {
      setLoading(true);
      await databases.createDocument(DB_ID, COLL_ID, ID.unique(), data);
      await handleFileUpload();

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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
          <h2 className="text-md opacity-80 mb-4">
            Please fill the following fields to submit your
            <Link to="/all"> attendance</Link>
            <Link to="/images"> images</Link>
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
              {...register("firstname")}
            />
            <p className="text-red-600 text-sm first-letter:uppercase mt-1">
              {errors.firstname?.message}
            </p>
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
              {...register("lastname")}
            />
            <p className="text-red-600 text-sm first-letter:uppercase mt-1">
              {errors.lastname?.message}
            </p>
          </div>
          <div className="mb-2">
            <label htmlFor="year" className="block mb-1">
              Year of Study
            </label>
            <select
              name="year"
              id="year"
              {...register("year")}
              className="border rounded-md p-3 w-full outline-none"
              placeholder="Select year"
            >
              <option value="Select year">Select year</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <p className="text-red-600 text-sm first-letter:uppercase mt-1">
              {errors.year?.message}
            </p>
          </div>
          <div className="mb-2">
            <label htmlFor="snippet" className="block mb-1">
              Code snippet
            </label>
            <input
              type="file"
              placeholder="Code snippet"
              className="border rounded-md p-3 w-full outline-none"
              name="snippet"
              id="snippet"
              {...register("snippet")}
            />
            <p className="text-red-600 text-sm first-letter:uppercase mt-1">
              {errors.snippet?.message}
            </p>
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="5"
              placeholder="Message about the today's session"
              className="border rounded-md p-3 w-full outline-none"
              {...register("message")}
            />
            <p className="text-red-600 text-sm first-letter:uppercase mt-1">
              {errors.message?.message}
            </p>
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
