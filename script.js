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
    myLibrary.populateShelf();
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

//? Array prototype method for adding to shelf and refreshing array
Array.prototype.populateShelf = function() {
    bookShelf.innerText = '';
    this.forEach(book => {
        const bookHolder = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('h3');
        const pages = document.createElement('p');
        const rating = document.createElement('p');
        const readHolder =document.createElement('div');
        const checkbox = document.createElement('input');
        const read = document.createElement('p');
        const removeButton = document.createElement('button');
        bookHolder.classList.add('book');
        title.innerText = book.title;
        title.setAttribute('sort-title', book.title);
        author.innerText = book.author;
        pages.innerText = book.pages + ' pages';
        rating.innerText = book.rating + '/10';
        readHolder.classList.add('readBox');
        checkbox.setAttribute('type', 'checkbox');
        read.innerText = book.read ? 'Read' : 'Unread';
        checkbox.checked = book.read ? true : false;
        removeButton.innerText = 'Remove';
        removeButton.classList.add('removeButton');
        bookShelf.appendChild(bookHolder);
        bookHolder.appendChild(title);
        bookHolder.appendChild(author);
        bookHolder.appendChild(pages);
        bookHolder.appendChild(rating);
        bookHolder.appendChild(readHolder);
        readHolder.appendChild(checkbox);
        readHolder.appendChild(read);
        bookHolder.appendChild(removeButton);
        removeButton.addEventListener('click', (event) => {
            const bookDiv = event.target.parentElement;
            bookShelf.removeChild(bookDiv);
            myLibrary = Book.prototype.removeBookFromLibrary(myLibrary, book.title);
        });
        checkbox.addEventListener('click', function() {
                book.isRead();
                read.innerText = book.read ? 'Read' : 'Unread';
        })
    });
}
//! the CSS custom data attribute is setup here to make searching for the title fast
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

//? setup button event listeners

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
    let removedTitle = document.querySelector('#removename');
    const divFinder = document.querySelector(`h2[sort-title='${removedTitle.value}']`);
    const allValid = removedTitle.checkValidity() && divFinder != null;
    if (allValid) {
        const div = divFinder.parentElement;
        bookShelf.removeChild(div);
        myLibrary = Book.prototype.removeBookFromLibrary(myLibrary, removedTitle.value);
        removedTitle.value = '';
    }
})

//! event listener gets book title from the textbox and passes into remove book fxn, which returns the value and that overwrites the old array
//! difFinder uses CSS custom data attributes to quickly search the DOM for a certain element and select its parent
//! the parent is then removed from the bookshelf
//! the library is then updated to remove the respective Book object


const book1 = new Book('The Martian', 'Andy Weir', 500, true, 5);
const book2 = new Book('Das Kapital', 'Karl Marx', 9000, false, 1);
const book3 = new Book('Flowers for Charlie', 'Charlie', 5, true, 5);

myLibrary.push(book1, book2, book3);
myLibrary.populateShelf();

//? extra/deprecated remove book method
// Book.prototype.removeBookOnClick = function() {
//     const bookIndex = myLibrary.indexOf(this);
//     if (bookIndex !== -1) {
//         myLibrary.splice(bookIndex, 1);
//     }
// }
//? Book object prototype method for adding to shelf and refreshing array
// Book.prototype.showOnShelf = function() {
//     const book = document.createElement('div');
//     const title = document.createElement('h2');
//     const author = document.createElement('h3');
//     const pages = document.createElement('p');
//     const rating = document.createElement('p');
//     const read = document.createElement('p');
//     const removeButton = document.createElement('button');
//     book.classList.add('book');
//     title.innerText = this.title;
//     author.innerText = this.author;
//     pages.innerText = this.pages + ' pages';
//     rating.innerText = this.rating + '/10';
//     read.innerText = this.read ? 'Read' : 'Unread'; //?ternary operator can be used here instead of if/else for direct comparison from object
//     removeButton.innerText = 'Remove';
//     removeButton.classList.add('removeButton');
//     bookShelf.appendChild(book);
//     book.appendChild(title);
//     book.appendChild(author);
//     book.appendChild(pages);
//     book.appendChild(rating);
//     book.appendChild(read);
//     book.appendChild(removeButton);
//     removeButton.addEventListener('click', () => {
//         myLibrary = Book.prototype.removeBookFromLibrary(myLibrary, this.title);
//         myLibrary.populateShelf();
//     })
// }
//! makes individual book divs, and loads info from its respective book object via 'this'