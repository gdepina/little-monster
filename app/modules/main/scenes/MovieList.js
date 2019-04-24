import React from 'react';

const {View, StyleSheet, Dimensions, FlatList, ActivityIndicator, TouchableOpacity} = require('react-native');

import Spinner from 'react-native-loading-spinner-overlay';

import {SearchBar, List, ListItem} from 'react-native-elements'
import PosterCmp from '../components/Poster';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import LottieView from "lottie-react-native";

import {connect} from 'react-redux';
const movie = require('./assets/sorry.json');


import {actions} from "../"
import {AppFontLoader} from '../../AppFontLoader';
import {Actions} from "react-native-router-flux";
import {Text} from "react-native";


const { loadMovies } = actions;

const {width, height} = Dimensions.get('window');

class MovieList extends React.Component {
    constructor() {
        super();
        this.filterByValue = this.filterByValue.bind(this);
        this.renderFooter = this.renderFooter.bind(this);

        this.state = {
            loading: true,
            data: null,
            spinner: false,
        }
    }

    componentDidMount() {
        this.props.loadMovies();
    }

    componentWillReceiveProps(nextProps) {
        const { movies } = nextProps;
        if (!isEqual(nextProps.movies, this.props.movies)) {
            this.setState({
                spinner: !(movies && movies.length) && movies !== "",
            })
        }
    }


    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    }

    filterByValue(text) {
        this.props.loadMovies(text)
    }


    renderHeader() {
        const debounced = debounce((text) => this.filterByValue(text), 300);
        ;
        return <SearchBar round onChangeText={(text) => debounced(text)} value={this.state.value}
                          onClearText={null} placeholder='Busca tu serie o peli favorita'/>;
    }

    renderFooter() {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    onPressRow(id) {
        // this.props.loadMatch(id)
        return Actions.Detail({id});
    }


    render() {
        const movies = this.state.movies || this.props.movies;
        return (
            <AppFontLoader>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'One moment...'}
                    textStyle={{ color: '#fff' }} />
                <View style={styles.container}>
                    {this.renderHeader()}
                    <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0, top:-20}}>
                        <FlatList
                            data={movies ? Object.values(movies) : null}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListEmptyComponent={!this.state.spinner && this.getListEmptyComponent}
                            // ListFooterComponent={this.renderFooter}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => this.onPressRow(item.imdbID)}>
                                    <PosterCmp image={item.Poster} title={item.Title} description={`${item.Year} | ${item.Type}`} contentPosition="center" height={height*0.3}>
                                    </PosterCmp>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </List>
                </View>
            </AppFontLoader>

        )
    }

    getListEmptyComponent() {
        return (<View style={styles.emptyContainer}>
            <LottieView
                source={movie}
                style={styles.movie}
                loop
                autoPlay
            />
            <Text style={styles.shadow}>Ops, no encontramos resultados para tu busqueda</Text>
        </View>)
    }
}

function mapStateToProps(state, props) {
    return {
        movies: state.mainReducer.movies,
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, {loadMovies})(MovieList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2F32',
        marginTop:24,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B2F32',
    },
    movie: {
        width: width,
        height: height*0.5,
    },
    shadow: {
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        width: width*0.8,
        textAlign: 'center',
    }
});



