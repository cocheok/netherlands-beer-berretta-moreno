import React from 'react'
import TextField from '@mui/material/TextField';

function Buyer({buyerFormValues, setBuyerFormValues}) {

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setBuyerFormValues({
        ...buyerFormValues,
        [id]: value,
        });
    };
  return (
    <form className='buyer'>
        
        <TextField id="email" label="EMAIL" variant="outlined" onChange={handleInputChange} value={buyerFormValues.email} />
        <TextField id="name" label="NAME" variant="outlined" onChange={handleInputChange} value={buyerFormValues.name} />
        <TextField id="phone" label="PHONE" variant="outlined" onChange={handleInputChange} value={buyerFormValues.phone} />

        
     </form>
  
  )
}

export default Buyer