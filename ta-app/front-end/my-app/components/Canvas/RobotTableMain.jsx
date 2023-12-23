import { Table, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StatusBar } from "../Status/StatusBar";

const RobotTableMain = () => {
  const robots = useSelector((state) => state.data.frontend.addedRobots);
  const whoCarriesWhat = useSelector(
    (state) => state.data.backend.whoCarriesWhat
  );
  const timeline = useSelector((state) => state.data.backend.timeline);
  const currentTimeStep = useSelector(
    (state) => state.data.frontend.currentTimeStep
  );

  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const newStatusMap = {};
    robots.forEach((robot) => {
      if (timeline) {
        newStatusMap[robot.id] =
          timeline[`${currentTimeStep}`]?.robotsLocations[`${robot.id}`]
            ?.status || "en route";
      }
    });
    setStatusMap(newStatusMap);
  }, [currentTimeStep, robots, timeline]);

  const updateCurrentRoom = (robotID) => {
    if (timeline) {
      const currentRoom =
        timeline[`${currentTimeStep}`]["robotsLocations"][`${robotID}`].room;

      return currentRoom === 0 ? "In the hallway" : `Room ${currentRoom}`;
    }
    return "Unknown";
  };

  const rows =
    timeline !== undefined ? (
      robots.map((robot, idx) => (
        <Table.Tr style={{ borderBottom: "1px solid #efefef" }} key={robot.id}>
          <Table.Td>{robot.id}</Table.Td>
          <Table.Td>{updateCurrentRoom(robot.id)}</Table.Td>
          <Table.Td style={{ width: "110px" }}>
            <StatusBar status={statusMap[robot.id]} />
          </Table.Td>
          <Table.Td>
            {whoCarriesWhat &&
              whoCarriesWhat[idx]?.length > 0 &&
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
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "50px" }}>ID</Table.Th>
            <Table.Th>Current Location</Table.Th>
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
