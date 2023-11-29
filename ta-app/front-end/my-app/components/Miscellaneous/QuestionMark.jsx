import classes from "./Miscellaneous.module.css";
import PropTypes from "prop-types";
import typography from "../../design-system/typography.module.css";
import Image from "next/image";
import QuestionIcon from "../../public/icons/question.svg";

export const QuestionMark = ({ context = "" }) => {
  const contextClasses = `${classes.context} ${typography["text_xs_regular"]}`;

  return (
    <div className={classes.QuestionMark}>
      <p className={contextClasses}>{context}</p>

      <Image src={QuestionIcon} alt="Question Icon" />
    </div>
  );
};

QuestionMark.propTypes = {
  context: PropTypes.string.isRequired,
};

QuestionMark.defaultProps = {
  context: "A task is to move an object from one room to another.",
};
