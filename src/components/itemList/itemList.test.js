import React from 'react';
import ItemList from './itemList';
import {mount} from 'enzyme';
import gotService from '../../services/gotService';



describe('Testing <ItemList/>', () => {
    const service = new gotService();
    const list = mount(<ItemList
        getData={service.getAllHouses}
        renderItem={({name}) => name}
    />);
    

    it('Click on item on the list must cause rerendering all list', () => {
        list.setState({
            itemList: [{name: 'test1', id: 1}, {name: 'test2', id: 2}],
            data: [{name: 'test1', id: 1}, {name: 'test2', id: 2}]
        });

        list.find('.list-group-item:first-child').simulate('click');
        expect(list.find('ul')).toHaveLength(1);
    });
})