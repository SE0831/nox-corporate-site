document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");

  const setMenuState = (isOpen) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    mobileMenu.inert = !isOpen;
    mobileMenu.classList.toggle("is-open", isOpen);
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
    });

    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) setMenuState(false);
    });
  }

  const revealElements = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".stagger-group").forEach((group) => {
    group.querySelectorAll(":scope > .reveal").forEach((element, index) => {
      element.style.transitionDelay = `${index * 80}ms`;
    });
  });

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
});
