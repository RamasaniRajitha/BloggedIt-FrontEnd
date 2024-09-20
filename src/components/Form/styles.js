
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  backArrow: {
    cursor: 'pointer',
    // marginBottom: theme.spacing(1), 
    fontSize: '2rem', 
  },
  fileInput: {
    width: '97%',
    margin: '10px ',
  },
  helptext: {
    marginBottom: theme.spacing(2),
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));