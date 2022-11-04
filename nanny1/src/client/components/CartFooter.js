import "./style/CartFooter.css";
const CartFooter = () => {
  return (
    <div className="CartFooter">
      <div className="CartInfo">
        <div className="CartTextInfo">
          <p>Subtotal </p>
          <p>Tax</p>
          <p>Discount </p>
          <p>Estimate total</p>
        </div>
        <div className="CartNumInfo">
          <p>$499.0 </p>
          <p>$49.90</p>
          <p>-$20.00 </p>
          <p> $429.10</p>
        </div>
      </div>
      <button className="CartCheckOut">Countinue to checkout</button>
    </div>
  );
};
export default CartFooter;
