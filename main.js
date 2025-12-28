(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Sticky header elevation on scroll
  const header = document.querySelector("[data-elevate]");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    const setExpanded = (expanded) => {
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      menu.classList.toggle("is-open", expanded);
    };

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      setExpanded(!expanded);
    });

    // Close menu when clicking a link
    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.tagName === "A") setExpanded(false);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExpanded(false);
    });
  }

  // Contact form: mailto fallback (no backend required)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value?.trim() || "";
      const email = document.getElementById("email")?.value?.trim() || "";
      const company = document.getElementById("company")?.value?.trim() || "";
      const message = document.getElementById("message")?.value?.trim() || "";

      if (!name || !email || !message) {
        alert("Please complete Name, Email, and Message.");
        return;
      }

      // Update this email address:
      const to = "contact@kybs.example";
      const subject = encodeURIComponent("KYBS enquiry");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}\n`
      );

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

  // Update visible email link too
  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.textContent = "contact@kybs.example";
    emailLink.setAttribute("href", "mailto:contact@kybs.example");
  }
})();
