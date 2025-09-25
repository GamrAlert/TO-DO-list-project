document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("text_input")
    let doAnim = true;
    let placeholder = inputBox.placeholder;
    let animState = [];

    function stopAnim(){
        for(let anims of animState){
            clearTimeout(anims);
        }
        animState = [];
    }

    function animation(){

        if(placeholder.charAt(0) !== "e"){
            stopAnim();
            doAnim = false;
        }

        if(doAnim) {
            for(let i = 0; i < 3; i++){
               let id = setTimeout (() =>{
                   if(placeholder.charAt(placeholder.length - 1) !== "."){
                       return;
                   }else{
                       placeholder = placeholder.slice(0,-1)
                       inputBox.placeholder = placeholder;
                   }

                }, i * 1250);
               animState.push(id);
            }
           let loopID = setTimeout (() =>{
                for(let j = 0; j < 3; j++){
                   let id = setTimeout (() =>{
                        placeholder += ".";
                        inputBox.placeholder = placeholder;
                    }, j * 1250);
                    animState.push(id);
                }
            },  3800)

            animState.push(loopID);
            if(doAnim){
                setTimeout(animation, 6 * 1600);
            }

        }
    }




    inputBox.addEventListener("focus", () => {doAnim = false; stopAnim(); inputBox.placeholder = "";});
    inputBox.addEventListener("blur", () => {
        if(localStorage.length === 0) {

            doAnim = true;
            stopAnim();
            placeholder = "enter task"
            inputBox.placeholder = placeholder
            animation();
        }
    })
    animation();
})