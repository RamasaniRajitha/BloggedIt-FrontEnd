import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getBlogs } from "../../actions/blogs";

import useStyles from "./styles";

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.blogs);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    // const handlePageChange = (event, value) => {
    //     setPage(value);
    //     window.scroll(0, 0);
    // };

    useEffect(() => {
        if (page) {
            dispatch(getBlogs(page));
        }
    }, [page]);
    
    return (
        <Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page || 1)}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/blogs?page=${item.page}`}/>
        )}
        />
    );
};

export default Paginate;