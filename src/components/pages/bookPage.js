import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';


class BookPage extends Component {
    gotService = new GotService();

    state = {
        error: false
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
        console.log(this.gotService.getAllBooks());
        return (
            <ItemList 
                type="book"
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`}
            />
        )
    }
}

export default withRouter(BookPage);