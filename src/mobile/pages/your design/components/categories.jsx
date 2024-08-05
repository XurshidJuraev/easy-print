import tShirtFrontImage from "../../../../layouts/images/frontShirt.png";
import tShirtBackImage from "../../../../layouts/images/backShirt.png";
import hoodieBackImage from "../../../../layouts/images/hoodieBack.png";
import hoodieFrontImage from "../../../../layouts/images/hoodieFront.png";
import sweatshotBackImage from "../../../../layouts/images/sweatshotBack.png";
import sweatshotFrontImage from "../../../../layouts/images/sweatshotFront.png";
import "../../../../pages/your design/main.css";
import "../../../../pages/your design/main2.css";
import { forwardRef } from "react";

const categories = {
  31: { frontImage: tShirtFrontImage, backImage: tShirtBackImage },
  32: { frontImage: sweatshotFrontImage, backImage: sweatshotBackImage },
  33: { frontImage: hoodieFrontImage, backImage: hoodieBackImage },
};

export const CategoriesMobile = forwardRef((props, ref) => {
  const {
    category,
    isFrontView,
    shirtColor,
    photoInputVisible,
    textInputVisible,
    ref2,
  } = props;

  const selectedImage =
    categories[category][isFrontView ? "frontImage" : "backImage"];

  return (
    <div ref={ref} id="tshirt-div2">
      <img
        draggable={false}
        src={selectedImage}
        alt="shirt"
        style={{
          background: shirtColor,
        }}
        className="clothes_image"
      />

      <div
        style={{
          display: textInputVisible || photoInputVisible ? "block" : "none",
        }}
        className="drawing-area"
      >
        <div className="canvas-container">
          <canvas
            ref={ref2}
            width={100}
            height={150}
            style={{ border: "2px solid #BEBFC2" }}
          />
        </div>
      </div>
    </div>
  );
});