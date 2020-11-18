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
  Col
} from "reactstrap";

import Tooltip from '../../components/Tooltip/Tooltip'

import Header from "../../components/Headers/Header";
import withTitle from "../../hoc/WithTitle";

import io from "socket.io-client";
import { OptionObjectString } from "../../helpers/utils";
import "./Dashboard.css";
import _ from 'lodash'
import * as renderjson from 'renderjson'
import { pSBC } from "../../helpers/pbsc"

type IIcoStatus = {
    code: string,
    message: string
}

type State = {
  mapIsReady: boolean;
};

type Props = {};

class Index extends React.Component<Props, State> {
  get baseUrl() {
    if (window.location.host == "admin.linkaran.co.id") {
      return "https://app.linkaran.co.id";
    }
    return "https://linkaran-api.thortech.asia";
  }

  private script = document.createElement("script");
  private socket: SocketIOClient.Socket = io(`${this.baseUrl}/admin`, {
    path: "/ws/socket.io",
    transports: ["websocket"],
  });

  state = {
    mapIsReady: false,
  };

  componentDidMount() {
    // Load the Google Maps API
    // const API = "AIzaSyDVVH8FAlEV9UWK0dKxWwkUSola2Ll24Hs";
    // this.script.src = `https://maps.googleapis.com/maps/api/js?key=${API}`;
    // this.script.async = true;

    // this.script.addEventListener("load", () => {
      this.setState({ mapIsReady: true });
    // });

    // document.body.appendChild(this.script);
  }

  componentDidUpdate() {

    const getIconOrder = (
      service: any,
      vehicleType: any,
      numRetry: any,
    ) => {
      let serviceCode;
      if (service.code == 'linksend') {
        serviceCode = 'send';
      }
      if (service.code == 'linkfood') {
        serviceCode = 'food';
      }
      if (service.code == 'linkcar') {
        if (vehicleType.code === 'car') {
          serviceCode = 'car_reguler';
        } else {
          serviceCode = 'car_large';
        }
      }
      if (service.code == 'linkride') {
        serviceCode = 'bike';
      }
      const MaxRad = 10;
      const MinRad = numRetry;
      return {
        anchor: new google.maps.Point(31, 72),
        size: new google.maps.Size(62, 72),
        origin: new google.maps.Point(0, 0),
        url: `${this.baseUrl}/api/icon/req/${MinRad}-${MaxRad}/${serviceCode}.svg`,
      };
    }

    if (this.state.mapIsReady) {
      const colors = ['#97CA56', '#56A0CA', '#EF9F8D', '#CA56B0', '#FDCE54'];
      let destinationMarker: any = null;
      let boundDestinationMarker: any = null;
      let defaultZoom = 12;
      const driverMarker = new Map();
      const broadcastMarker = new Map();
      const broadcastData = new Map();
      setInterval( () =>
      {
        for (const key of driverMarker.keys()) {
          const{ marker, status, lastUpdate } = driverMarker.get(key)
          
            if(status === 'iddle'){

              const difftime = new Date().getTime() - lastUpdate.getTime();
              if(difftime > 6000){
                driverMarker.delete(key);
                marker.setMap( null );
              }
            }
        }
      }, 5000 );

      this.socket.on('connect', () => {
        var samarinda = new google.maps.LatLng(-0.450917, 117.169534);
        // The map, centered at Uluru
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: defaultZoom,
          center: samarinda,
        });
        // drawPolygon(map);
        new google.maps.Marker({
          map: map,
          position: samarinda,
        });

        this.socket
          .on('driver-location', (data: any) => {
            if (['new', 'update'].find(it => it === data.event)) {
              const {
                driver: {
                  location,
                  driverProfile: { vehicleTypeCode },                  lastUpdateLocation,
                  id,
                },
                order,
              } = data;
              const vt = vehicleTypeCode.startsWith('car')
                ? vehicleTypeCode.endsWith('l')
                  ? 'car/large'
                  : 'car/reguler'
                : vehicleTypeCode;
              let status;
              if (order) {
                if (order.transaction.status == 'driver-found') {
                  const statusDriverFound: OptionObjectString = {
                    linkride: 'on-the-way',
                    linkcar: 'on-the-way',
                    linksend: 'on-the-way',
                    linkfood: 'on-the-way',
                  };
                  status = statusDriverFound[order.transaction.service.code as string];
                }
                if (order.transaction.status == 'driver-arrived') {
                  const statusDriverFound: OptionObjectString = {
                    linkride: 'drop-off',
                    linkcar: 'drop-off',
                    linksend: 'waiting',
                    linkfood: 'waiting',
                  };
                  status = statusDriverFound[order.transaction.service.code as string];
                }
                if (order.transaction.status == 'driver-take-order') {
                  const statusDriverFound: OptionObjectString = {
                    linksend: 'delivery-item',
                    linkfood: 'delivery-item',
                  };
                  status = statusDriverFound[order.transaction.service.code as string];
                }

                // status = order.transaction.status;
              }
              if (!status) {
                status = 'iddle';
              }
              let marker: any;
              const icon = {
                // anchor: new google.maps.Point(19, 60),
                // size: new google.maps.Size(39, 60),
                origin: new google.maps.Point(0, 0),
                url: `${this.baseUrl}/api/icon/${vt}/${status}.svg`,
              };
              if (driverMarker.has(id)) {
                marker = driverMarker.get(id).marker;
              } else {
                marker = new google.maps.Marker();
                marker.setMap(map);

                marker.addListener('click', function(this: any, vent: google.maps.MouseEvent) {
                  if (destinationMarker) {
                    if (
                      this.order &&
                      destinationMarker.orderId == this.order.id
                    ) {
                      if (map.getZoom() < 20) {
                        map.panTo(this.getPosition());
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
                  if (this.order) {
                    const informationNode = document.getElementById("information");
                    if (informationNode !== null) {
                      informationNode
                      .appendChild(
                        renderjson({ ...this.order, driver: this.driver }),
                      );
                    }
                    
                    boundDestinationMarker = new google.maps.LatLngBounds();
                    const { service, vehicleType } = this.order.transaction;
                    const [
                      lng,
                      lat,
                    ] = this.order.transaction.origin.coordinates;
                    const icon = getIconOrder(service, vehicleType, 1);
                    destinationMarker = new google.maps.Marker({
                      position: new google.maps.LatLng(lat, lng),
                      map,
                      icon
                    });
                    destinationMarker.set("orderId", this.order.id);

                    destinationMarker.addListener('click', function() {
                      if (map.getZoom() < 20) {
                        map.panTo(destinationMarker.getPosition());
                        map.setZoom(20);
                      } else {
                        map.fitBounds(boundDestinationMarker, 0);
                      }
                    });
                    boundDestinationMarker.extend(
                      destinationMarker.getPosition(),
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
              marker.setOptions({ order, driver: data.driver });
              driverMarker.set(id, {marker, status, lastUpdate: new Date()});
              const pos = new google.maps.LatLng(
                location.lat,
                location.lng,
              );
              marker.setIcon(icon);
              marker.setPosition(pos);
            } 
          })
          .on('broadcast-location', (response: any) => {
            const { data, event } = response;

            let marker: any;
            if (event !== 'delete') {
              const { order:{transaction:{origin, service, vehicleType}}, numRetry } = data;
              const icon = getIconOrder(
                service,
                vehicleType,
                numRetry,
              );
              const pos = new google.maps.LatLng(
                origin.lat,
                origin.lng,
              );
              if(broadcastMarker.has(data._id)){
                marker = broadcastMarker.get(data._id);
              }else{
                marker = new google.maps.Marker( {
                  map: map,
                  position: pos,
                } );
                broadcastMarker.set( data._id, marker );
              }
              marker.setIcon(icon);
            } else {
              marker = broadcastMarker.get(data._id);
              console.log(marker);
              console.log( broadcastMarker);
              if (marker) {
                marker.setMap(null);
              }
              broadcastMarker.delete(data._id);
            }
            // const color = '#FF0000';
          })
          .emit('sub-broadcast-location', 'kota samarinda')
          .emit('sub-driver-location');
      });
    }
  }

  render() {

    const icoStatus: IIcoStatus[] = [
        { code: "car/large/iddle", message: "Car Large Idle" },
        { code: "car/large/drop-off", message: "Car Large Drop Off" },
        { code: "car/large/on-the-way", message: "Car Large On The Way" },
        { code: "car/large/waiting", message: "Car Large Waiting" },
        { code: "car/large/delivery-item", message: "Car Large Delivery Item" },
        { code: "car/reguler/iddle", message: "Car Idle" },
        { code: "car/reguler/drop-off", message: "Car Drop Off" },
        { code: "car/reguler/on-the-way", message: "Car On The Way" },
        { code: "car/reguler/waiting", message: "Car Waiting" },
        { code: "car/reguler/delivery-item", message: "Car Delivery Item" },
        { code: "motorcycle/iddle", message: "Motorcycle Idle" },
        { code: "motorcycle/drop-off", message: "Motorcycle Drop Off" },
        { code: "motorcycle/on-the-way", message: "Motorcycle On The Way" },
        { code: "motorcycle/waiting", message: "Motorcycle Waiting" },
        { code: "motorcycle/delivery-item", message: "Motorcycle Delivery Item" },
    ];

    return (
      <>
        <Header />

        <Container className="mt--7" fluid>
          <Row>
            <Col>
              <Card>
                <CardBody>
                    <h3>Informasi Icon</h3>
                    <div>
                      {icoStatus.map((item: IIcoStatus, index: number) => {
                          return <Tooltip baseUrl={this.baseUrl} 
                                          code={item.code} 
                                          message={item.message} 
                                          index={index} 
                                          key={index} />
                      })}
                    </div>
                    <h3>Maps Driver</h3>
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
