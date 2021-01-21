const mainContainer = document.getElementById('main-container');
const myLibrary = [];

function Book() {}

// eslint-disable-next-line func-names
Book.prototype.info = function () {
  return `'${this.title}' by ${this.author}, ${this.pages} pages, status: ${this.read}`;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = Object.create(Book.prototype);
  newBook.title = title;
  newBook.author = author;
  newBook.pages = pages;
  newBook.read = read;
  myLibrary.push(newBook);
  return `Book '${newBook.title}' has been added to the library.`;
}

function showBooks() {
  for (let i = 0; i < myLibrary.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add('card');
    mainContainer.appendChild(div);
    console.log(myLibrary[i].info());
  }
}

addBookToLibrary('The Last Wish', 'Andrzej Sapkowski', '288', 'READ');
addBookToLibrary('Sword of Destiny', 'Andrzej Sapkowski', '384', 'READ');
addBookToLibrary('Blood of Elves', 'Andrzej Sapkowski', '320', 'NOT READ');

showBooks();
