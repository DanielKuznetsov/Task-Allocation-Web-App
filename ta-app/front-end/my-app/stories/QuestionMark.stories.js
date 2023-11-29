import { QuestionMark } from "../components/Miscellaneous/QuestionMark.jsx";

export default {
  title: "Miscellaneous/QuestionMark",
  component: QuestionMark,
  argTypes: {
    context: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Context = {
  args: {
    context: "A task is to move an object from one room to another.",
  },
};
