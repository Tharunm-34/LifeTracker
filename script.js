/* =========================================================
   LIFETRACK
   DAILY ACTIVITY + NUTRITION + WELLNESS
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

let activities =
    JSON.parse(localStorage.getItem("dailyActivities")) || [];

let nutritionRecords =
    JSON.parse(localStorage.getItem("lifeTrackNutrition")) || [];

let bodyRecords =
    JSON.parse(localStorage.getItem("lifeTrackBody")) || [];

let tasks =
    JSON.parse(localStorage.getItem("lifeTrackTasks")) || [];

let focusRecords =
    JSON.parse(localStorage.getItem("lifeTrackFocus")) || [];

let journals =
    JSON.parse(localStorage.getItem("lifeTrackJournals")) || [];

let waterDaily =
    JSON.parse(localStorage.getItem("lifeTrackWaterDaily")) || {};

let moods =
    JSON.parse(localStorage.getItem("lifeTrackMoods")) || {};

let editingActivityId = null;


/* =========================================================
   DATE
========================================================= */

function getToday() {

    const now = new Date();

    const year = now.getFullYear();

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const day =
        String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function formatDate(date) {

    if (!date) return "--";

    const d = new Date(date + "T00:00:00");

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function setTodayFields() {

    const ids = [
        "studyDate",
        "exerciseDate",
        "learningDate",
        "entertainmentDate",
        "socialDate",
        "sleepDate",
        "foodDate",
        "taskDate",
        "journalDate"
    ];

    ids.forEach(id => {

        const el = document.getElementById(id);

        if (el && !el.value) {
            el.value = getToday();
        }

    });
}


/* =========================================================
   HELPERS
========================================================= */

function el(id) {
    return document.getElementById(id);
}


function value(id) {

    return el(id)?.value || "";

}


function numberValue(id) {

    const n = Number(value(id));

    return Number.isFinite(n) ? n : 0;

}


function saveAll() {

    localStorage.setItem(
        "dailyActivities",
        JSON.stringify(activities)
    );

    localStorage.setItem(
        "lifeTrackNutrition",
        JSON.stringify(nutritionRecords)
    );

    localStorage.setItem(
        "lifeTrackBody",
        JSON.stringify(bodyRecords)
    );

    localStorage.setItem(
        "lifeTrackTasks",
        JSON.stringify(tasks)
    );

    localStorage.setItem(
        "lifeTrackFocus",
        JSON.stringify(focusRecords)
    );

    localStorage.setItem(
        "lifeTrackJournals",
        JSON.stringify(journals)
    );

    localStorage.setItem(
        "lifeTrackWaterDaily",
        JSON.stringify(waterDaily)
    );

    localStorage.setItem(
        "lifeTrackMoods",
        JSON.stringify(moods)
    );
}


function escapeHTML(text) {

    return String(text ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   DURATION
========================================================= */

function calculateDuration(start, end) {

    if (!start || !end) return 0;

    const [sh, sm] =
        start.split(":").map(Number);

    const [eh, em] =
        end.split(":").map(Number);

    let startMinutes =
        sh * 60 + sm;

    let endMinutes =
        eh * 60 + em;

    if (endMinutes < startMinutes) {
        endMinutes += 24 * 60;
    }

    return endMinutes - startMinutes;
}


/* =========================================================
   ADD ACTIVITY
========================================================= */

function addActivity(
    type,
    date,
    start,
    end,
    details
) {

    if (!date) {

        alert("Please select a date.");

        return;

    }

    const duration =
        calculateDuration(start, end);

    if (duration <= 0) {

        alert(
            "Please enter valid start and end times."
        );

        return;

    }

    activities.push({

        id: Date.now() + Math.random(),

        type,

        date,

        start,

        end,

        duration,

        details,

        createdAt:
            new Date().toISOString()

    });

    saveAll();

    refreshAll();

    alert(
        `${type} added successfully!`
    );
}


/* =========================================================
   STUDY
========================================================= */

function addStudy() {

    addActivity(

        "Study",

        value("studyDate"),

        value("studyStart"),

        value("studyEnd"),

        value("studySubject") ||
        "Study"

    );

}


/* =========================================================
   EXERCISE
========================================================= */

function addExercise() {

    if (
        value("exerciseStatus") ===
        "Not Done"
    ) {

        activities.push({

            id: Date.now() + Math.random(),

            type: "Exercise",

            date: value("exerciseDate"),

            start: "",

            end: "",

            duration: 0,

            details: "Not Done",

            createdAt:
                new Date().toISOString()

        });

        saveAll();

        refreshAll();

        alert("Exercise marked as Not Done.");

        return;
    }


    addActivity(

        "Exercise",

        value("exerciseDate"),

        value("exerciseStart"),

        value("exerciseEnd"),

        value("exerciseType") ||
        "Exercise"

    );

}


/* =========================================================
   LEARNING
========================================================= */

function addLearning() {

    if (
        value("learningStatus") ===
        "Not Done"
    ) {

        activities.push({

            id: Date.now() + Math.random(),

            type: "Learning",

            date: value("learningDate"),

            start: "",

            end: "",

            duration: 0,

            details: "Not Done",

            createdAt:
                new Date().toISOString()

        });

        saveAll();

        refreshAll();

        alert("Learning marked as Not Done.");

        return;
    }


    addActivity(

        "Learning",

        value("learningDate"),

        value("learningStart"),

        value("learningEnd"),

        value("learningTopic") ||
        "Learning"

    );

}


/* =========================================================
   ENTERTAINMENT
========================================================= */

function addEntertainment() {

    addActivity(

        "Entertainment",

        value("entertainmentDate"),

        value("entertainmentStart"),

        value("entertainmentEnd"),

        value("entertainmentType") ||
        "Entertainment"

    );

}


/* =========================================================
   SOCIAL
========================================================= */

function addSocial() {

    addActivity(

        "Social Media",

        value("socialDate"),

        value("socialStart"),

        value("socialEnd"),

        value("socialPlatform")

    );

}


/* =========================================================
   SLEEP
========================================================= */

function addSleep() {

    addActivity(

        "Sleep",

        value("sleepDate"),

        value("sleepStart"),

        value("sleepEnd"),

        "Sleep Cycle"

    );

}


/* =========================================================
   TOTAL ACTIVITY
========================================================= */

function getTodayDuration(type) {

    return activities

        .filter(a =>
            a.date === getToday() &&
            a.type === type
        )

        .reduce(
            (sum, a) =>
                sum + Number(a.duration || 0),
            0
        );

}


function getDateDuration(
    type,
    date
) {

    return activities

        .filter(a =>
            a.date === date &&
            a.type === type
        )

        .reduce(
            (sum, a) =>
                sum + Number(a.duration || 0),
            0
        );

}


/* =========================================================
   ⭐ NEW ADVANCED FOOD DATABASE
=========================================================

   Values are approximate.

   For gram/ml based foods:
   calories/protein/carbs/fat
   are calculated per 100 g/ml.

   For piece based foods:
   values are calculated per piece.
========================================================= */

const foodDatabase = {

    rice: {
        name: "Cooked Rice",
        unit: "g",
        defaultQuantity: 200,
        calories: 130,
        protein: 2.7,
        carbs: 28.2,
        fat: 0.3
    },

    idli: {
        name: "Idli",
        unit: "piece",
        defaultQuantity: 2,
        calories: 58,
        protein: 2.0,
        carbs: 12.0,
        fat: 0.2
    },

    dosa: {
        name: "Dosa",
        unit: "piece",
        defaultQuantity: 1,
        calories: 168,
        protein: 4.0,
        carbs: 29.0,
        fat: 4.0
    },

    chapati: {
        name: "Chapati",
        unit: "piece",
        defaultQuantity: 2,
        calories: 120,
        protein: 3.5,
        carbs: 18.0,
        fat: 3.5
    },

    egg: {
        name: "Egg",
        unit: "piece",
        defaultQuantity: 1,
        calories: 78,
        protein: 6.3,
        carbs: 0.6,
        fat: 5.3
    },

    apple: {
        name: "Apple",
        unit: "g",
        defaultQuantity: 150,
        calories: 52,
        protein: 0.3,
        carbs: 13.8,
        fat: 0.2
    },

    banana: {
        name: "Banana",
        unit: "g",
        defaultQuantity: 100,
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fat: 0.3
    },

    chicken: {
        name: "Chicken",
        unit: "g",
        defaultQuantity: 100,
        calories: 239,
        protein: 27.3,
        carbs: 0,
        fat: 13.6
    },

    chickenBiryani: {
        name: "Chicken Biryani",
        unit: "g",
        defaultQuantity: 250,
        calories: 180,
        protein: 7.5,
        carbs: 22,
        fat: 7
    },

    milk: {
        name: "Milk",
        unit: "ml",
        defaultQuantity: 250,
        calories: 60,
        protein: 3.2,
        carbs: 4.8,
        fat: 3.3
    },

    tea: {
        name: "Tea",
        unit: "ml",
        defaultQuantity: 150,
        calories: 40,
        protein: 1.5,
        carbs: 5,
        fat: 1.5
    },

    coffee: {
        name: "Coffee",
        unit: "ml",
        defaultQuantity: 150,
        calories: 45,
        protein: 1.5,
        carbs: 6,
        fat: 1.5
    },

    curd: {
        name: "Curd",
        unit: "g",
        defaultQuantity: 100,
        calories: 60,
        protein: 3.5,
        carbs: 4.7,
        fat: 3.3
    },

    oats: {
        name: "Oats",
        unit: "g",
        defaultQuantity: 50,
        calories: 389,
        protein: 16.9,
        carbs: 66.3,
        fat: 6.9
    },

    potato: {
        name: "Boiled Potato",
        unit: "g",
        defaultQuantity: 150,
        calories: 87,
        protein: 1.9,
        carbs: 20.1,
        fat: 0.1
    },

    paneer: {
        name: "Paneer",
        unit: "g",
        defaultQuantity: 100,
        calories: 265,
        protein: 18.3,
        carbs: 1.2,
        fat: 20.8
    },

    dal: {
        name: "Dal",
        unit: "g",
        defaultQuantity: 150,
        calories: 116,
        protein: 9,
        carbs: 20,
        fat: 0.4
    },

    peanuts: {
        name: "Peanuts",
        unit: "g",
        defaultQuantity: 30,
        calories: 567,
        protein: 25.8,
        carbs: 16.1,
        fat: 49.2
    },

    bread: {
        name: "Bread",
        unit: "piece",
        defaultQuantity: 2,
        calories: 75,
        protein: 3.5,
        carbs: 13,
        fat: 1
    },

    orange: {
        name: "Orange",
        unit: "g",
        defaultQuantity: 150,
        calories: 47,
        protein: 0.9,
        carbs: 11.8,
        fat: 0.1
    },

    fish: {
        name: "Fish",
        unit: "g",
        defaultQuantity: 100,
        calories: 128,
        protein: 26,
        carbs: 0,
        fat: 2.7
    }

};


/* =========================================================
   GRAVY DATABASE
========================================================= */

const gravyDatabase = {

    sambar: {
        name: "Sambar",
        unit: "g",
        calories: 80,
        protein: 3.5,
        carbs: 10,
        fat: 2.5
    },

    rasam: {
        name: "Rasam",
        unit: "g",
        calories: 40,
        protein: 1.5,
        carbs: 5,
        fat: 1
    },

    dalGravy: {
        name: "Dal Gravy",
        unit: "g",
        calories: 110,
        protein: 6,
        carbs: 15,
        fat: 2
    },

    chickenGravy: {
        name: "Chicken Gravy",
        unit: "g",
        calories: 150,
        protein: 10,
        carbs: 6,
        fat: 9
    },

    muttonGravy: {
        name: "Mutton Gravy",
        unit: "g",
        calories: 180,
        protein: 12,
        carbs: 5,
        fat: 12
    },

    fishGravy: {
        name: "Fish Gravy",
        unit: "g",
        calories: 120,
        protein: 12,
        carbs: 5,
        fat: 6
    },

    kurma: {
        name: "Vegetable Kurma",
        unit: "g",
        calories: 110,
        protein: 3,
        carbs: 9,
        fat: 7
    },

    paneerGravy: {
        name: "Paneer Gravy",
        unit: "g",
        calories: 150,
        protein: 7,
        carbs: 7,
        fat: 11
    },

    eggGravy: {
        name: "Egg Gravy",
        unit: "g",
        calories: 130,
        protein: 7,
        carbs: 6,
        fat: 8
    },

    chutney: {
        name: "Chutney",
        unit: "g",
        calories: 150,
        protein: 3,
        carbs: 8,
        fat: 12
    }

};


/* =========================================================
   FOOD OPTION HTML
========================================================= */

function foodOptions() {

    let html =
        `<option value="">Select Food</option>`;

    Object.keys(foodDatabase)
        .forEach(key => {

            html += `
                <option value="${key}">
                    ${foodDatabase[key].name}
                </option>
            `;

        });

    return html;
}


function gravyOptions() {

    let html =
        `<option value="">Select Gravy</option>`;

    Object.keys(gravyDatabase)
        .forEach(key => {

            html += `
                <option value="${key}">
                    ${gravyDatabase[key].name}
                </option>
            `;

        });

    return html;
}


/* =========================================================
   ADD FOOD ROW
========================================================= */

function addFoodRow() {

    const container =
        el("foodRows");

    const row =
        document.createElement("div");

    row.className =
        "food-row";


    row.innerHTML = `

        <div class="input-group">

            <label>Food</label>

            <select class="food-select"
                    onchange="updateFoodRow(this)">

                ${foodOptions()}

            </select>

        </div>


        <div class="input-group">

            <label>Quantity</label>

            <input type="number"
                   class="food-quantity"
                   min="0"
                   value="100"
                   oninput="calculateMealPreview()">

        </div>


        <div class="input-group">

            <label>Unit</label>

            <input type="text"
                   class="food-unit"
                   value="g"
                   readonly>

        </div>


        <div class="calculated">

            <span>
                Calories:
            </span>

            <strong class="food-calories">
                0
            </strong>

        </div>


        <div class="calculated">

            <span>
                P / C / F:
            </span>

            <strong class="food-macros">
                0 / 0 / 0
            </strong>

        </div>


        <button class="remove-row"
                onclick="this.parentElement.remove(); calculateMealPreview();">

            <i class="fa-solid fa-trash"></i>

        </button>

    `;


    container.appendChild(row);

}


/* =========================================================
   ADD GRAVY ROW
========================================================= */

function addGravyRow() {

    const container =
        el("gravyRows");

    const row =
        document.createElement("div");

    row.className =
        "gravy-row";


    row.innerHTML = `

        <div class="input-group">

            <label>Gravy</label>

            <select class="gravy-select"
                    onchange="updateGravyRow(this)">

                ${gravyOptions()}

            </select>

        </div>


        <div class="input-group">

            <label>Quantity</label>

            <input type="number"
                   class="gravy-quantity"
                   min="0"
                   value="50"
                   oninput="calculateMealPreview()">

        </div>


        <div class="input-group">

            <label>Unit</label>

            <input type="text"
                   class="gravy-unit"
                   value="g"
                   readonly>

        </div>


        <div class="calculated">

            Calories:
            <strong class="gravy-calories">
                0
            </strong>

        </div>


        <div class="calculated">

            P/C/F:
            <strong class="gravy-macros">
                0 / 0 / 0
            </strong>

        </div>


        <button class="remove-row"
                onclick="this.parentElement.remove(); calculateMealPreview();">

            <i class="fa-solid fa-trash"></i>

        </button>

    `;


    container.appendChild(row);

}


/* =========================================================
   FOOD ROW CALCULATION
========================================================= */

function updateFoodRow(select) {

    const row =
        select.closest(".food-row");

    const key =
        select.value;

    const data =
        foodDatabase[key];

    if (!data) return;


    const quantityInput =
        row.querySelector(".food-quantity");

    quantityInput.value =
        data.defaultQuantity;


    row.querySelector(".food-unit").value =
        data.unit;


    calculateMealPreview();

}


/* =========================================================
   GRAVY ROW CALCULATION
========================================================= */

function updateGravyRow(select) {

    const row =
        select.closest(".gravy-row");

    const key =
        select.value;

    const data =
        gravyDatabase[key];

    if (!data) return;


    row.querySelector(".gravy-unit").value =
        data.unit;


    calculateMealPreview();

}


/* =========================================================
   CALCULATE FOOD NUTRITION
========================================================= */

function calculateFoodNutrition(
    key,
    quantity
) {

    const food =
        foodDatabase[key];

    if (!food || quantity <= 0) {

        return {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        };

    }


    let multiplier;


    if (food.unit === "piece") {

        multiplier =
            quantity;

    } else {

        multiplier =
            quantity / 100;

    }


    return {

        calories:
            food.calories * multiplier,

        protein:
            food.protein * multiplier,

        carbs:
            food.carbs * multiplier,

        fat:
            food.fat * multiplier

    };

}


/* =========================================================
   CALCULATE GRAVY NUTRITION
========================================================= */

function calculateGravyNutrition(
    key,
    quantity
) {

    const gravy =
        gravyDatabase[key];

    if (!gravy || quantity <= 0) {

        return {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        };

    }


    const multiplier =
        quantity / 100;


    return {

        calories:
            gravy.calories * multiplier,

        protein:
            gravy.protein * multiplier,

        carbs:
            gravy.carbs * multiplier,

        fat:
            gravy.fat * multiplier

    };

}


/* =========================================================
   ⭐ LIVE MEAL CALCULATION
========================================================= */

function calculateMealPreview() {

    let totals = {

        calories: 0,

        protein: 0,

        carbs: 0,

        fat: 0

    };


    /* FOOD */

    document
        .querySelectorAll(".food-row")
        .forEach(row => {

            const key =
                row.querySelector(
                    ".food-select"
                )?.value;

            const quantity =
                Number(
                    row.querySelector(
                        ".food-quantity"
                    )?.value
                ) || 0;


            const nutrition =
                calculateFoodNutrition(
                    key,
                    quantity
                );


            totals.calories +=
                nutrition.calories;

            totals.protein +=
                nutrition.protein;

            totals.carbs +=
                nutrition.carbs;

            totals.fat +=
                nutrition.fat;


            const caloriesElement =
                row.querySelector(
                    ".food-calories"
                );

            const macrosElement =
                row.querySelector(
                    ".food-macros"
                );


            if (caloriesElement) {

                caloriesElement.textContent =
                    Math.round(
                        nutrition.calories
                    ) + " kcal";

            }


            if (macrosElement) {

                macrosElement.textContent =
                    `${nutrition.protein.toFixed(1)} / ` +
                    `${nutrition.carbs.toFixed(1)} / ` +
                    `${nutrition.fat.toFixed(1)}`;

            }

        });


    /* GRAVY */

    document
        .querySelectorAll(".gravy-row")
        .forEach(row => {

            const key =
                row.querySelector(
                    ".gravy-select"
                )?.value;

            const quantity =
                Number(
                    row.querySelector(
                        ".gravy-quantity"
                    )?.value
                ) || 0;


            const nutrition =
                calculateGravyNutrition(
                    key,
                    quantity
                );


            totals.calories +=
                nutrition.calories;

            totals.protein +=
                nutrition.protein;

            totals.carbs +=
                nutrition.carbs;

            totals.fat +=
                nutrition.fat;


            const caloriesElement =
                row.querySelector(
                    ".gravy-calories"
                );

            const macrosElement =
                row.querySelector(
                    ".gravy-macros"
                );


            if (caloriesElement) {

                caloriesElement.textContent =
                    Math.round(
                        nutrition.calories
                    ) + " kcal";

            }


            if (macrosElement) {

                macrosElement.textContent =
                    `${nutrition.protein.toFixed(1)} / ` +
                    `${nutrition.carbs.toFixed(1)} / ` +
                    `${nutrition.fat.toFixed(1)}`;

            }

        });


    /* DISPLAY */

    el("mealCalories").textContent =
        `${Math.round(totals.calories)} kcal`;

    el("mealProtein").textContent =
        `${totals.protein.toFixed(1)} g`;

    el("mealCarbs").textContent =
        `${totals.carbs.toFixed(1)} g`;

    el("mealFat").textContent =
        `${totals.fat.toFixed(1)} g`;


    return totals;

}


/* =========================================================
   ⭐ SAVE MEAL
========================================================= */

function saveFoodMeal() {

    const date =
        value("foodDate");

    if (!date) {

        alert("Please select a date.");

        return;

    }


    const totals =
        calculateMealPreview();


    if (
        totals.calories <= 0
    ) {

        alert(
            "Please select at least one food."
        );

        return;

    }


    const foods = [];


    document
        .querySelectorAll(".food-row")
        .forEach(row => {

            const key =
                row.querySelector(
                    ".food-select"
                )?.value;

            if (!key) return;


            const quantity =
                Number(
                    row.querySelector(
                        ".food-quantity"
                    )?.value
                ) || 0;


            const data =
                calculateFoodNutrition(
                    key,
                    quantity
                );


            foods.push({

                name:
                    foodDatabase[key].name,

                quantity,

                unit:
                    foodDatabase[key].unit,

                calories:
                    data.calories,

                protein:
                    data.protein,

                carbs:
                    data.carbs,

                fat:
                    data.fat

            });

        });


    const gravies = [];


    document
        .querySelectorAll(".gravy-row")
        .forEach(row => {

            const key =
                row.querySelector(
                    ".gravy-select"
                )?.value;

            if (!key) return;


            const quantity =
                Number(
                    row.querySelector(
                        ".gravy-quantity"
                    )?.value
                ) || 0;


            const data =
                calculateGravyNutrition(
                    key,
                    quantity
                );


            gravies.push({

                name:
                    gravyDatabase[key].name,

                quantity,

                unit:
                    gravyDatabase[key].unit,

                calories:
                    data.calories,

                protein:
                    data.protein,

                carbs:
                    data.carbs,

                fat:
                    data.fat

            });

        });


    nutritionRecords.push({

        id:
            Date.now() + Math.random(),

        date,

        meal:
            value("mealType"),

        foods,

        gravies,

        calories:
            totals.calories,

        protein:
            totals.protein,

        carbs:
            totals.carbs,

        fat:
            totals.fat,

        createdAt:
            new Date().toISOString()

    });


    saveAll();

    refreshAll();


    alert(
        "Meal saved with automatic nutrition calculation!"
    );


    el("foodRows").innerHTML = "";

    el("gravyRows").innerHTML = "";

    calculateMealPreview();

}


/* =========================================================
   ⭐ GET NUTRITION TOTALS
========================================================= */

function getNutritionTotals(
    date = getToday()
) {

    return nutritionRecords

        .filter(record =>
            record.date === date
        )

        .reduce(

            (total, record) => {

                total.calories +=
                    Number(record.calories) || 0;

                total.protein +=
                    Number(record.protein) || 0;

                total.carbs +=
                    Number(record.carbs) || 0;

                total.fat +=
                    Number(record.fat) || 0;

                return total;

            },

            {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            }

        );

}


/* =========================================================
   NUTRITION DISPLAY
========================================================= */

function renderNutrition() {

    const totals =
        getNutritionTotals();


    el("nutritionCalories").textContent =
        Math.round(totals.calories);

    el("nutritionProtein").textContent =
        totals.protein.toFixed(1);

    el("nutritionCarbs").textContent =
        totals.carbs.toFixed(1);

    el("nutritionFat").textContent =
        totals.fat.toFixed(1);


    el("dashCalories").textContent =
        Math.round(totals.calories);

    el("dashProtein").textContent =
        totals.protein.toFixed(1);

    el("dashCarbs").textContent =
        totals.carbs.toFixed(1);

    el("dashFat").textContent =
        totals.fat.toFixed(1);


    /* MACRO BARS */

    const proteinPercent =
        Math.min(
            100,
            totals.protein / 150 * 100
        );

    const carbsPercent =
        Math.min(
            100,
            totals.carbs / 300 * 100
        );

    const fatPercent =
        Math.min(
            100,
            totals.fat / 70 * 100
        );


    el("proteinBar").style.width =
        proteinPercent + "%";

    el("carbsBar").style.width =
        carbsPercent + "%";

    el("fatBar").style.width =
        fatPercent + "%";


    el("macroProteinText").textContent =
        totals.protein.toFixed(1) + " g";

    el("macroCarbsText").textContent =
        totals.carbs.toFixed(1) + " g";

    el("macroFatText").textContent =
        totals.fat.toFixed(1) + " g";


    renderNutritionHistory();

}


/* =========================================================
   NUTRITION HISTORY
========================================================= */

function renderNutritionHistory() {

    const container =
        el("nutritionHistory");

    if (!container) return;


    const records =
        [...nutritionRecords]
            .sort(
                (a,b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );


    if (!records.length) {

        container.innerHTML =
            `<p class="muted">
                No meals recorded yet.
            </p>`;

        return;

    }


    container.innerHTML =
        records
            .map(record => {

                const foodNames =
                    record.foods
                        .map(
                            food =>
                                `${escapeHTML(food.name)}
                                 (${food.quantity}${food.unit})`
                        )
                        .join(", ");


                const gravyNames =
                    record.gravies
                        .map(
                            gravy =>
                                `${escapeHTML(gravy.name)}
                                 (${gravy.quantity}${gravy.unit})`
                        )
                        .join(", ");


                return `

                    <div class="meal-history-item">

                        <div>

                            <h3>
                                ${escapeHTML(record.meal)}
                                • ${formatDate(record.date)}
                            </h3>

                            <p>
                                ${foodNames || "No food"}
                                ${gravyNames ?
                                " • " + gravyNames : ""}
                            </p>

                        </div>


                        <div class="meal-macros">

                            <strong>
                                ${Math.round(record.calories)}
                                kcal
                            </strong>

                            <br>

                            P:
                            ${record.protein.toFixed(1)}g

                            |

                            C:
                            ${record.carbs.toFixed(1)}g

                            |

                            F:
                            ${record.fat.toFixed(1)}g

                        </div>

                    </div>

                `;

            })
            .join("");

}


/* =========================================================
   WATER
========================================================= */

function getWater() {

    return Number(
        waterDaily[getToday()] || 0
    );

}


function addWater() {

    waterDaily[getToday()] =
        Math.min(
            8,
            getWater() + 1
        );

    saveAll();

    updateWaterUI();

}


function removeWater() {

    waterDaily[getToday()] =
        Math.max(
            0,
            getWater() - 1
        );

    saveAll();

    updateWaterUI();

}


function resetWater() {

    waterDaily[getToday()] = 0;

    saveAll();

    updateWaterUI();

}


function updateWaterUI() {

    const count =
        getWater();


    if (el("waterCount"))
        el("waterCount").textContent =
            count;


    if (el("waterDashboard"))
        el("waterDashboard").textContent =
            count;

}


/* =========================================================
   MOOD
========================================================= */

function setMood(
    emoji,
    text
) {

    moods[getToday()] = {

        emoji,

        text,

        date: getToday()

    };


    saveAll();

    updateMood();

}


function updateMood() {

    const mood =
        moods[getToday()];


    el("selectedMood").textContent =
        mood
            ? `${mood.emoji} ${mood.text}`
            : "Not selected";

}


/* =========================================================
   QUOTES
========================================================= */

const quotes = [

    {
        text:
            "Success is the sum of small efforts repeated every day.",
        author:
            "Robert Collier"
    },

    {
        text:
            "The secret of getting ahead is getting started.",
        author:
            "Mark Twain"
    },

    {
        text:
            "Small progress is still progress.",
        author:
            "Unknown"
    },

    {
        text:
            "Discipline creates freedom.",
        author:
            "Jocko Willink"
    },

    {
        text:
            "Do something today that your future self will thank you for.",
        author:
            "Unknown"
    }

];


function changeQuote() {

    const quote =
        quotes[
            Math.floor(
                Math.random() *
                quotes.length
            )
        ];


    el("dailyQuote").textContent =
        quote.text;

    el("quoteAuthor").textContent =
        "— " + quote.author;

}


 /* =========================================================
    DASHBOARD
========================================================= */

function updateDashboard() {

    const study =
        getTodayDuration("Study");

    const exercise =
        getTodayDuration("Exercise");

    const learning =
        getTodayDuration("Learning");

    const sleep =
        getTodayDuration("Sleep");


    el("dashStudy").textContent =
        `${study} min`;

    el("dashExercise").textContent =
        `${exercise} min`;

    el("dashLearning").textContent =
        `${learning} min`;

    el("dashSleep").textContent =
        `${sleep} min`;


    const studyPercent =
        Math.min(
            100,
            study / 120 * 100
        );

    const exercisePercent =
        Math.min(
            100,
            exercise / 30 * 100
        );

    const learningPercent =
        Math.min(
            100,
            learning / 60 * 100
        );


    el("dashStudyBar").style.width =
        studyPercent + "%";

    el("dashExerciseBar").style.width =
        exercisePercent + "%";

    el("dashLearningBar").style.width =
        learningPercent + "%";


    const productivity =
        Math.round(
            (
                studyPercent +
                exercisePercent +
                learningPercent
            ) / 3
        );


    el("productivityPercent").textContent =
        productivity + "%";


    el("habitStreak").textContent =
        calculateHabitStreak();


    updateCoach();

}


/* =========================================================
   SMART COACH
========================================================= */

function updateCoach() {

    const study =
        getTodayDuration("Study");

    const exercise =
        getTodayDuration("Exercise");

    const learning =
        getTodayDuration("Learning");

    const nutrition =
        getNutritionTotals();

    const water =
        getWater();


    let title =
        "Your personal coach is ready.";

    let message =
        "Start recording your routine to receive insights.";

    const suggestions = [];


    if (study < 120) {

        suggestions.push(
            `Study progress: ${study}/120 minutes.`
        );

    }


    if (exercise < 30) {

        suggestions.push(
            "Try to include at least some physical activity."
        );

    }


    if (learning < 60) {

        suggestions.push(
            `Learning progress: ${learning}/60 minutes.`
        );

    }


    if (water < 8) {

        suggestions.push(
            `Hydration: ${water}/8 glasses recorded.`
        );

    }


    if (nutrition.protein === 0) {

        suggestions.push(
            "Record a meal to see your protein and macro totals."
        );

    }


    if (
        study >= 120 &&
        exercise >= 30 &&
        learning >= 60
    ) {

        title =
            "Excellent productivity progress!";

        message =
            "Your main activity targets are currently complete.";

    }

    else if (
        nutrition.calories > 0
    ) {

        title =
            "Your nutrition is being tracked.";

        message =
            "Keep recording meals to build a complete nutrition picture.";

    }

    else if (
        study > 0
    ) {

        title =
            "You're making progress.";

        message =
            "Keep building your routine.";

    }


    el("coachTitle").textContent =
        title;

    el("coachMessage").textContent =
        message;


    el("wellnessSuggestions").innerHTML =
        suggestions
            .slice(0,4)
            .map(
                text =>
                    `<div class="wellness-suggestion">
                        ${escapeHTML(text)}
                    </div>`
            )
            .join("");

}


/* =========================================================
   HABIT STREAK
========================================================= */

function calculateHabitStreak() {

    const dates =
        [
            ...new Set(
                activities.map(
                    a => a.date
                )
            )
        ]
        .sort()
        .reverse();


    if (!dates.length)
        return 0;


    let streak = 0;

    const today =
        new Date();


    for (let i = 0; i < dates.length; i++) {

        const expected =
            new Date(today);

        expected.setDate(
            today.getDate() - i
        );


        const expectedString =
            expected
                .toISOString()
                .split("T")[0];


        if (
            dates[i] ===
            expectedString
        ) {

            streak++;

        } else {

            break;

        }

    }


    return streak;

}


/* =========================================================
   DAILY GOALS
========================================================= */

function updateGoal(
    barId,
    statusId,
    value,
    target,
    lowerIsBetter = false
) {

    let percent;


    if (lowerIsBetter) {

        percent =
            value <= target
                ? 100
                : Math.max(
                    0,
                    Math.round(
                        target /
                        value *
                        100
                    )
                );

    } else {

        percent =
            Math.min(
                100,
                Math.round(
                    value /
                    target *
                    100
                )
            );

    }


    el(barId).style.width =
        percent + "%";

    el(statusId).textContent =
        `${Math.round(value)} / ${target}`;

}


function renderDailyGoals() {

    const study =
        getTodayDuration("Study");

    const exercise =
        getTodayDuration("Exercise");

    const learning =
        getTodayDuration("Learning");

    const sleep =
        getTodayDuration("Sleep");

    const screen =
        getTodayDuration("Entertainment") +
        getTodayDuration("Social Media");

    const calories =
        getNutritionTotals().calories;


    updateGoal(
        "goalStudyBar",
        "goalStudyStatus",
        study,
        120
    );


    updateGoal(
        "goalExerciseBar",
        "goalExerciseStatus",
        exercise,
        30
    );


    updateGoal(
        "goalLearningBar",
        "goalLearningStatus",
        learning,
        60
    );


    updateGoal(
        "goalSleepBar",
        "goalSleepStatus",
        sleep,
        480
    );


    updateGoal(
        "goalScreenBar",
        "goalScreenStatus",
        screen,
        180,
        true
    );


    updateGoal(
        "goalCaloriesBar",
        "goalCaloriesStatus",
        calories,
        2000
    );

}


/* =========================================================
   BODY TRACKER
========================================================= */

function saveBodyData() {

    const weight =
        numberValue("weightInput");

    const height =
        numberValue("heightInput");


    if (
        weight <= 0 ||
        height <= 0
    ) {

        alert(
            "Enter valid weight and height."
        );

        return;

    }


    const bmi =
        weight /
        Math.pow(
            height / 100,
            2
        );


    bodyRecords.push({

        id:
            Date.now(),

        date:
            getToday(),

        weight,

        height,

        bmi

    });


    saveAll();

    renderBMI();

    alert(
        "Body measurement saved."
    );

}


function renderBMI() {

    if (!bodyRecords.length)
        return;


    const latest =
        bodyRecords[
            bodyRecords.length - 1
        ];


    el("weightInput").value =
        latest.weight;

    el("heightInput").value =
        latest.height;


    el("bmiValue").textContent =
        latest.bmi.toFixed(1);


    let status;


    if (latest.bmi < 18.5)
        status = "Underweight";

    else if (latest.bmi < 25)
        status = "Normal range";

    else if (latest.bmi < 30)
        status = "Overweight";

    else
        status = "Obesity range";


    el("bmiStatus").textContent =
        status;

}


/* =========================================================
   PLANNER
========================================================= */

function addTask() {

    const date =
        value("taskDate");

    const name =
        value("taskName");


    if (!date || !name) {

        alert(
            "Enter date and task."
        );

        return;

    }


    tasks.push({

        id:
            Date.now() + Math.random(),

        date,

        name,

        start:
            value("taskStart"),

        end:
            value("taskEnd"),

        priority:
            value("taskPriority"),

        completed:
            false

    });


    saveAll();

    renderTasks();


    el("taskName").value = "";

}


function toggleTask(id) {

    const task =
        tasks.find(
            t => t.id === id
        );

    if (!task) return;

    task.completed =
        !task.completed;

    saveAll();

    renderTasks();

}


function deleteTask(id) {

    tasks =
        tasks.filter(
            t => t.id !== id
        );

    saveAll();

    renderTasks();

}


function renderTasks() {

    const container =
        el("taskList");

    if (!container) return;


    const date =
        value("taskDate") ||
        getToday();


    const list =
        tasks.filter(
            t => t.date === date
        );


    if (!list.length) {

        container.innerHTML =
            `<p class="muted">
                No tasks for this date.
            </p>`;

        return;

    }


    container.innerHTML =
        list.map(task => `

            <div class="task-item">

                <input
                    type="checkbox"
                    class="task-check"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})">

                <div class="task-info">

                    <h3 style="
                        text-decoration:
                        ${task.completed
                            ? "line-through"
                            : "none"};
                    ">

                        ${escapeHTML(task.name)}

                    </h3>

                    <p>
                        ${task.start || "--"}
                        -
                        ${task.end || "--"}
                    </p>

                </div>

                <span class="priority ${task.priority}">
                    ${task.priority}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `).join("");

}


/* =========================================================
   FOCUS TIMER
========================================================= */

let timerSeconds = 25 * 60;

let timerInterval = null;

let selectedTimerMinutes = 25;


function setTimer(minutes) {

    pauseTimer();

    selectedTimerMinutes =
        minutes;

    timerSeconds =
        minutes * 60;

    updateTimerDisplay();

}


function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timerSeconds / 60
        );

    const seconds =
        timerSeconds % 60;


    el("timerDisplay").textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


function startTimer() {

    if (timerInterval)
        return;


    timerInterval =
        setInterval(() => {

            if (timerSeconds <= 0) {

                clearInterval(
                    timerInterval
                );

                timerInterval = null;

                recordFocusSession(
                    selectedTimerMinutes
                );

                alert(
                    "Focus session completed! 🎉"
                );

                return;

            }


            timerSeconds--;

            updateTimerDisplay();

        },1000);

}


function pauseTimer() {

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;

    }

}


function resetTimer() {

    pauseTimer();

    timerSeconds =
        selectedTimerMinutes * 60;

    updateTimerDisplay();

}


function recordFocusSession(
    minutes
) {

    focusRecords.push({

        id:
            Date.now(),

        date:
            getToday(),

        minutes,

        createdAt:
            new Date().toISOString()

    });


    saveAll();

    renderFocusHistory();

}


function renderFocusHistory() {

    const container =
        el("focusHistory");

    if (!container) return;


    const list =
        focusRecords
            .filter(
                r => r.date === getToday()
            )
            .reverse();


    if (!list.length) {

        container.innerHTML =
            `<p class="muted">
                No focus sessions today.
            </p>`;

        return;

    }


    container.innerHTML =
        list.map(
            r =>
                `<div class="journal-item">
                    <h3>
                        Focus Session
                    </h3>

                    <p>
                        ${r.minutes} minutes
                    </p>
                </div>`
        ).join("");

}


/* =========================================================
   JOURNAL
========================================================= */

function saveJournal() {

    const date =
        value("journalDate");


    if (!date) {

        alert(
            "Select a date."
        );

        return;

    }


    journals =
        journals.filter(
            j => j.date !== date
        );


    journals.push({

        id:
            Date.now(),

        date,

        accomplishments:
            value("journalAccomplishments"),

        improve:
            value("journalImprove"),

        tomorrow:
            value("journalTomorrow")

    });


    saveAll();

    renderJournalHistory();

    alert(
        "Journal saved."
    );

}


function renderJournalHistory() {

    const container =
        el("journalHistory");

    if (!container) return;


    const list =
        [...journals].reverse();


    if (!list.length) {

        container.innerHTML =
            `<p class="muted">
                No journal entries yet.
            </p>`;

        return;

    }


    container.innerHTML =
        list.map(j => `

            <div class="journal-item">

                <h3>
                    ${formatDate(j.date)}
                </h3>

                <p>
                    <strong>Accomplished:</strong><br>
                    ${escapeHTML(
                        j.accomplishments ||
                        "Not recorded"
                    )}
                </p>

                <p>
                    <strong>Improve:</strong><br>
                    ${escapeHTML(
                        j.improve ||
                        "Not recorded"
                    )}
                </p>

                <p>
                    <strong>Tomorrow:</strong><br>
                    ${escapeHTML(
                        j.tomorrow ||
                        "Not recorded"
                    )}
                </p>

            </div>

        `).join("");

}


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

    const selectedDate =
        value("historyDate");


    let records =
        activities;


    if (selectedDate) {

        records =
            activities.filter(
                a =>
                    a.date ===
                    selectedDate
            );

    }


    const sorted =
        [...records].sort(
            (a,b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );


    el("historyActivities").textContent =
        sorted.length;


    const date =
        selectedDate ||
        getToday();


    el("historyStudy").textContent =
        `${getDateDuration(
            "Study",
            date
        )} min`;


    el("historyExercise").textContent =
        `${getDateDuration(
            "Exercise",
            date
        )} min`;


    el("historyCalories").textContent =
        `${Math.round(
            getNutritionTotals(
                date
            ).calories
        )} kcal`;


    const container =
        el("historyList");


    if (!sorted.length) {

        container.innerHTML =
            `<div class="glass-panel">
                <p class="muted">
                    No activity records found.
                </p>
            </div>`;

        return;

    }


    container.innerHTML =
        sorted.map(a => `

            <div class="history-item">

                <div class="history-icon">

                    <i class="fa-solid fa-clock"></i>

                </div>


                <div class="history-info">

                    <h3>
                        ${escapeHTML(a.type)}
                    </h3>

                    <p>

                        ${escapeHTML(a.details)}

                        • ${a.start || "--"}

                        ${a.end
                            ? " - " + a.end
                            : ""}

                        • ${a.duration || 0} min

                    </p>

                </div>


                <div class="history-actions">

                    <button
                        class="edit-btn"
                        onclick="openEditModal(${a.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        class="history-delete"
                        onclick="deleteActivity(${a.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        `).join("");

}


function clearHistoryFilter() {

    el("historyDate").value = "";

    renderHistory();

}


/* =========================================================
   DELETE ACTIVITY
========================================================= */

function deleteActivity(id) {

    if (
        !confirm(
            "Delete this activity?"
        )
    ) return;


    activities =
        activities.filter(
            a => a.id !== id
        );


    saveAll();

    refreshAll();

}


/* =========================================================
   EDIT ACTIVITY
========================================================= */

function openEditModal(id) {

    const activity =
        activities.find(
            a => a.id === id
        );


    if (!activity) return;


    editingActivityId = id;


    el("editId").value =
        id;

    el("editDate").value =
        activity.date;

    el("editDetails").value =
        activity.details;

    el("editStart").value =
        activity.start;

    el("editEnd").value =
        activity.end;


    el("editModal")
        .classList.add("show");

}


function closeEditModal() {

    el("editModal")
        .classList.remove("show");

    editingActivityId = null;

}


function saveEditedActivity() {

    const activity =
        activities.find(
            a =>
                a.id ===
                editingActivityId
        );


    if (!activity) return;


    const start =
        value("editStart");

    const end =
        value("editEnd");


    activity.date =
        value("editDate");

    activity.details =
        value("editDetails");

    activity.start =
        start;

    activity.end =
        end;

    activity.duration =
        calculateDuration(
            start,
            end
        );


    saveAll();

    closeEditModal();

    refreshAll();

}


/* =========================================================
   ANALYTICS
========================================================= */

let activityChart = null;

let nutritionChart = null;

let calorieChart = null;


function renderAnalytics() {

    if (
        typeof Chart ===
        "undefined"
    ) return;


    const activityTotals = {

        Study:
            activities
                .filter(
                    a => a.type === "Study"
                )
                .reduce(
                    (s,a) =>
                        s + a.duration,
                    0
                ),

        Exercise:
            activities
                .filter(
                    a => a.type === "Exercise"
                )
                .reduce(
                    (s,a) =>
                        s + a.duration,
                    0
                ),

        Learning:
            activities
                .filter(
                    a => a.type === "Learning"
                )
                .reduce(
                    (s,a) =>
                        s + a.duration,
                    0
                ),

        Entertainment:
            activities
                .filter(
                    a => a.type === "Entertainment"
                )
                .reduce(
                    (s,a) =>
                        s + a.duration,
                    0
                ),

        Social:
            activities
                .filter(
                    a => a.type === "Social Media"
                )
                .reduce(
                    (s,a) =>
                        s + a.duration,
                    0
                ),

        Sleep:
            activities
                .filter(
                    a => a.type === "Sleep"
                )
                .reduce(
                    (s,a) =>
                        s + a.duration,
                    0
                )

    };


    if (activityChart)
        activityChart.destroy();


    activityChart =
        new Chart(
            el("activityChart"),
            {

                type: "doughnut",

                data: {

                    labels:
                        Object.keys(
                            activityTotals
                        ),

                    datasets: [{

                        data:
                            Object.values(
                                activityTotals
                            )

                    }]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false

                }

            }
        );


    const nutrition =
        getNutritionTotals();


    if (nutritionChart)
        nutritionChart.destroy();


    nutritionChart =
        new Chart(
            el("nutritionChart"),
            {

                type: "bar",

                data: {

                    labels: [
                        "Calories",
                        "Protein",
                        "Carbs",
                        "Fat"
                    ],

                    datasets: [{

                        data: [

                            nutrition.calories,

                            nutrition.protein,

                            nutrition.carbs,

                            nutrition.fat

                        ]

                    }]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false

                }

            }
        );


    /* DAILY CALORIES */

    const dateMap = {};


    nutritionRecords.forEach(
        record => {

            if (
                !dateMap[
                    record.date
                ]
            ) {

                dateMap[
                    record.date
                ] = 0;

            }


            dateMap[
                record.date
            ] +=
                record.calories;

        }
    );


    const dates =
        Object.keys(dateMap)
            .sort()
            .slice(-14);


    if (calorieChart)
        calorieChart.destroy();


    calorieChart =
        new Chart(
            el("calorieChart"),
            {

                type: "line",

                data: {

                    labels:
                        dates.map(
                            formatDate
                        ),

                    datasets: [{

                        label:
                            "Calories",

                        data:
                            dates.map(
                                d =>
                                    Math.round(
                                        dateMap[d]
                                    )
                            ),

                        tension: 0.3,

                        fill: false

                    }]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false

                }

            }
        );

}


/* =========================================================
   NAVIGATION
========================================================= */

function showPage(
    pageId,
    button
) {

    document
        .querySelectorAll(".page")
        .forEach(
            page =>
                page.classList.remove(
                    "active-page"
                )
        );


    const page =
        el(pageId);


    if (page)
        page.classList.add(
            "active-page"
        );


    document
        .querySelectorAll(".nav-btn")
        .forEach(
            btn =>
                btn.classList.remove(
                    "active"
                )
        );


    if (button)
        button.classList.add(
            "active"
        );


    refreshAll();

}


/* =========================================================
   REFRESH EVERYTHING
========================================================= */

function refreshAll() {

    updateDashboard();

    renderNutrition();

    updateWaterUI();

    updateMood();

    renderDailyGoals();

    renderHistory();

    renderTasks();

    renderFocusHistory();

    renderJournalHistory();

    renderBMI();

    renderAnalytics();

}


/* =========================================================
   LIVE CLOCK
========================================================= */

function updateClock() {

    const now =
        new Date();


    el("dashboardDate").textContent =
        now.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    el("liveClock").textContent =
        now.toLocaleTimeString(
            "en-IN"
        );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setTodayFields();

        updateClock();

        setInterval(
            updateClock,
            1000
        );


        if (el("foodRows"))
            addFoodRow();


        if (el("gravyRows"))
            addGravyRow();


        updateTimerDisplay();

        refreshAll();

    }
);