import React from 'react';
const { View, StyleSheet, Alert, ImageBackground, ScrollView, Text, Dimensions, Image, TouchableOpacity } = require('react-native');

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import OptionsMenu from 'react-native-options-menu';
import Colors from '../../../config/Colors';

import { actions as auth } from "../../auth"
var { signOut } = auth;
import { actions, reducer as mainReducer } from "../"
import { Card, ListItem, Button, Icon } from 'react-native-elements'
const { loadMovies, loadComments } = actions;

const { width, height } = Dimensions.get('window');
const MoreIcon = require('./assets/more.png');
const bkgColor = '#397AF8';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}
        this.loadReview = this.loadReview.bind(this);
    }

    componentDidMount() {
        const {loadMovies , user, loadComments} = this.props;
        loadMovies();
        user && loadComments(user.uid)
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
            <Image style={{ width: width, height: height * 0.3 }} source={{ uri: img }} />
        </View>)
    }

    loadReview() {
        const { comments } = this.props;
        return comments.map((item, index) => (
            <TouchableOpacity onPress={() => Actions.Detail({id:item.movieId})}>
                <Card key={index} title={item.name}>
                    {
                        <View>
                            {
                                item.comments.map(cmt => (
                                    <Text>{cmt.comment.comment}</Text>
                                ))
                            }
                        </View>
                    }
                </Card>
            </TouchableOpacity>
        ))
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
                source={require('./background.png')}
            >
                <View style={styles.container}>
                    <View style={styles.topBar}>
                        <Text style={styles.title}>Mis Reseñas</Text>
                        <OptionsMenu
                            button={MoreIcon}
                            buttonStyle={{ width: 40, height: 20, margin: 7.5, resizeMode: "contain" }}
                            destructiveIndex={1}
                            options={["Cerrar Sesión"]}
                            actions={[this.onSignOut.bind(this)]} />
                    </View>
                    <ScrollView style={styles.container}>
                        {this.loadReview()}

                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        movies: state.mainReducer.movies,
        comments: state.mainReducer.comments
    }
}

export default connect(mapStateToProps, { signOut, loadMovies, loadComments })(Home);


const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    buttonContainer: {
        marginVertical: 0, marginHorizontal: 0
    },

    buttonText: {
        fontWeight: "500"
    },
    topBar: {
        backgroundColor: bkgColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 25,
        height: 55
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 15
    }
});



