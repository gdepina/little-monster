import React from 'react';
var { View, ActivityIndicator } = require('react-native');

import styles from './styles'

export default class extends React.Component {
    constructor(){
        super();
        this.state = {
            animating: true,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating = {this.state.animating}
                    color = '#E50A13'
                    size = "large"
                    style = {styles.activityIndicator}/>
            </View>
        );
    }
}
