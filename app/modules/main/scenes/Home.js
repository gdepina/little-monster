import React from 'react';
const { View, StyleSheet, Alert, ImageBackground, Text, Dimensions, Image } = require('react-native');

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import Colors from '../../../config/Colors';

import { actions as auth } from "../../auth"
var { signOut } = auth;
import {actions, reducer as mainReducer} from "../"
const { loadMovies } = actions;

const {width, height} = Dimensions.get('window');

const bkgColor = Colors.tintColor;

class Home extends React.Component {
    constructor(){
        super();
        this.state = { }
    }

    componentDidMount() {
        this.props.loadMovies();
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.replace("Welcome")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    renderItem(img, index) {
        return (<View key={index}>
            <Image style={{ width: width, height: height*0.3 }} source={{ uri: img }} />
        </View>)
    }

    render() {
        return (
            <ImageBackground
                style={{
                    backgroundColor: '#ccc',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                }}
                source={require('./assets/movie-flag.jpg')}
            >
                <View style={styles.container}>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user:  state.authReducer.user,
        movies:  state.mainReducer.movies
    }
}

export default connect(mapStateToProps, { signOut, loadMovies })(Home);


const styles = StyleSheet.create({
    container: {
        flex:1
    },

    buttonContainer:{
        marginVertical:0, marginHorizontal:0
    },

    buttonText:{
        fontWeight:"500"
    },
    topBar:{
        backgroundColor:bkgColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"flex-end"
      },
    title:{
        fontSize:20,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});



