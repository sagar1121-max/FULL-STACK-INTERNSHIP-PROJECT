import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./productDetail.css"
import axios from 'axios'

const ProductDetail = () => {
   const {productId} = useParams()
   const [product, setProduct] = useState(null)
    
    useEffect(() => {
        getProductDetail()
    }, [])
    
    const getProductDetail = async()=>{
       await axios.get("http://localhost:3000/products/"+productId)
        .then((res)=>{
            console.log(res);
            setProduct(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleAddToCart = async () => {
        try {
            await axios.post(`http://localhost:3000/cart/add/${productId}`)
            alert("Product added to cart!")
        } catch (error) {
            console.log(error)
            alert("Failed to add to cart")
        }
    }

    const handleBuyNow = () => {
        window.location.href = `/payment?productId=${productId}`
    }

  return (
    <div className='product-container'>
      <div className="main">
        <div className="left">
            <img src={product?.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
        </div>
        <div className="right">
            <h1>{product?.title || "Title"}</h1>
            <p>{product?.description || "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, perspiciatis quas nostrum est non quia dolor odio dolore? Error, distinctio."}</p>
            
            {/* Add these buttons */}
            <div className="product-actions">
                <button onClick={handleAddToCart} className="add-to-cart-btn">
                    Add to Cart
                </button>
                <button onClick={handleBuyNow} className="buy-now-btn">
                    Buy Now
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
