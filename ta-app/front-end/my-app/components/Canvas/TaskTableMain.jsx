import { Table, ScrollArea, Text } from "@mantine/core";
import { useSelector } from "react-redux";

const TaskTableMain = () => {
  const tasks = useSelector((state) => state.data.frontend.addedTasks);

  const rows =
    tasks.length > 0 ? (
      tasks.map((task) => (
        <Table.Tr style={{ borderBottom: "1px solid #efefef" }} key={task.id}>
          <Table.Td>{task.id}</Table.Td>
          <Table.Td>Room {task.startRoom}</Table.Td>
          <Table.Td>Room {task.finalRoom}</Table.Td>
          <Table.Td>0</Table.Td>
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
    <>
      <ScrollArea h={163} type="never">
        <Table striped highlightOnHover withColumnBorders stickyHeader>
          {/* Table Header and Body */}
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "50px" }}>ID</Table.Th>
              <Table.Th>Starting position</Table.Th>
              <Table.Th>Final position</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default TaskTableMain;
