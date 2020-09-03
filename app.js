// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handles UI tasks
class UI {
    static displayBooks() {
        // Get books from local storage
        const books = Store.getBooks();

        // Loop through books and add them to the list of books
        books.forEach(book => {
            UI.addBookToList(book);
        });
    }

    static addBookToList(book) {
        // Grab the list where the books will be displayed
        const bookList = document.getElementById('book-list');

        // create a table row element
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-warning btn-sm delete">X</a></td>
        `;

        // Append the newly created row to the book list
        bookList.appendChild(row);
    }

    static deleteBook(target) {
        // if we clicked the delete button remove the bbok
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        // Create a div to hold the alert message
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;

        // Append the message to the div
        div.appendChild(document.createTextNode(message));

        // Grab elements needed to insert div in correct position
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');

        // insert the div in the container before the book form element
        container.insertBefore(div, form);

        // make alert disappear after a few seconds
        setTimeout(() => document.querySelector('.alert').remove(), 4500);
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Storage Class: Handles Local Storage
class Store {
    static getBooks() {
        let books;

        // get books from local storage. If local storage does not contain books then create an empty array
        books = JSON.parse(localStorage.getItem('books')) || [];

        return books;
    }

    static addBook(book) {
        // Get books from local storage
        const books = Store.getBooks();

        // Push the new books onto the books array
        books.push(book);

        // Update local storage to refelect the newly added book
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        // Get the books from local storage
        const books = Store.getBooks();

        // Loop through each book until the isbn is found
        books.forEach((book, index) => {
            // if isbn matches then remove the book from the list
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        // Update local storage to refelect the removed book
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
const form = document.getElementById('book-form');
form.addEventListener('submit', e => {
    e.preventDefault();

    // Get values from the form 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Validate all fields are filled in 
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'warning');
    } else {
        // Instantiate a book object
        const book = new Book(title, author, isbn);

        // Add the book to the list
        UI.addBookToList(book);

        // Add book to storage
        Store.addBook(book);

        // Show a success message
        UI.showAlert(`${book.title} added successfully.`, 'success');

        // clear fields once book is added
        UI.clearFields();
    }
});

//Event: Remove a Book
document.getElementById('book-list').addEventListener('click', e => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show a meesage to inform user deletion was a success
    UI.showAlert('Book removed.', 'success');
});