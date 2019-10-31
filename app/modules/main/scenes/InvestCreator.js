import React from 'react';

var {View, StyleSheet, Share} = require('react-native');

import {connect} from 'react-redux';

import StepIndicator from 'react-native-step-indicator';
import {FormLabel, Button, Text, FormInput, List, ListItem} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import LottieView from 'lottie-react-native';
import {Actions} from 'react-native-router-flux';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {AppFontLoader} from '../../AppFontLoader';
import Splash from '../../splash/Splash';
import Home from './Home';


import {actions} from "../"
import * as Theme from "../../../styles/Theme";

const {padding} = Theme;

const congrats = require('./assets/congrats.json');

import {misc} from "../../../styles/Theme"
import Colors from "../../../config/Colors";

const device_width = misc.window_width;
const {getPlan, getPlanByUserId} = actions;


const profileRisksList = [
    {
        name: 'Conservador',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        leftIcon: (<Feather
            name={'arrow-down'}
            color={'green'}
            style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}
            size={40}
        />),
        subtitle: 'Riesgo ~15%',
        key: 'LOW'
    },
    {
        name: 'Moderado',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        leftIcon: (<MaterialCommunityIcons
            name={'equal'}
            color={'gray'}
            style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}
            size={40}
        />),
        subtitle: 'Riesgo ~30%',
        key: 'MODERATED'
    },
    {
        name: 'Agresivo',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        leftIcon: (<Feather
            name={'arrow-up'}
            style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}
            color={'red'}
            size={40}
        />),
        subtitle: 'Riesgo ~45%',
        key: 'HIGH'
    },
]


class MatchCreator extends React.Component {
    constructor(props) {
        super(props);
        this.onPressIndicator = this.onPressIndicator.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            currentPosition: 0,
            entry: '',
            cost: '',
            goal: '',
            desc: '',
            profitSave: '',
            risk: '',
            preferSay: true,
            haveInvest: false,
            isReady: props.plan && Object.entries(props.plan).length > 0,
        }
    }

    componentDidMount() {
        if (this.props.plan && Object.entries(this.props.plan).length === 0) {
            this.props.user && this.props.user.uid && this.props.getPlanByUserId(this.props.user.uid, () => this.setState({isReady: true}));
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.plan && Object.entries(nextProps.plan).length === 0) {
            nextProps.user &&  nextProps.user.uid && nextProps.getPlanByUserId(nextProps.user.uid, () => this.setState({isReady: true}));
        } else {
            const {entry, cost, profitSave, risk, goal, dtSince, dtGoal, desc, advice} = nextProps.plan;
            Actions.Home({
                entry,
                cost,
                savings: profitSave,
                risk,
                goal,
                initialDate: dtSince,
                goalDate: dtGoal,
                desc,
                advice
            })
        }
    }


    onShare() {
        Share.share({
            message: '¿Sale doparti? - Sumate a goru entra aca -> https://bit.ly/2Ahks7E',
            url: 'https://bit.ly/2Ahks7E',
            title: 'GORU - Suma, juga ya'
        }, {
            // Android only:
            dialogTitle: `Partido de ${this.props.user.displayName || this.props.user.email}`,
        })
    }


    dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    onPressIndicator(position) {
        if (this.state.currentPosition > position && this.state.currentPosition !== 5) {
            this.setState({
                currentPosition: position,
            });
        }
    }

    onSubmit(step) {
        this.setState({
            currentPosition: step,
        }, () => {
            // this.animation && this.animation.play();
            if (step === 5) {
                const {profitSave, entry, cost, risk, goal, datetime, desc} = this.state;
                const initialDate = new Date();
                const goalDate = new Date(datetime);

                const savings = profitSave || Math.abs(entry - cost);
                const period = this.dateDiffInDays(initialDate, goalDate);
                this.props.getPlan({
                    savings,
                    objective: goal,
                    risk,
                    period,
                }, () => Actions.InvestAdviceList({
                    entry,
                    cost,
                    savings,
                    risk,
                    goal,
                    period,
                    initialDate,
                    goalDate,
                    desc
                }))
            }
        });
    }


    render() {
        const labels = ["Ingresos", "Gastos", "Perfil", "Objetivo", "Tiempo"];
        const customStyles = {
            stepIndicatorSize: 25,
            currentStepIndicatorSize: 30,
            separatorStrokeWidth: 2,
            currentStepStrokeWidth: 3,
            stepStrokeCurrentColor: '#20b382',
            stepStrokeWidth: 3,
            stepStrokeFinishedColor: '#20b382',
            stepStrokeUnFinishedColor: '#aaaaaa',
            separatorFinishedColor: '#20b382',
            separatorUnFinishedColor: '#aaaaaa',
            stepIndicatorFinishedColor: '#20b382',
            stepIndicatorUnFinishedColor: '#ffffff',
            stepIndicatorCurrentColor: '#ffffff',
            stepIndicatorLabelFontSize: 13,
            currentStepIndicatorLabelFontSize: 13,
            stepIndicatorLabelCurrentColor: '#20b382',
            stepIndicatorLabelFinishedColor: '#ffffff',
            stepIndicatorLabelUnFinishedColor: '#aaaaaa',
            labelColor: '#999999',
            labelSize: 13,
            currentStepLabelColor: '#20b382',
        }

        if (!this.state.isReady)
            return <Splash/>

        if (this.props.plan && Object.entries(this.props.plan).length > 0) {
            const {entry, cost, profitSave, risk, goal, dtSince, dtGoal, desc, advice} = this.props.plan;
            const homeProps = {
                entry,
                cost,
                savings: profitSave,
                risk,
                goal,
                initialDate: dtSince,
                goalDate: dtGoal,
                desc,
                advice
            }
            return <Home {...homeProps} />;
        }

        // if (!this.state.isReady) return <Splash/>

        return (
            <AppFontLoader>
                <View style={styles.container}>
                    <View style={{marginVertical: 40}}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={this.state.currentPosition}
                            labels={labels}
                            stepCount={5}
                            onPress={this.onPressIndicator}
                        />
                    </View>
                    {
                        this.state.currentPosition === 0 &&
                        <View style={styles.container}>
                            <View style={styles.container_step_1}>
                                {this.state.preferSay &&
                                <View style={{...styles.row, marginTop: misc.window_height * 0.1}}>
                                    <FormLabel labelStyle={styles.formLabel}
                                               containerStyle={styles.formLabelContainer}>{"¿Cuál es su ingreso mensual?"}</FormLabel>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <FormInput
                                            autoCapitalize='none'
                                            clearButtonMode='while-editing'
                                            underlineColorAndroid={"#ccc"}
                                            placeholder={"$ 10000"}
                                            placeholderTextColor={"#E3E3E3"}
                                            autoFocus={false}
                                            onChangeText={(entry) => this.setState({entry})}
                                            inputStyle={styles.inputContainer}
                                            keyboardType={'numeric'}
                                            value={this.state.entry}/>
                                        <Feather
                                            name={'arrow-right-circle'}
                                            disabled={this.state.entry === ''}
                                            color={this.state.entry === '' ? '#E3E3E3' : '#666666'}
                                            size={42}
                                            onPress={() => this.onSubmit(1)}
                                        />
                                    </View>
                                    <View style={{marginTop: 45}}>
                                        <Button
                                            raised
                                            title={'Prefiero no decirlo'}
                                            borderRadius={4}  //optional
                                            backgroundColor={"#20b382"} //optional
                                            containerViewStyle={styles.buttonContainer} //optional
                                            onPress={() => this.setState({preferSay: false})}/>
                                        <Text style={{
                                            textAlign: "center",
                                            color: '#858b89',
                                            marginTop: 30
                                        }}> {"Tenga en cuenta que una vez creado su perfil podrá modificar los datos."} </Text>
                                    </View>
                                </View>
                                }
                                {!this.state.preferSay &&
                                <View style={{...styles.row, marginTop: misc.window_height * 0.1}}>
                                    <FormLabel labelStyle={styles.formLabel}
                                               containerStyle={styles.formLabelContainer}>{"Ingrese diferencia entre sus ingresos y egresos"}</FormLabel>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <FormInput
                                            autoCapitalize='none'
                                            clearButtonMode='while-editing'
                                            underlineColorAndroid={"#ccc"}
                                            placeholder={"$ 10000"}
                                            placeholderTextColor={"#E3E3E3"}
                                            autoFocus={true}
                                            onChangeText={(profitSave) => this.setState({profitSave})}
                                            inputStyle={styles.inputContainer}
                                            keyboardType={'numeric'}
                                            value={this.state.profitSave}/>
                                        <Feather
                                            name={'arrow-right-circle'}
                                            disabled={this.state.profitSave === ''}
                                            color={this.state.profitSave === '' ? '#E3E3E3' : '#666666'}
                                            size={42}
                                            onPress={() => this.onSubmit(2)}
                                        />
                                    </View>
                                </View>
                                }
                            </View>
                        </View>

                    }
                    {
                        this.state.currentPosition === 1 &&
                        <View style={styles.container}>
                            <View style={styles.container_step_1}>
                                <View style={{...styles.row, marginTop: misc.window_height * 0.1}}>
                                    <FormLabel labelStyle={styles.formLabel}
                                               containerStyle={styles.formLabelContainer}>{"¿Cuál es su gasto mensual?"}</FormLabel>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <FormInput
                                            autoCapitalize='none'
                                            clearButtonMode='while-editing'
                                            underlineColorAndroid={"#ccc"}
                                            placeholder={"$ 3000"}
                                            placeholderTextColor={"#E3E3E3"}
                                            autoFocus={true}
                                            onChangeText={(cost) => this.setState({cost})}
                                            inputStyle={styles.inputContainer}
                                            keyboardType={'numeric'}
                                            value={this.state.cost}/>
                                        <Feather
                                            name={'arrow-right-circle'}
                                            disabled={this.state.cost === ''}
                                            color={this.state.cost === '' ? '#E3E3E3' : '#666666'}
                                            size={42}
                                            onPress={() => this.onSubmit(2)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                    }
                    {
                        this.state.currentPosition === 2 &&
                        <View>
                            <List containerStyle={{marginBottom: 20}}>
                                {
                                    profileRisksList.map((l) => (
                                        <ListItem
                                            roundAvatar
                                            titleStyle={{marginLeft: 20, fontSize: 30}}
                                            subtitleStyle={{marginLeft: 20}}
                                            // avatar={{uri: l.avatar_url}}
                                            onPress={() => {
                                                this.setState({risk: l.key}, () => this.onSubmit(3));
                                            }}
                                            leftIcon={l.leftIcon}
                                            key={l.key}
                                            title={l.name}
                                            subtitle={l.subtitle}
                                        />
                                    ))
                                }
                            </List>
                        </View>
                    }
                    {
                        this.state.currentPosition === 3 &&
                        <View style={styles.container}>
                            <View style={styles.container_step_1}>
                                <View style={{...styles.row, marginTop: misc.window_height * 0.1}}>
                                    <FormLabel labelStyle={styles.formLabel}
                                               containerStyle={styles.formLabelContainer}>{"¿Cuál es tu objetivo de ahorro?"}</FormLabel>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <FormInput
                                            autoCapitalize='none'
                                            clearButtonMode='while-editing'
                                            underlineColorAndroid={"#ccc"}
                                            placeholder={"$ 7000"}
                                            placeholderTextColor={"#E3E3E3"}
                                            autoFocus={true}
                                            onChangeText={(goal) => this.setState({goal})}
                                            inputStyle={{
                                                ...styles.inputContainer,
                                                width: misc.window_width - 150,
                                                right: 26
                                            }}
                                            keyboardType={'numeric'}
                                            value={this.state.goal}/>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 15
                                            }}>
                                            <FormInput
                                                autoCapitalize='none'
                                                clearButtonMode='while-editing'
                                                underlineColorAndroid={"#ccc"}
                                                placeholder={"Descripción (opcional)"}
                                                placeholderTextColor={"#E3E3E3"}
                                                onChangeText={(desc) => this.setState({desc})}
                                                inputStyle={{...styles.inputContainer, fontSize: 20}}
                                                value={this.state.desc}/>
                                            <Feather
                                                name={'arrow-right-circle'}
                                                disabled={this.state.goal === ''}
                                                color={this.state.goal === '' ? '#E3E3E3' : '#666666'}
                                                size={42}
                                                onPress={() => this.onSubmit(4)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    }
                    {
                        this.state.currentPosition === 4 &&
                        <View style={styles.container}>
                            <View style={styles.row}>
                                <FormLabel labelStyle={styles.formLabel}
                                           containerStyle={styles.formLabelContainer}>{"¿En que momento te gustaría lograrlo?"}</FormLabel>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 15
                                    }}>
                                    <DatePicker
                                        style={{
                                            width: misc.window_width * 0.5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            left: '25%',
                                            marginRight: 20,
                                        }}
                                        date={this.state.datetime}
                                        mode="date"
                                        format="YYYY-MM-DD"
                                        placeholder="Selecciona fecha"
                                        confirmBtnText="Confirmar"
                                        cancelBtnText="Cancelar"
                                        showIcon={true}
                                        onDateChange={(datetime) => {
                                            this.setState({datetime: datetime});
                                        }}
                                    />
                                    <Feather
                                        name={'arrow-right-circle'}
                                        disabled={this.state.datetime === undefined}
                                        color={this.state.datetime === undefined ? '#E3E3E3' : '#666666'}
                                        size={42}
                                        onPress={() => this.onSubmit(5)}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                    {
                        this.state.currentPosition === 5 &&
                        <View>
                            <LottieView
                                source={congrats}
                                style={styles.container_congrats}
                                loop={false}
                                autoPlay={false}
                                autoSize
                                ref={animation => {
                                    this.animation = animation;
                                }}
                            />
                            {/*<Text style={{textAlign: "center"}} h4> {"Listo comparti el link y juga"} </Text>*/}
                            {/*<Button*/}
                            {/*raised*/}
                            {/*title={'Comparti'}*/}
                            {/*borderRadius={4}  //optional*/}
                            {/*backgroundColor={"#397af8"} //optional*/}
                            {/*containerViewStyle={styles.buttonContainer} //optional*/}
                            {/*onPress={this.onShare}*/}
                            {/*/>*/}
                        </View>
                    }
                </View>
            </AppFontLoader>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        plan: state.mainReducer.plan,
    }
}


export default connect(mapStateToProps, {getPlan, getPlanByUserId})(MatchCreator);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container_step_1: {
        flex: 1,
        marginLeft: 20,
    },
    container_congrats: {
        width: 400,
        height: 180,
        marginLeft: 45
    },
    buttonText: {
        fontWeight: "500"
    },
    search_field_container: {
        height: 150,
        width: device_width,
        position: 'absolute',
    },
    calloutSearch: {
        borderColor: "transparent",
        marginLeft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
        borderWidth: 0.0
    },
    buttonContainer: {
        marginVertical: padding * 2,
        marginHorizontal: 0
    },
    row: {
        marginVertical: padding - 2,
        marginHorizontal: 0
    },
    formLabel: {
        color: "#858b89",
        fontSize: 22,
        fontWeight: "200"
    },
    formLabelContainer: {
        position: "relative",
        marginBottom: 10
    },
    picker: {
        width: "90%",
        position: "relative",
        left: -(misc.window_width * 0.01),
    },
    inputContainer: {
        width: misc.window_width - 130,
        fontSize: 35,
        padding: 10,
    },
});



