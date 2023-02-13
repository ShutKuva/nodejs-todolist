import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Task } from "../entities/Task";

interface Props {
  open: boolean;
  title: string;
  task?: Task;
  onSubmited: (task: Task) => void;
  onClose: () => void;
}

type ConfiguredModalProps = Props;

const ConfiguredModal = (props: ConfiguredModalProps) => {
  const [name, setName] = useState(props.task?.name || "");
  const [description, setDescription] = useState(props.task?.description || "");

  const onCloseHandler = () => {
    props.onClose();
  };

  const onSubmitHandler = () => {
    props.onSubmited({ name, description });
  };

  return (
    <Dialog open={props.open} onClose={onCloseHandler}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler}>Close</Button>
        <Button onClick={onSubmitHandler}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfiguredModal;
