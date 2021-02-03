const mainContainer = document.getElementById('books-container');

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
    divCard.classList.add('card');
    mainContainer.appendChild(divCard);
    // Create book title
    const h2Title = document.createElement('h2');
    h2Title.textContent = myLibrary[i].title;
    divCard.appendChild(h2Title);
    // Create book author
    const pAuthor = document.createElement('p');
    pAuthor.textContent = 'by ';
    divCard.appendChild(pAuthor);
    const spanAuthor = document.createElement('span');
    spanAuthor.classList.add('author');
    spanAuthor.textContent = myLibrary[i].author;
    pAuthor.appendChild(spanAuthor);
    // Create seperator
    const divSep = document.createElement('div');
    divSep.classList.add('sep');
    divCard.appendChild(divSep);
    // Create book length
    const pLength = document.createElement('p');
    pLength.classList.add('details');
    divCard.appendChild(pLength);
    const spanLength = document.createElement('span');
    spanLength.classList.add('bold');
    spanLength.textContent = 'Length: ';
    pLength.appendChild(spanLength);
    const textLength = document.createTextNode(`${myLibrary[i].pages} pages`);
    pLength.appendChild(textLength);
    // Create book status
    const pStatus = document.createElement('p');
    pStatus.classList.add('details');
    divCard.appendChild(pStatus);
    const spanStatus = document.createElement('span');
    spanStatus.classList.add('bold');
    spanStatus.textContent = 'Status: ';
    pStatus.appendChild(spanStatus);
    const textStatus = document.createTextNode(myLibrary[i].read);
    pStatus.appendChild(textStatus);
  }
  // Create add new book card
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'add-new');
  mainContainer.appendChild(divCard);
  // Create add new book button
  const buttonAddBook = document.createElement('button');
  buttonAddBook.id = 'add-book-modal';
  buttonAddBook.textContent = 'New book';
  divCard.appendChild(buttonAddBook);
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

function modalListeners() {
  const modal = document.getElementById('new-book-modal');
  const addBookButton = document.getElementById('add-book-modal');
  const closeButtons = document.getElementsByClassName('close');

  addBookButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  Array.from(closeButtons).forEach((button) => {
    button.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
}

addBookToLibrary('The Last Wish', 'Andrzej Sapkowski', '288', 'READ');
addBookToLibrary('Sword of Destiny', 'Andrzej Sapkowski', '384', 'READ');
addBookToLibrary('Blood of Elves', 'Andrzej Sapkowski', '320', 'NOT READ');

showBooks();
modalListeners();
