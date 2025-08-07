import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Cart.css'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCartItems()
    }, [])

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cart')
            setCartItems(response.data)
            setLoading(false)
        } catch (error) {
            console.log('Error fetching cart items:', error)
            setLoading(false)
        }
    }

    const removeFromCart = async (cartItemId) => {
        try {
            await axios.delete(`http://localhost:3000/cart/${cartItemId}`)
            fetchCartItems() // Refresh cart items
            alert('Item removed from cart!')
        } catch (error) {
            console.log('Error removing item:', error)
            alert('Failed to remove item from cart')
        }
    }

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!')
            return
        }
        // Navigate to payment page with cart items
        window.location.href = '/payment?fromCart=true'
    }

    if (loading) {
        return <div className="cart-loading">Loading cart...</div>
    }

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button onClick={() => window.location.href = '/'}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.productId?.image || 'https://via.placeholder.com/100'} alt={item.productId?.title} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.productId?.title || 'Product Title'}</h3>
                                    <p>{item.productId?.description || 'Product description'}</p>
                                    <p className="item-price">${item.productId?.price || '0.00'}</p>
                                </div>
                                <div className="item-actions">
                                    <button 
                                        onClick={() => removeFromCart(item._id)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Items: {cartItems.length}</p>
                        <button onClick={handleCheckout} className="checkout-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart
