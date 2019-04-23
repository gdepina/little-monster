import React, {Component} from 'react';

import {Dimensions, StyleSheet, Text, View, ScrollView, AppRegistry} from "react-native";

import ImageOverlay from "react-native-image-overlay";

import {Button} from 'react-native-elements';
import { fontSize } from '../../../styles/Theme';

//para obtener dimension de la pantalla
const {width, height} = Dimensions.get('window');


export default class MoviePoster extends Component{
    constructor() {
        super();
        this.render= this.render.bind(this);

    }

    componentDidMount() {
        // aca lanzaremos la funcion para obtener los commentarios.
    }

    buildPoster() {
        return (<View  style={styles.container}>
            <ImageOverlay source={{ uri:'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'  }} 
                 contentPosition= "bottom" overlayAlpha={0.3}>
                <View style={styles.contentContainer}>
                <View style={styles.title}><Text style={styles.name}>IRONMAN</Text></View>
                <View style={styles.general_description}><Text style={styles.description}>lalala</Text></View>
                <View style={styles.button}><Button  
                        large
                        raised
                        title={'Comentar'}
                        borderRadius={2}
                        
                />
                </View>

                </View>
                 
             </ImageOverlay>
             
             
             </View>
             
             )}


         //aca va a ir todo lo relacionado al poster

    buildPlot() {
        return( <View>
            <h2>Nombre</h2>
            <h3>descripcion</h3>
            <h3>Genero</h3>
            <h3>Anio</h3>
        </View> //aca va a ir todo lo relacionado a la descripcion
        )
    }

    buildComments() {
        return (<view> //aca va modulo de comentarios.
            
        
        
        
            </view>)
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                {this.buildPoster()}
            </ScrollView>
        )
    }

    /*
    render() {

        return (
            <ScrollView style={styles.container}>
                {this.buildPoster()}
                {this.buildPlot()}
                {this.buildComments()}
            </ScrollView>
        )
    }
    */


}

const styles = StyleSheet.create({
    container: {
        height:500,
        width:500,
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    name: {fontSize:20, fontWeight:'bold', color:'red'},
    description:{fontSize:20, fontWeight:'bold', color:'red'},
    contentContainer:{
        flex:1,
        justifyContent: 'flex-end'
    },
    button: {marginLeft:140},
    title:{
        marginTop:5, marginLeft:-55
    },
    general_description:{
        marginLeft: -55

    }

});


/*
var {View, StyleSheet, Dimensions, FlatList, ScrollView} = require('react-native');

import {connect} from 'react-redux';

import { Actions } from 'react-native-router-flux';


import {actions} from "../"
import * as Theme from "../../../styles/Theme";

const {padding} = Theme;
import {List, ListItem, Text, FormLabel, Card, Button, Icon} from 'react-native-elements'


const device_width = Dimensions.get('window').width;
import { AppFontLoader } from '../../AppFontLoader';

const {loadMatch, addPlayerToMatch, removePlayerFromMatch, destroyMatch} = actions;

class Match extends React.Component {
    constructor() {
        super();
        this.renderPlayers = this.renderPlayers.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.checkIamIn = this.checkIamIn.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.iamOwner = this.iamOwner.bind(this);
        this.renderListIcon = this.renderListIcon.bind(this);
    }

    componentDidMount() {
        this.props.id && this.props.loadMatch(this.props.id);
    }

    addPlayer() {
        this.props.addPlayerToMatch(this.props.currentMatch.id, this.props.user.uid, this.props.user.email, this.props.user.displayName);
    }

    removePlayer() {
        if (!this.iamOwner()) {
            this.props.removePlayerFromMatch(this.props.currentMatch.id, this.props.user.uid);
        } else {
            this.props.destroyMatch(this.props.currentMatch.id);
            Actions.Home();
        }
    }

    iamOwner() {
         return this.props.currentMatch && this.props.currentMatch.players.some(player => player.id === this.props.user.uid && player.owner)
    }

    checkIamIn() {
        return this.props.currentMatch && !this.props.currentMatch.players.some(player => player.id === this.props.user.uid)
    }

    renderCardHeader() {
        const iamIn = this.checkIamIn();
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop:20, marginBottom: 20 }}>
                {iamIn && <Button
                    title={"Unirme"}
                    borderRadius={4}  //optional
                    backgroundColor={"#397af8"} //optional
                    onPress={this.addPlayer}
                />}
                {!iamIn && <Button
                    title={this.iamOwner() ? "Cerrar Partido" : "Bajarme"}
                    borderRadius={4}  //optional
                    backgroundColor={"#397af8"} //optional
                    onPress={this.removePlayer}
                />}
            </View>)
    }

    getFirstCharacters(player) {
        const displayName = player.displayName || player.email;
        return displayName.substring(0, 2).toUpperCase();
    }

    renderListIcon(player){
        const remove = <Icon
            name='remove'
            type={"font-awesome"}
            color='#f50'
            onPress={() => this.props.removePlayerFromMatch(this.props.currentMatch.id, player.id)} />;
        return player.owner ? this.renderStarIcon() : remove;
    }

    renderStarIcon() {
        return <Icon
            name='star'
            type={"font-awesome"}
            color='#ffc600' />;
    }

    renderPlayers() {
        return (<Card title="Jugadores">
            {
                <AppFontLoader>
                    <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                        <FlatList
                            data={this.props.currentMatch && this.props.currentMatch.players !== undefined  ? this.props.currentMatch.players : []}
                            renderItem={(player) => (
                                    <ListItem
                                        key={player.item.id}
                                        avatar={"https://ui-avatars.com/api/?background=0D8ABC&color=fff&name="+this.getFirstCharacters(player.item)}
                                        roundAvatar
                                        title={player.item.displayName || player.item.email}
                                        containerStyle={{borderBottomWidth: 0}}
                                        chevronColor="#FFF"
                                        rightIcon={(this.iamOwner() && this.renderListIcon(player.item)) || player.item.owner && this.renderStarIcon()}
                                    />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </List>
                </AppFontLoader>
            }
        </Card>)
    }

    renderMatch() {
        const match = this.props.currentMatch ? this.props.currentMatch : this.props.matches[this.props.id]
        const {name, matchSize, locationName, datetime, courtType, phoneNumber} = match;
        return (<Card title={name}>
            {
                <View>
                    <FormLabel>{"Partido"}</FormLabel>
                    <Text style={styles.matchItem} h5>{matchSize/2 + 'vs' + matchSize/2}</Text>
                    <FormLabel>{"Lugar"}</FormLabel>
                    <Text style={styles.matchItem} selectable h5>{locationName}</Text>
                    <FormLabel>{"Cuando"}</FormLabel>
                    <Text style={styles.matchItem}  h5>{datetime}</Text>
                    <FormLabel>{"Cancha"}</FormLabel>
                    <Text style={styles.matchItem}  h5>{courtType}</Text>
                    { phoneNumber && <FormLabel>{"Tel. Contacto"}</FormLabel> }
                    { phoneNumber && <Text selectable style={styles.matchItem}  h5>{phoneNumber}</Text> }

                </View>
            }
        </Card>)
    }


    render() {

        return (
            <ScrollView style={styles.container}>
                {this.renderMatch()}
                {this.renderPlayers()}
                {this.renderCardHeader()}
            </ScrollView>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        matches: state.mainReducer.matches,
        currentMatch: state.mainReducer.currentMatch,
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, {loadMatch, addPlayerToMatch, removePlayerFromMatch, destroyMatch})(Match);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    matchItem: {
        marginLeft: 20,
    }
});
*/




