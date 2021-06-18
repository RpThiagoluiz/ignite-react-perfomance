export interface AddProductToWishListProps {
  onAddToWishList: () => void;
  onRequestClose: () => void;
}

export const AddProductToWishList = ({
  onAddToWishList,
  onRequestClose,
}: AddProductToWishListProps) => {
  return (
    <div>
      <span>Deseja adicionar aos favoritos ?</span>
      <button onClick={onAddToWishList}>Sim</button>
      <button onClick={onRequestClose}>Nao</button>
    </div>
  );
};
