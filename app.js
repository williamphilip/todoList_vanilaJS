// mengumpulkan sebuah UI dari element
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

// kumpulan eventListener
immediateLoadEventListener();

function immediateLoadEventListener() {

  // mendapatkan todos dari localStorage dan render di browser
  document.addEventListener("DOMContentLoaded", getTodos);

  // event menambahkan todo
  todoForm.addEventListener("submit", addTodo);

  // event menghapus satu todo
  todoList.addEventListener("click", deleteTodo);

  // event menghapus semua todo
  clearButton.addEventListener("click", clearTodos);

  // event memfilter todo
  filterInput.addEventListener("keyup", filterTodos);
}


// Reusable function Codes 
function createTodoElement(value) { // value disini bisa dari filterInput atau localstorage
  // membuat element li
  const li = document.createElement("li");

  // menambahkan class untuk element li
  li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";

  // menambahkan children ke dalam li
  li.appendChild(document.createTextNode(value));

  // membuat delete button
  const a = document.createElement("a");

  // memberi properti untuk element a
  a.href = "#";
  a.className = "badge badge-danger delete-todo";

  // memasukkan sebuah child (cara pertama tadi menggunakan appenChild, cara kedua dapat menggunakan inneHTML)
  a.innerHTML = "Delete";

  // menyelipkan element a ke dalam children li
  li.appendChild(a);

  // memasukkan element li yang telah dibuat dengan JS ke dalam element todoList.
  todoList.appendChild(li);
}

function getItemFromLocalStorage() {
  let todos;

  // kita cek local storage, jika local storage kosong maka variable todos akan kita ubdah menjadi array kosong, namun jika local storage berisi sebuah value/nilai dan value tersebut kita inspect sebagai sebuah array, maka kita buat variable todos dengan isinya adalah value dari localstorage tersebut.
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}


// function untuk mendapatkan todos dari localStorage dan render di browser
function getTodos() {
  // memanggil function getItemFromLocalStorage dari reusable function
  const todos = getItemFromLocalStorage();

  todos.forEach((todo) => {
    // memanggil dari function reusable (function createTodoElement)
    createTodoElement(todo); // parameter todo adalah value dari localStorage yang kita looping
  })

}

// function tambah list
function addTodo(event) {
  event.preventDefault();
  
  // jika user mengisi/menginput alias berisi sesuatu (true)
  if (todoInput.value) {

    // memanggil dari function reusable (function createTodoElement)
    createTodoElement(todoInput.value); // parameter todoInput.value adalah input yang user masukkan dari todo input

    // memanggil function addTodoLocalStorage, dan menerima parameter dari apa yang diinput oleh user
    addTodoLocalStorage(todoInput.value);

    // mengosongkan area inputan todoInput, dengan string kosong
    todoInput.value = "";

  } else { // jika tidak ada inputan alias string kosong (false)
    alert("Tulis sebuah todo, tidak boleh kosong!");
  }
  

}

// function yang menghendel inputan masuk ke localStorage
function addTodoLocalStorage(todoInputValue) {
  // memanggil function getItemFromLocalStorage dari reusable function
  const todos = getItemFromLocalStorage();

  todos.push(todoInputValue);

  // toD yang sudah mempunyai value kita kirim ke localstorage
  localStorage.setItem("todos", JSON.stringify(todos));

}

// function menghapus list
function deleteTodo(event) {
  event.preventDefault();

  if(event.target.classList.contains("delete-todo")) {
    if(confirm("Apakah yakin akan menghapus?")) {
        const parent = event.target.parentElement;
        parent.remove();

        deleteTodoLocalStorage(parent);
    }
  }
}

// Function menghapus todo di Local Storage
function deleteTodoLocalStorage(deletedElement) {
  const todos = getItemFromLocalStorage(); // menghapus/mengambil element dalam todo (li) dari localstorage

  // merubah value dengan menghapus data yang sudah kita ambil
  todos.forEach((todo, index) => {
    if (deletedElement.firstChild.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  // mengembalikan data yang sudah kita ubah ke local storage kembali
  localStorage.setItem("todos", JSON.stringify(todos));

}

// function menghapus semua list secara bersamaan
function clearTodos() {
  todoList.innerHTML = "";
}

// function untuk memfilter list menggunakan method indexOf
function filterTodos(e) {
  const filterText = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll(".todo-item");

  // looping semua element li, dan semua element li ditandai dengan parameter item
  todoItems.forEach((item) => {

    // menyimpan masing-masing value item (dalam hal ini li dengan class todo-item textnya) ke dalam variabel, dan kita ambil child pertama dan text contentnya dalam hal ini text yang ada didalam li
    const itemText = item.firstChild.textContent.toLowerCase();

    // jika itemText(item yang ada didalam todo list) kita periksa menggunakan indexOf(apakah ada dari kata filterText yang diinput oleh user), jika ada maka tentu saja dia menghasilkan bukan -1, maka item tersebut kita biarkan memiliki style display block, sebaliknya jika diperiksa atau di looping element pertama ke element kedua dan seterusnya tidak ada kata yang diinput oleh user, maka tidak masuk dalam block if dengan style display block, tetapi masuk ke block else. 
    if (itemText.indexOf(filterText) !== -1) {
      item.setAttribute("style", "display: block;");
    } else {
      item.setAttribute("style", "display: none !important;");
    }

  })

}

// function untuk mengambil todos / get todos















// Cat:
// - fungsi preventDefault adalah ketika melakukan submit dalam form, default behavior dari browser adalah merefresh page, dengan kita menggunakan fungsi preventdefault maka behavior default page tidak akan aktif, sehingga tidak akan terjadi PAGE REFRESH dan membuat DOM menjadi direfresh atau terleload.
// - Perbedaan appenChild dan InnerHTML, fungsinya sama, tapi perbedaannya appenChild sama seperti sebuah box, jika kita append maka akan masuk ke box sebelahnya, sedangkan innerHTML kita mengganti seluruh children / box yang ada didalamnya. dalam hal ini element li kita gunakan appendChild, sedangkan element a (angker) kita gunakan innerHTML.
// - KEYUP adalah sebuah tipe eventlistener yang mentrigger sebuah function begitu user MENGETIK sesuatu ketika keyboard di klik dari atas ke bawah, ketika kembali keatas lagi itulah KEYUP.