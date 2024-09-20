import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { likeBlog, deleteBlog } from '../../../actions/blogs';
import useStyles from './styles';

const Blog = ({ blog, setCurrentId ,setDisplayForm}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(blog?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedBlog = blog?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likeBlog(blog._id));

    if (hasLikedBlog) {
      setLikes(blog.likes.filter((id) => id !== userId));
    } else {
      setLikes([...blog.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openBlog = (e) => {
    // dispatch(getBlog(blog._id, history));

    history.push(`/blogs/${blog._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openBlog}
      >
        <CardMedia className={classes.media} image={blog.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={blog.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{blog.name}</Typography>
          <Typography variant="body2">{moment(blog.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?._id === blog?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(blog._id);
              setDisplayForm(true);
            }}
            style={{ color: 'white', paddingLeft: '100px'}}
            size="small"
          >
          <EditIcon fontSize='small'/>
          </Button>
        </div>
        )}
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{blog.title}</Typography>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{blog.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{blog.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === blog?.creator || user?.result?._id === blog?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deleteBlog(blog._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Blog;