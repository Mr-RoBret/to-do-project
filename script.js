/**
 * function to add item to list
 */
const addItem = (item) => {
    // get existing list from DOM
    let existingList = document.getElementById("task-list")

    // create li and add class, text
    let li = document.createElement("li")
    li.classList.add("task-item")
    li.appendChild(document.createTextNode(item))

    // create button for controling li
    let listButton = document.createElement("button")
    listButton.classList.add("item-ctrl")
    listButton.textContent = "-"

    //combine li and button into new element
    let itemElement = document.createElement("div")
    itemElement.classList.add("item-element")
    itemElement.appendChild(listButton)
    itemElement.appendChild(li)

    //add new element to list at bottom of DOM
    existingList.appendChild(itemElement)
} 

/**
 * function to append item to list array
 */
const addArrayItem = (newTask, taskList) => {
    //get current length of array
    let itemIndex = taskList.length
    //add newTask to array of tasks
    taskList.push(newTask)
    //for each new task in array, create a list item
    addItem(taskList[itemIndex])
}

/**
 * function to remove item from list
 */

/**
 * Get DOM elements and add to variables
 */
const taskList = []
const taskForm = document.querySelector("form")
const formEntry = document.getElementById("user-input")
const button = document.querySelector("button")

/**
 * adds listener to appropriate Dom elements
 */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log("clicked!")
    let newTask = formEntry.value
    console.log(`formEntry textContent is currently: ${newTask}`)
    addArrayItem(newTask, taskList)
    formEntry.value = ""
})