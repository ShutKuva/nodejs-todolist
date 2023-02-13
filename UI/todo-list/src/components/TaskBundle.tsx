import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemText } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import { Task } from "../entities/Task";

interface Props {
  task: Task;
  onTaskSelected: (task: Task) => void;
}

type TaskBundleProps = Props;

const TaskBundle = (props: TaskBundleProps) => {
  const [open, setOpen] = useState(false);

  const onCollapseChangedHandler = () => {
    setOpen((prevState) => !prevState);
  };

  const onTaskSelectedHandler = () => {
    props.onTaskSelected(props.task);
  };

  return (
    <>
      <ListItemButton onClick={onCollapseChangedHandler}>
        <ListItemText>{props.task.name}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <ListItemText>description: {props.task.description}</ListItemText>
        <ListItemButton onClick={onTaskSelectedHandler}>
          <ListItemText>Update</ListItemText>
        </ListItemButton>
      </Collapse>
    </>
  );
};

export default TaskBundle;
