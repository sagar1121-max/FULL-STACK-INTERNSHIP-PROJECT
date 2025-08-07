import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const UserProductDetail = () => {

   const {productId} = useParams()
    
    useEffect(() => {
        getProductDetail()

    }, [])
    
    const [productData, setproductData] = useState({})
    const getProductDetail = async()=>{

       await axios.get("http://localhost:3000/products/"+productId)
        .then((res)=>{
            console.log(res);
            setproductData(res.data.product)
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
        // Navigate to payment page with product info
        window.location.href = `/payment?productId=${productId}`
        // Or use React Router: navigate(`/payment?productId=${productId}`)
    }

  return (
    <div className='product-container'>
     
      <div className="main">
        <div className="left">
            <img src={productData.image} alt="" />
        </div>
        <div className="right">
            <h1>{productData.title}</h1>
            <p>{productData.description}</p>

            <div className="bottom">
                <button onClick={handleBuyNow}>Buy now</button>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserProductDetail
