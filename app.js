// Book Class: Represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI tasks
class UI {
    constructor() {

    }

    static displayBooks() {
        const storedBooks = [
            {
                title: "Cilka's Journey",
                author: "Heather Morris",
                isbn: "12345"
            },
            {
                title: "Gone Girl",
                author: "Gillian Flynn",
                isbn: "67890"
            }
        ];

        const books = storedBooks;

        books.forEach(book => {
            UI.addBookToList(book);
        });
    }

    static addBookToList(book) {
        const bookList = document.getElementById('book-list');

        // create a table row element
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-warning btn-sm delete">X</a></td>
        `;

        bookList.appendChild(row);
    }

    static deleteBook(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Store Class: Handles Local Storage

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

    // Instantiate a book object
    const book = new Book(title, author, isbn);

    // Add the book to the list
    UI.addBookToList(book)
    UI.clearFields();
});

//Event: Remove a Book
document.getElementById('book-list').addEventListener('click', e => {
    UI.deleteBook(e.target);
});