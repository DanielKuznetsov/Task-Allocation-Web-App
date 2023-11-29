import { Input } from "../components/Input/Input.jsx";
import { action } from "@storybook/addon-actions";

export default {
  title: "Input",
  component: Input,
  // tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
  },
};

// const Template = (args) => <Button {...args} />;

export const InputExample = {
  args: {
    label: "Start Room",
    placeholder: "Enter a value...",
    onChange: action("onChange"),
  },
};
