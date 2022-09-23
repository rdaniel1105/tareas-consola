const Tarea = require("./tarea");

class Tareas {
  taskList = {};

  constructor() {
    this.taskList = {};
  }

  get tasksArray() {
    let taskList = [];
    Object.keys(this.taskList).forEach((key) => {
      //   listado.push(this.taskList[key]);
      taskList = [...taskList, this.taskList[key]];
    });

    return taskList;
  }

  deleteTask(id = "") {
    if (this.taskList[id]) {
      delete this.taskList[id];
    }
  }

  addArrayToTaskList(taskArray = []) {
    taskArray.forEach((task) => {
      this.taskList[task.id] = task;
    });
  }

  createTask(taskDescription = "") {
    const tarea = new Tarea(taskDescription);
    this.taskList[tarea.id] = tarea;
  }

  displayTaskList() {
    console.log();
    for (let i = 0; i < this.tasksArray.length; i++) {
      const { taskDescription, dateOfCompletion } = this.tasksArray[i];

      // const idx = `${ i +1 }`.green;
      // if (dateOfCompletion == 'Pendiente') {
      //     console.log(`${i + 1}. ${taskDescription} :: `,`${dateOfCompletion}`.red);
      // } else {
      //     console.log(`${ i +1 }. ${taskDescription} :: `,`${dateOfCompletion}`.green);
      // }

      //Si quiero hacerlo con null al comienzo
      const index = `${i + 1}`.green;
      const status = dateOfCompletion ? "Completada".green : "Pendiente".red;
      console.log(`${index}. ${taskDescription} :: ${status}`);
    }
  }

  displayCompletedTasks(completed) {
    let conteo = 0;

    this.tasksArray.forEach(({ taskDescription, dateOfCompletion }) => {
      if (dateOfCompletion) {
        completed.green;
        conteo++;
        const conteoLog = `${conteo}.`.green;
        console.log(`${conteoLog} ${taskDescription} :: ${dateOfCompletion}`);
      }
    });
  }

  displayPendingTasks(pending) {
    let conteo = 0;

    this.tasksArray.forEach(({ taskDescription, dateOfCompletion }) => {
      if (!dateOfCompletion) {
        const status = pending.red;
        conteo++;
        const conteoLog = `${conteo}.`.green;
        console.log(`${conteoLog} ${taskDescription} :: ${status}`);
      }
    });
  }

  toggleTasksStatus(ids = []) {
    ids.forEach((id) => {
      const tarea = this.taskList[id];
      if (!tarea.dateOfCompletion) {
        tarea.dateOfCompletion = new Date().toISOString();
      }
    });

    this.tasksArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this.taskList[tarea.id].dateOfCompletion = null;
      }
    });
  }
}

module.exports = Tareas;
