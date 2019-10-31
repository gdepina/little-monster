import React from 'react';
import {Scene, Router, ActionConst, Stack} from 'react-native-router-flux';
const { StyleSheet, Platform } = require('react-native');

import Splash from '../modules/splash/Splash';
import Home from '../modules/main/scenes/Home';
//import MatchCreator from '../modules/main/scenes/MatchCreator';
import Detail from '../modules/main/scenes/Detail';
import InvestAdviceList from '../modules/main/scenes/InvestAdviceList';
import InvestCreator from '../modules/main/scenes/InvestCreator';
import TabBarIcon from './TabBarIcon'

import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';
import ChangePw from '../modules/auth/scenes/ChangePw';

import firebase from "../config/firebase"
import { actions } from "../modules/auth"
import {connect} from 'react-redux';


const MoreIcon = require('./more.png');

const { storeUser } = actions;



class Routes extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false,
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
                        <Scene key="Welcome" component={Welcome} title="Money Fit" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Crea tu cuenta"/>
                        <Scene key="Login" component={Login} title="Ingreso"/>
                    </Stack>

                    {/*<Stack key="Onboarding" initial={this.state.user.metadata.creationTime === this.state.user.metadata.lastSignInTime}>*/}
                        {/*<Scene key="Welcome" component={Welcome} title="Todas las pelis en un solo lugar" initial={true} hideNavBar/>*/}
                    {/*</Stack>*/}

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Explore" component={InvestCreator} title="Comenzemos"  initial={true} user={this.state.user} icon={(focused) => icon({focused, type: 'podium'})} hideNavBar />
                        <Scene key="InvestAdviceList" component={InvestAdviceList} title="Elige el mix" user={this.state.user} icon={(focused) => icon({focused, type: 'search'})} renderBackButton={()=>(null)} renderLeftButton={()=>(null)} />
                        <Scene key="Home" component={Home} title="Perfil"  type={ActionConst.REPLACE} icon={(focused) => icon({focused, type: 'contact'})} hideNavBar />
                        <Scene key="ChangePass" component={ChangePw} title="Cambiar contraseña"/>
                        <Scene key="Detail" component={Detail} title="Composición del mix"  user={this.state.user} />
                    </Stack>
                </Scene>
            </Router>
        )
    }
}


export default connect(null, {storeUser})(Routes);

const styles = StyleSheet.create({
    navBar: {
        backgroundColor:'#20b382',
    },
    navBarTitle:{
        color:'#FFFFFF'
    },
    barButtonTextStyle:{
        color:'#FFFFFF'
    },
    barButtonIconStyle:{
        tintColor:'#FFFFFF'
    }

});
