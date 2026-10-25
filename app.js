const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const todoTasksList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

const createTaskElement = function (taskText) {
  const taskItem = document.createElement("li");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  const label = document.createElement("label");
  label.innerText = taskText;
  label.className = "task";

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  taskItem.append(checkBox, label, editInput, editButton, deleteButton);

  return taskItem;
};

const addTask = function () {
  if (!taskInput.value) return;

  const taskItem = createTaskElement(taskInput.value);
  todoTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  taskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;
  const editInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditMode = taskItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  taskItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  taskItem.remove();
};

const toggleTaskStatus = function () {
  const taskItem = this.parentNode;
  const targetList = this.checked ? completedTasksList : todoTasksList;
  targetList.appendChild(taskItem);
};

const bindTaskEvents = function (taskItem) {
  const checkBox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", toggleTaskStatus);
};

for (const taskItem of [
  ...todoTasksList.children,
  ...completedTasksList.children,
]) {
  bindTaskEvents(taskItem);
}

addButton.addEventListener("click", addTask);
