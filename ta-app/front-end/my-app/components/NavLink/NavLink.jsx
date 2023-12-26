import classes from "./NavLink.module.css";
import Link from "next/link";

export const NavLink = ({ href, context }) => {
  return (
    <Link href={href}>
      <div className={classes.link}>
        <span>{context}</span>
      </div>
    </Link>
  );
};
