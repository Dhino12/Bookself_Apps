const LIST_UNCOMPLETE_READ_BOOK_ID = "uncomplete-read"
const LIST_COMPLETE_READ_BOOK_ID = "complete-read";
const BOOK_ID = "book_id";

// ======== sidebar =============
const itemSideBar = document.querySelectorAll(".item");

for (const i in itemSideBar) {
    if (window.location.pathname === "/addBook.html") {
        itemSideBar[1].classList.add('active');

    } else if (window.location.pathname === "/main.html") {
        itemSideBar[0].classList.add('active');

    }
}
// ==========================


function addBook() {

    const textTitle = document.getElementById("title").value
    const textAuthor = document.getElementById("author").value
    const textDescription = document.getElementById("description").value
    const textDate = document.getElementById("date").value.slice(0, 4);

    console.log(textTitle + " " + textAuthor + " " + textDescription + " " + textDate)

    const bookObject = composeBookObject(textTitle, textDescription, textAuthor, textDate, false)

    books.push(bookObject);

    updateDataToStorage();
}

function showBook() {
    const completeBookList = document.getElementById(LIST_COMPLETE_READ_BOOK_ID);
    const uncompleteBookList = document.getElementById(LIST_UNCOMPLETE_READ_BOOK_ID);

    for (const book of books) {

        console.log(book.desc);
        const newBook = makeBook(book.title, book.author, book.desc, book.year, book.isCompleted);

        newBook[BOOK_ID] = book.id

        if (book.isCompleted) {
            completeBookList.append(newBook);

        } else {
            console.log("tidak complete");
            uncompleteBookList.append(newBook)

        }
    }

}

function makeBook(title, author, description, date, isCompleted) {
    const image = document.createElement("img");
    image.setAttribute('src', '../asset/image/book.jpg');
    image.setAttribute('width', '95px');

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("author");
    textAuthor.innerText = author;

    const textTitle = document.createElement("h2");
    textTitle.innerText = title;
    textTitle.style.textTransform = "capitalize"

    const textDesc = document.createElement("span");
    textDesc.classList.add("year");
    textDesc.innerText = date;

    const textYear = document.createElement("p");
    textYear.classList.add("description");
    textYear.innerText = description;

    const container = document.createElement("div")
    container.classList.add("content-book");

    container.append(image, textTitle, textAuthor, textYear, textDesc);


    if (isCompleted) {
        container.append(createUndoButton(), createRemoveButton());

    } else {
        container.append(createFinishReadButton(), createFavoriteButton());

    }
    return container;
}

function createButton(classIcon, eventListener) {

    const spanIcon = document.createElement("span");
    spanIcon.classList.add(classIcon);

    const button = document.createElement("button");
    button.append(spanIcon);

    button.addEventListener("click", e => {
        if (e.target.className === classIcon) {
            // if span is clicked
            eventListener(e.target.parentElement.parentElement)

        } else {
            // if button is clicked
            eventListener(e.target.parentElement)
        }
    })
    return button
}

function createFinishReadButton() {
    return createButton('icon-finish-read', function (e) {
        addBookToFinishRead(e)

    });
}

function createFavoriteButton() {
    return createButton('icon-favorite', function (e) {

    });
}

function createRemoveButton() {
    return createButton('icon-remove', function (e) {

    });
}

function createUndoButton() {
    return createButton('icon-back-read', function (e) {
        undoBookFromComplete(e)

    });
}

function addBookToFinishRead(bookElement) {

    const bookTitle = bookElement.querySelector("h2").innerText;
    console.log(bookTitle);

    const bookAuthor = bookElement.querySelector(".author").innerText;
    const bookDesc = bookElement.querySelector(".description").innerText;
    const bookYear = bookElement.querySelector(".year").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookDesc, bookYear, true);
    const listCompletedBook = document.getElementById(LIST_COMPLETE_READ_BOOK_ID);

    const book = findBook(bookElement[BOOK_ID])

    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;

    listCompletedBook.append(newBook)

    bookElement.remove();

    updateDataToStorage();
}

function undoBookFromComplete(bookElement) {
    const listUncomplete = document.getElementById(LIST_UNCOMPLETE_READ_BOOK_ID);

    // console.log(bookElement.querySelector("h2"));
    const bookTitle = bookElement.querySelector("h2").innerText;

    const bookAuthor = bookElement.querySelector(".author").innerText;
    const bookDesc = bookElement.querySelector(".description").innerText;
    const bookYear = bookElement.querySelector(".year").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookDesc, bookYear, false);

    const book = findBook(bookElement[BOOK_ID]);

    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    listUncomplete.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}