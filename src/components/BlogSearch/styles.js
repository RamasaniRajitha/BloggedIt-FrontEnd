import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 20,
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    
  },
  
  container: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },
  tag: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '90%',
    maxWidth: 400, 
  },
  searchtext: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    width: '90%',
    maxWidth: 400, 
  },
  helptext: {
    marginBottom: theme.spacing(2),
  },
  blogsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
}));