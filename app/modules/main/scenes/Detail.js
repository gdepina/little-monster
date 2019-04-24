import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView, AppRegistry, Modal, Alert, TouchableHighlight} from "react-native";
import ImageOverlay from "react-native-image-overlay";
import {Button, ListItem} from 'react-native-elements';
import { fontSize } from '../../../styles/Theme';

//para obtener dimension de la pantalla
const {width, height} = Dimensions.get('window');


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
                        onPress={onPressLearnMore}
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
        return ( <View style={styles.listcontainer}>
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

    render() {

        return (
            <ScrollView style={styles.container}>
                {this.buildPoster()}
                {this.buildComments()}
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

    },
    listcontainer:{
        marginTop: -170,
        marginBottom: 20
    }
});

