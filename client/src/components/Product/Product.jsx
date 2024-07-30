import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useProductHandlers } from "../../handlers/productHandlers";
import style from "./Product.module.css";

const Product = ({ product }) => {
  const user = localStorage.getItem("userEmail");
  
  const navigate = useNavigate();
  
  const { 
    handleAddToCart, 
    handleIncrementDetail, 
    handleDecrementDetail 
  } = useProductHandlers();
  
  const handleUser = () => {
    if (user) {
      handleAddToCart(product, quantity);
      setQuantity(1);
    } else {
      navigate("/login");
    }
  };
  
  const [quantity, setQuantity] = useState(1);
  const totalPrice = product.price * quantity;
  
  return (
      <div className={style.productContainer} data-category={product.category}>

        <div className={style.imageConteiner}>
          {product.images && product.images.length > 0 && (
            <img
            src={product.images[0]}
              alt={product.title}
              className={style.image}
              />
              )}
        </div>

        <div className={style.dataConteiner}>
          <div className={style.descriptionContainer}>
            <p className={style.productDescription}>{product.description}</p>
          </div>

          <div className={style.secondaryContainer}>
            <div className={style.quantityContainer}>
              <button
                onClick={() => {
                  if (quantity > 1) {
                    handleDecrementDetail(product, quantity);
                    setQuantity((prevQuantity) => prevQuantity - 1);
                  }
                }}
                className={style.quantityButton}
                > - </button>

              <span className={style.quantity}>{quantity}</span>

              <button
                onClick={() => {
                  handleIncrementDetail(product, quantity);
                  setQuantity((prevQuantity) => prevQuantity + 1);
                }}
                className={style.quantityButton}
                > + </button>
            </div>

            <button
              onClick={handleUser}
              className={style.addToCartButton}
              >
              Añadir al Carrito ${totalPrice}
            </button>
          </div>
        </div>
      </div>
  );
};

export default Product;
