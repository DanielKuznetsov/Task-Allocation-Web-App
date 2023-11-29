import typography from "../../design-system/typography.module.css";
import classes from "./Miscellaneous.module.css";
import PropTypes from "prop-types";
import WarningIcon from "../../public/icons/warning.svg";
import Image from "next/image";

export const Error = ({ text }) => {
  return (
    <div className={classes.error}>
      <Image src={WarningIcon} alt="Warning Icon" />
      <span className={typography["text_xs_regular"]}>{text}</span>
    </div>
  );
};

Error.propTypes = {
  text: PropTypes.string,
};

Error.defaultProps = {
  text: "Value must be greater than 0.",
};
