import classes from "./ItemManager.module.css";
import typography from "../../design-system/typography.module.css";
import { SatSolverForm } from "../SatSolverForm/SatSolverForm";
import { Table } from "../Table/Table";

export const ItemManager = () => {
  return (
    <div className={classes.itemManager}>
      <div className={classes.wrapper}>
        <SatSolverForm />
        <div className={classes.allTables}>
          <div className={classes.tableWrapperOne}>
            <Table labelName="tasks" height="9.5rem" />
          </div>

          <div className={classes.tableWrapperTwo}>
            <Table labelName="robots" height="8rem" />
          </div>
        </div>
      </div>
    </div>
  );
};
