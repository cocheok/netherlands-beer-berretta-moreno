import React, { useState }  from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export const ItemCount = ({itemId, stock, initial, onAdd}) => {
  const [count, setCount] = useState(initial);
  const handleItemCount = (action) => {
    if(action==='add'){
      if(stock > count ){
        setCount(count+1)
      }
    } else if (action==='remove') {
      if(count > 0 ){
        setCount(count-1)
      }
    }
  }
  const addChartHandler = () => {
    const countAux = count
    setCount(0)
    return onAdd(itemId, countAux)
     
  }
  return (
    <>
    
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="remove" onClick={() => handleItemCount('remove')}>
        <RemoveIcon />
      </Fab>
      <TextField id="standard-basic" label="Quantity" type="number" variant="standard" InputProps={{ readOnly: true}} value={count} />
      <Fab color="primary" aria-label="add" onClick={() => handleItemCount('add')}>
        <AddIcon />
      </Fab>
    </Box>
    <Button size="small" onClick={() => addChartHandler() } > Add to cart</Button>
  </>
  )
}
