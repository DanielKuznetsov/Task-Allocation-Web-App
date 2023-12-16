import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Canvas.module.css";
import { Cell } from "../Cell/Cell";
import { ID } from "../ID/ID";
import findPath from "./pathfinding";
import { setIsPlaying } from "../../features/data/dataSlice";
import typography from "../../design-system/typography.module.css";

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
  const backend = useSelector((state) => state.data.backend);
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

  // Process the path for each robot
  for (let eachRobot = 0; eachRobot < robotsN; eachRobot++) {
    let lastKnownRoom = null;
    let transitStartIndex = null;
    let inTransit = false;

    for (let timeStep = 0; timeStep <= maxAllowedTime; timeStep++) {
      const room = timeline[timeStep]?.robotsLocations?.[eachRobot]?.room; // Safe navigation

      if (room && room !== 0) {
        // If we are coming out of a transit
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

        // Update last known room and path
        lastKnownRoom = room;
        transitStartIndex = timeStep;
        inTransit = false;
        robotsPaths[eachRobot][timeStep] = [
          DEFAULT_POSITIONS[room].x,
          DEFAULT_POSITIONS[room].y,
        ];
      } else if (room === 0) {
        if (lastKnownRoom !== null && !inTransit) {
          // Just entered transit
          inTransit = true;
          transitStartIndex = timeStep - 1;
        }

        // If we are in transit, do nothing until we find the next non-zero room
        // We will fill the path once we have the next known room
      }
    }

    // If the robot ends in transit, calculate the last segment
    if (inTransit) {
      // Assuming the robot needs to stay in the last known room if no further instructions are given
      robotsPaths[eachRobot].fill(
        [
          DEFAULT_POSITIONS[lastKnownRoom].x,
          DEFAULT_POSITIONS[lastKnownRoom].y,
        ],
        transitStartIndex
      );
    }
  }

  // Helper function to calculate the path using the pathfinding library
  function calculatePath(startRoom, endRoom, steps) {
    const startX = DEFAULT_POSITIONS[startRoom].x;
    const startY = DEFAULT_POSITIONS[startRoom].y;
    const finalX = DEFAULT_POSITIONS[endRoom].x;
    const finalY = DEFAULT_POSITIONS[endRoom].y;

    const path = findPath([startX, startY], [finalX, finalY]);

    // console.log("PATHFINDING");
    // console.log(path);

    const stepIncrement = path.length / steps;

    let interpolatedPath = [];
    for (let step = 0; step < steps; step++) {
      interpolatedPath.push(path[Math.floor(step * stepIncrement)]);

      //   console.log("startRoom: ", startRoom);
      //   console.log("endRoom: ", endRoom);
      //   console.log("path: ", path);
      //   console.log("step: ", step);
      //   console.log("stepIncrement: ", stepIncrement);
      //   console.log(
      //     "path[Math.floor(step * stepIncrement)]",
      //     path[Math.floor(step * stepIncrement)]
      //   );
    }
    return interpolatedPath;
  }

  console.log("ROBOTS PATHS");
  console.log(robotsPaths);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      if (currentTime < maxAllowedTime) {
        const interval = setInterval(() => {
          setCurrentTime((currentTime) => currentTime + 1);
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [currentTime, maxAllowedTime, isPlaying]);

  const ids = robotsPaths.map((robotPath, robotIndex) => {
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

  const toggleIsPlaying = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const restartCurrentTime = () => {
    setCurrentTime(0);
    toggleIsPlaying();
  };

  return (
    <div className={classes.container}>
      <button
        onClick={toggleIsPlaying}
        disabled={Object.keys(backend).length === 0}
      >
        Toggle isPlaying!
      </button>
      <button
        onClick={restartCurrentTime}
        disabled={Object.keys(backend).length === 0}
      >
        Set currentTime to 0 - restart
      </button>
      <div className={classes.canvas}>
        {cells}

        {roomNames}

        {ids}
      </div>
    </div>
  );
};
