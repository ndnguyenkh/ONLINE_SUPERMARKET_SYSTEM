import * as React from 'react';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

// files


const MainListItems = () => {

  const role = JSON.parse(localStorage.getItem('role'));

  const handleListItemClick = (path) => {
    window.location.href = (path);
  };

  return (
    <React.Fragment>

      {role === 'WAREHOUSE_STAFFS' ? (
        <>
          <ListItemButton
          onClick={() => handleListItemClick('/manage-categories')}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Categories" />
        </ListItemButton>

        <ListItemButton
          onClick={() => handleListItemClick('/manage-products')}
        >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Products" />
      </ListItemButton>

      <ListItemButton
          onClick={() => handleListItemClick('/seen-schedule')}
        >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItemButton>
        </>
      ) : (
        <></>
       )}

      {role === 'SELLER' ? (
        <>
          <ListItemButton
        onClick={() => handleListItemClick('/manage-orders')}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Orders" />
      </ListItemButton>

      <ListItemButton
          onClick={() => handleListItemClick('/seen-schedule')}
        >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItemButton>
        </>
      ) : (
        <></>
      )}

      {role === 'ADMIN' ? (
        <>
        <ListItemButton      
        onClick={() => handleListItemClick('/dashboard')}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleListItemClick('/manage-orders')}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Orders" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleListItemClick('/manage-accounts')}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Users" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleListItemClick('/manage-categories')}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleListItemClick('/manage-products')}
      >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Products" />
      </ListItemButton>

      <ListItemButton
        onClick={() => handleListItemClick('/manage-providers')}
      >
        <ListItemIcon>
          <DynamicFeedIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Suppliers" />
      </ListItemButton>

      <ListItemButton
          onClick={() => handleListItemClick('/seen-schedule')}
        >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItemButton>
        </>
      ) : (
        <></>
      )}
      

    </React.Fragment>
  );
};

export default MainListItems;
