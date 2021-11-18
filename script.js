
/**
 * function to toggle the class of selected menu item

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
 */

/**
  * function to switch displayed item on menu
  * (calls toggleClass to change item's class) 

const toggleMenuDisplay = (e) => {
    console.log('toggleMenuDisplay should be toggling...');
    const dropdown = e.currentTarget.parentNode;
    console.log(dropdown.value);
    const menu = dropdown.querySelector('.menu');
    toggleClass(menu, 'hide');
}
*/



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
            <div class='option' id='option1'>Move Up</div>
            <div class='option' id='option2'>Move Down</div>
            <div class='option' id='option3'>Delete</div>
        </div>
    `

    optionsDropDown.innerHTML = dropDownMarkup;
    return optionsDropDown;
    // optionsButton.appendChild(optionsDropDown);
    // return optionsButton;
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
    // addOptions(optionsButton);
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
const addItem = (item, itemNumber) => {
    // get existing list from DOM
    let existingList = document.getElementById('task-list');

    // create the itemElement div and generates itemElement's ID
    let itemElement = document.createElement('div');
    // set class and id attributes and append to itemElement
    itemElement.classList.add('item-element');
    let itemID = `item-${itemNumber}`;
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
 * function to remove item from list
 */
const removeItem = (item) => {
    null
}

const displayActions = (itemNum) => {
    // display all buttons
    // let itemID = `item-${itemNum}`;
    // console.log(`itemID is ${itemID}`);
    let currentItem = document.getElementById(itemNum);
    console.log(currentItem);
    let dropDownMenu = addOptions();
    currentItem.appendChild(dropDownMenu);
    // get menu parent ??
    document.addEventListener('click', (event) => {

    })
}

/**
*   MAIN CODE     
*   get elements from DOM 
*/ 
const taskList = [];
const taskForm = document.querySelector('form');
const formEntry = document.getElementById('user-input');
// const button = document.querySelector('button');
const dropdownTitle = document.querySelector('.dropdown .title');

// if element of both classes 'dropdown' and 'title' does not exsit, do nothing
if (dropdownTitle == null) {
    console.log('no task items yet');

// else, add listeners to above elements
} else {
    console.log('task items added!');
    let dropdownOptions = document.querySelectorAll('.dropdown .option');
    dropdownTitle.addEventListener('click', toggleMenuDisplay);
    dropdownOptions.forEach(option => option.addEventListener('click', handleOptionSelected));
}


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
        addArrayItem(newTask, taskList);
        formEntry.value = "";
    }
})

/**
 * add event listener to ctrl buttons
 */ 
document.addEventListener('click', (event) => {
    let parentItem = event.target.parentNode;
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
