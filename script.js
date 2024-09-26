document.addEventListener("DOMContentLoaded", function() {   


    function typeWriter(element_id, text, speed, index = 0) {
        return new Promise((resolve) => {
            function type() {
                if (index < text.length) {
                    const elem = document.getElementById(element_id);
                    elem.innerHTML += text.charAt(index);
                    index++; // Increment index here
    
                    if (text.charAt(index - 1) != ' ') {
                        setTimeout(type, speed);
                    } else {
                        type(); // Call type() immediately for spaces
                    }
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    typeWriter("hello", "Hello World!", 100)
        .then(() => typeWriter("my-name", "I'm Valentín Franco Valls, greetings!", 50));


    const toggleCheckbox = document.getElementById("night-day");
    const body = document.body;

    toggleCheckbox.addEventListener("change", function() {          
        body.classList.toggle("dark-mode");
    });        

    const lovesElement = document.getElementById("loves");
    lovesElement.textContent = "Programming";
});
const lovesElement = document.getElementById("loves");
const loves = ["Programming", "Learning", "Being Creative", "Solving Problems", "AI", "Games", "Animals"];
let lovesIndex = 0;

function changeText() {
    lovesIndex = (lovesIndex + 1) % loves.length;
    lovesElement.textContent = loves[lovesIndex];
}

setInterval(changeText, 2000);



function copyEmailToClipboard() {
    const email = "valentinvalls@hotmail.com";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email address copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy email: ", err);
    });
}

const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    moveSlides(button.dataset.carouselButton === "next" ? 1 : -1);
  });
});

function moveSlides(offset) {
  const slides = document.querySelector("[data-slides]");
  const activeSlide = slides.querySelector("[data-active]");
  let newIndex = [...slides.children].indexOf(activeSlide) + offset;
  if (newIndex < 0) newIndex = slides.children.length - 1;
  if (newIndex >= slides.children.length) newIndex = 0;

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}

const intervalTime = 10000; 
setInterval(() => {
  moveSlides(1);
}, intervalTime);


