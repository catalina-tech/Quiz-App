document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", function() {
        const playerName = document.getElementById("playerName").value.trim();

        if (playerName) {
            localStorage.setItem("playerName", playerName); // Almacena el nombre del jugador
            window.location.href = "quiz.html"; // Redirige a la página del quiz
        } else {
            alert("Por favor ingresa tu nombre.");
        }
    });
});
