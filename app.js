/**
 * ISTANBUL TRAVEL PLANNER - APPLICATION CODE
 * Handles state, rendering, interactivity, and localStorage persistence.
 */

// Core Itinerary Data
const ITINERARY_DATA = {
    1: {
        title: "Día 1: Llegada y primer atardecer",
        highlight: "Karaköy y Torre de Gálata",
        image: "assets/galata_tower.png",
        activities: [
            { id: "act-1-1", time: "14:00", title: "Llegada e Instalación", desc: "Aterrizaje en Estambul (IST o SAW), traslado al hotel y check-in. Descanso breve.", tag: "traslado", cost: 15, loc: "Hotel" },
            { id: "act-1-2", time: "18:00", title: "Atardecer en la Torre de Gálata", desc: "Sube a la histórica torre genovesa para disfrutar de las mejores vistas panorámicas de 360° mientras atardece sobre el Cuerno de Oro.", tag: "monumento", cost: 30, loc: "Torre de Gálata" },
            { id: "act-1-3", time: "20:30", title: "Cena en Karaköy", desc: "Pasea por las animadas calles peatonales de Karaköy y cena mezes tradicionales y brochetas en un restaurante de moda.", tag: "comida", cost: 20, loc: "Karaköy" }
        ]
    },
    2: {
        title: "Día 2: El corazón histórico de Bizancio",
        highlight: "Sultanahmet y Gran Bazar",
        image: "assets/hagia_sophia.png",
        activities: [
            { id: "act-2-1", time: "09:00", title: "Visita a Santa Sofía", desc: "Admira la majestuosa basílica bizantina convertida en mezquita. Sus mosaicos y su cúpula te dejarán sin aliento.", tag: "monumento", cost: 25, loc: "Santa Sofía" },
            { id: "act-2-2", time: "11:30", title: "Cisterna Basílica", desc: "Desciende al 'Palacio Sumergido' bizantino y encuentra las místicas cabezas de Medusa talladas en piedra.", tag: "monumento", cost: 20, loc: "Cisterna Basílica" },
            { id: "act-2-3", time: "13:00", title: "Almuerzo de Köfte en Sultanahmet", desc: "Prueba los famosos Tarihi Sultanahmet Köftecisi, un clásico local abierto desde 1920.", tag: "comida", cost: 8, loc: "Sultanahmet" },
            { id: "act-2-4", time: "14:30", title: "Mezquita Azul y Plaza del Hipódromo", desc: "Explora la mezquita del Sultán Ahmed, famosa por sus azulejos de Iznik azules y sus 6 minaretes.", tag: "monumento", cost: 0, loc: "Mezquita Azul" },
            { id: "act-2-5", time: "16:00", title: "Perderse en el Gran Bazar", desc: "Recorre los pasillos cubiertos de este histórico mercado. Regatea por lámparas, alfombras o dulces turcos.", tag: "compras", cost: 0, loc: "Gran Bazar" }
        ]
    },
    3: {
        title: "Día 3: El aroma de las especias y el Bósforo",
        highlight: "Crucero, Bazar de Especias y Ortaköy",
        image: "assets/bosphorus_cruise.png",
        activities: [
            { id: "act-3-1", time: "09:30", title: "Bazar de las Especias (Egipcio)", desc: "Déjate embriagar por los olores a azafrán, tés exóticos, frutos secos y delicias turcas.", tag: "compras", cost: 0, loc: "Bazar Egipcio" },
            { id: "act-3-2", time: "11:30", title: "Crucero Público por el Bósforo", desc: "Toma el ferry de Şehir Hatları desde Eminönü. Navega entre Europa y Asia observando palacios y castillos otomanos.", tag: "crucero", cost: 5, loc: "Muelle de Eminönü" },
            { id: "act-3-3", time: "13:30", title: "Almuerzo de Balık Ekmek en Eminönü", desc: "Prueba el tradicional bocadillo de pescado recién asado en los barcos tradicionales del puerto.", tag: "comida", cost: 4, loc: "Eminönü" },
            { id: "act-3-4", time: "15:30", title: "Barrio de Ortaköy y Mezquita del Bósforo", desc: "Visita la preciosa mezquita barroca a orillas del agua y merienda un 'Kumpir' (patata asada gigante rellena).", tag: "monumento", cost: 6, loc: "Ortaköy" }
        ]
    },
    4: {
        title: "Día 4: Explorando la vibrante Asia",
        highlight: "Ferry a Kadıköy y Atardecer en Üsküdar",
        image: "https://images.unsplash.com/photo-1599580464731-fb3db6522c0e?q=80&w=600&auto=format&fit=crop",
        activities: [
            { id: "act-4-1", time: "10:00", title: "Cruzar en Ferry a Kadıköy", desc: "Disfruta de la brisa marina y alimenta a las gaviotas con 'simit' (pan de sésamo) durante el trayecto de Europa a Asia.", tag: "traslado", cost: 1.5, loc: "Ferry Eminönü - Kadıköy" },
            { id: "act-4-2", time: "11:00", title: "Mercado de Kadıköy y Moda", desc: "Descubre el ambiente bohemio del lado asiático: pescaderías, tiendas vintage y el paseo costero de Moda.", tag: "compras", cost: 0, loc: "Kadıköy" },
            { id: "act-4-3", time: "13:30", title: "Almuerzo en Çiya Sofrası", desc: "Prueba recetas de la cocina anatolia tradicional perdidas en el tiempo en este famosísimo restaurante.", tag: "comida", cost: 15, loc: "Kadıköy" },
            { id: "act-4-4", time: "17:30", title: "Atardecer en Üsküdar y la Torre de la Doncella", desc: "Pasea por el malecón de Üsküdar. Siéntate en las alfombras del suelo a tomar té mientras el sol se pone tras la silueta de Sultanahmet.", tag: "monumento", cost: 3, loc: "Üsküdar" }
        ]
    },
    5: {
        title: "Día 5: La Estambul moderna y palaciega",
        highlight: "Palacio de Dolmabahçe y Avenida Istiklal",
        image: "https://images.unsplash.com/photo-1527838832700-50592524df7e?q=80&w=600&auto=format&fit=crop",
        activities: [
            { id: "act-5-1", time: "09:30", title: "Palacio de Dolmabahçe", desc: "Visita la opulenta residencia imperial del siglo XIX, famosa por sus arañas de cristal de Bohemia y jardines costeros.", tag: "monumento", cost: 30, loc: "Palacio Dolmabahçe" },
            { id: "act-5-2", time: "13:00", title: "Almuerzo en Beşiktaş", desc: "Pasea por el animado barrio estudiantil de Beşiktaş y almuerza un Döner tradicional.", tag: "comida", cost: 6, loc: "Beşiktaş" },
            { id: "act-5-3", time: "15:00", title: "Plaza Taksim e Istiklal Caddesi", desc: "Camina por la arteria peatonal de la ciudad moderna. Mira pasar el icónico tranvía rojo histórico y entra a los pasajes históricos.", tag: "compras", cost: 0, loc: "Taksim" },
            { id: "act-5-4", time: "17:30", title: "Baklava y Café Turco en Hafiz Mustafa", desc: "Haz una pausa dulce y degusta los auténticos baklavas de pistacho acompañados de café turco de arena.", tag: "comida", cost: 8, loc: "Istiklal" }
        ]
    },
    6: {
        title: "Día 6: Colores, historia y rincones pintorescos",
        highlight: "Barrios de Balat y Mezquita de Süleymaniye",
        image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?q=80&w=600&auto=format&fit=crop",
        activities: [
            { id: "act-6-1", time: "10:00", title: "Explorar Fener y Balat", desc: "Camina por los antiguos barrios judío y griego. Fotografía las famosas casas de colores en cuesta y entra a cafeterías vintage.", tag: "monumento", cost: 0, loc: "Balat" },
            { id: "act-6-2", time: "13:00", title: "Almuerzo en Balat", desc: "Come en un pequeño bistró local rodeado de antigüedades.", tag: "comida", cost: 10, loc: "Balat" },
            { id: "act-6-3", time: "15:00", title: "Mezquita de Süleymaniye", desc: "Visita la mezquita del Sultán Solimán el Magnífico, diseñada por el arquitecto Mimar Sinan. Ofrece vistas increíbles del Bósforo.", tag: "monumento", cost: 0, loc: "Süleymaniye" },
            { id: "act-6-4", time: "20:00", title: "Cena de Despedida en el Puente de Gálata", desc: "Disfruta de pescado fresco y mezes bajo el puente de Gálata mientras observas el ir y venir de los barcos.", tag: "comida", cost: 35, loc: "Puente de Gálata" }
        ]
    },
    7: {
        title: "Día 7: Despedida o calma en las Islas",
        highlight: "Büyükada o compras de última hora",
        image: "assets/grand_bazaar.png",
        activities: [
            { id: "act-7-1", time: "09:30", title: "Escapada opcional a Büyükada", desc: "Si tu vuelo sale tarde, toma un ferry a las Islas de los Príncipes. Alquila una bicicleta y pasea entre mansiones Victorianas.", tag: "crucero", cost: 10, loc: "Büyükada" },
            { id: "act-7-2", time: "14:00", title: "Últimas Compras y Dulces", desc: "Paseo de despedida por Eminönü para comprar delicias turcas de última hora en caja de regalo.", tag: "compras", cost: 15, loc: "Eminönü" },
            { id: "act-7-3", time: "16:00", title: "Traslado al Aeropuerto", desc: "Toma el autobús Havaist o el metro al aeropuerto IST para emprender el viaje de regreso.", tag: "traslado", cost: 6, loc: "Estambul" }
        ]
    }
};

// Core Default Packing List Items
const DEFAULT_PACKING_ITEMS = [
    // Documentos
    { id: "pack-1", category: "documentos", name: "Pasaporte original válido", packed: false },
    { id: "pack-2", category: "documentos", name: "Seguro médico de viaje (impreso)", packed: false },
    { id: "pack-3", category: "documentos", name: "Reservas de vuelos y hoteles", packed: false },
    { id: "pack-4", category: "documentos", name: "Tarjetas bancarias que no cobren comisión en el extranjero", packed: false },
    { id: "pack-5", category: "documentos", name: "Efectivo (algunas liras turcas para propinas)", packed: false },
    
    // Ropa
    { id: "pack-6", category: "ropa", name: "Zapatillas muy cómodas (se camina mucho en cuesta)", packed: false },
    { id: "pack-7", category: "ropa", name: "Velo/Pañuelo para el cabello (indispensable para entrar a mezquitas)", packed: false },
    { id: "pack-8", category: "ropa", name: "Pantalones largos o faldas por debajo de la rodilla", packed: false },
    { id: "pack-9", category: "ropa", name: "Chaqueta cortavientos para los paseos en barco", packed: false },
    { id: "pack-10", category: "ropa", name: "Gafas de sol y gorra", packed: false },

    // Electrónica
    { id: "pack-11", category: "electronica", name: "Móvil y cargador", packed: false },
    { id: "pack-12", category: "electronica", name: "Batería externa (Powerbank) para las largas caminatas", packed: false },
    { id: "pack-13", category: "electronica", name: "Cámara fotográfica", packed: false },

    // Neceser
    { id: "pack-14", category: "neceser", name: "Protector solar facial", packed: false },
    { id: "pack-15", category: "neceser", name: "Tiritas para ampollas", packed: false },
    { id: "pack-16", category: "neceser", name: "Gel desinfectante de manos", packed: false },
    { id: "pack-17", category: "neceser", name: "Medicamentos básicos (Ibuprofeno, etc.)", packed: false },

    // Otros
    { id: "pack-18", category: "otros", name: "Mochila ligera para el día", packed: false },
    { id: "pack-19", category: "otros", name: "Istanbulkart (se compra y recarga allí)", packed: false },
    { id: "pack-20", category: "otros", name: "Paraguas de viaje plegable", packed: false }
];

// Color definitions for budget categories
const CATEGORY_COLORS = {
    vuelos: "#d4af37",      // Gold
    alojamiento: "#a855f7", // Purple
    comida: "#e07a5f",      // Terracotta
    actividades: "#0ea5e9", // Iznik Blue
    compras: "#10b981",     // Green
    transporte: "#64748b"   // Slate
};

class IstanbulApp {
    constructor() {
        this.state = {
            currentTab: "dashboard",
            currentItineraryDay: 1,
            budgetLimit: 1000,
            expenses: [],
            packingItems: [],
            completedActivities: []
        };
        
        this.init();
    }

    init() {
        this.loadState();
        this.registerEventListeners();
        this.startCountdown();
        this.renderAll();
    }

    // Load from local storage or set defaults
    loadState() {
        const saved = localStorage.getItem("istanbul_planner_state");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
            } catch (e) {
                console.error("Error parsing saved state, resetting defaults", e);
                this.setDefaults();
            }
        } else {
            this.setDefaults();
        }
    }

    setDefaults() {
        this.state.budgetLimit = 1000;
        this.state.expenses = [
            { id: "exp-1", category: "vuelos", concept: "Vuelo Ida/Vuelta a Estambul", amount: 220 },
            { id: "exp-2", category: "alojamiento", concept: "Hotel Boutique en Galata (6 Noches)", amount: 380 }
        ];
        this.state.packingItems = [...DEFAULT_PACKING_ITEMS];
        this.state.completedActivities = [];
        this.saveState();
    }

    saveState() {
        localStorage.setItem("istanbul_planner_state", JSON.stringify(this.state));
    }

    registerEventListeners() {
        // Tab switching
        document.querySelectorAll(".nav-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const tabId = btn.getAttribute("data-tab");
                this.switchTab(tabId);
            });
        });

        // Day selection in itinerary
        document.querySelectorAll(".day-tab-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".day-tab-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                this.state.currentItineraryDay = parseInt(btn.getAttribute("data-day"));
                this.saveState();
                this.renderItinerary();
            });
        });

        // Budget Limit Save
        const btnSaveLimit = document.getElementById("btn-save-limit");
        if (btnSaveLimit) {
            btnSaveLimit.addEventListener("click", () => {
                const input = document.getElementById("budget-limit-input");
                const limit = parseFloat(input.value);
                if (limit > 0) {
                    this.state.budgetLimit = limit;
                    this.saveState();
                    this.renderBudget();
                    this.renderDashboard();
                }
            });
        }

        // Expense Modal trigger
        const btnOpenExpenseModal = document.getElementById("btn-open-expense-modal");
        const expenseModal = document.getElementById("expense-modal");
        const btnCloseExpenseModal = document.getElementById("btn-close-expense-modal");
        const btnCancelExpense = document.getElementById("btn-cancel-expense");

        if (btnOpenExpenseModal && expenseModal) {
            btnOpenExpenseModal.addEventListener("click", () => expenseModal.style.display = "flex");
        }
        if (btnCloseExpenseModal && expenseModal) {
            btnCloseExpenseModal.addEventListener("click", () => expenseModal.style.display = "none");
        }
        if (btnCancelExpense && expenseModal) {
            btnCancelExpense.addEventListener("click", () => expenseModal.style.display = "none");
        }

        // Form to add expense
        const addExpenseForm = document.getElementById("add-expense-form");
        if (addExpenseForm) {
            addExpenseForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const concept = document.getElementById("expense-concept").value.trim();
                const amount = parseFloat(document.getElementById("expense-amount").value);
                const category = document.getElementById("expense-category").value;

                if (concept && amount > 0) {
                    const newExpense = {
                        id: "exp-" + Date.now(),
                        category,
                        concept,
                        amount
                    };
                    this.state.expenses.push(newExpense);
                    this.saveState();
                    this.renderBudget();
                    this.renderDashboard();
                    
                    // Reset and hide
                    addExpenseForm.reset();
                    if (expenseModal) expenseModal.style.display = "none";
                }
            });
        }

        // Form to add packing item
        const addPackingForm = document.getElementById("add-packing-item-form");
        if (addPackingForm) {
            addPackingForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const nameInput = document.getElementById("new-item-name");
                const name = nameInput.value.trim();
                const category = document.getElementById("new-item-category").value;

                if (name) {
                    const newItem = {
                        id: "pack-" + Date.now(),
                        category,
                        name,
                        packed: false
                    };
                    this.state.packingItems.push(newItem);
                    this.saveState();
                    this.renderPacking();
                    this.renderDashboard();
                    nameInput.value = "";
                }
            });
        }

        // Voice pronunciation
        document.querySelectorAll(".btn-play-voice").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const phrase = btn.getAttribute("data-phrase");
                this.speakTurkish(phrase);
            });
        });

        // Search bar filtering
        const searchBar = document.getElementById("search-bar");
        if (searchBar) {
            searchBar.addEventListener("input", (e) => {
                this.handleSearch(e.target.value.toLowerCase().trim());
            });
        }
    }

    switchTab(tabId) {
        // Update nav UI
        document.querySelectorAll(".nav-btn").forEach(btn => {
            if (btn.getAttribute("data-tab") === tabId) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Update sections
        document.querySelectorAll(".tab-content").forEach(section => {
            if (section.id === tabId) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        this.state.currentTab = tabId;
        this.saveState();

        // Specific re-renders on view
        if (tabId === "dashboard") this.renderDashboard();
        if (tabId === "itinerary") this.renderItinerary();
        if (tabId === "budget") this.renderBudget();
        if (tabId === "packing") this.renderPacking();
    }

    startCountdown() {
        // Setup trip date to be exactly 15 days in the future from current time
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 15);

        const updateTimer = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                document.getElementById("days").innerText = "00";
                document.getElementById("hours").innerText = "00";
                document.getElementById("minutes").innerText = "00";
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

            document.getElementById("days").innerText = String(days).padStart(2, '0');
            document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        };

        updateTimer();
        setInterval(updateTimer, 60000); // Update every minute
    }

    speakTurkish(text) {
        if ('speechSynthesis' in window) {
            // Cancel active speech
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'tr-TR';
            
            // Try to find a Turkish voice
            const voices = window.speechSynthesis.getVoices();
            const trVoice = voices.find(v => v.lang.includes('tr'));
            if (trVoice) {
                utterance.voice = trVoice;
            }
            
            utterance.rate = 0.85; // Slightly slower for better learning
            window.speechSynthesis.speak(utterance);
        } else {
            alert("La síntesis de voz no está soportada en este navegador.");
        }
    }

    // Search bar handler
    handleSearch(query) {
        if (!query) {
            // Restore everything
            this.renderAll();
            return;
        }

        if (this.state.currentTab === "itinerary") {
            // Filter activities for the current active day
            this.renderItinerary(query);
        } else if (this.state.currentTab === "packing") {
            // Filter checklist items
            this.renderPacking(query);
        } else if (this.state.currentTab === "dictionary") {
            // Filter dictionary phrase-item rows
            document.querySelectorAll(".phrase-item").forEach(item => {
                const trText = item.querySelector(".turkish").textContent.toLowerCase();
                const esText = item.querySelector(".spanish").textContent.toLowerCase();
                if (trText.includes(query) || esText.includes(query)) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
        }
    }

    // Toggle completed activity
    toggleActivity(activityId) {
        const index = this.state.completedActivities.indexOf(activityId);
        if (index > -1) {
            this.state.completedActivities.splice(index, 1);
        } else {
            this.state.completedActivities.push(activityId);
        }
        this.saveState();
        this.renderItinerary();
        this.renderDashboard();
    }

    // Packing list interactions
    togglePackingItem(itemId) {
        const item = this.state.packingItems.find(i => i.id === itemId || String(i.id) === String(itemId));
        if (item) {
            item.packed = !item.packed;
            this.saveState();
            this.renderPacking();
            this.renderDashboard();
        }
    }

    deletePackingItem(itemId) {
        this.state.packingItems = this.state.packingItems.filter(i => i.id !== itemId && String(i.id) !== String(itemId));
        this.saveState();
        this.renderPacking();
        this.renderDashboard();
    }

    // Budget tracker interactions
    deleteExpense(expenseId) {
        this.state.expenses = this.state.expenses.filter(e => e.id !== expenseId && String(e.id) !== String(expenseId));
        this.saveState();
        this.renderBudget();
        this.renderDashboard();
    }

    // ----------------------------------------
    // RENDERING FUNCTIONS
    // ----------------------------------------

    renderAll() {
        this.renderDashboard();
        this.renderItinerary();
        this.renderBudget();
        this.renderPacking();
    }

    renderDashboard() {
        // 1. Budget Summary
        const totalSpent = this.state.expenses.reduce((sum, e) => sum + e.amount, 0);
        const limit = this.state.budgetLimit;
        const percent = Math.min(Math.round((totalSpent / limit) * 100), 100);

        document.getElementById("spent-widget").innerText = `${totalSpent.toFixed(0)} €`;
        const remaining = Math.max(limit - totalSpent, 0);
        document.getElementById("remaining-widget").innerText = `${remaining.toFixed(0)} €`;

        // Update SVG Circle progress
        const circle = document.getElementById("budget-progress-circle");
        if (circle) {
            // stroke-dasharray values represent percentage (out of 100)
            circle.setAttribute("stroke-dasharray", `${percent}, 100`);
        }
        const pctText = document.getElementById("budget-percent-text");
        if (pctText) {
            pctText.innerText = `${percent}%`;
        }

        // 2. Packing Summary
        const totalItems = this.state.packingItems.length;
        const packedItems = this.state.packingItems.filter(i => i.packed).length;
        const packingPercent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

        document.getElementById("packing-widget-number").innerText = `${packingPercent}%`;
        document.getElementById("packing-items-count").innerText = `${packedItems} de ${totalItems} ítems`;
        const packingBar = document.getElementById("packing-widget-bar");
        if (packingBar) {
            packingBar.style.width = `${packingPercent}%`;
        }

        // 3. Next Activity
        // Find first uncompleted activity in itinerary
        let nextActivity = null;
        for (let d = 1; d <= 7; d++) {
            const dayActs = ITINERARY_DATA[d].activities;
            const uncompleted = dayActs.find(act => !this.state.completedActivities.includes(act.id));
            if (uncompleted) {
                nextActivity = { day: d, ...uncompleted };
                break;
            }
        }

        if (nextActivity) {
            document.getElementById("next-activity-title").innerText = nextActivity.title;
            document.getElementById("next-activity-desc").innerText = nextActivity.desc;
            document.querySelector(".activity-time-tag").innerText = `Día ${nextActivity.day} - ${nextActivity.time}`;
        } else {
            document.getElementById("next-activity-title").innerText = "¡Todo completado!";
            document.getElementById("next-activity-desc").innerText = "Has completado todas tus actividades planificadas.";
            document.querySelector(".activity-time-tag").innerText = "Fin del Itinerario";
        }
    }

    renderItinerary(query = "") {
        const day = this.state.currentItineraryDay;
        const dayData = ITINERARY_DATA[day];
        const timeline = document.getElementById("itinerary-timeline");
        
        if (!timeline) return;
        timeline.innerHTML = "";

        // Set cover and title details
        const itinerarySection = document.getElementById("itinerary");
        const navTitle = itinerarySection.querySelector(".section-header p");
        if (navTitle) {
            navTitle.innerHTML = `<strong>${dayData.title}</strong> - Destacado: <em>${dayData.highlight}</em>`;
        }

        const filteredActivities = dayData.activities.filter(act => {
            if (!query) return true;
            return act.title.toLowerCase().includes(query) || 
                   act.desc.toLowerCase().includes(query) || 
                   act.loc.toLowerCase().includes(query);
        });

        if (filteredActivities.length === 0) {
            timeline.innerHTML = `<div class="empty-state"><span>🔍</span><p>No se encontraron actividades que coincidan con la búsqueda.</p></div>`;
            return;
        }

        filteredActivities.forEach(act => {
            const isCompleted = this.state.completedActivities.includes(act.id);
            
            const timelineItem = document.createElement("div");
            timelineItem.className = `timeline-item ${isCompleted ? 'completed' : ''}`;
            
            timelineItem.innerHTML = `
                <div class="timeline-badge"></div>
                <div class="timeline-card">
                    <div class="timeline-header">
                        <div class="time-title">
                            <span class="activity-time">⏰ ${act.time}</span>
                            <h4 class="activity-title">${act.title}</h4>
                        </div>
                        <div class="activity-tags">
                            <span class="tag ${act.tag}">${act.tag}</span>
                        </div>
                    </div>
                    <p class="activity-description">${act.desc}</p>
                    <div class="activity-details-row">
                        <div class="detail-item">📍 ${act.loc}</div>
                        <div class="detail-item">💰 ${act.cost === 0 ? 'Gratis' : `${act.cost} €`}</div>
                        
                        <label class="checkbox-container">
                            <span>Visitado</span>
                            <input type="checkbox" ${isCompleted ? 'checked' : ''} data-act-id="${act.id}">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            `;

            // Attach toggle event
            const checkbox = timelineItem.querySelector("input[type='checkbox']");
            checkbox.addEventListener("change", () => {
                this.toggleActivity(act.id);
            });

            timeline.appendChild(timelineItem);
        });
    }

    renderBudget() {
        const totalSpent = this.state.expenses.reduce((sum, e) => sum + e.amount, 0);
        const limit = this.state.budgetLimit;
        const percent = Math.min(Math.round((totalSpent / limit) * 100), 100);

        // Update main page indicators
        const inputLimit = document.getElementById("budget-limit-input");
        if (inputLimit) inputLimit.value = limit;

        document.getElementById("total-limit-display").innerText = `${limit.toFixed(2)} €`;
        document.getElementById("total-spent-display").innerText = `${totalSpent.toFixed(2)} €`;
        
        const remaining = limit - totalSpent;
        const remainingDisplay = document.getElementById("total-remaining-display");
        if (remainingDisplay) {
            remainingDisplay.innerText = `${Math.abs(remaining).toFixed(2)} €`;
            if (remaining < 0) {
                remainingDisplay.style.color = "var(--color-red)";
            } else {
                remainingDisplay.style.color = "var(--color-gold)";
            }
        }

        // Fill progress bar
        const fillBar = document.getElementById("budget-bar-fill");
        if (fillBar) {
            fillBar.style.width = `${percent}%`;
            if (percent >= 100) {
                fillBar.style.background = "var(--color-red)";
            } else {
                fillBar.style.background = "linear-gradient(90deg, var(--color-gold) 0%, #f1c948 100%)";
            }
        }

        // Show/hide warning
        const warning = document.getElementById("budget-warning");
        if (warning) {
            warning.style.display = totalSpent > limit ? "block" : "none";
        }

        // Render table
        const tbody = document.getElementById("expenses-table-body");
        const emptyState = document.getElementById("expenses-empty-state");
        if (tbody) {
            tbody.innerHTML = "";
            if (this.state.expenses.length === 0) {
                if (emptyState) emptyState.style.display = "flex";
            } else {
                if (emptyState) emptyState.style.display = "none";
                this.state.expenses.forEach(exp => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td><span class="category-badge-table" style="background: ${CATEGORY_COLORS[exp.category] || '#ccc'}22; color: ${CATEGORY_COLORS[exp.category] || '#ccc'}">${exp.category}</span></td>
                        <td class="table-concept">${exp.concept}</td>
                        <td class="table-amount">${exp.amount.toFixed(2)} €</td>
                        <td><button class="btn-delete-expense" data-exp-id="${exp.id}">×</button></td>
                    `;
                    
                    tr.querySelector(".btn-delete-expense").addEventListener("click", () => {
                        this.deleteExpense(exp.id);
                    });
                    
                    tbody.appendChild(tr);
                });
            }
        }

        // Render Donut Chart SVG
        this.renderCategoryChart();
    }

    renderCategoryChart() {
        const chart = document.getElementById("category-donut-chart");
        const legend = document.getElementById("chart-legend-container");
        if (!chart || !legend) return;

        chart.innerHTML = "";
        legend.innerHTML = "";

        // Calculate breakdown totals
        const breakdown = {
            vuelos: 0,
            alojamiento: 0,
            comida: 0,
            actividades: 0,
            compras: 0,
            transporte: 0
        };

        this.state.expenses.forEach(e => {
            if (breakdown[e.category] !== undefined) {
                breakdown[e.category] += e.amount;
            } else {
                breakdown.compras += e.amount; // fallback
            }
        });

        const totalSpent = Object.values(breakdown).reduce((sum, v) => sum + v, 0);

        if (totalSpent === 0) {
            chart.innerHTML = `
                <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="20" />
                <text x="100" y="105" text-anchor="middle" fill="var(--text-muted)" font-family="var(--font-heading)" font-size="12">Sin gastos</text>
            `;
            return;
        }

        // Math for drawing SVG segments
        let cumulativePercent = 0;
        const radius = 70;
        const circumference = 2 * Math.PI * radius; // 439.8

        let segmentsHTML = `<circle cx="100" cy="100" r="${radius}" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="20" />`;

        Object.entries(breakdown).forEach(([category, val]) => {
            if (val <= 0) return;

            const percent = val / totalSpent;
            const strokeDasharray = `${percent * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativePercent * circumference;
            const color = CATEGORY_COLORS[category] || "#ccc";

            segmentsHTML += `
                <circle cx="100" cy="100" r="${radius}" fill="none" 
                        stroke="${color}" stroke-width="20" 
                        stroke-dasharray="${strokeDasharray}" 
                        stroke-dashoffset="${strokeDashoffset}" 
                        transform="rotate(-90 100 100)" 
                        style="transition: stroke-dashoffset 0.5s ease;" />
            `;

            cumulativePercent += percent;

            // Add to legend
            const pctText = (percent * 100).toFixed(0);
            const legendItem = document.createElement("div");
            legendItem.className = "legend-item";
            legendItem.innerHTML = `
                <div class="legend-label-color">
                    <span class="color-dot" style="background-color: ${color}"></span>
                    <span>${category.toUpperCase()}</span>
                </div>
                <span class="legend-val">${val.toFixed(0)} € (${pctText}%)</span>
            `;
            legend.appendChild(legendItem);
        });

        // Add total value in center of donut
        segmentsHTML += `
            <text x="100" y="95" text-anchor="middle" fill="var(--text-muted)" font-size="11" font-family="var(--font-body)">TOTAL</text>
            <text x="100" y="115" text-anchor="middle" fill="var(--text-primary)" font-size="16" font-family="var(--font-heading)" font-weight="700">${totalSpent.toFixed(0)} €</text>
        `;

        chart.innerHTML = segmentsHTML;
    }

    renderPacking(query = "") {
        const categories = ["documentos", "ropa", "electronica", "neceser", "otros"];
        
        categories.forEach(cat => {
            const listEl = document.getElementById(`list-${cat}`);
            const badgeEl = document.getElementById(`badge-${cat}`);
            if (!listEl) return;

            listEl.innerHTML = "";

            // Filter items by category
            const catItems = this.state.packingItems.filter(item => item.category === cat);
            const matchingItems = catItems.filter(item => {
                if (!query) return true;
                return item.name.toLowerCase().includes(query);
            });

            // Update badge counts (only total counts of original list items)
            const packedCount = catItems.filter(i => i.packed).length;
            if (badgeEl) {
                badgeEl.innerText = `${packedCount}/${catItems.length}`;
            }

            matchingItems.forEach(item => {
                const li = document.createElement("li");
                li.className = `checklist-item ${item.packed ? 'packed' : ''}`;
                li.innerHTML = `
                    <label class="checklist-label">
                        <input type="checkbox" ${item.packed ? 'checked' : ''} data-item-id="${item.id}">
                        <span class="checkmark"></span>
                        <span>${item.name}</span>
                    </label>
                    <button class="btn-delete-item" data-item-id="${item.id}">🗑️</button>
                `;

                // Handle click checklist
                const checkbox = li.querySelector("input[type='checkbox']");
                checkbox.addEventListener("change", () => {
                    this.togglePackingItem(item.id);
                });

                // Handle delete
                const btnDel = li.querySelector(".btn-delete-item");
                btnDel.addEventListener("click", () => {
                    this.deletePackingItem(item.id);
                });

                listEl.appendChild(li);
            });
        });

        // Update packing radial progress panel
        const totalItems = this.state.packingItems.length;
        const packedItems = this.state.packingItems.filter(i => i.packed).length;
        const percent = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

        const widgetBar = document.getElementById("packing-progress-circle");
        if (widgetBar) {
            widgetBar.setAttribute("stroke-dasharray", `${percent}, 100`);
        }
        
        const pctText = document.getElementById("packing-percent-text");
        if (pctText) {
            pctText.innerText = `${percent}%`;
        }

        const summaryText = document.getElementById("packing-summary-text");
        if (summaryText) {
            summaryText.innerText = `${packedItems} de ${totalItems} cosas listas`;
        }
    }
}

// Instantiate App on Page Load
let app;
window.addEventListener("DOMContentLoaded", () => {
    app = new IstanbulApp();
    
    // Bind to window to allow button onclick properties in HTML
    window.app = app;
});
