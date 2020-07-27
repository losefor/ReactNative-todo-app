import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {Text , Layout} from '@ui-kitten/components';

export default class footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Layout level='2' style={styles.container}>
                <View style={styles.butContainer}>
                <View>
                    <Text style={styles.text}>count:{this.props.count}</Text>
                </View>

                    <TouchableOpacity
                        style={[styles.buttons, this.props.filter == 'ALL' && styles.selected]}
                        onPress={() => { this.props.onFilter('ALL') }}
                    >
                        <Text style={styles.text} >All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttons, this.props.filter == 'ACTIVE' && styles.selected]}
                        onPress={() => { this.props.onFilter('ACTIVE') }}>

                        <Text style={styles.text}>Active</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.buttons, this.props.filter == 'COMPLETED' && styles.selected]}
                        onPress={() => { this.props.onFilter('COMPLETED') }}>
                        <Text style={styles.text}>Completed</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[styles.buttons]}
                    onPress={this.props.clear}>
                        <Text style={styles.text} >
                            clear 
                        </Text>
                    </TouchableOpacity>
                
                </View>

            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',

    },
    butContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'rgba(0 ,0 ,0 ,.2)',
        padding:10

    },
    buttons: {
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'transparent' , 
        marginLeft:5
    },
    text: {
        // color: '#f8f8f8',

    },
    selected: {
        borderColor: 'tomato'
    }
})
