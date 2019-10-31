import React from 'react';

const {View, StyleSheet, Alert, ImageBackground, ScrollView, Text, Dimensions, Image, TouchableOpacity} = require('react-native');

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import OptionsMenu from 'react-native-options-menu';
import Colors from '../../../config/Colors';

import {actions as auth} from "../../auth"
import {actions as main} from "../../main"

var {signOut} = auth;
import {actions, reducer as mainReducer} from "../"
import {Card, ListItem, Button, Icon, FormLabel} from 'react-native-elements'
import isEqual from 'lodash.isequal';

const {cleanPlan} = main;

const {width, height} = Dimensions.get('window');
const MoreIcon = require('./assets/more.png');
import {AnimatedCircularProgress} from 'react-native-circular-progress';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
    }


    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this), this.props.cleanPlan)
    }

    onSuccess() {
        Actions.replace("Welcome")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    stringToDateTiem(string) {
        if (typeof string !== 'string') return string;
        const splitted = string.split('-', 3);
        const month = +splitted[0];
        const day = +splitted[1];
        const year = +splitted[2];

        return new Date(Date.UTC(year, month-1, day));
    }

    render() {
        const {entry, cost, savings, risk, goal, initialDate, goalDate, desc, advice} = this.props;
        const diffFromNow = this.dateDiffInDays(new Date(), this.stringToDateTiem(goalDate));
        const period = this.dateDiffInDays(this.stringToDateTiem(initialDate), this.stringToDateTiem(goalDate));
        const percentPeriod = parseInt(Math.abs(diffFromNow - period) / period * 100);
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
                // source={require('./background.jpg')}
            >
                <View style={styles.container}>
                    <View style={styles.topBar}>
                        <Text style={styles.title}>{`Plan de Ahorro de ${this.props.user && this.props.user.displayName }`}</Text>
                        <OptionsMenu
                            button={MoreIcon}
                            buttonStyle={{
                                width: 40,
                                height: 20,
                                margin: 7.5,
                                resizeMode: "contain",
                                backgroundColorText: "#ccc"
                            }}
                            destructiveIndex={1}
                            options={["Cambiar contraseña", "Cerrar Sesión"]}
                            actions={[Actions.ChangePass, this.onSignOut.bind(this)]}/>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.circle}>
                            <AnimatedCircularProgress
                                size={215}
                                width={15}
                                backgroundWidth={5}
                                fill={percentPeriod}
                                tintColor="#20b382"
                                backgroundColor="#ccc"
                                arcSweepAngle={240}
                                rotation={240}
                                lineCap="round">
                                {(fill) => (<View>
                                        <Text style={styles.points}>
                                            {`${percentPeriod}%`}
                                        </Text>
                                        <Text style={styles.leftDays}>{`Faltan ${diffFromNow} días`}</Text>
                                        <Text style={styles.progressObj}>{`para lograr tu objetivo`}</Text>
                                    </View>
                                )}
                            </AnimatedCircularProgress>
                            <Card containerStyle={styles.card} title={`Sugerencía de inversión`} titleStyle={{fontSize: 15, color: '#20b382'}}>
                                {/*{this.renderBody(item)}*/}
                                {advice && advice.map((item, index) => (
                                    <View>
                                        <FormLabel>{`#${index + 1}: `} <Text style={styles.planItem}
                                                                         h5>{item.investmentType}</Text></FormLabel>
                                    </View>
                                ))}
                                <Button
                                    containerViewStyle={{marginTop: 15}}
                                    borderRadius={4}  //optional
                                    backgroundColor={"#20b382"} //optional
                                    onPress={() => Actions.Detail({advice, showButton: false})}
                                    title='Ver'/>
                            </Card>
                            <Card containerStyle={styles.card}  title={`Plan`} titleStyle={{fontSize: 15, color: '#20b382'}}>
                                <View>
                                    <FormLabel>{`Objetivo: `} <Text style={styles.planItem}
                                                                     h5>{`$ ${goal} (${desc})`}</Text></FormLabel>
                                </View>
                                <View>
                                    <FormLabel>{`Ahorro (mensual): `} <Text style={styles.planItem}
                                                                   h5>{`$ ${savings}`}</Text></FormLabel>
                                </View>
                                <View style={{marginBottom: 15}}>
                                    <FormLabel>{`Perfil: `} <Text style={styles.planItem}
                                                                  h5>{risk}</Text></FormLabel>
                                </View>
                                {/*<Button*/}
                                    {/*borderRadius={4}  //optional*/}
                                    {/*backgroundColor={"#20b382"} //optional*/}
                                    {/*onPress={() => Actions.Detail({advice, showButton: false})}*/}
                                    {/*title='Editar'/>*/}
                            </Card>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, {signOut, cleanPlan})(Home);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    card: {
        width: (Dimensions.get('window').width * 0.8),
    },
    buttonContainer: {
        marginVertical: 0, marginHorizontal: 0
    },

    buttonText: {
        fontWeight: "500"
    },
    topBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 25,
        height: 55
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 15
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    points: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: '#20b382',
        fontSize: 40,
        fontWeight: "100"
    },
    leftDays: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: '#ccc',
        fontSize: 14,
        fontWeight: "100"
    },
    progressObj: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: '#ccc',
        fontSize: 12,
        fontWeight: "100"
    },
    planItem: {
        fontWeight: 'bold',
        color: '#000',
    },
});



