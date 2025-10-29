// src/index.js
import "./styles.css";
import { Task, Project } from "./task.js";
import { format } from "date-fns";

const content = document.getElementById('content');
const addNewProjectBtn = document.getElementById('addProject');
const addTaskButton = document.getElementById('addTask');
const projectNav = document.getElementById('projectTabs');

const newProjectBtn = document.getElementById('newProjectBtn');
const projectModal = document.getElementById('projectModal');
const projectClose = document.getElementById('projectClose');

const newTaskBtn = document.getElementById('newTaskBtn');
const taskModal = document.getElementById('taskModal');
const taskClose = document.getElementById('taskClose');


const projectMap = {};

const allProject = new Project("All");
projectMap.All = allProject;
const allProjectElement = createProjectTab("All");
allProjectElement.className = "active";
projectNav.appendChild(allProjectElement);
allProjectElement.addEventListener("click", loadTab);

let storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
for (const projectName of Object.keys(storedProjects)) {
    const project = storedProjects[projectName];
    let storedProject = new Project(project.name);
    for (const task of project["_taskList"]) {
        let newTask = new Task(task["_title"], task["_description"], task["_dueDate"], task["_priority"]);
        storedProject.taskList.push(newTask);
    }
    projectMap[projectName] = storedProject;
}
loadTabs();
loadProject("All");

newProjectBtn.onclick = function() {
    projectModal.style.display = "block";
}

projectClose.onclick = function() {
    projectModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == projectModal) {
        projectModal.style.display = "none";
    }
}

newTaskBtn.onclick = function() {
    taskModal.style.display = "block";
}

taskClose.onclick = function() {
    taskModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == taskModal) {
        taskModal.style.display = "none";
    }
}

function loadTabs() {
    for (const tab of Object.keys(projectMap)) {
        if (tab !== "All") {
            // Create new project tabs
            const newProjectTab = createProjectTab(tab);
            projectNav.appendChild(newProjectTab);
            newProjectTab.addEventListener("click", loadTab);

            // Update forms
            const taskForm = document.getElementById("taskProject");
            const taskOption = document.createElement("option");
            taskOption.value = tab;
            taskOption.innerHTML = tab;
            taskForm.appendChild(taskOption);
        }
    }
}

function createProjectTab(name) {
    const projectButton = document.createElement("button");
    projectButton.id = name;
    projectButton.innerHTML = name; 
    return projectButton; 
}

function loadProject(id) {
    // Reloads given project
    content.innerHTML = '';
    let i = 0;
    for(const task of projectMap[id].taskList) {
        const newTask = document.createElement("div");
        newTask.id = i;
        newTask.className = "task";
        let dueDate = format(new Date(task.dueDate.split("-")), 'PPPP');
        newTask.innerHTML = `<div id="${task.priority}" class="priorityMark"> </div>
                             <input class="checkbox" type="checkbox">
                             <p class="title">${task.title}</p>
                             <p class="desc" style="display:none">${task.description}</p>
                             <p class="date">Due: ${dueDate}</p>
                             <p class="priority">Priority: ${task.priority}</p>`;
        
        // Expands task to reveal description
        newTask.addEventListener("click", (event) => {
            if (event.target.tagName == "BUTTON") {
                return;
            }
            const descElement = event.target.getElementsByClassName("desc")[0];
            if (descElement.style.display === "none") {
                descElement.style.display = "block";
            } else {
                descElement.style.display = "none";
            }
        });

        // Deletes entire task
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        deleteButton.addEventListener("click", (event) => {
            let removeID = event.target.parentElement.id;
            event.target.parentElement.remove();
            projectMap[id].taskList.splice(removeID, 1);
            loadProject(id);
        });
        newTask.appendChild(deleteButton);
        content.appendChild(newTask);
        i++;
    }
}

function updateActive(projectElement) {
    for (const elem of projectNav.childNodes) {
        elem.className = "";
    }
    projectElement.className = "active";
}

function loadTab(event) {
    loadProject(event.target.id);
    updateActive(event.target);
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projectMap));
}

addNewProjectBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newName = projectName.value;
    if (projectName.value == "" || Object.keys(projectMap).includes(projectName.value)) {
        return;
    }
    const newProject = new Project(newName);
    projectMap[newName] = newProject;

    // Create new projects
    const newProjectTab = createProjectTab(newName);
    projectNav.appendChild(newProjectTab);
    newProjectTab.addEventListener("click", loadTab);

    // Update forms
    const taskForm = document.getElementById("taskProject");
    const taskOption = document.createElement("option");
    taskOption.value = newName;
    taskOption.innerHTML = newName;
    taskForm.appendChild(taskOption);

    saveProjects();
    projectModal.style.display = "none";
});

addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (taskTitle.value == "" || taskDate.value == "") {
        return;
    }
    const newTask = new Task(taskTitle.value, taskDesc.value, taskDate.value, priority.value);
    
    projectMap[taskProject.value].taskList.push(newTask);
    loadProject(taskProject.value);
    updateActive(document.getElementById(taskProject.value));

    saveProjects();
    taskModal.style.display = "none";
});