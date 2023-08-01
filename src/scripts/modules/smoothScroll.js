export function smoothScroll(targetY, duration) {
    const startingY = window.pageYOffset;
    const startTime = performance.now();

    function step(timestamp) {
        const timeElapsed = timestamp - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeOutQuart(progress);
        const distance = startingY + (targetY - startingY) * ease;
        window.scrollTo(0, distance);

        if (timeElapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    requestAnimationFrame(step);
}
