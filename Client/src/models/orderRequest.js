export class Products {
  constructor(ProductId, Quantity, Price) {
    this.ProductId = ProductId;
    this.Quantity = Quantity;
    this.Price = Price;
  }
}

export class Order {
  constructor(UserId, ProductInCart, Amount, Address, Status) {
    this.UserId = UserId;
    this.Products = ProductInCart;
    this.Amount = Amount;
    this.Address = Address;
    this.Status = Status;
  }
}
