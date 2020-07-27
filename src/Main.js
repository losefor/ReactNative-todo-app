import React from 'react'
import { Text, Input, Layout, Spinner, Drawer } from '@ui-kitten/components'
import { StyleSheet, ScrollView, View, TouchableOpacity, Keyboard, AsyncStorage } from 'react-native'
import Header from './component/header';
import List from './component/List';
import Footer from './component/footer';

const filterdItems = (items, filter) => {
    // console.log('1-' + items)
    return items.filter((item) => {

        // console.log('2-' + filter)


        if (filter == 'ALL') {
            // console.log('1')
            return true;
        }

        else if (filter == 'COMPLETED') {
            // console.log('2')
            return item.complete;
        }
        else if (filter == 'ACTIVE') {
            // console.log('3')
            return !item.complete;
        }
    })
}


export default class Advice extends React.Component {

    constructor() {
        super()


        this.state = {
            text: '',
            items: [],
            allComplete: false,
            filter: "ALL",
            filterdItems: [],
            isLoading: true
        }


        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.toggleHandler = this.toggleHandler.bind(this)
        this.toggleComplete = this.toggleComplete.bind(this)
        this.removeHandler = this.removeHandler.bind(this)
        this.onFilter = this.onFilter.bind(this)
        this.clearHandle = this.clearHandle.bind(this)
        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.changeInEditMode = this.changeInEditMode.bind(this)
        this.descOnChange = this.descOnChange.bind(this)
        this.onChangeCheckList = this.onChangeCheckList.bind(this)

    }


    clearHandle() {

        this.setState({
            items: filterdItems(this.state.items, 'ACTIVE')
        })
    }

    changeHandler(event) {

        this.setState({
            text: event.nativeEvent.text
        })

    };

    submitHandler() {


        if (!this.state.text) return;
        const newItem = [
            ...this.state.items,
            {
                key: Date.now(),
                text: this.state.text,
                desc: '',
                checkList: [{
                    id: 32746327843264,
                    title: '1st check list',
                    completed: false
                }, {
                    id: 2342343242,
                    title: '2nd check list',
                    completed: false
                }],
                complete: false

            }
        ]
        this.setState({
            items: newItem,
            text: ''
        })

        AsyncStorage.setItem('items', JSON.stringify(newItem))





        // this.props.navigation.push('Advice', {
        //     name: this.state.text,

        // })
    }


    toggleHandler() {
        this.props.change()
        const complete = !this.state.allComplete
        const newItems = this.state.items.map((item) => (
            { ...item, complete }
        ))
        // console.table(newItems)

        this.setState({
            items: newItems,
            allComplete: complete
        })

        AsyncStorage.setItem('items', JSON.stringify(this.state.items))


    }


    toggleComplete(key, complete) {

        const newItems = this.state.items.map((item) => {
            if (item.key != key) return item;
            return {
                ...item,
                complete: !complete
            }
        })
        // this.setState({
        //     filterdItems: filterdItems(this.state.items, this.state.filter)

        // })

        this.setState({
            items: newItems,
        })

        AsyncStorage.setItem('items', JSON.stringify(this.state.items))

    }

    removeHandler(key) {
        const newItems = this.state.items.filter((item) => (
            item.key != key
        ))

        this.setState({
            items: newItems
        })
        AsyncStorage.setItem('items', JSON.stringify(newItems))

    }

    onFilter(filter) {

        // updating the filter state 
        this.setState({
            filterdItems: filterdItems(this.state.items, filter),
            filter,

        })




        AsyncStorage.setItem('items', JSON.stringify(this.state.items))
    }


    UNSAFE_componentWillMount() {
        AsyncStorage.getItem('items').then((json) => {
            try {

                const items = JSON.parse(json)

                this.setState({
                    items: items || [],
                    isLoading: false
                })
            } catch (e) { }
        })
    }

    toggleEditMode(key, editing) {

        const newItems = this.state.items.map((data) => {
            if (data.key != key) return data;
            return {
                ...data,
                editing
            }
        })

        // console.table(newItems)
        // console.table(newItems)
        this.setState({
            items: newItems
        })



    }

    changeInEditMode(key, text) {

        const newItems = this.state.items.map((data) => {
            if (data.key != key) return data;
            return {
                ...data,
                text,

            }
        })

        this.setState({
            items: newItems
        })

        AsyncStorage.setItem('items', JSON.stringify(newItems))

    }

    descOnChange(key, desc) {

        const newItems = this.state.items.map((data) => {
            if (data.key != key) return data;
            return {
                ...data,
                desc
            }
        })

        // console.table(newItems)

        this.setState({
            items: newItems
        })

        AsyncStorage.setItem('items', JSON.stringify(this.state.items))

    }

// not removing but for changing 
    onChangeCheckList(key, checkList) {

        let newItem = this.state.items.filter((data) => (
            data.key == key
        ))

        let editedItem = newItem.map((data) => (
            {
                ...data,
                checkList
            }
        ))

        let sepratItems = this.state.items.filter((data) => (
            data.key != key
        ))

        this.setState({
            items:[...editedItem , ...sepratItems]
        })


        AsyncStorage.setItem('items' , JSON.stringify([...editedItem , ...sepratItems]))

    }

    













    render() {



        let items = filterdItems(this.state.items, this.state.filter).map((data, index) => (
            <List
            key={index}
                data={data}
                filterdItems={filterdItems}
                items={this.state.items}
                filter={this.state.filter}
                toggleComplete={this.toggleComplete}
                removeHandler={this.removeHandler}
                toggleEditMode={(key, editing) => this.toggleEditMode(key, editing)}
                changeInEditMode={(key, text) => this.changeInEditMode(key, text)}
                descOnChange={this.descOnChange}
                onChangeCheckList={this.onChangeCheckList}
                {...this.props}
            />
        ))



        let bgText = () => {
            switch (this.state.filter) {
                case 'ALL': return <Text style={Styles.bgText}>ALL</Text>;
                case 'ACTIVE': return <Text style={Styles.bgText}>ACTIVE</Text>;
                case 'COMPLETED': return <Text style={Styles.bgText}>COMPLETED</Text>;

            }
        }



        return (


            <Layout style={Styles.container} >

                <Header navigation={this.props.navigation} />


                <View style={Styles.input}>
                    <TouchableOpacity style={Styles.check} onPress={this.toggleHandler}>
                        <Text  >{String.fromCharCode(10003)}</Text>
                    </TouchableOpacity>

                    <Input
                        blurOnSubmit={false}
                        placeholder='what you want to do ??'
                        onChange={this.changeHandler}
                        onSubmitEditing={this.submitHandler}
                        returnKeyType='done'
                        value={this.state.text}
                        style={Styles.inputHolder}
                        status={this.state.text == '' ? 'danger' : ''}
                        caption={this.state.text == '' ? 'This field should not be empty.' : ''}
                    />
                </View>

                <ScrollView onScroll={() => { Keyboard.dismiss() }}>

                    {items}

                </ScrollView>













                <Footer
                    filter={this.state.filter}
                    onFilter={this.onFilter}
                    clear={this.clearHandle}
                    count={filterdItems(this.state.items, 'ALL').length} />


                {this.state.isLoading &&
                    <View style={Styles.loading}>
                        <Spinner animating />
                    </View>}

                <View style={Styles.bgTextCont}>
                    {bgText()}
                </View>
            </Layout>


        )
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
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 7


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
        marginLeft: 10
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
    }
})


