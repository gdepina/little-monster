import React from 'react';
const { View, StyleSheet, Alert, ImageBackground, ScrollView, Text, Dimensions, Image } = require('react-native');

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import OptionsMenu from 'react-native-options-menu';
import Colors from '../../../config/Colors';

import { actions as auth } from "../../auth"
var { signOut } = auth;
import {actions, reducer as mainReducer} from "../"
import { Card, ListItem, Button, Icon } from 'react-native-elements'
const { loadMovies } = actions;

const {width, height} = Dimensions.get('window');
const MoreIcon = require('./assets/more.png');
const bkgColor = '#397AF8';

class Home extends React.Component {
    constructor(){
        super();
        this.state = { }
    }

    componentDidMount() {
        this.props.loadMovies();
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
            <Image style={{ width: width, height: height*0.3 }} source={{ uri: img }} />
        </View>)
    }

    loadReview(id,film,comment){
        // const comments = [1, 2, 3, 4, 5];
        // const listItems = comments.map((test) =>
        // {
        //     <li>{test}</li>
        // })
        return (
            <Card key={id} title={film}>
            {
                <View key={comment} >
                    <Text>{comment}</Text>
                </View>
            }
            </Card>
        )
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
                                actions={[this.onSignOut.bind(this)]}/>
                    </View>
                    <ScrollView style={styles.container}>
                    {this.loadReview(1,'Pelicula 1','Comentario 1: Al igual que su inusitada capacidad para transmitir, el estilo narrativo de \'Roma\' resulta especialmente atípico. Una sucesión de escenas orgánica y natural de una cadencia suave, lenta y contemplativa que no parece entender de giros, actos dramáticos y puntos de inflexión y que sumerge al espectador en una suerte de universo casi onírico en el que parece no existir el paso del tiempo; haciendo de sus más de dos horas y cuarto de metraje un melancólico suspiro en el que desear perderse eternamente.')}
                    {this.loadReview(2,'Pelicula 2','Comentario 2: Nada de esto sería posible sin el genio de un Alfonso Cuarón que se reafirma de nuevo como uno de los grandes estandartes del séptimo arte contemporáneo tras firmar una pieza que podríamos englobar dentro de la poesía audiovisual. Un perfecto y delicado festín monocromo fotografiado por el mismo realizador con un lenguaje que combina clasicismo y modernidad, aunando virguerías técnicas con una espectacular austeridad coronada por los grandes planos generales y las panorámicas eternas como seña de identidad.')}
                    {this.loadReview(3,'Pelicula 3','Comentario 3. pesima, una perdida de tiempo')}
                    {this.loadReview(4,'Pelicula 4','Comentario 4: Una Cleo, objeto principal del filme y sin la cual \'Roma\' no tendría razón de ser, cuyos tristes e inocentes ojos sirven de testigo para retratar el día a día de una familia acomodada en la Ciudad de México de principios de los setenta. Un hilo conductor incidental que sirve como excusa al director para capturar en pantalla una época, un escenario, un clima sociopolítico, unas texturas, una amalgama de memorias y un auténtico torbellino de sensaciones a flor de piel.')}
                    {this.loadReview(5,'Pelicula 5','Comentario 5: \'Roma\', más que una película, es un trozo de vida. Un pedazo del corazón de Cuarón en el que el mexicano, en un ejercicio prodigioso tanto en forma como en fondo, y combinando una nostalgia sincera, un gran componente reivindicativo, y una escala emocional tan deslumbrante como la amalgama de grises de su fotografía, que no teme en virar drásticamente de lo tierno a lo desgarrador, convierte en inesperada protagonista a una eterna secundaria en la vida real.')}
                    {this.loadReview(6,'Pelicula 6','Comentario 6')}
                    {this.loadReview(7,'Pelicula 7','Comentario 7')}
                    {this.loadReview(8,'Pelicula 8','Comentario 8')}
                    {this.loadReview(9,'Pelicula 9','Comentario 9')}
                    {this.loadReview(10,'Pelicula 10','Comentario 10')}

                    </ScrollView>
                    {/* <Card title="CARD TEST">
                    {
                        <View key={'test'} >
                        <Text >Test text</Text>
                        </View>
                    
                    }
                    </Card>
                    <Card title="CARD TEST 2">
                    {
                        <View key={'test2'} >
                        <Text >Test text 2</Text>
                        </View>
                    
                    }
                    </Card> */}
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user:  state.authReducer.user,
        movies:  state.mainReducer.movies
    }
}

export default connect(mapStateToProps, { signOut, loadMovies })(Home);


const styles = StyleSheet.create({
    container: {
        flex:1
    },

    buttonContainer:{
        marginVertical:0, marginHorizontal:0
    },

    buttonText:{
        fontWeight:"500"
    },
    topBar:{
        backgroundColor: bkgColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        marginTop: 25,
        height: 55
      },
    title:{
        fontSize:20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 15        
    }
});



