import classes from "./IconButton.module.css";
import PropTypes from "prop-types";
import editIcon from "../../public/icons/edit.svg";
import deleteIcon from "../../public/icons/delete.svg";
import addIcon from "../../public/icons/add.svg";
import Image from "next/image";

export const IconButton = ({ mode, onClick }) => {
  const className = `${classes.iconButton} ${classes[mode]}`;

  const iconMap = {
    edit: editIcon,
    delete: deleteIcon,
    add: addIcon,
  };

  const iconSrc = iconMap[mode] || editIcon;

  return (
    <button type="button" className={className} onClick={onClick}>
      <Image src={iconSrc} alt={mode} />
    </button>
  );
};

IconButton.propTypes = {
  mode: PropTypes.oneOf(["add", "edit", "delete"]),
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  mode: "add",
  onClick: () => {},
};
