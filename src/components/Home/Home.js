import React, {useState} from 'react';
import {Container, Grow, Grid, Paper, Button} from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import Blogs from '../Blogs/Blogs';
import Form from '../Form/Form';
import useStyles from './styles';
import Pagination from '../Pagination/Pagination';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);

    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const handleAddBlogClick = () => {
        setDisplayForm(true);
    };
    

    return (
        <div data-testid="home-1">
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Blogs setCurrentId={setCurrentId} setDisplayForm={setDisplayForm}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    {!displayForm && (
                        <Paper elevation={6} className={classes.addButtonContainer}>
                            <Button variant="contained" color="primary" className={classes.addButton} onClick={handleAddBlogClick}>
                            Add Blog
                            </Button>
                        </Paper>
                    )}
                    {displayForm && (
                        <Paper elevation={6} className={classes.formContainer}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} setDisplayForm={setDisplayForm} />
                        </Paper>
                    )}
                
                    {(!searchQuery && !tags.length) && (
                        <Paper elevation={6} className={classes.pagination}>
                            <Pagination page={page}/>
                        </Paper>
                    )}
                </Grid>
                </Grid>
            </Container>
        </Grow>
        </div>
    )
}

export default Home
