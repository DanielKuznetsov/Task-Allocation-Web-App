import { Button } from "@mantine/core";
import toast from "react-hot-toast";

const SolveButton = ({ isLoading, file, solveClicked }) => {
  const handleClick = () => {
    if (file && !isLoading) {
      solveClicked();
    } else {
      toast.error("Please upload a data file before solving the problem.");
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleClick}>
      Solve Problem
    </Button>
  );
};

export default SolveButton;
