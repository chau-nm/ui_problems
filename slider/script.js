// init banner
const bannerLinks = [
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/121a65b9-a726-4c9c-b7e2-d19967793dbf/dgfpm50-98b673b9-1204-462a-8962-ffe5ad5a0ba1.png/v1/fill/w_1280,h_427,q_80,strp/anime_banner_by_aerobtw_dgfpm50-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDI3IiwicGF0aCI6IlwvZlwvMTIxYTY1YjktYTcyNi00YzljLWI3ZTItZDE5OTY3NzkzZGJmXC9kZ2ZwbTUwLTk4YjY3M2I5LTEyMDQtNDYyYS04OTYyLWZmZTVhZDVhMGJhMS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.9lNuKt9wzA98cNOJnUXWWtzfDaFqVMGkUfuIeEc6wSg",
  "https://preview.redd.it/made-this-anime-banner-in-pixlr-v0-eni9yujjzvxa1.jpg?auto=webp&s=8b871c713fdb41aaf0c08702857ba0e8464534cf",
  "https://i.pinimg.com/originals/41/fe/86/41fe86db04e5fc00c896d92bddfe99e1.jpg"
];

const createImage = (url) => {
  const image = document.createElement("img");
  image.classList.add("sliderItem")
  image.src = url;
  return image;
}

const directButton = () => {
  const button = document.createElement("div");
  button.classList.add("direct");
  return button;
}

const banners = bannerLinks.map(url => createImage(url));
const directButtons = bannerLinks.map(() => directButton());

const slider = document.getElementById("slider");
banners.forEach(banner => slider.appendChild(banner));
const directs = document.getElementById("directs");
directButtons.forEach(direct => directs.appendChild(direct));

// handle
const WIDTH = 800;

let activeIndex = 0;
directButtons[activeIndex].classList.add("active");
const translateBanner = (index) => {
  slider.style.transform = `translateX(${WIDTH * index * - 1}px)`;
  directButtons.forEach((btn) => btn.classList.remove("active"));
  directButtons[index].classList.add("active");
}

// direct button
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

prevBtn.addEventListener("click", () => {
  if (activeIndex === 0) activeIndex = banners.length - 1;
  else activeIndex--;
  translateBanner(activeIndex);
});

nextBtn.addEventListener("click", () => {
  if (activeIndex >= banners.length - 1) activeIndex = 0;
  else activeIndex++;
  translateBanner(activeIndex);
});

// drag
banners.forEach(banner => {
  let startPoint = 0;
  let endPoint = 0;

  const handleMouseDown = (e) => {
    startPoint = e.pageX;
  }

  const handleMouseMove = (e) => {
    const translateValue = e.pageX - startPoint;
    if (Math.abs(translateValue) > WIDTH * banners.length) return;
    slider.style.transform = `translateX(${translateValue}px)`;
  }

  const handleMouseUp = (e) => {
    endPoint = e.pageX;
    const translateValue = endPoint - startPoint;
    if (Math.abs(translateValue) >= WIDTH / 4) {
      activeIndex += (translateValue > 0) 
      ? activeIndex <= 0 ? 0 : -1
      : activeIndex >= banners.length - 1 ? 0 : 1;
      translateBanner(activeIndex);
    } else {
      translateBanner(activeIndex);
    }
  }

  banner.addEventListener("dragstart", handleMouseDown);
  banner.addEventListener("dragover", handleMouseMove);
  banner.addEventListener("dragleave", handleMouseUp)
});

// direct
directButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    activeIndex = index;
    translateBanner(activeIndex);
  });
});

// auto scroll
setInterval(() => {
  if (activeIndex >= banners.length - 1) {
    activeIndex = 0;
  } else {
    activeIndex++;
  }
  translateBanner(activeIndex);
}, 4000)
