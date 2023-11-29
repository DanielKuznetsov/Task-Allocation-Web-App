import classes from "./Miscellaneous.module.css";
import PropTypes from "prop-types";
import typography from "../../design-system/typography.module.css";
import Image from "next/image";
import EmptyIcon from "../../public/icons/empty.svg";

export const NoData = ({ message }) => {
  return (
    <div className={classes.noData}>
      <Image src={EmptyIcon} alt="Empty Icon" />
      <span className={typography["text_medium_semibold"]}>{message}</span>
    </div>
  );
};

NoData.propTypes = {
  message: PropTypes.string.isRequired,
};

NoData.defaultProps = {
  message: "No events have been registered yet.",
};
