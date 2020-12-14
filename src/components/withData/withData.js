import React, {Component} from 'react';
import Spinner from '../spinner/';


const withData = (View, gotService) => {

    const {getAllCharacters, getAllHouses, getAllBooks} = gotService;
    
    let getData;

    console.log(View.props);

    switch (View.props.type) {
        case 'char': getData = getAllCharacters; break;
        case 'book': getData = getAllBooks; break;
        case 'house': getData = getAllHouses; break;
        default: getData = getAllCharacters;
    }
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
            const {data} = this.state;
            if (!data) {
                return <Spinner/>
            }
            return <View {...this.props} data={data}/>
        }

    };
};

export default withData;
