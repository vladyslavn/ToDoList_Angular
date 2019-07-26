export class Task {
  id : number;
  listId : number;
  name : string;
  done : boolean;

  constructor(id, listId, name, done) {
    this.id = id;
    this.listId = listId;
    this.name = name;
    this.done = done;
  }
}