document.addEventListener('DOMContentLoaded', function () {
    const addBookForm = document.getElementById('addBookForm');
    const uncompletedBookshelfList = document.getElementById('uncompletedBookshelfList');
    const completedBookshelfList = document.getElementById('completedBookshelfList');
    const searchInput = document.getElementById('searchInput');
  
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    function renderBooks() {
      uncompletedBookshelfList.innerHTML = '<h2>Belum Selesai Dibaca</h2>';
      completedBookshelfList.innerHTML = '<h2>Selesai Dibaca</h2>';
  
      const searchTerm = searchInput.value.toLowerCase();
  
      books.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
  
        const title = document.createElement('h3');
        title.textContent = book.title;
  
        const author = document.createElement('p');
        author.textContent = `Penulis: ${book.author}`;
  
        const year = document.createElement('p');
        year.textContent = `Tahun: ${book.year}`;
  
        const actions = document.createElement('div');
        actions.classList.add('actions');
  
        const moveButton = document.createElement('button');
        moveButton.textContent = book.isComplete ? 'Belum Selesai' : 'Selesai';
        moveButton.addEventListener('click', () => {
          moveBook(book.id);
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', () => {
          deleteBook(book.id);
        });
  
        actions.appendChild(moveButton);
        actions.appendChild(deleteButton);
  
        bookItem.appendChild(title);
        bookItem.appendChild(author);
        bookItem.appendChild(year);
        bookItem.appendChild(actions);
  
        if (book.title.toLowerCase().includes(searchTerm)) {
          if (book.isComplete) {
            completedBookshelfList.appendChild(bookItem);
          } else {
            uncompletedBookshelfList.appendChild(bookItem);
          }
        }
      });
    }
  
    function addBook(event) {
      event.preventDefault();
  
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const year = Number(document.getElementById('year').value);
      const isComplete = document.getElementById('isComplete').checked;
  
      const id = +new Date();
  
      const newBook = {
        id,
        title,
        author,
        year,
        isComplete,
      };
  
      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books));
  
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('year').value = '';
      document.getElementById('isComplete').checked = false;
  
      renderBooks();
    }
  
    function moveBook(id) {
      const bookIndex = books.findIndex((book) => book.id === id);
  
      if (bookIndex !== -1) {
        books[bookIndex].isComplete = !books[bookIndex].isComplete;
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
      }
    }
  
    function deleteBook(id) {
      const confirmed = confirm('Apakah Anda yakin ingin menghapus buku ini?');
  
      if (confirmed) {
        const updatedBooks = books.filter((book) => book.id !== id);
        books = updatedBooks;
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
      }
    }
  
    addBookForm.addEventListener('submit', addBook);
    searchInput.addEventListener('input', renderBooks);
  
    renderBooks();
  });