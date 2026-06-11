// =========================
// THEME CLAIR / SOMBRE
// =========================

const themeToggle = document.getElementById("theme-toggle");

// Charger le thème sauvegardé
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }
} else {
    if (themeToggle) {
        themeToggle.textContent = "🌙";
    }
}

// Changement de thème
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        if (document.body.classList.contains("light")) {

            localStorage.setItem("theme", "light");

            themeToggle.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "dark");

            themeToggle.textContent = "🌙";

        }

    });

}
