const screens = [...document.querySelectorAll(".screen")];
const navPills = [...document.querySelectorAll(".nav-pill")];
const jumpButtons = [...document.querySelectorAll("[data-jump]")];
const nextButtons = [...document.querySelectorAll("[data-next]")];
const appScreens = [...document.querySelectorAll(".app-screen")];
const categoryToggles = [...document.querySelectorAll("[data-category-toggle]")];
const optionPanels = [...document.querySelectorAll("[data-option-panel]")];
const categoryOptions = [...document.querySelectorAll("[data-category-option]")];
const contextToggles = [...document.querySelectorAll(".context-toggle")];
const bootSplash = document.querySelector(".boot-splash");

const tabItems = [
  {
    target: "home",
    label: "Home",
    icon:
      '<svg viewBox="0 0 24 24" class="fill-on-active" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5"></path><path d="M6.5 9.5V20h11V9.5"></path><path class="fill-target" d="M10 20v-5h4v5"></path></svg>',
  },
  {
    target: "input",
    label: "Analysis",
    icon:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v13H5z"></path><path d="M9 15v-4"></path><path d="M12 15V9"></path><path d="M15 15v-7"></path></svg>',
  },
  {
    target: "consult",
    label: "Consult",
    icon:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5h14v9H9l-4 3v-12z"></path></svg>',
  },
  {
    target: "doctor",
    label: "Doctors",
    icon:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4.5h8v4H8z"></path><path d="M5 8.5h14V20H5z"></path><path d="M12 11v6"></path><path d="M9 14h6"></path></svg>',
  },
  {
    target: "profile",
    label: "Profile",
    icon:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path><path d="M5.5 19.5c1.6-2.6 4-4 6.5-4s4.9 1.4 6.5 4"></path></svg>',
  },
];

const screenToTab = {
  home: "home",
  input: "input",
  result: "input",
  detail: "input",
  doctor: "doctor",
  consult: "consult",
  profile: "profile",
};

appScreens.forEach((screen) => {
  screen.classList.add("has-tabbar");

  const scrollLayer = document.createElement("div");
  scrollLayer.className = "screen-scroll";

  while (screen.firstChild) {
    scrollLayer.appendChild(screen.firstChild);
  }

  screen.appendChild(scrollLayer);

  const tabbar = document.createElement("nav");
  tabbar.className = "bottom-tabbar";
  tabbar.setAttribute("aria-label", "Bottom navigation");

  tabItems.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bottom-tab";
    button.dataset.target = item.target;
    button.innerHTML = `
      <span class="bottom-tab-icon">${item.icon}</span>
      <span class="bottom-tab-label">${item.label}</span>
    `;
    tabbar.appendChild(button);
  });

  screen.appendChild(tabbar);
});

const bottomTabs = [...document.querySelectorAll(".bottom-tab")];

function showScreen(name) {
  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === name;
    screen.classList.toggle("active", isActive);
    if (isActive) {
      const scrollLayer = screen.querySelector(".screen-scroll");
      if (scrollLayer) {
        scrollLayer.scrollTo({ top: 0, behavior: "auto" });
      } else {
        screen.scrollTo({ top: 0, behavior: "auto" });
      }
    }
  });

  navPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.target === name);
  });

  const activeTab = screenToTab[name];
  bottomTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.target === activeTab);
  });
}

function closeOptionPanels() {
  optionPanels.forEach((panel) => {
    panel.hidden = true;
  });

  categoryToggles.forEach((button) => {
    button.classList.remove("active");
  });
}

function appendSelection(category, label, meta = "") {
  const list = document.querySelector(`[data-selection-list="${category}"]`);
  if (!list) return;

  const duplicate = [...list.children].some((item) => item.dataset.value === label);
  if (duplicate) return;

  if (list.classList.contains("selection-tags")) {
    const tag = document.createElement("span");
    tag.textContent = label;
    tag.dataset.value = label;
    list.appendChild(tag);
    return;
  }

  const row = document.createElement("div");
  row.className = "pill-row";
  row.dataset.value = label;
  row.innerHTML = `<span>${label}</span><em>${meta}</em>`;
  list.appendChild(row);
}

navPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    showScreen(pill.dataset.target);
  });
});

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.next);
  });
});

bottomTabs.forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.target);
  });
});

categoryToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const { categoryToggle } = button.dataset;
    const panel = document.querySelector(`[data-option-panel="${categoryToggle}"]`);
    const willOpen = panel.hidden;

    closeOptionPanels();

    if (willOpen) {
      panel.hidden = false;
      button.classList.add("active");
    }
  });
});

categoryOptions.forEach((button) => {
  button.addEventListener("click", () => {
    appendSelection(
      button.dataset.categoryOption,
      button.dataset.label,
      button.dataset.meta || ""
    );
  });
});

contextToggles.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

jumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.jump);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

showScreen("login");

if (bootSplash) {
  window.setTimeout(() => {
    bootSplash.classList.add("hidden");
  }, 1500);
}
