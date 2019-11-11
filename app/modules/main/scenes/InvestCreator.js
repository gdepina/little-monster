import React from 'react';

var {View, StyleSheet, Share, Alert, AsyncStorage, Image} = require('react-native');

import {connect} from 'react-redux';

import StepIndicator from 'react-native-step-indicator';
import {FormLabel, Button, Text, FormInput, List, ListItem, Badge} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import LottieView from 'lottie-react-native';
import {Actions} from 'react-native-router-flux';
import Onboarding from 'react-native-onboarding-swiper';
import {Feather, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {AppFontLoader} from '../../AppFontLoader';
import Splash from '../../splash/Splash';
import Home from './Home';
import {TextInputMask} from 'react-native-masked-text'
import MonthSelectorCalendar from 'react-native-month-selector';
import Spinner from 'react-native-loading-spinner-overlay';

const moment = require('moment');


import {actions} from "../"
import * as api from '../api';
import * as Theme from "../../../styles/Theme";

const {padding} = Theme;

const congrats = require('./assets/congrats.json');

import {misc} from "../../../styles/Theme"
import Colors from "../../../config/Colors";
import AccordionView from "../components/Accordion";
import actionType from "../actionTypes";

const device_width = misc.window_width;
const {getPlan, getPlanByUserId} = actions;


const profileRisksList = [
    {
        name: 'Conservador',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        onPressRightIcon: () => Alert.alert('Conservador', 'Se caracteriza por buscar inversiones que representen un crecimiento moderado, sin asumir riesgos importantes, priorizando tener una disponibilidad inmediata de sus inversiones y buscando minimizar la incidencia de las fluctuaciones del mercado.'),
        rightIcon: {name: 'info-outline', color: '#20b382'},
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
        onPressRightIcon: () => Alert.alert('Moderado', 'Se encuentra dispuesto a asumir ciertas oscilaciones en sus inversiones, esperando que en un mediano / largo plazo pueda obtener una mayor rentabilidad. Es un perfil intermedio, tratándose de personas que pueden tolerar cierto riesgo en sus inversiones, a cambio de una mayor rentabilidad.'),
        rightIcon: {name: 'info-outline', color: '#20b382'},
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
        onPressRightIcon: () => Alert.alert('Agresivo', 'Se caracteriza por inversores cuyo objetivo principal es maximizar el rendimiento de su cartera, asumiendo para ello un alto componente de riesgo. Están dispuestos a mantener sus inversiones por períodos largos, sin asignarle una alta prioridad a la disponibilidad inmediata de sus activos, y a asumir pérdidas de capital.'),
        rightIcon: {name: 'info-outline', color: '#20b382'},
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
            profitSaveRaw: 0,
            goalRaw: 0,
            preferSay: true,
            haveInvest: false,
            isReady: props.plan && Object.entries(props.plan).length > 0,
            showOnboarding: false,
            month: moment().add(1, 'month'),
            spinner: false,
        }
    }

    componentDidMount() {
        // AsyncStorage.clear();
        AsyncStorage.getItem('onboarding', (err, result) => {
            if (err) {
            } else {
                if (result == null) {
                    console.log("null value recieved", result);
                    this.setOnboardingVisible(true);
                } else {
                    console.log("result", result);
                }
            }
        });
        AsyncStorage.setItem('onboarding', JSON.stringify({"value": "true"}), (err, result) => {
            console.log("error", err, "result", result);
        });

        if (this.props.plan && Object.entries(this.props.plan).length === 0) {
            this.props.user && this.props.user.uid && this.props.getPlanByUserId(this.props.user.uid, () => this.setState({isReady: true}));
        }
    }

    setOnboardingVisible(visible) {
        this.setState({showOnboarding: visible});
    }

    renderOnboarding() {
        return (<Onboarding
            onDone={() => this.setOnboardingVisible(false)}
            nextLabel="Siguiente"
            skipLabel="Saltar"
            onSkip={() => this.setOnboardingVisible(false)}
            pages={[
                {
                    backgroundColor: '#20b382',
                    image: <Image source={require('./assets/HomeScreen.png')}/>,
                    title: 'Crea tu perfil',
                    subtitle: 'Buscaremos la forma mas rapida para que cumplas tu objetivo de ahorro, solo necesitamos ingreses los datos y te aconsejaremos.',
                },
                {
                    backgroundColor: '#fe6e58',
                    image: <Image source={require('./assets/HomeScreen.png')}/>,
                    title: 'Mix',
                    subtitle: 'Elegi el mix que se adapte a tus necesidades.',
                },
                {
                    backgroundColor: '#999',
                    image: <Image source={require('./assets/HomeScreen.png')}/>,
                    title: '¡Listo!',
                    subtitle: 'A partir de este momento podes darle seguimiento para lograr tu objetivo',
                }
            ]}
        />)
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.plan && Object.entries(nextProps.plan).length === 0) {
            nextProps.user && nextProps.user.uid && nextProps.getPlanByUserId(nextProps.user.uid, () => this.setState({isReady: true}));
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
        if (this.state.currentPosition > position && this.state.currentPosition !== 4) {
            this.setState({
                currentPosition: position,
            });
        }
    }

    getPlanDate(options, cb, errorCb) {
        api.getPlan(options)
            .then(res => {
                // cb();
                // const maxPeriod = Math.max(...item.map(o => o.period), 0);
                cb(Math.max(...res[0].map(o => o.period), 0));
            })
            .catch(error => {
                errorCb()
            })
    }

    onSubmit(step) {
        if (step === 3) {
            const {profitSaveRaw, entry, cost, risk, goalRaw} = this.state;

            const savings = profitSaveRaw || Math.abs(entry - cost);

            this.setState({spinner: true}, () =>
                this.getPlanDate({
                    savings,
                    objective: goalRaw,
                    risk,
                    period: 30,
                }, (days) => this.setState({
                    suggestedDays: days,
                    spinner: false,
                    currentPosition: step
                }), () => this.setState({spinner: false, preferSay: false, currentPosition: step}))
            );
        } else {
            this.setState({
                currentPosition: step,
            }, () => {
                // this.animation && this.animation.play();

                if (step === 4) {
                    const {profitSaveRaw, entry, cost, risk, goalRaw, month, desc} = this.state;
                    const initialDate = new Date();
                    const goalDate = new Date(month.format('MM-DD-YYYY'));

                    const savings = profitSaveRaw || Math.abs(entry - cost);
                    const period = this.dateDiffInDays(initialDate, goalDate);

                    this.setState({spinner: true}, () => this.props.getPlan({
                        savings,
                        objective: goalRaw,
                        risk,
                        period,
                    }, () => Actions.InvestAdviceList({
                        entry,
                        cost,
                        savings,
                        risk,
                        goal: goalRaw,
                        period,
                        initialDate,
                        goalDate,
                        desc
                    })))
                }
            });
        }
    }


    render() {
        const labels = ["Inversión", "Perfil", "Objetivo", "Tiempo"];
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

        if (this.state.showOnboarding) return this.renderOnboarding();

        return (
            <AppFontLoader>
                <Spinner
                    visible={this.state.spinner}
                    color={'#20b382'}
                    textStyle={{color: '#20b382'}}/>
                <View style={styles.container}>
                    <View style={{marginVertical: 40}}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={this.state.currentPosition}
                            labels={labels}
                            stepCount={4}
                            onPress={this.onPressIndicator}
                        />
                    </View>
                    {
                        this.state.currentPosition === 0 &&
                        <View style={styles.container}>
                            <View style={styles.container_step_1}>
                                {/*{this.state.preferSay &&*/}
                                {/*<View style={{...styles.row, marginTop: misc.window_height * 0.1}}>*/}
                                {/*<FormLabel labelStyle={styles.formLabel}*/}
                                {/*containerStyle={styles.formLabelContainer}>{"¿Cuál es su ingreso mensual?"}</FormLabel>*/}
                                {/*<View*/}
                                {/*style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
                                {/*<FormInput*/}
                                {/*autoCapitalize='none'*/}
                                {/*clearButtonMode='while-editing'*/}
                                {/*underlineColorAndroid={"#ccc"}*/}
                                {/*placeholder={"(ARS) $10000"}*/}
                                {/*placeholderTextColor={"#E3E3E3"}*/}
                                {/*autoFocus={false}*/}
                                {/*onChangeText={(entry) => this.setState({entry})}*/}
                                {/*inputStyle={styles.inputContainer}*/}
                                {/*keyboardType={'numeric'}*/}
                                {/*value={this.state.entry}/>*/}
                                {/*<Feather*/}
                                {/*name={'arrow-right-circle'}*/}
                                {/*disabled={this.state.entry === ''}*/}
                                {/*color={this.state.entry === '' ? '#E3E3E3' : '#20b382'}*/}
                                {/*size={42}*/}
                                {/*onPress={() => this.onSubmit(1)}*/}
                                {/*/>*/}
                                {/*</View>*/}
                                {/*<View style={{marginTop: 45}}>*/}
                                {/*<Badge containerStyle={styles.badgePreferNot}*/}
                                {/*onPress={() => this.setState({preferSay: false})}*/}
                                {/*value="Prefiero no decirlo"/>*/}
                                {/*<Text style={{*/}
                                {/*textAlign: "center",*/}
                                {/*color: '#858b89',*/}
                                {/*marginTop: 30*/}
                                {/*}}> {"Tenga en cuenta que una vez creado su perfil podrá modificar los datos."} </Text>*/}
                                {/*</View>*/}
                                {/*</View>*/}
                                {/*}*/}
                                <View style={{...styles.row, marginTop: misc.window_height * 0.1}}>
                                    <FormLabel labelStyle={styles.formLabel}
                                               containerStyle={styles.formLabelContainer}>{"¿Cuanto te gustaria invertir?"}</FormLabel>
                                    <View
                                        style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <TextInputMask
                                            type={'money'}
                                            options={{
                                                precision: 0,
                                                separator: ',',
                                                delimiter: '.',
                                                unit: 'ARS $',
                                                suffixUnit: ''
                                            }}
                                            style={styles.inputContainer}
                                            value={this.state.profitSave}
                                            autoCapitalize='none'
                                            clearButtonMode='while-editing'
                                            underlineColorAndroid={"#ccc"}
                                            placeholder={"ARS $1.500"}
                                            placeholderTextColor={"#E3E3E3"}
                                            autoFocus={true}
                                            includeRawValueInChangeText={true}
                                            onChangeText={(maskedText, rawText) => {
                                                this.setState({
                                                    profitSave: maskedText,
                                                    profitSaveRaw: rawText
                                                })
                                            }}
                                        />
                                        {/*<FormInput*/}
                                        {/*autoCapitalize='none'*/}
                                        {/*clearButtonMode='while-editing'*/}
                                        {/*underlineColorAndroid={"#ccc"}*/}
                                        {/*placeholder={"(ARS) $10000"}*/}
                                        {/*placeholderTextColor={"#E3E3E3"}*/}
                                        {/*autoFocus={true}*/}
                                        {/*onChangeText={(profitSave) => this.setState({profitSave})}*/}
                                        {/*inputStyle={styles.inputContainer}*/}
                                        {/*keyboardType={'numeric'}*/}
                                        {/*value={this.state.profitSave}/>*/}
                                        <Feather
                                            name={'arrow-right-circle'}
                                            disabled={this.state.profitSaveRaw <= 1499}
                                            color={this.state.profitSaveRaw <= 1499 ? '#E3E3E3' : '#20b382'}
                                            size={42}
                                            onPress={() => this.onSubmit(1)}
                                        />
                                    </View>
                                    <View style={{marginTop: 20}}>
                                        {/*<Badge containerStyle={styles.badgePreferNot}*/}
                                        {/*onPress={() => this.setState({preferSay: false})}*/}
                                        {/*value="Prefiero no decirlo"/>*/}
                                        <Text style={{
                                            textAlign: "center",
                                            color: '#858b89',
                                            marginTop: 15,
                                            fontSize: 18,
                                        }}> {"Inversión minima ARS $1500."} </Text>
                                        <Text style={{
                                            textAlign: "center",
                                            color: '#858b89',
                                            marginTop: 15
                                        }}> {"Una vez creado el plan podrá modificar los datos."} </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    }
                    {
                        this.state.currentPosition === 10 &&
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
                                            placeholder={"(ARS) $3000"}
                                            placeholderTextColor={"#E3E3E3"}
                                            autoFocus={true}
                                            onChangeText={(cost) => this.setState({cost})}
                                            inputStyle={styles.inputContainer}
                                            keyboardType={'numeric'}
                                            value={this.state.cost}/>
                                        <Feather
                                            name={'arrow-right-circle'}
                                            disabled={this.state.cost === ''}
                                            color={this.state.cost === '' ? '#E3E3E3' : '#20b382'}
                                            size={42}
                                            onPress={() => this.onSubmit(2)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                    }
                    {
                        this.state.currentPosition === 1 &&
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
                                                this.setState({risk: l.key}, () => this.onSubmit(2));
                                            }}
                                            onPressRightIcon={l.onPressRightIcon}
                                            rightIcon={l.rightIcon}
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
                        this.state.currentPosition === 2 &&
                        <View style={styles.container}>
                            <View style={styles.container_step_1}>
                                <View style={{...styles.row, marginTop: misc.window_height * 0.1}}>
                                    <FormLabel labelStyle={styles.formLabel}
                                               containerStyle={styles.formLabelContainer}>{"¿Cuál es tu objetivo de ahorro?"}</FormLabel>
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <TextInputMask
                                            type={'money'}
                                            options={{
                                                precision: 0,
                                                separator: ',',
                                                delimiter: '.',
                                                unit: 'ARS $',
                                                suffixUnit: ''
                                            }}
                                            style={{...styles.inputContainer, marginRight: 42}}
                                            value={this.state.goal}
                                            autoCapitalize='none'
                                            clearButtonMode='while-editing'
                                            underlineColorAndroid={"#ccc"}
                                            placeholder={"ARS $0"}
                                            placeholderTextColor={"#E3E3E3"}
                                            autoFocus={true}
                                            includeRawValueInChangeText={true}
                                            onChangeText={(maskedText, rawText) => {
                                                this.setState({
                                                    goal: maskedText,
                                                    goalRaw: rawText
                                                })
                                            }}
                                        />
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
                                                disabled={this.state.goalRaw === 0}
                                                color={this.state.goalRaw === 0 ? '#E3E3E3' : '#20b382'}
                                                size={42}
                                                onPress={() => this.onSubmit(3)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }

                    {
                        this.state.currentPosition === 3 &&
                        <View style={styles.container}>
                            <View style={styles.row}>
                                <FormLabel labelStyle={styles.formLabel}
                                           containerStyle={styles.formLabelContainer}>{""}</FormLabel>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 15
                                    }}>
                                    {this.state.preferSay &&
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 15
                                        }}>
                                            <FormLabel labelStyle={{...styles.formLabel, fontSize: 18}}
                                                       containerStyle={styles.formLabelContainer}>{`Encontramos un plan de ${this.state.suggestedDays} días`}</FormLabel>
                                            <Feather
                                                name={'arrow-right-circle'}
                                                disabled={this.state.suggestedDays === undefined}
                                                color={this.state.suggestedDays === undefined ? '#E3E3E3' : '#20b382'}
                                                size={42}
                                                onPress={() => this.onSubmit(4)}
                                            />
                                        </View>
                                        <View style={{marginTop: 45}}>
                                            <Badge containerStyle={styles.badgePreferNot}
                                                   onPress={() => this.setState({preferSay: false})}
                                                   value="Prefiero elegir periodo"/>
                                        </View>
                                    </View>
                                    }

                                    {!this.state.preferSay &&
                                    <View style={{...styles.container, marginBottom: 50}}>
                                        <FormLabel labelStyle={{...styles.formLabel, fontSize: 18}}
                                                   containerStyle={styles.formLabelContainer}>{`Elije el periodo e intentaremos cumplir tus expectativas`}</FormLabel>
                                        <MonthSelectorCalendar
                                            selectedDate={this.state.month}
                                            onMonthTapped={(date) => this.setState({month: date})}
                                            maxDate={moment().add(10, 'years')}
                                            minDate={moment().add(1, 'month')}
                                            selectedBackgroundColor={'#20b382'}
                                            nextIcon={<MaterialIcons
                                                name={'keyboard-arrow-right'}
                                                color={'gray'}
                                                // style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}
                                                size={40}
                                            />}
                                            prevIcon={<MaterialIcons
                                                name={'keyboard-arrow-left'}
                                                color={'gray'}
                                                // style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}
                                                size={40}
                                            />}
                                        />
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            marginTop: 15,
                                            marginRight: 15,
                                        }}>
                                            <Feather
                                                name={'arrow-right-circle'}
                                                disabled={this.state.month === undefined}
                                                color={this.state.month === undefined ? '#E3E3E3' : '#20b382'}
                                                size={42}
                                                onPress={() => this.onSubmit(4)}
                                            />
                                        </View>
                                    </View>
                                    }
                                </View>
                            </View>
                        </View>
                    }
                    {
                        this.state.currentPosition === 4 &&
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
        fontSize: 32,
        padding: 10,
        color: '#848C91',
    },
    badgePreferNot: {
        width: "50%",
        backgroundColor: '#aaaaaa',
        left: (misc.window_width * 0.2),
    },

});



