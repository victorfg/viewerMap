const sidebarTransition = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
};

const menuItemTransition = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 150,
      opacity: 0,
      transition: {
        y: { stiffness: 1000,velocity: -100 }
      },
      zIndex:2
    }
};

const menuColorsItemTransition = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const navigationItemsTransitions = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemIds = [0];

export {
	sidebarTransition,
  navigationItemsTransitions,
  itemIds,
  menuItemTransition,
  menuColorsItemTransition
}