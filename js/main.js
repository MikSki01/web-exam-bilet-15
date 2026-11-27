// Білет №15 — Збереження даних у localStorage
"use strict";

const STORAGE_KEY = "examSettings";

// Вхідні дані за умовою
const settings = {
  theme: "dark",
  fontSize: 18,
};

// Значення за замовчуванням, якщо ключа немає у сховищі
const DEFAULT_SETTINGS = {
  theme: "light",
  fontSize: 16,
};

const output = document.getElementById("output");

// 1. Зберегти об'єкт у localStorage під ключем examSettings
function saveSettings() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    render(settings, "збережено");
  } catch (error) {
    output.textContent = "Помилка збереження: " + error.message;
  }
}

// 2. Прочитати значення та відновити об'єкт.
//    Якщо ключ відсутній — використати { theme: 'light', fontSize: 16 }.
function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return DEFAULT_SETTINGS; // ключа немає — значення за замовчуванням
    }
    const parsed = JSON.parse(raw);
    return {
      theme: parsed.theme ?? DEFAULT_SETTINGS.theme,
      fontSize: parsed.fontSize ?? DEFAULT_SETTINGS.fontSize,
    };
  } catch (error) {
    return DEFAULT_SETTINGS; // некоректний JSON — теж значення за замовчуванням
  }
}

// 3. Вивести значення theme і fontSize відновлених налаштувань
function render(data, note) {
  output.textContent =
    `theme = ${data.theme}, fontSize = ${data.fontSize}` +
    (note ? ` (${note})` : "");
  // Наочно застосовуємо налаштування до сторінки
  document.body.dataset.theme = data.theme;
  document.body.style.fontSize = data.fontSize + "px";
}

function clearSettings() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    /* сховище недоступне — ігноруємо */
  }
  render(loadSettings(), "ключ очищено → значення за замовчуванням");
}

// Кнопки
document.getElementById("btn-save").addEventListener("click", saveSettings);
document.getElementById("btn-read").addEventListener("click", () =>
  render(loadSettings(), "відновлено")
);
document.getElementById("btn-clear").addEventListener("click", clearSettings);

// Під час завантаження сторінки одразу читаємо й виводимо відновлені налаштування
render(loadSettings(), "при завантаженні");
