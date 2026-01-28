const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const dropdown = document.querySelector(".tab-dropdown");
const themeToggle = document.getElementById("themeToggle");
const unitModeRadios = document.querySelectorAll("input[name='unitMode']");

let currentUnitMode = "px";

// Unit mode switching
unitModeRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
        currentUnitMode = e.target.value;
        updateTabsForUnit(currentUnitMode);
        activateTab(currentUnitMode === "px" ? "pxToPercent" : "emToPercent");
    });
});

function updateTabsForUnit(unit) {
    tabs.forEach((tab) => {
        const tabUnit = tab.dataset.unit;
        tab.style.display = tabUnit === unit ? "" : "none";
    });
    
    const dropdownOptions = dropdown.querySelectorAll("option");
    dropdownOptions.forEach((option) => {
        const panelId = option.value;
        const panel = document.getElementById(panelId);
        if (panel) {
            const panelUnit = panel.id.includes("Em") ? "em" : "px";
            option.style.display = panelUnit === unit ? "" : "none";
        }
    });
    
    panels.forEach((panel) => {
        const panelUnit = panel.id.includes("Em") ? "em" : "px";
        panel.style.display = panelUnit === unit ? "" : "none";
    });
}

// Initialize tabs for the default unit mode
updateTabsForUnit(currentUnitMode);
activateTab("pxToPercent");

// Tab switching (desktop)
tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

// Dropdown switching (mobile)
dropdown.addEventListener("change", (e) => activateTab(e.target.value));

function activateTab(id) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === id));
    panels.forEach((p) => {
        const isActive = p.id === id;
        p.classList.toggle("active", isActive);
        // Clear inline display style when activating to let CSS rules apply
        if (isActive) {
            p.style.display = "";
        }
    });
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

document.getElementById("percentToEmInput").addEventListener("input", () => {
    const percent = percentToEmInput.value;
    const base = percentToEmBase.value;
    percentToEmResult.textContent = percent && base ? `${((percent / 100) * base / 16).toFixed(4)} em` : "";
});

document.getElementById("emToPercentInput").addEventListener("input", () => {
    const em = emToPercentInput.value;
    const base = emToPercentBase.value;
    emToPercentResult.textContent = em && base ? `${((em * 16 / base) * 100).toFixed(2)}%` : "";
});

// Clear button functionality
document.querySelectorAll(".clear-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (input) {
            input.value = "";
            input.dispatchEvent(new Event("input"));
            btn.classList.remove("show");
            input.focus();
        }
    });
});

// Show/hide clear button based on input content and focus
document.querySelectorAll("input[type='number']").forEach((input) => {
    const clearBtn = input.parentElement.querySelector(".clear-btn");
    
    function updateClearButtonVisibility() {
        if (input.value && document.activeElement === input) {
            clearBtn.classList.add("show");
        } else {
            clearBtn.classList.remove("show");
        }
    }
    
    input.addEventListener("focus", updateClearButtonVisibility);
    input.addEventListener("blur", updateClearButtonVisibility);
    input.addEventListener("input", updateClearButtonVisibility);
});