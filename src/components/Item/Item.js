import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';

function Item({item}) {

  return (
    <>
      <Card >
          <CardHeader  sx={{bgcolor: grey[200]}}
          title={item.title}
          titleTypographyProps={ {justifyContent: 'center', display: 'flex'}}
        />
        <CardMedia
          component="img"
          height="180px"
          image={item.pictureUrl}
          alt="Beer"
        />
          <CardContent sx={{ justifyContent: 'center', display: 'flex'}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.description}
          </Typography>
          
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', display: 'flex'}}>
          <Button variant="outlined" href={`/item/${item.id}`}>See product detail</Button>
        </CardActions>
        <CardContent sx={{ bgcolor: grey[200], justifyContent: 'center', display: 'flex'}} >
          <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
          {`Only ${item.stock} left`}
          </Typography>
          
        </CardContent>
      </Card>

    </>
    
  )
}

export default Item