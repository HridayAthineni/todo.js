let taskList = []

class Task {
    constructor(name, dueDate, isDone) {
        this.taskId = Date.now();
        this.name = name;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

    toString() {
        let htmlText = '<li class="task" id='+this.taskId+'><div>'
        htmlText += this.name
        htmlText += ", " + this.dueDate;
        htmlText += '<input type="checkbox" onclick="markTask('+this.taskId+')" name="isDone" id="isDone">'
        htmlText += '<button onclick="deleteTask(';
        htmlText += this.taskId;
        htmlText += ')">Delete</button>';
        htmlText += '</div></li>';
        return htmlText;
    }
}

function markTask(taskId) {
    console.log(taskId);
    taskList.forEach((task) => {
        if(taskId == task.taskId) task.isDone = true;
        render()
    })

}

function render() {
    const listUI = document.getElementById("todolist")
    listUI.innerHTML = "";
    if (taskList.length === 0) listUI.innerHTML = "No tasks todo :-)"
    taskList.forEach((task) => {
        listUI.innerHTML += task.toString();
        if (task.isDone == true) {
            document.getElementById(task.taskId).style.color = "red";
    

            // = "<mark>document.getElementById(task.taskId).value</mark>"
        }
    })
}

function deleteTask(taskId) {
    taskList = taskList.filter(
        (t) => {
            if(t.taskId != taskId) 
            return t;
        }
    );
    // call a web api to update the database on the server
    
    // update the DOM
    render()
    console.log(taskList);
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    const date = document.getElementById("date").value;
    addTask(new Task(taskName, date, false));
}

function addTask(t) {
    taskList.push(t)
    // call a web api to update the database on the server
    render();
    console.log(taskList)
}

function init() {
    console.log("init called");

    // call a web api to retrieve the task list
    // write a function to send a api request
    // get the JSON
    // assign it to taskList
    // render

    task = new Task("welcome task", new Date("May 30, 2020"), false);
    addTask(task);
    console.log(task);
}

init();