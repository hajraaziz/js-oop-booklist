// Book Constructor
function Book(title, author, ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
}

// UI Constructor - with all functionality (DOM manipulating) functions
function UI() {}

// Add book to the list function
UI.prototype.addbooktoList = function(book) {
    const bList = document.getElementById('book-list');
    
    // create tr element
    const row = document.createElement('tr');

    // insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ISBN}</td>
        <td><a href="#" class="delete">X</a></td>
    `
    bList.appendChild(row);
}

// Show Alert function
UI.prototype.showalert = function(message, className) {
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

// Delete Book
UI.prototype.deletebook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields function
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


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
            ui.addbooktoList(book);

            // Show success
            ui.showalert('Book Added!', 'success');

            // clear field
            ui.clearFields();
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
        ui.deletebook(e.target);

        // show message
        ui.showalert('Book Removed!', 'success');

        e.preventDefault();
    }
)