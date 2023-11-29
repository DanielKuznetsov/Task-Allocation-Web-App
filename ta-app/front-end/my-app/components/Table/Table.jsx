import classes from "./Table.module.css";
import typography from "../../design-system/typography.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NoData } from "../Miscellaneous/NoData";

export const Table = ({ labelName, height }) => {
  const titleClasses = `${typography["text_large_semibold"]} ${classes.title}`;
  const state = useSelector((state) => state);
  const [dataList, setDataList] = useState([]);
  const title = labelName === "robots" ? "List of Robots" : "List of Tasks";
  const isDataListEmpty = dataList.length === 0;

  useEffect(() => {
    setDataList(
      labelName === "robots"
        ? state.data.frontend.addedRobots
        : state.data.frontend.addedTasks
    );
  }, [
    state.data.frontend.addedRobots,
    state.data.frontend.addedTasks,
    labelName,
  ]);

  const renderTableHeaders = () => (
    <tr>
      <th>ID</th>
      <th>Starting Location</th>
      {labelName !== "robots" && <th>Ending Location</th>}
    </tr>
  );

  const renderTableRows = () =>
    dataList.map((item) => (
      <tr tabIndex="0" key={item.id}>
        <td>{item.id}</td>
        <td>Room {item.startRoom}</td>
        {labelName !== "robots" && <td>Room {item.endRoom}</td>}
      </tr>
    ));

  return (
    <div>
      <h3 className={titleClasses}>{title}</h3>
      <div className={classes.tableContainer} style={{ height: height }}>
        <table className={classes.table}>
          <thead className={typography["text_small_semibold"]}>
            {renderTableHeaders()}
          </thead>
          <tbody className={typography["text_small_regular"]}>
            {isDataListEmpty ? (
              labelName === "robots" ? (
                <tr tabIndex="0">
                  <td>NaN</td>
                  <td>No data entered!</td>
                </tr>
              ) : (
                <tr tabIndex="0">
                  <td>NaN</td>
                  <td>No data entered!</td>
                  <td></td>
                </tr>
              )
            ) : (
              renderTableRows()
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  labelName: PropTypes.string.isRequired,
};

Table.defaultProps = {
  labelName: "robots",
};
