export default class CartItemsModel {
  constructor(productID, userID, quantity, id) {
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
    this.id = id;
  }

  static addCartItems(productID, userID, quantity) {
    const newItem = new CartItemsModel(productID, userID, quantity);
    newItem.id = cartItems.length + 1;
    cartItems.push(newItem);
    return newItem;
  }

  static getUserCartItems(userID) {
    return cartItems.filter((cart) => {
      return (cart.userID = userID);
    });
  }

  static deleteCartItem(userID, cartID) {
    const cartItemIndex = cartItems.findIndex(
      (c) => c.id == cartID && c.userID == userID
    );
    if (cartItemIndex === -1) {
      return "Item not found";
    } else {
      cartItems.splice(cartItemIndex, 1);
    }
  }
}

let cartItems = [
  new CartItemsModel(1, 1, 2, 1),
  new CartItemsModel(12, 1, 10, 2),
];
