const { default: inquirer } = require('inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


require('colors');


const main = async() => {
    
    let option;

    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.crearTareasFromArray(tareasDB);
    }
    
    do {
    option =  await inquirerMenu();
    
    switch (option) {
        case '1':
            const desc = await leerInput('Descripción: ');
            tareas.crearTarea(desc);
            break;
    
        case '2':
            //console.log(tareas._listado);
            tareas.listadoCompleto();
            break;
        
        case '3':
            tareas.listarPendientesCompletadas(true);
            break;
        
        case '4':
            tareas.listarPendientesCompletadas(false);
            break;
        
        case '5':
            const ids = await mostrarListadoChecklist(tareas.listadoArr);
            tareas.toggleCompletadas(ids);
            break;

        case '6':
            const id = await listadoTareasBorrar(tareas.listadoArr);
            if (id !== '0') {
                const ok = await confirmar('Está seguro?');
            
            if (ok) {
                tareas.borrarTarea(id);
                console.log('Tarea borrada');
            }
            }
            
            break;
    }
    
    guardarDB(tareas.listadoArr);

    await pausa();

    } while (option!=='0');
    
    
    
    //pausa();
}



main();
