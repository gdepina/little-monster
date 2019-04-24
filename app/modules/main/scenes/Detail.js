import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Text, Modal, Button } from "react-native";
//import { TextInput } from 'react-native-paper';
import { ListItem, FormInput, FormLabel } from 'react-native-elements';
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
        this.buildModal = this.buildModal.bind(this);
        this.addComment = this.addComment.bind(this);
        this.closeComment = this.closeComment.bind(this);
        this.state = {
            isModalVisible: false,
            value: 'Ingresa tu comentario'
        };

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

        this.setState({ isModalVisible: !this.state.isModalVisible });


    }

    closeComment() {
        this.setState({ isModalVisible: false });
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
                {this.buildModal()}
            </ScrollView>
        )
    }

    buildModal() {
        return (
                <Modal visible={this.state.isModalVisible} animationType="fade" transparent={true}>
                    <View style={styles.modal}>
                        <View style={{width: 280, height:220}}>
                        <FormLabel></FormLabel>
                            <FormInput
                                inputStyle={styles.textInput}
                                multiline= {true}
                                placeholder= 'Ingresa tu comentario...'
                                textarea value={this.state.value}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            />
                            <Button
                                onPress={() => this.closeComment()}
                                title="Cerrar"
                            >
                            </Button>
                            <Button
                                onPress={() => this.closeComment()}
                                title="Guardar"
                            >
                            </Button>
                        </View>
                    </View>
                </Modal>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
    },
    rate: {
        flexDirection: 'row',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listcontainer: {
    },

    modal: {
        height: height*0.5,
        width: width*0.9,
        position: 'absolute',
        top: height*0.2,
        left: width*0.05,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: 'black',
        shadowOpacity: 5.0,
    },

    textInput: {
        height: 100,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        /*autoCapitalize:'sentences',
        blurOnSubmit:'true'
        */
    }

});

function mapStateToProps(state, props) {
    return {
        currentMovie: state.mainReducer.currentMovie,
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, { loadMovie })(MoviePoster);


