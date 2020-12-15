import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousePage extends Component {
    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onHouseSelected = (id) => {
        this.setState({
            selectedHouse: id
        });
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    render () {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const houseList = (
            <ItemList 
                onItemSelected={this.onHouseSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name, region}) => `${name} (${region})`}
            />
        );
        const houseDetails = (
            <ItemDetails itemId={this.state.selectedHouse} type="house">
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='AncestralWeapons'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={houseList} right={houseDetails}/>
        )
    }
}