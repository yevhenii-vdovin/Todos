const todoForm = document.querySelector('.todo-form'); //select the todo-form
const todoInput = document.querySelector('.todo-input'); //select the input box
const todoItemsList = document.querySelector('.todo-items'); //select the <ul>
const clearBtn = document.querySelector('.clear-button');
const clearComletedBtn = document.querySelector('.clear-completed-button');

let todos = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : [];
console.log(todos);

// showTodos(todos);

todoForm.addEventListener('submit', addTodoHandler);
todoItemsList.addEventListener('click', clickTodoItemsList);
clearComletedBtn.addEventListener('click', btnClearCompleted);
clearBtn.addEventListener('click', btnClearAll);

// add newTodo => todos
function addTodo(item) {
  if (!item) return;

  const newTodo = {
    id: (Math.random() * 10000).toFixed(0),
    name: item,
    completed: false,
  };

  todos.push(newTodo);
  showTodos(todos);
  todoForm.reset();
  addTolocalStogare(todos);
  // todoForm.reset();
}

// show todos
function showTodos(todos) {
  let isEmptyTodos = todos.length === 0;
  let html = isEmptyTodos
    ? `<li>add your first Todo..</li>`
    : todos
        .map((item) => {
          return `<li class="item ${
            item.completed ? 'checked' : null
          }" id-key='${item.id}'>
              <input type="checkbox" class="checkbox" ${
                item.completed ? 'checked' : null
              }>
              ${item.name}
              <button class="delete-button">x</button></li>`;
        })
        .join('');

  todoItemsList.innerHTML = html;

  if (!isEmptyTodos) {
    clearBtn.classList.add('active');
  } else {
    clearBtn.classList.remove('active');
  }

  // clearBtn.classList[todos.length > 0 ? 'add' : 'remove']('active');
}

// updateTodo
function updateTodo(todoID) {
  todos = todos.map(function (item) {
    if (item.id === todoID) {
      return {
        id: item.id,
        name: item.name,
        completed: !item.completed,
      };
    }

    return item;
  });

  showTodos(todos);
  addTolocalStogare(todos);
}
// deleteTodo
function deleteTodo(todoID) {
  todos = todos.filter(function (item) {
    return item.id !== todoID;
  });
  console.log(todos);
  // showTodos(todos);
  addTolocalStogare(todos);
}

deleteTodo(todoID);

// add an eventListener on form, and listen for submit event
function addTodoHandler(event) {
  event.preventDefault();

  addTodo(todoInput.value);
}

// event click items list
function clickTodoItemsList(event) {
  let target = event.target;
  let todoId = target.parentElement.getAttribute('id-key');

  if (target.type === 'checkbox') {
    updateTodo(todoId);
  }

  if (target.classList.contains('delete-button')) {
    confirmDelete(todoId);
  }
}

// event btn Clear comleted
function btnClearCompleted() {
  todos = todos.filter(function (item) {
    return !item.completed;
  });

  showTodos(todos);
  addTolocalStogare(todos);
}

// event btn Clear All
function btnClearAll() {
  todos = [];

  showTodos(todos);
  addTolocalStogare(todos);
}

// function to add todos to local storage
function addTolocalStogare(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));

  showTodos(todos);
}

// function helps to get everything from local storage
// function getFromLocalStorage() {
//   const row = localStorage.getItem('todos');
//   if (row) {
//     todos = JSON.parse(row);
//     showTodos(todos);
//   }
// }

// getFromLocalStorage();

// alert Confirm delete
function confirmDelete(elemAttribute) {
  swal({
    title: 'Are you sure?',
    text: 'you will delete the object now :(',
    icon: 'error',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteTodo(elemAttribute);
    }
  });
}
