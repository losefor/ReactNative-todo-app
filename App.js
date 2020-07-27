import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, StatusBar ,AsyncStorage } from 'react-native';
import { ApplicationProvider, Layout, Text, TopNavigation, Input, Drawer as UIKittenDrawer } from '@ui-kitten/components'
import BottomNav from './src/component/bottomNav/bottomNav'
import NestedNote from './src/component/miniApps/Advice/nestedNote'
import Main from './src/Main'
import { mapping, dark as darkTheme, light as lightTheme, IconRegistry } from '@eva-design/eva';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import  Header  from './src/component/header';
import About from './src/component/About';
// import { ScreenOrientation } from 'expo';


export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      darkTheme: false
    }

    this.changeTheme = this.changeTheme.bind(this)
    // this.Home = this.Home.bind(this)

  }


  changeTheme() {
    let newTheme = !this.state.darkTheme
    this.setState({
      darkTheme: newTheme
    })

    AsyncStorage.setItem('theme',JSON.stringify(newTheme))

  }


  UNSAFE_componentWillMount(){
    AsyncStorage.getItem('theme').then((json) =>{
      try{
         const theme = JSON.parse(json)

         this.setState({
           darkTheme:theme
         })
      }catch{

      }
    }

    )
  }
  render() {
    

    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator()
    const Home = ({ navigation }) => {
      return (

        <Stack.Navigator
          headerMode='none'
        >


          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerMode: 'none',
            }} >



            


          </Stack.Screen>


          <Stack.Screen name="nestedNote" component={NestedNote} />

          {/* <Stack.Screen name="home" component={Home} /> */}



        </Stack.Navigator>

      )
    }


  


    const DrawerContent = ({ navigation, state }) => {

      const onSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
      };

      return (
      <View
      style={styles.drawer}
      >

        <UIKittenDrawer
          data={[{ title: 'Home', },{ title: 'About' }]}
          selectedIndex={state.index}
          onSelect={onSelect}

          
        />


        <Layout>

          <Text
          style={styles.text}
            onPress={() => { this.changeTheme() }}
            >

            {this.state.darkTheme ? 'turn OFF dark theme' : 'turn ON dark theme'}
          </Text>

        </Layout>



      </View>
      );
    };


    return (

      
      
      
      <ApplicationProvider mapping={mapping} theme={this.state.darkTheme ? darkTheme : lightTheme}>
        <Layout style={styles.layout} >


      <StatusBar hidden />


         


          <NavigationContainer>

            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}
            >
              <Drawer.Screen name='Home' component={Home} />
              <Drawer.Screen name='About' component={About} />
              

            </Drawer.Navigator>


          </NavigationContainer>


        </Layout>
      </ApplicationProvider>


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
    borderWidth:1 , 
        borderColor:'transparent' , 
        borderBottomColor:'rgba(250 ,250 ,250 ,0.2)' ,
  },
  layout: {
    flex: 1,
  },
  drawer:{
   flex:1,
  //  justifyContent:"center",
  //  alignItems:'center'
  },
  text:{
    margin : 10 , 
    // borderColor:'transparent',
    borderTopColor : 'rgba(0 ,0 ,0 ,0.2)', 
    borderWidth : 1 , 
    
  }


});
