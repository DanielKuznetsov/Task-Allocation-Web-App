import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backend: {
    // tasksLocations: {
    //   0: {
    //     pickUpRoom: 2,
    //     pickUpTime: 3,
    //     dropOffRoom: 2,
    //     dropOffTime: 3,
    //     id: 0,
    //     robotDeployed: 0,
    //   },
    // },
    // timeline: {
    //   0: {
    //     robotsLocations: {
    //       0: {
    //         id: 0,
    //         room: 1,
    //       },
    //       1: {
    //         id: 1,
    //         room: 3,
    //       },
    //     },
    //   },
    //   1: {
    //     robotsLocations: {
    //       0: {
    //         id: 0,
    //         room: 1,
    //         status: "Picking up",
    //       },
    //       1: {
    //         id: 1,
    //         room: 3,
    //         status: "Not Started",
    //       },
    //     },
    //   },
    // },
    // whoCarriesWhat: {
    //   0: [0],
    //   1: [1],
    // },
  },
  frontend: {
    isLoading: false,
    isSolved: false,
    isPlaying: false,
    inputErrors: {},
    currentTimeStep: 0,
    notifications: {},
    addedTasks: [
      // {
      //   id: 0,
      //   startRoom: 3,
      //   endRoom: 5,
      // },
      // {
      //   id: 1,
      //   startRoom: 4,
      //   endRoom: 7,
      // },
      // {
      //   id: 2,
      //   startRoom: 4,
      //   endRoom: 7,
      // },
      // {
      //   id: 3,
      //   startRoom: 4,
      //   endRoom: 7,
      // },
      // {
      //   id: 4,
      //   startRoom: 4,
      //   endRoom: 7,
      // },
    ],
    addedRobots: [
      // {
      //   id: 0,
      //   startRoom: 1,
      // },
      // {
      //   id: 1,
      //   startRoom: 6,
      // },
      // {
      //   id: 2,
      //   startRoom: 6,
      // },
      // {
      //   id: 3,
      //   startRoom: 6,
      // },
      // {
      //   id: 4,
      //   startRoom: 6,
      // },
      // {
      //   id: 5,
      //   startRoom: 6,
      // },
      // {
      //   id: 6,
      //   startRoom: 6,
      // },
    ],
    maxAllowedTime: 0,
    canvasLayout: [
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],

      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1,
      ],

      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],

      [
        1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],

      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1,
      ],

      [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],

      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 0, 1,
      ],
      [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
      ],
    ],
    defaultLocations: {
      1: { x: 3, y: 3 },
      2: { x: 14, y: 3 },
      3: { x: 3, y: 9 },
      4: { x: 9, y: 9 },
      5: { x: 3, y: 15 },
      6: { x: 26, y: 3 },
      7: { x: 26, y: 15 },
    },
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.frontend.addedTasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.frontend.addedTasks = state.frontend.addedTasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    addRobot: (state, action) => {
      state.frontend.addedRobots.push(action.payload);
    },
    removeRobot: (state, action) => {
      state.frontend.addedRobots = state.frontend.addedRobots.filter(
        (robot) => robot.id !== action.payload.id
      );
    },
    setMaxAllowedTime: (state, action) => {
      state.frontend.maxAllowedTime = action.payload;
    },
    solveProblem: (state, action) => {
      state.backend = action.payload;
    },
    setIsSolved: (state, action) => {
      state.frontend.isSolved = action.payload;
    },
    setPromptError: (state, action) => {
      const { inputId, error } = action.payload;
      state.frontend.inputErrors[inputId] = error;
    },
  },
});

// Selectors
export const getCurrentTime = (state) => state.data.frontend.currentTimeStep;

// Export actions and reducer
export const {
  addTask,
  removeTask,
  addRobot,
  removeRobot,
  setMaxAllowedTime,
  solveProblem,
  setIsSolved,
  setPromptError,
} = dataSlice.actions;
export default dataSlice.reducer;
