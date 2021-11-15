
/**
 * function to toggle the class of selected menu item
 */
const toggleClass = (item, className) => {
    // if item's class name is 'menu', replace it with nothing
    if (item.className.indexOf(className) !== -1) {
        item.className = item.className.replace(className, '');
    }
    // else, replace all blank characters with 'menu' class name
    else {
        item.className = item.className.replace(/\s+/g, ' ');
    }
}

/**
  * function to switch displayed item on menu
  * (calls toggleClass to change item's class) 
  */
const toggleMenuDisplay = (e) => {
    console.log('toggleMenuDisplay should be toggling...');
    const dropdown = e.currentTarget.parentNode;
    console.log(dropdown.value);
    const menu = dropdown.querySelector('.menu');
    toggleClass(menu, 'hide');
}

/**
* event listener for selecting dropdown options 
*/ 
const handleOptionSelected = (e) => {
    const id = e.target.id;
    const newValue = e.target.textContent + '';
    const titleElem = document.querySelector('.dropdown .title');

    titleElem.textContent = newValue;

    // trigger custom event
    document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
}

/**
 * function to add Options to Options Button
 * Returns new Options button
 */
const addOptions = (optionsButton) => {
    const optionsDropDown = document.createElement('div');
    optionsDropDown.classList.add('dropdown');
    const dropDownMarkup = 
    `
        <div class='title pointerCursor'>...</div>
        
        <div class='menu pointerCursor hide'>
            <div class='option' id='option1'>Move Up</div>
            <div class='option' id='option2'>Move Down</div>
            <div class='option' id='option3'>Delete</div>
        </div>
    `
    optionsDropDown.innerHTML = dropDownMarkup;
    optionsButton.appendChild(optionsDropDown);
    return optionsButton;
}

/**
 * function to add item to list
 */
const addItem = (item, itemNumber) => {
    // get existing list from DOM
    let existingList = document.getElementById('task-list');
    // create li and add class, text
    let li = document.createElement('li');
    li.classList.add('task-item');
    li.appendChild(document.createTextNode(item));

    // create button for controlling li
    let listButton = document.createElement('button');
    let check = document.createElement('img');

    listButton.classList.add('item-ctrl');

    check.classList.add('check-img');
    check.style.width="38px";
    check.style.height="auto";
    check.classList.add('is-unchecked');
    check.src= "/images/checkmark_green.png";
    listButton.appendChild(check);

    // create button for controlling options
    let optionsButton = document.createElement('button');
    optionsButton.classList.add('item-options');

    // creates the itemElement div and generates itemElement's ID
    let itemElement = document.createElement('div');

    // set class and id attributes and append to itemElement
    itemElement.classList.add('item-element');
    let itemID = `item-${itemNumber}`;
    itemElement.setAttribute('id', itemID);

    // add 3 sub elements to main "to-do item" element
    itemElement.appendChild(listButton);
    itemElement.appendChild(li);

    //let optionsButtonMax = addOptions(optionsButton);
    itemElement.appendChild(addOptions(optionsButton));

    //add new "to-do item" element to list at bottom of DOM
    existingList.appendChild(itemElement);
} 

/**
 * function to append item to list array
 */
const addArrayItem = (newTask, taskList) => {
    //get current length of array
    let itemIndex = taskList.length;
    //(itemIndex)
    //add newTask to array of tasks
    taskList.push(newTask);
    //for each new task in array, create a list item
    addItem(taskList[itemIndex], itemIndex);
}

/**
 * function to check item as complete
 */
const checkItem = (item) => {
    null
}

/**
 * function to remove item from list
 */
const removeItem = (item) => {
    null
}

/**
 * Get DOM elements and add to variables
 */
const taskList = [];
const taskForm = document.querySelector('form');
const formEntry = document.getElementById('user-input');
const button = document.querySelector('button');

/**
 * add listener to submit button (on click or 'enter')
 */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // if field is empty, do nothing
    if (!formEntry.value) {
        null
    } else {
        let newTask = formEntry.value;
        //(`formEntry textContent is currently: ${newTask}`)
        addArrayItem(newTask, taskList);
        formEntry.value = "";
    }
})

//add event listener to ctrl buttons
document.addEventListener('click', (event) => {
    let parentItem = event.target.parentNode;
    let itemNum = parentItem.getAttribute('id');

    // if target is Options button, do something
    if (event.target.className == 'item-options') {
        console.log(`item OPTIONS BUTTON clicked for ${itemNum}.`);    
    }
    // if target is Control button:
    else if (event.target.className == 'item-ctrl')
    {   
        let itemControl = document.querySelector('.item-ctrl');
        console.log(`item CTRL clicked for ${itemNum}`);
        console.log(itemControl.classList);
        //if Control button is checked, uncheck it
        if (itemControl.className == 'is-checked') {
            itemControl.classList.remove('is-checked');
            itemControl.classList.add('is-unchecked');
        }
        // otherwise, if Control button is not checked, create 'check' element and append 
        else {
            itemControl.classList.remove('is-unchecked')
            itemControl.classList.add('is-checked');
        }
    }
})
 
/**
*   MAIN CODE     
*   get elements from DOM 
*/ 
const dropdownTitle = document.querySelector('.dropdown .title');
// if element of both classes 'dropdown' and 'title' does not exsit, do nothing
if (dropdownTitle == null) {
    console.log('no task items yet');
// else, add listeners to above elements
} else {
    console.log('now there are...');
    let dropdownOptions = document.querySelectorAll('.dropdown .option');
    dropdownTitle.addEventListener('click', toggleMenuDisplay);
    dropdownOptions.forEach(option => option.addEventListener('click', handleOptionSelected));
}

