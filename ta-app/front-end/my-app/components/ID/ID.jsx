import typography from "../../design-system/typography.module.css";
import classes from "./ID.module.css";
import PropTypes from "prop-types";

export const ID = ({ id, mode, location }) => {
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

  const className = `${classes.id} ${
    mode === "robot" ? classes.robot : classes.task
  } ${additionalClass}`;

  return (
    <div className={className}>
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