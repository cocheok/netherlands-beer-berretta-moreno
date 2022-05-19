import React from 'react'
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import { Collapse } from '@mui/material';

function Home() {
  
  const [error, setError] = React.useState();
  const [open, setOpen] = React.useState(false);
  const errorHandler = (err) => {
    if (err) {
      setError(err);
      setOpen(true);
    }
  }

  return (
    <div className="home">
       <Collapse in={open}><Alert severity="error"action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>{error}</Alert>
      </Collapse>
      <ItemListContainer errorHandler={errorHandler}/>
    </div>
    

  )
}

export default Home