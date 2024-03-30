import React from 'react';

/* AppLayout is not a typical component. It's a higher-order component (HOC). */
/* A higher-order component (HOC) is a function that takes a component and returns a new component with enhanced functionality.  */
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <div>Header</div>
        <WrappedComponent {...props} />
        <div>Footer</div>
      </div>
    );
  };
};

export default AppLayout;
