import React from 'react';
import data from '../../flights.json';
import './index.scss';

class Aside extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            maxPrise: false,
            minPrise: false,
            duration: false,
            oneTransfer: false,
            withoutTransfer: false,
            allTransfer: false,
            captions: [],
            originalFlights: [...data.result.flights],
        };
      }

    sortByMaxPrice = () => {

        const {changeCriterionSort} = this.props;
        const criterionSort = "maxPrise";
        changeCriterionSort(criterionSort);
        this.setState({ 
            maxPrise: true,
            minPrise: false,
            duration: false, 
        })
    }
    sortByMinPrice = () => {

        const {changeCriterionSort} = this.props;
        const criterionSort = 'minPrise';
        changeCriterionSort(criterionSort)
        this.setState({ 
            maxPrise: false,
            minPrise: true,
            duration: false, 
        })
    }
    sortByDuration = () => {

        const {changeCriterionSort} = this.props;
        const criterionSort = 'duration';
        changeCriterionSort(criterionSort)
        this.setState({ 
            maxPrise: false,
            minPrise: false,
            duration: true, 
        })
    }

    filtrByAllransfer = () => {

        this.setState({ 
            oneTransfer: false,
            withoutTransfer: false,
            allTransfer: true,
        }, 
            () => {
                this.props.changefiltrByTransfer(
                    false,
                    false,
                    true 
                )
            }
        )
    }

    sendMinPrice = (e) => {
        this.props.changeMinPrice(e.target.value)
    }

    sendMaxPrice = (e) => {
        this.props.changeMaxPrice(e.target.value)
    }

    filtrByOneTransfer = () => {
        this.setState({ 
            oneTransfer: true,
            withoutTransfer: false,
            allTransfer: false,
        }, 
            () => {
                this.props.changefiltrByTransfer(
                    true,
                    false,
                    false 
                )
            }
        )
    }

    filtrByWithoutTransfer = () => {
        this.setState({ 
            oneTransfer: false,
            withoutTransfer: true,
            allTransfer: false,
        }, 
            () => {
                this.props.changefiltrByTransfer(
                    false,
                    true,
                    false 
                )
            }
        )
    }

    sortByCaption = caption => {

        const { captions } = this.state;
        const { changeFilteredCaption } =this.props;
        const updatedCaptions = [...captions]

        if (updatedCaptions.some(cap => cap.id === caption.id)) {
            const filteredCaptions = updatedCaptions.filter(cap => cap.id !== caption.id)
            changeFilteredCaption(filteredCaptions)
            return this.setState({ captions: filteredCaptions})
        }
        
        updatedCaptions.push(caption)
        this.setState({ captions: updatedCaptions })
        changeFilteredCaption(updatedCaptions)
    }


    render () {

        const { 
            maxPrise, 
            minPrise, 
            duration,
            oneTransfer,
            withoutTransfer,
            allTransfer,
            captions,
            originalFlights,
         } = this.state;
        
        const carrierFromArray = originalFlights.map((flight) => {return {name: flight.flight.carrier.caption, id: flight.flight.carrier.uid}});
        const carrier = carrierFromArray.filter((car, i, arr) => arr.findIndex(c=>(c.id === car.id)) === i)

        return (
            <aside className="aside aside__wrapper">
                <div className="aside__checkbox checkbox__wrapper">
                    <p className="aside__checkbox checkbox__heading">Сортировать</p>
                    <div className="aside__checkbox checkbox__item"
                        onClick={this.sortByMaxPrice}
                    >
                        <div 
                            className="checkbox__item_type_radio"
                        >
                            <span 
                                className={ maxPrise ? "checkbox__item_type_radio--active" : "display-none" }
                            >
                            </span>
                        </div>
                        <p className="checkbox__subscription"> по возрастанию цены</p>
                    </div>
                    <div className="aside__checkbox checkbox__item"
                        onClick={this.sortByMinPrice}   
                    >
                        <div 
                            className="checkbox__item_type_radio"
                        >
                            <span 
                                className={ minPrise ? "checkbox__item_type_radio--active" : "display-none" }
                            >
                            </span>
                        </div>
                        <p className="checkbox__subscription"> по убыванию цены</p>
                    </div>
                    <div className="aside__checkbox checkbox__item"
                        onClick={this.sortByDuration}
                    >
                        <div 
                            className="checkbox__item_type_radio"
                        >
                            <span 
                                className={ duration ? "checkbox__item_type_radio--active" : "display-none" }
                            >
                            </span>
                        </div>
                        <p className="checkbox__subscription">по времени в пути</p>
                    </div>
                </div>
                <div className="aside__checkbox checkbox__wrapper">
                    <p className="aside__checkbox checkbox__heading">Количество пересадок</p>
                    <div className="aside__checkbox checkbox__item"
                        onClick={this.filtrByWithoutTransfer}
                    >
                        <div 
                            className="checkbox__item_type_radio"
                        >
                            <span
                                className={ withoutTransfer ? "checkbox__item_type_radio--active" : "display-none" }
                            >
                            </span>
                        </div>
                        <p className="checkbox__subscription"> Без пересадок</p>
                    </div>
                    <div className="aside__checkbox checkbox__item"
                        onClick={this.filtrByOneTransfer}
                    >
                        <div className="checkbox__item_type_radio">
                            <span 
                                className={ oneTransfer ? "checkbox__item_type_radio--active" : "display-none" }
                            >
                            </span>
                        </div>
                        <p className="checkbox__subscription">С одной</p>
                    </div>
                    <div className="aside__checkbox checkbox__item"
                        onClick={this.filtrByAllransfer}
                    >
                        <div className="checkbox__item_type_radio">
                            <span 
                                className={ allTransfer ? "checkbox__item_type_radio--active" : "display-none" }
                            >
                            </span>
                        </div>
                        <p className="checkbox__subscription">Показать все варианты</p>
                    </div>
                </div>
                <div className="aside__checkbox checkbox__wrapper">
                    <p className="aside__checkbox checkbox__heading">Цена</p>
                    <div className="asidw__input">
                        <span className="input__subscription">От</span>
                        <input
                            className="aside input"
                            type="number"
                            onChange={ this.sendMinPrice }
                        ></input>
                    </div>
                    <div className="aside__input">
                        <span className="aside input__subscription">До</span>
                        <input
                            className="aside input"
                            type="number"
                            onChange={ this.sendMaxPrice }
                        ></input>
                    </div>
                </div>
                <div className="aside__checkbox checkbox__wrapper">
                    <p className="aside__checkbox checkbox__heading">Авиакомпании</p>
                    {
                        carrier.map((captionName) => {

                            return (
                                <div key={captionName.id} className="aside__checkbox checkbox__item"
                                    onClick={() => this.sortByCaption(captionName)}
                                >
                                    <div 
                                        className="checkbox__item_type_box"
                                    >
                                        <span 
                                            className={captions.some((caption) => captionName.name === caption.name ) ? 
                                                "checkbox__item_type_box--active" : "display-none"}
                                        >
                                            &#10004;
                                        </span>
                                    </div>
                                    <p className="checkbox__subscription">{captionName.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </aside>
        )
    }

}

export default Aside;