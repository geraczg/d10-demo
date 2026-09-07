const canvas = document.querySelector("#space");
const context = canvas.getContext("2d");
const intro = document.querySelector("#intro");
const brandField = document.querySelector("#brandField");
const core = document.querySelector("#core");
const motionStatus = document.querySelector("#motionStatus");
const catalogSearch = document.querySelector("#catalogSearch");
const catalogQuery = document.querySelector("#catalogQuery");
const searchFeedback = document.querySelector("#searchFeedback");
const exploreAction = document.querySelector("#exploreAction");
const catalogSection = document.querySelector("#proximamente");
const languageButton = document.querySelector("#languageButton");
const introPromise = document.querySelector("#introPromise");
const exploreLabel = document.querySelector("#exploreLabel");
const brandsTitle = document.querySelector("#brandsTitle");
const brandsEyebrow = document.querySelector("#brandsEyebrow");
const brandsDescription = document.querySelector("#brandsDescription");
const brandsTotal = document.querySelector("#brandsTotal");
const brandsSection = document.querySelector(".brands-section");
const productsSection = document.querySelector("#marca-1");
const backToBrands = document.querySelector("#backToBrands");
const productFilters = document.querySelector("#productFilters");
const productSort = document.querySelector("#productSort");
const productsGrid = document.querySelector("#productsGrid");
const visibleProductCount = document.querySelector("#visibleProductCount");
const emptyProducts = document.querySelector("#emptyProducts");
const productDetail = document.querySelector("#producto-1");
const backToProducts = document.querySelector("#backToProducts");
const productOneCard = document.querySelector('.product-card[data-name="1"]');

const copy = {
  es: {
    pageTitle: "d10 | Ciencia en movimiento",
    promise: "Frase",
    skip: "Saltar intro",
    resume: "Reanudar intro",
    explore: "Entrar",
    announcements: [
      "<strong>Frase 1</strong>",
      "<strong>Frase 2</strong>",
      "<strong>Frase 3</strong>",
      "<strong>Frase 4</strong>",
      "<strong>Frase 5</strong>"
    ],
    searchPlaceholder: "Buscar por producto, marca o número de catálogo...",
    searchLabel: "Buscar en el catálogo",
    languageLabel: "Idioma seleccionado: español. Cambiar a inglés",
    navigation: ["Pedidos", "Pedido rápido"],
    categoryLabel: "Categorías del catálogo",
    category: "Categoría",
    brandsEyebrow: "Por marca",
    brandsTitle: "Las marcas que representamos",
    brandsDescription: "Explora cada marca y descubre los productos disponibles en su catálogo.",
    brandsTotal: "10 marcas · 1,167 productos",
    brand: "Marca",
    products: "productos",
    productCatalog: "Catálogo de marca",
    backToBrands: "Volver a marcas",
    filters: "Filtros",
    price: "Precio",
    minimumPrice: "Precio mínimo",
    maximumPrice: "Precio máximo",
    minimumShort: "Mín.",
    maximumShort: "Máx.",
    apply: "Aplicar",
    productType: "Categoría",
    availability: "Disponibilidad",
    available: "Disponible",
    backorder: "Sobre pedido",
    sortBy: "Ordenar por",
    sortOptions: ["Destacados", "Precio: menor a mayor", "Precio: mayor a menor", "Nombre"],
    product: "Producto",
    backToProducts: "Volver a productos",
    imagePending: "Imagen pendiente",
    tax: "Precio en MXN · IVA no incluido",
    detailDescription: "Descripción, Información técnica.",
    quoteWhatsApp: "Solicitar cotización por WhatsApp",
    openProduct: "Abrir Producto",
    noProducts: "No hay productos que coincidan con los filtros.",
    emptySearch: "Escribe un producto o una marca para buscar.",
    searchResult: (query) => `La búsqueda de “${query}” estará disponible cuando agreguemos el catálogo.`,
    entering: "Entrando al catálogo.",
    paused: "Animación pausada.",
    resumed: "Animación reanudada."
  },
  en: {
    pageTitle: "d10 | Science in motion",
    promise: "Frase",
    skip: "Skip intro",
    resume: "Resume intro",
    explore: "Enter",
    announcements: [
      "<strong>Phrase 1</strong>",
      "<strong>Phrase 2</strong>",
      "<strong>Phrase 3</strong>",
      "<strong>Phrase 4</strong>",
      "<strong>Phrase 5</strong>"
    ],
    searchPlaceholder: "Search by product, brand or catalog number...",
    searchLabel: "Search the catalog",
    languageLabel: "Selected language: English. Switch to Spanish",
    navigation: ["Orders", "Quick order"],
    categoryLabel: "Catalog categories",
    category: "Category",
    brandsEyebrow: "By brand",
    brandsTitle: "The brands we represent",
    brandsDescription: "Explore each brand and discover the products available in its catalog.",
    brandsTotal: "10 brands · 1,167 products",
    brand: "Brand",
    products: "products",
    productCatalog: "Brand catalog",
    backToBrands: "Back to brands",
    filters: "Filters",
    price: "Price",
    minimumPrice: "Minimum price",
    maximumPrice: "Maximum price",
    minimumShort: "Min.",
    maximumShort: "Max.",
    apply: "Apply",
    productType: "Category",
    availability: "Availability",
    available: "In stock",
    backorder: "Backorder",
    sortBy: "Sort by",
    sortOptions: ["Featured", "Price: low to high", "Price: high to low", "Name"],
    product: "Product",
    backToProducts: "Back to products",
    imagePending: "Image pending",
    tax: "Price in MXN · VAT not included",
    detailDescription: "Description, Technical information.",
    quoteWhatsApp: "Request a quote on WhatsApp",
    openProduct: "Open Product",
    noProducts: "No products match the selected filters.",
    emptySearch: "Enter a product or brand to search.",
    searchResult: (query) => `Search for “${query}” will be available when the catalog is added.`,
    entering: "Entering the catalog.",
    paused: "Animation paused.",
    resumed: "Animation resumed."
  }
};

let currentLanguage = "es";
try {
  currentLanguage = localStorage.getItem("d10-language") === "en" ? "en" : "es";
} catch {}

function translateInterface(language) {
  const text = copy[language];
  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = text.pageTitle;
  introPromise.innerHTML = text.promise;
  exploreLabel.textContent = text.explore;

  document.querySelectorAll(".announcement__group").forEach((group) => {
    group.querySelectorAll(":scope > span").forEach((item, index) => {
      item.innerHTML = text.announcements[index];
    });
  });

  catalogQuery.placeholder = text.searchPlaceholder;
  document.querySelector('label[for="catalogQuery"]').textContent = text.searchLabel;
  languageButton.querySelector("span").textContent = language.toUpperCase();
  languageButton.setAttribute("aria-label", text.languageLabel);
  document.querySelectorAll(".utility-nav a span").forEach((item, index) => {
    item.textContent = text.navigation[index];
  });
  const categoryBar = document.querySelector(".category-bar");
  categoryBar.setAttribute("aria-label", text.categoryLabel);
  categoryBar.querySelectorAll("a span").forEach((item, index) => {
    item.textContent = `${text.category} ${index + 1}`;
  });

  brandsEyebrow.textContent = text.brandsEyebrow;
  brandsTitle.textContent = text.brandsTitle;
  brandsDescription.textContent = text.brandsDescription;
  brandsTotal.textContent = text.brandsTotal;
  document.querySelectorAll(".brand-card").forEach((card, index) => {
    const number = index + 1;
    const count = card.querySelector(":scope > span").textContent.match(/[\d,]+/)?.[0] ?? "0";
    card.querySelector("strong").innerHTML = `${text.brand} <b>${number}</b>`;
    card.querySelector(":scope > span").textContent = `${count} ${text.products}`;
    card.setAttribute("aria-label", `${text.brand} ${number}, ${count} ${text.products}`);
  });

  document.querySelector("#backToBrandsLabel").textContent = text.backToBrands;
  document.querySelector("#productsEyebrow").textContent = text.productCatalog;
  document.querySelector("#productsTitle").textContent = `${text.brand} 1`;
  document.querySelector("#filtersTitle").textContent = text.filters;
  document.querySelector("#priceLegend").textContent = text.price;
  document.querySelector("#minimumPriceLabel").textContent = text.minimumPrice;
  document.querySelector("#maximumPriceLabel").textContent = text.maximumPrice;
  document.querySelector("#minimumPrice").placeholder = text.minimumShort;
  document.querySelector("#maximumPrice").placeholder = text.maximumShort;
  document.querySelector("#applyFiltersLabel").textContent = text.apply;
  document.querySelector("#brandFilterLegend").textContent = text.brand;
  document.querySelector("#brandFilterName").textContent = `${text.brand} 1`;
  document.querySelector("#categoryFilterLegend").textContent = text.productType;
  document.querySelector("#availabilityLegend").textContent = text.availability;
  document.querySelector("#availableLabel").textContent = text.available;
  document.querySelector("#backorderLabel").textContent = text.backorder;
  document.querySelector("#productsCountLabel").textContent = text.products;
  document.querySelector("#sortByLabel").textContent = text.sortBy;
  ["#sortFeatured", "#sortPriceLow", "#sortPriceHigh", "#sortName"].forEach((selector, index) => {
    document.querySelector(selector).textContent = text.sortOptions[index];
  });
  emptyProducts.textContent = text.noProducts;

  document.querySelectorAll('.product-filters input[name="category"] + span').forEach((item, index) => {
    item.textContent = `${text.category} ${index + 1}`;
  });
  document.querySelectorAll(".product-card").forEach((card) => {
    const meta = card.querySelectorAll(".product-card__meta span");
    meta[0].textContent = `${text.brand} 1`;
    meta[1].textContent = `${text.category} ${card.dataset.category}`;
    card.querySelector("h3").textContent = `${text.product} ${card.dataset.name}`;
    card.querySelector(".stock-status").textContent = card.dataset.availability === "available" ? text.available : text.backorder;
  });

  document.querySelector("#backToProductsLabel").textContent = text.backToProducts;
  document.querySelector("#imagePendingLabel").textContent = text.imagePending;
  document.querySelector("#detailBrandLabel").textContent = text.brand;
  document.querySelector("#taxLabel").textContent = text.tax;
  document.querySelector("#productDescription").textContent = text.detailDescription;
  document.querySelector("#specCategoryLabel").textContent = text.category;
  document.querySelector("#specAvailabilityLabel").textContent = text.availability;
  document.querySelector("#specAvailabilityValue").textContent = text.available;
  document.querySelector("#quoteButtonLabel").textContent = text.quoteWhatsApp;
  document.querySelector("#productDetailTitle").textContent = `${text.product} 1`;
  document.querySelector("#detailAvailability").textContent = text.available;
  document.querySelector(".product-detail__tags span:first-child").textContent = `${text.brand} 1`;
  document.querySelector(".product-detail__tags span:last-child").textContent = `${text.category} 1`;
  document.querySelector(".product-specs dd:first-of-type").textContent = `${text.category} 1`;
  productOneCard.setAttribute("aria-label", `${text.openProduct} 1`);

  searchFeedback.textContent = "";
  try { localStorage.setItem("d10-language", language); } catch {}
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const brands = [
  "Nexora", "Veltium", "Axiome", "Lumetra", "Quantis", "Helixon",
  "Orvex", "Cellara", "Novaris", "Aether Lab", "Metrion", "Virelia",
  "Spectra", "Calyx", "Therion", "Genora", "Praxium", "Alveo"
];

const orbitProfiles = [
  { rx: 0.47, ry: 0.17, rotation: -0.18, speed: 0.000048 },
  { rx: 0.39, ry: 0.31, rotation: 0.72, speed: -0.000039 },
  { rx: 0.48, ry: 0.24, rotation: 0.36, speed: 0.000032 },
  { rx: 0.29, ry: 0.43, rotation: -0.55, speed: -0.000027 }
];

const brandNodes = brands.map((name, index) => {
  const element = document.createElement("span");
  element.className = "brand-name";
  element.textContent = name;
  brandField.append(element);

  return {
    element,
    orbit: index % orbitProfiles.length,
    phase: (index / brands.length) * Math.PI * 2 + (index % 4) * 0.7,
    depth: 0.65 + ((index * 37) % 35) / 100
  };
});

let particles = [];
let width = 0;
let height = 0;
let pixelRatio = 1;
let pointerX = 0;
let pointerY = 0;
let animationFrame = 0;
let motionPaused = prefersReducedMotion.matches;
let zoomProgress = 0;
let touchStartY = null;
let transitionStarted = false;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const particleCount = Math.max(45, Math.min(120, Math.floor((width * height) / 10500)));
  particles = Array.from({ length: particleCount }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: index % 17 === 0 ? 1.5 : Math.random() * 0.9 + 0.25,
    alpha: Math.random() * 0.55 + 0.18,
    drift: Math.random() * 0.08 + 0.015,
    streak: index % 29 === 0
  }));
}

function drawOrbit(cx, cy, rx, ry, rotation) {
  context.save();
  context.translate(cx, cy);
  context.rotate(rotation);
  context.beginPath();
  context.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  context.strokeStyle = "rgba(0, 182, 255, 0.16)";
  context.lineWidth = 0.8;
  context.stroke();
  context.restore();
}

function drawSpace(time) {
  context.clearRect(0, 0, width, height);
  const centerX = width / 2 + pointerX * 12;
  const centerY = height * 0.47 + pointerY * 8;
  const scaleX = Math.min(width * 0.39, 560);
  const scaleY = Math.min(height * 0.32, 290);

  orbitProfiles.forEach((orbit) => {
    drawOrbit(centerX, centerY, scaleX * (orbit.rx / 0.47), scaleY * (orbit.ry / 0.31), orbit.rotation);
  });

  particles.forEach((particle) => {
    const drift = motionPaused ? 0 : time * particle.drift * 0.01;
    const x = (particle.x + drift) % (width + 40) - 20;
    context.beginPath();
    if (particle.streak) {
      context.moveTo(x - 13, particle.y + 7);
      context.lineTo(x + 2, particle.y);
      context.strokeStyle = `rgba(200, 244, 255, ${particle.alpha})`;
      context.lineWidth = 0.8;
      context.stroke();
    }
    context.beginPath();
    context.arc(x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(230, 246, 255, ${particle.alpha})`;
    context.fill();
  });
}

function positionBrands(time) {
  const rect = brandField.getBoundingClientRect();
  const base = motionPaused ? 0 : time;

  brandNodes.forEach((brand, index) => {
    const orbit = orbitProfiles[brand.orbit];
    const angle = brand.phase + base * orbit.speed;
    const rawX = Math.cos(angle) * rect.width * orbit.rx;
    const rawY = Math.sin(angle) * rect.height * orbit.ry;
    const cos = Math.cos(orbit.rotation);
    const sin = Math.sin(orbit.rotation);
    const x = rawX * cos - rawY * sin;
    const y = rawX * sin + rawY * cos;
    const front = (Math.sin(angle) + 1) / 2;
    const opacity = 0.38 + front * 0.62;
    const scale = brand.depth * (0.85 + front * 0.24);

    brand.element.style.opacity = opacity.toFixed(2);
    brand.element.style.zIndex = String(Math.round(front * 4));
    brand.element.style.transform = `translate(calc(-50% + ${x + pointerX * 7 * brand.depth}px), calc(-50% + ${y + pointerY * 5 * brand.depth}px)) scale(${scale})`;
  });
}

function render(time = 0) {
  drawSpace(time);
  positionBrands(time);
  animationFrame = requestAnimationFrame(render);
}

function setMotionPaused(paused, message) {
  motionPaused = paused;
  intro.classList.toggle("is-skipped", paused);
  motionStatus.textContent = message;
}

window.addEventListener("pointermove", (event) => {
  if (motionPaused) return;
  pointerX = event.clientX / width - 0.5;
  pointerY = event.clientY / height - 0.5;
  core.style.setProperty("--pointer-x", `${pointerX * -7}px`);
  core.style.setProperty("--pointer-y", `${pointerY * -5}px`);
});

window.addEventListener("pointerleave", () => {
  pointerX = 0;
  pointerY = 0;
  core.style.setProperty("--pointer-x", "0px");
  core.style.setProperty("--pointer-y", "0px");
});

function applyZoomProgress(value) {
  zoomProgress = Math.max(0, Math.min(1, value));
  const eased = 1 - Math.pow(1 - zoomProgress, 3);
  intro.style.setProperty("--scene-scale", String(1 + eased * 3.8));
  intro.style.setProperty("--scene-opacity", String(Math.max(0, 1 - eased * 0.94)));
  intro.style.setProperty("--interface-opacity", String(Math.max(0, 1 - zoomProgress * 2.2)));
  intro.style.setProperty("--interface-shift", `${zoomProgress * 28}px`);

  if (zoomProgress >= 0.995) enterCatalog();
}

function enterCatalog() {
  if (transitionStarted) return;
  transitionStarted = true;
  intro.classList.add("is-entering");
  motionStatus.textContent = copy[currentLanguage].entering;

  window.setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    intro.hidden = true;
    catalogSection.scrollIntoView({ behavior: "auto", block: "start" });
    catalogQuery?.focus({ preventScroll: true });
  }, prefersReducedMotion.matches ? 0 : 340);
}

function zoomBy(amount) {
  if (transitionStarted) return;
  if (prefersReducedMotion.matches) {
    applyZoomProgress(1);
    return;
  }
  applyZoomProgress(zoomProgress + amount);
}

function animateZoomToCatalog() {
  if (transitionStarted) return;
  const start = zoomProgress;
  const startTime = performance.now();
  const duration = 950;

  function step(now) {
    const elapsed = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 4);
    applyZoomProgress(start + (1 - start) * eased);
    if (elapsed < 1 && !transitionStarted) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

intro.addEventListener("wheel", (event) => {
  if (transitionStarted || Math.abs(event.deltaY) < 1) return;
  if (event.deltaY < 0 && zoomProgress === 0) return;
  event.preventDefault();
  zoomBy(event.deltaY / 900);
}, { passive: false });

intro.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0]?.clientY ?? null;
}, { passive: true });

intro.addEventListener("touchmove", (event) => {
  if (touchStartY === null || transitionStarted) return;
  const currentY = event.touches[0]?.clientY ?? touchStartY;
  const delta = touchStartY - currentY;
  if (delta > 0 || zoomProgress > 0) {
    event.preventDefault();
    zoomBy(delta / 520);
    touchStartY = currentY;
  }
}, { passive: false });

intro.addEventListener("touchend", () => { touchStartY = null; });

window.addEventListener("keydown", (event) => {
  if (transitionStarted || window.scrollY > intro.offsetHeight * 0.5) return;
  if (["ArrowDown", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    zoomBy(0.22);
  }
});

exploreAction.addEventListener("click", animateZoomToCatalog);

prefersReducedMotion.addEventListener("change", (event) => {
  setMotionPaused(event.matches, event.matches ? copy[currentLanguage].paused : copy[currentLanguage].resumed);
});

window.addEventListener("resize", resizeCanvas);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelAnimationFrame(animationFrame);
  else if (!intro.hidden) render(performance.now());
});

resizeCanvas();
render();
translateInterface(currentLanguage);

languageButton?.addEventListener("click", () => {
  translateInterface(currentLanguage === "es" ? "en" : "es");
});

function showBrandOne() {
  brandsSection.hidden = true;
  productsSection.hidden = false;
  productsSection.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
}

function showBrands() {
  productDetail.hidden = true;
  productsSection.hidden = true;
  brandsSection.hidden = false;
  brandsSection.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
}

document.querySelector('.brand-card[href="#marca-1"]')?.addEventListener("click", (event) => {
  event.preventDefault();
  showBrandOne();
});

document.querySelectorAll('.brand-card:not([href="#marca-1"])').forEach((card) => {
  card.setAttribute("aria-disabled", "true");
  card.addEventListener("click", (event) => event.preventDefault());
});

backToBrands?.addEventListener("click", showBrands);

document.querySelector(".catalog-logo")?.addEventListener("click", (event) => {
  event.preventDefault();
  showBrands();
});

function showProductOne() {
  productsSection.hidden = true;
  productDetail.hidden = false;
  productDetail.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
}

function showProducts() {
  productDetail.hidden = true;
  productsSection.hidden = false;
  productsSection.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
}

productOneCard?.addEventListener("click", showProductOne);
productOneCard?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    showProductOne();
  }
});
backToProducts?.addEventListener("click", showProducts);

function applyProductFilters() {
  const minimum = Number(document.querySelector("#minimumPrice").value) || 0;
  const maximum = Number(document.querySelector("#maximumPrice").value) || Infinity;
  const categories = [...productFilters.querySelectorAll('input[name="category"]:checked')].map((input) => input.value);
  const availability = [...productFilters.querySelectorAll('input[name="availability"]:checked')].map((input) => input.value);
  const cards = [...productsGrid.querySelectorAll(".product-card")];

  let visible = 0;
  cards.forEach((card) => {
    const price = Number(card.dataset.price);
    const categoryMatch = categories.length === 0 || categories.includes(card.dataset.category);
    const availabilityMatch = availability.length === 0 || availability.includes(card.dataset.availability);
    const matches = price >= minimum && price <= maximum && categoryMatch && availabilityMatch;
    card.hidden = !matches;
    if (matches) visible += 1;
  });

  visibleProductCount.textContent = String(visible);
  emptyProducts.hidden = visible !== 0;
}

function sortProducts() {
  const cards = [...productsGrid.querySelectorAll(".product-card")];
  const mode = productSort.value;
  cards.sort((a, b) => {
    if (mode === "price-asc") return Number(a.dataset.price) - Number(b.dataset.price);
    if (mode === "price-desc") return Number(b.dataset.price) - Number(a.dataset.price);
    if (mode === "name") return Number(a.dataset.name) - Number(b.dataset.name);
    return Number(a.dataset.featured) - Number(b.dataset.featured);
  });
  cards.forEach((card) => productsGrid.append(card));
}

productFilters?.addEventListener("submit", (event) => {
  event.preventDefault();
  applyProductFilters();
});

productFilters?.addEventListener("change", applyProductFilters);
productSort?.addEventListener("change", sortProducts);

catalogSearch?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = catalogQuery.value.trim();
  searchFeedback.textContent = query
    ? copy[currentLanguage].searchResult(query)
    : copy[currentLanguage].emptySearch;
});
