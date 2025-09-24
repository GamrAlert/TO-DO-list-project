/* we want to create new objects and put them into 'child-contents' with the text inputted in the submit box*/

document.addEventListener("DOMContentLoaded", () => {



    const taskCount = document.getElementById("task-count");
    const MAXCHAR = 41;
    const submitButton = document.getElementById("submit");
    const todoInput = document.getElementById("text_input");
    const deleteButton = document.getElementById("delete");

    function createTaskElement(key,element){
        if(element.length > MAXCHAR){
            element = element.substring(0,MAXCHAR) + "...";
        }


        const newElement = document.createElement("div")
        newElement.classList.add("list-item")
        const div = document.getElementById("child-contents")
        newElement.dataset.key = key;
        let nodeText = document.createElement("p")
        nodeText.classList.add("list-text")
        let removeButton = document.createElement("div")
        removeButton.classList.add("delete-button")
        removeButton.classList.add("button-format")
        removeButton.innerText = "🗑"
        let completeButton = document.createElement("div")
        completeButton.classList.add("complete-button")
        completeButton.classList.add("button-format")
        completeButton.innerText = "✔";

        nodeText.textContent = element;
        div.appendChild(newElement);
        newElement.appendChild(nodeText);
        newElement.appendChild(removeButton);
        newElement.appendChild(completeButton);
        removeButton.addEventListener("click", () => {
            newElement.remove();
            localStorage.removeItem(key)
            updateTaskCount()
        })
        completeButton.addEventListener("click", () => {
            const keyToRemove = newElement.dataset.key;
            newElement.remove();
            localStorage.removeItem(keyToRemove);
            updateTaskCount()
        })
    }

    function addTodo(event){
        event.preventDefault();
        const key = Date.now();

        element = todoInput.value;
        if(element === ""){return;}

        createTaskElement(key,element);
       localStorage.setItem(key,element);
        updateTaskCount()


        todoInput.value = "";
    }

    submitButton.addEventListener("click", addTodo);

    todoInput.addEventListener("keypress", function(keypressed){
        if(keypressed.key === "Enter"){
            submitButton.click();
            event.preventDefault();

        }
    })


    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        createTaskElement(key, value);
        updateTaskCount()
    }
    function updateTaskCount(){
        const taskCount = document.getElementById("task-count");
        if(localStorage.length === 0){
             todoInput.placeholder = "enter task...";

        }else if(localStorage.length === 1){
            //  taskCount.innerText = "You have " + localStorage.length + " task(s) to complete!";
            todoInput.placeholder ="" + localStorage.length + " task"
        }else{
            todoInput.placeholder ="" + localStorage.length + " task(s)"
        }

    }
})

