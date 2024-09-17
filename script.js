document.addEventListener("DOMContentLoaded", function() {    

    function typeWriter(element_id, text, speed, index = 0) {
        return new Promise((resolve) => {
            function type() {
                if (index < text.length) {
                    const elem = document.getElementById(element_id);
                    elem.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    typeWriter("hello", "Hello World!", 100)
        .then(() => typeWriter("my-name", "Valen Valls welcomes you", 50));
});