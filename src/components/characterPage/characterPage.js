import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class CharacterPage extends Component {
    gotService = new GotService();

    state = {
        selectedChar: 130,
        error: false
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
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

        const charList = (
            <ItemList 
                onItemSelected={this.onCharSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        );
        const charDetails = (
            <ItemDetails itemId={this.state.selectedChar} type="char">
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={charList} right={charDetails}/>
        )
    }
}