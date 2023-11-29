import { ID } from "../components/ID/ID.jsx";

export default {
  title: "ID",
  component: ID,
  argTypes: {
    mode: {
      control: {
        type: "select",
        options: ["robot", "task"],
      },
    },
    location: {
      control: {
        type: "select",
        options: ["grid", "table"],
      },
    },
    id: { control: "text" },
  },
};

export const Robot = {
  args: {
    id: "0",
    mode: "robot",
    location: "grid",
  },
};

export const Task = {
  args: {
    id: "1",
    mode: "task",
    location: "table",
  },
};
