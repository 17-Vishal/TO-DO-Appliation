import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: '"Lucida Console", "Courier New", monospace',
    color: '#191970',
  },
  image: {
    marginLeft: '10px',
    marginRight: '0px',
  },
  form: {
    float: 'center',
  },
}));
