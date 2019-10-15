import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import {Button, Text} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

import { padding, color, fontSize } from "../../../styles/Theme"
import LottieView from "lottie-react-native";
const movie = require('./cinema.json');

export default class Welcome extends React.Component {
    render() {
        return (
            <ImageBackground
                style={{
                    backgroundColor: '#fff',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                }}
                source={require('./photo.jpg')}
            >
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={styles.logo}>
                            <Text h1 style={styles.shadow}>Money Fit</Text>
                        </View>
                        <View>
                            <LottieView
                                source={movie}
                                style={styles.movie}
                                loop
                                autoPlay
                            />
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button
                            raised
                            title={'INGRESAR'}
                            borderRadius={4}
                            backgroundColor={"#20b382"} //optional
                            containerViewStyle={[styles.buttonContainer, { marginVertical: 4 }]}
                            buttonStyle={{}} //optional
                            textStyle={styles.buttonText}
                            onPress={Actions.Login} />
                        <Button
                            raised
                            title={'CREAR CUENTA'}
                            borderRadius={4}
                            backgroundColor={"#20b382"} //optional
                            containerViewStyle={styles.buttonContainer}
                            buttonStyle={{}} //optional
                            textStyle={styles.buttonText}
                            onPress={Actions.Register} />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper:{
        flex:1, justifyContent:"flex-start", alignItems:"center",
        flexDirection: 'column',
        marginTop: 60,
    },
    movie: {
        width: 500,
        height: 280,
        top: 50,
    },

    bottomContainer:{
        padding:padding
    },

    buttonContainer:{
        marginVertical:padding, marginHorizontal:0
    },

    buttonText:{
        fontWeight:"500"
    },
    shadow: {
        color: '#20b382',
        textShadowOffset: { width: 2.5, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#e5e0e0',
    },
    logo: {

    }
});
