// mengumpulkan sebuah UI dari element
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos");

todoForm.addEventListener("submit", addTodo);
todoList.addEventListener("click", deleteTodo);

// function tambah list
function addTodo(event) {
  event.preventDefault();
  
  // membuat element li
  const li = document.createElement("li");

  // menambahkan class untuk element li
  li.className = "list-group-item d-flex justify-content-between align-items-center mb-1";

  // menambahkan children ke dalam li
  li.appendChild(document.createTextNode(todoInput.value));

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

  // mengosongkan area inputan todoInput, dengan string kosong
  todoInput.value = "";

}

// function menghapus list
function deleteTodo(event) {
  event.preventDefault();

  if(event.target.classList.contains("delete-todo")) {
    if(confirm("Apakah yakin akan menghapus?")) {
        const parent = event.target.parentElement;
        parent.remove();
    }
  }
}












// Cat:
// - fungsi preventDefault adalah ketika melakukan submit dalam form, default behavior dari browser adalah merefresh page, dengan kita menggunakan fungsi preventdefault maka behavior default page tidak akan aktif, sehingga tidak akan terjadi PAGE REFRESH dan membuat DOM menjadi direfresh atau terleload.
// - Perbedaan appenChild dan InnerHTML, fungsinya sama, tapi perbedaannya appenChild sama seperti sebuah box, jika kita append maka akan masuk ke box sebelahnya, sedangkan innerHTML kita mengganti seluruh children / box yang ada didalamnya. dalam hal ini element li kita gunakan appendChild, sedangkan element a (angker) kita gunakan innerHTML.