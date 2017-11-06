import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import {MapContainer} from "./components/custom";
import {MyMapComponent} from "./components/MapDiv/MyMapComponent";
import API from "./utils/API";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {

  state = {
    locationSearch: "",
    location: '',
    latitude: null,
    longitude: null,
    results: null
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLocationSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    this.setState({
      location: this.state.locationSearch
    })

    API.getLocation(this.state.locationSearch)
      .then(res => {
        this.setState({ 
          results: res.data
         });
        this.setState({ 
          latitude: res.data.results[0].geometry.location.lat
         });
        this.setState({ 
          longitude: res.data.results[0].geometry.location.lng
         });
        
        console.log(res.data);

        // latCoord = this.props._location.results[0].geometry.location.lat;
        // lngCoord = this.props._location.results[0].geometry.location.lat;

        // initMap(latCoord, lngCoord)
      })
      // .then(function(latCoord, lngCoord){
      //   // initMap(latCoord, lngCoord);

      // })
      .catch(err => console.log(err));
      // initMap(latCoord, lngCoord)
  };

  
  // initMap = (latCoord1, lngCoord1) =>{
  //   console.log("inside initMap");
  //   latCoord = this.props._location.results[0].geometry.location.lat;
  //   lngCoord = this.props._location.results[0].geometry.location.lat;
  //   console.log(latCoord);
  // };




      // latCoord = this.props._location.results[0].geometry.location.lat;
      // lngCoord = this.props._location.results[0].geometry.location.lat;

  

  render() {
    return (
      <div>
        <Nav />
        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="locationSearch"
                        value={this.state.locationSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search a Location"
                        id="location-input"
                      />
                      
                    </Col>
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleLocationSubmit}
                        type="success" 
                        className="btn btn-primary"
                      >Search</Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
                {!this.state.results ? 
                <h1 className="text-center">No Location to Display</h1>
               : <MapContainer _location={this.state.results} /> }
            </Col>
            <Col size="xs-12">
                <MyMapComponent 
                  google={this.props.google}
                  center= {{lat: this.state.latitude, lng: this.state.longitude}}
                  containerElement={<div style={{ height: `400px` }} />}
                  
                  mapElement={<div style={{ height: `100%` }} />}
/>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default App;
