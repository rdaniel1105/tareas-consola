const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            
            listado.push( this._listado[key] );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    crearTareasFromArray( tareas =[] ) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        
        console.log();
        for (let i = 0; i < this.listadoArr.length; i++) {
            
            const { desc, completadoEn } = this.listadoArr[i];
            
            // const idx = `${ i +1 }`.green;
            // if (completadoEn == 'Pendiente') {
            //     console.log(`${i + 1}. ${desc} :: `,`${completadoEn}`.red);
            // } else {
            //     console.log(`${ i +1 }. ${desc} :: `,`${completadoEn}`.green);
            // }


            //Si quiero hacerlo con null al comienzo
            const idx = `${ i +1 }`.green;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${ idx }. ${desc} :: ${estado}`);
            
        }
         
    }

    listarPendientesCompletadas( completadas = true ) {


        let conteo = 0;
        
        this.listadoArr.forEach(({desc,completadoEn}) => {
        
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            if (completadas) {
            if (completadoEn) {
                conteo++;    
                const conteoLog = `${conteo}.`.green;
                console.log(`${ conteoLog } ${desc} :: ${completadoEn}`);
            }      
        } else {
            if (!completadoEn) {
                conteo++;   
                const conteoLog = `${conteo}.`.green;
                console.log(`${ conteoLog } ${desc} :: ${estado}`);
            }
        }

    });
    }

    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

}



module.exports = Tareas;