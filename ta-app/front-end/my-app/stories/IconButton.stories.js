import { IconButton } from "../components/IconButton/IconButton.jsx";
import { action } from "@storybook/addon-actions";

export default {
  title: "IconButton",
  component: IconButton,
  // tags: ["autodocs"],
  argTypes: {
    mode: {
      control: {
        type: "select",
        options: ["add", "edit", "detele"],
      },
    },
    onClick: { action: "clicked" },
  },
};

// const Template = (args) => <Button {...args} />;

export const Add = {
  args: {
    mode: "add",
    onClick: action("onClick"),
  },
};

export const Edit = {
  args: {
    mode: "edit",
    onClick: action("onClick"),
  },
};

export const Delete = {
  args: {
    mode: "delete",
    onClick: action("onClick"),
  },
};
