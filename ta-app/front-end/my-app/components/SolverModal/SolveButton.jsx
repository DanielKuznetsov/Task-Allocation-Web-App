import { Button } from "@mantine/core";

const SolveButton = ({ isLoading, file, solveClicked }) => {
  return (
    <Button
      disabled={isLoading}
      onClick={file && !isLoading ? solveClicked : undefined}
    >
      Solve Problem
    </Button>
  );
};

export default SolveButton;
