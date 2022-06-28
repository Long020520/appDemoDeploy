/* eslint-disable jsx-a11y/alt-text */
import "./TourApp.scss";
function CardTour(props) {
  const { data } = props;
  return (
    <div className="card__list-detail">
      <div className="image__tour">
        <div>{data.category}</div>
        <div>{data.cuisine}</div>
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJvBKLDTn8R8empLLEl5vRQSGFUwM22o4cRYRM59fUBTFtpObuVNAzpSu540UhU3cB7yw&usqp=CAU"
          }
        />
      </div>
      <div className="wrapper__content">
        <div className="flex__rating">
          <div className="title">
            <h2>{data.title}</h2>
          </div>
          <div className="rating">
            <button className="button-rating">
              <i
                className="fa-solid fa-star-half-stroke"
                style={{ color: "yellow" }}
              ></i>
              {data.rating}
            </button>
          </div>
        </div>
        <div className="flex__price">
          <div className="servicetime">
            <b>{data.serviceTime}</b>
            <p> DeliveryFee {data.deliveryFee}</p>
          </div>
          <div className="price">
            <b>${data.price}</b>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardTour;
