import classes from "./StatusBar.module.css";

export const StatusBar = ({ status }) => {
  let allClasses = ``;

  if (status === "delivering" || status == "in transit") {
    allClasses = `${classes.defaultStyles} ${classes.delivering}`;
  } else if (status === "en route") {
    allClasses = `${classes.defaultStyles} ${classes.enRoute}`;
  } else if (status === "idle") {
    allClasses = `${classes.defaultStyles} ${classes.idle}`;
  } else if (status === "completed") {
    allClasses = `${classes.defaultStyles} ${classes.completed}`;
  } else if (status === "picked up") {
    allClasses = `${classes.defaultStyles} ${classes.pickedUp}`;
  } else if (status === "dropped off") {
    allClasses = `${classes.defaultStyles} ${classes.droppedOff}`;
  }

  return (
    <>
      <div className={allClasses}>{status}</div>
    </>
  );
};
