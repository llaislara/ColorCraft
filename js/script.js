let vm = new Vue({
  el: 'section',
  mixins: [vueMixinColorFunctions],
  data() {
    return {
      min: 3,
      max: 50,
      delta: 10,
      steps: 15,
      color1: '#f86c2a',
      color2: '#622d86',
    };
  },
  computed: {
    colors() {
      return this.interpolateColors(this.color1, this.color2, this.steps);
    },
    visualSteps() {
      return this.steps - 2;
    },
    visualStepsLabel() {
      return this.visualSteps === 1 ? 'color' : 'colors';
    },
  },
  methods: {
    adjust(color) {
      const hex = this.rgbToHex(color[0], color[1], color[2]);
      return this.foregroundAdjust(hex);
    },
    setStyles(color) {
      return `background: rgb(${color}); color: ${this.adjust(color)}`;
    },
    colorName(color) {
      return this.rgbArrayToHex(color);
    },
  },
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  updateColors();
  updateIcon();
});

function updateColors() {
  if (body.classList.contains('dark-mode')) {
    root.style.setProperty('--fg', '#f5f5f5');
    root.style.setProperty('--bg', '#2E2D2D');
    root.style.setProperty('--icon', '#f5f5f5');
  } else {
    root.style.setProperty('--fg', '#b9b9b9');
    root.style.setProperty('--bg', '#f5f5f5');
    root.style.setProperty('--icon', '#f5f5f5');
  }
}

function updateIcon() {
  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('bi-moon-stars-fill');
    themeIcon.classList.add('bi-brightness-high-fill');
  } else {
    themeIcon.classList.remove('bi-brightness-high-fill');
    themeIcon.classList.add('bi-moon-stars-fill');
  }
}

updateColors();
updateIcon();

