import React, {Component} from 'react';
import Spinner from '../spinner/';


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

export default withData;
