import { FileInput } from "@mantine/core";
import classes from "./FileInput.module.css";

const FileUploader = ({ isLoading, file, setFile }) => {
  return (
    <FileInput
      classNames={{
        wrapper: classes.wrapperOutlined,
        label: classes.labelOutlined,
        input: classes.inputOutlined,
      }}
      clearable
      disabled={isLoading}
      value={file}
      onChange={setFile}
      required
      accept="application/json"
      label="Upload data"
      placeholder="Add tasks and robots"
    />
  );
};

export default FileUploader;
