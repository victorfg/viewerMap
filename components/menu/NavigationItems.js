import { motion } from "framer-motion";
import {navigationItemsTransitions,itemIds, menuItemTransition, menuColorsItemTransition} from '../constants'

const MenuItem = ({ i }) => {
    const style = { border: `2px solid ${menuColorsItemTransition[i]}` };
    return (
      <motion.li
        variants={menuItemTransition}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="icon-placeholder" style={style} />
        <div className="text-placeholder" style={style} />
      </motion.li>
    );
};

export function NavigationItems () {
  return (
    <motion.ul variants={navigationItemsTransitions}>
      {itemIds.map(i => (
        <MenuItem i={i} key={i} />
      ))}
    </motion.ul>
  )
};