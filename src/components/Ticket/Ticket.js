import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';

const TAX_RATE = 0.07;


function subtotal(items) {
  return items.map(({ price, quantity }) => price*quantity).reduce((sum, i) => sum + i, 0);
}

export default function Ticket({cart, addItem, removeItem}) {

  const cartSubtotal = subtotal(cart).toFixed(2);
  const invoiceTaxes = (TAX_RATE * cartSubtotal).toFixed(2);

  const handleModify = (item, action) => {
    if(action === 'add'){
      if(item.quantity < item.stock ){
        addItem(item, item.quantity+1);
      }
      
    }
    if(action === 'remove'){
      if(item.quantity > 1){
        addItem(item, item.quantity-1);
      }

    }
  
  }
  
  return (
    <div className="ticket">
      <TableContainer component={Paper}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>#Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Sum</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((cartItem) => (
              <TableRow key={cartItem.id}>
                <TableCell>{cartItem.id}</TableCell>
                <TableCell>{cartItem.title}</TableCell>
                <TableCell>{cartItem.description}</TableCell>
                <TableCell>{`€${cartItem.price}`}</TableCell>
                <TableCell>{Math.round(cartItem.price*cartItem.quantity * 100)/100}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleModify(cartItem, 'remove')} aria-label="remove item">
                    <RemoveIcon />
                  </IconButton>
                  {cartItem.quantity}
                  <IconButton onClick={() => handleModify(cartItem, 'add')} aria-label="add item">
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => removeItem(cartItem.id)} aria-label="remove category">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}      
          </TableBody>
        </Table>
      </TableContainer>



    <List>
        <ListItem disableGutters>
          <ListItemText primary={`Subtotal: €${cartSubtotal}`} />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary= {`TAX (${(TAX_RATE * 100).toFixed(0)}%): ${invoiceTaxes}`}  />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary={`Total: €${Math.round((Number(cartSubtotal) + Number(invoiceTaxes))* 100)/100 }`} />
        </ListItem>
    
    </List>


    </div>
    



  );
}
