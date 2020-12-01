import React, {Component} from 'react';
import Spinner from '../spinner/';
import './itemList.css';
import PropTypes from 'prop-types'
import GotService from '../../services/gotService';
import withData from '../withData';


const ItemList = (props) => {
    
    const renderItems = (arr) => {
        return arr.map((item, i) => {
            const {id} = item;
            const label = props.renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => props.onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }

    function render() {
        const {data} = props;
        const items = renderItems(data);
        console.log(items);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
    
    return render();
}

ItemList.defaultProps = {
    onItemSelected: () => {},
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func
}

const {getAllCharacters} = new GotService();

export default withData(ItemList, getAllCharacters);

export {ItemList};



