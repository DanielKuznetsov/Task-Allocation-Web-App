import { Error } from "../components/Miscellaneous/Error.jsx";

export default {
  title: "Miscellaneous/Error",
  component: Error,
  // tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
  },
};

// const Template = (args) => <Button {...args} />;

export const Validation = {
  args: {
    text: "Value must be greater than 0.",
  },
};
