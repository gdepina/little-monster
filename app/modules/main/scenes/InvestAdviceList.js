import React from 'react';

const {View, StyleSheet, Dimensions, FlatList, ActivityIndicator, TouchableOpacity} = require('react-native');

import Spinner from 'react-native-loading-spinner-overlay';

import {List, ListItem} from 'react-native-elements'
import LottieView from "lottie-react-native";

import {connect} from 'react-redux';

const movie = require('./assets/sorry.json');

import {AppFontLoader} from '../../AppFontLoader';
import {Actions} from "react-native-router-flux";
import {Text} from "react-native";


const {width, height} = Dimensions.get('window');

const profileRiskTranslations = {
    low: 'Bajo',
    moderated: 'Moderado',
    high: 'Alto',
}

class InvestAdviceList extends React.Component {
    constructor() {
        super();
        this.renderFooter = this.renderFooter.bind(this);
        this.onPressRow = this.onPressRow.bind(this);

        this.state = {
            loading: true,
            data: null,
            spinner: false,
        }
    }


    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    }

    renderFooter() {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    onPressRow(advice) {
        const {entry, cost, savings, risk, goal, period, desc, initialDate, goalDate} = this.props;
        return Actions.Detail({advice, entry, cost, savings, risk, goal, period, desc, initialDate, goalDate, showButton: true});
    }


    render() {
        const mixes = this.props.mixes;
        return (
            <AppFontLoader>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'One moment...'}
                    textStyle={{color: '#fff'}}/>
                <View style={styles.container}>
                    {/*{this.renderHeader()}*/}
                    <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0, top: -20}}>
                        <FlatList
                            data={mixes.investmentAdvice}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListEmptyComponent={!this.state.spinner && this.getListEmptyComponent}
                            // ListFooterComponent={this.renderFooter}
                            renderItem={this.getRenderItem()}
                            keyExtractor={item => item.id}
                        />
                    </List>
                </View>
            </AppFontLoader>

        )
    }

    getRenderItem() {
        return ({item, index}) => {
            const reducer = (accumulator, currentValue) => accumulator.investmentType + " & " + currentValue.investmentType;
            const title = item.reduce(reducer);
            const reducer2 = (accumulator, currentValue) => +accumulator.term + +currentValue.term;
            const term = item.reduce(reducer2);
            return <ListItem
                key={index}
                roundAvatar
                title={title}
                subtitle={`Logra tu obejtivo en ${term} días`}
                containerStyle={{borderBottomWidth: 0}}
                onPress={() => this.onPressRow(item)}
            />
        }
    }

    getListEmptyComponent() {
        return (<View style={styles.emptyContainer}>
            <LottieView
                source={movie}
                style={styles.movie}
                loop
                autoPlay
            />
            <Text style={styles.shadow}>Ops, no encontramos resultados para tu busqueda</Text>
        </View>)
    }
}

function mapStateToProps(state, props) {
    return {
        mixes: state.mainReducer.mixes,
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, null)(InvestAdviceList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    movie: {
        width: width,
        height: height * 0.5,
    },
    shadow: {
        color: '#fff',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 1,
        textShadowColor: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        width: width * 0.8,
        textAlign: 'center',
    },
    planItem: {
        marginLeft: 20,
    }
});



