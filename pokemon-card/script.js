const card = document.getElementById("card");
const range = 100;

const calcValue = (a, b) => (a/b*range-range/2).toFixed(1)

window.addEventListener("mousemove", ({x, y}) => {

    const yValue = calcValue(y, window.innerHeight);
    const xValue = calcValue(x, window.innerWidth);

    card.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
})