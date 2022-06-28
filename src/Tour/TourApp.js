/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Slider, Radio } from "antd";
import { useEffect, useState } from "react";
import CardTour from "./CardTour";
import axiosApi from "./TourApi";
import "./TourApp.scss";
function TourApp() {
  // lưu dữ liệu mặc định k thay đổi để sau lại filter k phải gọi lại API
  const [dataDefault, setDataDefault] = useState([]);

  // dữ liệu filter của từng điều kiện tìm kiếm
  const [dataFilter, setDataFilter] = useState({
    dataCategory: [],
    dataCuisine: [],
    dataStar: [],
    dataPrice: [],
  });

  // dữ liệu hiển thị
  const [data, setData] = useState([]);

  async function getTourApp() {
    try {
      const response = await axiosApi.get("tour");
      setData(response.data);
      setDataDefault(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handlePlaces = (e) => {
    // nếu click vào place thì filter dữ liệu place rồi lưu vào state dataFilter.dataCategory
    // ...dataFilter lẩy toàn bộ dữ liệu cũ của state dataFilter
    e.target.value === "place"
      ? setDataFilter({
          ...dataFilter,
          dataCategory: dataDefault.filter((o) => o.category === "place"),
        })
      : // nếu click vào dish thì filter dữ liệu dish rồi lưu vào state dataFilter.dataCuisine

        setDataFilter({
          ...dataFilter,
          dataCategory: dataDefault.filter((o) => o.category === "dish"),
        });
  };

  const handleAmerican = (e) => {
    // nếu check America thì filter dữ liệu America rồi lưu vào state dataFilter.dataCuisine

    e.target.checked
      ? setDataFilter({
          ...dataFilter,
          dataCuisine: [
            ...dataFilter.dataCuisine,
            ...dataDefault.filter((o) => o.cuisine === "american"),
          ],
        })
      : // nếu unCheck America thì là bỏ điều kiện filter America => filter từ dataFilter.dataCuisine để bỏ America

        setDataFilter({
          ...dataFilter,
          dataCuisine: dataFilter.dataCuisine.filter(
            (o) => o.cuisine !== "american"
          ),
        });
  };

  // tương tự handleAmerican
  const handleChina = (e) => {
    e.target.checked
      ? setDataFilter({
          ...dataFilter,
          dataCuisine: [
            ...dataFilter.dataCuisine,
            ...dataDefault.filter((o) => o.cuisine === "chinese"),
          ],
        })
      : setDataFilter({
          ...dataFilter,
          dataCuisine: dataFilter.dataCuisine.filter(
            (o) => o.cuisine !== "chinese"
          ),
        });
  };

  // tương tự handleAmerican
  const handleItalian = (e) => {
    e.target.checked
      ? setDataFilter({
          ...dataFilter,
          dataCuisine: [
            ...dataFilter.dataCuisine,
            ...dataDefault.filter((o) => o.cuisine === "italian"),
          ],
        })
      : setDataFilter({
          ...dataFilter,
          dataCuisine: dataFilter.dataCuisine.filter(
            (o) => o.cuisine !== "italian"
          ),
        });
  };

  const handleStar = (e) => {
    // nếu click vào  1 2 3 4 5 sao thì filter dữ liệu tương ứng với 1 hoặc 2 3 4 5 rồi lưu vào state dataFilter.dataStar
    setDataFilter({
      ...dataFilter,
      dataStar: dataDefault.filter((o) => o.rating === e.target.value),
    });
  };

  const onAfterChange = (e) => {
    // filter theo giá rồi lưu vào state dataFilter.dataPrice

    setDataFilter({
      ...dataFilter,
      dataPrice: dataDefault.filter((o) => o.price > e[0] && o.price < e[1]),
    });
  };

  useEffect(() => {
    // console.log(dataFilter, 'Chọn mỗi bộ filter ngẫu nhiên để xem sự thay đổi')

    // eg
    // hàm filter return true sẽ trả về o còn return fale sẽ k trả về dữ liệu
    /*
    const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    function isPrime(num) {
      for (let i = 2; num > i; i++) {
        if (num % i == 0) {
          return false;
        }
      }
      return num > 1;
    }

  console.log(array.filter(isPrime));
     */

    const reuslt = dataDefault.filter((o) => {
      for (let key in dataFilter) {
        // console.log(dataFilter[key])
        // lọc qua dataFilter gồm lọc qua 4 thằng dataCategory , dataCuisine, dataStar, dataPrice rồi check điều kiện
        /*
          ví dụ o = 1
          dataCategory= [1,2,3,4]
          dataCuisine= [5,2,7,9]
          dataStar= [1,4,2,8]
          dataPrice= [1,2,5,3]
          console.log(dataPrice.includes(1))
          nếu 2 có ở trong 4 data kia thì thoả mãn điều kiện filter sẽ return true
          nếu 1 không có ở 1 trong 4 data kia thì thoả mãn điều kiện filter sẽ return false
        */
        if (!!dataFilter[key].length && !dataFilter[key].includes(o)) {
          return false;
        }
      }
      return true;
    });

    // console.log(result)
    setData(reuslt);

    // Viết lại theo ý hiểu chi tiết hơn miễn là phải hiểu:))))
  }, [dataFilter]);

  useEffect(() => {
    getTourApp();
  }, []);

  return (
    <div className="wrapper__app">
      <div className="header__tour">
        <input type="text" placeholder="Woodland Hills" />
      </div>
      <div className="tour__content">
        <div className="sidebar">
          <div className="category">
            <h2>Category</h2>
          </div>
          <Radio.Group className="radius" defaultValue="a" buttonStyle="solid">
            <div className="flex-category">
              <div className="places">
                <Radio.Button
                  value="place"
                  style={{ borderRadius: "15px" }}
                  onChange={handlePlaces}
                >
                  PLACES
                </Radio.Button>
              </div>
              <div className="dishes">
                <Radio.Button
                  value="dish"
                  style={{ borderRadius: "15px" }}
                  onChange={handlePlaces}
                >
                  DISHES
                </Radio.Button>
              </div>
            </div>
          </Radio.Group>
          <div className="cuisine">
            <h2>Cuisine</h2>
          </div>
          <div className="american__flex">
            <div className="american__flex-children">
              <p>American</p>
            </div>
            <div className="amer__checkbox">
              <input
                type="checkbox"
                style={{ color: "#000" }}
                onClick={handleAmerican}
              />
            </div>
          </div>
          <div className="chinese__flex">
            <div className="chinese__flex-children">
              <p>Chinese</p>
            </div>
            <div className="chine__checkbox">
              <input type="checkbox" onClick={handleChina} />
            </div>
          </div>
          <div className="italian__flex">
            <div className="italian__flex-children">
              <p>Italian</p>
            </div>
            <div className="ita__checkbox">
              <input type="checkbox" onClick={handleItalian} />
            </div>
          </div>
          <div className="price-range">
            <h2>Price Range</h2>
            <div className="range">
              <Slider
                max={10000}
                min={0}
                range={true}
                step={10}
                defaultValue={[0, 10000]}
                onAfterChange={onAfterChange}
              />
            </div>
          </div>
          <div className="star__rating">
            <h2>Star Rating</h2>
            <div className="all-start">
              <Radio.Group buttonStyle="solid" onChange={handleStar}>
                <Radio.Button value={1}>1</Radio.Button>
                <Radio.Button value={2}>2</Radio.Button>
                <Radio.Button value={3}>3</Radio.Button>
                <Radio.Button value={4}>4</Radio.Button>
                <Radio.Button value={5}>5</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
        <div className="home__page">
          <Row gutter={[16]}>
            {data.map((o, i) => {
              return (
                <Col span={6} style={{ marginTop: "10px" }}>
                  <CardTour data={o} key={i} />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}
export default TourApp;
