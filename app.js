const mainContainer = document.getElementById('main-container');

const myLibrary = [];

function Book() {}

// eslint-disable-next-line func-names
Book.prototype.info = function () {
  return `'${this.title}' by ${this.author}, ${this.pages} pages, status: ${this.read}`;
};

function showBooks() {
  mainContainer.textContent = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    // Create book card
    const divCard = document.createElement('div');
    mainContainer.appendChild(divCard);
    divCard.classList.add('card');
    // Create book title
    const h2Title = document.createElement('h2');
    divCard.appendChild(h2Title);
    h2Title.textContent = myLibrary[i].title;
    // Create book author
    const pAuthor = document.createElement('p');
    divCard.appendChild(pAuthor);
    pAuthor.textContent = 'by ';
    const spanAuthor = document.createElement('span');
    pAuthor.appendChild(spanAuthor);
    spanAuthor.classList.add('author');
    spanAuthor.textContent = myLibrary[i].author;
    // Create seperator
    const divSep = document.createElement('div');
    divCard.appendChild(divSep);
    divSep.classList.add('sep');
    // Create book length
    const pLength = document.createElement('p');
    divCard.appendChild(pLength);
    pLength.classList.add('details');
    const spanLength = document.createElement('span');
    pLength.appendChild(spanLength);
    spanLength.classList.add('bold');
    spanLength.textContent = 'Length: ';
    const textLength = document.createTextNode(myLibrary[i].pages);
    pLength.appendChild(textLength);
    // Create book status
    const pStatus = document.createElement('p');
    divCard.appendChild(pStatus);
    pStatus.classList.add('details');
    const spanStatus = document.createElement('span');
    pStatus.appendChild(spanStatus);
    spanStatus.classList.add('bold');
    spanStatus.textContent = 'Status: ';
    const textStatus = document.createTextNode(myLibrary[i].read);
    pStatus.appendChild(textStatus);
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = Object.create(Book.prototype);
  newBook.title = title;
  newBook.author = author;
  newBook.pages = pages;
  newBook.read = read;
  myLibrary.push(newBook);
  showBooks();
  return `Book '${newBook.title}' has been added to the library.`;
}

addBookToLibrary('The Last Wish', 'Andrzej Sapkowski', '288', 'READ');
addBookToLibrary('Sword of Destiny', 'Andrzej Sapkowski', '384', 'READ');
addBookToLibrary('Blood of Elves', 'Andrzej Sapkowski', '320', 'NOT READ');

showBooks();
