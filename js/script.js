const locationHere = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
    
    
    const submitForm = document.getElementById("form")
    
    if(locationHere === "/addBook.html" || headPage === "Tambah Buku"){
        submitForm.addEventListener("submit", function(event){
            event.preventDefault();
            addBook();   
        })
        
    }else if(locationHere === "/main.html" || headPage === "Book"){
        if(isStorageExist()){
            validateData();
            loadDataFromStorage();
        }

        // date ==============
        const date = new Date().toString().split(' ').splice(1,3).join(' - ');
        document.querySelector('.search p').innerText = date
        // =============
        
    }else if(locationHere === "/favorite.html" || headPage === "Favorite"){
        if(isStorageExist()){
            validateData();
            loadDataFromStorage();
        }
    }

    if(books.length === 0 && headPage === "Book"){
        validateData();
    }
    
    if(headPage === "Favorite"){
        validationFavorite();
    }
})

document.addEventListener("ondataloaded", () => {
    if(locationHere === "/main.html" || headPage === "Book") {
        showBook();

    }else if(locationHere === "/favorite.html" || headPage === "Favorite"){
        showFavoriteBook();
    }
})

document.addEventListener('ondatasaved', () => {
    if(locationHere === "/addBook.html" || headPage === "Tambah Buku"){

        const submitForm = document.getElementById("form");
        submitForm.reset();
        
        const bgMessage = document.getElementsByClassName("background-message")[0];
        const message = document.getElementsByClassName("message")[0];
        
        bgMessage.classList.add("fade");
        message.classList.add("fade");

        setTimeout(() => {
            bgMessage.classList.remove("fade");
            message.classList.remove("fade");
        }, 4000);
    
    }
})

document.addEventListener('ondataremove', () => {
    if(locationHere === "/main.html" || headPage === "Book"){
        validateData();

    }
})

document.addEventListener('ondatafavorited', () => {
    if(locationHere === "/favorite.html" || headPage === "Favorite"){
        validationFavorite();
        console.log("Favorite");

    }
})

function validateData(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    const notFound = document.getElementsByClassName("not-found")[0];
    const getAllArticle = document.getElementsByTagName("article");
    notFound.hidden = true;

    if(serializedData === "[]" || serializedData === null){
        notFound.removeAttribute("hidden");

        for (const article of getAllArticle) {
            article.style.display = "none";
        }

    }
}

function validationFavorite(){
    const notFound = document.getElementsByClassName("not-found")[0];
    const getAllArticle = document.getElementsByTagName("article")[0];
    
    for (const book of books) {
        if(book.isFavorite === false){
            notFound.removeAttribute("hidden");
            getAllArticle.style.display = "none";
        }else{
            getAllArticle.removeAttribute('style');
            notFound.hidden = true;
        }
    }
}