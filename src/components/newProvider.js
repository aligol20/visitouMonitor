import React, {Component} from 'react';
import {
    Container, Button, Header, Input,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
    TextInput,
    renderRow,ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'jalali-moment';
import ProgressDialog from "react-native-simple-dialogs/src/ProgressDialog";
export default class NewProviders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sD: '',
            sM: '',
            sY: '',
            eD: '',
            eM: '',
            eY: '',
            name:'',
            pass:'',
            phone:'',
            persianName:'',
            location:'',
            waiting:false,

        };
    }
    setProvider(){
        const start = moment(this.state.sY+'/'+this.state.sM+'/'+this.state.sD, 'jYYYY/jM/jD');
        const end = moment(this.state.eY+'/'+this.state.eM+'/'+this.state.eD, 'jYYYY/jM/jD');
        const s =  start.format('YYYY/M/D');
        console.log( Date.parse(s),'sldsldsl0');
        console.log( s,'sldsldsl0');
        console.log( this.state.sY,'sldsldsl0');
        const e =  end.format('YYYY/M/D');
        console.log(Date.parse(e),'sldsldsl');
        console.log(this.state.eY,'sldsldsl');
        console.log(e,'sldsldsl');
        if(Date.parse(s)>Date.parse(e) && Date.parse(e) && Date.parse(s)){
            alert('wrong date')
        }else {
            console.log(this.state.name,'mamamamamam4');
            console.log(this.state.phone.length,'mamamamamam5');
            console.log(this.state.pass.length,'mamamamamam6');
            console.log(this.state.location,'mamamamamam7');
            console.log(this.state.persianName,'mamamamamam8');
            if(this.state.name!=='' && this.state.pass.length===7 && this.state.phone.length===11 && this.state.location!=='' && this.state.persianName!==''){
                this.setState({waiting:true});
                setTimeout(() => {
                    this.setState({waiting: false})
                }, 2000);
                let pp={name:this.state.name.toLowerCase(),pass:this.state.pass.toLowerCase(),phone:this.state.phone.toLowerCase(),
                    location:this.state.location.toLowerCase(),persianName:this.state.persianName,sDate:start,eDate:end};
                fetch('http://visitou.ir/api/registerProvider.php', {
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

            }else {
                alert('check your entrys')
            }


        }


    }
    goh(){
        let aaaan=  {
            "to" : "/topics/"+this.state.name.toLowerCase(),
            "priority" : "high",
            "notification" : {
                "body" : "به ویزیتو خوش آمدید",
                "title" : "سلام!",
            }
        };
        console.log(JSON.stringify(aaaan),'mamamamamam');
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': 'key=AIzaSyDa_jg-APcHVFYlnPpPR-sR1ESsrEq_Hy4',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aaaan)

        }).then((response) => {
                console.log(response, 'lkfdkfjdlfklfdsl');
                console.log(aaaan, 'mamamamamam2');
            let boz = {
                "to": "/topics/" + this.state.location.toLowerCase(),
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
                    'Authorization': 'key=AIzaSyBFzrf1ZDcIclVVGNsmzX7ud3zdCxmSStY',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(boz)

            }).then((response) => {
                    console.log(response, 'lkfdkfjdlfklfdsl')
                    if (response.status === 200) {
                        this.setState({waiting: false});

                        setTimeout(() => {
                        }, 500);
                        alert('register success');
                        Actions.feed();
                    }
                }
            );

            }

        );
    }
    render() {
        return (
            <Content>
                <ProgressDialog
                    visible={false}
                    title="ثبت اطلاعات شما ..."
                    message="لطفا صبر کنید"
                />
                <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5
                }}>
                    <TextInput style={{width: '75%'}}
                    onChangeText={(value)=>this.setState({name:value})}/>
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
                               onChangeText={(value)=>this.setState({pass:value})}/>
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
                    keyboardType={'numeric'}
                               maxLength={11}
                               onChangeText={(value)=>this.setState({phone:value})}/>


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
                               onChangeText={(value)=>this.setState({persianName:value})}/>

                    <Text style={{width: '25%', textAlign: 'center'}}>نام فارسی:</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5
                }}>
                    <View style={{width: '75%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput style={{width: '25%'}}
                                   keyboardType={'numeric'}
                                   placeholder={'سال'}
                                   onChangeText={(value) => this.setState({sY: value})}/>
                        <Text style={{width: '15%', textAlign: 'center'}}>/</Text>
                        <TextInput style={{width: '15%'}}
                                   keyboardType={'numeric'}
                                   placeholder={'ماه'}
                                   onChangeText={(value) => this.setState({sM: value})}/>
                        <Text style={{width: '15%', textAlign: 'center'}}>/</Text>
                        <TextInput style={{width: '15%'}}
                                   keyboardType={'numeric'}
                                   placeholder={'روز'}
                                   placeholderTextColor={'black'}
                                   onChangeText={(value) => this.setState({sD: value})}/>
                    </View>
                    <Text style={{width: '25%', textAlign: 'center'}}>تاریخ شروع:</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5
                }}>
                    <View style={{width: '75%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput style={{width: '25%'}}
                                   keyboardType={'numeric'}
                                   placeholder={'سال'}
                                   onChangeText={(value) => this.setState({eY: value})}/>

                        <Text style={{width: '15%', textAlign: 'center'}}>/</Text>
                        <TextInput style={{width: '15%'}}
                                   keyboardType={'numeric'}
                                   placeholder={'ماه'}
                                   onChangeText={(value) => this.setState({eM: value})}/>
                        <Text style={{width: '15%', textAlign: 'center'}}>/</Text>
                        <TextInput style={{width: '15%'}}
                                   keyboardType={'numeric'} placeholder={'روز'}
                                   onChangeText={(value) => this.setState({eD: value})}/>
                    </View>
                    <Text style={{width: '25%', textAlign: 'center'}}>تاریخ پایان:</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5
                }}>
                    <TextInput style={{width: '75%'}}
                               onChangeText={(value)=>this.setState({location:value})}/>
                    <Text style={{width: '25%', textAlign: 'center'}}>منطقه:</Text>
                </View>
                </ScrollView>
                <Button
                    onPress={()=>this.setProvider()}
                    style={{width:'100%',justifyContent:'center'}}><Text>ثبت تامین کننده</Text></Button>

            </Content>
        );
    }

}
module.export = NewProviders;
