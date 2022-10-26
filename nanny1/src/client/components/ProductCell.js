import "./style/ProductCell.css";
const ProductCell = () => {
  return (
    <div className="itemContainer">
      <img
        className="itemimg"
        src="https://i5.walmartimages.com/asr/99c11ba4-f0b9-4bdd-bbb1-701b352b45fd.3e0f55c09e774710faafa402dc456b53.jpeg"
      ></img>
      <p className="productName">test</p>
      <p className="price">400</p>
      <button className="editBtn">edit</button>
    </div>
  );
};
export default ProductCell;
