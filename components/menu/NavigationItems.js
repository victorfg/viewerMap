import { motion } from "framer-motion";
import {navigationItemsTransitions,itemIds, menuItemTransition, menuColorsItemTransition} from '../constants'
import  MenuComponent  from "../../components/map/Menu/MenuComponent";
const MenuItem = (props,{ i }) => {
    const style = { border: `2px solid ${menuColorsItemTransition[i]}` };
    return (
      <motion.div
        variants={menuItemTransition}
        //whileHover={{ scale: 1.1 }}
        //whileTap={{ scale: 0.95 }}
      >
        <MenuComponent {...props}/>
      </motion.div>
    );
};

export function NavigationItems (props) {
  return (
    <motion.div
      className="flex justify-center mt-20 items-center" 
      variants={navigationItemsTransitions}
    >
      {itemIds.map(i => (
        <MenuItem i={i} key={i} {...props} />
      ))}
    </motion.div>
  )
};