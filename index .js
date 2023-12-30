
let input = document.querySelector("#input")
let btnAdd = document.querySelector("#btnAdd")
let todosBox = document.querySelector("#todosBox")
let noElements = document.getElementById("noElements")


let rowsCount = 0  



// let pageBtn = document.querySelector("#Pagebtn")
// pageBtn.addEventListener("click", nvm)

// function nvm () {
//     document.location.assign('page.html');
// }


// [{ text: 'icons', isComplete: 'yes' }, { text: 'read', isComplete: 'no' }]

btnAdd.addEventListener("click", addTodo)

document.addEventListener('keypress', addTodoWhenKeyPressed)

document.addEventListener("DOMContentLoaded", onPageRefresh)


function onPageRefresh () {
    let todosList = readFromLocalStorge()

    if(todosList.length > 0) {
        noElements.remove()

        for(let i = 0; i < todosList.length; i++) {
            let currentTodo = todosList[i]
    
            addRefreshTodo(currentTodo)
    
        }
    } 


}


function addTodoWhenKeyPressed(event) {
    if(event.key == "Enter") {
        addTodo()
    }


}

function readFromLocalStorge () {

    let todos = localStorage.getItem("todos") // bhbhbh,jhjhj -> ['bhbhbh', 'jhjhj']  [{ text: 'icons', isComplete: 'no' }]

    let todosList;

    if(!todos) {
        todosList = [];
    } else {
        todosList = JSON.parse(todos)
    }

    return todosList;


}

function deleteLocalStorage(row) {
    // TODO: remove the element from localStorage

    let todos = readFromLocalStorge()

    todos.splice(row, 1)

    console.log(todos)
    
    localStorage.setItem("todos", JSON.stringify(todos))

}

function completeTodoLocalStorge(row) {
    let todos = readFromLocalStorge()

    todos[row].isComplete = 'yes'

    localStorage.setItem("todos", JSON.stringify(todos))



}

function addToLocalStorge (inputValue) {

   let todos = readFromLocalStorge()

    todos.push({ text: inputValue, isComplete: 'no' })

    localStorage.setItem("todos", JSON.stringify(todos))
}

function addRefreshTodo (todo) {
    

    let rowBox = document.createElement("div")
    let btnsRowBox = document.createElement("div")

    rowsCount = rowsCount + 1

    rowBox.id = `row${rowsCount}`
    rowBox.className = "row"

    btnsRowBox.id = "btnsRowBox"

    
    if(todo.isComplete == "yes") {
        rowBox.style.backgroundColor = "limegreen"
    }
    
    let h3 = document.createElement("h3")
    let btnV = document.createElement("button")
    let btnX = document.createElement("button")
    
    rowBox.append(h3)
    rowBox.append(btnsRowBox)
    

    h3.textContent = todo.text
    btnV.textContent = "V"
    btnX.textContent = "X"


    btnsRowBox.append(btnV)
    btnsRowBox.append(btnX)
    

    


    todosBox.append(rowBox)

    input.value = ""


    h3.setAttribute("class", "h3");
    btnV.setAttribute("class", "btnV");
    btnX.setAttribute("class", "btnX");

    

    btnX.id = rowsCount;
    btnV.id = rowsCount;


    btnX.addEventListener("click", onClickBtnX)
    btnV.addEventListener("click", onClickBtnV)


}


function addTodo () {
    
    let inputValue = input.value
    
    if(inputValue.length > 20) {
        input.value = ""
        return
    }

    noElements.remove()

    
        // if(row.textContent != input.value) {
            // YouGot.textContent = ""
        // }
   
    addToLocalStorge(inputValue)
        
    
    


    if(inputValue != "") {

        let rowBox = document.createElement("div")
        let btnsRowBox = document.createElement("div")

        rowsCount = rowsCount + 1

        rowBox.id = `row${rowsCount}`
        rowBox.className = "row"


        btnsRowBox.id = "btnsRowBox"

        
        
        
        let h3 = document.createElement("h3")
        let btnV = document.createElement("button")
        let btnX = document.createElement("button")
        
        rowBox.append(h3)
        rowBox.append(btnsRowBox)
        
    
        h3.textContent = inputValue
        btnV.textContent = "V"
        btnX.textContent = "X"
    

        btnsRowBox.append(btnV)
        btnsRowBox.append(btnX)
        

        


        todosBox.append(rowBox)
    
        input.value = ""


        h3.setAttribute("class", "h3");
        btnV.setAttribute("class", "btnV");
        btnX.setAttribute("class", "btnX");

        console.log(btnV);

        btnX.id = rowsCount;
        btnV.id = rowsCount;


        btnX.addEventListener("click", onClickBtnX)
        btnV.addEventListener("click", onClickBtnV)



        

    }


}

function onClickBtnX(event) {
    let buttonClicked = event.target;
    
     let row =  buttonClicked.getAttribute('id');

     let rowBoxID = `row${row}`

    let rowElement = document.getElementById(rowBoxID)

    deleteLocalStorage(row - 1)
       
    rowElement.remove()

    let todosList = readFromLocalStorge()

    if(todosList.length == 0) {
        todosBox.append(noElements)
    }


}

function onClickBtnV(event) {

    
    let buttonClicked = event.target;
    
    let row = buttonClicked.getAttribute('id')
    
    let rowBoxID = `row${row}`
    
    let rowElement = document.getElementById(rowBoxID)

    completeTodoLocalStorge(row - 1)
    
   
    
    rowElement.style.backgroundColor = "limegreen"
    
    
    
    
}



// ["icons", "mmmmmmm"]

// [{ text: 'icons', isCompleted: 'yes' }]
