import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
ActivityIndicator,
    renderRow,ListView,AsyncStorage,Modal,TextInput
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Providers extends React.Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: dss.cloneWithRows([]),
            isLoading:true,
            listArray:[],
            sendToProvider:false,


        };

        this.getDate();

    }
    getDate(){

        fetch('http://visitou.ir/api/readProviders.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                this.setState({
                    listArray:responseJson,
                    isLoading: false,
                    dataSource: dss.cloneWithRows(responseJson.map(function (tt) {
                        return tt
                    })),
                });

            });
    }
    providerDetails(id){
        console.log(this.state.listArray[id],'sjsjdkjhdkjkj');
        console.log(id,'sjsjdkjhdkjkj2');
        AsyncStorage.setItem('proDetail',JSON.stringify(this.state.listArray[id]))
        Actions.proDe();

    }
    sendNoti() {
        if (this.state.location !== '' && this.state.messageText !== '') {
            let pp = {text: this.state.messageText, type: this.state.location}
            fetch('http://visitou.ir/api/newMessageProvider.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pp)
            }).then((response) =>
                response.json()
                    .then((responseJson) => {
                            console.log(responseJson, 'mamamamamam3');

                            this.goh();


                        }
                    ))
        }
    }
    render(){

        if (this.state.isLoading) {

            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return(
            <Content>
                <Modal
                    style={{backgroundColor: 'white', width: '100%', height: '100%'}}
                    visible={this.state.sendToProvider}>
                    <View style={{margin: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput
                                onChangeText={(value) => this.setState({messageText: value})}
                                style={{width: '70%'}}/>
                            <Text
                                style={{width: '30%'}}>متن پیام</Text>

                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput style={{width: '70%'}}
                                       onChangeText={(value) => this.setState({location: value.toLowerCase()})}
                            />
                            <Text
                                style={{width: '30%'}}>نام تامین کننده </Text>

                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Button
                                style={{
                                    margin: 10,
                                    width: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#F89406'
                                }}
                                onPress={() => this.setState({sendToProvider: false})}>
                                <Text>not now</Text>
                            </Button>
                            <Button
                                style={{
                                    margin: 10,
                                    width: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#00B16A'
                                }}
                                onPress={() => this.sendNoti()}
                            >
                                <Text>send now</Text>
                            </Button>
                        </View>
                    </View>

                </Modal>
                <ListView

                    style={{width: '100%', backgroundColor: '#00000000'}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, rowID, sectionID) =>
                    <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Button
                        onPress={()=>this.providerDetails(sectionID)}
                        style={{height:43,marginTop:3,width:'95%',margin:3,justifyContent:'center'}}>
                        <Text>{rowData.provider_name}</Text>
                    </Button>
                    </View>
                    }/>
            </Content>
        );
    }

}
module.export = Providers;
