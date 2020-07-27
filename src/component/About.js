import React, { Component } from 'react';
import { View, StyleSheet ,ScrollView } from 'react-native';
import { Layout, Text, TopNavigation , Button } from '@ui-kitten/components';
import Header from './header';

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Layout style={styles.container}>
                <TopNavigation

                    title='من انا...؟'
                    subtitle='نبذة تعريفية عني....'
                    alignment='center'
                    style={styles.nav}

                />
                

                <View style={styles.contContainer}>
                    

                    <Text category='s1'> هذا التطبيق تم تصميمه بواسطة </Text>
                    <Text category='h1'> محمد باقر </Text>
                    <Text category='h1'>m_losefor</Text>
                    <Text category='p2'> ذكرى اول تطبيق قمت ببرمجته </Text>
                    <Button style={styles.but} appearance='outline' status='info'> اقرا المزيد عني  </Button>
                </View>


            </Layout>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    nav:{
        // marginTop:15
        // backgroundColor:'red' ,
        borderWidth:1 , 
        borderColor:'transparent' , 
        borderBottomColor:'rgba(250 ,250 ,250 ,0.2)' ,
        
        
    },
    but:{
        marginTop:20
    }

})