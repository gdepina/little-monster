import React from 'react';


import {AppLoading} from 'expo';

import * as Font from 'expo-font';


import FontAwesome from '../../node_modules/@expo/vector-icons/FontAwesome';


import MaterialIcons from '../../node_modules/@expo/vector-icons/MaterialIcons';


class AppFontLoader extends React.Component {


    state = {


        fontLoaded: false


    };


    async componentWillMount() {


        try {


            await Font.loadAsync({


                'FontAwesome':require('../config/assets/FontAwesome.ttf'),


                'MaterialIcons': require('../config/assets/MaterialIcons.ttf')


            });


            this.setState({fontLoaded: true});


        } catch (error) {


            console.log('error loading icon fonts', error);


        }


    }


    render() {


        if (!this.state.fontLoaded) {


            return <AppLoading/>;


        }


        return this.props.children;


    }


}


export {AppFontLoader};
