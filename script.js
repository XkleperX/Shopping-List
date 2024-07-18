const form = document.getElementById('item-form');
const formInput = document.getElementById('item-input');
const list = document.getElementById('item-list');
const clearBtn = document.querySelector('.btn-clear');
const filter = document.querySelector('.filter');
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

  addItemToDOM(value);
  addItemToStorage(value);

  updateUI();

  formInput.value = '';
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Append the li to the list 
  list.appendChild(li);
}

function addItemToStorage(item) {

  let itemsFormStorage;

  // The items refer as a key 
  if (localStorage.getItem('items') === null) {
    itemsFormStorage = [];
  } else {
    // There are two method of JSON the first is parse and the other Stringify
    itemsFormStorage = JSON.parse(localStorage.getItem('items'));
  }

  itemsFormStorage.push(item);

  const stringItems = JSON.stringify(itemsFormStorage);

  localStorage.setItem('items', stringItems);
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

function removeItem(e) {
  // Check if we select the button  
  if (e.target.parentElement.classList.contains('remove-item')) {
    // Select the item itself
    const item = e.target.parentElement.parentElement;
    if (confirm('Are you sure?')) {
      item.remove();
    }
  }
  updateUI();
}

// Remove all items
function clearItems(e) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  updateUI();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const list = document.querySelectorAll('li');

  list.forEach((item) => {
    const itemText = item.innerText.toLowerCase();

    if (itemText.includes(text)) {
      // item.style.display = 'flex';
      // or  
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}


function updateUI() {
  if (list.firstElementChild === null) {
    clearBtn.style.display = 'none';
    filter.style.display = 'none';
  }
  else {
    clearBtn.style.display = 'block';
    filter.style.display = 'block';
  }
}



// Event listener 
form.addEventListener('submit', createItem);
list.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems);

updateUI();