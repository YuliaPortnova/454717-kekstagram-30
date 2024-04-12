const ranges = {
  none: [0, 100, 1],
  chrome: [0, 1, .1],
  sepia: [0, 1, .1],
  marvin: [0, 100, 1],
  phobos: [0, 3, .1],
  heat: [1, 3, .1],
};

const formatters = {
  none: () => '',
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`,
};

const createOptions = (type) => {
  const [min, max, step] = ranges[type];
  return {
    range: {min, max},
    start: max,
    step,
    format: {from: String, to: formatters[type]},
    connect: 'lower',
    behaviour: 'snap smooth-steps'
  };
};

const container = document.querySelector('.img-upload__effect-level');
const level = document.querySelector('.effect-level__value');
const placeholder = document.querySelector('.effect-level__slider');
const slider = noUiSlider.create(placeholder, createOptions('none'));

const setEffect = (type) => {
  container.classList.toggle('hidden', type === 'none');
  slider.updateOptions(createOptions(type));
};

const getEffectValue = () => slider.get();
const resetEffect = () => setEffect('none');

slider.on('update', () => {
  level.value = slider.get(true);
  level.dispatchEvent(new Event('change', {bubbles: true}));
});

export {setEffect, getEffectValue, resetEffect};
