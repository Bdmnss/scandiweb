import { useCartStore } from "../store/cartStore";

const Overlay: React.FC = () => {
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const setIsOverlayOpen = useCartStore((state) => state.setIsOverlayOpen);

  return (
    <div
      className="absolute left-0 top-20 z-20 flex h-screen w-full items-center justify-center bg-overlay"
      onClick={() => {
        setIsOverlayOpen(false);
        setIsCartOpen(false);
      }}
    ></div>
  );
};

export default Overlay;
