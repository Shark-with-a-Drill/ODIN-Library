const bookButton = document.querySelector('#addbook');
const removeButton = document.querySelector('#removebook');
const input = document.querySelectorAll('.inputbook');
const inputs = [...input];
const bookShelf = document.querySelector('#bookholder');

let myLibrary = [];
function Book(title, author, read, rating, cover) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.rating = rating;
    this.cover = cover;
    if (this.rating == '') {
        this.rating = 'Unrated';
    }
}

Book.prototype.addBookToLibrary = function(myLibrary, title, author, read, rating, cover) {
    let newBook = new Book(title, author, read, rating, cover);
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
        const posterHolder = document.createElement('div');
        const bookHolder = document.createElement('div');
        const cover = document.createElement('img');
        const title = document.createElement('h2');
        const author = document.createElement('h3');
        const rating = document.createElement('p');
        const readHolder =document.createElement('div');
        const checkbox = document.createElement('input');
        const read = document.createElement('p');
        const removeButton = document.createElement('button');
        bookHolder.classList.add('book');
        posterHolder.classList.add('poster');
        cover.src = book.cover;
        cover.classList.add('cover');
        title.innerText = book.title;
        title.setAttribute('sort-title', book.title);
        author.innerText = book.author;
        title.setAttribute('sort-author', book.author);
        if (book.rating == 'Unrated') {
            rating.innerText = book.rating;
        }
        else {
            rating.innerText = book.rating + '/10';
        }
        readHolder.classList.add('readBox');
        checkbox.setAttribute('type', 'checkbox');
        read.innerText = book.read ? 'Seen' : 'Unwatched';
        checkbox.checked = book.read ? true : false;
        removeButton.innerText = 'Remove';
        removeButton.classList.add('removeButton');
        bookShelf.appendChild(posterHolder);
        posterHolder.appendChild(cover);
        posterHolder.appendChild(bookHolder);
        // bookHolder.appendChild(cover);
        bookHolder.appendChild(title);
        bookHolder.appendChild(author);
        bookHolder.appendChild(rating);
        bookHolder.appendChild(readHolder);
        readHolder.appendChild(checkbox);
        readHolder.appendChild(read);
        bookHolder.appendChild(removeButton);
        removeButton.addEventListener('click', (event) => {
            const bookDiv = event.target.parentElement;
            const posterDiv = bookDiv.parentElement;
            bookShelf.removeChild(posterDiv);
            myLibrary = Book.prototype.removeBookFromLibrary(myLibrary, book.title);
        });
        checkbox.addEventListener('click', function() {
                book.isRead();
                read.innerText = book.read ? 'Seen' : 'Unwatched';
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

bookButton.addEventListener('click', function(event) {
    event.preventDefault();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let read = document.querySelector('#read').checked;
    let rating = document.querySelector('#rating').value;
    let coverInput = document.querySelector('#cover');
    let cover = coverInput.files[0];

    checkValidity();

    //? create variables holding the value of form info to pass into function
    if (bookButton.classList.contains('valid-button')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const coverImageURL = event.target.result;
            Book.prototype.addBookToLibrary(myLibrary, title, author, read, rating, coverImageURL)
            document.querySelector('#title').value = "";
            document.querySelector('#author').value = "";
            document.querySelector('#read').checked = false;
            document.querySelector('#rating').value = "";
            document.querySelector('#cover').value = "";
        };
        reader.readAsDataURL(cover);

    }    
})

//! event listener gets info from textbox and checks if valid, then creates new Book object and clears textboxes

removeButton.addEventListener('click', function(event) {
    event.preventDefault(); //prevent refresh on button press
    let removedTitle = document.querySelector('#removename');
    let removedAuthor = document.querySelector('#removeauthor');
    const divFinderTitle = document.querySelector(`h2[sort-title='${removedTitle.value}']`);
    const divFinderAuthor = document.querySelector(`h2[sort-author='${removedAuthor.value}']`);
    const allValid = removedTitle.checkValidity() && removedAuthor.checkValidity() && divFinderTitle != null;
    if (allValid && divFinderTitle.parentElement == divFinderAuthor.parentElement) {
        const div = divFinderTitle.parentElement;
        const posterDiv = div.parentElement;
        bookShelf.removeChild(posterDiv);
        myLibrary = Book.prototype.removeBookFromLibrary(myLibrary, removedTitle.value);
        removedTitle.value = '';
        removedAuthor.value = '';
    }
})

//! event listener gets book title from the textbox and passes into remove book fxn, which returns the value and that overwrites the old array
//! difFinder uses CSS custom data attributes to quickly search the DOM for a certain element and select its parent
//! the parent is then removed from the bookshelf
//! the library is then updated to remove the respective Book object


const book1 = new Book('Blade Runner 2049', 'Dennis Villenueve', true, 8, './2049.jpg');
const book2 = new Book('Mad Max: Fury Road', 'George Miller', true, 8, './madmax.jpeg');
const book3 = new Book('How To Train Your Dragon', 'Dean DeBlois & Chris Sanders', true, 10, './httyd.jpg');
const book4 = new Book('Inception', 'Christopher Nolan', true, 9, './inception.jpg');
const book5 = new Book('Everything Everywhere All At Once', 'Daniel Kwan & Daniel Scheinert', true, 10, './eeaao.jpg');
const book6 = new Book('Whiplash', 'Damien Chazelle', true, 10, './whiplash.jpg');
const book7 = new Book('NOPE', 'Jordan Peele', true, 9, './nope.jpg');
const book8 = new Book('Tropic Thunder', 'Ben Stiller', true, 10, './tt.jpg');
const book9 = new Book('Kill Bill: Vol 1', 'Quentin Tarantino', true, 8, './bill.jpg');
const book10 = new Book('Jaws', 'Steven Spielberg', true, 9, './jaws.jpg');
const book11 = new Book('The Menu', 'Mark Mylod', true, 10, './menu.jpg');
const book12 = new Book('Midsommar', 'Ari Aster', false, 3, './midsommar.jpg');
const book13 = new Book('Das Kapital', 'Karl Marx', false, 10, './commie.jpg');

myLibrary.push(book13, book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12);
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