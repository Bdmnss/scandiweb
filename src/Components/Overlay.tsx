type OverlayProps = {
  setIsOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Overlay: React.FC<OverlayProps> = ({
  setIsOverlayOpen,
  setIsCartOpen,
}) => {
  return (
    <div
      className="bg-overlay absolute left-0 top-20 z-20 flex h-screen w-full items-center justify-center"
      onClick={() => {
        setIsOverlayOpen(false);
        setIsCartOpen(false);
      }}
    ></div>
  );
};

export default Overlay;
