const roleScreen = document.getElementById("roleScreen");
const ownerScreen = document.getElementById("ownerScreen");
const buyerScreen = document.getElementById("buyerScreen");
const offerScreen = document.getElementById("offerScreen");
const cabinetScreen = document.getElementById("cabinetScreen");
const ownerSubscriptionScreen = document.getElementById("ownerSubscriptionScreen");

const offerMessage = document.getElementById("offerMessage");
const cabinetMessage = document.getElementById("cabinetMessage");
const buyerMessage = document.getElementById("buyerMessage");
const ownerMessage = document.getElementById("ownerMessage");

const subscribeBtn = document.getElementById("subscribeBtn");

const backFab = document.getElementById("backFab");
const navBuyer = document.getElementById("navBuyer");
const navOwner = document.getElementById("navOwner");
const navSubscription = document.getElementById("navSubscription");
const navCabinet = document.getElementById("navCabinet");
const buyerStartBtn = document.getElementById("buyerStartBtn");
const buyerPointsValue = document.getElementById("buyerPointsValue");
const buyerStreakValue = document.getElementById("buyerStreakValue");
const buyerLevelValue = document.getElementById("buyerLevelValue");
const questVisit3Progress = document.getElementById("questVisit3Progress");
const questVisit6Progress = document.getElementById("questVisit6Progress");
const questVisit10Progress = document.getElementById("questVisit10Progress");
const questVisit3State = document.getElementById("questVisit3State");
const questVisit6State = document.getElementById("questVisit6State");
const questVisit10State = document.getElementById("questVisit10State");
const openOwnerFormBtn = document.getElementById("openOwnerFormBtn");
const subRoleBuyer = document.getElementById("subRoleBuyer");
const subRoleOwner = document.getElementById("subRoleOwner");
const subPanelBuyer = document.getElementById("subPanelBuyer");
const subPanelOwner = document.getElementById("subPanelOwner");

const offerSlider = document.getElementById("offerSlider");
const slidesTrack = document.getElementById("slidesTrack");
const nextSlideBtn = document.getElementById("nextSlideBtn");
const dots = document.querySelectorAll("#offerSlider .dots .dot");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalInputWrap = document.getElementById("modalInputWrap");
const modalInput = document.getElementById("modalInput");
const modalConfirm = document.getElementById("modalConfirm");
const modalClose = document.getElementById("modalClose");
const topToast = document.getElementById("topToast");

const submitBizBtn = document.getElementById("submitBizBtn");
const bizName = document.getElementById("bizName");
const bizAddress = document.getElementById("bizAddress");
const bizContacts = document.getElementById("bizContacts");
const bizType = document.getElementById("bizType");
const bizConfirmRules = document.getElementById("bizConfirmRules");
const bizConfirmOwner = document.getElementById("bizConfirmOwner");

const ownerPlanCards = document.querySelectorAll("[data-owner-tier]");
const ownerPriceLite = document.getElementById("ownerPriceLite");
const ownerPricePlus = document.getElementById("ownerPricePlus");
const ownerPricePro = document.getElementById("ownerPricePro");

const buyerPlanCards = document.querySelectorAll("[data-buyer-tier]");
const buyerPriceLite = document.getElementById("buyerPriceLite");
const buyerPricePlus = document.getElementById("buyerPricePlus");
const buyerPricePro = document.getElementById("buyerPricePro");
const subscriptionContextTitle = document.getElementById("subscriptionContextTitle");
const subscriptionContextDesc = document.getElementById("subscriptionContextDesc");
const modalBillingWrap = document.getElementById("modalBillingWrap");
const modalBillingMonth = document.getElementById("modalBillingMonth");
const modalBillingYear = document.getElementById("modalBillingYear");

let ownerBilling = "month";
let ownerTier = "lite";
let buyerBilling = "month";
let buyerTier = "lite";
let paymentContext = "owner";

let offerSlide = 0;
let modalMode = "payment";
const screenHistory = [];
let subscriptionRole = "buyer";
let buyerPoints = 260;
let buyerVisits = 0;
const buyerCompletedQuests = new Set();
const verifiedVisitedSpots = new Set();
const spotVerifyState = {};
const buyerMarkersById = new Map();

const buyerMissions = [
  { id: "visit3", target: 3, reward: 30, progressEl: questVisit3Progress, stateEl: questVisit3State },
  { id: "visit6", target: 6, reward: 60, progressEl: questVisit6Progress, stateEl: questVisit6State },
  { id: "visit10", target: 10, reward: 100, progressEl: questVisit10Progress, stateEl: questVisit10State }
];

const buyerSpots = [
  { id: "hleb", name: "Пекарня ДомХлеб", type: "Пекарня", rating: "4.8", discount: "Скидка 15% на утренние наборы", promo: "HLEB15", hot: "Кофе в подарок к выпечке", coords: [46.3518, 48.0602] },
  { id: "dom24", name: "Магазин У Дома 24", type: "Продуктовый магазин", rating: "4.6", discount: "Скидка 10% на бытовые товары", promo: "DOM10", hot: "2 по цене 1 на часть позиций", coords: [46.3499, 48.0665] },
  { id: "clean", name: "Мастерская Чисто", type: "Химчистка", rating: "4.7", discount: "Скидка 20% на первый заказ", promo: "CLEAN20", hot: "Экспресс-чистка за 1 день", coords: [46.3571, 48.0578] },
  { id: "ugol", name: "Кофейня Угол", type: "Кофейня", rating: "4.9", discount: "Каждый 3-й напиток -30%", promo: "UGOL30", hot: "Сет десерт + кофе за 299", coords: [46.3622, 48.0701] },
  { id: "lavka", name: "Минимаркет Лавка", type: "Магазин у дома", rating: "4.5", discount: "Скидка 12% на готовую еду", promo: "LAVKA12", hot: "Комбо-ланч до 16:00", coords: [46.3448, 48.0720] },
  { id: "testo", name: "Булочная Тесто", type: "Булочная", rating: "4.8", discount: "Скидка 20% после 20:00", promo: "TESTO20", hot: "2 круассана + кофе по спеццене", coords: [46.3409, 48.0614] },
  { id: "gadget", name: "Ремонт GadgetPro", type: "Сервисный центр", rating: "4.7", discount: "Диагностика бесплатно", promo: "GADGET", hot: "Замена стекла за 1 час", coords: [46.3660, 48.0489] },
  { id: "flower", name: "Цветы Букетон", type: "Цветочный магазин", rating: "4.8", discount: "Скидка 15% на монобукеты", promo: "FLOWER15", hot: "Букет дня с бесплатной доставкой", coords: [46.3592, 48.0738] },
  { id: "apteka", name: "Аптека Плюс", type: "Аптека", rating: "4.6", discount: "Скидка 7% на витамины", promo: "HEALTH7", hot: "Набор иммунитет по акции", coords: [46.3476, 48.0746] },
  { id: "kanc", name: "КанцМаркет", type: "Магазин канцтоваров", rating: "4.5", discount: "Скидка 10% школьникам", promo: "SCHOOL10", hot: "Набор для офиса с бонусом", coords: [46.3554, 48.0791] }
];
let toastTimer = null;
let armedBuyerTier = "";
let armedOwnerTier = "";

const ownerPrices = {
  month: {
    lite: "490 RUB/мес",
    plus: "990 RUB/мес",
    pro: "1990 RUB/мес"
  },
  year: {
    lite: "4900 RUB/год",
    plus: "9900 RUB/год",
    pro: "19900 RUB/год"
  }
};

const buyerPrices = {
  month: {
    lite: "149 RUB/мес",
    plus: "299 RUB/мес",
    pro: "499 RUB/мес"
  },
  year: {
    lite: "1490 RUB/год",
    plus: "2990 RUB/год",
    pro: "4990 RUB/год"
  }
};

function getOwnerPlanLabel() {
  return ownerPrices[ownerBilling][ownerTier];
}

function getBuyerPlanLabel() {
  return buyerPrices[buyerBilling][buyerTier];
}

function updateOwnerPricingUI() {
  if (!ownerPriceLite || !ownerPricePlus || !ownerPricePro) return;
  ownerPriceLite.textContent = ownerPrices[ownerBilling].lite;
  ownerPricePlus.textContent = ownerPrices[ownerBilling].plus;
  ownerPricePro.textContent = ownerPrices[ownerBilling].pro;

  ownerPlanCards.forEach((card) => {
    const isActive = card.dataset.ownerTier === ownerTier;
    card.classList.toggle("active", isActive);
    card.classList.toggle("confirm-ready", isActive && armedOwnerTier === ownerTier);
  });
}

function updateBuyerPricingUI() {
  if (!buyerPriceLite || !buyerPricePlus || !buyerPricePro) return;
  buyerPriceLite.textContent = buyerPrices[buyerBilling].lite;
  buyerPricePlus.textContent = buyerPrices[buyerBilling].plus;
  buyerPricePro.textContent = buyerPrices[buyerBilling].pro;

  buyerPlanCards.forEach((card) => {
    const isActive = card.dataset.buyerTier === buyerTier;
    card.classList.toggle("active", isActive);
    card.classList.toggle("confirm-ready", isActive && armedBuyerTier === buyerTier);
  });
}

function showScreen(target) {
  if (screenHistory[screenHistory.length - 1] !== target) {
    screenHistory.push(target);
  }

  [roleScreen, ownerScreen, buyerScreen, offerScreen, cabinetScreen, ownerSubscriptionScreen]
    .filter(Boolean)
    .forEach((s) => s.classList.remove("active"));

  if (target === "cabinet" && cabinetScreen) cabinetScreen.classList.add("active");
  else if (target === "owner" && ownerScreen) ownerScreen.classList.add("active");
  else if (target === "ownerSubscription" && ownerSubscriptionScreen) ownerSubscriptionScreen.classList.add("active");
  else if (target === "buyer" && buyerScreen) buyerScreen.classList.add("active");
  else if (target === "role" && roleScreen) roleScreen.classList.add("active");
  else if (offerScreen) offerScreen.classList.add("active");

  if (target === "buyer") ensureBuyerMap();
  updateBottomNav(target);
}

function updateBottomNav(target) {
  const navMap = {
    buyer: navBuyer,
    owner: navOwner,
    ownerSubscription: navSubscription,
    cabinet: navCabinet
  };
  [navBuyer, navOwner, navSubscription, navCabinet].forEach((btn) => {
    if (!btn) return;
    btn.classList.remove("active");
  });
  if (navMap[target]) navMap[target].classList.add("active");
}

function setOfferSlide(index) {
  if (!slidesTrack) return;
  const safeIndex = Math.max(0, Math.min(1, index));
  offerSlide = safeIndex;
  slidesTrack.style.transform = `translateX(-${safeIndex * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  const activeDot = document.querySelector(`#offerSlider .dot[data-dot="${safeIndex}"]`);
  if (activeDot) activeDot.classList.add("active");
}

function showMessage(el, text) {
  if (!el) return;
  el.textContent = text;
  el.classList.add("active");
}

function hideMessage(el) {
  if (!el) return;
  el.textContent = "";
  el.classList.remove("active");
}

function openModal(mode) {
  if (!modal) return;
  modalMode = mode;
  if (modalInput) modalInput.value = "";
  modal.classList.add("show");
  if (modalInputWrap) modalInputWrap.classList.remove("active");
  if (modalBillingWrap) modalBillingWrap.classList.remove("active");

  if (mode === "payment") {
    if (modalBillingWrap) modalBillingWrap.classList.add("active");
    updateModalBillingUI();
    modalTitle.textContent = "Оплата подписки";
    modalText.textContent = `Платеж ${getPaymentAmountLabel()}. Подтвердите оплату.`;
    modalConfirm.textContent = "Оплатить";
  }
}

function closeModal() {
  if (modal) modal.classList.remove("show");
}

function showToast(text, durationMs = 2400) {
  if (!topToast) return;
  if (toastTimer) clearTimeout(toastTimer);
  topToast.textContent = text;
  topToast.classList.add("show");
  toastTimer = setTimeout(() => {
    topToast.classList.remove("show");
  }, durationMs);
}

function updateBuyerGamificationUI() {
  if (buyerPointsValue) buyerPointsValue.textContent = String(buyerPoints);
  if (buyerStreakValue) buyerStreakValue.textContent = String(buyerVisits);
  if (buyerLevelValue) buyerLevelValue.textContent = getBuyerLevelLabel(buyerPoints);
  updateMissionProgressUI();
}

function getBuyerLevelLabel(points) {
  if (points >= 450) return "Легенда";
  if (points >= 300) return "Эксперт";
  if (points >= 170) return "Профи";
  if (points >= 80) return "Исследователь";
  return "Новичок";
}

function updateMissionProgressUI() {
  buyerMissions.forEach((mission) => {
    if (mission.progressEl) {
      mission.progressEl.textContent = `${Math.min(buyerVisits, mission.target)}/${mission.target}`;
    }
    if (mission.stateEl) {
      mission.stateEl.textContent = buyerCompletedQuests.has(mission.id) ? "Выполнено" : "В процессе";
    }
  });
}

function evaluateBuyerMissions() {
  let rewardTotal = 0;
  buyerMissions.forEach((mission) => {
    if (buyerVisits >= mission.target && !buyerCompletedQuests.has(mission.id)) {
      buyerCompletedQuests.add(mission.id);
      rewardTotal += mission.reward;
    }
  });
  if (rewardTotal > 0) {
    buyerPoints += rewardTotal;
    showToast(`Квесты обновлены: +${rewardTotal} баллов.`, 2300);
  }
}

function getSpotState(spotId) {
  if (!spotVerifyState[spotId]) spotVerifyState[spotId] = "idle";
  return spotVerifyState[spotId];
}

function renderSpotPopup(spot) {
  const state = getSpotState(spot.id);
  const checked = verifiedVisitedSpots.has(spot.id);
  const actionHtml = state === "processing"
    ? '<div class="visit-row"><button class="popup-visit-btn" disabled>Проверяем посещение...</button><span class="verify-spinner"></span></div>'
    : checked
      ? '<div class="visit-row"><button class="popup-visit-btn" disabled>Посещение подтверждено</button><span class="verify-check">✓</span></div>'
      : `<div class="visit-row"><button class="popup-visit-btn" data-spot-id="${spot.id}">Посетил</button></div>`;

  return `<div class="map-popup"><h4>${spot.name}</h4><p>${spot.type} • Рейтинг ${spot.rating}</p><div class="tag">${spot.discount}</div><div class="tag">Промокод: ${spot.promo}</div><div class="tag">Горячее: ${spot.hot}</div>${actionHtml}</div>`;
}

function refreshSpotPopup(spotId) {
  const marker = buyerMarkersById.get(spotId);
  const spot = buyerSpots.find((item) => item.id === spotId);
  if (!marker || !spot) return;
  const wasOpen = marker.isPopupOpen();
  marker.setPopupContent(renderSpotPopup(spot));
  if (wasOpen) marker.openPopup();
}

function verifySpotVisit(spotId) {
  if (getSpotState(spotId) === "processing" || verifiedVisitedSpots.has(spotId)) return;
  spotVerifyState[spotId] = "processing";
  refreshSpotPopup(spotId);
  showToast("Проверяем посещение и активацию промокода...", 2200);

  const delayMs = 2000 + Math.floor(Math.random() * 1001);
  setTimeout(() => {
    spotVerifyState[spotId] = "done";
    if (!verifiedVisitedSpots.has(spotId)) {
      verifiedVisitedSpots.add(spotId);
      buyerVisits += 1;
      buyerPoints += 20;
      evaluateBuyerMissions();
      updateBuyerGamificationUI();
    }
    refreshSpotPopup(spotId);
    const toastDuration = 2000 + Math.floor(Math.random() * 1001);
    showToast("Посещение подтверждено: +20 баллов начислено.", toastDuration);
  }, delayMs);
}

function setSubscriptionRole(role) {
  subscriptionRole = role === "owner" ? "owner" : "buyer";
  if (subRoleBuyer) subRoleBuyer.classList.toggle("active", subscriptionRole === "buyer");
  if (subRoleOwner) subRoleOwner.classList.toggle("active", subscriptionRole === "owner");
  if (subPanelBuyer) subPanelBuyer.classList.toggle("active", subscriptionRole === "buyer");
  if (subPanelOwner) subPanelOwner.classList.toggle("active", subscriptionRole === "owner");
  if (subscriptionContextTitle && subscriptionContextDesc) {
    if (subscriptionRole === "buyer") {
      subscriptionContextTitle.textContent = "Подписка покупателя";
      subscriptionContextDesc.textContent = "Промокоды, персональные подборки и ранний доступ к новым предложениям.";
    } else {
      subscriptionContextTitle.textContent = "Подписка владельца бизнеса";
      subscriptionContextDesc.textContent = "Лиды, приоритет на карте и аналитика для роста выручки.";
    }
  }
}

function getPaymentAmountLabel() {
  return paymentContext === "buyer" ? getBuyerPlanLabel() : getOwnerPlanLabel();
}

function updateModalBillingUI() {
  if (!modalBillingMonth || !modalBillingYear) return;
  const billing = paymentContext === "buyer" ? buyerBilling : ownerBilling;
  modalBillingMonth.classList.toggle("active", billing === "month");
  modalBillingYear.classList.toggle("active", billing === "year");
}

function setPaymentBilling(billing) {
  if (paymentContext === "buyer") {
    buyerBilling = billing;
    updateBuyerPricingUI();
  } else {
    ownerBilling = billing;
    updateOwnerPricingUI();
  }
  updateModalBillingUI();
  if (modalMode === "payment") {
    modalText.textContent = `Платеж ${getPaymentAmountLabel()}. Подтвердите оплату.`;
  }
}

if (navBuyer) navBuyer.addEventListener("click", () => showScreen("buyer"));
if (navOwner) navOwner.addEventListener("click", () => showScreen("owner"));
if (navSubscription) navSubscription.addEventListener("click", () => showScreen("ownerSubscription"));
if (navCabinet) navCabinet.addEventListener("click", () => showScreen("cabinet"));
if (buyerStartBtn) {
  buyerStartBtn.addEventListener("click", () => {
    updateBuyerGamificationUI();
    showToast("Прогресс обновлен. Баллы начисляются только после проверки посещения из карточки бизнеса.", 2400);
  });
}
if (openOwnerFormBtn) openOwnerFormBtn.addEventListener("click", () => showScreen("owner"));
if (subRoleBuyer) subRoleBuyer.addEventListener("click", () => setSubscriptionRole("buyer"));
if (subRoleOwner) subRoleOwner.addEventListener("click", () => setSubscriptionRole("owner"));
if (modalBillingMonth) modalBillingMonth.addEventListener("click", () => setPaymentBilling("month"));
if (modalBillingYear) modalBillingYear.addEventListener("click", () => setPaymentBilling("year"));
ownerPlanCards.forEach((card) => {
  card.addEventListener("click", () => {
    const clickedTier = card.dataset.ownerTier || "lite";
    if (ownerTier !== clickedTier) {
      ownerTier = clickedTier;
      armedOwnerTier = "";
      updateOwnerPricingUI();
      return;
    }
    if (armedOwnerTier !== clickedTier) {
      armedOwnerTier = clickedTier;
      updateOwnerPricingUI();
      return;
    }
    paymentContext = "owner";
    armedOwnerTier = "";
    updateOwnerPricingUI();
    openModal("payment");
  });
});
buyerPlanCards.forEach((card) => {
  card.addEventListener("click", () => {
    const clickedTier = card.dataset.buyerTier || "lite";
    if (buyerTier !== clickedTier) {
      buyerTier = clickedTier;
      armedBuyerTier = "";
      updateBuyerPricingUI();
      return;
    }
    if (armedBuyerTier !== clickedTier) {
      armedBuyerTier = clickedTier;
      updateBuyerPricingUI();
      return;
    }
    paymentContext = "buyer";
    armedBuyerTier = "";
    updateBuyerPricingUI();
    openModal("payment");
  });
});

if (nextSlideBtn) nextSlideBtn.addEventListener("click", () => setOfferSlide(offerSlide === 0 ? 1 : 0));
dots.forEach((dot) => {
  dot.addEventListener("click", () => setOfferSlide(Number(dot.dataset.dot || 0)));
});

if (submitBizBtn) {
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
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

if (modalConfirm) {
  modalConfirm.addEventListener("click", () => {
    if (modalMode === "payment") {
      showScreen("cabinet");
      closeModal();
    }
  });
}

if (backFab) {
  backFab.addEventListener("click", () => {
    if (screenHistory.length <= 1) return;
    screenHistory.pop();
    const previous = screenHistory[screenHistory.length - 1];
    if (previous) showScreen(previous);
  });
}

const astrakhanMapEl = document.getElementById("astrakhanMap");
let buyerMap = null;

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

  buyerSpots.forEach((spot) => {
    const marker = L.marker(spot.coords).addTo(map).bindPopup(renderSpotPopup(spot), { autoPan: false, closeButton: true });
    buyerMarkersById.set(spot.id, marker);
  });

  map.on("popupopen", (event) => {
    const popupEl = event.popup && event.popup.getElement ? event.popup.getElement() : null;
    if (!popupEl) return;
    const visitBtn = popupEl.querySelector(".popup-visit-btn[data-spot-id]");
    if (!visitBtn) return;
    visitBtn.addEventListener("click", (clickEvent) => {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      verifySpotVisit(visitBtn.dataset.spotId || "");
    }, { once: true });
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
  if (!buyerMap) buyerMap = initMap("astrakhanMap");
  setTimeout(() => buyerMap.invalidateSize(), 120);
}

showScreen("buyer");
setOfferSlide(0);
setSubscriptionRole("buyer");
updateOwnerPricingUI();
updateBuyerPricingUI();
updateBuyerGamificationUI();
