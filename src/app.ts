import fetchJsonp from "fetch-jsonp";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const BAIDU_API_KEY = "YOUR_KEY";
// declare var BMap: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  //send enteredAddress to baidu API
  fetchJsonp(
    `https://api.map.baidu.com/geocoding/v3/?address=${encodeURI(
      enteredAddress
    )}&output=json&ak=${BAIDU_API_KEY}&callback=showLocation`
  )
    .then((response) => {
      console.log(response.json());
      return response.json();
    })
    .then((json) => {
      console.log(json);
      const coordinates = json.result.location;
      var map = new BMap.Map("map"); // 创建地图实例
      var point = new BMap.Point(coordinates.lng, coordinates.lat); // 创建点坐标
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom();     //开启鼠标滚轮缩放
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
