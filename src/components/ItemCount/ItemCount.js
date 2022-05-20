import React, { useState }  from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';

export const ItemCount = ({ stock, initial, onAdd}) => {
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
    const countAux = count;
    setCount(0)
    onAdd(countAux)
  }

  return (
    <div className='item-count'>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="primary" aria-label="remove" onClick={() => handleItemCount('remove')}>
          <RemoveIcon />
        </Fab>
        <Input disabled value={count} sx={{
          fontSize: '2vw',
          width: '5vw'
        }}
      />
        <Fab color="primary" aria-label="add" onClick={() => handleItemCount('add')}>
          <AddIcon />
        </Fab>
      </Box>
      <Button size="large" variant='outlined' disabled={count<=0} onClick={() => addChartHandler() } >Add to cart</Button>
      
    
  </div>
  )
}
