import React from 'react';
var { View, ActivityIndicator } = require('react-native');
const money = require('./assets/moneyfit.json');

import styles from './styles'
import LottieView from "lottie-react-native";


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
                <LottieView
                    source={money}
                    style={styles.movie}
                    loop
                    autoPlay
                />
                {/*<ActivityIndicator*/}
                    {/*animating = {this.state.animating}*/}
                    {/*color = '#20b382'*/}
                    {/*size = "large"*/}
                    {/*style = {styles.activityIndicator}/>*/}
            </View>
        );
    }
}
