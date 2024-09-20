import { AppBar, Button, FormHelperText, Grid, TextField, Typography } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getBlogBySearch } from '../../actions/blogs';
import Blogs from '../Blogs/Blogs';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BlogSearch = () => {
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  

  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const searchQuery = query.get('searchQuery');
  const [bp, setbp] = useState(false);

  const searchBlogs = () => {
    setbp(true)
    if (search.trim() || tags.length > 0) {
      dispatch(getBlogBySearch({ search, tags: tags.join(',') }));
      history.push(`/blogs/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };


  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <div className= {classes.container}>
      <div className= {classes.searchcontainer}>
        <AppBar className={classes.appBarSearch} position="static" color="inherit">
        <Typography variant="h5"> Dive into a world of informative and engaging blogs.</Typography>
          <TextField
            className={classes.searchtext}
            name="search"
            variant="outlined"
            label="Search Blogs"
            fullWidth
            value={search}
            id="search-input"
            // onKeyPress={(e) => { handleKeyPress(e) }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <ChipInput
            className={classes.tag}
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            label="Search Tags"
            variant="outlined"
          />
          <FormHelperText className={classes.helptext}>Press Enter after entering your tag</FormHelperText>
          <Button onClick={searchBlogs} className={classes.searchButton} variant="contained" color="primary">Search</Button>
        </AppBar>
      </div>
      <div className= {classes.Blogscontainer}>
      {(bp &&
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={9}>
            <Blogs setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
      )}
      </div>
    </div>
  );
};

export default BlogSearch;
