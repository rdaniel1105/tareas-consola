const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: `${"Qué desea hacer?"}     --${
      "Use las teclas direccionales o numeros".green
    }  --${"Presione ENTER para seleccionar".green}`,
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tarea`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const questions = [
  {
    type: "input",
    name: "continuar",
    message: `\nPresione ${"ENTER".green} para continuar \n`,
  },
];

const inquirerMenu = async () => {
  try {
    console.clear();
    console.log("=========================".rainbow);
    console.log("  Seleccione una opción  ".green);
    console.log("=========================\n".rainbow);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
  } catch (error) {
    throw error;
  }
};

const pause = async () => {
  try {
    console.log(`\n`);
    await inquirer.prompt(questions);
  } catch (error) {
    throw error;
  }
};

const displayInput = async (message) => {
  try {
    const question = [
      {
        type: "input",
        name: "taskDescription",
        message,
        validate(value) {
          if (value.length === 0) {
            return "Por favor ingrese un valor";
          }
          return true;
        },
      },
    ];
    const { taskDescription } = await inquirer.prompt(question);
    return taskDescription;
  } catch (error) {
    throw error;
  }
};

const taskListToDelete = async (tareas = []) => {
  try {
    const choices = tareas.map((tarea, i) => {
      const idx = `${i + 1}.`.green;

      return {
        value: tarea.id,
        name: `${idx} ${tarea.taskDescription}`,
      };
    });

    choices.unshift({
      value: "0",
      name: "0.".green + "Cancelar",
    });

    const preguntas = [
      {
        type: "list",
        name: "id",
        message: "Borrar",
        choices,
      },
    ];

    const { id } = await inquirer.prompt(preguntas);
    return id;

    // {
    //         value: '1',
    //         name : `${'1.'.green} Crear tarea`
    // },
  } catch (error) {
    throw error;
  }
};

const confirmElementToDelete = async (message) => {
  try {
    const question = [
      {
        type: "confirm",
        name: "ok",
        message,
      },
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
  } catch (error) {
    throw error;
  }
};

const displayTasksChecklist = async (tareas = []) => {
  try {
    const choices = tareas.map((tarea, i) => {
      const index = `${i + 1}.`.green;

      return {
        value: tarea.id,
        name: `${index} ${tarea.taskDescription}`,
        checked: tarea.dateOfCompletion ? true : false,
      };
    });

    const pregunta = [
      {
        type: "checkbox",
        name: "ids",
        message: `${"Selecciones:"}  --${
          "Use las teclas direccionales para navegar las opciones".green
        }, --${
          "Presione <espacio> para seleccionar, <a> para seleccionar todos, <i> para invertir selección y <enter> para continuar"
            .green
        }`,
        choices,
      },
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;

    // {
    //         value: '1',
    //         name : `${'1.'.green} Crear tarea`
    // },
  } catch (error) {
    throw error;
  }
};

module.exports = {
  inquirerMenu,
  pause,
  displayInput,
  taskListToDelete,
  confirmElementToDelete,
  displayTasksChecklist,
};
