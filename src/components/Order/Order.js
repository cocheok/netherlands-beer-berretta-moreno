import React, {useEffect} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Ticket from '../Ticket/Ticket';
import Buyer from '../Buyer/Buyer';
import OrderSummary from '../OrderSummary/OrderSummary';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


import {
  doc,
  addDoc,
  runTransaction,
  collection,
  getFirestore,
} from "firebase/firestore";


export default function Order({cart, addItem, removeItem, clear, buyerFormValues, setBuyerFormValues, setMessage}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  
  const [steps, setSteps] = React.useState([
    {
      title: 'Check your cart',
      content: <Ticket cart={cart} addItem={addItem} removeItem={removeItem} editable={true}/>
    },
    {
      title: 'Add buyer information',
      content: <Buyer buyerFormValues={buyerFormValues} setBuyerFormValues={setBuyerFormValues}  />
      },
      {
      title: 'Confirm purchase',
      content: <OrderSummary order={ {cart: cart, buyer: buyerFormValues} } />
      } 
    ]);

  


  useEffect (() => {
    setSteps([
      {
        id: 1,
        title: 'Check your cart',
        content: <Ticket cart={cart} addItem={addItem} removeItem={removeItem} editable={true} />
      },
      {
        id: 2,
        title: 'Add buyer information',
        content: <Buyer buyerFormValues={buyerFormValues} setBuyerFormValues={setBuyerFormValues}  />
        },
        {
        id: 3,
        title: 'Confirm purchase',
        content: <OrderSummary order={ {cart: cart, buyer: buyerFormValues} } />
        } 
      ]);
  },  [buyerFormValues, cart, addItem, removeItem, clear, setBuyerFormValues])

  const checkBuyerInformation = () => {
    return (buyerFormValues && buyerFormValues.name && buyerFormValues.email && buyerFormValues.phone)
  }

  const handleNext = () => {
    if( steps[activeStep].id===2 && !checkBuyerInformation()){
      setMessage(`Buyer information: You must fill in all the fields`, 'error')
    } else {
      setMessage('','')
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    
    
  };

  const handleBack = () => {
    setMessage('','')
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateProducts = async () => {
    const db = getFirestore()
    cart.forEach( async (item) => {
      const productRef = doc(db, `products`, item.id)
      await runTransaction(db, async (transaction) => {
        const transfDoc = await transaction.get(productRef);
        if (!transfDoc.exists()) {
          console.error("The document does not exist")
        }
        const newStock = transfDoc.data().stock - item.quantity;
        transaction.update(productRef, { stock: newStock });
    });
    })
  }

  const handleSubmit = async(event) => { 
    setSubmitting(true)
    event.preventDefault();
    const order = {
      buyer: buyerFormValues,
      items: cart.map( (item) => { return {id: item.id, title: item.title, price: item.price} }),
      total: cart.map(({ price, quantity }) => price*quantity).reduce((sum, i) => sum + i, 0),
    };
    const db = getFirestore()
    const ordersCollection = collection(db, "orders")
    await addDoc(ordersCollection, order).then(({id}) => {
      updateProducts()
      setMessage(`Order created with id ${id}`, 'success')  
    });
    setSubmitting(false)
    clear()
  }

  return (
    <div className="order-container"> 
    {submitting? (<CircularProgress size={90} color={"primary"}/>):
    (<Card className="order">
       <CardHeader sx={{textAlign: "center"}}
        title="My Cart" 
        className='header'/>
      <CardContent className='content'>
            <Stepper activeStep={activeStep}>
                    {steps.map((step, index) => {
                    const stepProps = {};
                    const labelProps = {};
                   
                    return (
                        <Step key={step.title} {...stepProps}>
                        <StepLabel {...labelProps}>{step.title}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
          {steps[activeStep].content}
        </CardContent>
        <CardActions className="actions">
                <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}>
                 Back
                </Button>
                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleSubmit}>Confirm Order</Button>
                ):(<Button onClick={handleNext}>Next </Button>)}
            
        </CardActions>
      </Card>)
    }
    </div>
  )

}
