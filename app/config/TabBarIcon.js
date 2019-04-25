import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from './Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={"#E50A13"}
      />
    );
  }
}
