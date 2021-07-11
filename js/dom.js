const LIST_UNCOMPLETE_READ_BOOK_ID = "uncomplete-read"
const LIST_COMPLETE_READ_BOOK_ID = "complete-read";
const LIST_FAVORITED_BOOK_ID = "book-favorited"
const BOOK_ID = "book_id";
const headPage = document.getElementsByTagName("title")[0].innerText

// ======== sidebar =============
const itemSideBar = document.querySelectorAll(".item");

for (const i in itemSideBar) {
    if (window.location.pathname === "/addBook.html" || headPage === "Tambah Buku") {
        itemSideBar[1].classList.add('active');

    } else if (window.location.pathname === "/main.html" || headPage === "Book") {
        itemSideBar[0].classList.add('active');

    }
}
// ==========================

function addBook() {
    if(books.length === 0){
        loadDataFromStorage();
    }
    
    const textTitle = document.getElementById("title").value
    const textAuthor = document.getElementById("author").value
    const textDescription = document.getElementById("description").value
    const textDate = document.getElementById("date").value.slice(0, 4);

    const bookObject = composeBookObject(textTitle, textDescription, textAuthor, textDate, false, false)
    
    books.push(bookObject);

    updateDataToStorage();
}

function showBook() {
    const completeBookList = document.getElementById(LIST_COMPLETE_READ_BOOK_ID);
    const uncompleteBookList = document.getElementById(LIST_UNCOMPLETE_READ_BOOK_ID);

    for (const book of books) {

        const newBook = makeBook(book.title, book.author, book.desc, book.year, book.isCompleted, false, book.isFavorite);

        newBook[BOOK_ID] = book.id

        if (book.isCompleted) { 
            completeBookList.append(newBook);

        } else { 
            uncompleteBookList.append(newBook)

        }

    }


    document.getElementById('search-book').addEventListener("input", () => {
        const titleBook = document.getElementById('search-book').value.toLowerCase().trim()
        const content_book = document.querySelectorAll(".content-book"); 
        const content_book_search = document.querySelectorAll(".content-book-search"); 

        if(content_book.length !== 0){  
            for(let i = 0; i < content_book.length; i++){
                content_book[i].remove();
            } 
        }
        
        for(let i = 0; i < content_book_search.length; i++){
            content_book_search[i].remove();
        } 

        if(titleBook.length !== 0){
            const bookSearch = searchData(titleBook);

            if(bookSearch === undefined){
                completeBookList.removeAttribute("style");
            }else{
                for (const book of bookSearch) {
                    const newBook = makeBook(book.title, book.author, book.desc, book.year, book.isCompleted, true)
                    newBook[BOOK_ID] = book.id
                    uncompleteBookList.append(newBook);
                }
            }
            
        }else{
            showBook()
        }
        
    })
}

function showFavoriteBook(){

    const favoritedBookList = document.getElementById(LIST_FAVORITED_BOOK_ID);
    for (const book of books) {

        const newBook = makeBook(book.title, book.author, book.desc, book.year, book.isCompleted, false, book.isFavorite);

        newBook[BOOK_ID] = book.id

        if (book.isFavorite) { 
            favoritedBookList.append(newBook);

        }

    }
}

function makeBook(title, author, description, date, isCompleted, isSearch, isFavorite) {

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("author");
    textAuthor.style.textTransform = "capitalize";
    textAuthor.innerText = "Author : " + author;

    const textTitle = document.createElement("h2");
    textTitle.innerText = title;
    textTitle.style.textTransform = "capitalize";

    const textDesc = document.createElement("span");
    textDesc.classList.add("year");
    textDesc.innerText = "dibaca tahun : " + date;

    const textYear = document.createElement("p");
    textYear.classList.add("description");
    textYear.innerText = description;

    const container = document.createElement("div")
    if(isSearch){
        container.classList.add("content-book-search");
    }else{
        container.classList.add("content-book");
    }
    
    container.append(textTitle, textAuthor, textYear, textDesc);

    if(headPage === "Book"){
        if (isCompleted) {
            container.append(createUndoButton(), createRemoveButton());
    
        } else {
            container.append(createFinishReadButton(), createFavoriteButton(isFavorite));
    
        }
    }else{
        container.append(createFavoriteButton(isFavorite));
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
            eventListener(e.target.parentElement.parentElement);

        } else {
            // if button is clicked
            eventListener(e.target.parentElement);

        }
    })
    return button
}

function createFinishReadButton() {
    return createButton('icon-finish-read', function (e) {
        addBookToFinishRead(e);

    });
}

function createFavoriteButton(isFavorite) {
    if(isFavorite){
        return createButton('icon-favorited', function (e) {
            addToFavorite(e);
            location.reload();
        });
    }else{
        return createButton('icon-favorite', function (e) {
            addToFavorite(e);
            location.reload()
        });
    }
    
}

function createRemoveButton() {
    return createButton('icon-remove', function (e) {
        removeBookFromComplete(e);
    });
}

function createUndoButton() {
    return createButton('icon-back-read', function (e) {
        undoBookFromComplete(e);

    });
}

function addBookToFinishRead(bookElement) {

    const bookTitle = bookElement.querySelector("h2").innerText;
    const bookAuthor = bookElement.querySelector(".author").innerText.split(' ')[2];
    const bookDesc = bookElement.querySelector(".description").innerText;
    const bookYear = bookElement.querySelector(".year").innerText.split(' ')[3];

    const newBook = makeBook(bookTitle, bookAuthor, bookDesc, bookYear, true);
    const listCompletedBook = document.getElementById(LIST_COMPLETE_READ_BOOK_ID);

    const book = findBook(bookElement[BOOK_ID]);

    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;

    listCompletedBook.append(newBook);

    bookElement.remove();

    updateDataToStorage();
}

function addToFavorite(bookElement){
    const book = findBook(bookElement[BOOK_ID]);

    if(book.isFavorite === true){
        book.isFavorite = false;
    }else{
        book.isFavorite = true;
    }

    updateDataToStorage();

}

function undoBookFromComplete(bookElement) {
    const listUncomplete = document.getElementById(LIST_UNCOMPLETE_READ_BOOK_ID);

    const bookTitle = bookElement.querySelector("h2").innerText;
    const bookAuthor = bookElement.querySelector(".author").innerText.split(' ')[2];
    const bookDesc = bookElement.querySelector(".description").innerText;
    const bookYear = bookElement.querySelector(".year").innerText.split(' ')[3];

    const newBook = makeBook(bookTitle, bookAuthor, bookDesc, bookYear, false);

    const book = findBook(bookElement[BOOK_ID]);

    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    listUncomplete.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromComplete(bookElement){
    const bookPosition = findBookIndex(bookElement[BOOK_ID])
    const message = document.getElementById("confirm");
    const bgMessage = document.getElementsByClassName("background-message")[0];

    const chooseYes = document.getElementById("yes");
    const chooseNo = document.getElementById("no");
    
    bgMessage.classList.add("fade");
    message.classList.add("fade");

    chooseYes.addEventListener('click', () => {
        removeData(bookPosition, 1);
        bookElement.remove();
        messageRemove(bgMessage, message)
    })

    chooseNo.addEventListener('click', () => {
        messageRemove(bgMessage, message)
    })
}

function messageRemove(bgMessage, message){
    bgMessage.style.animation = "fadeOut 0.5s ease"
    message.style.animation = "fadeOut 0.5s ease"
    setTimeout(() => {
        bgMessage.removeAttribute("style")
        message.removeAttribute("style")
        bgMessage.classList.remove("fade");
        message.classList.remove("fade");
    }, 500);
}