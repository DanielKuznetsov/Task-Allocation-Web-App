import { Table, ScrollArea } from "@mantine/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StatusBar } from "../Status/StatusBar";

const TaskTableMain = () => {
  const tasks = useSelector((state) => state.data.frontend.addedTasks);
  const backendTasks = useSelector(
    (state) => state.data.backend.tasksLocations
  );
  const currentTimeStep = useSelector(
    (state) => state.data.frontend.currentTimeStep
  );

  const statusMap = useMemo(() => {
    const newStatusMap = {};

    if (currentTimeStep === 0) {
      tasks.forEach((task) => {
        newStatusMap[task.id] = "idle";
      });
      return newStatusMap;
    }

    if (backendTasks) {
      tasks.forEach((task) => {
        const taskDetails = backendTasks[`${task.id}`];
        if (!taskDetails) {
          newStatusMap[task.id] = "N/A";
          return;
        }

        if (currentTimeStep === taskDetails.pickUpTime) {
          newStatusMap[task.id] = "picked up";
        } else if (currentTimeStep === taskDetails.dropOffTime) {
          newStatusMap[task.id] = "completed";
        } else if (
          currentTimeStep > taskDetails.pickUpTime &&
          currentTimeStep < taskDetails.dropOffTime
        ) {
          newStatusMap[task.id] = "in transit";
        } else if (currentTimeStep < taskDetails.pickUpTime) {
          newStatusMap[task.id] = "idle";
        } else {
          newStatusMap[task.id] = "completed";
        }
      });
    }
    return newStatusMap;
  }, [currentTimeStep, tasks, backendTasks]);

  const rows =
    tasks.length > 0 ? (
      tasks.map((task) => (
        <Table.Tr style={{ borderBottom: "1px solid #efefef" }} key={task.id}>
          <Table.Td>{task.id}</Table.Td>
          <Table.Td>Room {task.startRoom}</Table.Td>
          <Table.Td>Room {task.finalRoom}</Table.Td>
          <Table.Td style={{ width: "100px" }}>
            {" "}
            <StatusBar status={statusMap[task.id]} />
          </Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr style={{ height: "127px" }}>
        <Table.Td colSpan={4} style={{ textAlign: "center" }}>
          No data available.
        </Table.Td>
      </Table.Tr>
    );

  return (
    <ScrollArea h={163} type="never">
      <Table striped highlightOnHover withColumnBorders stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "50px" }}>ID</Table.Th>
            <Table.Th>Starting Location</Table.Th>
            <Table.Th>Final Location</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default TaskTableMain;
