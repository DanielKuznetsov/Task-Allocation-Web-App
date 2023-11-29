import { NoData } from "../components/Miscellaneous/NoData.jsx";

export default {
  title: "Miscellaneous/NoData",
  component: NoData,
  argTypes: {
    message: { control: "text" },
  },
};

export const Starter = {
  args: {
    message: "No events have been registered yet.",
  },
};
