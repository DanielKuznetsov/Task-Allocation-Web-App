import typography from "../../design-system/typography.module.css";
import classes from "./Button.module.css";
import PropTypes from "prop-types";
import { TailSpin } from "react-loader-spinner";

export const Button = ({
  mode = "primary",
  size = "medium",
  label = "Click me!",
  disabled = false,
  submittable = false,
  isLoading = false,
  fullWidth = false,
  onClick,
}) => {
  const className = `${classes.button} ${typography["text_small_medium"]} ${
    classes[mode]
  } ${classes[size]} ${disabled ? classes.disabled : ""} ${
    fullWidth ? classes.fullWidth : ""
  }`;

  return (
    <button
      type={submittable ? "submit" : "button"}
      className={className}
      onClick={onClick}
      disabled={disabled}
      data-testid={`${mode}-${size}-button`}
    >
      {isLoading ? (
        <div className={classes.loading}>
          <TailSpin
            height="20"
            width="20"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
          <span>Fetching data ...</span>
        </div>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  mode: PropTypes.oneOf(["primary", "secondary", "tertiary", "disabled"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string.isRequired,
  submittable: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  mode: "primary",
  size: "medium",
  label: "Click me!",
  disabled: false,
  submittable: false,
  isLoading: false,
  fullWidth: false,
  onClick: () => {},
};
