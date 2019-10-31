import React from 'react';

var {View, StyleSheet, Alert} = require('react-native');

import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {FormLabel} from 'react-native-elements';

import { actions as auth, Theme } from "../"

import Form from "../components/Form"

const fields = [
    {
        key:'currentPassword',
        label: "CONTRASEÑA ACTUAL",
        placeholder:"*******",
        autoFocus:false,
        secureTextEntry:true,
        type: "password"
    },
    {
        key:'newPassword',
        label: "NUEVA CONTRASEÑA",
        placeholder:"*******",
        autoFocus:false,
        secureTextEntry:true,
        type: "password"
    },
    {
        key:'password',
        label: "CONFIRMAR CONTRASEÑA",
        placeholder:"*******",
        autoFocus:false,
        secureTextEntry:true,
        type: "password"
    }
];

class ChangePw extends React.Component {
    constructor() {
        super();
        this.state = {
            spinner: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        // this.setState({spinner: true});
        console.log(data);
        if (data.newPassword !== data.password) {
            return Alert.alert('Oops!', 'Las contraseñas deben ser iguales.');
        } else {
            auth.changePw && auth.changePw({ newPw: data.password, currentPw: data.currentPassword}, this.onSuccess, this.onError);
        }
        //this.props.changePw && this.props.changePw();
    }

    onSuccess() {
        this.setState({spinner: false});
        Actions.Main()
    }

    onError(error) {
        this.setState({spinner: false});
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.user && <FormLabel>{`USUARIO: ${this.props.user.email.toUpperCase()}`}</FormLabel>}
                <Form fields={fields} onSubmit={this.onSubmit}/>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'One moment...'}
                    textStyle={{ color: '#fff' }} />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, null)(ChangePw);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});



