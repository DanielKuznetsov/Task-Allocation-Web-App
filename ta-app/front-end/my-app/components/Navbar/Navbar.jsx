import classes from "./Navbar.module.css";
import Logo from "../../public/icons/logo.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { randomId, useDisclosure } from "@mantine/hooks";
import {
  Modal,
  LoadingOverlay,
  Button,
  Group,
  Box,
  Tabs,
  Text,
  Table,
  Checkbox,
  ScrollArea,
  FileInput,
  Popover,
  NumberInput,
  Space,
  FileButton,
} from "@mantine/core";
import { useId } from "@mantine/hooks";
import {
  addTask,
  addRobot,
  setMaxAllowedTime,
  setIsThereFile,
  solveProblem,
  setIsSolved,
} from "../../features/data/dataSlice";
import { useForm } from "@mantine/form";
import { ReaderIcon, RocketIcon } from "@radix-ui/react-icons";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export const Navbar = () => {
  // Inside your component
  // const startRoomInputRef = useRef(null);

  const [opened, { open, close }] = useDisclosure(true);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const taskForm = useForm({
    initialValues: {
      startRoom: "",
      finalRoom: "",
    },

    validate: {
      startRoom: (value) =>
        value === "" || value <= 0 || value > 7
          ? "Value must be between 1 and 7."
          : null,
      finalRoom: (value) =>
        value === "" || value <= 0 || value > 7
          ? "Value must be between 1 and 7."
          : null,
    },
  });

  const robotForm = useForm({
    initialValues: {
      startRoom: "",
    },

    validate: {
      startRoom: (value) =>
        value === "" || value <= 0 || value > 7
          ? "Value must be between 1 and 7."
          : null,
    },
  });

  const [taskID, setTaskID] = useState(0);
  const [robotID, setRobotID] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data);

  const handleCheckboxChange = (id) => {
    setSelectedRow(selectedRow === id ? null : id);
  };

  //   Tasks Rows
  const taskRows =
    state.frontend.addedTasks.length > 0 ? (
      state.frontend.addedTasks.map((element) => (
        <Table.Tr
          key={element.id}
          bg={
            selectedRow === element.id
              ? "var(--mantine-color-blue-light)"
              : undefined
          }
        >
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              checked={selectedRow === element.id}
              disabled={selectedRow !== null && selectedRow !== element.id}
              onChange={() => handleCheckboxChange(element.id)}
            />
          </Table.Td>
          <Table.Td>{element.id}</Table.Td>
          <Table.Td>Room {element.startRoom}</Table.Td>
          <Table.Td>Room {element.finalRoom}</Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr style={{ height: "163px" }}>
        <Table.Td colSpan={4} style={{ textAlign: "center" }}>
          No data available.
        </Table.Td>
      </Table.Tr>
    );

  //   Tasks Rows
  const robotRows =
    state.frontend.addedRobots.length > 0 ? (
      state.frontend.addedRobots.map((element) => (
        <Table.Tr
          key={element.id}
          bg={
            selectedRow === element.id
              ? "var(--mantine-color-blue-light)"
              : undefined
          }
        >
          <Table.Td>
            <Checkbox
              aria-label="Select row"
              checked={selectedRow === element.id}
              disabled={selectedRow !== null && selectedRow !== element.id}
              onChange={() => handleCheckboxChange(element.id)}
            />
          </Table.Td>
          <Table.Td>{element.id}</Table.Td>
          <Table.Td>Room {element.startRoom}</Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr style={{ height: "163px" }}>
        <Table.Td colSpan={3} style={{ textAlign: "center" }}>
          No data available.
        </Table.Td>
      </Table.Tr>
    );

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;

        JSON.parse(content).tasks.forEach((task) => {
          dispatch(
            addTask({
              id: task.task_ID,
              startRoom: task.startRoom,
              finalRoom: task.endRoom,
            })
          );
        });

        JSON.parse(content).robots.forEach((robot) => {
          dispatch(
            addRobot({
              id: robot.robot_ID,
              startRoom: robot.startRoom,
            })
          );
        });

        const fetchMaxTime = async () => {
          try {
            const validateResponse = await fetch(
              "https://task-allocation.up.railway.app/validate",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(JSON.parse(content)),
              }
            );

            if (!validateResponse.ok) {
              throw new Error("Network response was not ok.");
            }

            const maxTimeResponse = await validateResponse.json();

            console.log("maxTimeResponse", maxTimeResponse);
            dispatch(setMaxAllowedTime(maxTimeResponse));
          } catch (error) {
            console.error("Error fetching max time:", error);
          }
        };

        fetchMaxTime();
      };
      reader.readAsText(file);
    }
  }, [file]);

  function addTaskOnClick(values) {
    if (taskForm.validate()) {
      dispatch(addTask({ ...values, id: taskID }));
      setTaskID((prevTaskID) => prevTaskID + 1);

      taskForm.reset();

      if (startRoomInputRef.current) {
        startRoomInputRef.current.focus();
      }
    } else {
      console.log("Form has errors, not submitting.");
    }
  }

  function addRobotOnClick(values) {
    if (robotForm.validate()) {
      dispatch(addRobot({ ...values, id: robotID }));
      setRobotID((prevTaskID) => prevTaskID + 1);

      robotForm.reset();

      if (startRoomInputRef.current) {
        startRoomInputRef.current.focus();
      }
    } else {
      console.log("Form has errors, not submitting.");
    }
  }

  const solveClicked = async () => {
    // toggle();
    setIsLoading(true);
    toggle();

    // Log state for debugging
    console.log("Current state:", state);

    try {
      const payload = {
        tasks: Object.values(state.frontend.addedTasks).map((task) => ({
          startRoom: task.startRoom,
          endRoom: task.finalRoom,
          task_ID: task.id,
        })),
        robots: Object.values(state.frontend.addedRobots).map((robot) => ({
          startRoom: robot.startRoom,
          robot_ID: robot.id,
        })),
        max_time: state.frontend.maxAllowedTime,
      };

      // Log payload for debugging
      console.log("Sending payload:", payload);

      const response = await fetch(
        "https://task-allocation.up.railway.app/solve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      dispatch(solveProblem(data));
      dispatch(setIsSolved(true));
      console.log("Response data:", data);
      toggle();

      console.log("visiblity", visible);
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className={classes.nav}>
        <div className={classes.container}>
          <div className="logoWrapper">
            {/* Link to main page */}
            <Image src={Logo} alt="Logo" />
          </div>

          <div className={classes.buttons}>
            {/* Link to paper page */}
            <Button variant="outline">Read Paper</Button>

            <Button variant="filled" onClick={open}>
              Start Solver
            </Button>
          </div>
        </div>
      </nav>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="md"
        centered
      >
        <Tabs defaultValue="tasks">
          <Tabs.List>
            <Tabs.Tab
              disabled={visible}
              value="tasks"
              leftSection={<ReaderIcon />}
            >
              Tasks
            </Tabs.Tab>
            <Tabs.Tab
              disabled={visible}
              value="robots"
              leftSection={<RocketIcon />}
            >
              Robots
            </Tabs.Tab>
          </Tabs.List>

          {/* Table with tasks */}
          <Tabs.Panel value="tasks" pt="xs">
            <Box pos="relative" style={{ marginBottom: "1.25rem" }}>
              <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
              />
              <div className={classes.tableContent}>
                <Text size="xl">Tasks</Text>

                {/* Add task Form */}
                {/* <div>
                  <Popover
                    width={250}
                    trapFocus
                    position="right-end"
                    offset={5}
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <Button variant="light">Open form</Button>
                    </Popover.Target>

                    <Popover.Dropdown>
                      <form onSubmit={taskForm.onSubmit(addTaskOnClick)}>
                        <NumberInput
                          data-autofocus
                          ref={startRoomInputRef}
                          withAsterisk
                          label="Start Room"
                          placeholder="Enter a value..."
                          size="xs"
                          {...taskForm.getInputProps("startRoom")}
                        />

                        <Space h="sm" />
                        <NumberInput
                          withAsterisk
                          label="Final Room"
                          placeholder="Enter a value..."
                          size="xs"
                          {...taskForm.getInputProps("finalRoom")}
                        />

                        <Space h="md" />
                        <Button
                          type="submit"
                          fullWidth
                          variant="default"
                          size="xs"
                        >
                          Add a task
                        </Button>
                      </form>
                    </Popover.Dropdown>
                  </Popover>
                </div> */}

                {/* Scrollable table of tasks */}
                <ScrollArea h={200} type="never">
                  <Table
                    striped
                    highlightOnHover
                    withColumnBorders
                    withTableBorder
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th style={{ width: "50px" }} />
                        <Table.Th style={{ width: "50px" }}>ID</Table.Th>
                        <Table.Th>Starting position</Table.Th>
                        <Table.Th>Final position</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{taskRows}</Table.Tbody>
                  </Table>
                </ScrollArea>
              </div>
            </Box>

            <Group position="center">
              <div className={classes.actionButtons}>
                <FileInput
                  disabled={isLoading}
                  value={file}
                  onChange={setFile}
                  required
                  accept="application/json"
                  label="Upload data"
                  placeholder="Add tasks and robots"
                />

                <Button
                  disabled={isLoading}
                  onClick={file && !isLoading ? solveClicked : undefined}
                >
                  Solve Problem
                </Button>
              </div>
            </Group>
          </Tabs.Panel>

          {/* Table with robots */}
          <Tabs.Panel value="robots" pt="xs">
            <Box pos="relative" style={{ marginBottom: "1.25rem" }}>
              <LoadingOverlay
                visible={visible}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
              />
              <div className={classes.tableContent}>
                <Text size="xl">Robots</Text>

                {/* Add task Form */}
                {/* <div>
                  <Popover
                    width={250}
                    trapFocus
                    position="right-end"
                    offset={5}
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <Button variant="light">Open form</Button>
                    </Popover.Target>

                    <Popover.Dropdown>
                      <form onSubmit={robotForm.onSubmit(addRobotOnClick)}>
                        <NumberInput
                          data-autofocus
                          ref={startRoomInputRef}
                          withAsterisk
                          label="Start Room"
                          placeholder="Enter a value..."
                          size="xs"
                          {...robotForm.getInputProps("startRoom")}
                        />

                        <Space h="md" />
                        <Button
                          type="submit"
                          fullWidth
                          variant="default"
                          size="xs"
                        >
                          Add a robot
                        </Button>
                      </form>
                    </Popover.Dropdown>
                  </Popover>
                </div> */}

                {/* Scrollable table of tasks */}
                <ScrollArea h={200} type="never">
                  <Table
                    striped
                    highlightOnHover
                    withColumnBorders
                    withTableBorder
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th style={{ width: "50px" }} />
                        <Table.Th style={{ width: "50px" }}>ID</Table.Th>
                        <Table.Th>Starting position</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{robotRows}</Table.Tbody>
                  </Table>
                </ScrollArea>
              </div>
            </Box>

            <Group position="center">
              <Button disabled={isLoading} fullWidth onClick={toggle}>
                Solve Problem
              </Button>
            </Group>
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </>
  );
};
