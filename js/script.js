document.addEventListener("DOMContentLoaded", () => {
    const submitForm = document.getElementById("form")
    
    submitForm.addEventListener("submit", function(event){
        event.preventDefault()
        addBook()
    })

    if(isStorageExist()){
        loadDataFromStorage()
    }
})