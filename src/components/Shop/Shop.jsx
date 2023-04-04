import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    //for fetch data
    const [products, setProduct] = useState([]);

    //put data to cart
    const [cart, setCart] = useState([]);
    //core data
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])
    // local storage
    useEffect(()=>{
        //console.log('products',products);
        const storedCart = getShoppingCart();
        
        const savedCart = [];
        //console.log(storedCart);
        // step 1 get id
        for(const id in storedCart){
            //console.log(id);
            // step 2 get the product by using id
            const addedProduct = products.find(product => product.id === id);
            //console.log(addedProduct);
            // step 3: get quantity of the product
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4" add the added product to the saved cart
                savedCart.push(addedProduct);
            }
        }
        //step 5 set the cart
        setCart(savedCart);
    }, [products]) // set dependency for async reload (fetch)





    
    // get data to cart from product
    const handleAddToCart = (product) =>{
        // every time new cart
        const newCart = [...cart, product];
        setCart(newCart);
        // data to db
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product 
                    key={product.id}
                    product = {product}
                    // push to cart
                    handleAddToCart = {handleAddToCart}
                    ></Product>)
                }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;