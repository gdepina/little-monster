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
import isEqual from 'lodash.isequal';
const { loadComments } = actions;

const { width, height } = Dimensions.get('window');
const MoreIcon = require('./assets/more.png');

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}
        this.loadReview = this.loadReview.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(!isEqual(nextProps.user, this.props.user)) {
            nextProps.user && this.props.loadComments(nextProps.user.uid)
        }
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
                <Card key={index} title={item.name} containerStyle={{ backgroundColor: '#1e2123', borderRadius: 10, borderColor: '#efefef' }} dividerStyle={{ backgroundColor:'#E50A13' }} titleStyle={{ color:'#fff' }}>
                    {
                        <View>
                            {
                                item.comments.map(cmt => (
                                    <Text style={{ fontStyle: 'italic', color: '#fff' }}>"{cmt.comment.comment}"</Text>
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
                source={require('./background.jpg')}
            >
                <View style={styles.container}>
                    <View style={styles.topBar}>
                        <Text style={styles.title}>Mis Reseñas</Text>
                        <OptionsMenu
                            button={MoreIcon}
                            buttonStyle={{ width: 40, height: 20, margin: 7.5, resizeMode: "contain" }}
                            destructiveIndex={1}
                            options={["Cambiar contraseña", "Cerrar Sesión"]}
                            actions={[Actions.ChangePass ,this.onSignOut.bind(this)]} />
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
        comments: state.mainReducer.comments
    }
}

export default connect(mapStateToProps, { signOut, loadComments })(Home);


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
        backgroundColor: '#141414',
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



