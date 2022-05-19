import React from 'react'
import { useParams } from "react-router-dom";
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import { Collapse } from '@mui/material';

function Category() {
  const { categoryId } = useParams();
    
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
    <ItemListContainer categoryId={categoryId} errorHandler={errorHandler}/>
   </div>
  )
}

export default Category