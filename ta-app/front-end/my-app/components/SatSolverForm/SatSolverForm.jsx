import typography from "../../design-system/typography.module.css";
import classes from "./SatSolverForm.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  addRobot,
  setMaxAllowedTime,
  solveProblem,
  setIsSolved,
} from "../../features/data/dataSlice";
import { useState } from "react";
import { Error } from "../Miscellaneous/Error";

export const SatSolverForm = () => {
  // Robot IDs
  const [taskID, setTaskID] = useState(0);
  const [robotID, setRobotID] = useState(0);

  const [showTaskError, setShowTaskError] = useState(false);
  const [showRobotError, setShowRobotError] = useState(false);
  const [showMaxTimeError, setShowMaxTimeError] = useState(false);

  // Task/Robot Data
  const [taskData, setTaskData] = useState({
    id: null,
    startRoom: null,
    endRoom: null,
  });
  const [robotData, setRobotData] = useState({
    id: null,
    startRoom: null,
  });
  const [maxTime, setMaxTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.data);

  function handleTaskOnChange(event) {
    const { name, value } = event.target;

    const firstName = name.split(" ")[0].toLowerCase();
    const secondName = name.split(" ")[1];

    const newName = firstName + secondName;

    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        [newName]: value === "" ? null : Number(value),
        id: taskID,
      };
    });
    setShowTaskError(false);
  }

  function handleRobotOnChange(event) {
    const { name, value } = event.target;

    const firstName = name.split(" ")[0].toLowerCase();
    const secondName = name.split(" ")[1];

    const newName = firstName + secondName;

    setRobotData((prevRobotData) => {
      return {
        ...prevRobotData,
        [newName]: value === "" ? null : Number(value),
        id: robotID,
      };
    });
    setShowRobotError(false);
  }

  function handleMaxTimeOnChange(event) {
    const { value } = event.target;
    setMaxTime(value === "" ? null : Number(value));
    setShowMaxTimeError(false);
  }

  function addTaskOnClick() {
    if (taskData.startRoom === null || taskData.endRoom === null) {
      setShowTaskError(true);
    } else {
      dispatch(addTask(taskData));
      setTaskID((prevTaskID) => prevTaskID + 1);
      setTaskData({
        id: null,
        startRoom: null,
        endRoom: null,
      });
      setShowTaskError(false);
    }
  }

  function addRobotOnClick() {
    if (robotData.startRoom === null) {
      setShowRobotError(true);
    } else {
      dispatch(addRobot(robotData));
      setRobotID((prevRobotID) => prevRobotID + 1);
      setRobotData({
        id: null,
        startRoom: null,
      });
      setShowRobotError(false); // Reset the error state if the action is successful
    }
  }

  function addMaxTimeOnClick() {
    if (maxTime === null) {
      setShowMaxTimeError(true);
    } else {
      dispatch(setMaxAllowedTime(maxTime));
      setMaxTime(null);
    }
  }

  const solveClicked = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Log state for debugging
    console.log("Current state:", state);

    try {
      const payload = {
        tasks: Object.values(state.frontend.addedTasks).map((task) => ({
          startRoom: task.startRoom.toString(),
          endRoom: task.endRoom.toString(),
          task_ID: task.id.toString(),
        })),
        robots: Object.values(state.frontend.addedRobots).map((robot) => ({
          startRoom: robot.startRoom.toString(),
          robot_ID: robot.id.toString(),
        })),
        max_time: state.frontend.maxAllowedTime,
      };

      // Log payload for debugging
      console.log("Sending payload:", payload);

      const response = await fetch(
        "https://bscqvnlvr7aoe5qj5iscskunza0plllh.lambda-url.us-east-1.on.aws/solve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      dispatch(solveProblem(data));
      dispatch(setIsSolved(true));
      console.log("Response data:", data);
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const lableClasses = `${typography["text_large_semibold"]} ${classes.label}`;

  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <div className={classes.inputSections}>
          <div className={classes.inputSection}>
            <label className={lableClasses}>Assign Tasks</label>
            <div className={classes.buttons}>
              <div className={classes.buttonsWrapper}>
                <div>
                  <Input
                    id="StartRoom1"
                    label="Start Room"
                    value={taskData.startRoom}
                    onChange={handleTaskOnChange}
                  />
                </div>
                <div className={classes.lastChild}>
                  <Input
                    id="EndRoom"
                    label="End Room"
                    value={taskData.endRoom}
                    onChange={handleTaskOnChange}
                  />
                  <Button
                    disabled={
                      isLoading ||
                      state.frontend.inputErrors["StartRoom1"] ||
                      state.frontend.inputErrors["EndRoom"]
                    }
                    mode="secondary"
                    label="Add a task"
                    onClick={addTaskOnClick}
                  />
                </div>
              </div>
            </div>

            {showTaskError &&
            !state.frontend.inputErrors["StartRoom1"] &&
            !state.frontend.inputErrors["EndRoom"] ? (
              <Error text="Please fill in all task fields." />
            ) : // <div className={classes.error}>
            //   <Image src={WarningIcon} alt="Warning Icon" />
            //   <span className={typography["text_xs_regular"]}>
            //     Please fill in all task fields.
            //   </span>
            // </div>
            null}
          </div>

          <div className={classes.inputSection}>
            <label className={lableClasses}>Assign Robots</label>
            <div className={classes.buttons}>
              <Input
                id="StartRoom2"
                label="Start Room"
                value={robotData.startRoom}
                onChange={handleRobotOnChange}
              />
              <Button
                disabled={isLoading || state.frontend.inputErrors["StartRoom2"]}
                mode="secondary"
                label="Add a robot"
                onClick={addRobotOnClick}
              />
            </div>

            {showRobotError && !state.frontend.inputErrors["StartRoom2"] ? (
              <Error text="Please fill in all robot fields." />
            ) : // <div className={classes.error}>
            //   <Image src={WarningIcon} alt="Warning Icon" />
            //   <span className={typography["text_xs_regular"]}>
            //     Please fill in all robot fields.
            //   </span>
            // </div>
            null}
          </div>

          <div className={classes.inputSection}>
            <label className={lableClasses}>Maximum Time Allowed</label>
            <div className={classes.buttons}>
              <Input
                id="MaxTime"
                label="Time"
                value={maxTime}
                onChange={handleMaxTimeOnChange}
              />
              <Button
                disabled={isLoading || state.frontend.inputErrors["MaxTime"]}
                mode="secondary"
                label="Set time"
                onClick={addMaxTimeOnClick}
              />
            </div>

            {showMaxTimeError && !state.frontend.inputErrors["MaxTime"] ? (
              <Error text=" Please fill in the maximum allowed time field." />
            ) : // <div className={classes.error}>
            //   <Image src={WarningIcon} alt="Warning Icon" />
            //   <span className={typography["text_xs_regular"]}>
            //     Please fill in the maximum allowed time field.
            //   </span>
            // </div>
            null}
          </div>
        </div>

        <div className={classes.submit}>
          <Button
            size="large"
            label="Solve!"
            disabled={
              Object.keys(state.frontend.addedTasks).length === 0 ||
              Object.keys(state.frontend.addedRobots).length === 0 ||
              state.frontend.maxAllowedTime === 0
            }
            submittable={true}
            isLoading={isLoading}
            fullWidth={true}
            onClick={solveClicked}
          />
        </div>
      </form>
    </div>
  );
};
