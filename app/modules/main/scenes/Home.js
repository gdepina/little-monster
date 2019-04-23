import React from 'react';
const { View, StyleSheet, Text, Alert, ImageBackground } = require('react-native');
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { actions as auth } from "../../auth";

import OptionsMenu from 'react-native-options-menu';
import Colors from '../../../config/Colors';

var { signOut } = auth;

const MoreIcon = require('./more.png');
const bkgColor = Colors.tintColor;

class Home extends React.Component {
    constructor(){
        super();
        this.state = { }
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

    render() {
        return (
            <ImageBackground
                style={{
                    backgroundColor: '#ccc',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
               //     justifyContent: 'center',
                }}
                source={require('./movie-flag.jpg')}
            >
                <View style={styles.topBar}>
                    {/*<Button*/}
                        {/*large*/}
                        {/*raised*/}
                        {/*title={'Mis partidos'}*/}
                        {/*borderRadius={4}*/}
                        {/*backgroundColor={color.main}*/}
                        {/*containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}*/}
                        {/*buttonStyle={{}} //optional*/}
                        {/*textStyle={styles.buttonText}*/}
                        {/*onPress={() => Actions.MatchList({ myMatchs: true })}*/}
                    {/*/>*/}
                    {/*<Button*/}
                        {/*large*/}
                        {/*raised*/}
                        {/*title={'Ingresar nueva pelicula'}*/}
                        {/*borderRadius={4}*/}
                        {/*backgroundColor={color.main}*/}
                        {/*containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}*/}
                        {/*buttonStyle={{}} //optional*/}
                        {/*textStyle={styles.buttonText}*/}
                        {/*onPress={Actions.MatchCreator}*/}
                        {/*/>*/}
                    {/* <Button
                        large
                        raised
                        title={'Ver peliculas'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={Actions.MatchList}
                        />
                    <Button
                        large
                        raised
                        title={'Cerrar sesion'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={this.onSignOut.bind(this)}/> */}
                        <Text style={styles.title}>Mis Reseñas</Text>
                        <OptionsMenu
                            button={MoreIcon}
                            buttonStyle={{ width: 40, height: 20, margin: 7.5, resizeMode: "contain" }}
                            destructiveIndex={1}
                            options={["BuscarPeliculas", "Cerrar Sesión"]}
                            actions={[Actions.MatchList, this.onSignOut.bind(this)]}/>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user:  state.authReducer.user
    }
}

export default connect(mapStateToProps, { signOut })(Home);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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



