import typography from "../../design-system/typography.module.css";
import classes from "./ID.module.css";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

export const TaskID = ({
  id,
  mode,
  location,
  top,
  left,
  remove,
  currentTimeStep,
  robotsPath,
}) => {
  // if (mode === "task") {
  //   console.log("top: ", top);
  //   console.log("left: ", left);
  // }

  const [currentCoords, setCurrentCoords] = useState({ x: left, y: top });
  const [prevCoords, setPrevCoords] = useState({ x: left, y: top });

  useEffect(() => {
    if (currentTimeStep === 0) {
      setPrevCoords({ x: left, y: top });
    } else if (robotsPath && currentTimeStep >= 1) {
      const newPrevCoords = {
        x: robotsPath[currentTimeStep - 1][0],
        y: robotsPath[currentTimeStep - 1][1],
      };
      setPrevCoords(newPrevCoords);
      console.log("prevCoords (inside useEffect):", newPrevCoords);
    }

    const newCurrentCoords = { x: left, y: top };
    setCurrentCoords(newCurrentCoords);
    console.log("currentCoords (inside useEffect):", newCurrentCoords);
  }, [top, left, currentTimeStep, robotsPath]);

  let additionalClass = "";
  let textStyle = "";

  switch (location) {
    case "table":
      additionalClass = classes.table;
      textStyle = typography["text_xs_regular"];
      break;
    case "grid":
      additionalClass = classes.grid;
      textStyle = typography["text_xs_semibold"];
      break;
    default:
      console.log("ID location not recognized");
      return null;
  }

  const allClasses = `${classes.id} ${
    mode === "robot" ? classes.robot : classes.task
  } ${remove ? classes.remove : ""} ${additionalClass}`;

  return (
    <div
      className={allClasses}
      style={{ top: `${top * 22.5}px`, left: `${left * 22.5}px` }}
    >
      <span className={textStyle}>
        {mode === "robot" ? "R" : "T"}
        {id}
      </span>
    </div>
  );
};

TaskID.propTypes = {
  id: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["robot", "task"]),
  location: PropTypes.oneOf(["table", "grid"]).isRequired,
};

TaskID.defaultProps = {
  id: "0",
  mode: "robot",
  location: "grid",
};
