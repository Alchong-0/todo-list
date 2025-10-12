// src/index.js
import "./styles.css";
import { Task, Project } from "./task.js";

const content = document.getElementById('content');
const newProjectButton = document.getElementById('addProject');
const newTaskButton = document.getElementById('addTask');
const projectNav = document.getElementById('projectTabs');
const tabs = document.getElementsByTagName('button');


const projectMap = {};

const allProject = new Project("All");
projectMap.All = allProject;
const allProjectElement = createProjectTab("All");
projectNav.appendChild(allProjectElement);
allProjectElement.addEventListener("click", loadTab)


function createProjectTab(name) {
    const projectButton = document.createElement("button");
    projectButton.id = name;
    projectButton.innerHTML = name; 
    return projectButton; 
}

function loadProject(id) {
    content.innerHTML = '';
    for(const task of projectMap[id].taskList) {
        const newTask = document.createElement("p");
        newTask.innerHTML = `<div><h3>${task.title}</h3><p>${task.description} ${task.dueDate} ${task.priority}</p></div>`;
        content.appendChild(newTask);
    }
}

function loadTab(event) {
    loadProject(event.target.id);
}


newProjectButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newName = projectName.value;
    const newProject = new Project(newName);
    projectMap.newName = newProject;

    projectNav.appendChild(createProjectTab(newName));
    // Add event listener
});

newTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newTask = new Task(taskTitle.value, taskDesc.value, taskDate.value, priority.value);
    
    projectMap[taskProject.value].taskList.push(newTask);
    loadProject(taskProject.value);
});