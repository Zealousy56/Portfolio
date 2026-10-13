const paragraphs = document.querySelectorAll(".about-text p");

paragraphs.forEach(paragraph => {
    const text = paragraph.textContent.trim();

    paragraph.innerHTML = text
        .split(/\s+/)
        .map(word => `<span class="word">${word} </span>`)
        .join("");
});

const about = document.querySelector("#about");

function getScrollProgress() {
    const rect = about.getBoundingClientRect();

    const scrollDistance = about.offsetHeight - window.innerHeight;

    return Math.max(
        0,
        Math.min(1, -rect.top / scrollDistance)
    );
}

const heading = document.querySelector("#about h2");

function animateHeading(progress) {
    const headingProgress = Math.min(1, progress / 0.3);

    const fontSize = 80 - (50 * headingProgress);
    const left = 50 - (45 * headingProgress);
    const top = 40 - (30 * headingProgress);

    heading.style.fontSize = `${fontSize}px`;
    heading.style.left = `${left}%`;
    heading.style.top = `${top}%`;
    heading.style.transform =
        `translateX(${-50 * (1 - headingProgress)}%)`;
}

function animateWords(progress) {
    paragraphs.forEach((paragraph, paragraphIndex) => {
        const words = paragraph.querySelectorAll(".word");

        const textContainer = document.querySelector(".about-text");

        textContainer.style.opacity = progress >= 0.3 ? 1 : 0;

        const start = paragraphIndex === 0 ? 0.25 : 0.5;
        const end = paragraphIndex === 0 ? 0.5 : 0.75;

        const paragraphProgress = Math.max(
            0,
            Math.min(1, (progress - start) / (end - start))
        );

        words.forEach((word, index) => {
            const wordProgress = Math.max(
                0,
                Math.min(1, paragraphProgress * (words.length + 3) - index)
            );

            word.style.opacity = 0 + wordProgress * 1;
        });
    });
}

let ticking = false;

function updateAnimations() {
    const progress = getScrollProgress();

    animateHeading(progress);
    animateWords(progress);

    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}, { passive: true });

updateAnimations();

const skillsTrack = document.querySelector(".skills-track");
const nextButton = document.querySelector(".skills-next");
const skillsCards = document.querySelectorAll(".skills-card");

nextButton.addEventListener("click", () => {
    const currentIndex = Math.round(
        skillsTrack.scrollLeft / skillsTrack.clientWidth
    );

    const nextIndex = (currentIndex + 1) % skillsCards.length;

    skillsCards[nextIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
    });
});

const projectList = document.querySelector(".projects-list");
const nextProject = document.querySelector(".project-next");
const projectCards = document.querySelectorAll(".project-card");

nextProject.addEventListener("click", () => {
    const currentIndex = Math.round(
        projectList.scrollLeft / projectList.clientWidth
    );

    const nextIndex = (currentIndex + 1) % projectCards.length;

    projectCards[nextIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
    });
});