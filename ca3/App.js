import React from 'react';
import { serverURL } from "./config.json";
import { View } from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            initialPlaces: []
        }
    }

    filterList = (event) => {
        var updatedList = this.state.initialPlaces;
        var value = event.target.value.toLowerCase();
        updatedList = updatedList.filter(function (place) {
            return place.city.toLowerCase().search(value) !== -1 
            || place.description.toLowerCase().search(value) !== -1
        });
        this.setState({ places: updatedList })
    }

    componentDidMount() {
        fetch(serverURL + "api/places")
            .then(res => {
                return res.json();
            })
            .then(places => {
                this.setState({
                    places: places,
                    initialPlaces: places
                });

            })

    }

    render() {
        const places = this.state.places;
        console.log("render places", places);
        return (
            <view className="container">
                <view>
                    <input type="text" placeholder="search" onChange={this.filterList} />


                </view>
                <view className="row">
                    {
                        places.map((place) => {
                            return (
                                <view key={place.id} className="col-sm-2" style={{ width: 254 }}>
                                    <img src={place.imageUrl} style={{ width: 250 }} />
                                    <view >
                                        <h4 >{place.city}</h4>
                                        <p >{place.description}</p>
                                    </view>
                                </view>
                            )

                        })
                    }
                </view>
            </view>
        )
    }
}

