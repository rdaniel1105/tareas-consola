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
        try {
          const taskDescription = await displayInput("Descripción: ");
          tareas.createTask(taskDescription);
          break;
        } catch (error) {
          throw error;
        }
      case "2":
        console.clear();
        tareas.displayTaskList();
        break;
      case "3":
        console.clear();
        tareas.displayCompletedTasks("Completado");
        break;
      case "4":
        console.clear();
        tareas.displayPendingTasks("Pendiente");
        break;
      case "5":
        try {
          console.clear();
          const ids = await displayTasksChecklist(tareas.tasksArray);
          tareas.toggleTasksStatus(ids);
          break;
        } catch (error) {
          throw error;
        }

      case "6":
        try {
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
        } catch (error) {
          throw error;
        }
    }

    guardarDB(tareas.tasksArray);

    try {
      await pause();
    } catch (error) {
      throw error;
    }
  } while (option !== "0");

  //pausa();
};

main();
