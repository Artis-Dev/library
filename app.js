const booksContainer = document.querySelector('#books-container');
const modal = document.querySelector('#new-book-modal');
const confirmModal = document.querySelector('#confirm-modal');
const form = document.querySelector('#add-book-form');
const bookTitle = document.forms['add-book-form']['book-title'];
const bookAuthor = document.forms['add-book-form']['book-author'];
const bookPages = document.forms['add-book-form']['book-pages'];
const bookStatus = document.forms['add-book-form']['book-status'];
const inputsArray = [bookTitle, bookAuthor, bookPages];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

let myLibrary = [];

// Local storage
if (localStorage.getItem('books') === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('books'));
  myLibrary = booksFromStorage;
}

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
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  showBooks();
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
  addBookToLibrary('Blood of Elves', 'Andrzej Sapkowski', '320', true);
  addBookToLibrary('Time of Contempt', 'Andrzej Sapkowski', '331', true);
  addBookToLibrary('Baptism of Fire', 'Andrzej Sapkowski', '343', true);
  addBookToLibrary('The Tower of the Swallow', 'Andrzej Sapkowski', '436', false);
  addBookToLibrary('The Lady of the Lake', 'Andrzej Sapkowski', '531', false);
  addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '366', true);
  addBookToLibrary('The Alchemist', 'Paulo Coelho', '182', false);
  addBookToLibrary('On the Road', 'Jack Kerouac', '307', false);
  addBookToLibrary('1984', 'George Orwell', '328', true);
}

function clearData() {
  myLibrary = [];
  showBooks();
}

function showError(input) {
  const errorP = input.nextElementSibling;
  if (input.validity.valueMissing) {
    errorP.textContent = 'This field can\'t be empty.';
  } else if (input.validity.tooShort) {
    errorP.textContent = `Title should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
  } else if (input === bookPages && /\D/.test(input.value)) {
    errorP.textContent = 'Value must be a number.';
  }

  errorP.classList.add('active');
  input.classList.add('submitted');
  console.log('show error', input, parseInt(input.value, 10));
}

function resetForm() {
  form.reset();
  inputsArray.forEach((input) => {
    const errorP = input.nextElementSibling;
    errorP.textContent = '';
    errorP.classList.remove('active');
    input.classList.remove('submitted');
  });
}

function listeners() {
  const closeButtons = document.querySelectorAll('.close');
  const demoButton = document.querySelector('.demo-button');
  const clearButton = document.querySelector('.clear-button');
  const clearBooks = document.querySelector('#clear-books');

  // Open/close modal with mouse click outside modal
  document.addEventListener('click', (event) => {
    if (event.target.className === 'card add-new' || event.target.className === 'fas fa-plus add-book-modal') {
      modal.classList.add('active');
    } else if (event.target.className === 'modal active') {
      confirmModal.classList.remove('active');
      modal.classList.remove('active');
      resetForm();
    }
  });

  // Close modal with 'X' buttons
  Array.from(closeButtons).forEach((button) => {
    button.addEventListener('click', () => {
      modal.classList.remove('active');
      confirmModal.classList.remove('active');
      resetForm();
    });
  });

  // Close/submit modal with escape/enter keys
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      modal.classList.remove('active');
      confirmModal.classList.remove('active');
      resetForm();
    }
    if (event.key === 'Enter' && confirmModal.classList.contains('active')) {
      clearData();
      confirmModal.classList.remove('active');
    }
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

  // Open confirm dialog
  clearButton.addEventListener('click', () => {
    confirmModal.classList.add('active');
  });

  // Clear data button
  clearBooks.addEventListener('click', () => {
    clearData();
    confirmModal.classList.remove('active');
  });

  // Check inputs for validity
  inputsArray.forEach((input) => {
    const errorP = input.nextElementSibling;
    input.addEventListener('input', () => {
      if (input.validity.valid || input.value === '') {
        errorP.textContent = '';
        errorP.classList.remove('active');
      } else {
        showError(input);
      }
    });
  });

  // Submit form with checks for errors
  form.addEventListener('submit', (event) => {
    if (!bookTitle.validity.valid) {
      showError(bookTitle);

      event.preventDefault();
    } if (!bookAuthor.validity.valid) {
      showError(bookAuthor);
      event.preventDefault();
    } if (!bookPages.validity.valid) {
      showError(bookPages);
      event.preventDefault();
    } if (bookTitle.validity.valid && bookTitle.validity.valid && bookPages.validity.valid) {
      addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.checked);
      resetForm();
      event.preventDefault();
      modal.classList.remove('active');
    }
  });
}

showBooks();
listeners();
