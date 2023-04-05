import React from 'react';
import './cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
const Cart = ({cart, handleClearCart, children}) => {
    //const cart = props.cart; // o1
    //const {cart} = props; // o2
    //console.log(cart);
    // calculate
    //console.log(children);
    let total = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart ){
        product.quantity = product.quantity || 1;
        total = total + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping
        quantity = quantity + product.quantity;
    }
    const tax = total *0.07;
    const grandTotal = total + totalShipping + tax

    return (
        <div className='cart'>
                <h4>Order Summery</h4>
                <p>Selected item {quantity}</p>
                <p>Total Price: ${total} </p>
                <p>Total Shipping: ${totalShipping}</p>
                <p>Tax ${tax.toFixed(2)}</p>
                <h6>Grand Total: ${grandTotal.toFixed(2)} </h6>
                <button onClick={handleClearCart} className='clear-cart'><span>Clear Cart</span> <FontAwesomeIcon className='clear-icon' icon={faTrashAlt} />
                </button>
                {children}
        </div>
    );
};

export default Cart;