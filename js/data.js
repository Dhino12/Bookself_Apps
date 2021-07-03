const STORAGE_KEY = "BOOKSELF_APPS";

let books = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage")
        return false
    }
    return true
}

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data != null){
        books = data;
        console.log(books);
    }
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage(){
    if(isStorageExist()){
        saveData();
    }
}

function composeBookObject(title, desc, author, year, isCompleted){
    return {
        id: new Date(),
        title,
        desc,
        author, 
        year,
        isCompleted
    }
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId) return book
    }
    return null;
}

function findBookIndex(bookId){
    let index = 0;
    for (const book of books) {
        if(book.id === bookId) return index;

        index++;
    }
    return -1;
}

// function refreshFromBook(){
//     const listUncompleted = document.getElementById(LIST_UNCOMPLETE_READ_BOOK_ID);
//     let listCompleted = document.getElementById(LIST_COMPLETE_READ_BOOK_ID);

//     for (const book of books) {
//         const newBook = make
//     }
// }