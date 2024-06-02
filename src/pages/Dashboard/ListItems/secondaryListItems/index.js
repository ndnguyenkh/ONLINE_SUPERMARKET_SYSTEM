
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SecondaryListItems = () => {

  const handleListItemClick = (path) => {
    window.location.href = (path);
  };

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Stock" onClick={() => handleListItemClick('/manage-stock')} />
      </ListItemButton>
      {/* <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" onClick={() => handleListItemClick('/dashboard')} />
      </ListItemButton> */}
      {/* <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton> */}
    </React.Fragment>
  );
}

export default SecondaryListItems;