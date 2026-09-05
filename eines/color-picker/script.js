const picker = document.getElementById("picker");
const preview = document.getElementById("preview");
const hex = document.getElementById("hex");
const rgb = document.getElementById("rgb");
const copyHex = document.getElementById("copyHex");
const copyRgb = document.getElementById("copyRgb");

function hexToRgb(color) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb) {
    const values = rgb.match(/\d+/g);
    if (!values || values.length < 3) return null;
    const r = Math.min(255, Math.max(0, parseInt(values[0])));
    const g = Math.min(255, Math.max(0, parseInt(values[1])));
    const b = Math.min(255, Math.max(0, parseInt(values[2])));
    return "#" + [r, g, b]
        .map(v => v.toString(16).padStart(2, "0"))
        .join("");
}

function updateColorPicker() {
    const color = picker.value;
    hex.value = color.toUpperCase();
    rgb.value = hexToRgb(color);
}

function updateColorHex() {
    const color = hex.value;
    picker.value = color.toLowerCase();
    rgb.value = hexToRgb(color);
}

function updateColorRGB() {
    const hexColor = rgbToHex(rgb.value);
    if (!hexColor) return;
    picker.value = hexColor;
    hex.value = hexColor;
}

picker.addEventListener("input", updateColorPicker);
hex.addEventListener("input", updateColorHex);
rgb.addEventListener("input", updateColorRGB);


copyHex.addEventListener("click", () => {
    navigator.clipboard.writeText(hex.value);
});

copyRgb.addEventListener("click", () => {
    navigator.clipboard.writeText(rgb.value);
});

updateColor();