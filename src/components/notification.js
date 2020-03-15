import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
    Modal,
    renderRow,TouchableHighlight, TextInput,ActivityIndicator
} from 'react-native';
import Picker from 'react-native-picker';
import {Actions} from 'react-native-router-flux';

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendTocustomers: false,
            sendToProviders: false,
            location: '',
            messageText: '',
            providerLocation:'منطقه تامین کننده'

        };

        fetch('http://visitou.ir/api/get_city_list.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) =>
            response.json()
                .then((responseJson) => {

            console.log(responseJson,'fkgjfjkgjklg');
                    this.setState({city_list:responseJson})
                }));

    }

    sendMessage() {
        if ( this.state.messageText !== '') {
            console.log(this.state.messageText,this.state.location,'lfjdlfjkf');
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
        else {
            alert('empty fields')
        }
    }
    sendMessageCustomers() {
        if ( this.state.messageText !== '') {
            let pp = {text: this.state.messageText, type: this.state.location+'customers'}
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

                            this.chos();


                        }
                    ))
        }
        else {
            alert('empty fields')
        }
    }

    goh() {
        let aaaan = {
            "to": "/topics/" + this.state.location,
            "priority": "high",
            "notification": {
                "body": this.state.messageText,
                "title": "سلام!",
            }
        };
        this.setState({sendToProviders:false});

        console.log(JSON.stringify(aaaan), 'mamamamamam');
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': 'key=AIzaSyDa_jg-APcHVFYlnPpPR-sR1ESsrEq_Hy4',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aaaan)

        }).then((response) => {
                console.log(response.status, 'lkfdkfjdlfklfdsl')
                if (response.status === 200) {
                    setTimeout(() => {

                    }, 500);
                    Actions.feed();

                    alert('پیام ارسال شد')
                }
            }
        );
    }
    chos() {

        let aaaan = {
            "to": "/topics/customers",
            "priority": "high",
            "notification": {
                "body": this.state.messageText,
                "title": "سلام!",
            }
        };
        this.setState({sendTocustomers:false});

        console.log(JSON.stringify(aaaan), 'mamamamamam');
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': 'key=AIzaSyBFzrf1ZDcIclVVGNsmzX7ud3zdCxmSStY',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aaaan)

        }).then((response) => {
                console.log(response.status, 'lkfdkfjdlfklfdsl')
                if (response.status === 200) {

                    setTimeout(() => {

                    }, 500);
                    Actions.feed();

                    alert('پیام ارسال شد');
                }
            }
        );
    }
    selectLocation(){
        Picker.hide();
        Picker.init({
            pickerTextEllipsisLen:11,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'دسته بندی',
            pickerFontSize:17,
            pickerData: this.state.city_list.map(function (tt) {
                return tt.city_name
            }),
            onPickerConfirm: data => {
                console.log(this.state.product_category,'q1ww');
                let citys = this.state.city_list;
                let city = citys.filter(x => x.city_name.includes(data[0]));
                this.setState({providerLocation:data[0],selected_city:data[0],location:city[0].city_en})

            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }
    render() {

        return (
            <Container>
                <Modal
                    style={{backgroundColor: 'white', width: '100%', height: '100%'}}
                    visible={this.state.sendToProviders}>
                    <View style={{margin: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <View style={{height:53}}/>

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput
                                onChangeText={(value) => this.setState({messageText: value})}
                                style={{color:'#34495E',fontFamily:'B Koodak',
                                    backgroundColor: '#ffffff'
                                    , borderWidth: 2, borderColor: '#34495E'
                                    ,borderRadius:7,margin:10,
                                    padding:10,width: '60%'
                                }}/>
                            <Text
                                style={{width: '30%'}}>متن پیام</Text>

                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#9A12B3'}}
                                                underlayColor={'white'}
                                                onPress={()=>this.selectLocation()}>
                                <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#9A12B3'}}>{this.state.providerLocation}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableHighlight
                                style={{
                                    height:37,
                                    margin: 10,
                                    width: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#F89406'
                                }}
                                onPress={() => this.setState({sendToProviders: false})}>
                                <Text>not now</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{
                                    margin: 10,
                                    height:37,

                                    width: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#00B16A'
                                }}
                                onPress={() => this.sendMessage()}
                            >
                                <Text>send now</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </Modal>
                <Modal
                    style={{backgroundColor: 'white', width: '100%', height: '100%'}}
                    visible={this.state.sendTocustomers}>
                    <View style={{margin: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <View style={{height:53}}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TextInput
                                onChangeText={(value) => this.setState({messageText: value})}
                                style={{color:'#34495E',fontFamily:'B Koodak',
                                    backgroundColor: '#ffffff'
                                    , borderWidth: 2, borderColor: '#34495E'
                                    ,borderRadius:7,margin:10,
                                    padding:10,width: '60%'
                                }}/>
                            <Text
                                style={{width: '30%'}}>متن پیام</Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <TouchableHighlight
                                style={{
                                    margin: 10,
                                    width: 100,
                                    height:37,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#F89406'
                                }}
                                onPress={() => this.setState({sendTocustomers: false})}>
                                <Text>not now</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{
                                    margin: 10,
                                    width: 100,
                                    height:37,

                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#00B16A'
                                }}
                                onPress={() => this.sendMessageCustomers()}
                            >
                                <Text>send now</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableHighlight style={{width: '50%',backgroundColor:'#f8781b',height:50, margin: 10, justifyContent: 'center', alignItems: 'center'}}
                                onPress={() => this.setState({sendToProviders: true})}>
                            <Text>
                                ارسال به تامین کنندگان
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <TouchableHighlight style={{width: '50%',backgroundColor:'#4ff8f3',height:50, margin: 10, justifyContent: 'center', alignItems: 'center'}}
                                onPress={() => this.setState({sendTocustomers: true})}>

                            <Text>
                                ارسال به مشتریان

                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </Container>
        );
    }

}
module.export = Notification;
