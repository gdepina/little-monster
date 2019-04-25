import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Modal,
    Button,
    ImageBackground
} from "react-native";
import {ListItem, FormInput, FormLabel, Card} from 'react-native-elements';
import PosterCmp from '../components/Poster';
import {actions} from "../"
import {MaterialIcons, Foundation, Feather} from '@expo/vector-icons';

import Colors from "../../../config/Colors";

const {loadMovie, like} = actions;

//para obtener dimension de la pantalla
const {width, height} = Dimensions.get('window');

class MoviePoster extends Component {
    constructor() {
        super();
        this.buildPoster = this.buildPoster.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onDisLike = this.onDisLike.bind(this);
        this.like = this.like.bind(this);
        this.buildModal = this.buildModal.bind(this);
        this.addComment = this.addComment.bind(this);
        this.closeComment = this.closeComment.bind(this);
        this.checkIfLiked = this.checkIfLiked.bind(this);

        this.state = {
            isModalVisible: false,
            value: 'Ingresa tu comentario'
        };

    }

    componentDidMount() {
        this.props.loadMovie(this.props.id)
    }

    onLike() {
        this.like(true);
    }

    onDisLike() {
        this.like(false);
    }

    checkIfLiked() {
        const {currentMovie, likes} = this.props;
        const found = likes && likes.length && likes.find((element) => element === currentMovie.imdbID);
        return !!found;
    }

    like(isPositive) {
        const {imdbID, Title,} = this.props.currentMovie;
        const {uid, displayName} = this.props.user;

        !this.checkIfLiked() && this.props.like({
            omdbId: imdbID,
            isPositive,
            movieName: Title,
            userName: displayName,
            userId: uid,
            comment: this.state.text || null,
        });
    }

    buildComments() {
        const {comments} = this.props.currentMovie;
        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.listcontainer}>
                {
                    comments && comments.reverse().map((l, i) => (
                        <Card containerStyle={styles.cardContainer}>
                            <Text style={{
                                fontStyle: 'italic', fontWeight: 'bold', fontSize: 16, color: '#ccc',
                                textShadowOffset: {width: 2, height: 2},
                                textShadowRadius: 1,
                                textShadowColor: '#000',
                            }}>
                                "{l.comment.comment}"
                            </Text>
                            <Text style={{
                                marginTop: 10, textAlign: 'right', fontSize: 14, fontWeight: 'bold', color: '#ccc',
                                textShadowOffset: {width: 2, height: 2},
                                textShadowRadius: 1,
                                textShadowColor: '#000',
                            }}>
                                {l.comment.userName}
                            </Text>
                        </Card>
                    ))
                }
            </ScrollView>
        )
    }

    addComment() {

        this.setState({isModalVisible: !this.state.isModalVisible});


    }

    closeComment() {
        this.setState({isModalVisible: false, text: null});
    }


    buildPoster() {
        const {Poster, Title, description, Runtime, Year, positiveCount, negativeCount} = this.props.currentMovie;
        const clockIcon = (<Foundation
            name={'clock'}
            size={18}
            color={Colors.tabIconDefault}
        />)

        const calendarIcon = (<Feather
            name={'calendar'}
            size={18}
            color={Colors.tabIconDefault}
        />)
        const liked = !this.checkIfLiked() ? 0.2 : 0;

        return (<View style={styles.container}>
            <PosterCmp image={Poster} title={Title} description={description} contentPosition="bottom" overlayAlpha={0.5}
                       height={height * 0.87}>
                <View style={styles.iconContainer}>
                    <Text numberOfLines={4}
                          style={styles.shadowRuntime}>{calendarIcon}{` ${Year}  `}{clockIcon}{` ${Runtime}`}</Text>
                    <View style={styles.rate}>
                        <TouchableOpacity onPress={this.onLike} style={{marginRight: 25}} activeOpacity={liked}>
                            <Foundation
                                name={'like'}
                                size={40}
                                color={"#46D369"}
                            />
                            <Text style={styles.shadow}>{positiveCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onDisLike} activeOpacity={liked}>
                            <Foundation
                                name={'dislike'}
                                size={40}
                                color={"#E50A13"}
                            />
                            <Text style={styles.shadow}>{negativeCount}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>{"Comentarios"}</Text>
                    <View style={{ marginTop: 25, marginLeft: 15 }}>
                        <TouchableOpacity onPress={this.addComment}>
                            <Feather
                                name={'plus-circle'}
                                size={30}
                                color={"#E50A13"}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
                {(this.props.currentMovie && this.props.currentMovie.comments) && this.buildComments()}
            </PosterCmp>
        </View>)
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.props.currentMovie && this.buildPoster()}
                {this.buildModal()}
            </ScrollView>
        )
    }

    buildModal() {
        return (
            <Modal visible={this.state.isModalVisible} animationType="fade" transparent={false}>
                <View style={{backgroundColor: '#2B2F32', height: height}}>
                    <TouchableOpacity onPress={this.closeComment}>
                        <View styles={styles.cross}>
                            <Text style={{marginLeft: 'auto', marginTop: 15, marginRight: 15}}>
                                <Foundation
                                    name={'x'}
                                    size={25}
                                    color={Colors.tabIconDefault}
                                />
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <FormLabel labelStyle={{fontSize: 20, right: 5}}>Ingresa tu comentario:</FormLabel>
                    <FormInput
                        autoFocus
                        inputStyle={styles.textInput}
                        multiline={true}
                        placeholder='Por ejemplo: Excelente pelicula, gran papel de Liam Neeson.'
                        textarea value={this.state.value}
                        maxLength={200}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    <View style={styles.buttonModalContainer}>
                        <Button
                            raised
                            onPress={() => Promise.resolve(this.like(null)).then(this.closeComment())}
                            title="Guardar"
                            color="#E50A13"
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    buttonModalContainer: {
        width: width * 0.9,
        marginLeft: width * 0.05,
    },
    descContainer: {
        marginBottom: 20,
    },
    rate: {
        flexDirection: 'row',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        // borderBottomColor: '#9E9E9E',
        // borderBottomWidth: 2,
        marginBottom: 30,
        height: height * 0.2
    },
    cross: {flexDirection: 'row', justifyContent: 'flex-end'},
    shadow: {
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        marginLeft: 6,
    },
    shadowRuntime: {
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        marginLeft: 6,
        marginTop: 15,
    },
    cardContainer: {
        height: height * 0.32,
        width: width * 0.6,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },
    listcontainer: {},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        marginTop: 25,
    },

});

function mapStateToProps(state, props) {
    return {
        currentMovie: state.mainReducer.currentMovie,
        user: state.authReducer.user,
        likes: state.mainReducer.likes,
    }
}

export default connect(mapStateToProps, {loadMovie, like})(MoviePoster);


