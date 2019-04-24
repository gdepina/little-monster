import React from 'react';
import {Scene, Router, ActionConst, Stack} from 'react-native-router-flux';
const { StyleSheet, Platform } = require('react-native');

import Splash from '../modules/splash/Splash';
import Home from '../modules/main/scenes/Home';
//import MatchCreator from '../modules/main/scenes/MatchCreator';
import Detail from '../modules/main/scenes/Detail';
import MatchList from '../modules/main/scenes/MovieList';
import TabBarIcon from './TabBarIcon'

import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';

import firebase from "../config/firebase"
import { actions } from "../modules/auth"
import {connect} from 'react-redux';

const { storeUser } = actions;



class Routes extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        console.ignoredYellowBox = ['Setting a timer']
        this.checkToken();
    }

    checkToken() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) this.setState({isReady: true, isLoggedIn: true, user: user}, () => this.props.storeUser(user))
            else this.setState({isReady: true, isLoggedIn: false})
        });
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>


        const icon =  ({ focused, type }) => (
            <TabBarIcon
              focused={focused}
              name={
                Platform.OS === 'ios'
                  ? `ios-${type}${focused ? '' : '-outline'}`
                  : `md-${type}`
              }
            />
          )
        return (
            <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} tintColor='white'
                    barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}
              >
                <Scene key="root" hideNavBar>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="Todas las pelis en un solo lugar" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register"/>
                        <Scene key="Login" component={Login} title="Login"/>
                    </Stack>


                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key='root' tabs={true} hideNavBar>
                            {/*<Scene key="MatchCreator" component={MatchCreator} title="Crea tu partido" user={this.state.user} />*/}
                            <Scene key="Home" component={Home} title="Perfil" type={ActionConst.REPLACE}  hideNavBar icon={(focused) => icon({focused, type: 'contact'})}/>
                            <Scene key="MatchList" component={MatchList} title="Buscar" user={this.state.user} initial={true} icon={(focused) => icon({focused, type: 'search'})}/>
                        </Scene>
                        <Scene key="Detail" component={Detail} title="Detalle"  user={this.state.user} />
                    </Stack>
                </Scene>
            </Router>
        )
    }
}


export default connect(null, {storeUser})(Routes);

const styles = StyleSheet.create({
    navBar: {
        backgroundColor:'#397af8',
    },
    navBarTitle:{
        color:'#FFFFFF'
    },
    barButtonTextStyle:{
        color:'#FFFFFF'
    },
    barButtonIconStyle:{
        tintColor:'#FFFFFF'
    },

});
