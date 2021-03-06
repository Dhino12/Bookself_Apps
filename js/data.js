const STORAGE_KEY = "BOOKSELF_APPS";

let books = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data !== null){
        books = data;
    }
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage(){
    if(isStorageExist()){
        saveData();
    }
}

function composeBookObject(title, desc, author, year, isCompleted, isFavorite){
    return {
        id: new Date(),
        title,
        desc,
        author, 
        year,
        isCompleted,
        isFavorite
    };
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId) return book;
    }
    return null;
}

function findBookIndex(bookId){
    let index = 0;
    for (let book of books) {
        if(book.id === bookId) 
            return index;

        index++;
    }
    return -1;
}

function removeData(bookPosition, limitRemove){
    console.log("Book Position: " + bookPosition);
    console.log("limit Remove: " + limitRemove);
    books.splice(bookPosition, limitRemove);
    updateDataToStorage();

    location.reload();
    document.dispatchEvent(new Event("ondataremove"));
}

function searchData(title){
    const bookSearch = [];
    for (const book of books) {
        if(
            book.title.toLowerCase().trim().indexOf(title) !== undefined && 
            book.title.toLowerCase().trim().indexOf(title) !== -1){
            bookSearch.push(book);
        }
    }
    
    return bookSearch;
}

function addToFavorite(bookElement){
    const book = findBook(bookElement[BOOK_ID]);

    if(book.isFavorite === true){
        book.isFavorite = false;
    }else{
        book.isFavorite = true;
    }

    document.dispatchEvent(new Event("ondatafavorited"));

    updateDataToStorage();


}

// function refreshFromBook(){
//     const listUncompleted = document.getElementById(LIST_UNCOMPLETE_READ_BOOK_ID);
//     let listCompleted = document.getElementById(LIST_COMPLETE_READ_BOOK_ID);

//     for (const book of books) {
//         const newBook = make
//     }
// }