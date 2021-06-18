type ProductItemProps = {
  product: {
    id: Number;
    price: Number;
    title: String;
  };
};

export const ProductItem = ({ product }: ProductItemProps) => (
  <div>
    {product.title} - <strong>{product.price}</strong>
  </div>
);
