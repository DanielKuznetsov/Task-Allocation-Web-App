import classes from "./NavLink.module.css";
import Link from "next/link";

export const NavLink = ({ context, onClick }) => {
  return (
    <div className={classes.link} onClick={onClick}>
      <span>{context}</span>
    </div>
  );
};
