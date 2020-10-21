import React from 'react';
import Box from '@iso/components/utility/box';
import Tabs from '@iso/components/uielements/tabs';
import _ from 'lodash';


class SelectionArea extends React.Component {

shouldComponentUpdate(prevProps){
    if(_.isEqual(prevProps.rawData, this.props.rawData) && _.isEqual(prevProps.searchParams, this.props.searchParams)){
        return false;
    }
    else {
        console.log('selection area has rerendered;')
        return true;
    }
}

    render() {
        return (
            <Box title={this.props.title}>
                {this.props.children}
                <Tabs onChange={this.props.tabSwitch} type="card" style={this.props.tabsStyle}>
                    {this.props.data}
                </Tabs>
            </Box>
        )
    }
}

export default React.memo(SelectionArea);