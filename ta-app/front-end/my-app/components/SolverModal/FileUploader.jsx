import { FileInput } from "@mantine/core";

const FileUploader = ({ isLoading, file, setFile }) => {
  return (
    <FileInput
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
