import { Task } from './entities/Task';
import ToDoDataSource from './todoDataSource';

export const taskRepository = ToDoDataSource.getRepository(Task);
