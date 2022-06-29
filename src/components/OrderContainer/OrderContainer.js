import React from 'react'
import OrderSummary from '../OrderSummary/OrderSummary';

import { getDocs, collection, where, query, getFirestore} from 'firebase/firestore'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function OrderContainer({user, msj}) {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {

        const db = getFirestore();
        if(user){
            const ordersbyEmail = query ( 
                collection( db, 'orders'),
                where("buyer.email", '==', user.decodedJWT.email));
            
            getDocs(ordersbyEmail).then((snapshot) =>{
                if(snapshot.size === 0) {
                    msj(`There are no orders for the user ${user.decodedJWT.email}`, 'error')
                }
                let userOrders = [];
                snapshot.docs.forEach( doc => {
                    let myItemsSet = {};
                    doc.data().items.forEach(item => {
                        if(myItemsSet[item.id]){
                            myItemsSet[item.id].quantity += 1;
                        } else {
                            myItemsSet[item.id] = item;
                            myItemsSet[item.id].quantity = 1;
                        }
                    });
                    let myCart = [];
                    Object.keys(myItemsSet).forEach( item => myCart.push(myItemsSet[item] ));
                    const orderDate = doc.data().date.toDate();
                    const orderDateToDisplay = `${orderDate.getDate()}/${orderDate.getMonth()+1}/${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}` 
                    userOrders.push(
                        <Accordion key={doc.id}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <div className="order-label">
                                    <Typography>{orderDateToDisplay}</Typography>
                                    <Typography>{doc.id}</Typography>
                                    <Typography>{doc.data().status} </Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                    <OrderSummary order={ {cart: myCart, buyer: doc.data().buyer} } />
                                
                            </AccordionDetails>
                        </Accordion>
                        
                    )
                })
                
                setOrders(userOrders);
            })
        } else {
            console.log("No user")
        }
    }, [user]);
  return (
    <>
    { orders.length > 0 ? orders : <>No Orders</>}
    </>
    
  )
}

export default OrderContainer