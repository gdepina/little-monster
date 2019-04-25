import React from 'react';
const { View, StyleSheet, Alert, ImageBackground, Text, Dimensions, Image, ScrollView, TouchableOpacity} = require('react-native');

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Carousel from 'react-native-banner-carousel';
import Colors from '../../../config/Colors';
import { actions as auth } from "../../auth"
var { signOut } = auth;
import {actions, reducer as mainReducer} from ".."
const { loadMovies, loadComments } = actions;
import * as api from '../api';
import axios from 'axios';
import {API_URL} from "../../../config/constants";
import {Card} from 'react-native-elements';
import PosterCmp from '../components/Poster';
import Spinner from 'react-native-loading-spinner-overlay';

const {width, height} = Dimensions.get('window');

const bkgColor = Colors.tintColor;

class Explore extends React.Component {
    constructor(){
        super();
        this.state = {
            spinner: true,
            tendence: [],
            byYear: [],
            byGenre: [],

        }
    }

    componentDidMount() {
        let url = `${API_URL}/movies`;
        let tendence = [];
        let byYear = [];
        let byGenre = [];

        //this.props.loadMovies();
        Promise.all([axios.get(`${url}?s=final`), axios.get(`${url}?s=geek`), axios.get(`${url}?s=game`)]).then(data => {
            tendence = data[0].data;
            data[2].data.forEach(movie => {
                byYear.push(this.buildMovieCard(movie))
            })
            data[1].data.forEach(movie => {
                byGenre.push(this.buildMovieCard(movie))
            })
        }).then(() => {
            this.setState({
                tendence,
                byYear,
                byGenre,
                spinner:false,
            }, () => this.props.user && this.props.loadComments(this.props.user.uid))
        })

    }

    buildMovieCard(movie) {
        return (<TouchableOpacity onPress={() => Actions.Detail({ id: movie.imdbID})}><Card containerStyle={styles.cardContainer}  image={{uri: movie.Poster}} /></TouchableOpacity>)
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

    renderItem(item, index) {
        return (<View key={index}>
            <PosterCmp style={{ width: width, height: height*0.3 }} image={item.Poster} title={item.Title}  contentPosition="center" height={height*0.3} />
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
                source={require('./background.jpg')}
            >
                <ScrollView style={styles.container}>
                    <Text style={styles.titleFirst}>{"Tendencias"}</Text>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={width}
                    >
                        {this.state.tendence && this.state.tendence.map((item, index) => this.renderItem(item, index))}
                    </Carousel>
                    <Text style={styles.title}>{"Lo más visto"}</Text>
                    <View >
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.state.byYear && this.state.byYear}
                        </ScrollView>
                    </View>
                    <Text style={styles.title}>{"Comedia"}</Text>
                    <View >
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {this.state.byGenre && this.state.byGenre}
                        </ScrollView>
                    </View>
                </ScrollView>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Estamos pensando...'}
                    color='#E50A13'
                    textStyle={{ color: '#fff' }} />
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

export default connect(mapStateToProps, { signOut, loadMovies, loadComments })(Explore);


const styles = StyleSheet.create({
    container: {
        flex:1
    },

    buttonContainer:{
        marginVertical:0, marginHorizontal:0
    },
    cardContainer: {
        height: height*0.257,
        width: width*0.3,
    },
    // cardContainerCircle: {
    //     height: height*0.252,
    //     width: width*0.3,
    //     borderWidth: 0,
    // },
    buttonText:{
        fontWeight:"500"
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
    },
    titleFirst: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        padding: 15,
        marginTop: 25,
    },
    titleItemCarousel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
    }

});



