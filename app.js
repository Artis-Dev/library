const mainContainer = document.getElementById('books-container');
const modal = document.getElementById('new-book-modal');

function Book() {}

const myLibrary = [];

// eslint-disable-next-line func-names
Book.prototype.info = function () {
  return `'${this.title}' by ${this.author}, ${this.pages} pages, status: ${this.status}`;
};

function showBooks() {
  mainContainer.textContent = '';
  for (let i = 0; i < myLibrary.length; i += 1) {
    // Create book card
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    // WIP
    divCard.setAttribute('data-index', i);
    mainContainer.appendChild(divCard);
    // Create delete icon
    const spanDelete = document.createElement('span');
    spanDelete.classList.add('delete');
    divCard.appendChild(spanDelete);
    const iDelete = document.createElement('i');
    iDelete.classList.add('fas', 'fa-trash-alt');
    spanDelete.appendChild(iDelete);
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
    const textStatus = document.createTextNode((myLibrary[i].status) ? 'Done' : 'In progress');
    pStatus.appendChild(textStatus);
    const iChangeStatus = document.createElement('i');
    iChangeStatus.classList.add('fas', 'fa-sync-alt', 'change-status');
    pStatus.appendChild(iChangeStatus);
  }
  // Create add new book card
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'add-new');
  mainContainer.appendChild(divCard);
  // Create add new book button
  const iAddBook = document.createElement('i');
  iAddBook.classList.add('fas', 'fa-plus', 'add-book-modal');
  divCard.appendChild(iAddBook);
  // Add event listener for modal popup
  const addBookButton = document.querySelector('.add-book-modal');
  addBookButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = Object.create(Book.prototype);
  newBook.title = title;
  newBook.author = author;
  newBook.pages = pages;
  newBook.status = status;
  myLibrary.push(newBook);
  showBooks();
  return `Book '${newBook.title}' has been added to the library.`;
}

function formValidation(event) {
  const form = document.getElementById('add-book-form');
  const titleError = document.querySelector('.title-error');
  const authorError = document.querySelector('.author-error');
  const pagesError = document.querySelector('.pages-error');
  const bookTitle = document.forms['add-book-form']['book-title'].value;
  const bookAuthor = document.forms['add-book-form']['book-author'].value;
  const bookPages = document.forms['add-book-form']['book-pages'].value;
  const bookStatus = document.forms['add-book-form']['book-status'].checked;
  event.preventDefault();
  if (bookTitle !== '' && bookAuthor !== '' && +bookPages > 0 && +bookPages < 10000) {
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus);
    modal.style.display = 'none';
    form.reset();
  }
  if (bookTitle === '') {
    titleError.style.display = 'block';
  } else if (bookTitle !== '') {
    titleError.style.display = 'none';
  }
  if (bookAuthor === '') {
    authorError.style.display = 'block';
  } else if (bookTitle !== '') {
    authorError.style.display = 'none';
  }
  if (bookPages === '' || +bookPages > 0 || +bookPages < 10000) {
    pagesError.style.display = 'block';
  } else if (bookTitle !== '') {
    pagesError.style.display = 'none';
  }
}

function modalListeners() {
  const addBook = document.querySelector('#form-add-book');
  const closeButtons = document.getElementsByClassName('close');

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
  addBook.addEventListener('click', (event) => {
    formValidation(event);
  });
}

addBookToLibrary('The Last Wish', 'Andrzej Sapkowski', '288', true);
addBookToLibrary('Sword of Destiny', 'Andrzej Sapkowski', '384', true);
addBookToLibrary('Blood of Elves', 'Andrzej Sapkowski', '320', false);

showBooks();
modalListeners();
