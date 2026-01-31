const form = document.getElementById("revival-form");
const resultBox = document.getElementById("revival-path");

let allDays = [];
let currentDay = 0;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultBox.innerHTML = "<p class='loading'>Consulting ancient memory…</p>";

  const payload = {
    skill: document.getElementById("skill").value,
    duration_value: document.getElementById("duration_value").value,
    duration_unit: document.getElementById("duration_unit").value,
    learning_source: document.getElementById("learning_source").value,
    resource: document.getElementById("resource").value,
    reason: document.getElementById("reason").value,
  };

  const res = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!data.days || data.days.length === 0) {
    resultBox.innerHTML = "<p>AI could not awaken the path.</p>";
    return;
  }

  allDays = data.days;
  currentDay = 0;
  resultBox.innerHTML = "";

  renderDay(currentDay);
});

function renderDay(index) {
  const day = allDays[index];

  const card = document.createElement("div");
  card.className = "day-card";

  card.innerHTML = `
    <div class="gada" id="gada-${index}">
      <svg viewBox="0 0 100 100" class="gada-svg">
        <!-- head -->
        <circle cx="50" cy="22" r="18" />
        <!-- neck -->
        <rect x="45" y="40" width="10" height="10" rx="3"/>
        <!-- handle -->
        <rect x="47" y="52" width="6" height="36" rx="3"/>
      </svg>
    </div>

    <h3>Day ${day.day}</h3>
    <p class="message">${day.message}</p>
    <p class="action">${day.action}</p>

    <button class="complete-btn">Mark today complete</button>
  `;

  const btn = card.querySelector(".complete-btn");

  btn.addEventListener("click", () => {
    completeDay(index, card);
  });

  resultBox.appendChild(card);
}

function completeDay(index, card) {
  const gada = document.getElementById(`gada-${index}`);
  gada.classList.add("completed");

  const btn = card.querySelector(".complete-btn");
  btn.disabled = true;
  btn.innerText = "Completed";

  currentDay++;

  if (currentDay < allDays.length) {
    setTimeout(() => {
      renderDay(currentDay);
    }, 700);
  } else {
    setTimeout(showCrown, 900);
  }
}

function showCrown() {
  const crown = document.createElement("div");
  crown.className = "crown";
  crown.innerHTML = `
    <h2>👑</h2>
    <p>Your power was never lost.</p>
  `;
  resultBox.appendChild(crown);
}

const dropdown = document.getElementById("learnDropdown");
const selected = dropdown.querySelector(".selected");
const options = dropdown.querySelectorAll(".option");
const hiddenInput = document.getElementById("learning_source");

dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

options.forEach(opt => {
  opt.addEventListener("click", () => {
    selected.innerText = opt.innerText;
    hiddenInput.value = opt.innerText;
    dropdown.classList.remove("active");
  });
});

// ===== Duration Dropdown =====
const durationDropdown = document.getElementById("durationDropdown");
const durationSelected = durationDropdown.querySelector(".selected");
const durationOptions = durationDropdown.querySelectorAll(".option");
const durationHidden = document.getElementById("duration_unit");

durationDropdown.addEventListener("click", () => {
  durationDropdown.classList.toggle("active");
});

durationOptions.forEach(opt => {
  opt.addEventListener("click", () => {
    durationSelected.innerText = opt.innerText;
    durationHidden.value = opt.innerText;
    durationDropdown.classList.remove("active");
  });
});
