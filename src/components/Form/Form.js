import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper ,FormHelperText} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createBlog, updateBlog } from '../../actions/blogs';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId , setDisplayForm}) => {
  const [blogData, setBlogData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const blog = useSelector((state) => (currentId ? state.blogs.blogs.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const clear = () => {
    setCurrentId(0);
    setBlogData({ title: '', message: '', tags: [], selectedFile: '' });
    setSubmitEnabled(false);
  };
  
  const goBack= () => {
    setDisplayForm(false);
    clear();
  }

  useEffect(() => {
    if (!blog?.title) clear();
    if (blog) setBlogData(blog);
  }, [blog]);

  useEffect(() => {
    setSubmitEnabled(blogData.title.trim() !== '' && blogData.message.trim() !== '');
  }, [blogData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if (!submitEnabled) return;
    if (currentId === 0) {
      setDisplayForm(false)
      dispatch(createBlog({ ...blogData, name: user?.result?.name }, history));
      clear();
    } else {
      setDisplayForm(false)
      dispatch(updateBlog(currentId, { ...blogData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own blogs and like other's blogs.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setBlogData({ ...blogData, tags: [...blogData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setBlogData({ ...blogData, tags: blogData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.backArrow} onClick={() => goBack()}>
        &larr; 
      </div>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${blog?.title}"` : 'Create a Blog'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={blogData.message} onChange={(e) => setBlogData({ ...blogData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={blogData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
          <FormHelperText className={classes.helptext}>Press Enter after entering your tag</FormHelperText>
        </div>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setBlogData({ ...blogData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth disabled={!submitEnabled}>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;