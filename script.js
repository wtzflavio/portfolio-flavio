/* ==========================================================================
   FLAVIO FURIGO RAMALHO — PORTFÓLIO
   script.js
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================================
       1. ELEMENTOS PRINCIPAIS
       ====================================================================== */

    const header = document.getElementById("header");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menu-toggle");
    const backToTop = document.getElementById("back-to-top");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    const terminal = document.querySelector(".terminal");
    const typingText = document.getElementById("typing-text");


    /* ======================================================================
       2. HEADER AO ROLAR A PÁGINA
       ====================================================================== */

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* ======================================================================
       3. MENU MOBILE
       ====================================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navbar.classList.toggle("active");

            const menuOpen = navbar.classList.contains("active");

            document.body.style.overflow = menuOpen
                ? "hidden"
                : "";

        });

    }


    /* ======================================================================
       4. FECHAR MENU AO CLICAR EM UM LINK
       ====================================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (!navbar || !menuToggle) return;

            navbar.classList.remove("active");
            menuToggle.classList.remove("active");

            document.body.style.overflow = "";

        });

    });


    /* ======================================================================
       5. FECHAR MENU COM ESC
       ====================================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        if (!navbar || !menuToggle) return;

        navbar.classList.remove("active");
        menuToggle.classList.remove("active");

        document.body.style.overflow = "";

    });


    /* ======================================================================
       6. LINK ATIVO DA NAVBAR
       ====================================================================== */

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection} `) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* ======================================================================
       7. BOTÃO VOLTAR AO TOPO
       ====================================================================== */

    const handleBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    };

    window.addEventListener(
        "scroll",
        handleBackToTop
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ======================================================================
   8. CURSOR PERSONALIZADO
   ====================================================================== */

    if (cursorDot && cursorOutline) {

        let mouseX = -100;
        let mouseY = -100;

        let outlineX = -100;
        let outlineY = -100;

        // Movimento do mouse
        window.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            // Bolinha pequena acompanha instantaneamente
            cursorDot.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            cursorDot.style.opacity = "1";
            cursorOutline.style.opacity = "1";

        });


        // Círculo maior acompanha suavemente
        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.18;
            outlineY += (mouseY - outlineY) * 0.18;

            cursorOutline.style.transform =
                `translate3d(${outlineX}px, ${outlineY}px, 0)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        // Aumenta quando passa em algo clicável
        const hoverElements = document.querySelectorAll(
            "a, button, .project-card, .tech-card, .info-item"
        );

        hoverElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("hover");
            });

        });


        // Esconde quando mouse sai da janela
        document.addEventListener("mouseleave", () => {
            cursorDot.style.opacity = "0";
            cursorOutline.style.opacity = "0";
        });

        document.addEventListener("mouseenter", () => {
            cursorDot.style.opacity = "1";
            cursorOutline.style.opacity = "1";
        });
    }


    /* ======================================================================
       9. EFEITO DE DIGITAÇÃO
       ====================================================================== */

    const roles = [
        "Full Stack Developer",
        "Web Developer",
        "Mobile Developer",
        "Software Developer"
    ];


    let roleIndex = 0;
    let characterIndex = 0;

    let deleting = false;


    const typingSpeed = 80;
    const deletingSpeed = 45;

    const pauseAfterTyping = 1700;
    const pauseAfterDeleting = 450;


    const typeRole = () => {

        if (!typingText) return;


        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            characterIndex++;

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex ===
                currentRole.length
            ) {

                deleting = true;

                setTimeout(
                    typeRole,
                    pauseAfterTyping
                );

                return;

            }


            setTimeout(
                typeRole,
                typingSpeed
            );

        } else {

            characterIndex--;

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );


            if (characterIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;


                setTimeout(
                    typeRole,
                    pauseAfterDeleting
                );

                return;

            }


            setTimeout(
                typeRole,
                deletingSpeed
            );

        }

    };


    if (typingText) {

        typingText.textContent = "";

        setTimeout(
            typeRole,
            700
        );

    }


    /* ======================================================================
       10. ELEMENTOS COM ANIMAÇÃO DE ENTRADA
       ====================================================================== */

    const revealElements = [
        ...document.querySelectorAll(
            ".section-heading"
        ),

        ...document.querySelectorAll(
            ".section-description"
        ),

        ...document.querySelectorAll(
            ".about-content"
        ),

        ...document.querySelectorAll(
            ".about-code"
        ),

        ...document.querySelectorAll(
            ".project-card"
        ),

        ...document.querySelectorAll(
            ".tech-card"
        ),

        ...document.querySelectorAll(
            ".timeline-item"
        ),

        ...document.querySelectorAll(
            ".contact-container"
        )
    ];


    revealElements.forEach(
        (element) => {

            element.classList.add(
                "reveal"
            );

        }
    );


    /* ======================================================================
       11. INTERSECTION OBSERVER
       ====================================================================== */

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


    /* ======================================================================
       12. DELAY NOS CARDS DE PROJETOS
       ====================================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 80} ms`;

        }
    );


    /* ======================================================================
       13. DELAY NOS CARDS DE TECNOLOGIAS
       ====================================================================== */

    const techCards =
        document.querySelectorAll(
            ".tech-card"
        );


    techCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 45} ms`;

        }
    );


    /* ======================================================================
       14. EFEITO 3D NO TERMINAL
       ====================================================================== */

    const canUseTerminalEffect =
        window.matchMedia(
            "(min-width: 801px)"
        ).matches;


    if (
        terminal &&
        canUseTerminalEffect &&
        !isTouchDevice
    ) {

        terminal.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    terminal.getBoundingClientRect();


                const mouseX =
                    event.clientX -
                    rect.left;


                const mouseY =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    -(
                        mouseY -
                        centerY
                    ) / 35;


                const rotateY =
                    (
                        mouseX -
                        centerX
                    ) / 35;


                terminal.style.transform =
                    `
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-5px)
    `;

            }
        );


        terminal.addEventListener(
            "mouseleave",
            () => {

                terminal.style.transform =
                    `
perspective(1000px)
rotateX(2deg)
rotateY(-3deg)
    `;

            }
        );

    }


    /* ======================================================================
       15. PARALLAX SUAVE NO BACKGROUND
       ====================================================================== */

    const glow1 =
        document.querySelector(
            ".glow-1"
        );


    const glow2 =
        document.querySelector(
            ".glow-2"
        );


    if (!isTouchDevice) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    event.clientX /
                    window.innerWidth;


                const y =
                    event.clientY /
                    window.innerHeight;


                if (glow1) {

                    glow1.style.transform =
                        `
translate(
    ${x * 30}px,
    ${y * 30}px
)
    `;

                }


                if (glow2) {

                    glow2.style.transform =
                        `
translate(
    ${x * - 25}px,
    ${y * - 25}px
)
                        `;

                }

            }
        );

    }


    /* ======================================================================
       16. EFEITO DE LUZ NOS CARDS DOS PROJETOS
       ====================================================================== */

    projectCards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    if (isTouchDevice) return;


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x} px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y} px`
                    );

                }
            );

        }
    );


    /* ======================================================================
       17. SCROLL SUAVE PARA LINKS INTERNOS
       ====================================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    const headerOffset =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerOffset;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        }
    );


    /* ======================================================================
       18. EFEITO NO TÍTULO DA ABA
       ====================================================================== */

    const originalTitle =
        document.title;


    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "hidden"
            ) {

                document.title =
                    "Volta aí 👀 | Flavio";

            } else {

                document.title =
                    originalTitle;

            }

        }
    );


    /* ======================================================================
       19. LOG NO CONSOLE
       ====================================================================== */

    console.log(
        "%c<FFR />",
        `
color: #008cff;
font - size: 26px;
font - weight: bold;
`
    );


    console.log(
        "%cFlavio Furigo Ramalho — Full Stack Developer",
        `
color: #ffffff;
font - size: 13px;
`
    );


    console.log(
        "%cPortfolio carregado com sucesso.",
        `
color: #4ade80;
font - size: 11px;
`
    );

});
