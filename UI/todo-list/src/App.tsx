import { Button, List } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ConfiguredModal from "./components/ConfiguredModal";
import TaskBundle from "./components/TaskBundle";
import { Task } from "./entities/Task";
import { mainUrl } from "./urls";

function App() {
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);
  const [task, setTask] = useState<Task>();
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const taskId = task?.id;

  useEffect(() => {
    axios.get<Task[]>(mainUrl + "/task").then((res) => {
      setTasks(res.data);
      console.log(res.data);
    });
  }, []);

  const onTaskSelectedHandler = (task: Task) => {
    setTask(task);
    setIsUpdating(true);
    setOpen(true);
  };

  const onAddHandler = () => {
    setIsUpdating(false);
    setOpen(true);
  };

  const onClosedHandler = () => {
    setOpen(false);
  };

  const onSubmitedHandler = async (task: Task) => {
    console.log(task);
    if (isUpdating) {
      task.id = taskId;
      await axios.put(mainUrl + "/task/update", task);
    } else {
      task.id = "dummy";
      await axios.post(mainUrl + "/task/create", task);
    }
    setOpen(false);
  };

  return (
    <div className="App">
      <ConfiguredModal
        task={task}
        onClose={onClosedHandler}
        onSubmited={onSubmitedHandler}
        open={open}
        title={task ? "Updating" : "Adding"}
      />
      <List subheader={<ListSubheader>Tasks</ListSubheader>}>
        {tasks.map((task) => {
          return (
            <TaskBundle task={task} onTaskSelected={onTaskSelectedHandler} />
          );
        })}
      </List>
      <Button onClick={onAddHandler}>Add new</Button>
    </div>
  );
}

export default App;
