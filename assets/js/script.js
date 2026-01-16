const inputTasks = document.querySelector(`#new_task`);
const performedTasks = document.querySelector(`#count_done`);
const totalToDo = document.querySelector(`#total_todo`);
const addTask = document.querySelector(`#btn_add_task`);
const tableContent = document.querySelector(`#table_body`);




const tasks = [
    { id: 1, task: "Estudiar JavaScript - arrays y objetos", state: true },
    { id: 2, task: "Completar el challenge de Todo List", state: false },
    { id: 3, task: "Repasar funciones y arrow functions", state: true },
    { id: 4, task: "Practicar DOM y eventos", state: false },
    { id: 5, task: "Subir el proyecto a GitHub", state: false }
];

renderTable();
updateCounters();


/* tableContent.addEventListener(`change`, () =>{

}); */


addTask.addEventListener(`click`, () => {

    const taskIn = inputTasks.value;
    tasks.push({id: Date.now(), task: taskIn, state: false});

    inputTasks.value = "";

    renderTable();
    updateCounters();

});



function renderTable() {
  let HTMLcontent = "";

  for (const task of tasks) {
    HTMLcontent += `
      <tr>
        <td>${task.id}</td>
        <td class="${task.state ? "completed" : ""}">
          ${task.task}
        </td>
        <td>
          <input type="checkbox" class="task-checkbox" 
            data-id="${task.id}"
            ${task.state ? "checked" : ""}
            >
          <button class="btnDelete" data-id="${task.id}">
          Delete
          </button>
        </td>
      </tr>
    `
  };
/* 
I have erased this line within the button to try new way to delete elements 
*/
/* onclick="DeleteTasks(${task.id})" */

    updateCounters()
    tableContent.innerHTML = HTMLcontent;
    
};





/* ----------------- function to count ------------------ */

/* first at all, filter tasks within the array to find how mane of them are done through its state(task.state) and display the length of that amount*/

/* After store that value inside a variable, dysplay the variable within the DOM */

function updateCounters(){
    const doneTasks = tasks.filter(task => task.state).length;
    performedTasks.textContent = doneTasks;
    totalToDo.textContent = tasks.length;
};


/* ------------------- delete function ------------- */
/* Just trying to use a new method explain within the classroom */
/* first to understando the function will be called inside the render, after a loop for-of to iterate every object of the array*/

/* this work proppetly, because we have selected every button with the class and stored the id of the button(id task) within buttonId variable to recognize the correct element to delete and call the function with that id like function parameter*/

tableContent.addEventListener(`click`, (e) => {

  if (e.target.classList.contains("btnDelete")) {

    const buttonId = Number(e.target.dataset.id); /* dataset.* is to use the data we have store with data-* inside the button */
    Delete(buttonId);

  }

}
);


const Delete = (buttonId) =>{
    const index = tasks.findIndex(indexButton => indexButton.id === buttonId);
    
    if(index !== -1){
        tasks.splice(index, 1);
    
    }

    renderTable()

};





/* listener to checkboxes within the table content */


tableContent.addEventListener("change", (e) => {
  if (e.target.classList.contains("task-checkbox")) {
    const taskId = Number(e.target.dataset.id);
    const checked = e.target.checked;

    const task = tasks.find(t => t.id === taskId);

    if (task) {
      task.state = checked;
    }

    renderTable();
    updateCounters();

  }
});
