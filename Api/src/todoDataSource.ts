import { DataSource } from 'typeorm';
import { Task } from './entities/Task';

console.log('In data source creation');

let ToDoDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb+srv://test:test@cluster0.d9fxxk2.mongodb.net/?retryWrites=true&w=majority',
  entities: [Task],
  synchronize: true,
  database: 'Tasks',
});

ToDoDataSource.initialize();

export default ToDoDataSource;
