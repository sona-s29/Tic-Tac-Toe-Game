let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector(".newbtn");
let msg_container = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");

let turnO = true; // player X and O
let count = 0;

// winning patterns----------------

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [6, 7, 8],
];

// for game reset-------------

const resetgame = () =>{
    turnO = true;
    count = 0;
    enablebox();
    msg_container.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
            
        } else{
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let iswinner = checkwinner();

        if (count === 9 && !iswinner){
            drawgame();
        }
    });

});

//if game is draw------------------

const drawgame = () =>{
    msg.innerText = "Game Was a Draw";
    msg_container.classList.remove("hide");
    disablebox();
}

// disabling box so user cannot click more than one time at a same box--

const disablebox = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
};

const enablebox = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

const showWinner = (Winner) =>{
    msg.innerText = `Congratulations, Winner is ${Winner}`;
    msg_container.classList.remove("hide");
    disablebox();
}

function checkwinner(){
    for(let pattern of winpatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
}

newbtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);
