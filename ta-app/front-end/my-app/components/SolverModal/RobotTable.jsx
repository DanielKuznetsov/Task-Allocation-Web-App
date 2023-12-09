import { Table, ScrollArea, Checkbox } from "@mantine/core";
import { useSelector } from "react-redux";

const RobotTable = () => {
  const robots = useSelector((state) => state.data.frontend.addedRobots);
  const selectedRow = useSelector((state) => state.data.selectedRow);

  const rows =
    robots.length > 0 ? (
      robots.map((robot) => (
        <Table.Tr key={robot.id}>
          <Table.Td>{robot.id}</Table.Td>
          <Table.Td>Room {robot.startRoom}</Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr style={{ height: "163px" }}>
        <Table.Td colSpan={3} style={{ textAlign: "center" }}>
          No data available.
        </Table.Td>
      </Table.Tr>
    );

  return (
    <ScrollArea h={200} type="never">
      <Table striped highlightOnHover withColumnBorders withTableBorder>
        {/* Table Header and Body */}
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "50px" }}>ID</Table.Th>
            <Table.Th>Starting position</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default RobotTable;
