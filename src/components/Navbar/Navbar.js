import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {Avatar, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import useStyles from './styles';
import blogged from '../../images/img.png';
import text from '../../images/logo.png';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); 

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = jwt_decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/auth');
    setUser(null);
  };
  const handleSearchIconClick = () => {
    history.push('/blogs/search');
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img className={classes.image} src={text} alt="BloggedIt" height="60px" />
          <img className={classes.image} src={blogged} alt="BloggedIt" height="50px" />
        </Link>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Tooltip title="Search">
                  <IconButton onClick={handleSearchIconClick}>
                      <SearchIcon />
                  </IconButton>
                </Tooltip>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <div className={classes.profile}>
                <Tooltip title="Search">
                  <IconButton onClick={handleSearchIconClick}>
                      <SearchIcon />
                  </IconButton>
                </Tooltip>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                </div>
            )}
        </Toolbar>

    </AppBar>
  )
}

export default Navbar
