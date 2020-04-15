import React, { Component } from 'react';
import './App.css';

import { 
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  InputGroupAddon,
  Button
} from 'reactstrap';

import Weather from './Weather';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      weather: null,
      cityList: [],
      newCityName: ""
    }
  }

  handleInputChange = (e) => {

    this.setState({ newCityName: e.target.value });

  };


  getCityList = () => {
    fetch('/api/cities')
    .then( res =>res.json())
    .then( res => {
      var cityList = res.map(r => r.city_name);
      this.setState({ cityList });
    });
  };


  componentDidMount() {
    this.getCityList();
  }

  render () {
    return (
      // <div className="App">
      <Container fluid className="centered App">
        
        <Navbar dark color="dark">
          <NavbarBrand href="/">Myweather</NavbarBrand>
        </Navbar>

        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">MyWeather</h1>
              <p className="lead">The current weather for your favorite cities</p>

              <InputGroup>
                <Input
                  placeholder="New City Name..."
                  value={this.state.newCityName}
                  onChange={this.handleInputChange}
                />

                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                </InputGroupAddon>            
            
              </InputGroup>

            </Jumbotron>

            
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>

        <Weather />

      </Container>

        // <h1> Weather App</h1>
        // <h3>Feat: React, Express, PostgreSQL & ReactStrap</h3>
        // <p>sdfgegertgery5gtre</p>
      // </div>
    );
  }
}

export default App;
