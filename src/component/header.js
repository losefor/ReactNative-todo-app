import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TopNavigation, Text, Icon, Layout } from '@ui-kitten/components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import {Icon} from 'react-native-vector-icons';
import { Ionicons, FontAwesome } from '@expo/vector-icons'


// type Props = {}
export default class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View level='3'>



        {/* <FontAwesomeIcon icon={ faCoffee } /> */}



        <TopNavigation

          title='ToDo list'
          subtitle='Enter what you need'
          alignment='center'
          style={styles.nav}
          leftControl={(
            // <Ionicons name='stepforward' />
            // <FontAwesomeIcon icon={faCoffee} />
            <Text onPress={()=>{this.props.navigation.toggleDrawer()}}>Nav</Text>
          )}
        />
      </View>


    );
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: 'rgba(250 ,250 ,250 ,0.2)',

  },
  layout: {
    flex: 1,


  }
});
