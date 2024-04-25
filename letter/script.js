const letter = document.getElementById("letter");
const content = document.querySelector(".content");

letter.addEventListener("click", () => {
  letter.classList.add("open");
  content.classList.add("active");
});

document.onkeydown = (e) => {
  if (e.key === "Escape") {
    letter.classList.remove("open");
    content.classList.remove("active");
  }
}
