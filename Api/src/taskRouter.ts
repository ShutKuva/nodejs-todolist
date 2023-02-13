import { Router } from 'express';
import { DataManipulator } from './DataManipulator';
import { Task } from './entities/Task';
import { taskRepository } from './repositories';

const taskManipulator = new DataManipulator(taskRepository);

const taskRouter = Router();

taskRouter.get('/', async (req, res) => {
  res.json(await taskManipulator.read());
});

taskRouter.get('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  res.json(await taskManipulator.read({ id: taskId }));
});

taskRouter.post<'/create', Task>('/create', async (req, res) => {
  try {
    const task = req.body as Task;
    console.log(task);
    await taskManipulator.create(task).catch((err) => {
      throw err;
    });
    console.log('Is created');
    res.status(201);
  } catch (e) {
    throw e;
  }
});

taskRouter.delete('/delete/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await taskManipulator.delete({ id: taskId }).catch((err) => {
      throw err;
    });
    res.status(204);
  } catch (e) {
    throw e;
  }
});

taskRouter.put('/update', async (req, res) => {
  try {
    const updatedTask = req.body as Task;
    await taskManipulator.update(updatedTask).catch((err) => {
      throw err;
    });
    console.log('Is created');
    res.status(201);
  } catch (e) {
    throw e;
  }
});

export default taskRouter;
