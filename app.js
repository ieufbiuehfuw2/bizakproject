const roleScreen = document.getElementById("roleScreen");
const ownerScreen = document.getElementById("ownerScreen");
const buyerScreen = document.getElementById("buyerScreen");
const offerScreen = document.getElementById("offerScreen");
const cabinetScreen = document.getElementById("cabinetScreen");
const ownerSubscriptionScreen = document.getElementById("ownerSubscriptionScreen");
const offerMessage = document.getElementById("offerMessage");
const cabinetMessage = document.getElementById("cabinetMessage");
const subscribeBtn = document.getElementById("subscribeBtn");
const transferBtn = document.getElementById("transferBtn");
const bookBtn = document.getElementById("bookBtn");
const backFab = document.getElementById("backFab");
const buyerBtn = document.getElementById("buyerBtn");
const ownerBtn = document.getElementById("ownerBtn");
const buyerStartBtn = document.getElementById("buyerStartBtn");
const buyerMessage = document.getElementById("buyerMessage");
const ownerBackBtn = document.getElementById("ownerBackBtn");
const openOwnerFormBtn = document.getElementById("openOwnerFormBtn");
const ownerSubscriptionBackBtn = document.getElementById("ownerSubscriptionBackBtn");
const ownerSubscribeBtn = document.getElementById("ownerSubscribeBtn");
const ownerSlider = document.getElementById("ownerSlider");
const ownerSlidesTrack = document.getElementById("ownerSlidesTrack");
const ownerNextSlideBtn = document.getElementById("ownerNextSlideBtn");
const ownerDots = document.querySelectorAll("#ownerSlider .dots .dot");
const submitBizBtn = document.getElementById("submitBizBtn");
const ownerMessage = document.getElementById("ownerMessage");
const bizName = document.getElementById("bizName");
const bizAddress = document.getElementById("bizAddress");
const bizType = document.getElementById("bizType");
const bizContacts = document.getElementById("bizContacts");
const bizReviews = document.getElementById("bizReviews");
const bizMaps = document.getElementById("bizMaps");
const bizPromo = document.getElementById("bizPromo");
const bizOffer = document.getElementById("bizOffer");
const bizConfirmRules = document.getElementById("bizConfirmRules");
const bizConfirmOwner = document.getElementById("bizConfirmOwner");
const offerSlider = document.getElementById("offerSlider");
const slidesTrack = document.getElementById("slidesTrack");
const nextSlideBtn = document.getElementById("nextSlideBtn");
const dots = document.querySelectorAll(".dots .dot");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalInputWrap = document.getElementById("modalInputWrap");
const modalInput = document.getElementById("modalInput");
const modalConfirm = document.getElementById("modalConfirm");
const modalCancel = document.getElementById("modalCancel");
const themeToggle = document.getElementById("toggleTheme");

let currentPlan = "month";
let hasSubscription = false;
let modalMode = "payment";
let currentSlide = 0;
let pointerStartX = 0;
let isSwiping = false;
let ownerSlide = 0;
const screenHistory = [];

const planButtons = document.querySelectorAll(".plan");
const cabinetActions = document.querySelectorAll(".card.action");

const planLabels = {
  month: "9 900 RUB",
  year: "99 000 RUB"
};

function showScreen(target) {
  if (screenHistory[screenHistory.length - 1] !== target) {
    screenHistory.push(target);
  }
  roleScreen.classList.remove("active");
  ownerScreen.classList.remove("active");
  buyerScreen.classList.remove("active");
  offerScreen.classList.remove("active");
  cabinetScreen.classList.remove("active");
  ownerSubscriptionScreen.classList.remove("active");

  if (target === "cabinet") {
    cabinetScreen.classList.add("active");
  } else if (target === "owner") {
    ownerScreen.classList.add("active");
  } else if (target === "ownerSubscription") {
    ownerSubscriptionScreen.classList.add("active");
  } else if (target === "buyer") {
    buyerScreen.classList.add("active");
  } else if (target === "role") {
    roleScreen.classList.add("active");
  } else {
    offerScreen.classList.add("active");
  }

  updateBackFab();
  if (target === "buyer") {
    ensureBuyerMap();
  }
  if (target === "ownerSubscription") {
    ensureOwnerMap();
  }
}

function setSlide(index) {
  const safeIndex = Math.max(0, Math.min(1, index));
  currentSlide = safeIndex;
  slidesTrack.style.transform = `translateX(-${safeIndex * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  const activeDot = document.querySelector(`.dots .dot[data-dot="${safeIndex}"]`);
  if (activeDot) activeDot.classList.add("active");
}

function setOwnerSlide(index) {
  const safeIndex = Math.max(0, Math.min(1, index));
  ownerSlide = safeIndex;
  ownerSlidesTrack.style.transform = `translateX(-${safeIndex * 100}%)`;
  ownerDots.forEach((dot) => dot.classList.remove("active"));
  const activeDot = document.querySelector(`#ownerSlider .dot[data-dot=\"${safeIndex}\"]`);
  if (activeDot) activeDot.classList.add("active");
}

function showMessage(el, text) {
  el.textContent = text;
  el.classList.add("active");
}

function hideMessage(el) {
  el.textContent = "";
  el.classList.remove("active");
}

function openModal(mode) {
  modalMode = mode;
  modalInput.value = "";
  modal.classList.add("show");
  modalInputWrap.classList.remove("active");

  if (mode === "payment") {
    modalTitle.textContent = "Демо-оплата";
    modalText.textContent = `Обрабатываем тестовый платеж ${planLabels[currentPlan]} (имитация).`;
    modalConfirm.textContent = "Оплатить (демо)";
  }

  if (mode === "transfer") {
    modalTitle.textContent = "Демо-трансфер";
    modalText.textContent = "Имитируем перевод в систему. Реальных денег нет.";
    modalConfirm.textContent = "Запустить";
  }

  if (mode === "book") {
    modalTitle.textContent = "Отправка книги (демо)";
    modalText.textContent = "Введите адрес. Логистика имитируется.";
    modalConfirm.textContent = "Отправить";
    modalInputWrap.classList.add("active");
  }
}

function closeModal() {
  modal.classList.remove("show");
}

planButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    planButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentPlan = btn.dataset.plan;
  });
});

nextSlideBtn.addEventListener("click", () => {
  setSlide(currentSlide === 0 ? 1 : 0);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.dot || 0);
    setSlide(index);
  });
});

offerSlider.addEventListener("pointerdown", (event) => {
  pointerStartX = event.clientX;
  isSwiping = true;
});

offerSlider.addEventListener("pointerup", (event) => {
  if (!isSwiping) return;
  const delta = event.clientX - pointerStartX;
  if (delta < -40) {
    setSlide(1);
  } else if (delta > 40) {
    setSlide(0);
  }
  isSwiping = false;
});

offerSlider.addEventListener("pointerleave", () => {
  isSwiping = false;
});

subscribeBtn.addEventListener("click", () => openModal("payment"));
if (transferBtn) {
  transferBtn.addEventListener("click", () => openModal("transfer"));
}
if (bookBtn) {
  bookBtn.addEventListener("click", () => openModal("book"));
}

buyerBtn.addEventListener("click", () => showScreen("buyer"));
ownerBtn.addEventListener("click", () => showScreen("ownerSubscription"));
if (ownerBackBtn) {
  ownerBackBtn.addEventListener("click", () => showScreen("role"));
}
buyerStartBtn.addEventListener("click", () => {
  showMessage(buyerMessage, "Подбор запущен. Показаны лучшие предложения поблизости.");
});

if (ownerSubscriptionBackBtn) {
  ownerSubscriptionBackBtn.addEventListener("click", () => showScreen("role"));
}
openOwnerFormBtn.addEventListener("click", () => showScreen("owner"));
ownerSubscribeBtn.addEventListener("click", () => openModal("payment"));

ownerNextSlideBtn.addEventListener("click", () => {
  setOwnerSlide(ownerSlide === 0 ? 1 : 0);
});

ownerDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.dot || 0);
    setOwnerSlide(index);
  });
});

ownerSlider.addEventListener("pointerdown", (event) => {
  pointerStartX = event.clientX;
  isSwiping = true;
});

ownerSlider.addEventListener("pointerup", (event) => {
  if (!isSwiping) return;
  const delta = event.clientX - pointerStartX;
  if (delta < -40) {
    setOwnerSlide(1);
  } else if (delta > 40) {
    setOwnerSlide(0);
  }
  isSwiping = false;
});

ownerSlider.addEventListener("pointerleave", () => {
  isSwiping = false;
});

submitBizBtn.addEventListener("click", () => {
  hideMessage(ownerMessage);
  if (!bizName.value.trim() || !bizAddress.value.trim() || !bizContacts.value.trim()) {
    showMessage(ownerMessage, "Заполните название, адрес и контакты.");
    return;
  }
  if (!bizConfirmRules.checked || !bizConfirmOwner.checked) {
    showMessage(ownerMessage, "Подтвердите правила проекта и статус владельца.");
    return;
  }
  const summary = `Заявка принята: ${bizName.value.trim()} • ${bizType.value}. Мы свяжемся для подтверждения.`;
  showMessage(ownerMessage, summary);
});

modalCancel.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

modalConfirm.addEventListener("click", () => {
  if (modalMode === "payment") {
    hasSubscription = true;
    showMessage(offerMessage, "Демо-оплата прошла успешно. Доступ к системе открыт.");
    showScreen("cabinet");
    closeModal();
    return;
  }

  if (modalMode === "transfer") {
    showMessage(offerMessage, "Демо-трансфер выполнен. Средства зачислены в тестовом режиме.");
    closeModal();
    return;
  }

  if (modalMode === "book") {
    const address = modalInput.value.trim() || "адрес не указан";
    showMessage(offerMessage, `Книга оформлена на демо-отправку по адресу: ${address}`);
    closeModal();
  }
});

cabinetActions.forEach((card) => {
  card.addEventListener("click", () => {
    const action = card.dataset.action;
    hideMessage(cabinetMessage);

    if (action === "book") {
      showMessage(cabinetMessage, "Книга открыта в демо-режиме.");
    }

    if (action === "chat") {
      showMessage(cabinetMessage, "Чат открыт в демо-режиме. Сообщения не отправляются.");
    }

    if (action === "audit") {
      showMessage(cabinetMessage, "Запрошен демо-аудит. Онлайн-трансляция запущена.");
    }

    if (action === "bundle") {
      showMessage(cabinetMessage, "Готовые связки выданы в демо-режиме.");
    }
  });
});

function updateBackFab() {
  backFab.classList.add("show");
}

backFab.addEventListener("click", () => {
  if (screenHistory.length <= 1) return;
  screenHistory.pop();
  const previous = screenHistory[screenHistory.length - 1];
  if (!previous) return;
  roleScreen.classList.remove("active");
  ownerScreen.classList.remove("active");
  buyerScreen.classList.remove("active");
  offerScreen.classList.remove("active");
  cabinetScreen.classList.remove("active");
  ownerSubscriptionScreen.classList.remove("active");
  if (previous === "cabinet") cabinetScreen.classList.add("active");
  if (previous === "owner") ownerScreen.classList.add("active");
  if (previous === "ownerSubscription") ownerSubscriptionScreen.classList.add("active");
  if (previous === "buyer") buyerScreen.classList.add("active");
  if (previous === "role") roleScreen.classList.add("active");
  if (previous === "offer") offerScreen.classList.add("active");
  updateBackFab();
});

showScreen("role");
setSlide(0);
setOwnerSlide(0);
updateBackFab();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
  });
}

const astrakhanMapEl = document.getElementById("astrakhanMap");
const astrakhanMapOwnerEl = document.getElementById("astrakhanMapOwner");
let buyerMap = null;
let ownerMap = null;

const mapData = {
  center: [46.35273, 48.05446],
  zoom: 14
};

function initMap(targetId) {
  const map = L.map(targetId, {
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: true,
    doubleClickZoom: false,
    tap: true
  }).setView(mapData.center, mapData.zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  const spots = [
    {
      name: "Salon Aura",
      type: "Парикмахерская",
      rating: "4.8",
      discount: "Скидка 15% на окрашивание",
      promo: "AURA15",
      hot: "Бесплатная укладка при записи сегодня",
      coords: [46.3473, 48.0361]
    },
    {
      name: "Glow Beauty Store",
      type: "Бьюти-магазин",
      rating: "4.6",
      discount: "Скидка 10% на уходовые наборы",
      promo: "GLOW10",
      hot: "Подарок: мини-сыворотка к каждому заказу",
      coords: [46.3545, 48.0472]
    },
    {
      name: "Lash Lab",
      type: "Студия ресниц",
      rating: "4.9",
      discount: "Скидка 12% на ламинирование",
      promo: "LASH12",
      hot: "Экспресс-диагностика формы бесплатно",
      coords: [46.3419, 48.0288]
    },
    {
      name: "Nail Bar 17",
      type: "Маникюр",
      rating: "4.7",
      discount: "Скидка 20% на первый визит",
      promo: "NAIL20",
      hot: "Дизайн одного ногтя в подарок",
      coords: [46.3579, 48.0335]
    },
    {
      name: "Browline",
      type: "Брови и макияж",
      rating: "4.5",
      discount: "Скидка 8% на коррекцию + окрашивание",
      promo: "BROW8",
      hot: "Маска для зоны глаз в подарок",
      coords: [46.3521, 48.0214]
    },
    {
      name: "SPA Voda",
      type: "SPA",
      rating: "4.9",
      discount: "Скидка 18% на массаж спины",
      promo: "SPA18",
      hot: "Чайная церемония бесплатно",
      coords: [46.3358, 48.0449]
    }
  ];

  spots.forEach((spot) => {
    const popupHtml = `
      <div class="map-popup">
        <h4>${spot.name}</h4>
        <p>${spot.type} • Рейтинг ${spot.rating}</p>
        <div class="tag">${spot.discount}</div>
        <div class="tag">Промокод: ${spot.promo}</div>
        <div class="tag">Горячее: ${spot.hot}</div>
      </div>
    `;
    L.marker(spot.coords).addTo(map).bindPopup(popupHtml, {
      autoPan: false,
      closeButton: true
    });
  });

  map.whenReady(() => {
    setTimeout(() => {
      map.invalidateSize();
      map.setView(mapData.center, mapData.zoom, { animate: false });
    }, 50);
  });

  return map;
}

function ensureBuyerMap() {
  if (!astrakhanMapEl || !window.L) return;
  if (!buyerMap) {
    buyerMap = initMap("astrakhanMap");
  }
  setTimeout(() => {
    buyerMap.invalidateSize();
    buyerMap.setView(mapData.center, mapData.zoom, { animate: false });
  }, 200);
}

function ensureOwnerMap() {
  if (!astrakhanMapOwnerEl || !window.L) return;
  if (!ownerMap) {
    ownerMap = initMap("astrakhanMapOwner");
  }
  setTimeout(() => {
    ownerMap.invalidateSize();
    ownerMap.setView(mapData.center, mapData.zoom, { animate: false });
  }, 200);
}
