import Image from "next/image";
import classes from "./Footer.module.css";
import footerImage from "../../public/footer.webp";
import { MantineButton } from "../Button/MantineButton";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className={classes.footerContainer}>
      <Image src={footerImage} className={classes.image} />
      <div className={classes.footerContent}>
        <h1 className={classes.title}>
          <span>
            Gain insights into the multi-robot{" "}
            <span>task allocation problem</span>
          </span>
        </h1>
        <h3 className={classes.subtitle}>
          <span>Delve into our detailed research or experience our</span>
          <span> simulation in the interactive demo</span>
        </h3>
        <div className={classes.buttons}>
          <MantineButton variant="outline" context="Read Paper" big />
          <Link href="/demo">
            <MantineButton variant="filled" context="Get Started" big />
          </Link>
        </div>
      </div>
    </div>
  );
};
