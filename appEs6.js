class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookTolist(book) {
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
  }

  showAlert(message, className) {
    //Creatediv element
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);
    //SetTimeout for alert
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

//Local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      //Convert data (string) from localStorage to JavaScript object.
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {}

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('book', JSON.stringify(books));
  }

  static removeBook() {}
}

//Event listner for add book
document.querySelector('#book-form').addEventListener('submit', function(e) {
  //Get form values
  (title = document.querySelector('#title').value),
    (author = document.querySelector('#author').value),
    (isbn = document.querySelector('#isbn').value);
  //Instantiat book
  const book = new Book(title, author, isbn);

  //Instantiat UI
  const ui = new UI();

  //Validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add book to list
    ui.addBookTolist(book);

    //Add book to local storage
    Store.addBook(book);

    //Show success
    ui.showAlert('Book added', 'success');

    //Clear fields
    ui.clearFields();
  }

  //Prevent window to load
  e.preventDefault();
});

//Event listner for delete
document.querySelector('#book-list').addEventListener('click', function(e) {
  //Instantiat UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Show message
  ui.showAlert('Deleted book', 'success');
  e.preventDefault();
});
