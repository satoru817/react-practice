import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { useState } from "react";

class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  getDescription() {
    return this.isAvailable
      ? `${this.name}:${this.price}円:${this.stock}個`
      : `${this.name}:${this.price}円：品切れ`;
  }

  isAvailable() {
    return this.stock > 0;
  }

  getPriceWithTax() {
    return Math.floor(this.price * 1.1);
  }

  getDiscountPrice(percent) {
    return this.price * (1 - percent / 100);
  }
}

function ShoppingCart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div style={{ border: "2px solid blue", margin: "10px", padding: "15px" }}>
      <h2>買い物かご</h2>
      {cart.length === 0 ? (
        <p>カートは空です</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.product.id}>
                {item.product.name} × {item.quantity}個 ={" "}
                {item.product.price * item.quantity}円
                <button onClick={() => removeFromCart(item.product.id)}>
                  削除
                </button>
              </li>
            ))}
          </ul>
          <p>
            <strong>
              合計:{total}円（税込み:{Math.floor(total * 1.1)}円）
            </strong>
          </p>
        </>
      )}
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  const [count, setCount] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, count);
    setCount(1);
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h2>{product.name}</h2>
      <p>
        価格:{product.price}円(税込み:{product.getPriceWithTax()}円)
      </p>
      <p>在庫:{product.stock > 0 ? `${product.stock}個` : `売り切れ`}</p>

      {product.isAvailable() ? (
        <>
          <p>個数選択</p>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {Array.from({ length: product.stock }, (_, i) => i + 1).map(
              (num) => (
                <option key={num} value={num}>
                  {num}個
                </option>
              )
            )}
          </select>
          <button onClick={handleAddToCart}>買い物かごに追加</button>
        </>
      ) : (
        <p>売り切れです</p>
      )}
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([
    new Product(0, "消しゴム", 120, 25),
    new Product(1, "鉛筆", 300, 5),
    new Product(2, "マッチ", 200, 0),
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { product, quantity }]);
    }

    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return new Product(p.id, p.name, p.price, p.stock - quantity);
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cart.find((item) => item.product.id === productId);

    if (itemToRemove) {
      setCart(cart.filter((item) => item.product.id !== productId));

      const updatedProducts = products.map((p) => {
        if (p.id === productId) {
          return new Product(
            p.id,
            p.name,
            p.price,
            p.stock + itemToRemove.quantity
          );
        }
        return p;
      });
      setProducts(updatedProducts);
    }
  };

  return (
    <div>
      <h1>商品カタログ</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          ></ProductCard>
        ))}
      </div>
      <ShoppingCart cart={cart} removeFromCart={removeFromCart}></ShoppingCart>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
