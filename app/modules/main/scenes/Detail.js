import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";

import { ListItem } from 'react-native-elements';
import PosterCmp from '../components/Poster';
import { actions } from "../"

import { MaterialIcons, Foundation } from '@expo/vector-icons';

import Colors from "../../../config/Colors";
const { loadMovie } = actions;

//para obtener dimension de la pantalla
const { width, height } = Dimensions.get('window');


//Prueba de lista de comentarios
const list = [
    {
        name: 'Usr1',
        subtitle: 'Mala'
    },
    {
        name: 'Usr2',
        subtitle: ' make a type specimen book. It has survived not o'
    },
    {
        name: 'Usr3',
        subtitle: ' make a type specimen book. It has survived not o'
    },
    {
        name: 'Usr4',
        subtitle: ' Latin literature from'
    },
    {
        name: 'Usr5',
        subtitle: 'Buena'
    },
    {
        name: 'Usr6',
        subtitle: 'd the undoubtable sourcsect'
    },
    {
        name: 'Usr7',
        subtitle: 'fered alteration in some form, b'
    },
]

class MoviePoster extends Component {
    constructor() {
        super();
        this.buildPoster = this.buildPoster.bind(this);
    }

    componentDidMount() {
        this.props.loadMovie(this.props.id)
    }

    onLike() {

    }

    onDisLike() {

    }

    buildComments() {
        return (<View style={styles.listcontainer}>
            {
                list.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        subtitle={l.subtitle}
                    />
                ))
            }
        </View>
        )
    }
    addComment() {

    }

    buildPoster() {
        const { Poster, Title, description, Runtime, Year } = this.props.currentMovie;
        return (<View style={styles.container}>
            <PosterCmp image={Poster} title={Title} description={description} contentPosition="bottom" height={height * 0.5}>
                <View style={styles.iconContainer}>
                    <View style={styles.rate}>
                        <TouchableOpacity onPress={this.onLike} style={{ marginRight: 25 }}>
                            <Foundation
                                name={'like'}
                                size={35}
                                color={Colors.tabIconDefault}
                            />
                            <Text style={{ color: 'green' }}>952</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisLike}>
                            <Foundation
                                name={'dislike'}
                                size={35}
                                color={Colors.tabIconDefault}
                            />
                            <Text style={{ color: 'red' }}>324</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this.addComment}>
                            <MaterialIcons
                                name={'rate-review'}
                                size={35}
                                color={Colors.tabIconDefault}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </PosterCmp>
        </View>)
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.props.currentMovie && this.buildPoster()}
                {this.buildComments()}
            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {},
    rate: {
        flexDirection: 'row',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listcontainer: {
    }

});

function mapStateToProps(state, props) {
    return {
        currentMovie: state.mainReducer.currentMovie,
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, { loadMovie })(MoviePoster);


