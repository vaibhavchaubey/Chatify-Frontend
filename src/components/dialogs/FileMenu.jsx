import { Menu, MenuItem } from '@mui/material';
import React from 'react';

const FileMenu = ({ anchorEl }) => {
  return (
    <Menu anchorEl={anchorEl} open={false}>
      <div style={{
        width: '10rem',
    }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
        dolores ducimus consequuntur neque quaerat amet, fugiat rem nostrum,
      </div>
    </Menu>
  );
};

export default FileMenu;
