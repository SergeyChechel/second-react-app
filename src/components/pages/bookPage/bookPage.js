import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BookPage extends Component {
    gotService = new GotService();

    state = {
        selectedBook: 10,
        error: false
    }

    onBookSelected = (id) => {
        this.setState({
            selectedBook: id
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

        const bookList = (
            <ItemList 
                onItemSelected={this.onBookSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`}
            />
        );
        const bookDetails = (
            <ItemDetails itemId={this.state.selectedBook} type="book">
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        );

        return (
            <RowBlock left={bookList} right={bookDetails}/>
        )
    }
}