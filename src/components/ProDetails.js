import React, {Component} from 'react';
import Picker from 'react-native-picker';

import {
    Container, Button, Header, Input,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
    TextInput,TouchableHighlight,
    renderRow, ScrollView, AsyncStorage,Switch,Modal

} from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'jalali-moment';
import ProgressDialog from "react-native-simple-dialogs/src/ProgressDialog";
export default class ProDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sD: '',
            sM: '',
            sY: '',
            eD: '',
            eM: '',
            eY: '',
            name: '',
            pass: '',
            phone: '',
            persianName: '',
            location: '',
            waiting: false,
            defaultInfo: [],
            activity:'',
            id:'',
            sendToProvider:false,
            messageText:'',
            CuStYear:'',
            CuStMonth:'',
            CuStDay:'',
            CuEnYear:'',
            CuEnMonth:'',
            CuEnDay:'',
            labelEnd:'end',
            labelStart:'start'



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
        AsyncStorage.getItem('proDetail', (err, store) => {
            let data= JSON.parse(store);

            console.log(this.state.defaultInfo, 'fkgjfgfgf');
            console.log(this.state.defaultInfo.start_date, 'amamamam');
            let start = JSON.parse(store).start_date;
            let end = JSON.parse(store).end_date;
            let startNew = moment(start,'YYYY/MM/DD').format('jYYYY/jMM/jDD');
            let endNew = moment(end,'YYYY/MM/DD').format('jYYYY/jMM/jDD');
            let month = moment(start,'YYYY/MM/DD').format('jMM');
            let monthE = moment(end,'YYYY/MM/DD').format('jMM');
            let day = moment(start,'YYYY/MM/DD').format('jDD');
            let dayE = moment(end,'YYYY/MM/DD').format('jDD');
            console.log(start,startNew, 'amamamam2');
            console.log(end,endNew, 'amamamam3');
            this.setState({defaultInfo: JSON.parse(store),sM:month,sD:day,eM:monthE,eD:dayE,name:data.provider_name,pass:data.provider_pass,labelEnd:endNew,labelStart:startNew,
                phone:data.provider_phone,location:data.location,persianName:data.persian_name,activity:data.is_active,id:data.provider_details_id});



        })
    }

    selectFrom(){
        let months= [
            {
                1: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                2: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                3: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                4: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                5: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                6: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                7: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                8: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                9: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                10: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                11: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                12: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
            }
        ];
        let data = [
            {1397:months},
            {1398:months},
            {1399:months},
            {1400:months},
            {1401:months},
            {1402:months},
            {1403:months},
            {1404:months},
            {1405:months},
            {1406:months},
            {1407:months},
            {1408:months},
            {1409:months},
            {1410:months},
            {1411:months},
            {1412:months},
            {1413:months},
            {1414:months},

        ];
        // for(var i=0;i<100;i++){
        //     data.push(i);
        // }
        console.log(data,'nanaanwmklmkm');


        Picker.init({
            pickerTextEllipsisLen:11,
            wheelFlex:[1,1,1],
            pickerFontSize:17,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'از تاریخ ',
            pickerData: data,
            selectedValue: [59],
            onPickerConfirm: data => {
                console.log(data,'gogogoog1');
                this.setState({CuStYear:data[0]});
                this.setState({CuStMonth:data[1]});
                this.setState({CuStDay:data[2]});
                this.setState({labelStart:data[0]+'-' +data[1]+'-'+ data[2] })

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

    selectTo(){
        let months= [
            {
                1: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                2: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                3: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                4: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                5: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                6: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                7: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                8: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                9: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                10: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                11: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                12: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
            }
        ];
        let data = [
            {1397:months},
            {1398:months},
            {1399:months},
            {1400:months},
            {1401:months},
            {1402:months},
            {1403:months},
            {1404:months},
            {1405:months},
            {1406:months},
            {1407:months},
            {1408:months},
            {1409:months},
            {1410:months},
            {1411:months},
            {1412:months},
            {1413:months},
            {1414:months},

        ];
        // for(var i=0;i<100;i++){
        //     data.push(i);
        // }
        console.log(data,'nanaanwmklmkm');


        Picker.init({
            pickerTextEllipsisLen:11,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'تا تاریخ ',
            wheelFlex:[1,1,1],
            pickerFontSize:17,
            pickerData: data,
            onPickerConfirm: data => {
                console.log(data,'gogogoog');
                this.setState({CuEnYear:data[0]});
                this.setState({CuEnMonth:data[1]});
                this.setState({CuEnDay:data[2]});
                this.setState({labelEnd:data[0]+'-' +data[1]+'-'+ data[2] })
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
                this.setState({location:city[0].city_en})

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
    setProvider() {
        const start = moment(this.state.labelStart, 'jYYYY/jM/jD');
        const end = moment(this.state.labelEnd, 'jYYYY/jM/jD');
        const s = start.format('YYYY/M/D');
        console.log(Date.parse(s), 'sldsldsl0');
        console.log(s, 'sldsldsl0');
        console.log(this.state.sY, 'sldsldsl0');
        const e = end.format('YYYY/M/D');
        console.log(Date.parse(e), 'sldsldsl');
        console.log(this.state.eY, 'sldsldsl');
        console.log(e, 'sldsldsl');
        if (Date.parse(s) > Date.parse(e) && Date.parse(e) && Date.parse(s)) {
            alert('wrong date')
        } else {
            console.log(this.state.name, 'mamamamamam4');
            console.log(this.state.phone, 'mamamamamam5');
            console.log(this.state.pass, 'mamamamamam6');
            console.log(this.state.location, 'mamamamamam7');
            console.log(this.state.persianName, 'mamamamamam8');
            if (this.state.name !== '' && this.state.pass.length === 7 && this.state.phone.length === 11 && this.state.location !== '' && this.state.persianName !== '') {
                this.setState({waiting: true});
                setTimeout(() => {
                    this.setState({waiting: false})
                }, 2000);
                let pp = {

                    name: this.state.name.toLowerCase(),
                    pass: this.state.pass.toLowerCase(),
                    phone: this.state.phone.toLowerCase(),
                    location: this.state.location.toLowerCase(),
                    persianName: this.state.persianName.toLowerCase(),
                    sDate: start,
                    eDate: end,
                    activity: this.state.activity,
                    id : this.state.id
                };
                console.log(pp,'dkjfkdjfkdfdf');
                fetch('http://visitou.ir/api/updateProvider.php', {
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

            } else {
                alert('check your entrys')
            }


        }


    }
    sendNoti() {
        if ( this.state.messageText !== '') {
            let pp = {text: this.state.messageText, type: this.state.name.toLowerCase()};
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
    }
    chos() {
        if(this.state.messageText!=='') {

            let aaaan = {
                "to": "/topics/" + this.state.name.toLowerCase(),
                "priority": "high",
                "notification": {
                    "body": this.state.messageText,
                    "title": "سلام!",
                }
            };
            console.log(JSON.stringify(aaaan), 'mamamamamam');
            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'key=AIzaSyDa_jg-APcHVFYlnPpPR-sR1ESsrEq_Hy4',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aaaan)

            }).then((response) => {
                    console.log(response, 'lkfdkfjdlfklfdsl');
                    if (response.status === 200) {
                        this.setState({sendToProvider: false});
                        alert('پیام ارسال شد')
                    }
                }
            );
        }
    }
    goh() {
        let aaaan = {
            "to": "/topics/" + this.state.name.toLowerCase(),
            "priority": "high",
            "notification": {
                "body": "به ویزیتو خوش آمدید",
                "title": "سلام!",
            }
        };
        console.log(JSON.stringify(aaaan), 'mamamamamam');
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': 'key=AIzaSyDa_jg-APcHVFYlnPpPR-sR1ESsrEq_Hy4',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aaaan)

        }).then((response) => {
                console.log(response, 'mamamamamam2');
                this.setState({waiting: false});
                alert('register success');

            setTimeout(() => {
            }, 500);
                Actions.feed();
            }
        );
    }
    // visible={this.state.waiting}

    render() {
        return (
            <Content>
                <ProgressDialog
                    visible={false}
                    title="ثبت اطلاعات شما ..."
                    message="لطفا صبر کنید"
                />
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
                <View style={{width:'100%',alignItems:'center',justifyContent:'center',flexDirection:"row"}}>
                <Button style={{alignItems:'center',justifyContent:"center"}}
                onPress={()=>this.setState({sendToProvider:true})}>
                    <Text>send message to provider</Text>
                </Button>
                </View>
                <ScrollView>
                    <View style={{height:37,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Switch
                            onValueChange={(value)=> value ? this.setState({activity:'1'}):this.setState({activity:'0'})}
                        value={this.state.activity==='1' }/>
                        <Text>فعال بودن تامین کننده:</Text>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput style={{width: '75%'}}
                                   placeholder={this.state.name}
                                   onChangeText={(value) => this.setState({name: value})}/>
                        <Text style={{width: '25%', textAlign: 'center'}}>نام تامین کننده:</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput style={{width: '75%'}}
                                   placeholder={this.state.pass}

                                   onChangeText={(value) => this.setState({pass: value})}/>
                        <Text style={{width: '25%', textAlign: 'center'}}>پسورد:</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput style={{width: '75%'}}
                                   placeholder={this.state.phone}

                                   keyboardType={'numeric'}
                                   maxLength={11}
                                   onChangeText={(value) => this.setState({phone: value})}/>


                        <Text style={{width: '25%', textAlign: 'center'}}>شماره موبایل:</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput style={{width: '75%'}}
                                   placeholder={this.state.persianName}

                                   onChangeText={(value) => this.setState({persianName: value})}/>

                        <Text style={{width: '25%', textAlign: 'center'}}>نام فارسی:</Text>
                    </View>
                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#1c375c'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectFrom()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#1c375c'}}>{this.state.labelStart}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#1c375c'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectTo()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#1c375c'}}>{this.state.labelEnd}</Text>
                        </TouchableHighlight>
                    </View>


                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#9A12B3'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectLocation()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#9A12B3'}}>{this.state.location}</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <Button
                    onPress={() => this.setProvider()}
                    style={{width: '100%', justifyContent: 'center'}}><Text>ثبت تامین کننده</Text></Button>

            </Content>
        );
    }

}
module.export = ProDetails;
