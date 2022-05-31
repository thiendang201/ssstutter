import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { capitalize } from "../../utils/capitalizeString";

const Product = ({ id, name, color, img_url, price, discount, salePrice }) => {
  return (
    <div className="relative">
      <div>
        <Link
          to={`product/${id}`}
          style={{ backgroundImage: `url(${img_url})` }}
          className=" block pt-[125%] bg-center bg-no-repeat bg-cover"
        ></Link>
      </div>
      {discount !== 0 && (
        <div className="absolute top-0 right-0 p-[1rem] rounded-bl-[0.6rem] bg-[#c1272d] text-[1.2rem] font-semibold text-white">
          <span>{discount}%</span>
        </div>
      )}
      <div className="text-left font-semibold mt-[0.4rem] ml-[0.6rem]">
        <h6 className="text-[1.4rem] capitalize">{capitalize(name)}</h6>
        <div className="text-[1.8rem] ">
          <p>
            <NumberFormat
              thousandsGroupStyle="thousand"
              value={salePrice || price}
              decimalSeparator="."
              displayType="text"
              thousandSeparator={true}
            />

            <span className="text-[1.6rem]">₫</span>
          </p>
          {salePrice !== 0 && (
            <p className="line-through text-[#aeaeae] mt-[-0.4rem]">
              <NumberFormat
                thousandsGroupStyle="thousand"
                value={price}
                displayType="text"
                decimalSeparator="."
                thousandSeparator={true}
              />{" "}
              <span className="text-[1.6rem]">₫</span>
            </p>
          )}
        </div>

        <div className="text-[1.2rem] text-[#aeaeae]">
          <p>+{color} màu</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
