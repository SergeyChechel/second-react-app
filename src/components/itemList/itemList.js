import React, {Component} from 'react';
import Spinner from '../spinner/';
import './itemList.css';
import PropTypes from 'prop-types'
import GotService from '../../services/gotService';

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

const withData = (View, getData) => {
    return class extends Component {
        
        state = {
            data: null
        }
    
        componentDidMount() {
            getData()
                .then(data => {
                    this.setState({data});
                })
        }

        
        render () {
            console.log(this.state)
            const {data} = this.state;
            console.log(data);
            if (!data) {
                return <Spinner/>
            }

            return <View {...this.props} data={data}/>
        }

    };
};

const {getAllCharacters} = new GotService();

export default withData(ItemList, getAllCharacters);
