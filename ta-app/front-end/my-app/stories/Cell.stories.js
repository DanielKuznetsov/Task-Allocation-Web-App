import { Cell } from "../components/Cell/Cell.jsx";

export default {
  title: "Cell",
  component: Cell,
  // tags: ["autodocs"],
  argTypes: {
    mode: {
      control: {
        type: "select",
        options: ["default", "barrier"],
      },
    },
  },
};

// const Template = (args) => <Button {...args} />;

export const Default = {
  args: {
    mode: "default",
  },
};

export const Barrier = {
  args: {
    mode: "barrier",
  },
};
