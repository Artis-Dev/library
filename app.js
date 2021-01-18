const myLibrary = [];

function Book() {
}

Book.prototype.info = function info() {
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

addBookToLibrary('The Last Wish', 'Andrzej Sapkowski', '288', 'READ');
addBookToLibrary('Sword of Destiny', 'Andrzej Sapkowski', '384', 'READ');
addBookToLibrary('Blood of Elves', 'Andrzej Sapkowski', '320', 'NOT READ');
