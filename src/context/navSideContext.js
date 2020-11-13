import React, {useState, createContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const NavSideContext = createContext();
 
const useStylesCat = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
  });

const NavSideContextProvider = (props) => {
    const classesCat = useStylesCat();

    const [Navstate, setNavState] = useState({top: false,left: false,bottom: false,right: false,});
   
    const toggleDrawer = (anchor, open) => (event) => {
    
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
   
        setNavState({ ...Navstate, [anchor]: open });
      };  

    return(
        <NavSideContext.Provider value={{Navstate, classesCat, setNavState, toggleDrawer}}>
            {props.children}
        </NavSideContext.Provider>
    )
}

export default NavSideContextProvider;