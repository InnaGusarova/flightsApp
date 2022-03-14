import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import './index.scss';

moment.locale('ru');

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      showItem: 2,
    };
  }
  componentDidMount() {

    const flights = [...this.props.flights.slice(0, 2)]
    this.setState({flights});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.flights !== this.props.flights) {
      const flights = [...this.props.flights.slice(0, 2)]
      this.setState({flights})
    }
  }

  cityNameExist = (segment) => {
    
    if (segment.departureAirport.caption.includes(',') || segment.departureAirport.caption.includes('(')) {
      return `${segment.departureAirport.caption} `
    } 
    return ` ${segment.departureCity.caption}, ${segment.departureAirport.caption} `
  }

  departureDate = (departureDate) => {

    const date1 = moment(departureDate).format('DD MMM dd');
    const date2 = moment(departureDate).format('hh:mm');
    return (
      <p className="card-flight__time">
        {date2}<span className="blu-text">{date1}</span>
      </p>
    )
  }

  arrivalDate = (arrivalDate) => {

    const date1 = moment(arrivalDate).format('DD MMM dd');
    const date2 = moment(arrivalDate).format('hh:mm');
    return (
      <p className="card-flight__time"><span className="blu-text">{date1}</span>{date2}</p>
    )
  }

  duration = (duration) => {

    const hour = parseInt(duration/60);
    const min = duration - (hour*60);
    return (
      `${hour} ч ${min} мин`
    );
  }

  setShowItem = () => {

    const current = this.state.showItem + 2;
    const flights = this.props.flights.slice(0, current)
    this.setState({flights, showItem: current})
  }

  render () {
    const {flights} = this.state;
    if (flights.length > 0) {
      return (
        <main className="main__wrapper">
            {
              flights.map((flight, i) => {
                const legs = flight.flight.legs;
                const carrier = flight.flight.carrier;
                  return (
                      <div key={i} className="main__card-flight">
                        <div className="card-flight__header">
                          <div className="header__text">
                            <p>
                              {`${flight.flight.price.total.amount} ${flight.flight.price.total.currency}`}
                            </p>
                            <p className="card__header_subscribtion">Стоимость для одного взрослого пассажира</p>
                          </div>
                        </div>
                        <div>
                          <div className="card-flight__body">
                            <p className="card-flight__text grey-line">
                              {
                                this.cityNameExist(legs[0].segments[0])
                              }	
                              <span className="blu-text">
                                {` (${legs[0].segments[0].departureAirport.uid}) `} &#8594;
                              </span> 
                              {
                                this.cityNameExist(legs[0].segments[legs[0].segments.length - 1])
                              }
                              <span className="blu-text">
                              {`(${legs[0].segments[0].arrivalAirport.uid})`} 
                              </span>
                            </p>
                            <div className="card-flight__time">
                              <p>
                              {
                                this.departureDate(legs[0].segments[0].departureDate)
                              }
                              </p>
                              <p className="card-flight__time-dutation">🕙 {this.duration(legs[0].duration)}</p>
                              <p>
                              {
                                this.arrivalDate(legs[0].segments[legs[0].segments.length - 1].arrivalDate)
                              }
                              </p>
                              
                            </div>
                              {
                                legs[0].segments.length > 1 ?
                                (
                                  <p className="card-flight__time_transfer-line">
                                    <span className="card-flight__time_transfer">
                                      1 пересадка
                                    </span>
                                  </p>
                                  ) : null
                              }
                            <p className="card-flight__text blue-line margin-top ">Рейс выполняет: {carrier.airlineCode} {carrier.caption}</p>
                          </div>
                          <div className="card-flight__body">
                          <p className="card-flight__text grey-line">
                              {
                                this.cityNameExist(legs[1].segments[0])
                              }
                              <span className="blu-text">
                                {` (${legs[1].segments[0].departureAirport.uid}) `} &#8594;
                              </span> 
                              {
                                this.cityNameExist(legs[1].segments[legs[1].segments.length-1])
                              }
                              <span className="blu-text">
                              {` (${legs[1].segments[0].arrivalAirport.uid}) `} 
                              </span>
                            </p>
                              <div className="card-flight__time">
                                <p>
                                {
                                  this.departureDate(legs[1].segments[0].departureDate)
                                }
                                </p>
                                <p className="card-flight__time-dutation">🕙 {this.duration(legs[1].duration)}</p>
                                <p>
                                {
                                  this.arrivalDate(legs[1].segments[legs[1].segments.length - 1].arrivalDate)
                                }
                                </p>
                              </div>
                              {
                                legs[1].segments.length > 1 ?
                                (
                                  <p className={"card-flight__time_transfer-line"}>
                                    <span className="card-flight__time_transfer">
                                      1 пересадка
                                    </span>
                                  </p>
                                  ) : null
                              }
                              <p className="card-flight__text margin-top" >Рейс выполняет: {carrier.airlineCode} {carrier.caption}</p>
                          </div>
                        </div>
                        <button className="card-flight__button">
                            ВЫБРАТЬ
                        </button>
                      </div>
                    )
                })
            }
          <button  
            className="main__button"
            onClick={this.setShowItem}
          >
              Показать еще
          </button>
        </main>
      )
    }
    return(
      <div>
        К сожалению, по Вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
      </div>
    ) ;
  }
};

export default Main;