import React from "react";

interface ProductGalleryProps {
  product: {
    name: string;
    images: { url: string }[];
  };
}

class ProductGallery extends React.Component<ProductGalleryProps> {
  state = {
    activeImage: this.props.product.images[0].url,
    fading: false,
  };

  changeImage = (newImage: string) => {
    this.setState({ fading: true });
    setTimeout(() => {
      this.setState({ activeImage: newImage, fading: false });
    }, 300); // Duration must match the fade-out time
  };

  selectImage = (image: string) => {
    if (image !== this.state.activeImage) {
      this.changeImage(image);
    }
  };

  handleNext = () => {
    const images = this.props.product.images.map((img) => img.url);
    const currentIndex = images.indexOf(this.state.activeImage);
    const nextIndex = (currentIndex + 1) % images.length;
    this.changeImage(images[nextIndex]);
  };

  handlePrev = () => {
    const images = this.props.product.images.map((img) => img.url);
    const currentIndex = images.indexOf(this.state.activeImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    this.changeImage(images[prevIndex]);
  };

  render() {
    const { activeImage, fading } = this.state;
    const { product } = this.props;
    const { name, images } = product;
    const imageUrls = images.map((img) => img.url);

    return (
      <div
        className="relative flex w-3/4 flex-row"
        data-testid="product-gallery"
      >
        {/* Thumbnail Gallery */}
        <ul className="mr-10 flex flex-col gap-4">
          {imageUrls.map((imageUrl, index) => (
            <li
              key={index}
              className="w-28 cursor-pointer"
              onClick={() => this.selectImage(imageUrl)}
            >
              <img src={imageUrl} alt={name} className="w-full" />
            </li>
          ))}
        </ul>

        {/* Main Image */}
        <div className="w-full">
          <div className="relative">
            <img
              src={activeImage}
              alt={name}
              className={`h-[600px] w-full object-contain transition-opacity duration-300 ${
                fading ? "opacity-0" : "opacity-100"
              }`}
            />

            {imageUrls.length > 1 && (
              <div>
                <button
                  className="absolute left-0 top-1/2 flex size-8 -translate-y-1/2 transform items-center justify-center bg-arrowBackground text-white transition-colors duration-300 hover:bg-black"
                  onClick={this.handlePrev}
                >
                  <img src="/arrow.svg" alt="Previous" className="rotate-180" />
                </button>
                <button
                  className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 transform items-center justify-center bg-arrowBackground p-2 text-white transition-colors duration-300 hover:bg-black"
                  onClick={this.handleNext}
                >
                  <img src="/arrow.svg" alt="Next" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductGallery;
