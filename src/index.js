const toDoListWrapper = document.querySelector(".to-do-list-input-box");
const doingStatusColumn= document.querySelector(".doing-list-input-box");
const done = document.querySelector(".done-list-input-box");
const addTaskButton = document.querySelector("#submit-button");
const text = document.querySelector("#input");

function creatingDeleteButton (label, task) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = label;
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", (event) => {task.remove();});
    return deleteButton;
}

function createTaskElements (taskDesrciption){

    const task = document.createElement("div");
    task.classList.add("task");
    const taskName = document.createElement("h2");
    taskName.classList.add("taskNameEdit");
    taskName.innerText = taskDesrciption;
    task.append(taskName);

    const buttonWrappers = document.createElement("div");
    buttonWrappers.classList.add("buttonWrappers");
    task.append(buttonWrappers);

    const deleteButton = creatingDeleteButton('delete', task)
    buttonWrappers.append(deleteButton);

    const doingMoveButton = document.createElement("button");
    doingMoveButton.classList.add("moveRightButton");
    doingMoveButton.textContent = "Doing";

    return {
        task,
        taskName,
        buttonWrappers,
        deleteButton,
        doingMoveButton
    };

}

addTaskButton.addEventListener("click", function (event){

    if(!text.value) {
        alert("Please fill out the task");
        return;
    }
    event.preventDefault();

    const taskDescription = text.value
    const taskObjects = createTaskElements(taskDescription);
    const task = taskObjects.task;

    taskObjects.doingMoveButton.addEventListener("click", (event) => {
        const clonedTask = task.cloneNode(true);
        clonedTask.classList.add("clonedTask");
        clonedTask.querySelector(".delete").addEventListener("click", (event) => {clonedTask.remove();}); //DOING TASK DELETE BUTTON EVENTLISTENER

        const leftMoveButton = document.createElement("button");
        leftMoveButton.classList.add("moveLeftButton");
        leftMoveButton.textContent = "To do";
        leftMoveButton.addEventListener("click", (event) => { //DOING  MOVING LEFT BUTTON EVENTLISTENER
            toDoListWrapper.append(task);
            clonedTask.remove();
        });
        clonedTask.querySelector(".buttonWrappers").append(leftMoveButton);

        const moveRightButton = clonedTask.querySelector(".moveRightButton");
        moveRightButton.textContent = "Done";
        moveRightButton.addEventListener("click", (event) =>{ //DOING  MOVING RIGHT BUTTON EVENTLISTENER
            const clonedTaskDone = clonedTask.cloneNode(true);
            clonedTaskDone.classList.add("clonedTaskDone");
            clonedTaskDone.querySelector(".delete").addEventListener("click", (event) => {clonedTaskDone.remove();}); //DONE TASK DELETE BUTTON EVENTLISTENER
            const moveLeftButtonDone = clonedTaskDone.querySelector(".moveLeftButton")
            moveLeftButtonDone.textContent = "Doing";
            moveLeftButtonDone.addEventListener("click", (event) =>{ //DONE MOVE LEFT BUTTON EVENTLISTENER
                doingStatusColumn.append(clonedTask);
                clonedTaskDone.remove();
            });
            done.append(clonedTaskDone);
            clonedTask.remove();
            clonedTaskDone.querySelector(".moveRightButton").remove();
        });
        doingStatusColumn.append(clonedTask);
        task.remove();
    });
    taskObjects.buttonWrappers.append(taskObjects.doingMoveButton);
    toDoListWrapper.append(task);
    text.value = "";

});
