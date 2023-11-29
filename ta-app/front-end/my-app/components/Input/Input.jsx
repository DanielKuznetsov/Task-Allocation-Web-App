import typography from "../../design-system/typography.module.css";
import classes from "./Input.module.css";
import PropTypes from "prop-types";
import WarningIcon from "../../public/icons/warning.svg";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPromptError } from "../../features/data/dataSlice";
import { Error } from "../Miscellaneous/Error";

export const Input = ({
  id,
  label,
  placeholder = "Enter a value...",
  value,
  onChange,
}) => {
  const { label: labelStyle, input: inputStyle, inputWrapper } = classes;
  const { text_small_semibold, text_small_regular } = typography;

  const labels = {
    "Start Room": true,
    "End Room": true,
  };

  const dispatch = useDispatch();
  const inputError = useSelector(
    (state) => state.data.frontend.inputErrors[id]
  );

  useEffect(() => {
    const errorState = value === 0 || (labels[label] && value > 7);
    dispatch(
      setPromptError({
        inputId: id,
        error: errorState,
      })
    ); // use id instead of label
  }, [value, id, dispatch]);

  const handleKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className={classes.container}>
      <div
        className={`${classes.inputWrapper} ${
          inputError ? classes.errorWrapper : ""
        }`}
      >
        <div className={`${labelStyle} ${text_small_semibold}`}>
          <div className={classes.role}>{label}</div>
        </div>
        <input
          type="number"
          className={`${inputStyle} ${text_small_regular}`}
          placeholder={placeholder}
          value={value ?? ""}
          name={label}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      {inputError &&
        (value === 0 ? (
          <Error text="Value must be greater than 0." />
        ) : (
          <Error text="Value must be less than 7." />
        ))

        // <div className={classes.error}>
        //   <Image src={WarningIcon} alt="Warning Icon" />
        //   <span className={typography["text_xs_regular"]}>
        //     {value === 0
        //       ? "Value must be greater than 0."
        //       : "Value must be less than 7."}
        //   </span>
        // </div>
      }
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: "Label",
  placeholder: "Enter a value...",
};
