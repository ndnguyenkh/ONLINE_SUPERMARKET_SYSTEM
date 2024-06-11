
// icon 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // heart icon 
import SearchIcon from '@mui/icons-material/Search'; // search icon
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'; // cart icon
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'; // person icon

const ContentHeader = {
    contentLogo: 'ONMART',

    

    // actions
    actions: [
        {icon: <FavoriteBorderIcon />, href: '#'}, // 0
        {icon: <SearchIcon />, href: '/search'}, // 1
        {icon: <ShoppingBagOutlinedIcon />, href: '#'}, // 2
    ],
    contentButtonAccount: 'account',
    contentButtonAccountIcon: <PersonOutlineOutlinedIcon />,

    // navigation
    navbar: [
        // { title: 'Sale Off', link: '#' },
        // { title: 'Best Sellers', link: '#' },
        // { title: 'About Us', link: '#' },
    ],
};

export default ContentHeader;