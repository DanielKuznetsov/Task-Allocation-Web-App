import typography from "../../design-system/typography.module.css";
import classes from "./ID.module.css";
import PropTypes from "prop-types";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const ID = ({
  id,
  mode,
  location,
  top,
  left,
  remove,
  currentTimeStep,
  robotsPath,
}) => {
  const [currentCoords, setCurrentCoords] = useState({ x: left, y: top });
  const [prevCoords, setPrevCoords] = useState({ x: left, y: top });
  const increasing = useSelector((state) => state.data.frontend.increasing);
  const decreasing = useSelector((state) => state.data.frontend.decreasing);

  useLayoutEffect(() => {
    if (currentTimeStep === 0) {
      setPrevCoords({ x: left, y: top });
      setCurrentCoords({ x: left, y: top });
    } else if (robotsPath && currentTimeStep >= 1) {
      if (increasing) {
        // Moving forward in time
        setPrevCoords({
          x: robotsPath[currentTimeStep - 1][0],
          y: robotsPath[currentTimeStep - 1][1],
        });
        setCurrentCoords({ x: left, y: top });
      } else if (decreasing) {
        // Moving backward in time
        setCurrentCoords({
          x: robotsPath[currentTimeStep - 1][0],
          y: robotsPath[currentTimeStep - 1][1],
        });
        setPrevCoords({ x: left, y: top });
      }
    }
  }, [top, left, currentTimeStep, robotsPath, increasing, decreasing]);

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

  const movingClass = currentTimeStep > 0 ? classes.moving : "";

  return (
    <div
      className={`${allClasses} ${movingClass}`}
      style={{
        "--prevTop": `${prevCoords.y * 22.5}px`,
        "--prevLeft": `${prevCoords.x * 22.5}px`,
        "--currentTop": `${currentCoords.y * 22.5}px`,
        "--currentLeft": `${currentCoords.x * 22.5}px`,
        top: currentTimeStep === 0 ? `${top * 22.5}px` : "",
        left: currentTimeStep === 0 ? `${left * 22.5}px` : "",
      }}
    >
      <span className={textStyle}>
        {mode === "robot" ? "R" : "T"}
        {id}
      </span>
    </div>
  );
};

ID.propTypes = {
  id: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["robot", "task"]),
  location: PropTypes.oneOf(["table", "grid"]).isRequired,
};

ID.defaultProps = {
  id: "0",
  mode: "robot",
  location: "grid",
};
