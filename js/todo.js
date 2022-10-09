const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");
const delTodos = document.getElementById("del-todos");

const TODOS_KEY = "todos";

let todos = [];

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

// 삭제 
function deleteTodo(e){
    const li = e.target.parentNode;
    li.remove();    
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
}
// 모두 삭제
function delAllTodos(){
    modalAllTodos.classList.remove("hidden");
}
function modalY2(){
    modalAllTodos.classList.add("hidden")
    localStorage.removeItem(TODOS_KEY);
    location.reload();
}
function modalN2(){
    modalAllTodos.classList.add("hidden")
}

function showTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const delBtn = document.createElement("button");
    delBtn.innerText = "삭제";
    delBtn.classList = "btn";

    todoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(delBtn);
    
    delBtn.addEventListener("click", deleteTodo);
}

function todoSubmit(e){
    e.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoOb = {
        text: newTodo,
        id: Date.now(),
    };
    todos.push(newTodoOb);    
    showTodo(newTodoOb);
    saveTodos();
}

todoForm.addEventListener("submit", todoSubmit);


const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(showTodo);
}

delTodos.addEventListener("click", delAllTodos);

btnDelAllTodosY.addEventListener("click", modalY2);
btnDelAllTodosN.addEventListener("click", modalN2);