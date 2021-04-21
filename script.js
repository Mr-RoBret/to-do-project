/**
 * function to add item to list
 */
const addItem = (newTask, taskList) => {
    const listLength = taskList.length
    if (listLength > 0) {
        let existingList = document.getElementsByClassName("task-item")
        let li = document.createElement("li")
        li.appendChild(document.createTextNode(newTask))
        existingList.appendChild(li)
    } else {
        let newList = document.createElement("ol")
        newList.classList.add("task-item")
        //add li
        let li = document.createElement("li")
        li.appendChild(document.createTextNode(newTask))
        //append newTask
        newList.appendChild(li)
        console.log(newList)
    }

} 
/**
 * function to remove item from list
 */

/**
 * Get DOM elements and add to variables
 */
const taskList = []
const taskForm = document.querySelector("form")
const formEntry = document.getElementById("userInput")
const button = document.querySelector("button")

/**
 * adds listener to appropriate Dom elements
 */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("clicked!")
    let newTask = formEntry.value
    console.log(newTask)
    addItem(newTask, taskList)
    formEntry.textContent = ""
})