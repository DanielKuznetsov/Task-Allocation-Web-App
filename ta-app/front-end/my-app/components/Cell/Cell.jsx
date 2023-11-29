import classes from "./Cell.module.css";
import PropTypes from "prop-types";

export const Cell = ({ mode = "default" }) => {
  const className = `${classes.cell} ${classes[mode]}`;

  return <div className={className}></div>;
};

Cell.propTypes = {
  mode: PropTypes.oneOf(["default", "barrier"]),
};

Cell.defaultProps = {
  mode: "default",
};
