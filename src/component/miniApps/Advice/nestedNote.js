import React from 'react'
import { Text, Layout, TopNavigation, Input , Button  } from '@ui-kitten/components'
import { StyleSheet, ScrollView, View , PushNotificationEventName, Keyboard } from 'react-native'
import Header from '../../header';
// import { createStackNavigator } from '@react-navigation/stack';

export default class NestedNote extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text:'',
            desc:'',
            checkList:[]

        }
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onDescChange = this.onDescChange.bind(this)
        this.onRemoveCheckList = this.onRemoveCheckList.bind(this)
        this.onCheckListchange = this.onCheckListchange.bind(this)
    }

    onTitleChange(e){
        
        this.props.route.params.changeInEditMode(this.props.route.params.key , this.state.text )
            this.setState({
                text: e.nativeEvent.text
            })
    }

    onCheckListchange( id , title ){

        const newItems = this.state.checkList.map((data)=>{
            if (data.id != id) return data ; 
            return {
                ...data,
                title
            }
        })

        this.setState({
            checkList:newItems
        })

        

        this.props.route.params.onChangeCheckList(this.props.route.params.key, newItems)


    }



    onDescChange(e){
        this.props.route.params.descOnChange(this.props.route.params.key , this.state.desc)
        this.setState({
            desc: e.nativeEvent.text
        })
       
    }

    onRemoveCheckList(key){

        // console.table(this.state.checkList)
        
        const newItems = this.state.checkList.filter((item)=>(
            key != item.id
        ))
    
        this.setState({
            checkList:newItems
        })
        this.props.route.params.onChangeCheckList(this.props.route.params.key, newItems)
    
        }

    UNSAFE_componentWillMount(){
        this.setState({
            text:this.props.route.params.text,
            desc:this.props.route.params.desc ,
            checkList:this.props.route.params.checkList
        })


    }
    render() {

        // console.log(this.props.route.params.checkList)
        
        const deleteIcon = () => (
            <Text category='p1' style={Styles.destroy} > X </Text>
        )
        const checkList = this.state.checkList.map((item , index)=>(
            <View key={index}>
                {/* <CheckBox/> */}
                <Input
                value={item.title}
                icon={deleteIcon}
                onIconPress={()=>{this.onRemoveCheckList(item.id)}}
                onChangeText={(text)=>{this.onCheckListchange(item.id , text)}}
                returnKeyType='done'
                />
            </View>
        ))


        return (


            <Layout style={Styles.container}>
                <TopNavigation

                    title='Edit'
                    subtitle='Enter what you need'
                    alignment='center'
                    style={Styles.nav}
                    leftControl={<Text onPress={()=>{this.props.navigation.goBack()}}>Back</Text>}

                />
                <ScrollView onScroll={Keyboard.dismiss}>
                    <View style={Styles.contentCont}>

                        <Input
                            label='Title'
                            value={ this.state.text}
                            onChange ={this.onTitleChange}
                            style={Styles.desc}
                            returnKeyType='done'

                             />

                        <Input
                            label='Sub Note'
                            value={this.state.desc}
                            onChange={this.onDescChange}
                            multiline
                            style={Styles.desc}
                            returnKeyType='done'
                            />
                            {/* the check list 
                            ========================= */}
                            {checkList}

                            <Button
                            children='ADD'
                            appearance='outline'
                            onPress={()=>{
                                const newItem = [...this.state.checkList, {
                                    id:Date.now() , 
                                    title:'' , 
                                    completed: false 
                                } ]

                                this.setState({checkList:newItem})

                                this.props.route.params.onChangeCheckList(this.props.route.params.key, newItem)
                            }}
                            
                            />



                    </View>

                </ScrollView>
            </Layout>


        )
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    }
    ,
    contentCont: {

        paddingHorizontal: 10,
        paddingVertical: 10,
        // marginTop: 10
    },
    desc: {
        borderColor:'transparent',
        borderBottomColor:'rgba(0 ,0 ,0 ,0.5)' , 
        backgroundColor:'rgba(0 ,0 ,0 ,0.1)'
    },

    nav: {
        marginTop: 15
    },
    destroy: {
        color: 'rgba(100 ,100 ,100 ,0.9)',

    }


})


