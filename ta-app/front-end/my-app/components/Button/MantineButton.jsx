import classes from "./MantineButton.module.css";
import { Button } from "@mantine/core";

export const MantineButton = ({ variant, context, onClick, icon }) => {
  const variantClasses = {
    filled: {
      root: classes.rootFilled,
      label: classes.labelFilled,
    },
    outline: {
      root: classes.rootOutlined,
      label: classes.labelOutlined,
    },
    intro: {
      root: classes.rootIntro,
      label: classes.labelIntro,
    }
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
      leftSection={icon ? icon : null}
    >
      {context}
    </Button>
  );
};
