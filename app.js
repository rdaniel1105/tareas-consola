const { default: inquirer } = require("inquirer");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pause,
  displayInput,
  taskListToDelete,
  confirmElementToDelete,
  displayTasksChecklist,
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
  let option;

  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.addArrayToTaskList(tareasDB);
  }

  do {
    option = await inquirerMenu();

    switch (option) {
      case "1":
        const taskDescription = await displayInput("Descripción: ");
        tareas.createTask(taskDescription);
        break;
      case "2":
        tareas.displayTaskList();
        break;
      case "3":
        tareas.displayCompletedTasks('Completado');
        break;
      case "4":
        tareas.displayPendingTasks('Pendiente');
        break;
      case "5":
        const ids = await displayTasksChecklist(tareas.tasksArray);
        tareas.toggleTasksStatus(ids);
        break;
      case "6":
        let ok;

        const id = await taskListToDelete(tareas.tasksArray);
        if (id !== "0") {
          ok = await confirmElementToDelete("Está seguro?");
        }

        if (ok) {
          tareas.deleteTask(id);
          console.log("Tarea borrada");
        }

        break;
    }

    guardarDB(tareas.tasksArray);

    await pause();
  } while (option !== "0");

  //pausa();
};

main();
