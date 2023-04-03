"use strict";

window.addEventListener('load', init);
import {Task} from "./task.js";


function init() {
    
    let taskButtonElement = document.getElementById('addTask');
    taskButtonElement.addEventListener('click', addTask);

    let markCompleteButtonElement = document.getElementById('MarkComplete');
    markCompleteButtonElement.addEventListener('click', marktAsCompleted);
    
    let deleteTaskButtonElement = document.getElementById('deleteTask');
    deleteTaskButtonElement.addEventListener('click', deleteTask);

    let moveUpButtonElement = document.getElementById('moveUp');
    moveUpButtonElement.addEventListener('click', moveUp);

    let moveDownButtonElement = document.getElementById('moveDown');
    moveDownButtonElement.addEventListener('click', moveDown);
    // sets the main date used by main element and tasks
    setDate();
    // fills tasks from main tasksArray into a toDo and a completedToDo Array
    fillTasks(toDo);
    fillTasks(completedToDo);
   

}

// task array with Task class import
let tasks = [
    new Task("wakker worden"),
    new Task('koffiedrinken'),
    new Task('ontbijten'),
    new Task('douchen'),
    new Task('aankleden'),
    new Task('naar werk fietsen'),
    new Task('werken'),
    new Task('eten maken')
]

let toDo = tasks.filter(task => {return !task.completed});
let completedToDo = tasks.filter(task => {return task.completed});

// fills tasks into page dependent on array chooses where on the page it should be put
function fillTasks (array) {

    array.map((task,index) => {

                let contentElem = document.getElementById('contentElem');
                let contentCompletedElem = document.getElementById('contentCompletedElem');
                let div = document.createElement('div');
                let label = document.createElement('label');
                label.setAttribute('for', task.title);
                let input = document.createElement('input');
                label.textContent = task.title;
                input.setAttribute('type', 'radio');                
                input.setAttribute('id', task.title);
                input.setAttribute('value', index);

                div.appendChild(label);
                div.appendChild(input);

                index % 2 == 0 ? div.className = 'taskItem' : div.className = 'taskItem colored';

                task.completed ? contentCompletedElem.appendChild(div): contentElem.appendChild(div);
                task.completed ? input.setAttribute('name', 'completedtask'): input.setAttribute('name', 'task');
                if (task.completed) {label.textContent += ` ${task.completeDate}`};

        });


}
// sets date omn page and return date/time to be used by mark as complete function
function setDate() {

    
    const dateObject = new Date;
    let currentDateTime = dateObject.toLocaleString();

    let currentYearElement = document.getElementById('currentYear');
    const fullYear = dateObject.getFullYear();
    currentYearElement.textContent = fullYear;

    let currentDateElement = document.getElementById('currentDate');
    const currentDay = dateObject.getDate();
    const currentMonth = dateObject.getMonth() + 1;
    const DayMonth = `${currentDay} / ${currentMonth}`;
    currentDateElement.textContent = DayMonth;

    return currentDateTime;
}
// adds a task to the tasks array and then the todo array
function addTask() {

    let taskNameElement = document.getElementById('taskName');
    if (taskNameElement.value != '') {
     
    
        let taskExists = tasks.some(text => {return taskNameElement.value == text.title});
        console.log(taskExists);

        
        if (!taskExists) {

            let newTask = new Task(taskNameElement.value.toLowerCase());
            tasks.push(newTask);

            toDo = tasks.filter(task => {return !task.completed});
            clearTaskList();
            fillTasks(toDo);
            taskNameElement.value = '';

        }
        else {
            alert(`${taskNameElement.value.toUpperCase()} has already been listed`) ;
            
        }
 
    }


}

function clearTaskList (resetAllTasks) {

    const tasksToDo = document.querySelectorAll("#contentElem > div");
    const allTasks = document.querySelectorAll("div");
    resetAllTasks ? allTasks.forEach(task => { task.remove() }): tasksToDo.forEach(task => { task.remove() });

}

function marktAsCompleted () {
    

    
    // let positionInToDoArray = document.querySelector("input[name=task]:checked").value;

    let checkedTask = document.querySelector("input[name=task]:checked");
    let checkedTaskId = checkedTask.id;
    console.log(checkedTask.value);
    let tasktoComplete = tasks.find(task => {return task.title == checkedTaskId});
    console.log(tasktoComplete);

    tasktoComplete.completed = true;
    tasktoComplete.completeDate = setDate();

    toDo = tasks.filter(task => {return !task.completed});
    completedToDo = tasks.filter(task => {return task.completed});
   

    clearTaskList(true);  
    fillTasks(toDo);
    fillTasks(completedToDo);


}

function deleteTask () {

    let checkedCompletedTask = document.querySelector("input[name=completedtask]:checked");
    let checkedCompletedTaskId = checkedCompletedTask.id;

    tasks = tasks.filter(task => {return task.title != checkedCompletedTaskId});
    console.log(checkedCompletedTaskId);

    // let positionInCompletedToDoArray = checkedCompletedTask.value;
    // completedToDo.splice(positionInCompletedToDoArray,1);
    toDo = tasks.filter(task => {return !task.completed});
    completedToDo = tasks.filter(task => {return task.completed});

    clearTaskList(true);    
    fillTasks(toDo);
    fillTasks(completedToDo);
   

}

function moveUp() {

    let checkedTask = document.querySelector("input[name=task]:checked");
    let checkedTaskId = checkedTask.id;
    let indexOfTask = tasks.findIndex(task => {return task.title == checkedTaskId});

    if (indexOfTask !=0) {

        let newToDo = tasks.splice(indexOfTask,1);
        let taskBefore = indexOfTask;

        do {
            taskBefore--

        } while (tasks[taskBefore].completed) ;

        tasks.splice(taskBefore, 0, ...newToDo);
        toDo = tasks.filter(task => {return !task.completed});
    
        

        clearTaskList(false);    
        fillTasks(toDo);

        let currentItem = document.getElementById(checkedTask.id);
        currentItem.checked = true;
    }

}

function moveDown() {

    let checkedTask = document.querySelector("input[name=task]:checked");
    let checkedTaskId = checkedTask.id;
    let indexOfTask = tasks.findIndex(task => {return task.title == checkedTaskId});

    if(indexOfTask < toDo.length - 1) {
   
    let taskAfter = indexOfTask;
    do {
        taskAfter++

    } while (tasks[taskAfter].completed) ;

    let newToDo = tasks.splice(indexOfTask,1);    
    tasks.splice(taskAfter, 0, ...newToDo);
    toDo = tasks.filter(task => {return !task.completed});

    clearTaskList(false);
    fillTasks(toDo);

    let currentItem = document.getElementById(checkedTask.id);
    currentItem.checked = true;

    }
    
    

}



