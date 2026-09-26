/* =========================================================
   LIFE TRACK
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentUser = null;

let activities = [];
let nutritionRecords = [];
let bodyRecords = [];
let tasks = [];
let focusSessions = [];
let journals = [];
let customFoods = [];

let waterCount = 0;
let selectedMood = null;

let focusDuration = 25;
let focusRemaining = 25 * 60;

let focusTimerInterval = null;
let focusRunning = false;

let editingActivityId = null;

let activityChartInstance = null;
let nutritionChartInstance = null;
let weightChartInstance = null;


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
   QUOTES
========================================================= */

const quotes = [

    {
        text: "Small progress is still progress.",
        author: "LifeTrack"
    },

    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },

    {
        text:
            "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier"
    },

    {
        text:
            "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },

    {
        text:
            "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },

    {
        text:
            "Your habits shape your future.",
        author: "LifeTrack"
    }

];


/* =========================================================
   INDIAN FOOD DATABASE
   APPROXIMATE VALUES PER 100g/ml
========================================================= */

const INDIAN_FOODS = {

    idli: {
        name: "Idli",
        category: "South Indian",
        unit: "piece",
        serving: 40,
        kcal: 146,
        protein: 4.5,
        carbs: 30,
        fat: 0.7
    },

    dosa: {
        name: "Plain Dosa",
        category: "South Indian",
        unit: "piece",
        serving: 80,
        kcal: 168,
        protein: 3.9,
        carbs: 29,
        fat: 4
    },

    masalaDosa: {
        name: "Masala Dosa",
        category: "South Indian",
        unit: "piece",
        serving: 150,
        kcal: 210,
        protein: 4.5,
        carbs: 32,
        fat: 7
    },

    ravaDosa: {
        name: "Rava Dosa",
        category: "South Indian",
        unit: "piece",
        serving: 100,
        kcal: 185,
        protein: 4,
        carbs: 28,
        fat: 6
    },

    uttapam: {
        name: "Uttapam",
        category: "South Indian",
        unit: "piece",
        serving: 100,
        kcal: 170,
        protein: 4,
        carbs: 29,
        fat: 4
    },

    pongal: {
        name: "Ven Pongal",
        category: "South Indian",
        unit: "g",
        kcal: 170,
        protein: 4,
        carbs: 27,
        fat: 5
    },

    upma: {
        name: "Vegetable Upma",
        category: "South Indian",
        unit: "g",
        kcal: 150,
        protein: 4,
        carbs: 25,
        fat: 4
    },

    poha: {
        name: "Poha",
        category: "Indian Main",
        unit: "g",
        kcal: 170,
        protein: 3,
        carbs: 30,
        fat: 4
    },

    appam: {
        name: "Appam",
        category: "South Indian",
        unit: "piece",
        serving: 70,
        kcal: 150,
        protein: 2,
        carbs: 31,
        fat: 1
    },

    puttu: {
        name: "Puttu",
        category: "South Indian",
        unit: "g",
        kcal: 160,
        protein: 3,
        carbs: 32,
        fat: 2
    },

    pesarattu: {
        name: "Pesarattu",
        category: "South Indian",
        unit: "piece",
        serving: 100,
        kcal: 180,
        protein: 8,
        carbs: 25,
        fat: 5
    },

    adai: {
        name: "Adai",
        category: "South Indian",
        unit: "piece",
        serving: 100,
        kcal: 190,
        protein: 8,
        carbs: 27,
        fat: 6
    },

    paniyaram: {
        name: "Paniyaram",
        category: "South Indian",
        unit: "piece",
        serving: 30,
        kcal: 170,
        protein: 4,
        carbs: 28,
        fat: 5
    },

    meduVada: {
        name: "Medu Vada",
        category: "South Indian",
        unit: "piece",
        serving: 60,
        kcal: 290,
        protein: 8,
        carbs: 31,
        fat: 15
    },

    curdRice: {
        name: "Curd Rice",
        category: "South Indian",
        unit: "g",
        kcal: 150,
        protein: 4,
        carbs: 24,
        fat: 4
    },

    lemonRice: {
        name: "Lemon Rice",
        category: "South Indian",
        unit: "g",
        kcal: 175,
        protein: 3,
        carbs: 29,
        fat: 5
    },

    tomatoRice: {
        name: "Tomato Rice",
        category: "South Indian",
        unit: "g",
        kcal: 170,
        protein: 3,
        carbs: 30,
        fat: 4
    },

    tamarindRice: {
        name: "Tamarind Rice",
        category: "South Indian",
        unit: "g",
        kcal: 180,
        protein: 3,
        carbs: 31,
        fat: 5
    },

    coconutRice: {
        name: "Coconut Rice",
        category: "South Indian",
        unit: "g",
        kcal: 190,
        protein: 3,
        carbs: 28,
        fat: 7
    },

    bisibeleBath: {
        name: "Bisi Bele Bath",
        category: "South Indian",
        unit: "g",
        kcal: 170,
        protein: 5,
        carbs: 28,
        fat: 4
    },

    cookedRice: {
        name: "Cooked Rice",
        category: "Rice & Main",
        unit: "g",
        kcal: 130,
        protein: 2.7,
        carbs: 28,
        fat: 0.3
    },

    jeeraRice: {
        name: "Jeera Rice",
        category: "Rice & Main",
        unit: "g",
        kcal: 165,
        protein: 3,
        carbs: 29,
        fat: 4
    },

    vegPulao: {
        name: "Vegetable Pulao",
        category: "Rice & Main",
        unit: "g",
        kcal: 170,
        protein: 3,
        carbs: 27,
        fat: 5
    },

    vegBiryani: {
        name: "Vegetable Biryani",
        category: "Rice & Main",
        unit: "g",
        kcal: 180,
        protein: 4,
        carbs: 28,
        fat: 6
    },

    chickenBiryani: {
        name: "Chicken Biryani",
        category: "Rice & Main",
        unit: "g",
        kcal: 210,
        protein: 10,
        carbs: 25,
        fat: 8
    },

    muttonBiryani: {
        name: "Mutton Biryani",
        category: "Rice & Main",
        unit: "g",
        kcal: 230,
        protein: 11,
        carbs: 25,
        fat: 10
    },

    eggBiryani: {
        name: "Egg Biryani",
        category: "Rice & Main",
        unit: "g",
        kcal: 200,
        protein: 8,
        carbs: 27,
        fat: 7
    },

    khichdi: {
        name: "Khichdi",
        category: "Rice & Main",
        unit: "g",
        kcal: 140,
        protein: 5,
        carbs: 23,
        fat: 3
    },

    chapati: {
        name: "Chapati",
        category: "Indian Bread",
        unit: "piece",
        serving: 35,
        kcal: 297,
        protein: 10,
        carbs: 55,
        fat: 4
    },

    roti: {
        name: "Roti",
        category: "Indian Bread",
        unit: "piece",
        serving: 35,
        kcal: 280,
        protein: 9,
        carbs: 54,
        fat: 4
    },

    naan: {
        name: "Plain Naan",
        category: "Indian Bread",
        unit: "piece",
        serving: 90,
        kcal: 260,
        protein: 9,
        carbs: 45,
        fat: 5
    },

    butterNaan: {
        name: "Butter Naan",
        category: "Indian Bread",
        unit: "piece",
        serving: 100,
        kcal: 310,
        protein: 9,
        carbs: 45,
        fat: 10
    },

    tandooriRoti: {
        name: "Tandoori Roti",
        category: "Indian Bread",
        unit: "piece",
        serving: 50,
        kcal: 250,
        protein: 8,
        carbs: 48,
        fat: 3
    },

    paratha: {
        name: "Plain Paratha",
        category: "Indian Bread",
        unit: "piece",
        serving: 80,
        kcal: 300,
        protein: 7,
        carbs: 40,
        fat: 12
    },

    alooParatha: {
        name: "Aloo Paratha",
        category: "Indian Bread",
        unit: "piece",
        serving: 120,
        kcal: 220,
        protein: 5,
        carbs: 30,
        fat: 8
    },

    gobiParatha: {
        name: "Gobi Paratha",
        category: "Indian Bread",
        unit: "piece",
        serving: 120,
        kcal: 205,
        protein: 5,
        carbs: 31,
        fat: 7
    },

    paneerParatha: {
        name: "Paneer Paratha",
        category: "Indian Bread",
        unit: "piece",
        serving: 120,
        kcal: 240,
        protein: 9,
        carbs: 29,
        fat: 10
    },

    puri: {
        name: "Puri",
        category: "Indian Bread",
        unit: "piece",
        serving: 40,
        kcal: 300,
        protein: 6,
        carbs: 42,
        fat: 12
    },

    bhatura: {
        name: "Bhatura",
        category: "Indian Bread",
        unit: "piece",
        serving: 100,
        kcal: 330,
        protein: 7,
        carbs: 45,
        fat: 13
    },

    sambar: {
        name: "Sambar",
        category: "Gravy",
        unit: "g",
        kcal: 75,
        protein: 3.5,
        carbs: 11,
        fat: 2
    },

    rasam: {
        name: "Rasam",
        category: "Gravy",
        unit: "g",
        kcal: 45,
        protein: 1.5,
        carbs: 7,
        fat: 1
    },

    dalTadka: {
        name: "Dal Tadka",
        category: "Gravy",
        unit: "g",
        kcal: 130,
        protein: 6,
        carbs: 17,
        fat: 4
    },

    dalMakhani: {
        name: "Dal Makhani",
        category: "Gravy",
        unit: "g",
        kcal: 180,
        protein: 7,
        carbs: 18,
        fat: 9
    },

    rajma: {
        name: "Rajma Curry",
        category: "Gravy",
        unit: "g",
        kcal: 140,
        protein: 7,
        carbs: 20,
        fat: 3
    },

    chole: {
        name: "Chole",
        category: "Gravy",
        unit: "g",
        kcal: 160,
        protein: 8,
        carbs: 22,
        fat: 5
    },

    chickenCurry: {
        name: "Chicken Curry",
        category: "Gravy",
        unit: "g",
        kcal: 170,
        protein: 16,
        carbs: 6,
        fat: 9
    },

    chickenGravy: {
        name: "Chicken Gravy",
        category: "Gravy",
        unit: "g",
        kcal: 160,
        protein: 15,
        carbs: 7,
        fat: 8
    },

    butterChicken: {
        name: "Butter Chicken",
        category: "Gravy",
        unit: "g",
        kcal: 210,
        protein: 15,
        carbs: 8,
        fat: 13
    },

    chickenTikkaMasala: {
        name: "Chicken Tikka Masala",
        category: "Gravy",
        unit: "g",
        kcal: 190,
        protein: 16,
        carbs: 9,
        fat: 11
    },

    muttonCurry: {
        name: "Mutton Curry",
        category: "Gravy",
        unit: "g",
        kcal: 220,
        protein: 17,
        carbs: 5,
        fat: 15
    },

    fishCurry: {
        name: "Fish Curry",
        category: "Gravy",
        unit: "g",
        kcal: 130,
        protein: 15,
        carbs: 5,
        fat: 6
    },

    eggCurry: {
        name: "Egg Curry",
        category: "Gravy",
        unit: "g",
        kcal: 150,
        protein: 9,
        carbs: 7,
        fat: 9
    },

    prawnCurry: {
        name: "Prawn Curry",
        category: "Gravy",
        unit: "g",
        kcal: 145,
        protein: 15,
        carbs: 5,
        fat: 7
    },

    vegKurma: {
        name: "Vegetable Kurma",
        category: "Gravy",
        unit: "g",
        kcal: 140,
        protein: 4,
        carbs: 13,
        fat: 8
    },

    paneerButterMasala: {
        name: "Paneer Butter Masala",
        category: "Gravy",
        unit: "g",
        kcal: 210,
        protein: 9,
        carbs: 10,
        fat: 15
    },

    palakPaneer: {
        name: "Palak Paneer",
        category: "Gravy",
        unit: "g",
        kcal: 160,
        protein: 8,
        carbs: 7,
        fat: 11
    },

    shahiPaneer: {
        name: "Shahi Paneer",
        category: "Gravy",
        unit: "g",
        kcal: 220,
        protein: 9,
        carbs: 10,
        fat: 16
    },

    kadaiPaneer: {
        name: "Kadai Paneer",
        category: "Gravy",
        unit: "g",
        kcal: 190,
        protein: 10,
        carbs: 8,
        fat: 13
    },

    matarPaneer: {
        name: "Matar Paneer",
        category: "Gravy",
        unit: "g",
        kcal: 170,
        protein: 9,
        carbs: 11,
        fat: 10
    },

    samosa: {
        name: "Samosa",
        category: "Starters",
        unit: "piece",
        serving: 80,
        kcal: 260,
        protein: 5,
        carbs: 30,
        fat: 13
    },

    kachori: {
        name: "Kachori",
        category: "Starters",
        unit: "piece",
        serving: 70,
        kcal: 280,
        protein: 6,
        carbs: 34,
        fat: 13
    },

    pakora: {
        name: "Pakora",
        category: "Starters",
        unit: "g",
        kcal: 280,
        protein: 6,
        carbs: 30,
        fat: 15
    },

    paneerTikka: {
        name: "Paneer Tikka",
        category: "Starters",
        unit: "g",
        kcal: 220,
        protein: 13,
        carbs: 8,
        fat: 15
    },

    chickenTikka: {
        name: "Chicken Tikka",
        category: "Starters",
        unit: "g",
        kcal: 180,
        protein: 27,
        carbs: 4,
        fat: 7
    },

    tandooriChicken: {
        name: "Tandoori Chicken",
        category: "Starters",
        unit: "g",
        kcal: 190,
        protein: 26,
        carbs: 4,
        fat: 8
    },

    chicken65: {
        name: "Chicken 65",
        category: "Starters",
        unit: "g",
        kcal: 260,
        protein: 20,
        carbs: 12,
        fat: 15
    },

    gobi65: {
        name: "Gobi 65",
        category: "Starters",
        unit: "g",
        kcal: 220,
        protein: 5,
        carbs: 25,
        fat: 11
    },

    chilliPaneer: {
        name: "Chilli Paneer",
        category: "Starters",
        unit: "g",
        kcal: 230,
        protein: 10,
        carbs: 16,
        fat: 14
    },

    chilliChicken: {
        name: "Chilli Chicken",
        category: "Starters",
        unit: "g",
        kcal: 240,
        protein: 18,
        carbs: 15,
        fat: 12
    },

    vegCutlet: {
        name: "Veg Cutlet",
        category: "Starters",
        unit: "piece",
        serving: 60,
        kcal: 180,
        protein: 4,
        carbs: 24,
        fat: 8
    },

    chickenKebab: {
        name: "Chicken Kebab",
        category: "Starters",
        unit: "g",
        kcal: 210,
        protein: 25,
        carbs: 4,
        fat: 10
    },

    fishFry: {
        name: "Fish Fry",
        category: "Starters",
        unit: "g",
        kcal: 220,
        protein: 22,
        carbs: 8,
        fat: 11
    },

    paniPuri: {
        name: "Pani Puri",
        category: "Street Food",
        unit: "piece",
        serving: 25,
        kcal: 120,
        protein: 2,
        carbs: 22,
        fat: 3
    },

    pavBhaji: {
        name: "Pav Bhaji",
        category: "Street Food",
        unit: "g",
        kcal: 190,
        protein: 5,
        carbs: 30,
        fat: 6
    },

    vadaPav: {
        name: "Vada Pav",
        category: "Street Food",
        unit: "piece",
        serving: 120,
        kcal: 290,
        protein: 7,
        carbs: 40,
        fat: 12
    },

    gulabJamun: {
        name: "Gulab Jamun",
        category: "Sweets",
        unit: "piece",
        serving: 45,
        kcal: 320,
        protein: 4,
        carbs: 45,
        fat: 14
    },

    jalebi: {
        name: "Jalebi",
        category: "Sweets",
        unit: "g",
        kcal: 360,
        protein: 1,
        carbs: 88,
        fat: 5
    },

    rasgulla: {
        name: "Rasgulla",
        category: "Sweets",
        unit: "piece",
        serving: 50,
        kcal: 186,
        protein: 4,
        carbs: 35,
        fat: 2
    },

    kheer: {
        name: "Kheer",
        category: "Sweets",
        unit: "g",
        kcal: 150,
        protein: 4,
        carbs: 22,
        fat: 5
    },

    payasam: {
        name: "Payasam",
        category: "Sweets",
        unit: "g",
        kcal: 160,
        protein: 4,
        carbs: 23,
        fat: 6
    },

    gajarHalwa: {
        name: "Gajar Halwa",
        category: "Sweets",
        unit: "g",
        kcal: 180,
        protein: 3,
        carbs: 25,
        fat: 8
    },

    mysorePak: {
        name: "Mysore Pak",
        category: "Sweets",
        unit: "g",
        kcal: 500,
        protein: 8,
        carbs: 50,
        fat: 30
    },

    laddu: {
        name: "Laddu",
        category: "Sweets",
        unit: "piece",
        serving: 40,
        kcal: 420,
        protein: 7,
        carbs: 55,
        fat: 19
    },

    lassi: {
        name: "Lassi",
        category: "Drinks",
        unit: "ml",
        kcal: 70,
        protein: 3,
        carbs: 10,
        fat: 2
    },

    buttermilk: {
        name: "Buttermilk",
        category: "Drinks",
        unit: "ml",
        kcal: 40,
        protein: 2,
        carbs: 4,
        fat: 1
    },

    filterCoffee: {
        name: "Filter Coffee",
        category: "Drinks",
        unit: "ml",
        kcal: 45,
        protein: 2,
        carbs: 6,
        fat: 1.5
    },

    chai: {
        name: "Indian Chai",
        category: "Drinks",
        unit: "ml",
        kcal: 50,
        protein: 2,
        carbs: 7,
        fat: 2
    },

    milk: {
        name: "Milk",
        category: "Drinks",
        unit: "ml",
        kcal: 60,
        protein: 3.2,
        carbs: 4.8,
        fat: 3.3
    },

    banana: {
        name: "Banana",
        category: "Fruits",
        unit: "piece",
        serving: 100,
        kcal: 89,
        protein: 1.1,
        carbs: 23,
        fat: 0.3
    },

    apple: {
        name: "Apple",
        category: "Fruits",
        unit: "piece",
        serving: 150,
        kcal: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2
    },

    orange: {
        name: "Orange",
        category: "Fruits",
        unit: "piece",
        serving: 130,
        kcal: 47,
        protein: 0.9,
        carbs: 12,
        fat: 0.1
    },

    mango: {
        name: "Mango",
        category: "Fruits",
        unit: "g",
        kcal: 60,
        protein: 0.8,
        carbs: 15,
        fat: 0.4
    },

    papaya: {
        name: "Papaya",
        category: "Fruits",
        unit: "g",
        kcal: 43,
        protein: 0.5,
        carbs: 11,
        fat: 0.3
    },

    watermelon: {
        name: "Watermelon",
        category: "Fruits",
        unit: "g",
        kcal: 30,
        protein: 0.6,
        carbs: 8,
        fat: 0.2
    },

    egg: {
        name: "Boiled Egg",
        category: "Protein",
        unit: "piece",
        serving: 50,
        kcal: 155,
        protein: 13,
        carbs: 1.1,
        fat: 11
    },

    chicken: {
        name: "Chicken",
        category: "Protein",
        unit: "g",
        kcal: 239,
        protein: 27,
        carbs: 0,
        fat: 14
    },

    paneer: {
        name: "Paneer",
        category: "Protein",
        unit: "g",
        kcal: 265,
        protein: 18,
        carbs: 6,
        fat: 20
    },

    curd: {
        name: "Curd",
        category: "Dairy",
        unit: "g",
        kcal: 60,
        protein: 3.5,
        carbs: 4.5,
        fat: 3
    }

};


/* =========================================================
   UTILITY
========================================================= */

const $ = id =>
    document.getElementById(id);


function todayKey() {

    const d =
        new Date();

    const y =
        d.getFullYear();

    const m =
        String(
            d.getMonth() + 1
        ).padStart(2,"0");

    const day =
        String(
            d.getDate()
        ).padStart(2,"0");

    return `${y}-${m}-${day}`;

}


function setDefaultDates() {

    const today =
        todayKey();

    [

        "studyDate",
        "exerciseDate",
        "learningDate",
        "entertainmentDate",
        "socialDate",
        "sleepDate",
        "nutritionDate",
        "bodyDate",
        "taskDate",
        "journalDate",
        "historyDate"

    ].forEach(id => {

        if ($(id)) {
            $(id).value = today;
        }

    });

}


function setText(id,value) {

    const el =
        $(id);

    if (el) {
        el.textContent =
            value;
    }

}


function showToast(message) {

    const container =
        $("toastContainer");

    if (!container) return;


    const toast =
        document.createElement("div");

    toast.className =
        "toast";

    toast.textContent =
        message;


    container.appendChild(
        toast
    );


    setTimeout(
        () => toast.remove(),
        3000
    );

}


function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


/* =========================================================
   USER STORAGE
========================================================= */

function storageKey(name) {

    if (!currentUser) {
        return null;
    }

    return (
        "lifetrack_" +
        currentUser.uid +
        "_" +
        name
    );

}


function loadJSON(name,fallback) {

    if (!currentUser) {
        return fallback;
    }

    try {

        const value =
            localStorage.getItem(
                storageKey(name)
            );

        return value
            ? JSON.parse(value)
            : fallback;

    }

    catch {

        return fallback;

    }

}


function saveJSON(name,value) {

    if (!currentUser) return;

    localStorage.setItem(
        storageKey(name),
        JSON.stringify(value)
    );

}


/* =========================================================
   LOAD USER DATA
========================================================= */

function loadUserData() {

    activities =
        loadJSON(
            "activities",
            []
        );

    nutritionRecords =
        loadJSON(
            "nutrition",
            []
        );

    bodyRecords =
        loadJSON(
            "body",
            []
        );

    tasks =
        loadJSON(
            "tasks",
            []
        );

    focusSessions =
        loadJSON(
            "focus",
            []
        );

    journals =
        loadJSON(
            "journals",
            []
        );

    customFoods =
        loadJSON(
            "customFoods",
            []
        );


    const waterData =
        loadJSON(
            "water",
            {}
        );

    waterCount =
        Number(
            waterData[todayKey()] || 0
        );


    const moods =
        loadJSON(
            "moods",
            {}
        );

    selectedMood =
        moods[todayKey()] ||
        null;

}


/* =========================================================
   NAVIGATION
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
        $(pageId);

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

        button.classList.add(
            "active"
        );

    }


    renderAll();

}


function showPageById(id) {

    const button =
        [
            ...document.querySelectorAll(
                ".nav-btn"
            )
        ].find(
            btn =>
                btn.getAttribute(
                    "onclick"
                )?.includes(id)
        );


    showPage(
        id,
        button
    );

}


/* =========================================================
   TIME CALCULATION
========================================================= */

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


    if (
        endMinutes <
        startMinutes
    ) {

        endMinutes +=
            24 * 60;

    }


    return (
        endMinutes -
        startMinutes
    );

}


/* =========================================================
   ACTIVITY SAVE
========================================================= */

function addActivity(
    type,
    date,
    start,
    end,
    details
) {

    const duration =
        calculateDuration(
            start,
            end
        );


    if (!date || !start || !end) {

        showToast(
            "Please enter date and timings."
        );

        return;

    }


    if (duration <= 0) {

        showToast(
            "Please check the start and end time."
        );

        return;

    }


    activities.push({

        id:
            Date.now(),

        type:
            type,

        date:
            date,

        start:
            start,

        end:
            end,

        duration:
            duration,

        details:
            details || "",

        createdAt:
            new Date().toISOString()

    });


    saveJSON(
        "activities",
        activities
    );


    showToast(
        `${type} saved successfully.`
    );


    renderAll();

}


function saveStudy() {

    addActivity(
        "Study",
        $("studyDate").value,
        $("studyStart").value,
        $("studyEnd").value,
        $("studyTopic").value
    );

}


function saveExercise() {

    addActivity(
        "Exercise",
        $("exerciseDate").value,
        $("exerciseStart").value,
        $("exerciseEnd").value,
        $("exerciseType").value
    );

}


function saveLearning() {

    addActivity(
        "Learning",
        $("learningDate").value,
        $("learningStart").value,
        $("learningEnd").value,
        $("learningTopic").value
    );

}


function saveEntertainment() {

    addActivity(
        "Entertainment",
        $("entertainmentDate").value,
        $("entertainmentStart").value,
        $("entertainmentEnd").value,
        $("entertainmentType").value
    );

}


function saveSocial() {

    addActivity(
        "Social Media",
        $("socialDate").value,
        $("socialStart").value,
        $("socialEnd").value,
        $("socialPlatform").value
    );

}


function saveSleep() {

    addActivity(
        "Sleep",
        $("sleepDate").value,
        $("sleepStart").value,
        $("sleepEnd").value,
        "Sleep cycle"
    );

}


/* =========================================================
   ACTIVITY HELPERS
========================================================= */

function getTodayActivities() {

    return activities.filter(
        activity =>
            activity.date === todayKey()
    );

}


function getTodayDuration(type) {

    return getTodayActivities()
        .filter(
            a => a.type === type
        )
        .reduce(
            (sum,a) =>
                sum +
                Number(
                    a.duration || 0
                ),
            0
        );

}


function formatDuration(minutes) {

    minutes =
        Number(minutes || 0);


    if (minutes < 60) {

        return `${minutes} min`;

    }


    const hours =
        Math.floor(
            minutes / 60
        );

    const mins =
        minutes % 60;


    return (
        `${hours}h ${mins}m`
    );

}


/* =========================================================
   EDIT / DELETE
========================================================= */

function deleteActivity(id) {

    if (
        !confirm(
            "Delete this activity?"
        )
    ) {
        return;
    }


    activities =
        activities.filter(
            a =>
                a.id !== id
        );


    saveJSON(
        "activities",
        activities
    );


    showToast(
        "Activity deleted."
    );


    renderAll();

}


function openEditModal(id) {

    const activity =
        activities.find(
            a => a.id === id
        );


    if (!activity) return;


    editingActivityId =
        id;


    $("editForm").innerHTML = `

        <label>Type</label>

        <input
            id="editType"
            value="${escapeHTML(activity.type)}"
        >


        <label>Date</label>

        <input
            type="date"
            id="editDate"
            value="${activity.date}"
        >


        <label>Start Time</label>

        <input
            type="time"
            id="editStart"
            value="${activity.start}"
        >


        <label>End Time</label>

        <input
            type="time"
            id="editEnd"
            value="${activity.end}"
        >


        <label>Details</label>

        <input
            id="editDetails"
            value="${escapeHTML(activity.details)}"
        >

    `;


    $("editModal")
        .classList.add(
            "show"
        );

}


function closeEditModal() {

    editingActivityId =
        null;

    $("editModal")
        .classList.remove(
            "show"
        );

}


function saveEditedActivity() {

    if (!editingActivityId) {
        return;
    }


    const activity =
        activities.find(
            a =>
                a.id ===
                editingActivityId
        );


    if (!activity) {
        return;
    }


    const start =
        $("editStart").value;

    const end =
        $("editEnd").value;


    const duration =
        calculateDuration(
            start,
            end
        );


    if (!duration) {

        showToast(
            "Invalid timing."
        );

        return;

    }


    activity.type =
        $("editType").value;

    activity.date =
        $("editDate").value;

    activity.start =
        start;

    activity.end =
        end;

    activity.duration =
        duration;

    activity.details =
        $("editDetails").value;


    saveJSON(
        "activities",
        activities
    );


    closeEditModal();

    showToast(
        "Activity updated."
    );

    renderAll();

}


/* =========================================================
   FOOD HELPERS
========================================================= */

function getAllFoods() {

    const foods = [];

    Object.values(
        INDIAN_FOODS
    ).forEach(
        food =>
            foods.push(food)
    );


    customFoods.forEach(
        food =>
            foods.push(food)
    );


    return foods;

}


function findFood(name) {

    return getAllFoods()
        .find(
            food =>
                food.name
                    .toLowerCase() ===
                String(name)
                    .toLowerCase()
        );

}


function populateFoodDatalist() {

    const list =
        $("foodDatalist");

    if (!list) return;


    list.innerHTML =
        getAllFoods()
            .map(
                food =>
                    `<option value="${escapeHTML(food.name)}">`
            )
            .join("");

}


/* =========================================================
   FOOD ROW
========================================================= */

function addFoodRow() {

    const container =
        $("foodRows");


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "food-row";


    row.innerHTML = `

        <div>

            <label>Food / Dish</label>

            <input
                class="food-name"
                list="foodDatalist"
                placeholder="Search Indian food"
            >

        </div>


        <div>

            <label>Quantity</label>

            <input
                type="number"
                class="food-quantity"
                value="100"
                min="0"
                step="0.1"
            >

        </div>


        <div>

            <label>Unit</label>

            <select class="food-unit">

                <option value="g">
                    grams
                </option>

                <option value="ml">
                    ml
                </option>

                <option value="piece">
                    piece
                </option>

            </select>

        </div>


        <div>

            <button
                class="remove-food"
                onclick="this.closest('.food-row').remove(); calculateMeal()"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>


        <div class="food-macro">
            Select food to calculate macros.
        </div>

    `;


    container.appendChild(
        row
    );


    const nameInput =
        row.querySelector(
            ".food-name"
        );


    const qtyInput =
        row.querySelector(
            ".food-quantity"
        );


    const unitInput =
        row.querySelector(
            ".food-unit"
        );


    nameInput.addEventListener(
        "input",
        () => {

            const food =
                findFood(
                    nameInput.value
                );


            if (food) {

                unitInput.value =
                    food.unit;

                if (
                    food.unit ===
                    "piece"
                ) {

                    qtyInput.value =
                        1;

                }

            }

            calculateMeal();

        }
    );


    qtyInput.addEventListener(
        "input",
        calculateMeal
    );


    unitInput.addEventListener(
        "change",
        calculateMeal
    );


    calculateMeal();

}


/* =========================================================
   FOOD NUTRITION CALCULATION
========================================================= */

function calculateFoodNutrition(
    food,
    quantity,
    unit
) {

    if (!food) {

        return {
            kcal: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        };

    }


    quantity =
        Number(quantity || 0);


    let grams;


    if (
        unit === "piece"
    ) {

        grams =
            quantity *
            Number(
                food.serving ||
                100
            );

    }

    else {

        grams =
            quantity;

    }


    const multiplier =
        grams / 100;


    return {

        kcal:
            food.kcal *
            multiplier,

        protein:
            food.protein *
            multiplier,

        carbs:
            food.carbs *
            multiplier,

        fat:
            food.fat *
            multiplier

    };

}


/* =========================================================
   MEAL CALCULATION
========================================================= */

function calculateMeal() {

    const rows =
        document.querySelectorAll(
            ".food-row"
        );


    let totals = {

        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0

    };


    rows.forEach(row => {

        const name =
            row.querySelector(
                ".food-name"
            )?.value;


        const quantity =
            row.querySelector(
                ".food-quantity"
            )?.value;


        const unit =
            row.querySelector(
                ".food-unit"
            )?.value;


        const food =
            findFood(name);


        const nutrition =
            calculateFoodNutrition(
                food,
                quantity,
                unit
            );


        totals.kcal +=
            nutrition.kcal;

        totals.protein +=
            nutrition.protein;

        totals.carbs +=
            nutrition.carbs;

        totals.fat +=
            nutrition.fat;


        const macro =
            row.querySelector(
                ".food-macro"
            );


        if (macro) {

            if (food) {

                macro.textContent =
                    `${nutrition.kcal.toFixed(0)} kcal | ` +
                    `P ${nutrition.protein.toFixed(1)}g | ` +
                    `C ${nutrition.carbs.toFixed(1)}g | ` +
                    `F ${nutrition.fat.toFixed(1)}g`;

            }

            else {

                macro.textContent =
                    "Select food to calculate.";

            }

        }

    });


    setText(
        "mealCalories",
        `${totals.kcal.toFixed(0)} kcal`
    );

    setText(
        "mealProtein",
        totals.protein.toFixed(1)
    );

    setText(
        "mealCarbs",
        totals.carbs.toFixed(1)
    );

    setText(
        "mealFat",
        totals.fat.toFixed(1)
    );


    return totals;

}


/* =========================================================
   SAVE NUTRITION MEAL
========================================================= */

function saveNutritionMeal() {

    const rows =
        document.querySelectorAll(
            ".food-row"
        );


    if (!rows.length) {

        showToast(
            "Add at least one food."
        );

        return;

    }


    const items = [];


    rows.forEach(row => {

        const name =
            row.querySelector(
                ".food-name"
            ).value;


        const quantity =
            Number(
                row.querySelector(
                    ".food-quantity"
                ).value
            );


        const unit =
            row.querySelector(
                ".food-unit"
            ).value;


        const food =
            findFood(name);


        if (food && quantity > 0) {

            const nutrition =
                calculateFoodNutrition(
                    food,
                    quantity,
                    unit
                );


            items.push({

                name:
                    food.name,

                quantity:
                    quantity,

                unit:
                    unit,

                kcal:
                    nutrition.kcal,

                protein:
                    nutrition.protein,

                carbs:
                    nutrition.carbs,

                fat:
                    nutrition.fat

            });

        }

    });


    if (!items.length) {

        showToast(
            "Please select valid foods."
        );

        return;

    }


    const totals =
        items.reduce(
            (sum,item) => {

                sum.kcal +=
                    item.kcal;

                sum.protein +=
                    item.protein;

                sum.carbs +=
                    item.carbs;

                sum.fat +=
                    item.fat;

                return sum;

            },
            {
                kcal: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            }
        );


    nutritionRecords.push({

        id:
            Date.now(),

        date:
            $("nutritionDate").value ||
            todayKey(),

        meal:
            $("nutritionMeal").value,

        items:
            items,

        calories:
            totals.kcal,

        protein:
            totals.protein,

        carbs:
            totals.carbs,

        fat:
            totals.fat,

        createdAt:
            new Date().toISOString()

    });


    saveJSON(
        "nutrition",
        nutritionRecords
    );


    $("foodRows").innerHTML =
        "";


    addFoodRow();


    showToast(
        "Meal saved successfully."
    );


    renderAll();

}


/* =========================================================
   CUSTOM FOOD
========================================================= */

function saveCustomFood() {

    const name =
        $("customFoodName").value.trim();


    const category =
        $("customFoodCategory").value.trim() ||
        "Custom";


    const kcal =
        Number(
            $("customKcal").value
        );


    const protein =
        Number(
            $("customProtein").value
        );


    const carbs =
        Number(
            $("customCarbs").value
        );


    const fat =
        Number(
            $("customFat").value
        );


    if (
        !name ||
        !kcal
    ) {

        showToast(
            "Enter food name and calories."
        );

        return;

    }


    customFoods.push({

        name:
            name,

        category:
            category,

        unit:
            "g",

        kcal:
            kcal,

        protein:
            protein,

        carbs:
            carbs,

        fat:
            fat

    });


    saveJSON(
        "customFoods",
        customFoods
    );


    $("customFoodName").value =
        "";

    $("customFoodCategory").value =
        "";

    $("customKcal").value =
        "";

    $("customProtein").value =
        "";

    $("customCarbs").value =
        "";

    $("customFat").value =
        "";


    populateFoodDatalist();

    showToast(
        "Custom food added."
    );

}


/* =========================================================
   NUTRITION TOTALS
========================================================= */

function getNutritionTotals(date) {

    return nutritionRecords
        .filter(
            record =>
                record.date === date
        )
        .reduce(
            (sum,record) => {

                sum.calories +=
                    Number(
                        record.calories || 0
                    );

                sum.protein +=
                    Number(
                        record.protein || 0
                    );

                sum.carbs +=
                    Number(
                        record.carbs || 0
                    );

                sum.fat +=
                    Number(
                        record.fat || 0
                    );

                return sum;

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
   DELETE NUTRITION
========================================================= */

function deleteNutrition(id) {

    nutritionRecords =
        nutritionRecords.filter(
            record =>
                record.id !== id
        );


    saveJSON(
        "nutrition",
        nutritionRecords
    );


    showToast(
        "Nutrition record deleted."
    );


    renderAll();

}


/* =========================================================
   BODY / BMI
========================================================= */

function saveBodyRecord() {

    const date =
        $("bodyDate").value ||
        todayKey();


    const weight =
        Number(
            $("bodyWeight").value
        );


    const height =
        Number(
            $("bodyHeight").value
        );


    if (
        !weight ||
        !height
    ) {

        showToast(
            "Enter weight and height."
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
            date,

        weight:
            weight,

        height:
            height,

        bmi:
            bmi

    });


    saveJSON(
        "body",
        bodyRecords
    );


    setText(
        "bmiValue",
        bmi.toFixed(1)
    );


    setText(
        "bmiStatus",
        getBMIStatus(bmi)
    );


    showToast(
        "Body data saved."
    );


    renderAll();

}


function getBMIStatus(bmi) {

    if (bmi < 18.5) {
        return "Below reference range";
    }

    if (bmi < 25) {
        return "Reference range";
    }

    if (bmi < 30) {
        return "Above reference range";
    }

    return "High BMI range";

}


/* =========================================================
   WATER
========================================================= */

function saveWater() {

    const waterData =
        loadJSON(
            "water",
            {}
        );


    waterData[
        todayKey()
    ] =
        waterCount;


    saveJSON(
        "water",
        waterData
    );

}


function addWater() {

    if (
        waterCount <
        8
    ) {

        waterCount++;

    }


    saveWater();

    renderDashboard();

}


function removeWater() {

    if (
        waterCount >
        0
    ) {

        waterCount--;

    }


    saveWater();

    renderDashboard();

}


function resetWater() {

    waterCount =
        0;

    saveWater();

    renderDashboard();

}


/* =========================================================
   MOOD
========================================================= */

function setMood(emoji,label) {

    selectedMood = {

        emoji:
            emoji,

        label:
            label

    };


    const moods =
        loadJSON(
            "moods",
            {}
        );


    moods[
        todayKey()
    ] =
        selectedMood;


    saveJSON(
        "moods",
        moods
    );


    renderDashboard();

    showToast(
        `Mood saved: ${label}`
    );

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const study =
        getTodayDuration(
            "Study"
        );


    const exercise =
        getTodayDuration(
            "Exercise"
        );


    const learning =
        getTodayDuration(
            "Learning"
        );


    const sleep =
        getTodayDuration(
            "Sleep"
        );


    const entertainment =
        getTodayDuration(
            "Entertainment"
        );


    const social =
        getTodayDuration(
            "Social Media"
        );


    const screen =
        entertainment +
        social;


    const nutrition =
        getNutritionTotals(
            todayKey()
        );


    setText(
        "dashStudy",
        formatDuration(study)
    );


    setText(
        "dashExercise",
        formatDuration(exercise)
    );


    setText(
        "dashLearning",
        formatDuration(learning)
    );


    setText(
        "dashSleep",
        formatDuration(sleep)
    );


    setText(
        "dashScreen",
        formatDuration(screen)
    );


    setText(
        "dashCalories",
        `${nutrition.calories.toFixed(0)} kcal`
    );


    setText(
        "dashNutritionCalories",
        nutrition.calories.toFixed(0)
    );


    setText(
        "dashProtein",
        nutrition.protein.toFixed(1)
    );


    setText(
        "dashCarbs",
        nutrition.carbs.toFixed(1)
    );


    setText(
        "dashFat",
        nutrition.fat.toFixed(1)
    );


    setText(
        "dashWater",
        waterCount
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


    const now =
        new Date();


    const hour =
        now.getHours();


    let greeting =
        "Good Morning!";


    if (hour >= 12 && hour < 17) {
        greeting =
            "Good Afternoon!";
    }

    else if (hour >= 17) {
        greeting =
            "Good Evening!";
    }


    setText(
        "greetingText",
        greeting
    );


    setText(
        "heroDate",
        now.toLocaleDateString(
            undefined,
            {
                weekday:
                    "long",
                year:
                    "numeric",
                month:
                    "long",
                day:
                    "numeric"
            }
        )
    );


    updateProductivity();

    updateStreak();

    updateWaterUI();

    updateMoodUI();

    updateSmartInsight();

}


/* =========================================================
   PROGRESS
========================================================= */

function setProgress(
    id,
    value,
    goal
) {

    const element =
        $(id);

    if (!element) return;


    const percentage =
        Math.min(
            100,
            Math.max(
                0,
                (value / goal) * 100
            )
        );


    element.style.width =
        percentage + "%";

}


/* =========================================================
   PRODUCTIVITY
========================================================= */

function updateProductivity() {

    const study =
        getTodayDuration(
            "Study"
        );


    const exercise =
        getTodayDuration(
            "Exercise"
        );


    const learning =
        getTodayDuration(
            "Learning"
        );


    const sleep =
        getTodayDuration(
            "Sleep"
        );


    const screen =
        getTodayDuration(
            "Entertainment"
        ) +
        getTodayDuration(
            "Social Media"
        );


    const calories =
        getNutritionTotals(
            todayKey()
        ).calories;


    const goals = [

        study >= DAILY_GOALS.study,

        exercise >= DAILY_GOALS.exercise,

        learning >= DAILY_GOALS.learning,

        sleep >= DAILY_GOALS.sleep,

        screen <= DAILY_GOALS.screen,

        calories > 0

    ];


    const completed =
        goals.filter(Boolean)
            .length;


    const percentage =
        Math.round(
            completed / 6 * 100
        );


    setText(
        "productivityPercent",
        `${percentage}%`
    );


    setText(
        "completedGoals",
        `${completed} / 6 goals`
    );


    let status =
        "Start your day";


    let message =
        "Add activities to calculate your productivity.";


    if (percentage >= 80) {

        status =
            "Excellent progress";

        message =
            "You are completing most of today's targets.";

    }

    else if (percentage >= 50) {

        status =
            "Good progress";

        message =
            "You're building a productive routine.";

    }

    else if (percentage > 0) {

        status =
            "Keep going";

        message =
            "A few more activities will improve your score.";

    }


    setText(
        "productivityStatus",
        status
    );


    setText(
        "productivityMessage",
        message
    );


    const ring =
        $("productivityRing");


    if (ring) {

        ring.style.background =
            `conic-gradient(
                var(--cyan)
                ${percentage * 3.6}deg,
                rgba(255,255,255,0.06)
                ${percentage * 3.6}deg
            )`;

    }

}


/* =========================================================
   STREAK
========================================================= */

function updateStreak() {

    let streak =
        0;


    const dates =
        new Set(
            activities.map(
                activity =>
                    activity.date
            )
        );


    let date =
        new Date();


    while (true) {

        const key =
            date.toISOString()
                .slice(0,10);


        if (
            dates.has(key)
        ) {

            streak++;

            date.setDate(
                date.getDate() - 1
            );

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
        $("streakDays");


    if (!container) return;


    container.innerHTML =
        "";


    for (
        let i = 6;
        i >= 0;
        i--
    ) {

        const d =
            new Date();


        d.setDate(
            d.getDate() - i
        );


        const key =
            d.toISOString()
                .slice(0,10);


        const day =
            document.createElement(
                "div"
            );


        day.className =
            "streak-day";


        if (
            dates.has(key)
        ) {

            day.classList.add(
                "active"
            );

        }


        day.textContent =
            d.toLocaleDateString(
                undefined,
                {
                    weekday:
                        "short"
                }
            ).slice(0,2);


        container.appendChild(
            day
        );

    }

}


/* =========================================================
   QUOTE
========================================================= */

function changeQuote() {

    const index =
        Math.floor(
            Math.random() *
            quotes.length
        );


    const quote =
        quotes[index];


    setText(
        "dailyQuote",
        quote.text
    );


    setText(
        "quoteAuthor",
        `— ${quote.author}`
    );

}


/* =========================================================
   WATER UI
========================================================= */

function updateWaterUI() {

    setText(
        "waterCount",
        waterCount
    );


    const fill =
        $("waterFill");


    if (fill) {

        fill.style.height =
            `${Math.min(100, waterCount / 8 * 100)}%`;

    }


    let message =
        "Stay hydrated throughout the day.";


    if (waterCount >= 8) {

        message =
            "Great! Daily water target reached.";

    }

    else if (waterCount >= 5) {

        message =
            "Good progress. Keep drinking water.";

    }


    setText(
        "waterMessage",
        message
    );

}


/* =========================================================
   MOOD UI
========================================================= */

function updateMoodUI() {

    if (!selectedMood) {

        setText(
            "selectedMood",
            "Not selected"
        );

        return;

    }


    setText(
        "selectedMood",
        `${selectedMood.emoji} ${selectedMood.label}`
    );

}


/* =========================================================
   SMART INSIGHT
========================================================= */

function updateSmartInsight() {

    const study =
        getTodayDuration(
            "Study"
        );


    const exercise =
        getTodayDuration(
            "Exercise"
        );


    const sleep =
        getTodayDuration(
            "Sleep"
        );


    const screen =
        getTodayDuration(
            "Entertainment"
        ) +
        getTodayDuration(
            "Social Media"
        );


    let title =
        "Your personal dashboard is ready.";


    let message =
        "Add a few activities to receive a personalized insight.";


    if (sleep > 0 && sleep < 360) {

        title =
            "Sleep deserves attention today.";

        message =
            "Your recorded sleep is below the daily reference target.";

    }

    else if (
        screen >
        DAILY_GOALS.screen
    ) {

        title =
            "Your screen time is high.";

        message =
            "Consider replacing some screen time with exercise or focused learning.";

    }

    else if (
        exercise <
        DAILY_GOALS.exercise
    ) {

        title =
            "Add some movement.";

        message =
            "A short walk or workout can help balance your day.";

    }

    else if (
        study >=
        DAILY_GOALS.study
    ) {

        title =
            "Strong study progress.";

        message =
            "You've reached your study reference target today.";

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
   NUTRITION RENDER
========================================================= */

function renderNutrition() {

    const totals =
        getNutritionTotals(
            todayKey()
        );


    setText(
        "nutritionTotalCalories",
        totals.calories.toFixed(0)
    );


    setText(
        "nutritionTotalProtein",
        totals.protein.toFixed(1)
    );


    setText(
        "nutritionTotalCarbs",
        totals.carbs.toFixed(1)
    );


    setText(
        "nutritionTotalFat",
        totals.fat.toFixed(1)
    );


    const list =
        $("nutritionRecordsList");


    if (!list) return;


    const records =
        nutritionRecords
            .slice()
            .reverse();


    if (!records.length) {

        list.innerHTML =
            `<p class="helper">
                No nutrition records yet.
            </p>`;

        return;

    }


    list.innerHTML =
        records.map(
            record => `

                <div class="record-item">

                    <div>

                        <h3>
                            ${escapeHTML(record.meal)}
                            —
                            ${record.calories.toFixed(0)} kcal
                        </h3>

                        <p>
                            ${record.date}
                            |
                            P ${record.protein.toFixed(1)}g
                            |
                            C ${record.carbs.toFixed(1)}g
                            |
                            F ${record.fat.toFixed(1)}g
                        </p>

                        <p>
                            ${record.items
                                .map(
                                    item =>
                                        `${escapeHTML(item.name)} (${item.quantity}${item.unit})`
                                )
                                .join(", ")
                            }
                        </p>

                    </div>

                    <button
                        class="delete-btn"
                        onclick="deleteNutrition(${record.id})"
                    >
                        Delete
                    </button>

                </div>

            `
        )
        .join("");

}


/* =========================================================
   PLANNER
========================================================= */

function addTask() {

    const date =
        $("taskDate").value ||
        todayKey();


    const name =
        $("taskName").value.trim();


    const start =
        $("taskStart").value;


    const end =
        $("taskEnd").value;


    const priority =
        $("taskPriority").value;


    if (
        !name ||
        !start ||
        !end
    ) {

        showToast(
            "Enter task details and timing."
        );

        return;

    }


    tasks.push({

        id:
            Date.now(),

        date:
            date,

        name:
            name,

        start:
            start,

        end:
            end,

        priority:
            priority,

        completed:
            false

    });


    saveJSON(
        "tasks",
        tasks
    );


    $("taskName").value =
        "";

    $("taskStart").value =
        "";

    $("taskEnd").value =
        "";


    renderPlanner();

    showToast(
        "Task added."
    );

}


function toggleTask(id) {

    const task =
        tasks.find(
            t => t.id === id
        );


    if (!task) return;


    task.completed =
        !task.completed;


    saveJSON(
        "tasks",
        tasks
    );


    renderPlanner();

}


function deleteTask(id) {

    tasks =
        tasks.filter(
            t =>
                t.id !== id
        );


    saveJSON(
        "tasks",
        tasks
    );


    renderPlanner();

}


function renderPlanner() {

    const list =
        $("taskList");


    if (!list) return;


    const selectedDate =
        $("taskDate")?.value ||
        todayKey();


    const filtered =
        tasks.filter(
            task =>
                task.date ===
                selectedDate
        );


    const completed =
        filtered.filter(
            task =>
                task.completed
        ).length;


    setText(
        "taskTotal",
        filtered.length
    );


    setText(
        "taskCompleted",
        completed
    );


    setText(
        "taskPending",
        filtered.length -
        completed
    );


    if (!filtered.length) {

        list.innerHTML =
            `<div class="nutrition-card">
                <p class="helper">
                    No tasks planned for this date.
                </p>
            </div>`;

        return;

    }


    list.innerHTML =
        filtered.map(
            task => `

                <div class="task-item
                    ${task.completed ? "completed" : ""}">

                    <div class="task-left">

                        <input
                            type="checkbox"
                            ${task.completed ? "checked" : ""}
                            onchange="toggleTask(${task.id})"
                        >

                        <div>

                            <div class="task-name">
                                ${escapeHTML(task.name)}
                            </div>

                            <small>
                                ${task.start}
                                -
                                ${task.end}
                            </small>

                        </div>

                    </div>


                    <div>

                        <span class="
                            priority-${task.priority.toLowerCase()}
                        ">
                            ${task.priority}
                        </span>

                        <button
                            class="delete-btn"
                            onclick="deleteTask(${task.id})"
                        >
                            Delete
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

function setFocusDuration(minutes) {

    if (focusRunning) {
        return;
    }


    focusDuration =
        minutes;

    focusRemaining =
        minutes * 60;


    updateFocusDisplay();

}


function updateFocusDisplay() {

    const mins =
        Math.floor(
            focusRemaining / 60
        );


    const secs =
        focusRemaining % 60;


    setText(
        "focusTime",
        `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`
    );

}


function toggleFocusTimer() {

    if (focusRunning) {

        clearInterval(
            focusTimerInterval
        );

        focusRunning =
            false;


        setText(
            "focusStartBtn",
            "Start"
        );


        return;

    }


    focusRunning =
        true;


    setText(
        "focusStartBtn",
        "Pause"
    );


    focusTimerInterval =
        setInterval(
            () => {

                focusRemaining--;


                updateFocusDisplay();


                if (
                    focusRemaining <=
                    0
                ) {

                    clearInterval(
                        focusTimerInterval
                    );


                    focusRunning =
                        false;


                    recordFocusSession();

                    focusRemaining =
                        focusDuration *
                        60;


                    setText(
                        "focusStartBtn",
                        "Start"
                    );


                    updateFocusDisplay();

                }

            },
            1000
        );

}


function resetFocusTimer() {

    clearInterval(
        focusTimerInterval
    );


    focusRunning =
        false;


    focusRemaining =
        focusDuration * 60;


    setText(
        "focusStartBtn",
        "Start"
    );


    updateFocusDisplay();

}


function recordFocusSession() {

    focusSessions.push({

        id:
            Date.now(),

        date:
            todayKey(),

        minutes:
            focusDuration

    });


    saveJSON(
        "focus",
        focusSessions
    );


    renderFocusHistory();


    showToast(
        `${focusDuration}-minute focus session completed.`
    );

}


function renderFocusHistory() {

    const list =
        $("focusHistory");


    if (!list) return;


    const records =
        focusSessions
            .slice()
            .reverse()
            .slice(0,20);


    if (!records.length) {

        list.innerHTML =
            `<p class="helper">
                No focus sessions yet.
            </p>`;

        return;

    }


    list.innerHTML =
        records.map(
            session => `

                <div class="record-item">

                    <div>

                        <h3>
                            Focus Session
                        </h3>

                        <p>
                            ${session.date}
                            —
                            ${session.minutes} minutes
                        </p>

                    </div>

                </div>

            `
        )
        .join("");

}


/* =========================================================
   GOALS
========================================================= */

function renderGoals() {

    const study =
        getTodayDuration(
            "Study"
        );

    const exercise =
        getTodayDuration(
            "Exercise"
        );

    const learning =
        getTodayDuration(
            "Learning"
        );

    const sleep =
        getTodayDuration(
            "Sleep"
        );

    const screen =
        getTodayDuration(
            "Entertainment"
        ) +
        getTodayDuration(
            "Social Media"
        );

    const calories =
        getNutritionTotals(
            todayKey()
        ).calories;


    setGoal(
        "Study",
        study,
        DAILY_GOALS.study,
        "goalStudyProgress",
        "goalStudyBar"
    );


    setGoal(
        "Exercise",
        exercise,
        DAILY_GOALS.exercise,
        "goalExerciseProgress",
        "goalExerciseBar"
    );


    setGoal(
        "Learning",
        learning,
        DAILY_GOALS.learning,
        "goalLearningProgress",
        "goalLearningBar"
    );


    setGoal(
        "Sleep",
        sleep,
        DAILY_GOALS.sleep,
        "goalSleepProgress",
        "goalSleepBar"
    );


    setGoal(
        "Screen Time",
        screen,
        DAILY_GOALS.screen,
        "goalScreenProgress",
        "goalScreenBar",
        true
    );


    setGoal(
        "Calories",
        calories,
        DAILY_GOALS.calories,
        "goalCaloriesProgress",
        "goalCaloriesBar"
    );


    const tips = [];


    if (
        study <
        DAILY_GOALS.study
    ) {
        tips.push(
            "Complete more focused study time today."
        );
    }


    if (
        exercise <
        DAILY_GOALS.exercise
    ) {
        tips.push(
            "Add at least a short exercise session."
        );
    }


    if (
        learning <
        DAILY_GOALS.learning
    ) {
        tips.push(
            "Spend some time learning something new."
        );
    }


    if (
        waterCount <
        8
    ) {
        tips.push(
            "Keep working toward 8 glasses of water."
        );
    }


    if (!tips.length) {

        tips.push(
            "Great work. You are meeting your main daily references."
        );

    }


    $("goalTips").innerHTML =
        tips.map(
            tip =>
                `<div class="tip">
                    <i class="fa-solid fa-check"></i>
                    ${escapeHTML(tip)}
                </div>`
        ).join("");

}


function setGoal(
    name,
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
                    ((value - target) / target * 100)
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
        `${Math.round(value)} / ${target}${name === "Calories" ? " kcal" : " min"}`
    );


    const bar =
        $(barId);


    if (bar) {

        bar.style.width =
            `${percentage}%`;

    }

}


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

    const date =
        $("historyDate")?.value;


    const month =
        $("historyMonth")?.value;


    let records =
        activities;


    if (date) {

        records =
            records.filter(
                activity =>
                    activity.date ===
                    date
            );

    }

    else if (month) {

        records =
            records.filter(
                activity =>
                    activity.date.startsWith(
                        month
                    )
            );

    }


    const study =
        records
            .filter(
                a =>
                    a.type ===
                    "Study"
            )
            .reduce(
                (s,a) =>
                    s + Number(a.duration),
                0
            );


    const exercise =
        records
            .filter(
                a =>
                    a.type ===
                    "Exercise"
            )
            .reduce(
                (s,a) =>
                    s + Number(a.duration),
                0
            );


    const learning =
        records
            .filter(
                a =>
                    a.type ===
                    "Learning"
            )
            .reduce(
                (s,a) =>
                    s + Number(a.duration),
                0
            );


    const sleep =
        records
            .filter(
                a =>
                    a.type ===
                    "Sleep"
            )
            .reduce(
                (s,a) =>
                    s + Number(a.duration),
                0
            );


    setText(
        "historyStudy",
        formatDuration(study)
    );


    setText(
        "historyExercise",
        formatDuration(exercise)
    );


    setText(
        "historyLearning",
        formatDuration(learning)
    );


    setText(
        "historySleep",
        formatDuration(sleep)
    );


    const list =
        $("historyList");


    if (!list) return;


    if (!records.length) {

        list.innerHTML =
            `<div class="nutrition-card">
                <p class="helper">
                    No activity records found.
                </p>
            </div>`;

        return;

    }


    list.innerHTML =
        records
            .slice()
            .reverse()
            .map(
                activity => `

                    <div class="history-item">

                        <div class="history-item-header">

                            <div>

                                <h3>
                                    ${escapeHTML(activity.type)}
                                </h3>

                                <p>
                                    ${escapeHTML(activity.date)}
                                    |
                                    ${escapeHTML(activity.start)}
                                    -
                                    ${escapeHTML(activity.end)}
                                    |
                                    ${formatDuration(activity.duration)}
                                </p>

                                <p>
                                    ${escapeHTML(activity.details)}
                                </p>

                            </div>


                            <div class="history-actions">

                                <button
                                    class="outline-btn"
                                    onclick="openEditModal(${activity.id})"
                                >
                                    Edit
                                </button>

                                <button
                                    class="delete-btn"
                                    onclick="deleteActivity(${activity.id})"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   ANALYTICS
========================================================= */

function renderAnalytics() {

    const study =
        getTodayDuration(
            "Study"
        );

    const exercise =
        getTodayDuration(
            "Exercise"
        );

    const learning =
        getTodayDuration(
            "Learning"
        );

    const entertainment =
        getTodayDuration(
            "Entertainment"
        );

    const social =
        getTodayDuration(
            "Social Media"
        );


    if (
        activityChartInstance
    ) {
        activityChartInstance.destroy();
    }


    const activityCanvas =
        $("activityChart");


    if (activityCanvas) {

        activityChartInstance =
            new Chart(
                activityCanvas,
                {

                    type:
                        "doughnut",

                    data: {

                        labels: [
                            "Study",
                            "Exercise",
                            "Learning",
                            "Entertainment",
                            "Social"
                        ],

                        datasets: [

                            {

                                data: [
                                    study,
                                    exercise,
                                    learning,
                                    entertainment,
                                    social
                                ]

                            }

                        ]

                    },

                    options: {

                        responsive:
                            true,

                        plugins: {

                            legend: {

                                labels: {

                                    color:
                                        "#9fb0c5"

                                }

                            }

                        }

                    }

                }
            );

    }


    const nutrition =
        getNutritionTotals(
            todayKey()
        );


    if (
        nutritionChartInstance
    ) {
        nutritionChartInstance.destroy();
    }


    const nutritionCanvas =
        $("nutritionChart");


    if (nutritionCanvas) {

        nutritionChartInstance =
            new Chart(
                nutritionCanvas,
                {

                    type:
                        "bar",

                    data: {

                        labels: [
                            "Calories",
                            "Protein",
                            "Carbs",
                            "Fat"
                        ],

                        datasets: [

                            {

                                label:
                                    "Today's Nutrition",

                                data: [
                                    nutrition.calories,
                                    nutrition.protein,
                                    nutrition.carbs,
                                    nutrition.fat
                                ]

                            }

                        ]

                    },

                    options: {

                        responsive:
                            true,

                        plugins: {

                            legend: {

                                labels: {

                                    color:
                                        "#9fb0c5"

                                }

                            }

                        },

                        scales: {

                            x: {

                                ticks: {

                                    color:
                                        "#9fb0c5"

                                }

                            },

                            y: {

                                ticks: {

                                    color:
                                        "#9fb0c5"

                                }

                            }

                        }

                    }

                }
            );

    }


    if (
        weightChartInstance
    ) {
        weightChartInstance.destroy();
    }


    const weightCanvas =
        $("weightChart");


    if (
        weightCanvas &&
        bodyRecords.length
    ) {

        const records =
            bodyRecords
                .slice()
                .sort(
                    (a,b) =>
                        a.date.localeCompare(
                            b.date
                        )
                );


        weightChartInstance =
            new Chart(
                weightCanvas,
                {

                    type:
                        "line",

                    data: {

                        labels:
                            records.map(
                                r =>
                                    r.date
                            ),

                        datasets: [

                            {

                                label:
                                    "Weight (kg)",

                                data:
                                    records.map(
                                        r =>
                                            r.weight
                                    ),

                                tension:
                                    0.3,

                                fill:
                                    true

                            }

                        ]

                    },

                    options: {

                        responsive:
                            true,

                        scales: {

                            x: {

                                ticks: {

                                    color:
                                        "#9fb0c5"

                                }

                            },

                            y: {

                                ticks: {

                                    color:
                                        "#9fb0c5"

                                }

                            }

                        }

                    }

                }

            );

    }

}


/* =========================================================
   JOURNAL
========================================================= */

function saveJournal() {

    const date =
        $("journalDate").value ||
        todayKey();


    const record = {

        id:
            Date.now(),

        date:
            date,

        accomplishments:
            $("journalAccomplishments").value,

        improve:
            $("journalImprove").value,

        tomorrow:
            $("journalTomorrow").value

    };


    const existing =
        journals.findIndex(
            journal =>
                journal.date ===
                date
        );


    if (existing >= 0) {

        journals[existing] =
            record;

    }

    else {

        journals.push(
            record
        );

    }


    saveJSON(
        "journals",
        journals
    );


    showToast(
        "Journal saved."
    );


    renderJournal();

}


function renderJournal() {

    const date =
        $("journalDate")?.value ||
        todayKey();


    const journal =
        journals.find(
            j =>
                j.date ===
                date
        );


    if (journal) {

        $("journalAccomplishments").value =
            journal.accomplishments ||
            "";

        $("journalImprove").value =
            journal.improve ||
            "";

        $("journalTomorrow").value =
            journal.tomorrow ||
            "";

    }


    const report =
        $("endOfDayReport");


    if (!report) return;


    const study =
        getTodayDuration(
            "Study"
        );


    const exercise =
        getTodayDuration(
            "Exercise"
        );


    const learning =
        getTodayDuration(
            "Learning"
        );


    const sleep =
        getTodayDuration(
            "Sleep"
        );


    const nutrition =
        getNutritionTotals(
            todayKey()
        );


    report.innerHTML = `

        <p>
            <strong>Study:</strong>
            ${formatDuration(study)}
        </p>

        <p>
            <strong>Exercise:</strong>
            ${formatDuration(exercise)}
        </p>

        <p>
            <strong>Learning:</strong>
            ${formatDuration(learning)}
        </p>

        <p>
            <strong>Sleep:</strong>
            ${formatDuration(sleep)}
        </p>

        <p>
            <strong>Calories:</strong>
            ${nutrition.calories.toFixed(0)} kcal
        </p>

        <p>
            <strong>Water:</strong>
            ${waterCount}/8 glasses
        </p>

    `;

}


/* =========================================================
   WELLNESS
========================================================= */

function calculateWellnessScore() {

    const study =
        getTodayDuration(
            "Study"
        );

    const exercise =
        getTodayDuration(
            "Exercise"
        );

    const learning =
        getTodayDuration(
            "Learning"
        );

    const sleep =
        getTodayDuration(
            "Sleep"
        );

    const screen =
        getTodayDuration(
            "Entertainment"
        ) +
        getTodayDuration(
            "Social Media"
        );

    const calories =
        getNutritionTotals(
            todayKey()
        ).calories;


    let score =
        0;


    score +=
        Math.min(
            20,
            study /
            120 *
            20
        );


    score +=
        Math.min(
            20,
            exercise /
            30 *
            20
        );


    score +=
        Math.min(
            20,
            learning /
            60 *
            20
        );


    score +=
        Math.min(
            20,
            sleep /
            480 *
            20
        );


    if (
        screen <=
        180
    ) {

        score +=
            20;

    }

    else {

        score +=
            Math.max(
                0,
                20 -
                ((screen - 180) / 10)
            );

    }


    if (
        calories <= 0
    ) {

        score *=
            0.9;

    }


    return Math.round(
        Math.max(
            0,
            Math.min(
                100,
                score
            )
        )
    );

}


function renderWellness() {

    const score =
        calculateWellnessScore();


    setText(
        "wellnessScore",
        score
    );


    let status =
        "Start tracking";


    let description =
        "Add activities to generate your wellness score.";


    if (
        score >= 80
    ) {

        status =
            "Excellent balance";

        description =
            "Your recorded routine is showing a strong balance.";

    }

    else if (
        score >= 60
    ) {

        status =
            "Good balance";

        description =
            "You're building a balanced routine.";

    }

    else if (
        score >= 40
    ) {

        status =
            "Moderate balance";

        description =
            "There are areas where you can improve.";

    }

    else if (
        score > 0
    ) {

        status =
            "Needs attention";

        description =
            "Focus on gradually improving your daily routine.";

    }


    setText(
        "wellnessStatus",
        status
    );


    setText(
        "wellnessDescription",
        description
    );


    const suggestions = [];


    if (
        getTodayDuration("Study") <
        DAILY_GOALS.study
    ) {

        suggestions.push(
            "Try to complete your 120-minute study reference."
        );

    }


    if (
        getTodayDuration("Exercise") <
        DAILY_GOALS.exercise
    ) {

        suggestions.push(
            "Consider adding physical activity to your day."
        );

    }


    if (
        getTodayDuration("Sleep") <
        DAILY_GOALS.sleep
    ) {

        suggestions.push(
            "Your recorded sleep is below the daily reference target."
        );

    }


    if (
        waterCount <
        8
    ) {

        suggestions.push(
            "Keep working toward 8 glasses of water."
        );

    }


    if (!suggestions.length) {

        suggestions.push(
            "Keep maintaining your current tracking routine."
        );

    }


    const container =
        $("wellnessSuggestions");


    if (container) {

        container.innerHTML =
            suggestions
                .map(
                    suggestion =>
                        `<div class="suggestion">
                            <i class="fa-solid fa-lightbulb"></i>
                            ${escapeHTML(suggestion)}
                        </div>`
                )
                .join("");

    }

}


/* =========================================================
   NUTRITION / BODY INITIALIZATION
========================================================= */

function renderBody() {

    if (!bodyRecords.length) {

        setText(
            "bmiValue",
            "--"
        );

        setText(
            "bmiStatus",
            "Enter height and weight"
        );

        return;

    }


    const latest =
        bodyRecords[
            bodyRecords.length - 1
        ];


    $("bodyWeight").value =
        latest.weight;

    $("bodyHeight").value =
        latest.height;


    setText(
        "bmiValue",
        latest.bmi.toFixed(1)
    );


    setText(
        "bmiStatus",
        getBMIStatus(
            latest.bmi
        )
    );

}


/* =========================================================
   RENDER ALL
========================================================= */

function renderAll() {

    if (!currentUser) {
        return;
    }


    renderDashboard();

    renderNutrition();

    renderPlanner();

    renderFocusHistory();

    renderGoals();

    renderHistory();

    renderAnalytics();

    renderJournal();

    renderWellness();

    renderBody();

}


/* =========================================================
   REFRESH
========================================================= */

function refreshAll() {

    loadUserData();

    populateFoodDatalist();

    renderAll();

    showToast(
        "Dashboard refreshed."
    );

}


/* =========================================================
   LIVE CLOCK
========================================================= */

function updateClock() {

    const now =
        new Date();


    setText(
        "liveClock",
        now.toLocaleTimeString()
    );

}


setInterval(
    updateClock,
    1000
);


/* =========================================================
   AUTH READY
========================================================= */

window.addEventListener(
    "lifetrack-auth-ready",
    function(event) {

        const user =
            event.detail.user;


        currentUser =
            user;


        if (!currentUser) {

            return;

        }


        loadUserData();

        setDefaultDates();

        populateFoodDatalist();


        if (
            !$("foodRows").children.length
        ) {

            addFoodRow();

        }


        updateClock();

        renderAll();

    }
);


/* =========================================================
   STARTUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateClock();

        setDefaultDates();

        updateFocusDisplay();

    }
);