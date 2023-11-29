import { Button } from "../components/Button/Button.jsx";
import { action } from "@storybook/addon-actions";

export default {
  title: "Button",
  component: Button,
  // tags: ["autodocs"],
  argTypes: {
    mode: {
      control: {
        type: "select",
        options: ["primary", "secondary", "tertiary", "disabled"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    label: { control: "text" },
    onClick: { action: "clicked" },
  },
};

// const Template = (args) => <Button {...args} />;

export const Primary = {
  args: {
    mode: "primary",
    label: "Primary",
    onClick: action("onClick"),
  },
};

export const Secondary = {
  args: {
    mode: "secondary",
    label: "Secondary",
    onClick: action("onClick"),
  },
};

export const Tertiary = {
  args: {
    mode: "tertiary",
    label: "Tertiary",
    onClick: action("onClick"),
  },
};

export const Disabled = {
  args: {
    mode: "disabled",
    label: "Disabled",
  },
};

export const Small = {
  args: {
    size: "small",
    onClick: action("onClick"),
  },
};

export const Medium = {
  args: {
    size: "medium",
    onClick: action("onClick"),
  },
};

export const Large = {
  args: {
    size: "large",
  },
};

