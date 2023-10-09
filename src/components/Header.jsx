import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="py-4">
      <Link to="/">
        <h2 className="text-lg sm:text-xl md:text-2xl mb-6 text-green-600 font-semibold">
          Web Community Attendance
        </h2>
      </Link>
    </header>
  );
};
