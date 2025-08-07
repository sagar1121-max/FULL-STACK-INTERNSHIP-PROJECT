import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Payment.css'

const Payment = () => {
    const [product, setProduct] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        address: '',
        city: '',
        zipCode: ''
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const productId = urlParams.get('productId')
        const fromCart = urlParams.get('fromCart')

        if (productId && !fromCart) {
            fetchProduct(productId)
        } else {
            setLoading(false)
        }
    }, [])

    const fetchProduct = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:3000/products/${productId}`)
            setProduct(response.data.product || response.data)
            setLoading(false)
        } catch (error) {
            console.log('Error fetching product:', error)
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Here you would typically integrate with a payment gateway
        // For now, we'll just show a success message
        alert('Payment processed successfully! Your order has been placed.')
        
        // Redirect to home page or order confirmation
        window.location.href = '/'
    }

    if (loading) {
        return <div className="payment-loading">Loading payment form...</div>
    }

    return (
        <div className="payment-container">
            <div className="payment-content">
                <h1>Payment</h1>
                
                {product && (
                    <div className="product-summary">
                        <h3>Order Summary</h3>
                        <div className="product-item">
                            <img src={product.image} alt={product.title} />
                            <div>
                                <h4>{product.title}</h4>
                                <p>{product.description}</p>
                                <p className="price">${product.price || '0.00'}</p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="payment-methods">
                        <h3>Payment Method</h3>
                        <div className="method-options">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Credit/Debit Card
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Cash on Delivery
                            </label>
                        </div>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="card-details">
                            <h3>Card Details</h3>
                            <div className="form-group">
                                <label>Card Number</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Cardholder Name</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    value={formData.cardName}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="shipping-details">
                        <h3>Shipping Address</h3>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter your shipping address"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    placeholder="ZIP Code"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="pay-button">
                        {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Payment
