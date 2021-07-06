const locationHere = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
    const submitForm = document.getElementById("form")
    
    if(locationHere === "/addBook.html"){
        submitForm.addEventListener("submit", function(event){
            event.preventDefault();
            addBook();   
        })

    }else if(locationHere === "/main.html"){
        if(isStorageExist()){
            loadDataFromStorage();
        }
    }

})

document.addEventListener("ondataloaded", () => {
    if(window.location.pathname === "/main.html") {
        showBook();
    }
})

document.addEventListener('ondatasaved', () => {
    if(locationHere === "/addBook.html"){

        const submitForm = document.getElementById("form")
        submitForm.reset();
        
        const bgMessage = document.getElementsByClassName("background-message")[0];
        const message = document.getElementsByClassName("message")[0];
        
        bgMessage.classList.add("fade");
        message.classList.add("fade");

        // bgMessage.style.display = "block";
        // message.style.display = "block";
        
        setTimeout(() => {
            bgMessage.classList.remove("fade");
            message.classList.remove("fade");
            // bgMessage.style.display = "none"
            // message.style.display = "none"
        }, 4000);
    
    }
})
