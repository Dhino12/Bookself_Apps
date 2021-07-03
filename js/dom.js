const LIST_UNCOMPLETE_READ_BOOK_ID = "uncomplete-read"
const LIST_COMPLETE_READ_BOOK_ID = "complete-read";

// ======== sidebar =============
const itemSideBar = document.querySelectorAll(".item");

for (const i in itemSideBar) {
    if(window.location.pathname === "/addBook.html"){
        itemSideBar[1].classList.add('active');

    }else if(window.location.pathname === "/main.html"){
        itemSideBar[0].classList.add('active');
        
    }
}
// ==========================


function addBook(){
    const uncompleteBookList = document.getElementById(LIST_UNCOMPLETE_READ_BOOK_ID);

    const textTitle = document.getElementById("title").value
    const textAuthor = document.getElementById("author").value
    const textDescription = document.getElementById("description").value
    const textDate = document.getElementById("date").value.slice(0,4);

    console.log(textTitle + " " + textAuthor + " " + textDescription + " " + textDate)

    const book = makeBook(textTitle, textAuthor, textDescription, textDate, false);
    const bookObject = composeBookObject(textTitle, textDescription, textAuthor, textDate, false)
    books.push(bookObject);

    uncompleteBookList.append(book)
    
    updateDataToStorage()
}

function makeBook(title, author, description, date, isCompleted){
    const textTitle = document.createElement("h2");
    textTitle.innerText = title;

    const textDesc = document.createElement("p").classList.add("description");
    textDesc.innerText = description;

    const container = document.createElement("div").classList.add("content-book");
    container.append(textTitle, textDesc);


    if(isCompleted){
        container.append(createRemoveButton(), createUndoButton());

    }else{
        container.append(createFinishReadButton(), createFavoriteButton());

    }
    return container;
}

function createButton(classIcon, text, eventListener){
    const spanIcon = document.createElement("span").classList.add(classIcon);
    const textButton = document.createElement("h3").innerText = text;
    const button = document.createElement("button");
    button.append(spanIcon, textButton);

    button.addEventListener("click", e => {
        eventListener(e)
    })
    return button
}

function createFinishReadButton(){
    return createButton('icon-read', "Selesai Baca", function(e){
        
    });
}

function createFavoriteButton(){
    return createButton('icon-favorite', "Favorite Book", function(e){

    });
}

function createRemoveButton(){
    return createButton('icon-trash', 'Remove Book', function(e){

    });
}

function createUndoButton(){
    return createButton('icon-back', 'Baca Kembali', function(e){

    });
}