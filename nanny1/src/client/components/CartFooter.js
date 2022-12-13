import "./style/CartFooter.css";
const CartFooter = ({ totalPrice }) => {
  const discont = 0;
  const CalcTax = () => {
    return Math.round(totalPrice * 0.1 * 100) / 100;
  };
  const CalcTotal = () => {
    return Math.round((totalPrice + CalcTax() - discont) * 0.1 * 100) / 100;
  };
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
          <p>${totalPrice} </p>
          <p>${CalcTax()}</p>
          <p>-$0.00 </p>
          <p> ${CalcTotal()}</p>
        </div>
      </div>
      <button className="CartCheckOut">Countinue to checkout</button>
    </div>
  );
};
export default CartFooter;
