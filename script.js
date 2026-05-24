const text="on a quiet rainy afternoon there is truly nothing better than curling up in a soft blanket with a warm cup of tea and a really good book the gentle pitter-patter of raindrops against the windowpane creates a soothing rhythm that washes away the stresses of the outside world inviting you to slow down and breathe in these solitary moments of peace the mind is free to wander through entirely new worlds escaping the mundane and finding absolute comfort in the simple quiet magic of the present"

const typingBox = document.querySelector(".typing-box");
const timeDisplay = document.querySelector(".stats div");
const wpmDisplay = document.querySelector(".item1");
const cpmDisplay = document.querySelector(".item2");
const accuracyDisplay = document.querySelector(".item3");
const personaDisplay = document.querySelector(".item4");
const restartBtn = document.getElementById("restart");
const timeSelect = document.querySelector("select");

let timer;
let maxTime =parseInt(timeSelect.value);
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let totalTyped = 0;
let started = false;

function loadParagraph(){
    
    typingBox.innerHTML="";
    text.split("").forEach((char,index)=>{
        const span =document.createElement("span");
        span.innerText=char;

        if (index===0){
            span.classList.add("current")

        }

        typingBox.appendChild(span)
    }
    )

}

function setTimer(){

     timer =setInterval(()=>{
        if (timeLeft>0){
            timeLeft--;
            timeDisplay.innerHTML=`Time left:${timeLeft}s`;
           
        }

        else{
            clearInterval(timer);                                       
            document.removeEventListener("keydown",typingText);
            
        }
    }, 1000)
}

function typingText(e){

    if(!started){
        started=true;
        setTimer();

    }
    const spans= typingBox.querySelectorAll('span');
    const chi=spans[charIndex];

    if(e.key===chi.innerText){
        chi.classList.add('correct');
    }
    else{
        chi.classList.add('wrong');
        mistakes++;
    }

    charIndex++;
    totalTyped++;

    results();
}

function results(){

    let correctChars= totalTyped-mistakes;
    let minutes= maxTime/60;
    let cpm= Math.round(correctChars/minutes);
    let wpm= Math.round((correctChars/5)/minutes);
    let accuracy= Math.round((correctChars/totalTyped)*100);

    wpmDisplay.innerHTML= `<span class="s1">WPM:</span> ${wpm}`
    cpmDisplay.innerHTML= `<span class="s2">CPM:</span> ${cpm}`
    accuracyDisplay.innerHTML= `<span class="s3">Accuracy:</span> ${accuracy}`

    let persona="";

    if(wpm<20) {
        persona="Tortoise"
    }

    else if(wpm<40){
        persona="Horse"
    }

    else{
        persona="Cheetah"
    }

    personaDisplay.innerHTML= `<span class="s4">Your typing persona:</span> ${persona}`
}

function restartTest(){

    clearInterval(timer);

    maxTime = parseInt(timeSelect.value);
    timeLeft = maxTime;

    charIndex = 0;
    mistakes = 0;
    totalTyped = 0;
    started = false;

    timeDisplay.innerHTML = `Time left:${timeLeft}s`;

    wpmDisplay.innerHTML = `<span class="s1">WPM:</span> 0`;
    cpmDisplay.innerHTML = `<span class="s2">CPM:</span> 0`;
    accuracyDisplay.innerHTML = `<span class="s3">Accuracy:</span> 0`;
    personaDisplay.innerHTML = `<span class="s4">Your typing persona:</span> -`;
    document.addEventListener("keydown", typingText);

    loadParagraph();
}

restartBtn.addEventListener('click',restartTest);
timeSelect.addEventListener('change',restartTest);
document.addEventListener('keydown',typingText);

restartTest();
