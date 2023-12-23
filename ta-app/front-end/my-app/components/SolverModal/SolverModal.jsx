import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, LoadingOverlay, Group, Box, Tabs, Text } from "@mantine/core";
import { ReaderIcon, RocketIcon } from "@radix-ui/react-icons";
import {
  addTask,
  addRobot,
  setMaxAllowedTime,
  solveProblem,
  setIsSolved,
  clearAllTasks,
  clearAllRobots,
} from "../../features/data/dataSlice";
import TaskTable from "./TaskTable";
import RobotTable from "./RobotTable";
import FileUploader from "./FileUploader";
import SolveButton from "./SolveButton";
import classes from "./SolverModal.module.css";
import toast from "react-hot-toast";

export const SolverModal = ({ opened, close }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data);

  useEffect(() => {
    const processFile = (file) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const content = JSON.parse(e.target.result);
          dispatchTasks(content);
          dispatchRobots(content);
          await fetchMaxTime(content);
        } catch (error) {
          console.error("Error processing file:", error);
        }
      };

      reader.readAsText(file);
    };

    // Dispatch tasks from the file content
    const dispatchTasks = (content) => {
      dispatch(clearAllTasks());

      content.tasks.forEach((task) => {
        dispatch(
          addTask({
            id: task.task_ID,
            startRoom: task.startRoom,
            finalRoom: task.endRoom,
          })
        );
      });
    };

    // Dispatch robots from the file content
    const dispatchRobots = (content) => {
      dispatch(clearAllRobots());

      content.robots.forEach((robot) => {
        dispatch(
          addRobot({
            id: robot.robot_ID,
            startRoom: robot.startRoom,
          })
        );
      });
    };

    const fetchMaxTime = (content) => {
      const idsAreUnique = (items) => {
        const ids = items.map((item) => item.robot_ID || item.task_ID);
        return new Set(ids).size === ids.length;
      };

      if (!idsAreUnique(content.robots) || !idsAreUnique(content.tasks)) {
        toast.error("IDs of robots and tasks must be unique.", {
          duration: 3000,
        });
        toast.error("Please re-upload a data file with unique IDs.", {
          duration: 3000,
        });
        return;
      }

      const fetchOperation = async () => {
        const response = await fetch(
          "https://task-allocation.up.railway.app/validate",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const maxTimeResponse = await response.json();
        console.log("maxTimeResponse", maxTimeResponse);
        dispatch(setMaxAllowedTime(maxTimeResponse));
        return maxTimeResponse;
      };

      toast.promise(fetchOperation(), {
        loading: "Fetching max time...",
        success: (maxTimeResponse) =>
          `Max time fetched successfully: ${maxTimeResponse}`,
        error: (error) => `Error fetching max time: ${error.message}`,
      });
    };

    if (file) {
      processFile(file);
    }
  }, [file, dispatch]);

  const mapTasks = (tasks) =>
    tasks.map((task) => ({
      startRoom: task.startRoom,
      endRoom: task.finalRoom,
      task_ID: task.id,
    }));

  const mapRobots = (robots) =>
    robots.map((robot) => ({
      startRoom: robot.startRoom,
      robot_ID: robot.id,
    }));

  const solveClicked = () => {
    if (state.frontend.maxAllowedTime !== 0) {
      console.log("Current state:", state);

      const solveOperation = async () => {
        const payload = {
          tasks: mapTasks(Object.values(state.frontend.addedTasks)),
          robots: mapRobots(Object.values(state.frontend.addedRobots)),
          max_time: state.frontend.maxAllowedTime,
        };

        console.log("Sending payload:", payload);

        const response = await fetch(
          `https://task-allocation.up.railway.app/solve`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorBody = await response.json();
          console.error("API error:", errorBody);
          throw new Error(errorBody.message || "API responded with an error.");
        }

        const data = await response.json();
        dispatch(solveProblem(data));
        dispatch(setIsSolved(true));

        console.log("Response data:", data);
        return data;
      };

      toast.promise(
        solveOperation(),
        {
          loading: "Solving problem...",
          success:
            "You can now close this form and use the play button to start the animation\n\n Control animation with the available buttons.",
          error: (error) => `Error solving problem: ${error.message}`,
        },
        {
          duration: 7000,
        }
      );
    } else {
      toast.error("Max allowed time must be above 0.");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      size="md"
      centered
    >
      <Tabs defaultValue="tasks">
        <Tabs.List>
          <Tabs.Tab
            disabled={isLoading}
            value="tasks"
            leftSection={<ReaderIcon />}
          >
            Tasks
          </Tabs.Tab>
          <Tabs.Tab
            disabled={isLoading}
            value="robots"
            leftSection={<RocketIcon />}
          >
            Robots
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="tasks" pt="xs">
          <Box pos="relative" style={{ marginBottom: "1.25rem" }}>
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <div className={classes.tableContent}>
              <Text size="xl">Tasks</Text>
              <TaskTable isLoading={isLoading} />
            </div>
          </Box>
          <Group position="center">
            <div className={classes.actionButtons}>
              <FileUploader
                isLoading={isLoading}
                file={file}
                setFile={setFile}
              />
              <SolveButton
                isLoading={isLoading}
                file={file}
                solveClicked={solveClicked}
              />
            </div>
          </Group>
        </Tabs.Panel>

        <Tabs.Panel value="robots" pt="xs">
          <Box pos="relative" style={{ marginBottom: "1.25rem" }}>
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <div className={classes.tableContent}>
              <Text size="xl">Robots</Text>
              <RobotTable isLoading={isLoading} />
            </div>
          </Box>
          <Group position="center">
            <div className={classes.actionButtons}>
              <FileUploader
                isLoading={isLoading}
                file={file}
                setFile={setFile}
              />
              <SolveButton
                isLoading={isLoading}
                file={file}
                solveClicked={solveClicked}
              />
            </div>
          </Group>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};
