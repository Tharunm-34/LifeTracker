/* =========================================================
   LIFETRACK - FINAL JAVASCRIPT
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

let activities =
    JSON.parse(
        localStorage.getItem("dailyActivities") || "[]"
    );

let nutritionRecords =
    JSON.parse(
        localStorage.getItem("lifeTrackNutrition") || "[]"
    );

let bodyRecords =
    JSON.parse(
        localStorage.getItem("lifeTrackBody") || "[]"
    );

let tasks =
    JSON.parse(
        localStorage.getItem("lifeTrackTasks") || "[]"
    );

let focusSessions =
    JSON.parse(
        localStorage.getItem("lifeTrackFocus") || "[]"
    );

let journals =
    JSON.parse(
        localStorage.getItem("lifeTrackJournals") || "[]"
    );

let waterDaily =
    JSON.parse(
        localStorage.getItem("lifeTrackWaterDaily") || "{}"
    );

let moodDaily =
    JSON.parse(
        localStorage.getItem("lifeTrackMoodDaily") || "{}"
    );


/* =========================================================
   GOALS
========================================================= */

const DAILY_GOALS = {

    study: 120,

    exercise: 30,

    learning: 60,

    sleep: 480,

    screen: 180,

    calories: 2000
};


/* =========================================================
   FOOD DATABASE
========================================================= */

const foodDatabase = {

    rice: {
        name: "Cooked Rice",
        calories: 1.30,
        unit: "g",
        defaultQuantity: 200
    },

    idli: {
        name: "Idli",
        calories: 58,
        unit: "piece",
        defaultQuantity: 2
    },

    dosa: {
        name: "Dosa",
        calories: 168,
        unit: "piece",
        defaultQuantity: 1
    },

    chapati: {
        name: "Chapati",
        calories: 120,
        unit: "piece",
        defaultQuantity: 2
    },

    egg: {
        name: "Egg",
        calories: 78,
        unit: "piece",
        defaultQuantity: 1
    },

    apple: {
        name: "Apple",
        calories: .52,
        unit: "g",
        defaultQuantity: 150
    },

    banana: {
        name: "Banana",
        calories: .89,
        unit: "g",
        defaultQuantity: 100
    },

    chicken: {
        name: "Chicken",
        calories: 2.39,
        unit: "g",
        defaultQuantity: 100
    },

    biryani: {
        name: "Chicken Biryani",
        calories: 1.80,
        unit: "g",
        defaultQuantity: 250
    },

    milk: {
        name: "Milk",
        calories: .60,
        unit: "ml",
        defaultQuantity: 250
    },

    tea: {
        name: "Tea",
        calories: .40,
        unit: "ml",
        defaultQuantity: 150
    },

    coffee: {
        name: "Coffee",
        calories: .45,
        unit: "ml",
        defaultQuantity: 150
    },

    curd: {
        name: "Curd",
        calories: .60,
        unit: "g",
        defaultQuantity: 100
    },

    bread: {
        name: "Bread",
        calories: 75,
        unit: "piece",
        defaultQuantity: 2
    },

    potato: {
        name: "Potato",
        calories: .87,
        unit: "g",
        defaultQuantity: 100
    }
};


/* =========================================================
   GRAVY DATABASE
========================================================= */

const gravyDatabase = {

    sambar: {
        name: "Sambar",
        calories: .80
    },

    rasam: {
        name: "Rasam",
        calories: .40
    },

    dal: {
        name: "Dal",
        calories: 1.10
    },

    chickenGravy: {
        name: "Chicken Gravy",
        calories: 1.50
    },

    muttonGravy: {
        name: "Mutton Gravy",
        calories: 1.80
    },

    fishGravy: {
        name: "Fish Gravy",
        calories: 1.20
    },

    kurma: {
        name: "Vegetable Kurma",
        calories: 1.10
    },

    paneerGravy: {
        name: "Paneer Gravy",
        calories: 1.50
    },

    eggGravy: {
        name: "Egg Gravy",
        calories: 1.30
    },

    chutney: {
        name: "Chutney",
        calories: 1.50
    }
};


/* =========================================================
   HELPERS
========================================================= */

function getToday() {

    const d = new Date();

    return `${d.getFullYear()}-${String(
        d.getMonth()+1
    ).padStart(2,"0")}-${String(
        d.getDate()
    ).padStart(2,"0")}`;
}


function getCurrentMonth() {

    return getToday().slice(0,7);
}


function setText(id,value) {

    const el =
        document.getElementById(id);

    if (el) {
        el.textContent = value;
    }
}


function setProgress(id,value,max) {

    const el =
        document.getElementById(id);

    if (!el) return;

    const percent =
        Math.max(
            0,
            Math.min(
                100,
                (Number(value) / Number(max)) * 100
            )
        );

    el.style.width =
        `${percent}%`;
}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");
}


function calculateDuration(start,end) {

    if (!start || !end) {
        return 0;
    }

    const [sh,sm] =
        start.split(":").map(Number);

    const [eh,em] =
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


function formatDuration(minutes) {

    minutes =
        Math.round(Number(minutes) || 0);

    const h =
        Math.floor(minutes / 60);

    const m =
        minutes % 60;

    if (h > 0) {
        return `${h}h ${m}m`;
    }

    return `${m}m`;
}


/* =========================================================
   SAVE STORAGE
========================================================= */

function saveActivities() {

    localStorage.setItem(
        "dailyActivities",
        JSON.stringify(activities)
    );
}


function saveNutrition() {

    localStorage.setItem(
        "lifeTrackNutrition",
        JSON.stringify(nutritionRecords)
    );
}


function saveBody() {

    localStorage.setItem(
        "lifeTrackBody",
        JSON.stringify(bodyRecords)
    );
}


function saveTasks() {

    localStorage.setItem(
        "lifeTrackTasks",
        JSON.stringify(tasks)
    );
}


function saveFocus() {

    localStorage.setItem(
        "lifeTrackFocus",
        JSON.stringify(focusSessions)
    );
}


function saveJournals() {

    localStorage.setItem(
        "lifeTrackJournals",
        JSON.stringify(journals)
    );
}


function saveWater() {

    localStorage.setItem(
        "lifeTrackWaterDaily",
        JSON.stringify(waterDaily)
    );
}


function saveMood() {

    localStorage.setItem(
        "lifeTrackMoodDaily",
        JSON.stringify(moodDaily)
    );
}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId,button) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });

    const page =
        document.getElementById(pageId);

    if (page) {
        page.classList.add(
            "active-page"
        );
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });

    if (button) {
        button.classList.add("active");
    }


    refreshCurrentPage(pageId);
}


function refreshCurrentPage(pageId) {

    if (pageId === "dashboard") {
        renderDashboard();
    }

    if (pageId === "nutrition") {
        renderNutritionPage();
    }

    if (pageId === "planner") {
        renderTasks();
    }

    if (pageId === "focus") {
        renderFocusHistory();
    }

    if (pageId === "goals") {
        renderDailyGoals();
    }

    if (pageId === "history") {
        renderHistory();
    }

    if (pageId === "analytics") {
        renderAnalytics();
    }

    if (pageId === "journal") {
        renderJournal();
    }
}


/* =========================================================
   ACTIVITY SAVE
========================================================= */

function saveActivity(type) {

    const config = {

        Study: [
            "studyDate",
            "studyDetails",
            "studyStart",
            "studyEnd"
        ],

        Exercise: [
            "exerciseDate",
            "exerciseDetails",
            "exerciseStart",
            "exerciseEnd"
        ],

        Learning: [
            "learningDate",
            "learningDetails",
            "learningStart",
            "learningEnd"
        ],

        Entertainment: [
            "entertainmentDate",
            "entertainmentDetails",
            "entertainmentStart",
            "entertainmentEnd"
        ],

        "Social Media": [
            "socialDate",
            "socialDetails",
            "socialStart",
            "socialEnd"
        ],

        Sleep: [
            "sleepDate",
            "sleepDetails",
            "sleepStart",
            "sleepEnd"
        ]

    };


    const ids =
        config[type];

    if (!ids) return;


    const date =
        document.getElementById(ids[0]).value;

    const details =
        document.getElementById(ids[1]).value;

    const start =
        document.getElementById(ids[2]).value;

    const end =
        document.getElementById(ids[3]).value;


    if (!date ||
        !start ||
        !end) {

        alert(
            "Please enter date, start time and end time."
        );

        return;
    }


    const duration =
        calculateDuration(start,end);


    if (duration <= 0) {

        alert(
            "Please enter a valid time range."
        );

        return;
    }


    activities.push({

        id: Date.now(),

        date,

        type,

        details:
            details || "Not specified",

        start,

        end,

        duration

    });


    saveActivities();


    alert(
        `${type} activity saved successfully.`
    );


    document
        .getElementById(ids[1])
        .value = "";

    document
        .getElementById(ids[2])
        .value = "";

    document
        .getElementById(ids[3])
        .value = "";


    refreshEverything();
}


/* =========================================================
   ACTIVITY DELETE
========================================================= */

function deleteActivity(id) {

    if (!confirm(
        "Are you sure you want to delete this activity?"
    )) {
        return;
    }


    activities =
        activities.filter(
            activity =>
                String(activity.id) !==
                String(id)
        );


    saveActivities();

    refreshEverything();

    renderHistory();

    alert(
        "Activity deleted successfully."
    );
}


/* =========================================================
   ACTIVITY EDIT
========================================================= */

function openEditModal(id) {

    const activity =
        activities.find(
            a =>
                String(a.id) ===
                String(id)
        );

    if (!activity) return;


    setText(
        "editActivityId",
        activity.id
    );

    document.getElementById(
        "editActivityId"
    ).value = activity.id;

    document.getElementById(
        "editType"
    ).value = activity.type;

    document.getElementById(
        "editDate"
    ).value = activity.date;

    document.getElementById(
        "editDetails"
    ).value = activity.details;

    document.getElementById(
        "editStart"
    ).value = activity.start;

    document.getElementById(
        "editEnd"
    ).value = activity.end;


    document
        .getElementById("editModal")
        .classList.add("show");
}


function closeEditModal() {

    document
        .getElementById("editModal")
        .classList.remove("show");
}


function saveEditedActivity() {

    const id =
        document.getElementById(
            "editActivityId"
        ).value;

    const activity =
        activities.find(
            a =>
                String(a.id) ===
                String(id)
        );

    if (!activity) return;


    const date =
        document.getElementById(
            "editDate"
        ).value;

    const type =
        document.getElementById(
            "editType"
        ).value;

    const details =
        document.getElementById(
            "editDetails"
        ).value;

    const start =
        document.getElementById(
            "editStart"
        ).value;

    const end =
        document.getElementById(
            "editEnd"
        ).value;


    const duration =
        calculateDuration(
            start,
            end
        );


    if (!date ||
        !start ||
        !end ||
        duration <= 0) {

        alert(
            "Please enter valid activity details."
        );

        return;
    }


    activity.date = date;

    activity.type = type;

    activity.details =
        details || "Not specified";

    activity.start = start;

    activity.end = end;

    activity.duration = duration;


    saveActivities();

    closeEditModal();

    refreshEverything();

    alert(
        "Activity updated successfully."
    );
}


/* =========================================================
   ACTIVITY TOTAL
========================================================= */

function getTodayDuration(type) {

    return activities
        .filter(
            a =>
                a.date === getToday() &&
                a.type === type
        )
        .reduce(
            (sum,a) =>
                sum +
                Number(a.duration || 0),
            0
        );
}


/* =========================================================
   NUTRITION
========================================================= */

function getTodayNutrition() {

    return nutritionRecords.filter(
        r =>
            r.date === getToday()
    );
}


function getNutritionTotals() {

    return getTodayNutrition()
        .reduce(
            (total,r) => {

                total.calories +=
                    Number(r.calories || 0);

                total.protein +=
                    Number(r.protein || 0);

                total.carbs +=
                    Number(r.carbs || 0);

                total.fat +=
                    Number(r.fat || 0);

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
   FOOD ROW
========================================================= */

function foodOptions() {

    return Object.entries(
        foodDatabase
    )
    .map(
        ([key,item]) =>
            `<option value="${key}">
                ${item.name}
            </option>`
    )
    .join("");
}


function gravyOptions() {

    return Object.entries(
        gravyDatabase
    )
    .map(
        ([key,item]) =>
            `<option value="${key}">
                ${item.name}
            </option>`
    )
    .join("");
}


function addFoodRow() {

    const container =
        document.getElementById(
            "foodRows"
        );

    const row =
        document.createElement("div");

    row.className =
        "food-row";


    row.innerHTML = `

        <div class="input-group">

            <label>Food</label>

            <select class="food-select"
                onchange="updateMealEstimate()">

                ${foodOptions()}

            </select>

        </div>


        <div class="input-group">

            <label>Quantity</label>

            <input
                type="number"
                class="food-quantity"
                min="0"
                value="100"
                onchange="updateMealEstimate()">

        </div>


        <div class="input-group">

            <label>Unit</label>

            <input
                class="food-unit"
                value="g"
                readonly>

        </div>


        <button
            class="remove-row"
            onclick="this.parentElement.remove();updateMealEstimate()">

            <i class="fa-solid fa-trash"></i>

        </button>

    `;


    container.appendChild(row);

    updateFoodUnit(row);

    row.querySelector(
        ".food-select"
    ).addEventListener(
        "change",
        () => updateFoodUnit(row)
    );

    updateMealEstimate();
}


function updateFoodUnit(row) {

    const select =
        row.querySelector(
            ".food-select"
        );

    const unit =
        row.querySelector(
            ".food-unit"
        );

    const quantity =
        row.querySelector(
            ".food-quantity"
        );

    const item =
        foodDatabase[
            select.value
        ];

    if (!item) return;

    unit.value =
        item.unit;

    quantity.value =
        item.defaultQuantity;

    updateMealEstimate();
}


/* =========================================================
   GRAVY ROW
========================================================= */

function addGravyRow() {

    const container =
        document.getElementById(
            "gravyRows"
        );

    const row =
        document.createElement("div");

    row.className =
        "gravy-row";


    row.innerHTML = `

        <div class="input-group">

            <label>Gravy</label>

            <select class="gravy-select"
                onchange="updateMealEstimate()">

                ${gravyOptions()}

            </select>

        </div>


        <div class="input-group">

            <label>Quantity (g)</label>

            <input
                type="number"
                class="gravy-quantity"
                min="0"
                value="50"
                onchange="updateMealEstimate()">

        </div>


        <div class="input-group">

            <label>Calories / g</label>

            <input
                class="gravy-unit"
                value="0.8"
                readonly>

        </div>


        <button
            class="remove-row"
            onclick="this.parentElement.remove();updateMealEstimate()">

            <i class="fa-solid fa-trash"></i>

        </button>

    `;


    container.appendChild(row);


    row.querySelector(
        ".gravy-select"
    ).addEventListener(
        "change",
        () => {

            const key =
                row.querySelector(
                    ".gravy-select"
                ).value;

            row.querySelector(
                ".gravy-unit"
            ).value =
                gravyDatabase[key].calories;

            updateMealEstimate();

        }
    );


    updateMealEstimate();
}


/* =========================================================
   MEAL CALCULATION
========================================================= */

function calculateMealCalories() {

    let calories = 0;


    document
        .querySelectorAll(".food-row")
        .forEach(row => {

            const key =
                row.querySelector(
                    ".food-select"
                ).value;

            const quantity =
                Number(
                    row.querySelector(
                        ".food-quantity"
                    ).value
                ) || 0;

            const item =
                foodDatabase[key];

            if (item) {

                calories +=
                    item.calories *
                    quantity;
            }

        });


    document
        .querySelectorAll(".gravy-row")
        .forEach(row => {

            const key =
                row.querySelector(
                    ".gravy-select"
                ).value;

            const quantity =
                Number(
                    row.querySelector(
                        ".gravy-quantity"
                    ).value
                ) || 0;

            const item =
                gravyDatabase[key];

            if (item) {

                calories +=
                    item.calories *
                    quantity;
            }

        });


    return calories;
}


function updateMealEstimate() {

    const calories =
        calculateMealCalories();

    setText(
        "mealEstimatedCalories",
        `${Math.round(calories)} kcal`
    );
}


/* =========================================================
   SAVE FOOD MEAL
========================================================= */

function saveFoodMeal() {

    const date =
        document.getElementById(
            "foodDate"
        ).value || getToday();

    const meal =
        document.getElementById(
            "foodMeal"
        ).value;


    const foodNames = [];

    let calories = 0;


    document
        .querySelectorAll(".food-row")
        .forEach(row => {

            const key =
                row.querySelector(
                    ".food-select"
                ).value;

            const quantity =
                Number(
                    row.querySelector(
                        ".food-quantity"
                    ).value
                ) || 0;

            const item =
                foodDatabase[key];

            if (item &&
                quantity > 0) {

                foodNames.push(
                    `${item.name} (${quantity}${item.unit})`
                );

                calories +=
                    item.calories *
                    quantity;
            }

        });


    document
        .querySelectorAll(".gravy-row")
        .forEach(row => {

            const key =
                row.querySelector(
                    ".gravy-select"
                ).value;

            const quantity =
                Number(
                    row.querySelector(
                        ".gravy-quantity"
                    ).value
                ) || 0;

            const item =
                gravyDatabase[key];

            if (item &&
                quantity > 0) {

                foodNames.push(
                    `${item.name} (${quantity}g)`
                );

                calories +=
                    item.calories *
                    quantity;
            }

        });


    if (foodNames.length === 0) {

        alert(
            "Please add at least one food item."
        );

        return;
    }


    /*
       These macro values are intentionally
       approximate/zero because the food database
       primarily provides calorie estimates.
    */

    nutritionRecords.push({

        id: Date.now(),

        date,

        meal,

        food:
            foodNames.join(", "),

        calories,

        protein: 0,

        carbs: 0,

        fat: 0

    });


    saveNutrition();


    alert(
        "Nutrition record saved successfully."
    );


    document.getElementById(
        "foodRows"
    ).innerHTML = "";

    document.getElementById(
        "gravyRows"
    ).innerHTML = "";


    addFoodRow();

    renderNutritionPage();

    renderDashboard();

    renderDailyGoals();
}


/* =========================================================
   DELETE NUTRITION
========================================================= */

function deleteNutrition(id) {

    if (!confirm(
        "Are you sure you want to delete this nutrition item?"
    )) {
        return;
    }


    nutritionRecords =
        nutritionRecords.filter(
            record =>
                String(record.id) !==
                String(id)
        );


    saveNutrition();

    renderNutritionPage();

    renderDashboard();

    renderDailyGoals();

    renderAnalytics();


    alert(
        "Nutrition item deleted successfully."
    );
}


/* =========================================================
   RENDER NUTRITION
========================================================= */

function renderNutritionPage() {

    const totals =
        getNutritionTotals();


    setText(
        "nutritionCalories",
        Math.round(totals.calories)
    );

    setText(
        "nutritionProtein",
        Math.round(totals.protein)
    );

    setText(
        "nutritionCarbs",
        Math.round(totals.carbs)
    );

    setText(
        "nutritionFat",
        Math.round(totals.fat)
    );


    const list =
        document.getElementById(
            "nutritionList"
        );

    if (!list) return;


    const records =
        getTodayNutrition();


    if (records.length === 0) {

        list.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-utensils"></i>

                <p>
                    No nutrition records for today.
                </p>

            </div>

        `;

    } else {

        list.innerHTML =
            records
            .map(
                record => `

                <div class="nutrition-item">

                    <strong>
                        ${escapeHTML(record.food)}
                    </strong>

                    <span>
                        ${escapeHTML(record.meal)}
                    </span>

                    <small>
                        🔥
                        ${Math.round(record.calories)}
                        kcal
                    </small>

                    <small>
                        💪
                        ${Math.round(record.protein)}
                        g
                    </small>

                    <small>
                        🍚
                        ${Math.round(record.carbs)}
                        g
                    </small>

                    <small>
                        🥑
                        ${Math.round(record.fat)}
                        g
                    </small>

                    <button
                        class="delete-nutrition"
                        onclick="deleteNutrition('${record.id}')"
                        title="Delete nutrition">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `
            )
            .join("");
    }


    updateMacroBars(totals);

    updateBMI();

    renderWeightChart();
}


/* =========================================================
   MACRO BARS
========================================================= */

function updateMacroBars(totals) {

    setText(
        "macroProteinText",
        `${Math.round(totals.protein)} g`
    );

    setText(
        "macroCarbsText",
        `${Math.round(totals.carbs)} g`
    );

    setText(
        "macroFatText",
        `${Math.round(totals.fat)} g`
    );


    setProgress(
        "macroProteinBar",
        totals.protein,
        100
    );

    setProgress(
        "macroCarbsBar",
        totals.carbs,
        300
    );

    setProgress(
        "macroFatBar",
        totals.fat,
        80
    );
}


/* =========================================================
   BODY
========================================================= */

function saveBodyData() {

    const date =
        document.getElementById(
            "bodyDate"
        ).value || getToday();

    const weight =
        Number(
            document.getElementById(
                "weightInput"
            ).value
        );

    const height =
        Number(
            document.getElementById(
                "heightInput"
            ).value
        );


    if (weight <= 0 ||
        height <= 0) {

        alert(
            "Please enter valid weight and height."
        );

        return;
    }


    const existing =
        bodyRecords.find(
            record =>
                record.date === date
        );


    if (existing) {

        existing.weight =
            weight;

        existing.height =
            height;

    } else {

        bodyRecords.push({

            id: Date.now(),

            date,

            weight,

            height

        });

    }


    saveBody();

    updateBMI();

    renderWeightChart();


    alert(
        "Body measurement saved."
    );
}


/* =========================================================
   BMI
========================================================= */

function updateBMI() {

    if (bodyRecords.length === 0) {

        setText(
            "bmiValue",
            "--"
        );

        setText(
            "bmiStatus",
            "Enter height & weight"
        );

        return;
    }


    const latest =
        [...bodyRecords]
        .sort(
            (a,b) =>
                b.date.localeCompare(
                    a.date
                )
        )[0];


    const heightMeters =
        Number(latest.height) / 100;

    const weight =
        Number(latest.weight);


    if (heightMeters <= 0 ||
        weight <= 0) {
        return;
    }


    const bmi =
        weight /
        (heightMeters *
         heightMeters);


    setText(
        "bmiValue",
        bmi.toFixed(1)
    );


    let status;


    if (bmi < 18.5) {

        status =
            "Below 18.5";

    } else if (bmi < 25) {

        status =
            "18.5 – 24.9";

    } else if (bmi < 30) {

        status =
            "25 – 29.9";

    } else {

        status =
            "30 or above";
    }


    setText(
        "bmiStatus",
        status
    );
}


/* =========================================================
   WEIGHT CHART
========================================================= */

let weightChartInstance = null;

function renderWeightChart() {

    const canvas =
        document.getElementById(
            "weightChart"
        );

    if (!canvas ||
        typeof Chart === "undefined") {
        return;
    }


    const records =
        [...bodyRecords]
        .sort(
            (a,b) =>
                a.date.localeCompare(
                    b.date
                )
        );


    if (weightChartInstance) {

        weightChartInstance.destroy();

    }


    weightChartInstance =
        new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels:
                        records.map(
                            r => r.date
                        ),

                    datasets: [

                        {

                            label:
                                "Weight (kg)",

                            data:
                                records.map(
                                    r => r.weight
                                ),

                            tension: .3,

                            fill: true

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false,

                    scales: {

                        y: {

                            beginAtZero:
                                false

                        }

                    }

                }

            }
        );
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    updateGreeting();

    updateClock();

    updateDashboardCards();

    updateProductivity();

    updateStreak();

    updateWater();

    updateMood();

    updateSmartCoach();

    updateSmartInsight();

    updateNutritionSnapshot();
}


function updateGreeting() {

    const hour =
        new Date().getHours();

    let greeting =
        "Good Evening";


    if (hour < 12) {

        greeting =
            "Good Morning";

    } else if (hour < 17) {

        greeting =
            "Good Afternoon";
    }


    setText(
        "greetingText",
        `${greeting}!`
    );


    setText(
        "heroDate",
        new Date().toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        )
    );
}


function updateClock() {

    setText(
        "liveClock",
        new Date().toLocaleTimeString(
            "en-IN",
            {
                hour12: false
            }
        )
    );
}


/* =========================================================
   DASHBOARD CARDS
========================================================= */

function updateDashboardCards() {

    const study =
        getTodayDuration("Study");

    const exercise =
        getTodayDuration("Exercise");

    const learning =
        getTodayDuration("Learning");

    const entertainment =
        getTodayDuration(
            "Entertainment"
        );

    const social =
        getTodayDuration(
            "Social Media"
        );

    const sleep =
        getTodayDuration("Sleep");

    const nutrition =
        getNutritionTotals();


    const screen =
        entertainment + social;


    setText(
        "dashStudy",
        `${study} min`
    );

    setText(
        "dashExercise",
        `${exercise} min`
    );

    setText(
        "dashLearning",
        `${learning} min`
    );

    setText(
        "dashCalories",
        `${Math.round(nutrition.calories)} kcal`
    );

    setText(
        "dashSleep",
        `${sleep} min`
    );

    setText(
        "dashScreen",
        `${screen} min`
    );


    setProgress(
        "studyMiniBar",
        study,
        DAILY_GOALS.study
    );

    setProgress(
        "exerciseMiniBar",
        exercise,
        DAILY_GOALS.exercise
    );

    setProgress(
        "learningMiniBar",
        learning,
        DAILY_GOALS.learning
    );

    setProgress(
        "sleepMiniBar",
        sleep,
        DAILY_GOALS.sleep
    );

    setProgress(
        "screenMiniBar",
        screen,
        DAILY_GOALS.screen
    );

    setProgress(
        "calorieMiniBar",
        nutrition.calories,
        DAILY_GOALS.calories
    );
}


/* =========================================================
   NUTRITION SNAPSHOT
========================================================= */

function updateNutritionSnapshot() {

    const totals =
        getNutritionTotals();


    setText(
        "dashNutritionCalories",
        Math.round(totals.calories)
    );

    setText(
        "dashProtein",
        Math.round(totals.protein)
    );

    setText(
        "dashCarbs",
        Math.round(totals.carbs)
    );

    setText(
        "dashFat",
        Math.round(totals.fat)
    );
}


/* =========================================================
   PRODUCTIVITY
========================================================= */

function updateProductivity() {

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


    const scores = [

        Math.min(
            100,
            study /
            DAILY_GOALS.study *
            100
        ),

        Math.min(
            100,
            exercise /
            DAILY_GOALS.exercise *
            100
        ),

        Math.min(
            100,
            learning /
            DAILY_GOALS.learning *
            100
        ),

        Math.min(
            100,
            sleep /
            DAILY_GOALS.sleep *
            100
        ),

        Math.max(
            0,
            100 -
            screen /
            DAILY_GOALS.screen *
            100
        )

    ];


    const percent =
        Math.round(
            scores.reduce(
                (a,b) => a+b,
                0
            ) /
            scores.length
        );


    setText(
        "productivityPercent",
        `${percent}%`
    );


    const ring =
        document.getElementById(
            "productivityRing"
        );


    if (ring) {

        const degrees =
            percent * 3.6;

        ring.style.background =
            `conic-gradient(
                #22d3ee ${degrees}deg,
                rgba(148,163,184,.12)
                ${degrees}deg
            )`;
    }


    let status =
        "Start your day";

    let message =
        "Add your activities to calculate productivity.";


    if (percent >= 80) {

        status =
            "Excellent productivity";

        message =
            "Your recorded routine is looking strong.";

    } else if (percent >= 60) {

        status =
            "Good progress";

        message =
            "You're building a productive routine.";

    } else if (percent >= 40) {

        status =
            "Keep going";

        message =
            "Complete a few more activities today.";
    }


    setText(
        "productivityStatus",
        status
    );

    setText(
        "productivityMessage",
        message
    );

    setText(
        "completedGoals",
        `${countCompletedGoals()} / 6`
    );
}


/* =========================================================
   GOALS COUNT
========================================================= */

function countCompletedGoals() {

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


    let count = 0;


    if (study >= DAILY_GOALS.study)
        count++;

    if (exercise >= DAILY_GOALS.exercise)
        count++;

    if (learning >= DAILY_GOALS.learning)
        count++;

    if (sleep >= DAILY_GOALS.sleep)
        count++;

    if (screen <= DAILY_GOALS.screen)
        count++;

    if (calories > 0 &&
        calories <= DAILY_GOALS.calories)
        count++;


    return count;
}


/* =========================================================
   STREAK
========================================================= */

function updateStreak() {

    let streak = 0;

    const today =
        new Date();


    for (
        let i = 0;
        i < 365;
        i++
    ) {

        const date =
            new Date(today);

        date.setDate(
            today.getDate() - i
        );


        const key =
            `${date.getFullYear()}-${String(
                date.getMonth()+1
            ).padStart(2,"0")}-${String(
                date.getDate()
            ).padStart(2,"0")}`;


        const exists =
            activities.some(
                a =>
                    a.date === key
            );


        if (exists) {

            streak++;

        } else {

            break;
        }
    }


    setText(
        "streakCount",
        streak
    );


    const container =
        document.getElementById(
            "streakDays"
        );

    if (!container) return;


    container.innerHTML = "";


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            new Date();

        date.setDate(
            date.getDate() - i
        );


        const key =
            `${date.getFullYear()}-${String(
                date.getMonth()+1
            ).padStart(2,"0")}-${String(
                date.getDate()
            ).padStart(2,"0")}`;


        const active =
            activities.some(
                a =>
                    a.date === key
            );


        const div =
            document.createElement("div");

        div.className =
            "streak-day" +
            (active ? " active" : "");

        div.textContent =
            String(
                date.getDate()
            );


        container.appendChild(div);
    }
}


/* =========================================================
   SMART COACH
========================================================= */

function updateSmartCoach() {

    const study =
        getTodayDuration("Study");

    const exercise =
        getTodayDuration("Exercise");

    const sleep =
        getTodayDuration("Sleep");

    const screen =
        getTodayDuration("Entertainment") +
        getTodayDuration("Social Media");


    let title =
        "Ready to begin";

    let message =
        "Start logging your activities.";


    if (sleep > 0 &&
        sleep < 420) {

        title =
            "Focus on sleep";

        message =
            "Your recorded sleep is below 7 hours. Consider giving yourself more recovery time.";

    } else if (screen > 180) {

        title =
            "Reduce screen time";

        message =
            "Your recorded entertainment and social media time has passed the general daily target.";

    } else if (exercise === 0) {

        title =
            "Move your body";

        message =
            "Try adding at least a short exercise session today.";

    } else if (study < 120) {

        title =
            "Build study time";

        message =
            "You can use the Focus Timer to complete a focused study session.";

    } else {

        title =
            "Nice routine";

        message =
            "Keep recording your day and maintain consistency.";
    }


    setText(
        "coachTitle",
        title
    );

    setText(
        "coachMessage",
        message
    );
}


/* =========================================================
   SMART INSIGHT
========================================================= */

function updateSmartInsight() {

    const study =
        getTodayDuration("Study");

    const exercise =
        getTodayDuration("Exercise");

    const learning =
        getTodayDuration("Learning");

    const calories =
        getNutritionTotals().calories;


    let title =
        "Build your first record";

    let message =
        "LifeTrack becomes more useful as you record your routine.";


    if (study >= 120 &&
        exercise >= 30) {

        title =
            "Balanced productivity";

        message =
            "You have recorded both study and exercise today.";

    } else if (study >= 120) {

        title =
            "Strong study session";

        message =
            "Your study target has been reached. Consider adding movement.";

    } else if (learning >= 60) {

        title =
            "Learning momentum";

        message =
            "You have invested time in learning something new today.";

    } else if (calories > 0) {

        title =
            "Nutrition recorded";

        message =
            "Your nutrition record is now included in today's dashboard.";
    }


    setText(
        "smartInsightTitle",
        title
    );

    setText(
        "smartInsightMessage",
        message
    );
}


/* =========================================================
   WATER
========================================================= */

function getTodayWater() {

    return Number(
        waterDaily[getToday()] || 0
    );
}


function changeWater(amount) {

    let value =
        getTodayWater();

    value += amount;

    value =
        Math.max(
            0,
            Math.min(20,value)
        );


    waterDaily[getToday()] =
        value;

    saveWater();

    updateWater();
}


function resetWater() {

    waterDaily[getToday()] =
        0;

    saveWater();

    updateWater();
}


function updateWater() {

    const count =
        getTodayWater();


    setText(
        "waterCount",
        count
    );


    const fill =
        document.getElementById(
            "waterFill"
        );


    if (fill) {

        fill.style.height =
            `${Math.min(
                100,
                count / 8 * 100
            )}%`;
    }
}


/* =========================================================
   MOOD
========================================================= */

function selectMood(mood,button) {

    moodDaily[getToday()] =
        mood;

    saveMood();


    document
        .querySelectorAll(".mood-btn")
        .forEach(
            btn =>
                btn.classList.remove(
                    "selected"
                )
        );


    if (button) {

        button.classList.add(
            "selected"
        );
    }


    setText(
        "selectedMood",
        mood
    );
}


function updateMood() {

    const mood =
        moodDaily[getToday()];


    setText(
        "selectedMood",
        mood || "Not selected"
    );


    document
        .querySelectorAll(".mood-btn")
        .forEach(btn => {

            btn.classList.remove(
                "selected"
            );

            if (
                btn.textContent
                    .toLowerCase()
                    .includes(
                        String(mood)
                            .toLowerCase()
                    )
            ) {

                btn.classList.add(
                    "selected"
                );
            }

        });
}


/* =========================================================
   PLANNER
========================================================= */

function saveTask() {

    const date =
        document.getElementById(
            "taskDate"
        ).value || getToday();

    const name =
        document.getElementById(
            "taskName"
        ).value.trim();

    const start =
        document.getElementById(
            "taskStart"
        ).value;

    const end =
        document.getElementById(
            "taskEnd"
        ).value;

    const priority =
        document.getElementById(
            "taskPriority"
        ).value;


    if (!name) {

        alert(
            "Please enter a task."
        );

        return;
    }


    tasks.push({

        id: Date.now(),

        date,

        name,

        start,

        end,

        priority,

        completed: false

    });


    saveTasks();

    document.getElementById(
        "taskName"
    ).value = "";

    renderTasks();
}


function toggleTask(id) {

    const task =
        tasks.find(
            t =>
                String(t.id) ===
                String(id)
        );

    if (!task) return;

    task.completed =
        !task.completed;

    saveTasks();

    renderTasks();
}


function deleteTask(id) {

    if (!confirm(
        "Delete this task?"
    )) {
        return;
    }


    tasks =
        tasks.filter(
            t =>
                String(t.id) !==
                String(id)
        );

    saveTasks();

    renderTasks();
}


function renderTasks() {

    const list =
        document.getElementById(
            "taskList"
        );

    if (!list) return;


    const today =
        getToday();


    const todayTasks =
        tasks.filter(
            t =>
                t.date === today
        );


    if (todayTasks.length === 0) {

        list.innerHTML = `

            <div class="empty-state">
                No tasks for today.
            </div>

        `;

        return;
    }


    list.innerHTML =
        todayTasks
        .map(
            task => `

            <div class="task-item
                ${task.completed
                    ? "completed"
                    : ""}">

                <div class="task-info">

                    <h3 class="task-name">
                        ${escapeHTML(task.name)}
                    </h3>

                    <p>

                        ${task.start || "--"}
                        →
                        ${task.end || "--"}

                        ·

                        <span class="priority-${task.priority.toLowerCase()}">

                            ${task.priority}

                        </span>

                    </p>

                </div>


                <div class="task-actions">

                    <button
                        onclick="toggleTask('${task.id}')"
                        title="Complete">

                        <i class="fa-solid
                            fa-check"></i>

                    </button>


                    <button
                        onclick="deleteTask('${task.id}')"
                        title="Delete">

                        <i class="fa-solid
                            fa-trash"></i>

                    </button>

                </div>

            </div>

        `
        )
        .join("");
}


/* =========================================================
   FOCUS TIMER
========================================================= */

let timerMinutes = 25;

let timerSeconds = 0;

let timerRunning = false;

let timerInterval = null;

let timerStartedAt = null;


function setTimer(minutes) {

    pauseTimer();

    timerMinutes =
        minutes;

    timerSeconds =
        0;

    updateTimerDisplay();
}


function updateTimerDisplay() {

    const min =
        String(timerMinutes)
            .padStart(2,"0");

    const sec =
        String(timerSeconds)
            .padStart(2,"0");


    setText(
        "timerDisplay",
        `${min}:${sec}`
    );
}


function startTimer() {

    if (timerRunning) {
        return;
    }


    timerRunning =
        true;


    if (!timerStartedAt) {

        timerStartedAt =
            Date.now();
    }


    timerInterval =
        setInterval(
            () => {

                if (
                    timerMinutes === 0 &&
                    timerSeconds === 0
                ) {

                    finishTimer();

                    return;
                }


                if (timerSeconds > 0) {

                    timerSeconds--;

                } else {

                    timerMinutes--;

                    timerSeconds =
                        59;
                }


                updateTimerDisplay();

            },
            1000
        );
}


function pauseTimer() {

    timerRunning =
        false;


    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval =
            null;
    }
}


function resetTimer() {

    pauseTimer();

    timerStartedAt =
        null;

    timerMinutes =
        25;

    timerSeconds =
        0;

    updateTimerDisplay();
}


function finishTimer() {

    pauseTimer();


    const sessionMinutes =
        timerStartedAt
            ? Math.max(
                1,
                Math.round(
                    (Date.now() -
                     timerStartedAt) /
                    60000
                )
            )
            : 25;


    focusSessions.push({

        id: Date.now(),

        date: getToday(),

        minutes:
            Math.min(
                timerMinutes + sessionMinutes,
                60
            )

    });


    saveFocus();


    alert(
        "Focus session completed!"
    );


    timerStartedAt =
        null;

    timerMinutes =
        25;

    timerSeconds =
        0;

    updateTimerDisplay();

    renderFocusHistory();
}


function recordManualFocus(minutes) {

    focusSessions.push({

        id: Date.now(),

        date: getToday(),

        minutes

    });

    saveFocus();

    renderFocusHistory();
}


function renderFocusHistory() {

    const list =
        document.getElementById(
            "focusHistory"
        );

    if (!list) return;


    const records =
        focusSessions
        .filter(
            s =>
                s.date === getToday()
        )
        .reverse();


    if (records.length === 0) {

        list.innerHTML = `

            <div class="empty-state">
                No focus sessions recorded.
            </div>

        `;

        return;
    }


    list.innerHTML =
        records
        .map(
            record => `

            <div class="task-item">

                <div class="task-info">

                    <h3>
                        Focus Session
                    </h3>

                    <p>
                        ${record.minutes} minutes
                    </p>

                </div>

                <i class="fa-solid
                    fa-check"
                    style="color:#22c55e">
                </i>

            </div>

        `
        )
        .join("");
}


/* =========================================================
   DAILY GOALS
========================================================= */

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
        "goalStudy",
        "goalStudyText",
        study,
        DAILY_GOALS.study,
        "min"
    );

    updateGoal(
        "goalExercise",
        "goalExerciseText",
        exercise,
        DAILY_GOALS.exercise,
        "min"
    );

    updateGoal(
        "goalLearning",
        "goalLearningText",
        learning,
        DAILY_GOALS.learning,
        "min"
    );

    updateGoal(
        "goalSleep",
        "goalSleepText",
        sleep,
        DAILY_GOALS.sleep,
        "min"
    );

    updateGoal(
        "goalScreen",
        "goalScreenText",
        screen,
        DAILY_GOALS.screen,
        "min"
    );

    updateGoal(
        "goalCalories",
        "goalCaloriesText",
        calories,
        DAILY_GOALS.calories,
        "kcal"
    );


    const score =
        Math.round(
            (
                Math.min(
                    100,
                    study /
                    DAILY_GOALS.study *
                    100
                ) +

                Math.min(
                    100,
                    exercise /
                    DAILY_GOALS.exercise *
                    100
                ) +

                Math.min(
                    100,
                    learning /
                    DAILY_GOALS.learning *
                    100
                ) +

                Math.min(
                    100,
                    sleep /
                    DAILY_GOALS.sleep *
                    100
                ) +

                Math.max(
                    0,
                    100 -
                    screen /
                    DAILY_GOALS.screen *
                    100
                ) +

                Math.min(
                    100,
                    calories /
                    DAILY_GOALS.calories *
                    100
                )

            ) / 6
        );


    setText(
        "goalScore",
        `${score}%`
    );


    const circle =
        document.getElementById(
            "goalScoreCircle"
        );


    if (circle) {

        circle.style.background =
            `conic-gradient(
                var(--cyan)
                ${score * 3.6}deg,
                rgba(148,163,184,.12)
                ${score * 3.6}deg
            )`;
    }
}


function updateGoal(
    barId,
    textId,
    value,
    target,
    unit
) {

    setProgress(
        barId,
        value,
        target
    );


    setText(
        textId,
        `${Math.round(value)} / ${target} ${unit}`
    );
}


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

    const date =
        document.getElementById(
            "historyDate"
        ).value;


    let records;


    if (date) {

        records =
            activities.filter(
                a =>
                    a.date === date
            );

    } else {

        records =
            [...activities]
            .sort(
                (a,b) =>
                    b.date.localeCompare(
                        a.date
                    )
            );
    }


    renderHistorySummary(
        records
    );


    const list =
        document.getElementById(
            "historyList"
        );

    if (!list) return;


    if (records.length === 0) {

        list.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid
                    fa-calendar-xmark">
                </i>

                <p>
                    No activities found.
                </p>

            </div>

        `;

        return;
    }


    list.innerHTML =
        records
        .map(
            a => `

            <div class="activity-item">

                <div class="activity-main">

                    <h3>
                        ${escapeHTML(a.type)}
                    </h3>

                    <p>

                        ${escapeHTML(a.details)}

                        <br>

                        📅 ${a.date}

                        <br>

                        ⏱️ ${a.start}
                        →
                        ${a.end}

                        ·

                        ${formatDuration(a.duration)}

                    </p>

                </div>


                <div class="activity-actions">

                    <button
                        onclick="openEditModal('${a.id}')"
                        title="Edit">

                        <i class="fa-solid
                            fa-pen"></i>

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteActivity('${a.id}')"
                        title="Delete">

                        <i class="fa-solid
                            fa-trash"></i>

                    </button>

                </div>

            </div>

        `
        )
        .join("");
}


function renderHistorySummary(records) {

    const summary =
        document.getElementById(
            "historySummary"
        );

    if (!summary) return;


    const total =
        records.length;


    const minutes =
        records.reduce(
            (sum,a) =>
                sum +
                Number(a.duration || 0),
            0
        );


    const study =
        records
        .filter(
            a => a.type === "Study"
        )
        .reduce(
            (sum,a) =>
                sum +
                Number(a.duration || 0),
            0
        );


    const exercise =
        records
        .filter(
            a => a.type === "Exercise"
        )
        .reduce(
            (sum,a) =>
                sum +
                Number(a.duration || 0),
            0
        );


    summary.innerHTML = `

        <div class="summary-card">

            <span>Records</span>

            <strong>
                ${total}
            </strong>

        </div>


        <div class="summary-card">

            <span>Total Time</span>

            <strong>
                ${formatDuration(minutes)}
            </strong>

        </div>


        <div class="summary-card">

            <span>Study</span>

            <strong>
                ${formatDuration(study)}
            </strong>

        </div>


        <div class="summary-card">

            <span>Exercise</span>

            <strong>
                ${formatDuration(exercise)}
            </strong>

        </div>

    `;
}


function showAllHistory() {

    document.getElementById(
        "historyDate"
    ).value = "";

    renderHistory();
}


/* =========================================================
   ANALYTICS
========================================================= */

let activityChartInstance = null;

let nutritionChartInstance = null;

let monthlyChartInstance = null;


function renderAnalytics() {

    const month =
        document.getElementById(
            "analyticsMonth"
        ).value ||
        getCurrentMonth();


    const records =
        activities.filter(
            a =>
                a.date.startsWith(
                    month
                )
        );


    const types = [

        "Study",
        "Exercise",
        "Learning",
        "Entertainment",
        "Social Media",
        "Sleep"

    ];


    const durations =
        types.map(
            type =>
                records
                .filter(
                    a =>
                        a.type === type
                )
                .reduce(
                    (sum,a) =>
                        sum +
                        Number(
                            a.duration || 0
                        ),
                    0
                )
        );


    renderActivityChart(
        types,
        durations
    );


    const nutrition =
        nutritionRecords.filter(
            r =>
                r.date.startsWith(
                    month
                )
        );


    const nutritionByMeal = {

        Breakfast: 0,
        Lunch: 0,
        Snacks: 0,
        Dinner: 0

    };


    nutrition.forEach(
        record => {

            if (
                nutritionByMeal[
                    record.meal
                ] !== undefined
            ) {

                nutritionByMeal[
                    record.meal
                ] +=
                    Number(
                        record.calories || 0
                    );
            }

        }
    );


    renderNutritionChart(
        nutritionByMeal
    );


    renderMonthlyChart(
        month
    );
}


/* =========================================================
   ACTIVITY CHART
========================================================= */

function renderActivityChart(
    labels,
    data
) {

    const canvas =
        document.getElementById(
            "activityChart"
        );

    if (!canvas ||
        typeof Chart === "undefined") {
        return;
    }


    if (activityChartInstance) {

        activityChartInstance.destroy();
    }


    activityChartInstance =
        new Chart(
            canvas,
            {

                type: "doughnut",

                data: {

                    labels,

                    datasets: [

                        {
                            data
                        }

                    ]

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
   NUTRITION CHART
========================================================= */

function renderNutritionChart(data) {

    const canvas =
        document.getElementById(
            "nutritionChart"
        );

    if (!canvas ||
        typeof Chart === "undefined") {
        return;
    }


    if (nutritionChartInstance) {

        nutritionChartInstance.destroy();
    }


    nutritionChartInstance =
        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels:
                        Object.keys(data),

                    datasets: [

                        {

                            label:
                                "Calories",

                            data:
                                Object.values(data)

                        }

                    ]

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
   MONTHLY CHART
========================================================= */

function renderMonthlyChart(month) {

    const canvas =
        document.getElementById(
            "monthlyChart"
        );

    if (!canvas ||
        typeof Chart === "undefined") {
        return;
    }


    const labels = [];

    const values = [];


    for (
        let day = 1;
        day <= 31;
        day++
    ) {

        const date =
            `${month}-${String(day)
                .padStart(2,"0")}`;


        const records =
            activities.filter(
                a =>
                    a.date === date
            );


        if (
            records.length === 0 &&
            day > 28
        ) {

            const check =
                new Date(
                    `${date}T00:00:00`
                );

            if (
                check.getMonth() + 1 !==
                Number(month.slice(5,7))
            ) {
                break;
            }
        }


        labels.push(
            String(day)
        );


        values.push(
            records.reduce(
                (sum,a) =>
                    sum +
                    Number(
                        a.duration || 0
                    ),
                0
            )
        );
    }


    if (monthlyChartInstance) {

        monthlyChartInstance.destroy();
    }


    monthlyChartInstance =
        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels,

                    datasets: [

                        {

                            label:
                                "Activity Minutes",

                            data:
                                values

                        }

                    ]

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
   JOURNAL
========================================================= */

function saveJournal() {

    const date =
        document.getElementById(
            "journalDate"
        ).value || getToday();

    const accomplishments =
        document.getElementById(
            "journalAccomplishments"
        ).value;

    const improve =
        document.getElementById(
            "journalImprove"
        ).value;

    const tomorrow =
        document.getElementById(
            "journalTomorrow"
        ).value;


    const existing =
        journals.find(
            j =>
                j.date === date
        );


    if (existing) {

        existing.accomplishments =
            accomplishments;

        existing.improve =
            improve;

        existing.tomorrow =
            tomorrow;

    } else {

        journals.push({

            id: Date.now(),

            date,

            accomplishments,

            improve,

            tomorrow

        });

    }


    saveJournals();

    renderJournal();


    alert(
        "Journal saved successfully."
    );
}


function renderJournal() {

    const date =
        document.getElementById(
            "journalDate"
        ).value ||
        getToday();


    const journal =
        journals.find(
            j =>
                j.date === date
        );


    if (journal) {

        document.getElementById(
            "journalAccomplishments"
        ).value =
            journal.accomplishments || "";

        document.getElementById(
            "journalImprove"
        ).value =
            journal.improve || "";

        document.getElementById(
            "journalTomorrow"
        ).value =
            journal.tomorrow || "";

    }


    renderDailyReport();
}


/* =========================================================
   DAILY REPORT
========================================================= */

function renderDailyReport() {

    const container =
        document.getElementById(
            "dailyReport"
        );

    if (!container) return;


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

    const water =
        getTodayWater();

    const mood =
        moodDaily[getToday()] ||
        "Not selected";


    container.innerHTML = `

        <strong>
            Today's Summary
        </strong>

        <br>

        📚 Study:
        ${formatDuration(study)}

        <br>

        🏋️ Exercise:
        ${formatDuration(exercise)}

        <br>

        🧠 Learning:
        ${formatDuration(learning)}

        <br>

        😴 Sleep:
        ${formatDuration(sleep)}

        <br>

        📱 Screen Time:
        ${formatDuration(screen)}

        <br>

        🔥 Calories:
        ${Math.round(calories)} kcal

        <br>

        💧 Water:
        ${water} glasses

        <br>

        😊 Mood:
        ${escapeHTML(mood)}

    `;
}


/* =========================================================
   REFRESH EVERYTHING
========================================================= */

function refreshEverything() {

    renderDashboard();

    renderNutritionPage();

    renderTasks();

    renderFocusHistory();

    renderDailyGoals();

    renderHistory();

    renderAnalytics();

    renderJournal();
}


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeDates() {

    const today =
        getToday();


    const ids = [

        "studyDate",
        "exerciseDate",
        "learningDate",
        "entertainmentDate",
        "socialDate",
        "sleepDate",
        "foodDate",
        "bodyDate",
        "taskDate",
        "journalDate"

    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.value =
                today;
        }

    });


    const month =
        document.getElementById(
            "analyticsMonth"
        );

    if (month) {

        month.value =
            getCurrentMonth();
    }
}


/* =========================================================
   CLOCK
========================================================= */

setInterval(
    updateClock,
    1000
);


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeDates();

        addFoodRow();

        renderDashboard();

        renderNutritionPage();

        renderTasks();

        renderFocusHistory();

        renderDailyGoals();

        renderHistory();

        renderAnalytics();

        renderJournal();

        updateTimerDisplay();

    }
);


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        const modal =
            document.getElementById(
                "editModal"
            );

        if (
            event.target === modal
        ) {

            closeEditModal();
        }

    }
);