let stepActive = 0;

const steps = document.getElementsByClassName("step");
const process = document.getElementById("process");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const renderStep = () => {
  for (let step of steps) {
    step.classList.remove("active");
  }
  for (let i = 0; i <= stepActive; i++) {
    steps[i].classList.add("active");
  }
}

const renderProcess = () => {
  const activeStep = steps[stepActive];
  const wrapper = document.getElementsByClassName("wrapper")[0];
  const activeStepLeft = activeStep.getBoundingClientRect().left;
  const wrapperLeft = wrapper.getBoundingClientRect().left;
  const processWidth = activeStepLeft - wrapperLeft;
  process.style.width = `${processWidth}px`;
}

const setStepActive = (isCremented) => {
  stepActive+=isCremented ? 1 : -1;
  if (stepActive <= 0) {
    prevButton.setAttribute("disabled", true);
  } else {
    prevButton.removeAttribute("disabled");
  }
  if (stepActive >= steps.length - 1) {
    nextButton.setAttribute("disabled", true);
  } else {
    nextButton.removeAttribute("disabled");
  }
}

prevButton.onclick = () => {
  setStepActive(false);
  renderStep();
  renderProcess();
};

nextButton.onclick = () => {
  setStepActive(true);
  renderStep();
  renderProcess();
}