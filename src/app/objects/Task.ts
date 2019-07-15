export class Task {
    id : number;
    parentId : number;
    name : string;
    isDone : boolean;
  
    constructor(id, parentId, name, isDone) {
      this.id = id;
      this.parentId = parentId;
      this.name = name;
      this.isDone = isDone;
    }
  }