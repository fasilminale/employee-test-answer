import {
  IControllerResult,
  newControllerData,
  newControllerError,
} from '../../utils/controller-result.model';
import { todosDal, TodosDal } from './dal';
import { ITodoPayload, Todo } from './model';
import { validateTodoCreatePayload } from './validator';

export class TodosController {
  todosDal: TodosDal;
  constructor(todosDal: TodosDal) {
    this.todosDal = todosDal;
  }

  create(payload: ITodoPayload): IControllerResult<Todo> {
    const { error, value } = validateTodoCreatePayload(payload);
    if (error) {
      return newControllerError(error.details[0].message, 400);
    }

    return newControllerData(this.todosDal.create(value));
  }

  //TODO: Implement get all
  getAll(): IControllerResult<Todo[]> {
    return newControllerData(this.todosDal.getAll());
  }

  //TODO: Implement update
  update(payload: ITodoPayload, id: string): IControllerResult<Todo> {

    return newControllerData(this.todosDal.edit(payload, id));
  }

  //TODO: Implement delete
  delete(id: string): IControllerResult<String> {
    this.todosDal.delete(id)
    return newControllerData(id);
  }

  updateOrder(index: number): IControllerResult<Todo> {
    return newControllerData(this.todosDal.updateOrder(index));
  }
}

export const todosController = new TodosController(todosDal);
