import React from 'react';
import {Scene, Router, ActionConst, Stack} from 'react-native-router-flux';
const { StyleSheet, Platform } = require('react-native');

import Splash from '../modules/splash/Splash';
import Home from '../modules/main/scenes/Home';
//import MatchCreator from '../modules/main/scenes/MatchCreator';
import Detail from '../modules/main/scenes/Detail';
import MatchList from '../modules/main/scenes/MovieList';
import Explore from '../modules/main/scenes/Explore';
import TabBarIcon from './TabBarIcon'

import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';

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

    renderRightButton() {
        return ( <View >
            <OptionsMenu
                button={MoreIcon}
                buttonStyle={{ width: 40, height: 20, margin: 7.5, resizeMode: "contain" }}
                destructiveIndex={1}
                options={["BuscarPeliculas", "Cerrar Sesión"]}
                actions={[Actions.MatchList]}/>
    </View>)
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
                            <Scene key="Explore" component={Explore} title="Explorar" user={this.state.user} icon={(focused) => icon({focused, type: 'podium'})}/>
                            <Scene key="MatchList" component={MatchList} title="Buscar" user={this.state.user} icon={(focused) => icon({focused, type: 'search'})}/>
                            <Scene key="Home" component={Home} title="Mis Reseñas" type={ActionConst.REPLACE} initial={true} icon={(focused) => icon({focused, type: 'contact'})} rightTitle='MoreOps' rightButtonImage={MoreIcon} onRight={()=>{}}/>                            
                        </Scene>
                        <Scene key="Detail" component={Detail} title="Partido"  user={this.state.user} />
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
