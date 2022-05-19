import React from 'react'
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import { Collapse } from '@mui/material';
import ItemDetailContainer from '../../components/ItemDetailContainer/ItemDetailContainer';

function Item() {
  const { id } = useParams();
    
  const [error, setError] = React.useState();
  const [open, setOpen] = React.useState(false);
  const errorHandler = (err) => {
    if (err) {
      setError(err);
      setOpen(true);
    }
  }

  return (
    <div className="category">
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
    <ItemDetailContainer itemId={id} errorHandler={errorHandler}/>
   </div>
  )
}

export default Item