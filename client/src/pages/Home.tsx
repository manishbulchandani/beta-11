import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
    </div>
  );
};

export default HomePage;
