import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "Images/slider-bg-1-2.jpg" },
];

const Slider = () => {
  return (
    <div>
      <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}

export default Slider;
