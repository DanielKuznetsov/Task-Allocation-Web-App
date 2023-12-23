import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Canvas.module.css";
import { Cell } from "../Cell/Cell";
import { ID } from "../ID/ID";
import findPath from "./pathfinding";
import {
  setIsPlaying,
  setCurrentTimeStep,
} from "../../features/data/dataSlice";
import typography from "../../design-system/typography.module.css";
import { Text } from "@mantine/core";
import { Slider, Button } from "@mantine/core";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  PlayIcon,
  PauseIcon,
  ResetIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import TaskTableMain from "./TaskTableMain";
import RobotTableMain from "./RobotTableMain";
import toast, { Toast } from "react-hot-toast";

const DEFAULT_POSITIONS = {
  1: { x: 3, y: 3 },
  2: { x: 14, y: 3 },
  3: { x: 3, y: 9 },
  4: { x: 9, y: 9 },
  5: { x: 3, y: 15 },
  6: { x: 26, y: 3 },
  7: { x: 26, y: 15 },
};

const ROOM_NAMES_LOCATIONS = {
  1: { x: 1, y: 1 },
  2: { x: 12, y: 1 },
  3: { x: 1, y: 7 },
  4: { x: 7, y: 7 },
  5: { x: 1, y: 13 },
  6: { x: 24, y: 1 },
  7: { x: 24, y: 13 },
};

export const Canvas = () => {
  const dispatch = useDispatch();
  const backendTasks = useSelector(
    (state) => state.data.backend.tasksLocations
  );
  const canvasLayout = useSelector((state) => state.data.frontend.canvasLayout);
  const isPlaying = useSelector((state) => state.data.frontend.isPlaying);
  const maxAllowedTime = useSelector(
    (state) => state.data.frontend.maxAllowedTime
  );
  const timeline = useSelector((state) => state.data.backend.timeline);
  const robotsN =
    timeline && timeline["0"] && maxAllowedTime !== 0
      ? Object.keys(timeline["0"].robotsLocations).length
      : null;

  const cells = canvasLayout.flatMap((row, rowIndex) =>
    row.map((cellValue, columnIndex) => {
      if (cellValue === 1) {
        return <Cell key={`${rowIndex}-${columnIndex}`} mode="barrier" />;
      } else {
        return <Cell key={`${rowIndex}-${columnIndex}`} mode="default" />;
      }
    })
  );

  const roomNames = Object.keys(ROOM_NAMES_LOCATIONS).map((room, index) => {
    const { x, y } = ROOM_NAMES_LOCATIONS[room];
    return (
      <span
        key={index}
        className={typography["text_xs_semibold"]}
        style={{
          position: "absolute",
          left: `${x * 22.5 + 2.75}px`,
          top: `${y * 22.5 + 2.5}px`,
          fontWeight: "bold",
        }}
      >
        #{room}
      </span>
    );
  });

  let robotsPaths = [];
  for (let i = 0; i < robotsN; i++) {
    robotsPaths.push(new Array(maxAllowedTime).fill(null));
  }

  for (let eachRobot = 0; eachRobot < robotsN; eachRobot++) {
    let lastKnownRoom = null;
    let transitStartIndex = null;
    let inTransit = false;

    for (let timeStep = 0; timeStep <= maxAllowedTime; timeStep++) {
      const room = timeline[timeStep]?.robotsLocations?.[eachRobot]?.room;

      if (room && room !== 0) {
        if (inTransit) {
          const path = calculatePath(
            lastKnownRoom,
            room,
            timeStep - transitStartIndex
          );
          for (let i = transitStartIndex; i < timeStep; i++) {
            robotsPaths[eachRobot][i] =
              path[i - transitStartIndex] || robotsPaths[eachRobot][i];
          }
        }

        lastKnownRoom = room;
        transitStartIndex = timeStep;
        inTransit = false;
        robotsPaths[eachRobot][timeStep] = [
          DEFAULT_POSITIONS[room].x,
          DEFAULT_POSITIONS[room].y,
        ];
      } else if (room === 0) {
        if (lastKnownRoom !== null && !inTransit) {
          inTransit = true;
          transitStartIndex = timeStep - 1;
        }
      }
    }

    if (inTransit) {
      robotsPaths[eachRobot].fill(
        [
          DEFAULT_POSITIONS[lastKnownRoom].x,
          DEFAULT_POSITIONS[lastKnownRoom].y,
        ],
        transitStartIndex
      );
    }
  }

  function calculatePath(startRoom, endRoom, steps) {
    const startX = DEFAULT_POSITIONS[startRoom].x;
    const startY = DEFAULT_POSITIONS[startRoom].y;
    const finalX = DEFAULT_POSITIONS[endRoom].x;
    const finalY = DEFAULT_POSITIONS[endRoom].y;

    const path = findPath([startX, startY], [finalX, finalY]);

    const stepIncrement = path.length / steps;

    let interpolatedPath = [];
    for (let step = 0; step < steps; step++) {
      interpolatedPath.push(path[Math.floor(step * stepIncrement)]);
    }
    return interpolatedPath;
  }

  const [currentTime, setCurrentTime] = useState(0);
  const [ids, setIds] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const newIds = robotsPaths.map((robotPath, robotIndex) => {
      return robotPath
        .map((path, timeStep) => {
          if (path && currentTime === timeStep) {
            return (
              <ID
                key={`${robotIndex}-${timeStep}`}
                id={robotIndex.toString()}
                mode="robot"
                location="grid"
                top={path[1]}
                left={path[0]}
              />
            );
          }
          return null;
        })
        .filter((component) => component !== null);
    });

    if (JSON.stringify(newIds) !== JSON.stringify(ids)) {
      setIds(newIds);
    }
  }, [currentTime, robotsPaths]);

  useEffect(() => {
    console.log(backendTasks);

    if (backendTasks) {
      const newTasksArray = Object.values(backendTasks);

      // console.log(DEFAULT_POSITIONS[`${newTasksArray[0].pickUpRoom}`].y)
      const newTasks = newTasksArray.map((task) => (
        <ID
          key={`${task.id}-${task.pickUpRoom}`}
          id={`${task.id}`}
          mode="task"
          location="grid"
          top={DEFAULT_POSITIONS[`${task.pickUpRoom}`].y}
          left={DEFAULT_POSITIONS[`${task.pickUpRoom}`].x}
          remove={currentTime >= task.pickUpTime}
        />
      ));

      setTasks(newTasks);
    }
  }, [currentTime, backendTasks]);

  useEffect(() => {
    if (isPlaying) {
      if (currentTime < maxAllowedTime) {
        const interval = setInterval(() => {
          const time = currentTime + 1;
          setCurrentTime((currentTime) => currentTime + 1);
          dispatch(setCurrentTimeStep(time));
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [currentTime, maxAllowedTime, isPlaying]);

  const pause = () => {
    toggleIsPlaying(false);
  };

  const play = () => {
    toggleIsPlaying(true);
  };

  const reset = () => {
    setCurrentTime(0);
    toggleIsPlaying();

    dispatch(setCurrentTimeStep(0));
  };

  const moveBackTwo = () => {
    const newTime = currentTime - 2;
    if (newTime >= 0 && currentTime - 2 >= 0) {
      setCurrentTime(newTime);
      dispatch(setCurrentTimeStep(newTime));
    }
  };

  const moveForwardTwo = () => {
    const newTime = currentTime + 2;
    if (newTime <= maxAllowedTime) {
      setCurrentTime(newTime);
      dispatch(setCurrentTimeStep(newTime));
    }
  };

  const toggleIsPlaying = (action) => {
    if (isPlaying === true) {
      toast.success("Animation is already on!")
    } else {
      toast.success("Animation has started!")
    }
    dispatch(setIsPlaying(action));
  };

  const updateTimeStep = (time) => {
    setCurrentTime(time);

    dispatch(setCurrentTimeStep(time));
  };

  return (
    <div className={classes.mainSectionContainer}>
      <div className={classes.animationContainer}>
        <div className={classes.canvas}>
          {cells}

          {roomNames}

          {ids}

          {tasks}
        </div>
      </div>

      <div>
        <div className={classes.timerContainer}>
          <div className={classes.currentTime}>
            <Text
              size={timeline === undefined ? "md" : "xl"}
              fw={timeline === undefined ? null : 600}
              c="#000000d9"
            >
              {timeline === undefined ? (
                <span className={classes.zeroDataSlider}>
                  <ExclamationTriangleIcon color="red" width="48" height="48" />
                  <span>No data to display at the moment. </span>
                </span>
              ) : currentTime === 0 ? (
                "Not started yet!"
              ) : (
                `Time Step: ${currentTime}`
              )}
            </Text>
          </div>

          {timeline !== undefined ? (
            <div className={classes.controllersWrapper}>
              <div className={classes.buttonControllers}>
                <Button
                  size="xs"
                  onClick={moveBackTwo}
                  variant="outline"
                  color="gray"
                >
                  <DoubleArrowLeftIcon />
                </Button>

                <Button
                  size="xs"
                  onClick={pause}
                  variant="outline"
                  color="gray"
                >
                  <PauseIcon />
                </Button>

                <Button size="xs" onClick={play} variant="outline" color="gray">
                  <PlayIcon />
                </Button>

                <Button
                  size="xs"
                  onClick={reset}
                  variant="outline"
                  color="gray"
                >
                  <ResetIcon />
                </Button>

                <Button
                  size="xs"
                  onClick={moveForwardTwo}
                  variant="outline"
                  color="gray"
                >
                  <DoubleArrowRightIcon />
                </Button>
              </div>

              <div className="timer-slider">
                <Slider
                  onChange={updateTimeStep}
                  max={maxAllowedTime}
                  defaultValue={0}
                  value={currentTime}
                  label={(value) => `Time: ${value}`}
                  // styles={{ markLabel: { display: 'none' } }}
                  marks={[
                    { value: Math.round(maxAllowedTime * 0), label: "0%" },
                    { value: Math.round(maxAllowedTime * 0.5), label: "50%" },
                    { value: Math.round(maxAllowedTime * 1), label: "100%" },
                  ]}
                  size="md"
                  color="blue"
                  classNames={classes}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          <Text
            className={typography["text_xl_medium"]}
            size="sm"
            style={{ marginBottom: "10px" }}
          >
            Tasks Tab
          </Text>
          <div
            style={{
              height: "165px",
              border: "1px solid #e0e0e0",
              marginBottom: "1.5rem",
            }}
          >
            <TaskTableMain />
          </div>
        </div>

        <div>
          <Text
            className={typography["text_xl_medium"]}
            size="sm"
            style={{ marginBottom: "10px" }}
          >
            Robots Tab
          </Text>
          <div
            style={{
              height: "136px",
              border: "1px solid #e0e0e0",
              // marginBottom: "2rem",
            }}
          >
            <RobotTableMain />
          </div>
        </div>
      </div>
    </div>
  );
};
