import { Table } from "../components/Table/Table.jsx";

export default {
  title: "Table",
  component: Table,
  argTypes: {
    labelName: { control: "text" },
  },
};

export const RobotsTable = {
  args: {
    labelName: "robots",
  },
};

export const TasksTable = {
  args: {
    labelName: "tasks",
  },
};
