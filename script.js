const STORAGE_KEY = 'landing-page-content-v1';
const EDITABLE_SELECTOR = '[contenteditable="true"]';

function getEditables() {
  return [...document.querySelectorAll(EDITABLE_SELECTOR)];
}

function saveContent() {
  const payload = getEditables().map((el) => el.innerHTML);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadContent() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const payload = JSON.parse(raw);
    getEditables().forEach((el, index) => {
      if (payload[index] !== undefined) el.innerHTML = payload[index];
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function setEditing(enabled) {
  document.body.classList.toggle('locked', !enabled);
  getEditables().forEach((el) => {
    el.setAttribute('contenteditable', String(enabled));
  });

  const toggle = document.getElementById('toggleEdit');
  toggle.textContent = enabled ? 'Lock Editing' : 'Enable Editing';
}

loadContent();

getEditables().forEach((el) => {
  el.addEventListener('input', saveContent);
});

let isEditingEnabled = true;
const toggle = document.getElementById('toggleEdit');
toggle.addEventListener('click', () => {
  isEditingEnabled = !isEditingEnabled;
  setEditing(isEditingEnabled);
});
