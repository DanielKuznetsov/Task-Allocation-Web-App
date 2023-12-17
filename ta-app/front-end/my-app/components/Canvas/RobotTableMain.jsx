import { Table, ScrollArea, Checkbox } from "@mantine/core";
import { useSelector } from "react-redux";

const RobotTableMain = () => {
  const robots = useSelector((state) => state.data.frontend.addedRobots);
  const whoCarriesWhat = useSelector(
    (state) => state.data.backend.whoCarriesWhat
  );

  const rows =
    robots.length > 0 ? (
      robots.map((robot, idx) => (
        <Table.Tr style={{ borderBottom: "1px solid #efefef" }} key={robot.id}>
          <Table.Td>{robot.id}</Table.Td>
          <Table.Td>Room {robot.startRoom}</Table.Td>
          <Table.Td>BAR</Table.Td>
          <Table.Td>
            {whoCarriesWhat && whoCarriesWhat[idx].length > 0 &&
              whoCarriesWhat[idx].map((id, index) => (
                <span key={index}>
                  T{id}
                  {index < whoCarriesWhat[idx].length - 1 ? ", " : ""}
                </span>
              ))}
          </Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr style={{ height: "99px" }}>
        <Table.Td colSpan={4} style={{ textAlign: "center" }}>
          No data available.
        </Table.Td>
      </Table.Tr>
    );

  return (
    <ScrollArea h={134} type="never">
      <Table striped highlightOnHover withColumnBorders stickyHeader>
        {/* Table Header and Body */}
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "50px" }}>ID</Table.Th>
            <Table.Th>Starting position</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Tasks Carrying</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default RobotTableMain;
