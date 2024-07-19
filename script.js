const form = document.getElementById('item-form');
const formInput = document.getElementById('item-input');
const list = document.getElementById('item-list');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('.filter input');
const formBtn = form.querySelector('button');
let editMode = false;

// Display items from storage 
function displayItem() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach(item => { addItemToDOM(item); });
  updateUI();
}

// Create item 
function createItem(e) {
  e.preventDefault();

  const value = formInput.value;
  if (value === '') {
    alert('Please enter a valid value');
    return;
  }

  if (isDuplicate(value)) {
    alert('This item is already there');
    return;
  }

  if (editMode) {
    const itemToEdit = list.querySelector('li');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.style.color = '#000';
    itemToEdit.remove();
    editMode = false;
  }

  addItemToDOM(value);
  addItemToStorage(value);
  formInput.value = '';
  updateUI();
}

// Function to check for duplicate items
function isDuplicate(value) {
  const items = list.querySelectorAll('li');
  for (let item of items) {
    if (item.textContent === value) {
      return true;
    }
  }
  return false;
}

// Add item to local storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  itemsFromStorage.push(item);

  const stringItems = JSON.stringify(itemsFromStorage);

  localStorage.setItem('items', stringItems);
}

function getItemFromStorage() {
  let itemsFromStorage;

  // The items refer as a key 
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    // There are two methods of JSON: parse and stringify
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

// Create button for item
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');

  button.appendChild(icon);

  return button;
}

// Create icon for button
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Add item to the DOM
function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Append the li to the list 
  list.appendChild(li);
  updateUI();
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    // Item you want to remove
    const item = e.target.parentElement.parentElement;
    removeItem(item);
  } else {
    setItemToUpdate(e.target);
  }
}

function setItemToUpdate(item) {
  editMode = true;
  // Or you could add a class to the item and remove it with classList.remove 
  list.querySelectorAll('li').forEach(i => i.style.color = '#000');
  item.style.color = '#cfcfcf';

  updateBtn();
  formInput.value = item.textContent;
}

function updateBtn() {
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = 'green';
}

// Remove item from the list and storage
function removeItem(item) {
  // Remove item from the DOM 
  if (confirm('Are you sure?')) {
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    updateUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Remove all items
function clearItems(e) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // Clear from local storage
  localStorage.removeItem('items');

  // Clear filter input
  filter.value = '';

  updateUI();
}

// Filter items
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    const itemText = item.innerText.toLowerCase();
    item.style.display = itemText.includes(text) ? '' : 'none';
  });
}

function updateUI() {
  if (list.firstElementChild === null) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  editMode = false;
}

// Event listeners 
form.addEventListener('submit', createItem);
list.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItem);

updateUI();
