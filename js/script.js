document.addEventListener("DOMContentLoaded", () => {
    const submitForm = document.getElementById("form")
    
    if(window.location.pathname === "/addBook.html"){
        submitForm.addEventListener("submit", function(event){
            event.preventDefault()
            addBook()
        })

    }else if(window.location.pathname === "/main.html"){
        if(isStorageExist()){
            loadDataFromStorage()
        }
    }

})

document.addEventListener("ondataloaded", () => {
    showBook();
})