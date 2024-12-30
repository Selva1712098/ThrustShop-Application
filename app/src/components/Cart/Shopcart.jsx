import React, { useState, useEffect } from "react";
import "./Shopcart.scss";
import axios from "../../axios";
// import TopNav from "../Topbar/TopNav";
import GooglePayButton from "@google-pay/button-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [daata, setDaata] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: "0.00",
    tax: "0.00",
    shipping: "0.00",
    total: "0.00",
  });

  // const removeItem = async (carId) => {
  //   try {
  //     console.log(carId);
  //     const response = await axios.get(`/removetocart/${carId}`);
  //     console.log(response.data);

  //     const updatedCartItems = cartItems.filter((item) => item._id !== carId);
  //     setCartItems(updatedCartItems);
  //     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Store updated cart items in local storage
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const removeItem = async (carId) => {
    try {
      console.log(carId);
      const response = await axios.get(`/removetocart/${carId}`);
      console.log(response.data);

      const updatedCartItems = cartItems.filter((item) => item._id !== carId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
    );
  };

  useEffect(() => {
    const fetchCartlist = async () => {
      try {
        const response = await axios.get("/allCars", { withCredentials: true });
        const allCars = response.data?.cars ?? [];
        const filteredCartlist = allCars.filter(
          (car) => car.isAddedtocart === "added"
        );
        const updatedCartItems = filteredCartlist.map((item) => ({
          ...item,
          price: parseFloat(item.price), // Convert price to a number
        }));
        setCartItems(updatedCartItems);
        // localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Store cart items in local storage
        console.log("cartlist", updatedCartItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartlist();
  }, []);

  useEffect(() => {
    const recalculateCart = () => {
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        // Cart is empty, return default values
        return {
          subtotal: "0.00",
          tax: "0.00",
          shipping: "0.00",
          total: "0.00",
        };
      }

      // Calculate totals
      let subtotal = 0;
      cartItems.forEach((item) => {
        subtotal += item.price;
        item.quantity = 1; // Set default quantity to 1
      });
      const taxRate = 0.05;
      const shippingRate = 15.0;
      const tax = subtotal * taxRate;
      const shipping = subtotal > 0 ? shippingRate : 0;
      const total = subtotal + tax + shipping;

      return {
        subtotal: Number(subtotal).toLocaleString("en-IN"),
        tax: Number(tax).toLocaleString("en-IN"),
        shipping: Number(shipping).toLocaleString("en-IN"),
        total: Number(total).toLocaleString("en-IN"),
      };
    };

    setCartTotals(recalculateCart());
  }, [cartItems]);
  return (
    <div>
      <TopNav />
      <br />
      <br />
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "blue",
        }}
      >
        <h1>WISHLIST</h1>
      </div> */}

      <div className="shopping-cart">
        <div className="column-labels">
          <label className="product-image">Image</label>
          <label className="product-details">Product</label>
          <label className="product-price">Price</label>
          <label className="product-quantity">Quantity</label>
          <label className="product-removal">Remove</label>
          <label className="product-line-price">Total</label>
        </div>

        {cartItems.map((item) => (
          <div className="product" key={item.id}>
            <div className="product-image">
              <img src={item.imageUrl} alt="Product" />
            </div>
            <div className="product-details">
              <div className="product-title">{item.brand}</div>
              <p className="product-description">{item.model}</p>
            </div>
            <div className="product-price">
              {Number(item.price).toLocaleString("en-IN")}
            </div>
            <div className="product-quantity">
              <input
                type="number"
                value={item.quantity}
                min="1"
                defaultValue={"1"}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
              />
            </div>
            <div className="product-removal">
              <button
                className="remove-product"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>
            </div>
            <div className="product-line-price">{item.price.toFixed(2)}</div>
          </div>
        ))}

        <div className="totals">
          <div className="totals-item">
            <label>Subtotal</label>
            <div className="totals-value" id="cart-subtotal">
              {cartTotals.subtotal}
            </div>
          </div>
          <div className="totals-item">
            <label>Tax (5%)</label>
            <div className="totals-value" id="cart-tax">
              {cartTotals.tax}
            </div>
          </div>
          <div className="totals-item">
            <label>Shipping</label>
            <div className="totals-value" id="cart-shipping">
              {cartTotals.shipping}
            </div>
          </div>
          <div className="totals-item totals-item-total">
            <label>Grand Total</label>
            <div className="totals-value" id="cart-total">
              {cartTotals.total}
            </div>
          </div>
        </div>

        <button className="checkout">
          {/* <GooglePayButton
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "your_payment_gateway_name",
                      gatewayMerchantID: "your_merchant_id",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Cars Valley",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: daata.price,
                currencyCode: "INR",
                countryCode: "IN",
              },
              shippingAddressRequired: true,
              callbackIntents: ["PAYMENT_AUTHORIZATION"],
            }}
            onLoadPaymentData={(paymentRequest) => {
              console.log("success", paymentRequest);
            }}
            onPaymentAuthorized={(paymentData) => {
              console.log("payment Authorised success", paymentData);
              return { transactionState: "SUCCESS" };
            }}
            existingPaymentMethodRequired="false"
            buttonColor="black"
            buttonType="Buy"
          /> */}
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
