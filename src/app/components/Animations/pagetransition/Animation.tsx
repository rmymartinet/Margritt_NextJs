import { Power1, Power2, Power3 } from "gsap";

export const childrenAnimation = {
  initial: {
    y: 500,
  },
  animate: {
    y: 0,
    transition: {
      ease: Power2.easeInOut,
      duration: 0.8,
    },
  },
  exit: {
    y: 500,
    transition: {
      ease: Power1.easeInOut,
      duration: 1,
    },
  },
};

export const slideOutAnimation = {
  initial: {
    scaleX: 1, // L'élément est visible
  },
  animate: {
    scaleX: 1, // L'élément reste visible
  },
  exit: {
    scaleX: 0, // L'élément disparaît en se déplaçant à gauche
    transition: {
      duration: 0.8,
      ease: Power3.easeInOut,
    },
  },
};

export const slideInAnimation = {
  initial: {
    scaleX: 0, // L'élément est hors de l'écran
  },
  animate: {
    scaleX: 1, // L'élément arrive en se déplaçant à droite
    transition: {
      duration: 0.8,
      ease: Power3.easeInOut,
    },
  },
  exit: {
    scaleX: 1, // L'élément reste visible jusqu'à quitter
  },
};

export const animateSlideImg = {
  initial: {
    y: 1,
  },
  animate: {
    y: 1,
  },
  exit: {
    y: 1,
    transition: {
      delay: 0,
      duration: 2,
      ease: Power1.easeOut,
    },
  },
};
