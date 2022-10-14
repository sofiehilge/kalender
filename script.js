//DOM ELEMENTER

const addNewBtn = document.querySelector("#add-new-btn")
const addNewForm = document.querySelector("#add-new-form")
const ul = document.querySelector("#tasks")
const title = document.querySelector("#new-title")
const text = document.querySelector("#new-text")

window.addEventListener("load", loadStorage)//callback funktion skal ikke have paranteser

function loadStorage(){
    if(localStorage.getItem("theWholeShit")){
      let savedHTML = localStorage.getItem("theWholeShit")
      ul.innerHTML = savedHTML  
    }
   
}

addNewBtn.addEventListener("click", function(){
    title.value = "" //så er teksten slettet når man opretter en ny opgave
    text.value = "" //så er teksten slettet når man opretter en ny opgave. 
    if(addNewForm.classList.contains("editing-active")){
        //luk formen
        addNewForm.classList.remove("editing-active")
        this.innerHTML = "Opret event" //ændre teksten på knappen
    }
    else{
        //åbner formen
        addNewForm.classList.add("editing-active")
        this.innerHTML = "Annuller"
    }
})

//man kan bruge et toogle værktøj hvis man vil have en knap til at tænde og slukke, men i og med vi ville ændre teksten blev vi nødt til at gøre det på denne måde

// add entry
addNewForm.addEventListener("submit", function(event){
    event.preventDefault()//preventer at formen sendes afsted, for så refrehes siden, og alt vil gå i nul.
    let entry = '<li>'
        entry += '<h2>' + title.value + '</h2>'
        entry += '<p>' + text.value +'</p>'
        entry += '<button id="delete-btn" onclick="deleteEntry(this.parentNode)">Slet</button>' //vi bliver nødt til at parse this til parent elementet da vi ikke ved hvor mange entrys folk vil lave
        entry += '<input type="checkbox" id="komNU" name="" onchange="markTask(this.parentNode, this)">' //this referere til parent elementet. kan bruges på variabler som har en addEventListner.
    entry += '</li>' //en variablen med en lang string

    ul.innerHTML += entry
    saveToStorage()

    addNewForm.classList.remove("editing-active") //gør at formen fjernes når man opretter en ny opgave
    addNewBtn.innerHTML = "Opret event"
})


//delete entry
function deleteEntry(entry){ //også event listener funktioner, men bliver ikke trigget fra onclick og onchange
    entry.remove()
    saveToStorage()
}

//mark entry
function markTask(entry, checkbox){
    /* entry.classList.toggle("done") */
    if(checkbox.checked){
        checkbox.setAttribute("checked", "true")
        entry.classList.add("done")
    }
    else{
        checkbox.removeAttribute("checked")
        entry.classList.remove("done")
    }
    saveToStorage()
}

//ekstern funktion save, fordi den skal virke på flere elementer

function saveToStorage(){
    localStorage.setItem("theWholeShit", ul.innerHTML)
}