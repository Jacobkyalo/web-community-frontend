import { Header } from "./Header";
import { Form } from "./Form";

export const Home = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <Header />
        <Form />
      </div>
    </div>
  );
};
