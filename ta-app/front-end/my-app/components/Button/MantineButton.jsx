import classes from "./MantineButton.module.css";
import { Button } from "@mantine/core";

export const MantineButton = ({ variant, context, onClick, icon, disabled }) => {
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
    },
    abstract: {
      root: classes.rootAbstract,
      label: classes.labelAbstract,
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
      disabled={disabled}
      variant={variant}
      onClick={onClick}
      leftSection={icon ? icon : null}
    >
      {context}
    </Button>
  );
};
