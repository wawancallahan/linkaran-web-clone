import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "../../components/Headers/Header";
import withTitle from "../../hoc/WithTitle";

import io from "socket.io-client";
import { OptionObjectString } from "../../helpers/utils";
import "./Dashboard.css";
import { join } from "path";

type State = {
  mapIsReady: boolean;
};

type Props = {};

class Index extends React.Component<Props, State> {
  get baseUrl() {
    if (window.location.host == "admin.linkaran.co.id") {
      return "https://app.linkaran.co.id";
    }
    return "https://linkaran.demo.thortech.asia";
  }

  state = {
    mapIsReady: false,
  };

  getIconOrder = (
    service: any,
    vehicleType: any,
    maxRadius: any,
    minRadius: any,
    maxDriverDistanceRadius: any
  ) => {
    let serviceCode;
    if (service.code == "linksend") {
      serviceCode = "send";
    }

    if (service.code == "linkfood") {
      serviceCode = "food";
    }

    if (service.code == "linkcar") {
      if (vehicleType.code === "car") {
        serviceCode = "car_reguler";
      } else {
        serviceCode = "car_large";
      }
    }

    if (service.code == "linkride") {
      serviceCode = "bike";
    }

    const MaxRad = maxRadius;
    const MinRad = minRadius;
    const MBRad = maxDriverDistanceRadius;

    return {
      anchor: new google.maps.Point(31, 72),
      size: new google.maps.Size(62, 72),
      origin: new google.maps.Point(0, 0),
      url: `${this.baseUrl}/api/icon/req/${MaxRad}-${MBRad}/${serviceCode}.svg`,
    };
  };

  componentDidMount() {
    // Load the Google Maps API
    const script = document.createElement("script");
    const API = "AIzaSyDVVH8FAlEV9UWK0dKxWwkUSola2Ll24Hs";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}`;
    script.async = true;

    script.addEventListener("load", () => {
      this.setState({ mapIsReady: true });
    });

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    if (this.state.mapIsReady) {
      const colors = ["#97CA56", "#56A0CA", "#EF9F8D", "#CA56B0", "#FDCE54"];
      let destinationMarker: any = null;
      let boundDestinationMarker: any = null;
      let defaultZoom = 12;
      const driverMarker = new Map();
      const driverData = new Map();
      const broadcastMarker = new Map();
      const broadcastData = new Map();

      const socket = io(join(this.baseUrl, "admin"), {
        path: "/ws/socket.io",
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        const samarinda = new google.maps.LatLng(-0.450917, 117.169534);

        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: defaultZoom,
          center: samarinda,
        });

        // Add Point Samarinda
        new google.maps.Marker({
          map: map,
          position: samarinda,
        });

        socket.on("driver-location", (response: any) => {
          if (["new", "update"].find((it) => it === response.event)) {
            const {
              driver: {
                location: { coordinates },
                driverInformation: { vehicleTypeCode },
                id,
              },
              order,
            } = response;

            const vt = vehicleTypeCode.startsWith("car")
              ? vehicleTypeCode.endsWith("l")
                ? "car/large"
                : "car/reguler"
              : vehicleTypeCode;

            let status: any;

            if (order) {
              if (order.transaction.status == "driver-found") {
                const statusDriverFound: OptionObjectString = {
                  linkride: "on-the-way",
                  linkcar: "on-the-way",
                  linksend: "on-the-way",
                  linkfood: "on-the-way",
                };
                status =
                  statusDriverFound[order.transaction.service.code as string];
              }
              if (order.transaction.status == "driver-arrived") {
                const statusDriverFound: OptionObjectString = {
                  linkride: "drop-off",
                  linkcar: "drop-off",
                  linksend: "waiting",
                  linkfood: "waiting",
                };
                status =
                  statusDriverFound[order.transaction.service.code as string];
              }
              if (order.transaction.status == "driver-take-order") {
                const statusDriverFound: OptionObjectString = {
                  linksend: "delivery-item",
                  linkfood: "delivery-item",
                };
                status =
                  statusDriverFound[order.transaction.service.code as string];
              }
              // status = order.transaction.status;
            }

            if (!status) {
              status = "iddle";
            }

            let marker: google.maps.Marker;

            const icon = {
              // anchor: new google.maps.Point(19, 60),
              // size: new google.maps.Size(39, 60),
              origin: new google.maps.Point(0, 0),
              url: `${this.baseUrl}/api/icon/${vt}/${status}.svg`,
            };

            if (driverMarker.has(id)) {
              marker = driverMarker.get(id);
            } else {
              marker = new google.maps.Marker();
              marker.setMap(map);

              marker.addListener("click", function (
                this: any,
                event: google.maps.MouseEvent
              ) {
                const informationNode = document.getElementById("information");

                if (informationNode !== null) {
                  informationNode.innerHTML = "";
                }

                const getOrder = this.get("order");

                const getDriver = this.get("driver");

                if (getDriver) {
                  if (informationNode !== null) {
                    const informationDriverDetail = document.createElement(
                      "div"
                    );

                    informationDriverDetail.innerHTML = `<pre>${JSON.stringify(
                      getDriver,
                      null,
                      "\t"
                    )}</pre>`;

                    informationNode.appendChild(informationDriverDetail);
                  }
                }

                if (destinationMarker) {
                  if (getOrder && destinationMarker.orderId == getOrder.id) {
                    if (map.getZoom() < 20) {
                      map.panTo(event.latLng);
                      map.setZoom(20);
                    } else {
                      map.fitBounds(boundDestinationMarker, 0);
                    }

                    return;
                  } else {
                    destinationMarker.setMap(null);
                    destinationMarker = null;
                    boundDestinationMarker = null;
                  }
                }

                if (getOrder) {
                  if (informationNode !== null) {
                    const informationOrderDetail = document.createElement(
                      "div"
                    );

                    informationOrderDetail.innerHTML = `<pre>${JSON.stringify(
                      getOrder,
                      null,
                      "\t"
                    )}</pre>`;

                    informationNode.appendChild(informationOrderDetail);
                  }

                  boundDestinationMarker = new google.maps.LatLngBounds();

                  const { service, vehicleType } = getOrder.transaction;

                  const [lng, lat] = getOrder.transaction.origin.coordinates;

                  const icon = this.getIconOrder(service, vehicleType, 1, 1, 1);

                  destinationMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map,
                    icon,
                  });

                  destinationMarker.set("orderId", getOrder.id);

                  destinationMarker.addListener("click", function () {
                    if (map.getZoom() < 20) {
                      map.panTo(destinationMarker.getPosition());
                      map.setZoom(20);
                    } else {
                      map.fitBounds(boundDestinationMarker, 0);
                    }
                  });

                  boundDestinationMarker.extend(
                    destinationMarker.getPosition()
                  );

                  boundDestinationMarker.extend(marker.getPosition());
                  map.fitBounds(boundDestinationMarker, 0);
                } else {
                  if (map.getZoom() >= 20) {
                    map.setZoom(defaultZoom);
                    map.setCenter(samarinda);
                  } else {
                    map.setZoom(20);
                    map.setCenter(marker.getPosition());
                  }
                }
              });
            }
            const pos = new google.maps.LatLng(coordinates[1], coordinates[0]);

            driverMarker.set(id, marker);
            marker.setIcon(icon);
            marker.setPosition(pos);
            marker.set("order", order);
            marker.set("driver", response.driver);
          } else if (
            response.event === "delete" &&
            driverMarker.has(response.driver.id)
          ) {
            const { id } = response.driver;
            const marker = driverMarker.get(id);
            marker.setMap(null);
            driverMarker.delete(id);
            driverData.delete(id);
          }
        });

        socket.on("broadcast-location", (response: any) => {
          const { dataViewDetailOrder } = response.data;

          const { service, vehicleType } = dataViewDetailOrder.transaction;

          const icon = this.getIconOrder(
            service,
            vehicleType,
            response.data.maxRadius,
            response.data.minRadius,
            response.data.maxDriverDistanceRadius
          );

          const pos = new google.maps.LatLng(
            dataViewDetailOrder.transaction.destination.lat,
            dataViewDetailOrder.transaction.destination.lng
          );

          let marker;
          if (response.event !== "remove") {
            if (response.event == "initial" || response.event == "add") {
              marker = new google.maps.Marker({
                map: map,
                position: pos,
              });
              broadcastMarker.set(response.data.id, marker);
            } else {
              marker = broadcastMarker.get(response.data.id);
            }
            marker.setIcon(icon);
          } else {
            marker = broadcastMarker.get(response.data.id);
            if (marker) {
              marker.setMap(null);
            }
            broadcastMarker.delete(response.data.id);
          }
          // const color = '#FF0000';
        });

        socket.emit("sub-broadcast-location", "kota samarinda");
        socket.emit("sub-driver-location");
      });
    }
  }

  render() {
    return (
      <>
        <Header />

        <Container className="mt--7" fluid>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    <Col xs={12}>
                      <div id="map"></div>
                    </Col>
                    <Col xs={12}>
                      <div id="information"></div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withTitle(Index, "Dashboard");
