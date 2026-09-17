/* =========================================================
   LIFETRACK
   FINAL ALL-UPGRADES JAVASCRIPT
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
   DAILY GOALS
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
   Approximate values
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
        calories: 0.52,
        unit: "g",
        defaultQuantity: 150
    },

    banana: {
        name: "Banana",
        calories: 0.89,
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
        calories: 0.60,
        unit: "ml",
        defaultQuantity: 250
    },

    tea: {
        name: "Tea",
        calories: 0.40,
        unit: "ml",
        defaultQuantity: 150
    },

    coffee: {
        name: "Coffee",
        calories: 0.45,
        unit: "ml",
        defaultQuantity: 150
    },

    curd: {
        name: "Curd",
        calories: 0.60,
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
        calories: 0.80
    },

    rasam: {
        name: "Rasam",
        calories: 0.40
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
   QUOTES
========================================================= */

const quotes = [

    {
        text: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier"
    },

    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },

    {
        text: "Small progress is still progress.",
        author: "Unknown"
    },

    {
        text: "Discipline is choosing between what you want now and what you want most.",
        author: "Abraham Lincoln"
    },

    {
        text: "Your future is created by what you do today.",
        author: "Robert Kiyosaki"
    },

    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    }

];


/* =========================================================
   HELPERS
========================================================= */

function getToday() {

    const d = new Date();

    const year = d.getFullYear();

    const month =
        String(d.getMonth() + 1).padStart(2, "0");

    const day =
        String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function saveStorage() {

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


function setValue(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.value = value;
    }

}


function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


/* =========================================================
   DURATION
========================================================= */

function calculateDuration(start, end) {

    if (!start || !end) {
        return 0;
    }

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


function formatMinutes(minutes) {

    minutes = Math.round(Number(minutes) || 0);

    const hours =
        Math.floor(minutes / 60);

    const mins =
        minutes % 60;

    if (hours === 0) {
        return `${mins} min`;
    }

    if (mins === 0) {
        return `${hours} hr`;
    }

    return `${hours} hr ${mins} min`;

}


/* =========================================================
   GET TOTALS
========================================================= */

function getTotal(type, date = getToday()) {

    return activities
        .filter(a =>
            a.type === type &&
            a.date === date
        )
        .reduce(
            (sum, a) =>
                sum + Number(a.duration || 0),
            0
        );

}


function getTodayActivities() {

    return activities.filter(
        a => a.date === getToday()
    );

}


function getNutritionTotals(date = getToday()) {

    const records =
        nutritionRecords.filter(
            n => n.date === date
        );

    return {

        calories: records.reduce(
            (s, r) => s + Number(r.calories || 0),
            0
        ),

        protein: records.reduce(
            (s, r) => s + Number(r.protein || 0),
            0
        ),

        carbs: records.reduce(
            (s, r) => s + Number(r.carbs || 0),
            0
        ),

        fat: records.reduce(
            (s, r) => s + Number(r.fat || 0),
            0
        )

    };

}


function getCalories(date = getToday()) {

    return getNutritionTotals(date).calories;

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

    document.querySelectorAll(".page")
        .forEach(page =>
            page.classList.remove("active")
        );

    document.querySelectorAll(".nav-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    const page =
        document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    const buttons =
        document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        if (
            button.getAttribute("onclick") ===
            `showPage('${pageId}')`
        ) {

            button.classList.add("active");

        }

    });

    refreshPage();

}


/* =========================================================
   REFRESH ALL
========================================================= */

function refreshPage() {

    updateDashboard();

    updateWellness();

    updateGoals();

    renderTodayActivities();

    renderHistory();

    renderNutrition();

    renderTasks();

    renderFocusHistory();

    renderJournals();

    updateMood();

    updateStreak();

    updateWater();

    updateSmartInsight();

    renderAnalytics();

    renderWeightChart();

}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now = new Date();

    setText(
        "liveClock",
        now.toLocaleTimeString()
    );

    setText(
        "liveDate",
        now.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        )
    );

}


/* =========================================================
   DEFAULT DATES
========================================================= */

function setDefaultDates() {

    const today = getToday();

    [
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
    ].forEach(id => {

        const el =
            document.getElementById(id);

        if (el && !el.value) {
            el.value = today;
        }

    });

}


/* =========================================================
   SAVE ACTIVITY
========================================================= */

function addActivity(data) {

    activities.push({

        id:
            Date.now().toString() +
            Math.random().toString(16).slice(2),

        createdAt:
            new Date().toISOString(),

        ...data

    });

    saveStorage();

    refreshPage();

}


/* =========================================================
   STUDY
========================================================= */

function saveStudy() {

    const date =
        document.getElementById("studyDate").value;

    const subject =
        document.getElementById("studySubject").value.trim();

    const start =
        document.getElementById("studyStart").value;

    const end =
        document.getElementById("studyEnd").value;

    const duration =
        calculateDuration(start, end);

    if (!date || !start || !end) {

        alert("Please enter date, start time and end time.");

        return;
    }

    if (duration <= 0) {

        alert("Please check the timings.");

        return;
    }

    addActivity({

        date,

        type: "Study",

        details:
            subject || "Study Session",

        start,

        end,

        duration

    });

    alert("Study session saved.");

}


/* =========================================================
   EXERCISE
========================================================= */

function toggleExercise() {

    const status =
        document.getElementById("exerciseStatus").value;

    document.getElementById(
        "exerciseFields"
    ).style.display =
        status === "Done"
            ? "block"
            : "none";

}


function saveExercise() {

    const date =
        document.getElementById("exerciseDate").value;

    const status =
        document.getElementById("exerciseStatus").value;

    if (status === "Not Done") {

        addActivity({

            date,

            type: "Exercise",

            details: "Exercise - Not Done",

            start: "",

            end: "",

            duration: 0

        });

        alert("Exercise status saved.");

        return;
    }

    const type =
        document.getElementById("exerciseType").value.trim();

    const start =
        document.getElementById("exerciseStart").value;

    const end =
        document.getElementById("exerciseEnd").value;

    const duration =
        calculateDuration(start, end);

    if (!date || !start || !end) {

        alert("Please complete exercise details.");

        return;
    }

    addActivity({

        date,

        type: "Exercise",

        details:
            type || "Exercise",

        start,

        end,

        duration

    });

    alert("Exercise saved.");

}


/* =========================================================
   LEARNING
========================================================= */

function toggleLearning() {

    const status =
        document.getElementById("learningStatus").value;

    document.getElementById(
        "learningFields"
    ).style.display =
        status === "Done"
            ? "block"
            : "none";

}


function saveLearning() {

    const date =
        document.getElementById("learningDate").value;

    const status =
        document.getElementById("learningStatus").value;

    if (status === "Not Done") {

        addActivity({

            date,

            type: "Learning",

            details: "Learning - Not Done",

            start: "",

            end: "",

            duration: 0

        });

        alert("Learning status saved.");

        return;
    }

    const topic =
        document.getElementById("learningTopic").value.trim();

    const start =
        document.getElementById("learningStart").value;

    const end =
        document.getElementById("learningEnd").value;

    const duration =
        calculateDuration(start, end);

    if (!date || !topic || !start || !end) {

        alert("Please complete learning details.");

        return;
    }

    addActivity({

        date,

        type: "Learning",

        details: topic,

        start,

        end,

        duration

    });

    alert("Learning record saved.");

}


/* =========================================================
   ENTERTAINMENT
========================================================= */

function saveEntertainment() {

    const date =
        document.getElementById("entertainmentDate").value;

    const type =
        document.getElementById("entertainmentType").value.trim();

    const start =
        document.getElementById("entertainmentStart").value;

    const end =
        document.getElementById("entertainmentEnd").value;

    const duration =
        calculateDuration(start, end);

    if (!date || !start || !end) {

        alert("Please complete entertainment timings.");

        return;
    }

    addActivity({

        date,

        type: "Entertainment",

        details:
            type || "Entertainment",

        start,

        end,

        duration

    });

    alert("Entertainment saved.");

}


/* =========================================================
   SOCIAL MEDIA
========================================================= */

function saveSocial() {

    const date =
        document.getElementById("socialDate").value;

    const platform =
        document.getElementById("socialPlatform").value;

    const start =
        document.getElementById("socialStart").value;

    const end =
        document.getElementById("socialEnd").value;

    const duration =
        calculateDuration(start, end);

    if (!date || !start || !end) {

        alert("Please complete social media timings.");

        return;
    }

    addActivity({

        date,

        type: "Social Media",

        details: platform,

        start,

        end,

        duration

    });

    alert("Social media record saved.");

}


/* =========================================================
   SLEEP
========================================================= */

function saveSleep() {

    const date =
        document.getElementById("sleepDate").value;

    const start =
        document.getElementById("sleepStart").value;

    const end =
        document.getElementById("sleepEnd").value;

    const duration =
        calculateDuration(start, end);

    if (!date || !start || !end) {

        alert("Please enter sleep and wake times.");

        return;
    }

    addActivity({

        date,

        type: "Sleep",

        details: "Sleep Cycle",

        start,

        end,

        duration

    });

    alert(
        `Sleep saved: ${formatMinutes(duration)}`
    );

}


/* =========================================================
   FOOD ROWS
========================================================= */

function foodOptions() {

    return Object.keys(foodDatabase)
        .map(key => {

            const item =
                foodDatabase[key];

            return `
                <option value="${key}">
                    ${escapeHTML(item.name)}
                </option>
            `;

        })
        .join("");

}


function gravyOptions() {

    return Object.keys(gravyDatabase)
        .map(key => {

            const item =
                gravyDatabase[key];

            return `
                <option value="${key}">
                    ${escapeHTML(item.name)}
                </option>
            `;

        })
        .join("");

}


function addFoodRow() {

    const container =
        document.getElementById("foodRows");

    const row =
        document.createElement("div");

    row.className = "food-row";

    row.innerHTML = `

        <select onchange="updateFoodPreview()">

            ${foodOptions()}

        </select>

        <input type="number"
               min="0"
               value="100"
               class="food-quantity"
               oninput="updateFoodPreview()">

        <span class="food-unit">
            quantity
        </span>

        <button onclick="this.parentElement.remove(); updateFoodPreview()">
            ×
        </button>

    `;

    container.appendChild(row);

    const select =
        row.querySelector("select");

    const quantity =
        row.querySelector(".food-quantity");

    const firstKey =
        select.value;

    quantity.value =
        foodDatabase[firstKey].defaultQuantity;

    updateFoodPreview();

}


function addGravyRow() {

    const container =
        document.getElementById("gravyRows");

    const row =
        document.createElement("div");

    row.className = "food-row";

    row.innerHTML = `

        <select onchange="updateFoodPreview()">

            ${gravyOptions()}

        </select>

        <input type="number"
               min="0"
               value="50"
               class="gravy-quantity"
               oninput="updateFoodPreview()">

        <span>
            grams
        </span>

        <button onclick="this.parentElement.remove(); updateFoodPreview()">
            ×
        </button>

    `;

    container.appendChild(row);

    updateFoodPreview();

}


function calculateFoodRows() {

    let total = 0;

    document.querySelectorAll(
        "#foodRows .food-row"
    ).forEach(row => {

        const key =
            row.querySelector("select").value;

        const quantity =
            Number(
                row.querySelector(".food-quantity").value
            ) || 0;

        const food =
            foodDatabase[key];

        total +=
            quantity * food.calories;

    });

    return total;

}


function calculateGravyRows() {

    let total = 0;

    document.querySelectorAll(
        "#gravyRows .food-row"
    ).forEach(row => {

        const key =
            row.querySelector("select").value;

        const quantity =
            Number(
                row.querySelector(".gravy-quantity").value
            ) || 0;

        const gravy =
            gravyDatabase[key];

        total +=
            quantity * gravy.calories;

    });

    return total;

}


function updateFoodPreview() {

    const total =
        calculateFoodRows() +
        calculateGravyRows();

    setText(
        "foodEstimatedCalories",
        `${Math.round(total)} kcal`
    );

}


/* =========================================================
   SAVE FOOD MEAL
========================================================= */

function saveFoodMeal() {

    const date =
        document.getElementById("foodDate").value;

    if (!date) {

        alert("Please select a date.");

        return;
    }

    const foodItems = [];

    document.querySelectorAll(
        "#foodRows .food-row"
    ).forEach(row => {

        const key =
            row.querySelector("select").value;

        const quantity =
            Number(
                row.querySelector(".food-quantity").value
            ) || 0;

        if (quantity > 0) {

            const food =
                foodDatabase[key];

            foodItems.push({

                name: food.name,

                quantity,

                unit: food.unit,

                calories:
                    quantity * food.calories

            });

        }

    });


    const gravyItems = [];

    document.querySelectorAll(
        "#gravyRows .food-row"
    ).forEach(row => {

        const key =
            row.querySelector("select").value;

        const quantity =
            Number(
                row.querySelector(".gravy-quantity").value
            ) || 0;

        if (quantity > 0) {

            const gravy =
                gravyDatabase[key];

            gravyItems.push({

                name: gravy.name,

                quantity,

                unit: "g",

                calories:
                    quantity * gravy.calories

            });

        }

    });


    const calories =
        foodItems.reduce(
            (s, x) => s + x.calories,
            0
        ) +
        gravyItems.reduce(
            (s, x) => s + x.calories,
            0
        );


    if (calories <= 0) {

        alert("Please add at least one food item.");

        return;
    }


    nutritionRecords.push({

        id: Date.now().toString(),

        date,

        meal: "Food + Gravy",

        calories: Math.round(calories),

        protein: 0,

        carbs: 0,

        fat: 0,

        foods: foodItems,

        gravies: gravyItems

    });


    saveStorage();

    refreshPage();

    alert(
        `Food record saved.\nEstimated calories: ${Math.round(calories)} kcal`
    );

}


/* =========================================================
   MANUAL NUTRITION
========================================================= */

function saveManualNutrition() {

    const date =
        document.getElementById("foodDate").value ||
        getToday();

    const meal =
        document.getElementById("manualMeal").value;

    const calories =
        Number(
            document.getElementById("manualCalories").value
        ) || 0;

    const protein =
        Number(
            document.getElementById("manualProtein").value
        ) || 0;

    const carbs =
        Number(
            document.getElementById("manualCarbs").value
        ) || 0;

    const fat =
        Number(
            document.getElementById("manualFat").value
        ) || 0;


    if (
        calories <= 0 &&
        protein <= 0 &&
        carbs <= 0 &&
        fat <= 0
    ) {

        alert("Please enter nutrition values.");

        return;
    }


    nutritionRecords.push({

        id: Date.now().toString(),

        date,

        meal,

        calories,

        protein,

        carbs,

        fat,

        foods: [],

        gravies: []

    });


    saveStorage();

    refreshPage();

    alert("Nutrition record saved.");

}


/* =========================================================
   NUTRITION RENDER
========================================================= */

function renderNutrition() {

    const totals =
        getNutritionTotals();

    setText(
        "nutritionCalories",
        Math.round(totals.calories)
    );

    setText(
        "nutritionProtein",
        totals.protein.toFixed(1)
    );

    setText(
        "nutritionCarbs",
        totals.carbs.toFixed(1)
    );

    setText(
        "nutritionFat",
        totals.fat.toFixed(1)
    );


    const records =
        nutritionRecords
            .filter(n => n.date === getToday())
            .slice()
            .reverse();


    const container =
        document.getElementById("nutritionRecords");

    if (!container) {
        return;
    }


    if (records.length === 0) {

        container.innerHTML =
            `<p class="empty">No nutrition records today.</p>`;

        return;
    }


    container.innerHTML =
        records.map(record => `

            <div class="nutrition-record">

                <strong>
                    ${escapeHTML(record.meal)}
                </strong>

                <p>
                    ${Math.round(record.calories)} kcal
                    • Protein ${Number(record.protein).toFixed(1)}g
                    • Carbs ${Number(record.carbs).toFixed(1)}g
                    • Fat ${Number(record.fat).toFixed(1)}g
                </p>

                <button class="small-btn"
                        onclick="deleteNutrition('${record.id}')">
                    Delete
                </button>

            </div>

        `).join("");

    updateMacroBars();

}


function deleteNutrition(id) {

    if (!confirm("Delete this nutrition record?")) {
        return;
    }

    nutritionRecords =
        nutritionRecords.filter(
            n => n.id !== id
        );

    saveStorage();

    refreshPage();

}


/* =========================================================
   MACRO BARS
========================================================= */

function updateMacroBars() {

    const totals =
        getNutritionTotals();

    const total =
        totals.protein +
        totals.carbs +
        totals.fat;


    const proteinPercent =
        total > 0
            ? totals.protein / total * 100
            : 0;

    const carbsPercent =
        total > 0
            ? totals.carbs / total * 100
            : 0;

    const fatPercent =
        total > 0
            ? totals.fat / total * 100
            : 0;


    const proteinBar =
        document.getElementById("proteinBar");

    const carbsBar =
        document.getElementById("carbsBar");

    const fatBar =
        document.getElementById("fatBar");


    if (proteinBar) {
        proteinBar.style.width =
            `${proteinPercent}%`;
    }

    if (carbsBar) {
        carbsBar.style.width =
            `${carbsPercent}%`;
    }

    if (fatBar) {
        fatBar.style.width =
            `${fatPercent}%`;
    }

}


/* =========================================================
   BODY DATA
========================================================= */

function saveBodyData() {

    const date =
        document.getElementById("bodyDate").value;

    const weight =
        Number(
            document.getElementById("weightInput").value
        );

    const height =
        Number(
            document.getElementById("heightInput").value
        );


    if (
        !date ||
        weight <= 0 ||
        height <= 0
    ) {

        alert("Please enter valid body measurements.");

        return;
    }


    bodyRecords.push({

        id: Date.now().toString(),

        date,

        weight,

        height

    });


    saveStorage();

    updateBMI();

    renderWeightChart();

    alert("Body measurement saved.");

}


function updateBMI() {

    if (bodyRecords.length === 0) {

        setText("bmiValue", "--");

        setText(
            "bmiStatus",
            "Enter height & weight"
        );

        return;
    }


    const latest =
        bodyRecords
            .slice()
            .sort(
                (a,b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )[0];


    const heightM =
        latest.height / 100;

    const bmi =
        latest.weight /
        (heightM * heightM);


    setText(
        "bmiValue",
        bmi.toFixed(1)
    );


    let status = "";

    if (bmi < 18.5) {

        status = "Below reference range";

    }
    else if (bmi < 25) {

        status = "Reference range";

    }
    else if (bmi < 30) {

        status = "Above reference range";

    }
    else {

        status = "High BMI range";

    }


    setText(
        "bmiStatus",
        status
    );

}


/* =========================================================
   WEIGHT CHART
========================================================= */

let weightChart = null;

function renderWeightChart() {

    const canvas =
        document.getElementById("weightChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }


    const records =
        bodyRecords
            .slice()
            .sort(
                (a,b) =>
                    a.date.localeCompare(b.date)
            );


    if (weightChart) {
        weightChart.destroy();
    }


    weightChart =
        new Chart(canvas, {

            type: "line",

            data: {

                labels:
                    records.map(r => r.date),

                datasets: [

                    {

                        label: "Weight (kg)",

                        data:
                            records.map(
                                r => r.weight
                            ),

                        tension: 0.3

                    }

                ]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {
                        labels: {
                            color: "#cbd5e1"
                        }
                    }

                },

                scales: {

                    x: {
                        ticks: {
                            color: "#64748b"
                        }
                    },

                    y: {
                        ticks: {
                            color: "#64748b"
                        }
                    }

                }

            }

        });

}


/* =========================================================
   PLANNER
========================================================= */

function addTask() {

    const date =
        document.getElementById("taskDate").value;

    const name =
        document.getElementById("taskName").value.trim();

    const start =
        document.getElementById("taskStart").value;

    const end =
        document.getElementById("taskEnd").value;

    const priority =
        document.getElementById("taskPriority").value;


    if (!date || !name) {

        alert("Please enter date and task.");

        return;
    }


    tasks.push({

        id: Date.now().toString(),

        date,

        name,

        start,

        end,

        priority,

        completed: false

    });


    saveStorage();

    setValue("taskName", "");

    refreshPage();

}


function renderTasks() {

    const container =
        document.getElementById("taskList");

    if (!container) {
        return;
    }


    const today =
        getToday();


    const list =
        tasks
            .filter(t => t.date === today)
            .sort((a,b) =>
                Number(b.completed) -
                Number(a.completed)
            );


    const total =
        list.length;

    const completed =
        list.filter(t => t.completed).length;

    const pending =
        total - completed;


    setText(
        "totalTasks",
        total
    );

    setText(
        "completedTasks",
        completed
    );

    setText(
        "pendingTasks",
        pending
    );


    if (list.length === 0) {

        container.innerHTML =
            `<p class="empty">No tasks for today.</p>`;

        return;
    }


    container.innerHTML =
        list.map(task => `

            <div class="task-item
                ${task.completed ? "completed" : ""}">

                <div class="task-left">

                    <input
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="toggleTask('${task.id}')">

                    <div>

                        <div class="task-name">
                            ${escapeHTML(task.name)}
                        </div>

                        <div class="task-time">
                            ${task.start || "--"}
                            ${task.end ? " - " + task.end : ""}
                        </div>

                    </div>

                </div>

                <div>

                    <span class="priority
                        ${task.priority.toLowerCase()}">

                        ${escapeHTML(task.priority)}

                    </span>

                    <button
                        class="icon-btn delete-btn"
                        onclick="deleteTask('${task.id}')">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        `).join("");

}


function toggleTask(id) {

    const task =
        tasks.find(t => t.id === id);

    if (!task) {
        return;
    }

    task.completed =
        !task.completed;

    saveStorage();

    refreshPage();

}


function deleteTask(id) {

    if (!confirm("Delete this task?")) {
        return;
    }

    tasks =
        tasks.filter(
            t => t.id !== id
        );

    saveStorage();

    refreshPage();

}


/* =========================================================
   FOCUS TIMER
========================================================= */

let timerSeconds = 25 * 60;

let timerInterval = null;

let timerRunning = false;

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
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;


    setText(
        "timerDisplay",

        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
    );

}


function startTimer() {

    if (timerRunning) {
        return;
    }

    timerRunning = true;

    timerInterval =
        setInterval(() => {

            if (timerSeconds <= 0) {

                clearInterval(timerInterval);

                timerInterval = null;

                timerRunning = false;

                recordFocusSession(
                    selectedTimerMinutes
                );

                alert("Focus session completed! 🔥");

                return;
            }

            timerSeconds--;

            updateTimerDisplay();

        }, 1000);

}


function pauseTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;

    }

    timerRunning = false;

}


function resetTimer() {

    pauseTimer();

    timerSeconds =
        selectedTimerMinutes * 60;

    updateTimerDisplay();

}


function recordFocusSession(minutes) {

    focusRecords.push({

        id: Date.now().toString(),

        date: getToday(),

        minutes: Number(minutes),

        createdAt:
            new Date().toISOString()

    });

    saveStorage();

    renderFocusHistory();

}


function renderFocusHistory() {

    const container =
        document.getElementById("focusHistory");

    if (!container) {
        return;
    }


    const list =
        focusRecords
            .filter(
                r => r.date === getToday()
            )
            .slice()
            .reverse();


    if (list.length === 0) {

        container.innerHTML =
            `<p class="empty">No focus sessions yet.</p>`;

        return;
    }


    container.innerHTML =
        list.map(r => `

            <div class="activity-item">

                <div class="activity-main">

                    <i class="fa-solid fa-circle-check"></i>

                    <div>

                        <strong>
                            Focus Session
                        </strong>

                        <small>
                            ${r.minutes} minutes
                        </small>

                    </div>

                </div>

            </div>

        `).join("");

}


/* =========================================================
   WELLNESS
========================================================= */

function calculateWellnessScore(
    date = getToday()
) {

    const study =
        getTotal("Study", date);

    const exercise =
        getTotal("Exercise", date);

    const learning =
        getTotal("Learning", date);

    const entertainment =
        getTotal("Entertainment", date);

    const social =
        getTotal("Social Media", date);

    const sleep =
        getTotal("Sleep", date);


    let score = 0;


    /* STUDY */

    if (study >= 180) {
        score += 20;
    }
    else if (study >= 120) {
        score += 16;
    }
    else if (study >= 60) {
        score += 10;
    }
    else if (study > 0) {
        score += 5;
    }


    /* EXERCISE */

    if (exercise >= 45) {
        score += 15;
    }
    else if (exercise >= 30) {
        score += 12;
    }
    else if (exercise >= 15) {
        score += 7;
    }
    else if (exercise > 0) {
        score += 3;
    }


    /* LEARNING */

    if (learning >= 60) {
        score += 15;
    }
    else if (learning >= 30) {
        score += 12;
    }
    else if (learning > 0) {
        score += 7;
    }


    /* SLEEP */

    if (
        sleep >= 420 &&
        sleep <= 540
    ) {

        score += 20;

    }
    else if (
        sleep >= 360 &&
        sleep < 420
    ) {

        score += 15;

    }
    else if (
        sleep > 0 &&
        sleep < 360
    ) {

        score += 8;

    }
    else if (sleep > 540) {

        score += 14;

    }


    /* ENTERTAINMENT */

    if (entertainment <= 60) {

        score += 10;

    }
    else if (entertainment <= 120) {

        score += 7;

    }
    else if (entertainment <= 180) {

        score += 4;

    }


    /* SOCIAL */

    if (social <= 60) {

        score += 10;

    }
    else if (social <= 120) {

        score += 7;

    }
    else if (social <= 180) {

        score += 4;

    }


    /* FOOD */

    if (getCalories(date) > 0) {
        score += 10;
    }


    return Math.min(
        100,
        score
    );

}


function getWellnessStatus(score) {

    if (score >= 85) {

        return {

            title: "Excellent Day! 🔥",

            message:
                "Your daily balance looks excellent. Keep maintaining these habits."

        };

    }


    if (score >= 70) {

        return {

            title: "Good Day! 💪",

            message:
                "You're doing well. A few small improvements can make your day even better."

        };

    }


    if (score >= 50) {

        return {

            title: "Average Day 🙂",

            message:
                "You have a decent routine, but some areas need attention."

        };

    }


    if (score >= 30) {

        return {

            title: "Needs Improvement ⚠️",

            message:
                "Your routine needs more balance. Focus on the weak areas."

        };

    }


    return {

        title: "Let's Build Better Habits 🌱",

        message:
            "Start recording your activities and gradually improve your routine."

    };

}


function updateWellness() {

    const score =
        calculateWellnessScore();

    const status =
        getWellnessStatus(score);


    setText(
        "wellnessScore",
        score
    );

    setText(
        "wellnessStatus",
        status.title
    );

    setText(
        "wellnessMessage",
        status.message
    );

    setText(
        "dashboardWellnessScore",
        score
    );

    setText(
        "dashboardWellnessStatus",
        status.title
    );

    setText(
        "dashboardWellnessMessage",
        status.message
    );

    setText(
        "dashWellness",
        `${score} / 100`
    );


    const circle =
        document.querySelector(".score-circle");

    if (circle) {

        circle.style.background =
            `conic-gradient(
                #22c55e ${score * 3.6}deg,
                #1e293b ${score * 3.6}deg
            )`;

    }


    const study =
        getTotal("Study");

    const learning =
        getTotal("Learning");

    const exercise =
        getTotal("Exercise");

    const entertainment =
        getTotal("Entertainment");

    const social =
        getTotal("Social Media");


    const productive =
        study +
        learning +
        exercise;


    const screen =
        entertainment +
        social;


    const total =
        productive +
        screen;


    const productivity =
        total > 0
            ? Math.round(
                productive / total * 100
            )
            : 0;


    const bar =
        document.getElementById(
            "productivityBar"
        );

    if (bar) {

        bar.style.width =
            `${productivity}%`;

    }


    setText(
        "productivityPercent2",
        `${productivity}%`
    );

}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const study =
        getTotal("Study");

    const exercise =
        getTotal("Exercise");

    const learning =
        getTotal("Learning");

    const sleep =
        getTotal("Sleep");

    const entertainment =
        getTotal("Entertainment");

    const social =
        getTotal("Social Media");

    const calories =
        getCalories();


    setText(
        "dashStudy",
        formatMinutes(study)
    );

    setText(
        "dashExercise",
        formatMinutes(exercise)
    );

    setText(
        "dashLearning",
        formatMinutes(learning)
    );

    setText(
        "dashSleep",
        formatMinutes(sleep)
    );

    setText(
        "dashCalories",
        `${Math.round(calories)} kcal`
    );


    const productive =
        study +
        exercise +
        learning;

    const screen =
        entertainment +
        social;

    const total =
        productive +
        screen;


    const percentage =
        total > 0
            ? Math.round(
                productive / total * 100
            )
            : 0;


    setText(
        "productiveTime",
        formatMinutes(productive)
    );

    setText(
        "screenTime",
        formatMinutes(screen)
    );

    setText(
        "productivityPercent",
        `${percentage}%`
    );


    const ring =
        document.getElementById(
            "productivityRing"
        );

    if (ring) {

        ring.style.background =
            `conic-gradient(
                #38bdf8 ${percentage * 3.6}deg,
                #1e293b ${percentage * 3.6}deg
            )`;

    }


    updateCoach();

}


/* =========================================================
   SMART COACH
========================================================= */

function updateCoach() {

    const study =
        getTotal("Study");

    const exercise =
        getTotal("Exercise");

    const learning =
        getTotal("Learning");

    const screen =
        getTotal("Entertainment") +
        getTotal("Social Media");

    const sleep =
        getTotal("Sleep");

    const calories =
        getCalories();


    let title =
        "Your personal coach is ready.";

    let message =
        "Start recording your routine to receive suggestions.";


    if (
        study >= DAILY_GOALS.study &&
        exercise >= DAILY_GOALS.exercise
    ) {

        title =
            "Strong productivity day!";

        message =
            "Your study and exercise reference targets are complete.";

    }
    else if (
        screen > DAILY_GOALS.screen
    ) {

        title =
            "Screen time is above the reference limit.";

        message =
            "Consider taking a break from gaming or social media.";

    }
    else if (
        sleep > 0 &&
        sleep < 360
    ) {

        title =
            "Your recorded sleep is low.";

        message =
            "Try to maintain a consistent sleep routine.";

    }
    else if (
        learning >= DAILY_GOALS.learning
    ) {

        title =
            "Learning target completed.";

        message =
            "Great work. Keep building your knowledge every day.";

    }
    else if (
        calories > 0
    ) {

        title =
            "Nutrition is being tracked.";

        message =
            "Keep recording meals to build a clearer nutrition history.";

    }
    else if (
        study > 0 ||
        exercise > 0 ||
        learning > 0
    ) {

        title =
            "You're making progress.";

        message =
            "Keep recording your routine and complete your remaining goals.";

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
        getTotal("Study");

    const exercise =
        getTotal("Exercise");

    const learning =
        getTotal("Learning");

    const screen =
        getTotal("Entertainment") +
        getTotal("Social Media");

    const nutrition =
        getNutritionTotals();


    let title =
        "Your personal dashboard is ready.";

    let message =
        "Start recording your routine to receive personalized insights.";


    if (
        study >= DAILY_GOALS.study &&
        exercise >= DAILY_GOALS.exercise
    ) {

        title =
            "Strong productivity day!";

        message =
            "Your study and exercise targets are both complete.";

    }
    else if (
        nutrition.protein > 0 &&
        learning >= DAILY_GOALS.learning
    ) {

        title =
            "Learning and nutrition tracked.";

        message =
            "You're building a detailed picture of your daily routine.";

    }
    else if (
        screen > DAILY_GOALS.screen
    ) {

        title =
            "Screen time is above the reference limit.";

        message =
            "Consider taking a break from gaming or social media.";

    }
    else if (
        study >= DAILY_GOALS.study
    ) {

        title =
            "Study target completed.";

        message =
            "Great work. Consider adding movement and hydration.";

    }
    else if (
        getTodayActivities().length > 0 ||
        nutrition.calories > 0
    ) {

        title =
            "You're making progress.";

        message =
            "Keep recording your routine and complete your remaining goals.";

    }


    setText(
        "smartInsightTitle",
        title
    );

    setText(
        "smartInsightText",
        message
    );

}


/* =========================================================
   TODAY ACTIVITIES
========================================================= */

function renderTodayActivities() {

    const container =
        document.getElementById(
            "todayActivities"
        );

    if (!container) {
        return;
    }


    const list =
        getTodayActivities()
            .slice()
            .sort(
                (a,b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );


    if (list.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No activities recorded today.
             </p>`;

        return;
    }


    container.innerHTML =
        list.map(
            activity =>
                activityHTML(activity)
        ).join("");

}


function getActivityIcon(type) {

    const icons = {

        Study:
            "fa-book",

        Exercise:
            "fa-dumbbell",

        Learning:
            "fa-lightbulb",

        Entertainment:
            "fa-gamepad",

        "Social Media":
            "fa-mobile-screen",

        Sleep:
            "fa-bed"

    };

    return icons[type] ||
        "fa-circle-check";

}


function activityHTML(activity) {

    return `

        <div class="activity-item">

            <div class="activity-main">

                <i class="fa-solid
                    ${getActivityIcon(activity.type)}">
                </i>

                <div>

                    <strong>
                        ${escapeHTML(activity.type)}
                    </strong>

                    <small>
                        ${escapeHTML(activity.details)}
                        •
                        ${formatMinutes(activity.duration)}
                        ${activity.start
                            ? ` • ${activity.start} - ${activity.end}`
                            : ""}
                    </small>

                </div>

            </div>

            <div class="activity-actions">

                <button class="icon-btn"
                        onclick="openEditModal('${activity.id}')">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="icon-btn delete-btn"
                        onclick="deleteActivity('${activity.id}')">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

    const container =
        document.getElementById(
            "historyList"
        );

    if (!container) {
        return;
    }


    const date =
        document.getElementById(
            "historyDate"
        ).value;


    let records =
        date
            ? activities.filter(
                a => a.date === date
            )
            : activities;


    records =
        records
            .slice()
            .sort(
                (a,b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );


    if (records.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No activity records found.
             </p>`;

    }
    else {

        container.innerHTML =
            records
                .map(
                    activity =>
                        activityHTML(activity)
                )
                .join("");

    }


    const selectedDate =
        date || getToday();


    setText(
        "historyStudy",
        formatMinutes(
            getTotal(
                "Study",
                selectedDate
            )
        )
    );

    setText(
        "historyExercise",
        formatMinutes(
            getTotal(
                "Exercise",
                selectedDate
            )
        )
    );

    setText(
        "historyLearning",
        formatMinutes(
            getTotal(
                "Learning",
                selectedDate
            )
        )
    );

    setText(
        "historySleep",
        formatMinutes(
            getTotal(
                "Sleep",
                selectedDate
            )
        )
    );

    setText(
        "historyCalories",
        `${Math.round(
            getCalories(selectedDate)
        )} kcal`
    );

}


function clearHistoryFilter() {

    setValue(
        "historyDate",
        ""
    );

    renderHistory();

}


function deleteActivity(id) {

    if (!confirm("Delete this activity?")) {
        return;
    }

    activities =
        activities.filter(
            a => a.id !== id
        );

    saveStorage();

    refreshPage();

}


/* =========================================================
   EDIT ACTIVITY
========================================================= */

function openEditModal(id) {

    const activity =
        activities.find(
            a => a.id === id
        );

    if (!activity) {
        return;
    }

    editingActivityId = id;

    setValue(
        "editId",
        id
    );

    setValue(
        "editDetails",
        activity.details
    );

    setValue(
        "editStart",
        activity.start
    );

    setValue(
        "editEnd",
        activity.end
    );


    document
        .getElementById("editModal")
        .classList.add("show");

}


function closeEditModal() {

    document
        .getElementById("editModal")
        .classList.remove("show");

    editingActivityId = null;

}


function saveEditedActivity() {

    const activity =
        activities.find(
            a => a.id === editingActivityId
        );

    if (!activity) {
        return;
    }


    const details =
        document.getElementById(
            "editDetails"
        ).value.trim();

    const start =
        document.getElementById(
            "editStart"
        ).value;

    const end =
        document.getElementById(
            "editEnd"
        ).value;


    activity.details =
        details;

    activity.start =
        start;

    activity.end =
        end;

    activity.duration =
        calculateDuration(
            start,
            end
        );


    saveStorage();

    closeEditModal();

    refreshPage();

}


/* =========================================================
   GOALS
========================================================= */

function updateGoalBar(
    value,
    target,
    textId,
    barId,
    lowerIsBetter = false
) {

    let percentage;

    if (lowerIsBetter) {

        percentage =
            value <= target
                ? 100
                : Math.max(
                    0,
                    100 -
                    (
                        (value - target) /
                        target
                    ) * 100
                );

    }
    else {

        percentage =
            Math.min(
                100,
                value / target * 100
            );

    }


    setText(
        textId,
        `${Math.round(value)} / ${target}${textId === "goalCalories" ? " kcal" : " min"}`
    );


    const bar =
        document.getElementById(barId);

    if (bar) {

        bar.style.width =
            `${Math.min(100, percentage)}%`;

    }


    return percentage >= 100;

}


function updateGoals() {

    const study =
        getTotal("Study");

    const exercise =
        getTotal("Exercise");

    const learning =
        getTotal("Learning");

    const sleep =
        getTotal("Sleep");

    const screen =
        getTotal("Entertainment") +
        getTotal("Social Media");

    const calories =
        getCalories();


    const results = [];


    results.push(
        updateGoalBar(
            study,
            DAILY_GOALS.study,
            "goalStudy",
            "goalStudyBar"
        )
    );

    results.push(
        updateGoalBar(
            exercise,
            DAILY_GOALS.exercise,
            "goalExercise",
            "goalExerciseBar"
        )
    );

    results.push(
        updateGoalBar(
            learning,
            DAILY_GOALS.learning,
            "goalLearning",
            "goalLearningBar"
        )
    );

    results.push(
        updateGoalBar(
            sleep,
            DAILY_GOALS.sleep,
            "goalSleep",
            "goalSleepBar"
        )
    );

    results.push(
        updateGoalBar(
            screen,
            DAILY_GOALS.screen,
            "goalScreen",
            "goalScreenBar",
            true
        )
    );


    const calorieCompleted =
        calories >= DAILY_GOALS.calories;


    setText(
        "goalCalories",
        `${Math.round(calories)} / ${DAILY_GOALS.calories} kcal`
    );


    const calorieBar =
        document.getElementById(
            "goalCaloriesBar"
        );

    if (calorieBar) {

        calorieBar.style.width =
            `${Math.min(
                100,
                calories /
                DAILY_GOALS.calories *
                100
            )}%`;

    }


    results.push(
        calorieCompleted
    );


    const completed =
        results.filter(Boolean).length;


    setText(
        "completedGoals",
        `${completed} / 6`
    );

}


/* =========================================================
   STREAK
========================================================= */

function dateOffset(days) {

    const d = new Date();

    d.setDate(
        d.getDate() + days
    );

    const year =
        d.getFullYear();

    const month =
        String(
            d.getMonth() + 1
        ).padStart(2,"0");

    const day =
        String(
            d.getDate()
        ).padStart(2,"0");

    return `${year}-${month}-${day}`;

}


function hasMeaningfulDay(date) {

    return (
        activities.some(
            a =>
                a.date === date &&
                Number(a.duration) > 0
        )
        ||
        nutritionRecords.some(
            n =>
                n.date === date &&
                Number(n.calories) > 0
        )
        ||
        journals.some(
            j => j.date === date
        )
    );

}


function updateStreak() {

    let streak = 0;

    for (
        let i = 0;
        i < 365;
        i++
    ) {

        const date =
            dateOffset(-i);

        if (
            hasMeaningfulDay(date)
        ) {

            streak++;

        }
        else {

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

    if (!container) {
        return;
    }


    let html = "";

    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const date =
            dateOffset(-i);

        html += `

            <span
                class="${hasMeaningfulDay(date)
                    ? "active"
                    : ""}">

                ${new Date(date)
                    .toLocaleDateString(
                        undefined,
                        {weekday:"narrow"}
                    )}

            </span>

        `;

    }


    container.innerHTML = html;

}


/* =========================================================
   WATER
========================================================= */

function addWater() {

    const today =
        getToday();

    waterDaily[today] =
        Math.min(
            8,
            Number(waterDaily[today] || 0) + 1
        );

    saveStorage();

    updateWater();

}


function removeWater() {

    const today =
        getToday();

    waterDaily[today] =
        Math.max(
            0,
            Number(waterDaily[today] || 0) - 1
        );

    saveStorage();

    updateWater();

}


function updateWater() {

    const count =
        Number(
            waterDaily[getToday()] || 0
        );

    setText(
        "waterCount",
        count
    );


    const bar =
        document.getElementById(
            "waterBar"
        );

    if (bar) {

        bar.style.width =
            `${count / 8 * 100}%`;

    }

}


/* =========================================================
   MOOD
========================================================= */

function selectMood(emoji, text) {

    moods[getToday()] = {

        emoji,

        text,

        date: getToday()

    };

    saveStorage();

    updateMood();

}


function updateMood() {

    const selected =
        moods[getToday()];

    setText(
        "selectedMood",
        selected
            ? `${selected.emoji} ${selected.text}`
            : "Not selected"
    );

}


/* =========================================================
   QUOTE
========================================================= */

function changeQuote() {

    const quote =
        quotes[
            Math.floor(
                Math.random() *
                quotes.length
            )
        ];


    setText(
        "dailyQuote",
        quote.text
    );

    setText(
        "quoteAuthor",
        `— ${quote.author}`
    );


    localStorage.setItem(
        "lifeTrackQuote",
        JSON.stringify(quote)
    );

}


function updateQuote() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "lifeTrackQuote"
            )
        );


    if (saved) {

        setText(
            "dailyQuote",
            saved.text
        );

        setText(
            "quoteAuthor",
            `— ${saved.author}`
        );

    }

}


/* =========================================================
   ANALYTICS
========================================================= */

let dailyActivityChart = null;

let monthlyComparisonChart = null;

let calorieChart = null;

let activityDistributionChart = null;


function renderAnalytics() {

    if (typeof Chart === "undefined") {
        return;
    }


    const dates = [];

    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        dates.push(
            dateOffset(-i)
        );

    }


    const activityValues =
        dates.map(date =>
            activities
                .filter(
                    a => a.date === date
                )
                .reduce(
                    (s,a) =>
                        s + Number(a.duration || 0),
                    0
                )
        );


    const calorieValues =
        dates.map(date =>
            Math.round(
                getCalories(date)
            )
        );


    const studyValues =
        dates.map(
            date =>
                getTotal(
                    "Study",
                    date
                )
        );


    const exerciseValues =
        dates.map(
            date =>
                getTotal(
                    "Exercise",
                    date
                )
        );


    const learningValues =
        dates.map(
            date =>
                getTotal(
                    "Learning",
                    date
                )
        );


    const labels =
        dates.map(
            date =>
                date.slice(5)
        );


    const chartOptions = {

        responsive: true,

        plugins: {

            legend: {

                labels: {

                    color: "#cbd5e1"

                }

            }

        },

        scales: {

            x: {

                ticks: {

                    color: "#64748b"

                }

            },

            y: {

                ticks: {

                    color: "#64748b"

                }

            }

        }

    };


    const dailyCanvas =
        document.getElementById(
            "dailyActivityChart"
        );


    if (dailyCanvas) {

        if (dailyActivityChart) {
            dailyActivityChart.destroy();
        }


        dailyActivityChart =
            new Chart(
                dailyCanvas,
                {

                    type: "line",

                    data: {

                        labels,

                        datasets: [

                            {

                                label:
                                    "Total Activity (min)",

                                data:
                                    activityValues,

                                tension:
                                    0.3

                            }

                        ]

                    },

                    options:
                        chartOptions

                }
            );

    }


    const monthlyCanvas =
        document.getElementById(
            "monthlyComparisonChart"
        );


    if (monthlyCanvas) {

        if (monthlyComparisonChart) {
            monthlyComparisonChart.destroy();
        }


        monthlyComparisonChart =
            new Chart(
                monthlyCanvas,
                {

                    type: "bar",

                    data: {

                        labels,

                        datasets: [

                            {

                                label: "Study",

                                data:
                                    studyValues

                            },

                            {

                                label: "Exercise",

                                data:
                                    exerciseValues

                            },

                            {

                                label: "Learning",

                                data:
                                    learningValues

                            }

                        ]

                    },

                    options:
                        chartOptions

                }
            );

    }


    const calorieCanvas =
        document.getElementById(
            "calorieChart"
        );


    if (calorieCanvas) {

        if (calorieChart) {
            calorieChart.destroy();
        }


        calorieChart =
            new Chart(
                calorieCanvas,
                {

                    type: "bar",

                    data: {

                        labels,

                        datasets: [

                            {

                                label:
                                    "Calories",

                                data:
                                    calorieValues

                            }

                        ]

                    },

                    options:
                        chartOptions

                }
            );

    }


    const distributionCanvas =
        document.getElementById(
            "activityDistributionChart"
        );


    if (distributionCanvas) {

        if (activityDistributionChart) {
            activityDistributionChart.destroy();
        }


        const types = [
            "Study",
            "Exercise",
            "Learning",
            "Entertainment",
            "Social Media",
            "Sleep"
        ];


        const values =
            types.map(
                type =>
                    activities
                        .filter(
                            a =>
                                a.type === type
                        )
                        .reduce(
                            (s,a) =>
                                s +
                                Number(
                                    a.duration || 0
                                ),
                            0
                        )
            );


        activityDistributionChart =
            new Chart(
                distributionCanvas,
                {

                    type: "doughnut",

                    data: {

                        labels: types,

                        datasets: [

                            {

                                data: values

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        plugins: {

                            legend: {

                                labels: {

                                    color:
                                        "#cbd5e1"

                                }

                            }

                        }

                    }

                }
            );

    }

}


/* =========================================================
   WELLNESS SUGGESTIONS
========================================================= */

function renderWellnessDetails() {

    const container =
        document.getElementById(
            "healthSuggestions"
        );

    const breakdown =
        document.getElementById(
            "wellnessBreakdown"
        );


    if (!container || !breakdown) {
        return;
    }


    const study =
        getTotal("Study");

    const exercise =
        getTotal("Exercise");

    const learning =
        getTotal("Learning");

    const sleep =
        getTotal("Sleep");

    const screen =
        getTotal("Entertainment") +
        getTotal("Social Media");

    const water =
        Number(
            waterDaily[getToday()] || 0
        );


    const suggestions = [];


    if (
        study <
        DAILY_GOALS.study
    ) {

        suggestions.push(
            "Try to increase your focused study time."
        );

    }


    if (
        exercise <
        DAILY_GOALS.exercise
    ) {

        suggestions.push(
            "Consider adding some physical activity."
        );

    }


    if (
        learning <
        DAILY_GOALS.learning
    ) {

        suggestions.push(
            "Spend some time learning something new."
        );

    }


    if (
        sleep > 0 &&
        sleep < 420
    ) {

        suggestions.push(
            "Your recorded sleep is below the reference range."
        );

    }


    if (
        screen >
        DAILY_GOALS.screen
    ) {

        suggestions.push(
            "Consider reducing entertainment and social-media screen time."
        );

    }


    if (water < 8) {

        suggestions.push(
            "Keep working toward your hydration tracker target."
        );

    }


    if (suggestions.length === 0) {

        suggestions.push(
            "Your tracked routine is balanced today. Keep recording consistently."
        );

    }


    container.innerHTML =
        suggestions.map(
            s =>
                `<div class="suggestion">
                    <i class="fa-solid fa-check"></i>
                    ${escapeHTML(s)}
                 </div>`
        ).join("");


    breakdown.innerHTML = `

        <div class="suggestion">
            Study:
            <strong>${formatMinutes(study)}</strong>
        </div>

        <div class="suggestion">
            Exercise:
            <strong>${formatMinutes(exercise)}</strong>
        </div>

        <div class="suggestion">
            Learning:
            <strong>${formatMinutes(learning)}</strong>
        </div>

        <div class="suggestion">
            Sleep:
            <strong>${formatMinutes(sleep)}</strong>
        </div>

        <div class="suggestion">
            Screen Time:
            <strong>${formatMinutes(screen)}</strong>
        </div>

        <div class="suggestion">
            Water:
            <strong>${water}/8 glasses</strong>
        </div>

    `;

}


/* =========================================================
   JOURNAL
========================================================= */

function saveJournal() {

    const date =
        document.getElementById(
            "journalDate"
        ).value;

    const accomplishments =
        document.getElementById(
            "journalAccomplishments"
        ).value.trim();

    const improve =
        document.getElementById(
            "journalImprove"
        ).value.trim();

    const tomorrow =
        document.getElementById(
            "journalTomorrow"
        ).value.trim();


    if (!date) {

        alert("Please select a date.");

        return;
    }


    const existing =
        journals.find(
            j => j.date === date
        );


    if (existing) {

        existing.accomplishments =
            accomplishments;

        existing.improve =
            improve;

        existing.tomorrow =
            tomorrow;

    }
    else {

        journals.push({

            id: Date.now().toString(),

            date,

            accomplishments,

            improve,

            tomorrow

        });

    }


    saveStorage();

    renderJournals();

    generateEndOfDayReport();

    alert("Journal saved.");

}


function loadJournal(date) {

    const journal =
        journals.find(
            j => j.date === date
        );


    if (!journal) {

        setValue(
            "journalAccomplishments",
            ""
        );

        setValue(
            "journalImprove",
            ""
        );

        setValue(
            "journalTomorrow",
            ""
        );

        return;
    }


    setValue(
        "journalAccomplishments",
        journal.accomplishments
    );

    setValue(
        "journalImprove",
        journal.improve
    );

    setValue(
        "journalTomorrow",
        journal.tomorrow
    );

}


function renderJournals() {

    const container =
        document.getElementById(
            "journalHistory"
        );

    if (!container) {
        return;
    }


    const list =
        journals
            .slice()
            .sort(
                (a,b) =>
                    b.date.localeCompare(a.date)
            );


    if (list.length === 0) {

        container.innerHTML =
            `<p class="empty">
                No journal entries yet.
             </p>`;

        return;
    }


    container.innerHTML =
        list.map(j => `

            <div class="journal-entry">

                <h3>
                    ${escapeHTML(j.date)}
                </h3>

                <p>
                    <strong>Accomplishments:</strong>
                    ${escapeHTML(j.accomplishments || "None")}
                </p>

                <p>
                    <strong>Improve:</strong>
                    ${escapeHTML(j.improve || "None")}
                </p>

                <p>
                    <strong>Tomorrow:</strong>
                    ${escapeHTML(j.tomorrow || "None")}
                </p>

            </div>

        `).join("");

}


function generateEndOfDayReport() {

    const container =
        document.getElementById(
            "endOfDayReport"
        );

    if (!container) {
        return;
    }


    const date =
        document.getElementById(
            "journalDate"
        ).value ||
        getToday();


    const study =
        getTotal(
            "Study",
            date
        );

    const exercise =
        getTotal(
            "Exercise",
            date
        );

    const learning =
        getTotal(
            "Learning",
            date
        );

    const sleep =
        getTotal(
            "Sleep",
            date
        );

    const calories =
        getCalories(date);


    const score =
        calculateWellnessScore(date);


    const dayTasks =
        tasks.filter(
            t => t.date === date
        );


    const completedTasks =
        dayTasks.filter(
            t => t.completed
        ).length;


    container.innerHTML = `

        <div class="report-box">

            <div class="report-item">
                <strong>Date:</strong>
                ${escapeHTML(date)}
            </div>

            <div class="report-item">
                <strong>Study:</strong>
                ${formatMinutes(study)}
            </div>

            <div class="report-item">
                <strong>Exercise:</strong>
                ${formatMinutes(exercise)}
            </div>

            <div class="report-item">
                <strong>Learning:</strong>
                ${formatMinutes(learning)}
            </div>

            <div class="report-item">
                <strong>Sleep:</strong>
                ${formatMinutes(sleep)}
            </div>

            <div class="report-item">
                <strong>Calories:</strong>
                ${Math.round(calories)} kcal
            </div>

            <div class="report-item">
                <strong>Tasks:</strong>
                ${completedTasks}/${dayTasks.length}
                completed
            </div>

            <div class="report-item">
                <strong>Wellness Score:</strong>
                ${score}/100
            </div>

        </div>

    `;

}


/* =========================================================
   HISTORY / JOURNAL DATE EVENTS
========================================================= */

function setupEvents() {

    const journalDate =
        document.getElementById(
            "journalDate"
        );

    if (journalDate) {

        journalDate.addEventListener(
            "change",
            () => {

                loadJournal(
                    journalDate.value
                );

                generateEndOfDayReport();

            }
        );

    }

}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setDefaultDates();

        updateClock();

        setInterval(
            updateClock,
            1000
        );


        toggleExercise();

        toggleLearning();


        addFoodRow();

        addGravyRow();


        updateTimerDisplay();

        updateBMI();

        updateQuote();

        setupEvents();

        refreshPage();

        renderWellnessDetails();

    }
);


/* =========================================================
   EXTRA REFRESH FOR WELLNESS
========================================================= */

const originalRefreshPage =
    refreshPage;

refreshPage = function() {

    originalRefreshPage();

    renderWellnessDetails();

    generateEndOfDayReport();

};


/* =========================================================
   JOURNAL DATE LOAD
========================================================= */

setTimeout(
    () => {

        const date =
            document.getElementById(
                "journalDate"
            );

        if (date) {

            loadJournal(
                date.value ||
                getToday()
            );

        }

    },
    100
);