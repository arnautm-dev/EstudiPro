const category = document.getElementById("category");

const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

const fromValue = document.getElementById("fromValue");
const toValue = document.getElementById("toValue");

const searchFrom = document.getElementById("searchFrom");
const searchTo = document.getElementById("searchTo");

const swapButton = document.getElementById("swapButton");

const conversionResult = document.getElementById("conversionResult");

const equality1 = document.getElementById("equality1");
const equality2 = document.getElementById("equality2");

const historyContainer = document.getElementById("history");
const favoritesContainer = document.getElementById("favoriteUnits");

let currentCategory = null;
let editing = "from";

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function formatNumber(value) {

    if (!isFinite(value)) {
        return "—";
    }

    if (Math.abs(value) >= 1e12 || (Math.abs(value) > 0 && Math.abs(value) < 1e-8)) {
        return value.toExponential(8).replace(/\.?0+e/, "e");
    }

    return Number(value.toPrecision(12)).toString();

}

function getCategory() {

    return UnitConverter.categories[category.value];

}

function getUnit(id) {

    return currentCategory.units[id];

}

function getBaseValue(value, unit) {

    if (unit.toBase) {
        return unit.toBase(value);
    }

    return value * unit.factor;

}

function fromBaseValue(value, unit) {

    if (unit.fromBase) {
        return unit.fromBase(value);
    }

    return value / unit.factor;

}

function convert(value, from, to) {

    const base = getBaseValue(value, from);

    return fromBaseValue(base, to);

}

function fillCategories() {

    category.innerHTML = "";

    for (const key in UnitConverter.categories) {

        const option = document.createElement("option");

        option.value = key;
        option.textContent = UnitConverter.categories[key].name;

        category.appendChild(option);

    }

}

function fillUnits(select, filter = "") {

    const selected = select.value;

    select.innerHTML = "";

    const units = [];

    for (const key in currentCategory.units) {

        units.push({
            key,
            ...currentCategory.units[key]
        });

    }

    units.sort((a, b) => {

        const af = favorites.includes(a.key);
        const bf = favorites.includes(b.key);

        if (af !== bf) {
            return bf - af;
        }

        return a.name.localeCompare(b.name);

    });

    for (const unit of units) {

        if (
            filter &&
            !unit.name.toLowerCase().includes(filter.toLowerCase()) &&
            !unit.symbol.toLowerCase().includes(filter.toLowerCase())
        ) {
            continue;
        }

        const option = document.createElement("option");

        option.value = unit.key;
        option.textContent = `${unit.name} (${unit.symbol})`;

        select.appendChild(option);

    }

    if ([...select.options].some(o => o.value === selected)) {
        select.value = selected;
    }

}

function updateCategory() {

    currentCategory = getCategory();

    fillUnits(fromUnit);
    fillUnits(toUnit);

    if (fromUnit.options.length) {
        fromUnit.selectedIndex = 0;
    }

    if (toUnit.options.length > 1) {
        toUnit.selectedIndex = 1;
    }

    updateFrom();

}

fillCategories();

category.addEventListener("change", updateCategory);

updateCategory();

function updateEquality() {

    const from = getUnit(fromUnit.value);
    const to = getUnit(toUnit.value);

    if (!from || !to) {
        return;
    }

    const first = convert(1, from, to);
    const second = convert(1, to, from);

    equality1.textContent =
        `1 ${from.name} = ${formatNumber(first)} ${to.name}`;

    equality2.textContent =
        `1 ${to.name} = ${formatNumber(second)} ${from.name}`;

}

function updateConversion() {

    const from = getUnit(fromUnit.value);
    const to = getUnit(toUnit.value);

    if (!from || !to) {
        return;
    }

    conversionResult.innerHTML =
        `${formatNumber(Number(fromValue.value))} ${from.symbol}
        = ${formatNumber(Number(toValue.value))} ${to.symbol}
        <br><br>
        ${formatNumber(Number(toValue.value))} ${to.symbol}
        = ${formatNumber(Number(fromValue.value))} ${from.symbol}`;

}

function updateFrom(save = true) {

    const from = getUnit(fromUnit.value);
    const to = getUnit(toUnit.value);

    if (!from || !to) {
        return;
    }

    const value = parseFloat(fromValue.value);

    if (isNaN(value)) {
        toValue.value = "";
        return;
    }

    editing = "from";

    toValue.value = formatNumber(
        convert(value, from, to)
    );

    updateEquality();
    updateConversion();

    if (save) {
        saveHistory();
    }

}

function updateTo(save = true) {

    const from = getUnit(fromUnit.value);
    const to = getUnit(toUnit.value);

    if (!from || !to) {
        return;
    }

    const value = parseFloat(toValue.value);

    if (isNaN(value)) {
        fromValue.value = "";
        return;
    }

    editing = "to";

    fromValue.value = formatNumber(
        convert(value, to, from)
    );

    updateEquality();
    updateConversion();

    if (save) {
        saveHistory();
    }

}

fromValue.addEventListener("input", () => {
    updateFrom();
});

toValue.addEventListener("input", () => {
    updateTo();
});

fromUnit.addEventListener("change", () => {

    if (editing === "from") {
        updateFrom();
    } else {
        updateTo();
    }

});

toUnit.addEventListener("change", () => {

    if (editing === "from") {
        updateFrom();
    } else {
        updateTo();
    }

});

swapButton.addEventListener("click", () => {

    const unit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = unit;

    const value = fromValue.value;
    fromValue.value = toValue.value;
    toValue.value = value;

    if (editing === "from") {
        updateFrom(false);
    } else {
        updateTo(false);
    }

});

function filterUnits(input, select) {

    fillUnits(select, input.value);

}

searchFrom.addEventListener("input", () => {
    filterUnits(searchFrom, fromUnit);
});

searchTo.addEventListener("input", () => {
    filterUnits(searchTo, toUnit);
});

function saveFavorites() {

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

}

function renderFavorites() {

    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {

        favoritesContainer.innerHTML =
            "<p>No favorite units yet.</p>";

        return;

    }

    for (const id of favorites) {

        let unit = null;

        for (const categoryKey in UnitConverter.categories) {

            const category = UnitConverter.categories[categoryKey];

            if (category.units[id]) {

                unit = category.units[id];
                break;

            }

        }

        if (!unit) {
            continue;
        }

        const button = document.createElement("button");

        button.className = "favorite-item";

        button.textContent =
            `${unit.name} (${unit.symbol})`;

        button.addEventListener("click", () => {

            if (currentCategory.units[id]) {

                fromUnit.value = id;
                updateFrom(false);

            }

        });

        favoritesContainer.appendChild(button);

    }

}

function saveHistory() {

    const from = getUnit(fromUnit.value);
    const to = getUnit(toUnit.value);

    if (!from || !to) {
        return;
    }

    const item = {

        category: category.value,

        fromUnit: fromUnit.value,
        toUnit: toUnit.value,

        fromValue: fromValue.value,
        toValue: toValue.value

    };

    history.unshift(item);

    history = history.slice(0, 20);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    renderHistory();

}

function renderHistory() {

    historyContainer.innerHTML = "";

    if (history.length === 0) {

        historyContainer.innerHTML =
            "<p>No recent conversions.</p>";

        return;

    }

    history.forEach(item => {

        const button =
            document.createElement("button");

        button.className =
            "history-item";

        button.textContent =
            `${item.fromValue} ${item.fromUnit} → ${item.toValue} ${item.toUnit}`;

        button.addEventListener("click", () => {

            category.value = item.category;

            updateCategory();

            fromUnit.value = item.fromUnit;
            toUnit.value = item.toUnit;

            fromValue.value = item.fromValue;
            toValue.value = item.toValue;

            updateFrom(false);

        });

        historyContainer.appendChild(button);

    });

}

renderFavorites();
renderHistory();

function toggleFavorite(unitId) {

    const index = favorites.indexOf(unitId);

    if (index === -1) {
        favorites.push(unitId);
    } else {
        favorites.splice(index, 1);
    }

    saveFavorites();
    renderFavorites();

    fillUnits(fromUnit, searchFrom.value);
    fillUnits(toUnit, searchTo.value);

}

async function copyConversion() {

    const from = getUnit(fromUnit.value);
    const to = getUnit(toUnit.value);

    if (!from || !to) {
        return;
    }

    const text =
        `${fromValue.value} ${from.symbol} = ${toValue.value} ${to.symbol}`;

    try {

        await navigator.clipboard.writeText(text);

    } catch {

        console.warn("Clipboard unavailable.");

    }

}

document.addEventListener("keydown", event => {

    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "s") {

        event.preventDefault();

        swapButton.click();

    }

    if (event.key === "Enter") {

        if (editing === "from") {
            updateFrom();
        } else {
            updateTo();
        }

    }

});

fromValue.addEventListener("focus", () => {
    fromValue.select();
});

toValue.addEventListener("focus", () => {
    toValue.select();
});

window.addEventListener("beforeunload", () => {

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

});

updateCategory();
renderFavorites();
renderHistory();

console.log("Unit Converter loaded successfully.");