const counter = document.querySelectorAll(".count");

counter.forEach(counter => {
    const target = Number(counter.innerText);

    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        current = Math.floor(progress * target);
        counter.innerText = current;

        if(progress < 1) {
            requestAnimationFrame(update)
        } else {
            counter.innerText = target;
        }
    }

    requestAnimationFrame(update);
})