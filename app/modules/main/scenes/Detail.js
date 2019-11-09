import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Text,
    FlatList,
    Alert
} from "react-native";
import {ListItem, FormInput, FormLabel, Card, List, Button} from 'react-native-elements';
import {actions} from "../"
import {Feather, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

import Colors from "../../../config/Colors";
import * as Theme from "../../../styles/Theme";
import {Actions} from "react-native-router-flux";

const {padding} = Theme;

const {createInvest} = actions;

//para obtener dimension de la pantalla
const {width, height} = Dimensions.get('window');

class MoviePoster extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            disabled: false,
        };

    }

    onSubmit() {
        const {entry, cost, savings, risk, goal, initialDate, goalDate, desc, createInvest, user, advice, period} = this.props;
        this.setState({disabled: true}, () => {
            createInvest(user.uid, entry, cost, savings, risk, goal, initialDate, goalDate, desc, advice);
            Actions.Home({entry, cost, savings, risk, goal, initialDate, goalDate, desc, advice, period});
        })

    }

    renderBody(item) {
        const profileRiskTranslations = {
            low: 'Bajo',
            moderated: 'Moderado',
            high: 'Alto',
        }
        const dayTranslation = {
            day: 'días',
        }
        const {stockName, effectiveProfit, risk, period, investmentAmount, tna, description} = item;

        const translatedRisk = profileRiskTranslations[risk.toLowerCase()];

        return (<View>
            <View>
                <FormLabel labelStyle={{fontSize: 14, fontWeight: 'normal'}}>{'Invierte '} <Text
                    style={{...styles.planItem, fontSize: 14}}
                    h5>{`$ ${investmentAmount.toFixed(2)}`}</Text> {' gana '}
                    <Text style={{...styles.planItem, color: '#20b382', fontSize: 14,}}
                          h5>{`$ ${effectiveProfit.toFixed(2)}.`}</Text>
                </FormLabel>
            </View>
            <View>
                <FormLabel labelStyle={{fontWeight: 'normal'}}>{'Riesgo: '} <Text style={styles.softItem}
                                                                                  h5>{translatedRisk}</Text></FormLabel>
            </View>
            <View>
                <FormLabel labelStyle={{fontWeight: 'normal'}}>{'Periodo: '} <Text style={styles.softItem}
                                                                                   h5>{`${period} días`}</Text></FormLabel>
            </View>
            <View>
                <FormLabel labelStyle={{fontWeight: 'normal'}}>{'TNA: '} <Text style={styles.softItem}
                                                                               h5>{`${tna}%`}</Text></FormLabel>
            </View>
            <View>

                <FormLabel labelStyle={{fontWeight: 'normal'}}>
                    {description && <Text style={{...styles.softItem, color: 'blue', fontSize: 14}}
                                          onPress={() => Alert.alert(stockName, description)}
                                          h5>{`+ Info`}</Text>}</FormLabel>
            </View>
        </View>)
    }

    getRenderItem() {
        return ({item, index}) => {
            const {investmentType, stockName} = item;
            return (<Card title={`#${index + 1} ${investmentType} - ${stockName}`}>
                {this.renderBody(item)}
            </Card>)

        }
    }


    render() {
        return (
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0, top: -20}}>
                        <FlatList
                            data={this.props.advice}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListEmptyComponent={!this.state.spinner && this.getListEmptyComponent}
                            // ListFooterComponent={this.renderFooter}
                            renderItem={this.getRenderItem()}
                            keyExtractor={item => item.id}
                        />
                        {this.props.showButton && <Button
                            raised
                            title={'Elegir'}
                            borderRadius={4}  //optional
                            backgroundColor={"#20b382"} //optional
                            containerViewStyle={styles.buttonContainer} //optional
                            onPress={this.onSubmit}
                            disabled={this.state.disabled}
                        />}
                    </List>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    scrollViewContainer: {
        flex: 1
    },
    buttonModalContainer: {
        width: width * 0.9,
        marginLeft: width * 0.05,
    },
    descContainer: {
        marginBottom: 20,
    },
    rate: {
        flexDirection: 'row',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inline: {flex: 1, flexDirection: 'row'},
    textInput: {
        // borderBottomColor: '#9E9E9E',
        // borderBottomWidth: 2,
        marginBottom: 30,
        height: height * 0.2
    },
    cross: {flexDirection: 'row', justifyContent: 'flex-end'},
    shadow: {
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        marginLeft: 6,
    },
    shadowRuntime: {
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        marginLeft: 6,
        marginTop: 15,
    },
    cardContainer: {
        height: height * 0.32,
        width: width * 0.6,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#E50A13',
        backgroundColor: 'rgba(30,33,35,0.5)',
    },
    listcontainer: {},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        marginTop: 25,
    },
    planItem: {
        fontWeight: 'bold',
        color: '#000',
    },
    softItem: {
        fontWeight: 'normal',
        color: '#000',
    },
    buttonContainer: {
        marginVertical: padding * 2,
        marginHorizontal: 0
    },

});

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, {createInvest})(MoviePoster);


