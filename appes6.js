class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBooktoList(book) {
        const bList = document.getElementById('book-list');
    
        // create tr element
        const row = document.createElement('tr');

        // insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `
        bList.appendChild(row);
    }

    showalert(message, className) {
        // create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent 
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearField() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

// Local Strorage Class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI();

            // Add book to UI
            ui.addBooktoList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listner for add book
document.getElementById('book-form').addEventListener('submit', 
    function(e) {
        // Get form values
        const title = document.getElementById('title').value;
              author = document.getElementById('author').value;
              isbn = document.getElementById('isbn').value;

        // Instantiate book
        const book = new Book(title, author, isbn);

        // Instantiate UI
        const ui = new UI();

        // validation 
        if(title === '' || author === '' || isbn === '') {
            // error alert
            ui.showalert('Please fill in all fields', 'error');

        } else {

            // Add book to list
            ui.addBooktoList(book);

            // Add book to LS
            Store.addBook(book);

            // Show success
            ui.showalert('Book Added!', 'success');

            // clear field
            ui.clearField();
        }

        e.preventDefault();
    }
);

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click',
    function(e) {

        // Instantiate UI
        const ui = new UI();

        // delete book - call
        ui.deleteBook(e.target);

        // Remove from LS
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        // show message
        ui.showalert('Book Removed!', 'success');

        e.preventDefault();
    }
)