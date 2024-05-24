import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

const MainListItems = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    window.location.href = (path);
  };

  return (
    <React.Fragment>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => handleListItemClick(0, '/dashboard')}
        style={{ color: selectedIndex === 0 ? 'red' : 'inherit' }}
      >
        <ListItemIcon style={{ color: selectedIndex === 0 ? 'red' : 'inherit' }}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1, '/manage-orders')}
        style={{ color: selectedIndex === 1 ? 'red' : 'inherit' }}
      >
        <ListItemIcon style={{ color: selectedIndex === 1 ? 'red' : 'inherit' }}>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Orders" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => handleListItemClick(2, '/manage-accounts')}
        style={{ color: selectedIndex === 2 ? 'red' : 'inherit' }}
      >
        <ListItemIcon style={{ color: selectedIndex === 2 ? 'red' : 'inherit' }}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Accounts" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={() => handleListItemClick(3, '/manage-categories')}
        style={{ color: selectedIndex === 3 ? 'red' : 'inherit' }}
      >
        <ListItemIcon style={{ color: selectedIndex === 3 ? 'red' : 'inherit' }}>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={() => handleListItemClick(4, '/manage-products')}
        style={{ color: selectedIndex === 4 ? 'red' : 'inherit' }}
      >
        <ListItemIcon style={{ color: selectedIndex === 4 ? 'red' : 'inherit' }}>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Products" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;
