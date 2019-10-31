import React, {Component} from 'react';

const {Text, StyleSheet, View} = require('react-native');
import Accordion from 'react-native-collapsible/Accordion';
import {FormLabel} from "react-native-elements";

const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    },
    {
        title: 'Second',
        content: 'Lorem ipsum...',
    },
];

const profileRiskTranslations = {
    low: 'Bajo',
    moderated: 'Moderado',
    high: 'Alto',
}

class AccordionView extends Component {
    state = {
        activeSections: [],
    };

    _renderHeader = section => {
        const reducer = (accumulator, currentValue) => accumulator.investmentType + "&" + currentValue.investmentType;
        const title = section.reduce(reducer);
        // const title = section.map((i) => i.term + "&");
        return (
            <View style={styles.content}>
                <Text>{title}</Text>
            </View>
        );
    };

    _renderSectionTitle = section => {
        const reducer = (accumulator, currentValue) => +accumulator.term + +currentValue.term;
        const term = section.reduce(reducer);
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{term}</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (<View>
                {section.map((plan) => {
                    const {investmentType, expectedProfit, risk, term, period} = plan;
                    return (<View>
                        <FormLabel>{investmentType}</FormLabel>
                        {/*<Text style={styles.planItem} h5>{expectedProfit}</Text>*/}
                        {/*<FormLabel>{'Riesgo'}</FormLabel>!*/}
                        {/*<Text style={styles.planItem} h5>{profileRiskTranslations[risk.toLowerCase()]}</Text>*/}
                        {/*<FormLabel>{'Duración'}</FormLabel>*/}
                        {/*<Text style={styles.planItem} h5>{`${term} ${period}`}</Text>*/}
                    </View>)

                })}
            </View>
        )
    };

    _updateSections = activeSections => {
        this.setState({activeSections});
    };

    render() {
        return (
            <Accordion
                sections={this.props.sections}
                activeSections={this.state.activeSections}
                renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        );
    }
}

const styles = StyleSheet.create({
    header: {},
    headerText: {},
    content: {}
});

export default AccordionView;

