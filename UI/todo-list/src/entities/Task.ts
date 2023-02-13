import { BaseEntity } from "./BaseEntity";

export interface Task extends BaseEntity {
  name: string;
  description: string;
}
