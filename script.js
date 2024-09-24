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
/*
const image = document.getElementById('greetings-img');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function updateImageTransform() {
    const rect = image.getBoundingClientRect();
    const x = mouseX - rect.left - rect.width / 2;
    const y = mouseY - rect.top - rect.height / 2;

    const rotateX = Math.max(-15, Math.min(15, -y * 0.05)); // Clamp rotation between -15 and 15 degrees
    const rotateY = Math.max(-15, Math.min(15, x * 0.05));

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateImageTransform();
});
document.addEventListener('scroll', updateImageTransform);
*/


