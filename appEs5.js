//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}
//Add book to list
UI.prototype.addBookTolist = function(book) {
  const list = document.querySelector('#book-list');
  //Create tr element
  const row = document.createElement('tr');
  //Insert columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="x" class="delete">X</a></td>
  `;
  list.appendChild(row);
};

//Clear fields
UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
};

//Event listners
document.querySelector('#book-form').addEventListener('submit', function(e) {
  //Get form values
  (title = document.querySelector('#title').value),
    (author = document.querySelector('#author').value),
    (isbn = document.querySelector('#isbn').value);
  //Instantiat book
  const book = new Book(title, author, isbn);

  //Instantiat UI
  const ui = new UI();

  //Add book ti list
  ui.addBookTolist(book);

  //Clear fields
  ui.clearFields();

  //Prevent window to load
  e.preventDefault();
});
