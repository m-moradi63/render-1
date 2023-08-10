let taskIDcounter = 0;
const tasklist = [];
const TASKSTATUS = Object.freeze({
    todo: 'todo',
    done : 'done',
}) ;
function taskFactory(text='' , status = TASKSTATUS.todo){
    if (status!== TASKSTATUS.todo && status!==TASKSTATUS.done){
        return
    }
    const taskObject = {
        id: `tasks-uuid-${taskIDcounter}` ,
        text,
        status: TASKSTATUS.todo,
    }
    taskIDcounter++;
    return taskObject;
   
}
function rendertask(taskObject){
    if(!taskObject && typeof taskObject!=="Object")
    return
else{
        const li = document.createElement("li");
        li.classList.add("todoListItem");
        const p = document.createElement("p");
        p.innerHTML= taskObject.text;

        const div = document.createElement("div");
        const deletBtn = document.createElement("span");
        deletBtn.classList.add('fa','fa-minus-circle','text-red-500');
        const check = document.createElement("span")
        check.classList.add('fa','fa-check-circle','text-green-500');
        if(taskObject.status==TASKSTATUS.todo){
            li.classList.add("todoListItem__todo");

        }else{
            if(taskObject.status==TASKSTATUS.done){
                li.classList.add("todoListItem__done");
                p.classList.add('line-through');
            }
        }
        li.appendChild(p);
        div.appendChild(deletBtn);
        div.appendChild(check);
        li.appendChild(div);

        return li;
    }}


function rendertasks(){
   const todoListElement = document.querySelector('#todo-list');
   todoListElement.innerHTML = ''
   for(let i=0 ; i<tasklist.length ; i += 1){
    todoListElement.appendChild(rendertask(tasklist[i]));
   }

}

function createtask(text=''){
    const task = taskFactory(text);
    tasklist.push(task);
    rendertasks();
}
const createTaskform = document.querySelector("#create-todo");
const createTaskinput = createTaskform.querySelector("input")
const createTaskbutton = createTaskform.querySelector("button")
const body = document.body
function createtaskHandler(){
    const value=createTaskinput.value
    if(!value){
        return;
    }else{
        createtask(value);
        createTaskinput.value= "";
    }
}
   createTaskbutton.addEventListener("click" , createtaskHandler);
   body.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      createtaskHandler();
      event.preventDefault();
      // Trigger the button element with a click
      
                                 }
  });
  