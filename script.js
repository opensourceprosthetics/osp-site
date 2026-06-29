/* ==========================================
   Open Source Prosthetics
   Minimal Interactions
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       Reveal Elements
    ----------------------------- */

    const revealElements = document.querySelectorAll(
        ".panel, .features article, .mission, .quote, .stats-grid > div, .cta"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(el => {

        el.classList.add("hidden");
        observer.observe(el);

    });

    /* -----------------------------
       Navbar Scroll Effect
    ----------------------------- */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

    /* -----------------------------
       Mouse Glow
    ----------------------------- */

    const glow = document.querySelector(".background-glow");

    window.addEventListener("mousemove", e => {

        const x = e.clientX * 0.04;
        const y = e.clientY * 0.04;

        glow.style.transform =
            `translate(${x}px, ${y}px)`;

    });

    /* -----------------------------
       Background Circles
    ----------------------------- */

    const circles = document.querySelectorAll(".background-circle");

    window.addEventListener("scroll", () => {

        const y = window.scrollY;

        circles.forEach((circle, index) => {

            const speed = (index + 1) * 0.08;

            circle.style.transform =
                `translateY(${y * speed}px)`;

        });

    });

    /* -----------------------------
       Animated Stats
    ----------------------------- */

    const counters = document.querySelectorAll(".stats h2");

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

});


/* ==========================================
   Counter Animation
========================================== */

function animateCounter(element) {

    const text = element.textContent;

    const number = parseInt(text.replace(/\D/g, ""));

    const suffix = text.replace(/[0-9]/g, "");

    let current = 0;

    const duration = 1600;

    const step = number / (duration / 16);

    function update() {

        current += step;

        if (current >= number) {

            element.textContent = number + suffix;
            return;

        }

        element.textContent =
            Math.floor(current) + suffix;

        requestAnimationFrame(update);

    }

    update();

}
