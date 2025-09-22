/* we want to create new objects and put them into 'child-contents' with the text inputted in the submit box*/

document.addEventListener("DOMContentLoaded", () => {
    const taskCount = document.getElementById("task-count");
    const MAXCHAR = 41;
    const submitButton = document.getElementById("submit");
    const todoInput = document.getElementById("text_input");
    const deleteButton = document.getElementById("delete");


    function addTodo(event){
        event.preventDefault();
        const key = Date.now();

        element = todoInput.value;
        if(element === ""){return;}

        let newText = document.createTextNode(element);

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
        removeButton.innerText = "✘"
        let completeButton = document.createElement("div")
        completeButton.classList.add("complete-button")
        completeButton.classList.add("button-format")
        completeButton.innerText = "✔";

       nodeText.textContent = element;
       div.appendChild(newElement);
       newElement.appendChild(nodeText);
       newElement.appendChild(removeButton);
       newElement.appendChild(completeButton);

       localStorage.setItem(key,element);
        updateTaskCount()
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

        todoInput.value = "";
    }

    submitButton.addEventListener("click", addTodo);

    todoInput.addEventListener("keypress", function(keypressed){
        if(keypressed.key === "Enter"){
            submitButton.click();
            event.preventDefault();

        }
    })




})
function updateTaskCount(){
    const taskCount = document.getElementById("task-count");
    if(localStorage.length === 0){
        taskCount.innerText = "All Tasks Complete!";
    }else{
        taskCount.innerText = "You have " + localStorage.length + " task(s) to complete!.";
    }

}