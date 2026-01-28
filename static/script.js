const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const dropdown = document.querySelector(".tab-dropdown");
const themeToggle = document.getElementById("themeToggle");

// Tab switching (desktop)
tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

// Dropdown switching (mobile)
dropdown.addEventListener("change", (e) => activateTab(e.target.value));

function activateTab(id) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === id));
    panels.forEach((p) => p.classList.toggle("active", p.id === id));
    dropdown.value = id;
}

// Theme toggle
themeToggle.addEventListener("click", () => {
    const isDark = document.body.dataset.theme === "dark";
    document.body.dataset.theme = isDark ? "" : "dark";
    themeToggle.textContent = isDark ? "🌙" : "☀️";
});

// Conversions
document.getElementById("percentToPxInput").addEventListener("input", () => {
    const percent = percentToPxInput.value;
    const base = percentToPxBase.value;
    percentToPxResult.textContent = percent && base ? `${((percent / 100) * base).toFixed(4)} px` : "";
});

document.getElementById("pxToPercentInput").addEventListener("input", () => {
    const pixel = pxToPercentInput.value;
    const base = pxToPercentBase.value;
    pxToPercentResult.textContent = pixel && base ? `${((pixel / base) * 100).toFixed(2)}%` : "";
});