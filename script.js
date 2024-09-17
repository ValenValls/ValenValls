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
        .then(() => typeWriter("my-name", "Valen Valls welcomes you", 50));


    const toggleCheckbox = document.getElementById("night-day");
    const body = document.body;

    toggleCheckbox.addEventListener("change", function() {          
        body.classList.toggle("dark-mode");
    });    
});