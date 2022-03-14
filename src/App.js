import React from 'react';
import Main from './components/Main';
import Aside from './components/Aside';
import data from './flights.json';
import './App.css';
import { max } from 'moment';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flights: [...data.result.flights],
      criterionSort: '',
      oneTransfer: false,
      withoutTransfer: false,
      allTransfer: true,
      filteredCaption: [],
      minPrice: null,
      maxPrice: null,

    };
  }


  componentDidUpdate(prevProps, prevState) {
    const {
      criterionSort, 
      oneTransfer, 
      withoutTransfer, 
      allTransfer,
      filteredCaption,
      minPrice,
      maxPrice,
    } = this.state;
    let newFlights = [...data.result.flights]

    if (
      prevState.criterionSort !== criterionSort ||
      prevState.oneTransfer !== oneTransfer ||
      prevState.withoutTransfer !== withoutTransfer ||
      prevState.allTransfer !== allTransfer || 
      prevState.filteredCaption !== filteredCaption ||
      prevState.minPrice !== minPrice ||
      prevState.maxPrice !== maxPrice
      ) {
      newFlights = this.sort(newFlights)
      newFlights = this.filterByTransfer(newFlights)
      newFlights = this.filterByCaption(newFlights)
      newFlights = this.filterByPrice(newFlights)
      console.log('FLIGHTS', newFlights)
      this.setState({flights: newFlights})
    } 
  }

  changeCriterionSort = (criterionSort) => {

    this.setState({criterionSort});
  }

  changefiltrByTransfer = (

    oneTransfer,
    withoutTransfer,
    allTransfer) => {
      this.setState({
        withoutTransfer, 
        oneTransfer, 
        allTransfer,
      });
  }

  changeMinPrice = (minPrice) => {
    this.setState({ minPrice });
  }

  changeMaxPrice = (maxPrice) => {
    this.setState({ maxPrice });
  }

  changeFilteredCaption = (filteredCaption) => {
    this.setState({filteredCaption});
  }

  filterByTransfer = (flights) => {

    const { oneTransfer, withoutTransfer, allTransfer} = this.state;

    if (oneTransfer) {
      const filterdFlights = flights.filter((flight) => {
        return (
          flight.flight.legs[0].segments.length > 1 && flight.flight.legs[1].segments.length > 1
        )
      })
      return filterdFlights
    }
    if (withoutTransfer) {
      const filterdFlights = flights.filter((flight) => {
        return (
          flight.flight.legs[0].segments.length === 1 && flight.flight.legs[1].segments.length === 1
        )
      })
      return filterdFlights
    }
    if (allTransfer) {
      return flights
    }
    return flights
    
  }
  filterByCaption = (flights) => {

    const filteredCaption = [...this.state.filteredCaption]
    const filteredFlights = flights.filter(flight => filteredCaption.find(caption => flight.flight.carrier.caption === caption.name))
    if (filteredFlights.length > 0) {
      return filteredFlights
    }
    return flights


  }

  filterByPrice = (flights) => {
    const {  minPrice, maxPrice } = this.state;
    let newFlights = [...flights];
    let filteredFlights;

    if (minPrice) {
      filteredFlights = newFlights.filter((flight) =>  +flight.flight.price.total.amount > +minPrice)
    }
    if (minPrice && maxPrice) {
      filteredFlights = filteredFlights.filter((flight) => +flight.flight.price.total.amount < +maxPrice)
    }
    if (maxPrice) {
      filteredFlights = newFlights.filter((flight) => +flight.flight.price.total.amount < +maxPrice)
    }
    if (!maxPrice) {
      return [...newFlights]
    }
    return [...filteredFlights]

  }

  sort = (flights) => {

    const {criterionSort} = this.state;
    if (criterionSort === 'maxPrise') {

      flights.sort((a, b) => {
        if (+a.flight.price.total.amount > +b.flight.price.total.amount) {
          return 1;
        }
        if (+a.flight.price.total.amount < +b.flight.price.total.amount) {
          return -1;
        }
        return 0;
      })
      return flights
    }
    if (criterionSort === 'minPrise') {
      flights.sort((a, b) => {
        if (+a.flight.price.total.amount > +b.flight.price.total.amount) {
          return -1;
        }
        if (+a.flight.price.total.amount < +b.flight.price.total.amount) {
          return 1;
        }
        return 0;
      })
      return flights
    }
    if (criterionSort === 'duration') {
      flights.sort((a, b) => {
        if ((+a.flight.legs[0].duration + +a.flight.legs[1].duration) > (+b.flight.legs[0].duration + +b.flight.legs[1].duration)) {
          return 1;
        }
        if ((+a.flight.legs[0].duration + +a.flight.legs[1].duration) < (+b.flight.legs[0].duration + +b.flight.legs[1].duration)) {
          return -1;
        }
        return 0;
      })
      return flights
    }
    return flights
  }


  render () {

    console.log(this.state.flights)
    return (
      <React.Fragment>
          <Aside
            flights={this.state.flights}
            changeCriterionSort={this.changeCriterionSort}
            changefiltrByTransfer={this.changefiltrByTransfer}
            changeFilteredCaption={this.changeFilteredCaption}
            changeMinPrice={this.changeMinPrice}
            changeMaxPrice={this.changeMaxPrice}
            
          />
          <Main
            flights={this.state.flights}
          />
      </React.Fragment>
    );
  }
}

export default App;
