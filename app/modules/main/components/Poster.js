import React, {Component} from 'react';
import ImageOverlay from "react-native-image-overlay";
import {Dimensions, StyleSheet, Text, View} from "react-native";

class Poster extends Component {
    render() {
        const {image, title, description, children, contentPosition, height} = this.props;
        return (
            <ImageOverlay
                source={{uri: image}}
                contentPosition={contentPosition} overlayAlpha={0.3} height={height} >
                <View style={ contentPosition === 'center' ? styles.containerCenter : styles.contentContainer}>
                    <View style={styles.titleContainer}><Text style={styles.title}>{title}</Text></View>
                    <View style={styles.descContainer}><Text numberOfLines = { 4 }
                        style={styles.shadow}>{description}</Text></View>
                    {children}
                </View>

            </ImageOverlay>
        );
    }
}

const styles = StyleSheet.create({
    description: {fontSize: 20, fontWeight: 'bold'},
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding:20,
    },
    containerCenter: {

    },
    titleContainer: {

    },
    descContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
    },
    shadow: {
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000',
    }

});

export default Poster;
