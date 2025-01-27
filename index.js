const library = [];

// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Function to add a book to the library
function addBookToLibrary(book) {
    library.push(book);
    displayLibrary(); // Update the displayed library
}

// Function to display the library
function displayLibrary() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear the display

    library.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        bookDiv.innerHTML = `
            <h4>${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <button class= "toggleBtn" onclick="toggleReadStatus(${index})">Toggle Read Status</button>
            <button class= "removeBtn" onclick="removeBook(${index})">Remove</button>
        `;

        libraryDiv.appendChild(bookDiv);
    });
}

function toggleReadStatus(index) {
    library[index].read = !library[index].read;
    displayLibrary(); // Update the displayed library
}


function removeBook(index) {
    library.splice(index, 1); // Remove the book at the specified index
    displayLibrary(); // Update the displayed library
}

function toggleLibraryDisplay() {
    const libraryDiv = document.getElementById('library');
    const button = document.getElementById('viewLibraryBtn');

    if (libraryDiv.style.display === 'none' || libraryDiv.style.display === '') {
        // displayLibrary();
        libraryDiv.style.display = 'flex';
        button.textContent = 'Hide Library';
    } else {
        libraryDiv.style.display = 'none'; // Hide the library
        button.textContent = 'View Library';
    }
}

// Add event listener for the "View Library" button
document.getElementById('viewLibraryBtn').addEventListener('click', toggleLibraryDisplay);

// Add event listener for the "New Book" button to toggle the form
const newBookButton = document.getElementById('newBookButton');
const bookFormContainer = document.getElementById('bookFormContainer');
newBookButton.addEventListener('click', () => {
    bookFormContainer.style.display =
        bookFormContainer.style.display === 'none' ? 'block' : 'none';
});

// Add event listener for the book form submission
const bookForm = document.getElementById('bookForm');

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    bookForm.reset(); // Clear the form
    bookFormContainer.style.display = 'none'; // Hide the form

    let isValid = true;

    if (!title.value.trim()) {
        document.getElementById('titleError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('titleError').style.display = 'none';
    }

    if (!author.value.trim()) {
        document.getElementById('authorError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('authorError').style.display = 'none';
    }

    if (!pages.value.trim()) {
        document.getElementById('pagesError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('pagesError').style.display = 'none';
    }

    if (isValid) {
        console.log("Form submitted!")
        bookForm.reset();
    }
});

// Add some default books for testing
// library.push(new Book('The Hobbit', 'J.R.R. Tolkien', 310, true));
// library.push(new Book('1984', 'George Orwell', 328, false));
// library.push(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true));

document.getElementById('pages').addEventListener('input', (e) => {
    if (e.target.value < 0) {
        e.target.value = 0;
    }
});