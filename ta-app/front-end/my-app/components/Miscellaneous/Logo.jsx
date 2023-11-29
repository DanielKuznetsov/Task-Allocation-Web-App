import classes from "./Miscellaneous.module.css";
import Image from "next/image";
import LogoImage from "../../public/icons/logo.svg";

export const Logo = () => {
  const className = `${classes.logo}`;

  return (
    <div className={className}>
      <Image src={LogoImage} alt="UC Berkeley Official Logo" width={100} height={100} />
    </div>
  );
};
