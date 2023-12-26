import classes from "./MantineButton.module.css";
import { Button } from "@mantine/core";

export const MantineButton = ({ variant, context, onClick }) => {
  const variantClasses = {
    filled: {
      root: classes.rootFilled,
      label: classes.labelFilled,
    },
    outline: {
      root: classes.rootOutlined,
      label: classes.labelOutlined,
    },
  };

  const { root: rootClassName, label: labelClassName } =
    variantClasses[variant] || {};

  return (
    <Button
      classNames={{
        root: rootClassName,
        label: labelClassName,
      }}
      variant={variant}
      onClick={onClick}
    >
      {context}
    </Button>
  );
};
