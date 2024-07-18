const form = document.getElementById('item-form');
const formInput = document.getElementById('item-input');
const list = document.getElementById('item-list');
const clearBtn = document.querySelector('.btn-clear');

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
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(value));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  list.appendChild(li);

  formInput.value = '';
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
  // Here we check if we select the button  
  if (e.target.parentElement.classList.contains('remove-item')) {
    // here we select the item itself
    const item = e.target.parentElement.parentElement;
    item.remove()

  }
}

// Remove all items
function clearItems(e) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

// Event listener 
form.addEventListener('submit', createItem);
list.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);