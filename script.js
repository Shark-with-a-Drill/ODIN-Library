const bookButton = document.querySelector('#addbook');
const removeButton = document.querySelector('#removebook');
const input = document.querySelectorAll('.input');
const inputs = [...input];
const bookShelf = document.querySelector('#bookholder');

let myLibrary = [];

function Book(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
}

Book.prototype.addBookToLibrary = function(myLibrary, title, author, pages, read, rating) {
    let newBook = new Book(title, author, pages, read, rating);
    myLibrary.push(newBook);
    newBook.showOnShelf();
}

//! constructor can be called anywhere to take in values and push new book into library array
//! after the array is updated, the book object is also displayed on the shelf with another fxn

Book.prototype.removeBookFromLibrary = function(myLibrary, title) {
    return myLibrary.filter(book => book.title !== title);
}

//! proto function takes in value and returns a library array without the specific titled book
//! this can be used to overwrite and update the array later

Book.prototype.isRead = function() {
    this.read = !this.read;
}

Book.prototype.showOnShelf = function() {
    const book = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('h3');
    const pages = document.createElement('p');
    const rating = document.createElement('p');
    const read = document.createElement('p');
    title.innerText = this.title;
    author.innerText = this.author;
    pages.innerText = this.pages + ' pages';
    rating.innerText = this.rating + '/10';
    read.innerText = this.read ? 'Read' : 'Unread'; //?ternary operator can be used here instead of if/else for direct comparison from object
    bookShelf.appendChild(book);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(rating);
    book.appendChild(read);
}

//! makes individual book divs, and loads info from its respective book object via 'this'

Array.prototype.populateShelf = function() {
    bookShelf.innerText = '';
    this.forEach(book => {
        const bookHolder = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('h3');
        const pages = document.createElement('p');
        const rating = document.createElement('p');
        const read = document.createElement('p');
        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = book.pages + ' pages';
        rating.innerText = book.rating + '/10';
        read.innerText = book.read ? 'Read' : 'Unread';
        bookShelf.appendChild(bookHolder);
        bookHolder.appendChild(title);
        bookHolder.appendChild(author);
        bookHolder.appendChild(pages);
        bookHolder.appendChild(rating);
        bookHolder.appendChild(read);
    });
}

//! clears the bookshelf and iterates through array, grabbing info per object and appending new divs to bookshelf


function checkValidity() {
    const allValid = inputs.every((input) => input.checkValidity());
    if (allValid) {
        bookButton.classList.add('valid-button');
        bookButton.classList.remove('invalid-button');
    }
    else {
        bookButton.classList.remove('valid-button');
        bookButton.classList.add('invalid-button');
    }
}

//! checks if all input fields are proper before creating book object to prevent empty or undefined books

bookButton.addEventListener('click', function() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    let rating = document.querySelector('#rating').value;

    checkValidity();

    //? create variables holding the value of form info to pass into function
    if (bookButton.classList.contains('valid-button')) {
        Book.prototype.addBookToLibrary(myLibrary, title, author, pages, read, rating)
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#pages').value = "";
        document.querySelector('#read').checked = false;
        document.querySelector('#rating').value = "";
    }    
})

//! event listener gets info from textbox and checks if valid, then creates new Book object and clears textboxes

removeButton.addEventListener('click', function(event) {
    event.preventDefault(); //prevent refresh on button press
    let removedTitle = document.querySelector('#removename').value;
    myLibrary = Book.prototype.removeBookFromLibrary(myLibrary, removedTitle);
    myLibrary.populateShelf();
})

//! event listener gets book title from the textbox and passes into remove book fxn, which returns the value and that overwrites the old array
//! this new array is then cleared and repopulated with the remaining books

const book1 = new Book('The Martian', 'Andy Weir', 500, true, 5);
const book2 = new Book('Das Kapital', 'Karl Marx', 9000, false, 1);
const book3 = new Book('Flowers for Charlie', 'Charlie', 5, true, 5);

myLibrary.push(book1, book2, book3);
myLibrary.populateShelf();