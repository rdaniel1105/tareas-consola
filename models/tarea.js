const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  taskDescription = "";
  dateOfCompletion = null;

  constructor(taskDescription) {
    this.id = uuidv4();
    this.taskDescription = taskDescription;
  }
}

module.exports = Tarea;
