
/**
 * function to add Options to Options Button
 * Returns new Options button
 */
const addOptions = () => {
    const optionsDropDown = document.createElement('div');
    optionsDropDown.classList.add('dropdown');
    const dropDownMarkup = 
    `        
        <div class='menu pointerCursor'>
            <div class='option' id='move-up'>Move Up</div>
            <div class='option' id='move-dwn'>Move Dwn</div>
            <div class='option' id='delete'>Delete</div>
        </div>
    `
    optionsDropDown.innerHTML = dropDownMarkup;
    return optionsDropDown;
}

/**
 * function to add check to ctrl button
 */
const createCheck = () => {
    let check = document.createElement('img');
    check.classList.add('check-img');
    check.style.width="38px";
    check.style.height="auto";
    check.classList.add('is-unchecked');
    check.src= "/images/check.png";
    return check;
}

// create button for controlling li
const createCtrlButton = () => {
    let ctrlButton = document.createElement('button');
    ctrlButton.classList.add('item-ctrl');
    ctrlButton.appendChild(createCheck());
    return ctrlButton;
}

// create button for controlling options
const createOptionsButton = () => {
    let optionsButton = document.createElement('button');
    optionsButton.classList.add('item-options');
    optionsButton.innerText = '...';
    return optionsButton;
}

const createListItem = (item) => {
    // create li and add class, text
    let li = document.createElement('li');
    li.classList.add('task-item');
    li.appendChild(document.createTextNode(item));
    return li;
}

/**
 * function to add item to list
 */
const addItem = (item, itemIndex) => {
    // get existing list from DOM
    let existingList = document.getElementById('task-list');

    // create the itemElement div and generate itemElement's ID
    let itemElement = document.createElement('div');
    // set class and id attributes and append to itemElement
    itemElement.classList.add('item-element');
    let itemID = `item-${itemIndex}`;
    itemElement.setAttribute('id', itemID);

    // add 3 sub elements to main "to-do item" element
    itemElement.appendChild(createCtrlButton());
    itemElement.appendChild(createListItem(item));
    itemElement.appendChild(createOptionsButton());

    //add new "to-do item" element to list at bottom of DOM
    existingList.appendChild(itemElement);
} 

/**
 * function to append item to list array
 */
const addArrayItem = (newTask, taskList) => {
    //get current length of array
    let itemIndex = taskList.length;
    //add newTask to array of tasks
    taskList.push(newTask);
    //for each new task in array, create a list item
    addItem(taskList[itemIndex], itemIndex);
}

/**
 * function to move item up, down, or remove from array
 */
const reOrderArray = (itemNum, action) => {
    //get current array of items
    console.log(taskList);
    let currentItem = document.getElementById(itemNum);
    let currentTask = currentItem.querySelector('.task-item');
    console.log(`currentTask is ${currentTask}.`);
    let taskText = currentTask.innerText;
    console.log(`taskText is ${taskText}`);
    let itemIndex = taskList.indexOf(taskText);
    console.log(`item's Index is ${itemIndex} and the index type is ${typeof itemIndex}`);
    if (action === 'move up') {
        if (itemIndex !== 0) {
            
        }
    }
    // if action == 'move up', change currentItem's class to itemNum --;
    // else if action == 'move down', change currentItem's class to itemNum ++;
    // else if action = 'remove', remove from array 
}

const displayActions = (itemNum) => {
    // display all buttons
    let currentItem = document.getElementById(itemNum);
    // let childItem = currentItem.child
    console.log(`currentItem is ${currentItem}`);
    let currentOptions = currentItem.lastChild;

    console.log(`last child is ${currentOptions.innerHTML}`);

    let dropDownMenu = addOptions();
    let action = '';

    currentOptions.appendChild(dropDownMenu);

    // event listener for click
    document.addEventListener('click', (event) => {
        /**
         * add event listeners to options in dropdown
         */
        if (event.target.id === 'move-up') {
            console.log(`item ${itemNum} moved up 1 space`);
            action = 'move up';
        } else if (event.target.id === 'move-dwn') {
            console.log(`item ${itemNum} moved down 1 space`);
            action = 'move down';
        } else if (event.target.id === 'delete') {
            console.log(`item ${itemNum} deleted`);
            action = 'remove';
        }
        reOrderArray(itemNum, action);
        dropDownMenu.remove();
    })
}

/**
*   MAIN CODE     
*   get elements from DOM 
*/ 
const taskList = [];
console.log(Array.isArray(taskList));
const taskForm = document.querySelector('form');
const formEntry = document.getElementById('user-input');

/**
 * add event listener to submit button (on click or 'enter')
 */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // if field is empty, do nothing
    if (!formEntry.value) {
        null
    } else {
        let newTask = formEntry.value;
        addArrayItem(newTask, taskList);
        formEntry.value = "";
    }
})

/**
 * add event listener to ctrl buttons
 */ 
document.addEventListener('click', (event) => {
    let parentItem = event.target.parentElement;
    let itemNum = parentItem.getAttribute('id');
 
    // if target is Options button, do something
    if (event.target.className == 'item-options') {
         
        console.log(`item OPTIONS BUTTON clicked for ${itemNum}.`); 
        displayActions(itemNum);   
    }
    // if target is Control button:
    else if (parentItem.className === 'item-ctrl')
    {   
        console.log(`item CTRL clicked for ${itemNum}`);
        //if Control button is checked, uncheck it
        if (event.target.className === 'check-img is-checked') {
            event.target.classList.remove('is-checked');
            event.target.classList.add('is-unchecked');
        }
        // otherwise, if Control button is not checked, create 'check' element and append 
        else {
            event.target.classList.remove('is-unchecked')
            event.target.classList.add('is-checked');
        }
    }
})
