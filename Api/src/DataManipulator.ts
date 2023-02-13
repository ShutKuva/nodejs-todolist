import { Repository } from 'typeorm';
import { BaseEntity } from './entities/BaseEntity';
import { Task } from './entities/Task';

export class DataManipulator<T extends BaseEntity> {
  constructor(private repository: Repository<T>) {}

  async create(entity: T) {
    await this.repository.save(entity);
  }

  async read<SearchObject extends {}>(
    searchObject: SearchObject = {} as SearchObject
  ) {
    return await this.repository.findBy(searchObject);
  }

  async update(newEntity: T) {
    await this.repository.save(newEntity);
  }

  async delete<SearchObject extends { [name: string]: any }>(
    searchObject: SearchObject
  ) {
    const removeEntity = await this.repository.findOneBy(searchObject);
    if (removeEntity) {
      await this.repository.remove(removeEntity);
    }
  }
}
