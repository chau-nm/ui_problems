const hash = window.location.hash;
const sliderWrapper = document.getElementById("slider-wrapper");
const slider = document.getElementById('slider');
const sliderItemList = document.getElementsByClassName("slider-item");
let currentIndex = 0;

const changeSlider = (sliderItemList, index) => {
  for (let sliderItem of sliderItemList) {
    sliderItem.classList.remove('active');
  };
  sliderItemList[index].classList.add('active');
  slider.style.transform= `translateY(${-1 * index * 100}vh)`;
  window.location.hash = `#${sliderItemList[index].getAttribute('data-hash')}`;
  currentIndex = index;
}

Array.from(sliderItemList).forEach((sliderItem, index) => {
  const itemHash = sliderItem.getAttribute('data-hash');
  if (hash.endsWith(itemHash)) {
    changeSlider(sliderItemList, index);
  }
});

// drag
let startPointer = 0;
sliderWrapper.addEventListener('pointerdown', (event) => {
  startPointer = event.pageY;
});
sliderWrapper.addEventListener('pointerup', (event) => {
  let dragDistance = event.pageY - startPointer;
  if (dragDistance > 0 && currentIndex > 0) {
    changeSlider(sliderItemList, --currentIndex);
  }
  if (dragDistance < 0 && currentIndex < sliderItemList.length) {
    changeSlider(sliderItemList, ++currentIndex);
  }
  startPointer = 0;
});