/* =========================================================
   SAZIM TRADING & PROJECTS
   Main JavaScript
========================================================= */


/* =========================================================
   01. DOM ELEMENTS
========================================================= */

const siteHeader = document.getElementById("siteHeader");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contactForm");
const currentYear = document.getElementById("currentYear");


/* =========================================================
   02. CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   03. MOBILE NAVIGATION
========================================================= */

if (mobileMenuBtn && mainNav) {

    mobileMenuBtn.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("open");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        const icon = mobileMenuBtn.querySelector("i");

        if (icon) {

            if (isOpen) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });

}


/* =========================================================
   04. CLOSE MOBILE MENU WHEN NAV LINK IS CLICKED
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 900 && mainNav) {

            mainNav.classList.remove("open");

            document.body.classList.remove("menu-open");

            if (mobileMenuBtn) {

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    mobileMenuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        }

    });

});


/* =========================================================
   05. CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

    if (!mainNav || !mobileMenuBtn) {
        return;
    }

    const clickedInsideNav =
        mainNav.contains(event.target);

    const clickedMenuButton =
        mobileMenuBtn.contains(event.target);

    if (
        mainNav.classList.contains("open") &&
        !clickedInsideNav &&
        !clickedMenuButton
    ) {

        mainNav.classList.remove("open");

        document.body.classList.remove("menu-open");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon =
            mobileMenuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }

});


/* =========================================================
   06. HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 50) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   07. ACTIVE NAVIGATION ON SCROLL
========================================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   08. SCROLL REVEAL ANIMATION
========================================================= */

/*
   All elements that should animate into view are included
   here.

   IMPORTANT:
   Hero text, problem/homeownership content and statistics
   are included so they cannot remain invisible.
*/

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".intro-content, " +
    ".about-visual, " +
    ".about-content, " +
    ".problem-heading, " +
    ".problem-content, " +
    ".stat-item, " +
    ".service-card, " +
    ".project-feature, " +
    ".project-card, " +
    ".sector-item, " +
    ".credential-card, " +
    ".contact-info, " +
    ".contact-form-wrapper"
);


/*
   Add reveal class automatically.
*/

revealElements.forEach((element) => {

    element.classList.add("reveal");

});


/*
   Make sure JavaScript is enabled before
   activating the reveal system.
*/

document.documentElement.classList.add(
    "js-enabled"
);


/*
   Intersection Observer.
*/

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    /*
       Fallback for browsers that do not support
       IntersectionObserver.
    */

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* =========================================================
   09. STAGGER SERVICE CARDS
========================================================= */

const serviceCards =
    document.querySelectorAll(".service-card");

serviceCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.07}s`;

});


/* =========================================================
   10. STAGGER PROJECT CARDS
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.08}s`;

});


/* =========================================================
   11. SMOOTH ANCHOR SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((anchor) => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }
    );

});


/* =========================================================
   12. TEMPORARY CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector(
                    ".form-submit"
                );

            if (!submitButton) {
                return;
            }

            const originalButtonText =
                submitButton.innerHTML;


            /*
               Loading state.
            */

            submitButton.disabled = true;

            submitButton.innerHTML =
                `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Sending...
                `;


            /*
               Temporary simulated processing.
            */

            setTimeout(() => {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    `
                        Enquiry Received
                        <i class="fa-solid fa-check"></i>
                    `;

                contactForm.reset();


                /*
                   Restore original button.
                */

                setTimeout(() => {

                    submitButton.innerHTML =
                        originalButtonText;

                }, 3000);

            }, 1200);

        }
    );

}


/* =========================================================
   13. PHONE NUMBER INTERACTION
========================================================= */

const phoneLinks =
    document.querySelectorAll(
        'a[href^="tel:"]'
    );

phoneLinks.forEach((link) => {

    link.addEventListener("click", () => {

        /*
           Phone links intentionally use
           the verified SAZIM number.
        */

    });

});


/* =========================================================
   14. PLACEHOLDER SOCIAL LINKS
========================================================= */

const placeholderLinks =
    document.querySelectorAll(
        ".placeholder-link"
    );

placeholderLinks.forEach((link) => {

    const href =
        link.getAttribute("href");

    if (href === "#") {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );

    }

});


/* =========================================================
   15. PARALLAX HERO EFFECT
========================================================= */

const heroImage =
    document.querySelector(".hero-image");


function heroParallax() {

    if (!heroImage) {
        return;
    }


    /*
       Disable parallax on smaller devices.
    */

    if (window.innerWidth <= 700) {

        heroImage.style.transform = "none";

        return;
    }


    const scrollAmount =
        window.scrollY;


    if (scrollAmount <= window.innerHeight) {

        heroImage.style.transform =
            `translateY(${scrollAmount * 0.15}px)`;

    }

}


window.addEventListener(
    "scroll",
    heroParallax,
    { passive: true }
);

heroParallax();


/* =========================================================
   16. ESC KEY — CLOSE MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            mainNav &&
            mainNav.classList.contains("open")
        ) {

            mainNav.classList.remove("open");

            document.body.classList.remove(
                "menu-open"
            );

            if (mobileMenuBtn) {

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    mobileMenuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    }
);


/* =========================================================
   17. RESIZE HANDLER
========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
           Reset mobile menu when returning
           to desktop.
        */

        if (
            window.innerWidth > 900 &&
            mainNav
        ) {

            mainNav.classList.remove("open");

            document.body.classList.remove(
                "menu-open"
            );

            if (mobileMenuBtn) {

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    mobileMenuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }


        /*
           Recalculate active navigation after
           the layout changes.
        */

        updateActiveNavigation();


        /*
           Keep hero parallax responsive.
        */

        heroParallax();

    }
);


/* =========================================================
   18. PAGE LOADED
========================================================= */

/*
   js-enabled is also set earlier before the reveal
   observer so there is no unnecessary flash of hidden
   content.
*/


/* =========================================================
   19. FINAL VISIBILITY SAFETY
========================================================= */

/*
   These sections must always become visible even if
   the observer encounters a browser/layout issue.
*/

window.addEventListener(
    "load",
    () => {

        const importantElements =
            document.querySelectorAll(
                ".hero-text, " +
                ".problem-heading, " +
                ".problem-content, " +
                ".stat-item"
            );

        importantElements.forEach((element) => {

            element.classList.add("visible");

        });

        updateActiveNavigation();

        heroParallax();

    }
);


/* =========================================================
   SAZIM TRADING & PROJECTS INITIALISED
========================================================= */