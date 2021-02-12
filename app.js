const booksContainer = document.querySelector('#books-container');
const modal = document.querySelector('#new-book-modal');

function Book() { }

let myLibrary = [];

// Local storage
if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksStringFromStorage = localStorage.getItem('books');
  myLibrary = JSON.parse(booksStringFromStorage);
}

// eslint-disable-next-line func-names
Book.prototype.info = function () {
  return `'${this.title}' by ${this.author}, ${this.pages} pages, status: ${this.status}`;
};

function showBooks() {
  booksContainer.textContent = '';
  let readBooksCount = 0;
  let unreadBooksCount = 0;
  let readBooksPercent = 0;
  let unreadBooksPercent = 0;
  // Stats
  const totalBooks = document.querySelector('.total-books');
  const readBooks = document.querySelector('.read-books');
  const unreadBooks = document.querySelector('.unread-books');
  readBooks.textContent = `${readBooksCount} (0%)`;
  unreadBooks.textContent = `${unreadBooksCount} (0%)`;
  // Total book stats
  totalBooks.textContent = myLibrary.length;
  for (let i = 0; i < myLibrary.length; i += 1) {
    // Read book stats
    if (myLibrary[i].status === true) {
      readBooksCount += 1;
      readBooksPercent = Math.floor((readBooksCount / myLibrary.length) * 100);
      readBooks.textContent = `${readBooksCount} (${readBooksPercent}%)`;
    }

    // Unread book stats
    if (myLibrary[i].status === false) {
      unreadBooksCount += 1;
      unreadBooksPercent = Math.floor((unreadBooksCount / myLibrary.length) * 100);
      unreadBooks.textContent = `${unreadBooksCount} (${unreadBooksPercent}%)`;
    }
    // Create book card
    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.setAttribute('data-index', i);
    booksContainer.appendChild(divCard);
    // Create delete icon
    const iDelete = document.createElement('i');
    iDelete.classList.add('delete', 'fas', 'fa-trash-alt');
    divCard.appendChild(iDelete);
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
    const spanStatusText = document.createElement('span');
    pStatus.appendChild(spanStatusText);
    const textStatus = document.createTextNode((myLibrary[i].status) ? 'Done' : 'In progress');
    spanStatusText.classList.add((myLibrary[i].status) ? 'done' : 'in-progress');
    spanStatusText.appendChild(textStatus);
    const iChangeStatus = document.createElement('i');
    iChangeStatus.classList.add('fas', 'fa-sync-alt', 'change-status');
    pStatus.appendChild(iChangeStatus);
  }
  // Create add new book card
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'add-new');
  booksContainer.appendChild(divCard);
  // Create add new book button
  const iAddBook = document.createElement('i');
  iAddBook.classList.add('fas', 'fa-plus', 'add-book-modal');
  divCard.appendChild(iAddBook);
  localStorage.setItem('books', JSON.stringify(myLibrary));
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

function removeBookFromLibrary(event) {
  if (event.target.className === 'delete fas fa-trash-alt') {
    const index = event.target.parentElement.getAttribute('data-index');
    myLibrary.splice(index, 1);
    showBooks();
  }
}

function changeBookStatus(event) {
  if (event.target.className === 'fas fa-sync-alt change-status') {
    const index = event.target.parentElement.parentElement.getAttribute('data-index');
    if (myLibrary[index].status === true) {
      myLibrary[index].status = false;
    } else {
      myLibrary[index].status = true;
    }
    showBooks();
  }
}

function addDemoData() {
  addBookToLibrary('The Last Wish', 'Andrzej Sapkowski', '288', true);
  addBookToLibrary('Sword of Destiny', 'Andrzej Sapkowski', '384', true);
  addBookToLibrary('Blood of Elves', 'Andrzej Sapkowski', '320', false);
}

function clearData() {
  const confirmAnswer = confirm('Do you realy want to clear all books?');
  if (confirmAnswer) {
    myLibrary = [];
    showBooks();
  }
}

function formValidation() {
  const form = document.querySelector('#add-book-form');
  const titleError = document.querySelector('.title-error');
  const authorError = document.querySelector('.author-error');
  const pagesError = document.querySelector('.pages-error');
  const bookTitle = document.forms['add-book-form']['book-title'].value;
  const bookAuthor = document.forms['add-book-form']['book-author'].value;
  const bookPages = document.forms['add-book-form']['book-pages'].value;
  const bookStatus = document.forms['add-book-form']['book-status'].checked;
  if (bookTitle !== '' && bookAuthor !== '' && +bookPages > 0 && +bookPages < 10000) {
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus);
    modal.style.display = 'none';
    form.reset();
  }
  if (bookTitle === '') {
    titleError.style.display = 'block';
  } else {
    titleError.style.display = 'none';
  }
  if (bookAuthor === '') {
    authorError.style.display = 'block';
  } else {
    authorError.style.display = 'none';
  }
  if (bookPages === '' || +bookPages < 0 || +bookPages > 10000) {
    pagesError.style.display = 'block';
  } else {
    pagesError.style.display = 'none';
  }
}

function buttonsListeners() {
  const addBook = document.querySelector('#form-add-book');
  const closeButtons = document.querySelectorAll('.close');
  const demoButton = document.querySelector('.demo-button');
  const clearButton = document.querySelector('.clear-button');

  // Open/close modal
  document.addEventListener('click', (event) => {
    if (event.target.className === 'card add-new' || event.target.className === 'fas fa-plus add-book-modal') {
      modal.style.display = 'block';
    } else if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  // Close modal with buttons
  Array.from(closeButtons).forEach((button) => {
    button.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });
  // Close/submit modal with escape/enter keys
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
    if (event.key === 'Enter' && modal.style.display === 'block') {
      formValidation(event);
    }
  });
  // Add book button
  addBook.addEventListener('click', (event) => {
    event.preventDefault();
    formValidation();
  });
  // Remove book button
  document.addEventListener('click', (event) => {
    removeBookFromLibrary(event);
  });
  // Change book status
  document.addEventListener('click', (event) => {
    changeBookStatus(event);
  });
  // Add demo data
  demoButton.addEventListener('click', () => {
    addDemoData();
  });
  // Clear data button
  clearButton.addEventListener('click', () => {
    clearData();
  });
}

showBooks();
buttonsListeners();
