import { Button } from "@mantine/core";
import toast from "react-hot-toast";
import { MantineButton } from "../Button/MantineButton";

const SolveButton = ({ isLoading, file, solveClicked }) => {
  const handleClick = () => {
    if (file && !isLoading) {
      solveClicked();
    } else {
      toast.error("Please upload a data file before solving the problem.");
    }
  };

  return (
    <MantineButton variant="filled" context="Solve Problem" disabled={isLoading} onClick={handleClick} />
  );
};

export default SolveButton;
