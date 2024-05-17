/* eslint-disable */

//todo add "limpiar mi cuarto"  --- anade a la lista..
//todo done 10  (terminada, es decir eliminarla de la lista)
//todo ls   --- lista con indices
//todo alv  --- resetea todo

//necesitamos
// - archivo guardar .json
// funciona para cada comando


const fs = require('node:fs')

const dbFile = 'db.json'
console.log('hola');
function add (task ){
    //leer arch
    const todos = getTodos() //nos regresa un arreglo de todos
    //agregar 
    todos.push(task)
    updateTodos(todos)

}

function done( taskIndex ){
    //leer archivo
    const todos = getTodos() 
    //actualizar archivo elemento eliminado
    todos.splice(taskIndex , 1)
    updateTodos(todos)
}

function ls (){
    //leer archivo
    const todos = getTodos()

    if (!todos.length) {
        console.log("[EMPTY]");
        process.exit()
    }
    todos.forEach((task, idx) => {
        console.log(idx, "-", task);
    });
}

function alv(){
    //act arch
    updateTodos([]) // pasamos arreglo vacio
}

function init() {
    //crear el archivo de DB
    const fileExist = fs.existsSync(dbFile)

    if (!fileExist) {
        //stringify es para convertir a cadena y pueda escribirlo en el archivo
        fs.writeFileSync(dbFile, JSON.stringify({ todos:[] }))
    }
}

function getTodos() {
    // leer archivo

    //regresa un string
    const content = fs.readFileSync(dbFile, "utf8")
    //convertimos a objeto y obtenemos nuestro arreglo para poder manipularlo
    return JSON.parse(content).todos;
}

function updateTodos(todos) {
    const newTodos = { todos: todos}
    const newTodosAsString = JSON.stringify(newTodos)
    fs.writeFileSync(dbFile, newTodosAsString)
}

function main() {
    const command = process.argv[2]
    const arg = process.argv[3]

    //incializamos
    init()

    if (command === 'ls') {
        ls()
    } else if(command === 'add'){

        if(!arg){
            console.error("missing task");
            process.exit(1)
        }
        add(arg);
        ls();
        console.log("Task added");
    } else if(command === 'done'){

        if(!arg){
            console.error("missing task");
            process.exit(1)
        }
        
        const idx = parseInt(arg)
        if (isNaN(idx)) {
            console.log("Invalid index");
            process.exit(1)
        }
        
        const todos = getTodos()
        
        if (idx < 0 || idx >= todos.length ) {
            console.log("Invalid index");
            process.exit(1)
        }
        done(arg);
        ls();
        console.log("Task completed!");
        
    }else if(command === 'alv'){
        alv()
        console.log("Algo lindo vendra!");
    }else {
        console.error("Invalid command: ", command);
        process.exit(1)
    }
}

main()