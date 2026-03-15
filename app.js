const body = document.body;
const page = body.dataset.page;
const navLinks = document.querySelectorAll("[data-nav]");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const backdrop = document.getElementById("backdrop");
const loginForm = document.getElementById("loginForm");
const authError = document.getElementById("authError");

const LOGIN_PAGE = "index.html";
const HOME_PAGE = "dashboard.html";
const AUTH_KEY = "ud_auth";
const protectedPages = new Set([
  "dashboard",
  "add-course",
  "master-class",
  "foundation-class",
  "past-classes",
  "past-exams",
  "practice-exam",
  "solve-sheet",
  "performance",
  "course-content",
  "qa-service",
  "due-payment",
  "discussion-group",
  "community"
]);

const isLoggedIn = () => sessionStorage.getItem(AUTH_KEY) === "ok";

if (page === "login") {
  sessionStorage.removeItem(AUTH_KEY);
}

if (protectedPages.has(page) && !isLoggedIn()) {
  window.location.href = LOGIN_PAGE;
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const studentId = document.getElementById("studentId")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (studentId === "16348" && password === "MHRohan360") {
      sessionStorage.setItem(AUTH_KEY, "ok");
      window.location.href = HOME_PAGE;
      return;
    }

    if (authError) {
      authError.textContent = "Invalid Student ID or Password.";
    }
  });
}

if (page) {
  navLinks.forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("active");
    }
  });
}

const closeSidebar = () => {
  if (!sidebar || !backdrop) return;
  sidebar.classList.remove("open");
  backdrop.classList.remove("show");
};

const openSidebar = () => {
  if (!sidebar || !backdrop) return;
  sidebar.classList.add("open");
  backdrop.classList.add("show");
};

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("open");
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
}

if (backdrop) {
  backdrop.addEventListener("click", closeSidebar);
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeSidebar();
  }
});

const injectFooter = () => {
  if (!protectedPages.has(page)) return;
  const content = document.querySelector(".content");
  if (!content || document.getElementById("siteFooter")) return;

  const footer = document.createElement("section");
  footer.id = "siteFooter";
  footer.className = "site-footer";
  footer.innerHTML = `
    <p>Helpline: 09666775566 | Address: Hossain Tower (5th Floor), 75 Green Road, Farmgate, Dhaka-1205.</p>
    <div class="social-links">
      <a href="https://www.youtube.com/c/UdvashUnmesh" target="_blank" rel="noopener noreferrer">YouTube</a>
      <a href="https://www.instagram.com/udvash_unmesh/" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://www.linkedin.com/in/udvashunmesh/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  `;
  content.appendChild(footer);
};

injectFooter();

const injectBrandLogo = () => {
  const brandBlocks = document.querySelectorAll(".logo");
  brandBlocks.forEach((block) => {
    if (block.querySelector("img")) return;
    block.innerHTML = `
      <img src="https://udvash-unmesh.com/media/Images/Udvash/Common/UdvashUnmeshOnlineCare.png" alt="Udvash-Unmesh Online Care" class="brand-logo" />
    `;
  });
};

injectBrandLogo();
