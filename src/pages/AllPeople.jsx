import { Query } from "appwrite";
import { COLL_ID, DB_ID, databases } from "../config/appwrite";
import { useEffect, useState } from "react";
import AttendeeCard from "../components/AttendeeCard";
import { toast } from "react-toastify";

export default function AllPeople() {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllAttendees = async () => {
    try {
      setLoading(true);
      const res = await databases.listDocuments(DB_ID, COLL_ID);
      setAttendees(res.documents);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllAttendees();
  }, []);

  const date = new Date().toLocaleDateString();
  const getNowDate = (str) => {
    return new Date(str).toLocaleDateString();
  };

  return (
    <section className="my-8">
      <h3 className="mb-4 text-md sm:text-lg">
        Members present on{" "}
        <span className="text-green-600 font-bold">{date}</span>
      </h3>
      {loading ? (
        <p>Loadin data...</p>
      ) : (
        <>
          <table className="border-collapse w-full">
            <thead>
              <tr className="border text-start p-4">
                <th className="text-start">Fullname</th>
                <th className="text-start">Year of study</th>
                <th className="text-start">Message</th>
              </tr>
            </thead>
            {attendees?.length < 1 ? (
              <caption className="mt-4">No attendees yet</caption>
            ) : (
              <tbody>
                {attendees
                  ?.filter((att) => getNowDate(att.$createdAt) === date)
                  .map((attendee) => (
                    <tr key={attendee.$id} className="border text-start p-4">
                      <td>
                        {attendee.firstname} {attendee.lastname}
                      </td>
                      <td>{attendee.year}</td>
                      <td>{attendee.message}</td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </>
      )}
    </section>
  );
}
