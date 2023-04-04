import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoaders = async () =>{
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();
    //console.log(products);

    // if cart data is in database , you have to use async await
    const storedCart = getShoppingCart()

    const savedCart = [];

    //console.log(storedCart);
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);

        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    //if need send 2 things
    //return [savedCart, products]
    // another option
    //return {products, savedCart}
    //return {products, cart: savedCart}


    return savedCart;

}

export default cartProductLoaders;