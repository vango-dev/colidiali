import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
// hooks
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------
const initialState = {
  collapseClick: false,
};

const CollapseDrawerContext = createContext(initialState);

// ----------------------------------------------------------------------

CollapseDrawerProvider.propTypes = {
  children: PropTypes.node,
};

function CollapseDrawerProvider({ children }) {
  const isDesktop = useResponsive('up', 'lg');

  const [collapse, setCollapse] = useState({ click: false, hover: false });

  useEffect(() => {
    // if (!isDesktop) {
    setCollapse({ click: true, hover: false });
  }, [isDesktop]);

  const handleToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click });
  };

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHOver: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave,
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerContext, CollapseDrawerProvider };
