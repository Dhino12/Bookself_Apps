const locationHere = window.location.pathname;
const headPage = document.getElementsByTagName("title")[0].innerText

document.addEventListener("DOMContentLoaded", () => {
    
    
    const submitForm = document.getElementById("form")
    
    if(locationHere === "/addBook.html" || headPage === "Tambah Buku"){
        submitForm.addEventListener("submit", function(event){
            event.preventDefault();
            addBook();   
        })
        
    }else if(locationHere === "/main.html" || headPage === "Book"){
        if(isStorageExist()){
            validateData()
            loadDataFromStorage();
        }
    }

})
console.log(window.location.pathname);
document.addEventListener("ondataloaded", () => {
    if(window.location.pathname === "/main.html" || headPage === "Book") {
        showBook();
    }
})

document.addEventListener('ondatasaved', () => {
    if(locationHere === "/addBook.html" || headPage === "Tambah Buku"){

        const submitForm = document.getElementById("form")
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

function validateData(){
    const serializedData = localStorage.getItem(STORAGE_KEY);

    const notFound = document.getElementsByClassName("not-found")[0]
    const getAllArticle = document.getElementsByTagName("article");
    notFound.hidden = true

    if(serializedData === "[]"){
        notFound.removeAttribute("hidden");

        for (const article of getAllArticle) {
            article.style.display = "none";
        }

    }
    
}