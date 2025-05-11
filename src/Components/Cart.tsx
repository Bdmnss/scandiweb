const Cart = ({
  setIsCartOpen,
}: {
  setIsCartOpen: (value: boolean) => void;
}) => {
  return (
    <div
      className="absolute right-0 top-8 z-50 flex h-96 w-80 items-center justify-center overflow-scroll bg-white"
      onClick={() => {
        setIsCartOpen(false);
      }}
    >
      {/* Cart content goes here */}
    </div>
  );
};

export default Cart;
