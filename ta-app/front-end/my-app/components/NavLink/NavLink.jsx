import classes from "./NavLink.module.css";
import Link from "next/link";

export const NavLink = ({ context, onClick, href }) => {
  if (href) {
    return (
      <Link href={href}>
        <div className={classes.link} onClick={handleClick}>
          <span>{context}</span>
        </div>
      </Link>
    );
  }
  return (
    <div className={classes.link} onClick={onClick}>
      <span>{context}</span>
    </div>
  );
};
