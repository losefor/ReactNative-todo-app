import React, { Component } from 'react';
import { View, TouchableOpacity, Switch, StyleSheet, NativeEventEmitter } from 'react-native';
import { Text, Input } from '@ui-kitten/components';

export default class List extends Component {

    constructor() {
        super()
        this.editText = this.editText.bind(this)
        this.changeScreen = this.changeScreen.bind(this)
    }

    editText(event) {

        let editedText = event.nativeEvent.text
        this.props.changeInEditMode(this.props.data.key, editedText)


    }


    changeScreen() {

        this.props.navigation.push('nestedNote' , 
            {
                text: this.props.data.text,
                desc:this.props.data.desc,
                checkList:this.props.data.checkList, 
                changeInEditMode:this.props.changeInEditMode,
                descOnChange : this.props.descOnChange , 
                onChangeCheckList: this.props.onChangeCheckList , 
                key:this.props.data.key

            }
            )

    }
    render() {

        const data = this.props.data

        const text = (

            <View style={Styles.textWrapper}>
                <Text style={data.complete && Styles.complete} category='p1' >{data.text}</Text>
            </View>

        )

        const editable = (

            <View style={Styles.textWrapper}>
                <Input
                    value={data.text}
                    onChange={this.editText}
                    multiline
                    maxLength={15}


                />
            </View>

        )

        const deleteButton = (

            <TouchableOpacity onPress={() => {
                this.props.removeHandler(data.key)
            }}>

                <Text category='h6' style={Styles.destroy} > X </Text>
            </TouchableOpacity>

        )


        const saveButton = (

            <TouchableOpacity onPress={() => {
                this.props.toggleEditMode(data.key, false)
            }}>

                <Text category='h6' style={Styles.save} > save </Text>
            </TouchableOpacity>


        )

        return (


            <TouchableOpacity
                key={data.key}
                style={Styles.list}
                onLongPress={() => {
                    // console.log('done')
                    this.props.toggleEditMode(data.key, true)
                }}
                onPress={this.changeScreen}
            >
                <View style={Styles.cont}>

                    <Switch
                        value={data.complete}
                        onValueChange={() => {
                            this.props.toggleComplete(data.key, data.complete)
                        }}
                    />

                    {data.editing ? editable : text}

                </View>

                {data.editing ? saveButton : deleteButton}




            </TouchableOpacity>





        );
    }
}


const Styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    header: {
        textAlign: 'left',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 10


    },
    input: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'


    },
    inputHolder: {
        width: "90%",
        marginLeft: 5
    },
    list: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: '#f8f8f8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'


    },
    check: {
        padding: 10,


    },
    textWrapper: {
        marginLeft: 10,
        alignItems:'center',
        justifyContent:'center'

    },
    complete: {
        textDecorationLine: 'line-through',
        textDecorationColor: 'tomato'

    },
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: ''

    },
    destroy: {
        color: 'tomato',

    },
    cont: {
        flexDirection: 'row'
    },
    bgTextCont: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1


    },
    bgText: {
        color: 'rgba(255,255,255,0.1)',
        fontSize: 28,
        padding: 20,
    },
    save: {
        borderWidth: 1,
        borderColor: 'lightgreen',
        borderRadius: 4,
        marginLeft: 8
    }
})


