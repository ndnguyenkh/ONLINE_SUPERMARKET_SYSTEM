
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginIcon from '@mui/icons-material/Login';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const SecondaryListItems = () => {

  const role = JSON.parse(localStorage.getItem('role'));

  const handleListItemClick = (path) => {
    window.location.href = (path);
  };

  // Hàm xóa mảng vào localStorage 2
  const removeAccountFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };  

  const handleLogout = () => {
    removeAccountFromLocalStorage("logged");
    removeAccountFromLocalStorage("user");
    removeAccountFromLocalStorage("jwt");
    removeAccountFromLocalStorage("role");
    alert(
      "done!"
    );
  }

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>

      {role === 'ADMIN' ? (
        <>
        <ListItemButton>
        <ListItemIcon>
          <Inventory2Icon />
        </ListItemIcon>
        <ListItemText primary="Manage Stock" onClick={() => handleListItemClick('/manage-stock')} />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Promotion" onClick={() => handleListItemClick('/manage-promotion')} />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Schedule" onClick={() => handleListItemClick("/manage-schedule")} />
      </ListItemButton>
      </>
      ) : (
        <>
        </>
      )}

      
      <ListItemButton>
        <ListItemIcon>
          <LoginIcon sx={{color: 'red'}} />
        </ListItemIcon>
        <ListItemText primary="Logout" onClick={() => {
          handleLogout();
          handleListItemClick("/loginn");
        }} />
      </ListItemButton>
    </React.Fragment>
  );
}

export default SecondaryListItems;