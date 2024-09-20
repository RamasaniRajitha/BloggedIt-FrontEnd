import { CircularProgress, Divider, Paper, Typography } from '@material-ui/core'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { getBlog } from '../../actions/blogs'
import useStyles from './styles'
import CommentsSection from './CommentsSection'

const BlogDetails = () => {

  const { blog, blogs, isLoading } = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getBlog(id))
  } , [id]);

  if (!blog) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{blog.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{blog.tags.map((tag) => `#${tag} `)}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="body1" component="p">{blog.message}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6">Created by: {blog.name}</Typography>
          <Typography variant="body1">{moment(blog.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentsSection blog={blog}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={blog.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={blog.title} />
        </div>
      </div>
    </Paper>
  )
}

export default BlogDetails
