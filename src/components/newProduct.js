import React, {Component} from 'react';
import {
    Container, Button, Header, Input,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
    TextInput,TouchableHighlight,ActivityIndicator,
    renderRow, ScrollView, AsyncStorage,Switch

} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Picker from 'react-native-picker';

import moment from 'jalali-moment';
import ProgressDialog from "react-native-simple-dialogs/src/ProgressDialog";
export default class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name:'',
            sub_cat:'sub_cat',
            product_category:'category',
            header_cat:'header',
            properties:'',
            unitPrice:'',
            forCity:'city',
            available:'',
            city:[],
            header:[],
            sub_sub:[],
            category:[],
            loading:true,
            url:'http://visitou.ir/images/visitou_free.png'



        };

        fetch('http://visitou.ir/api/readCityMonitor.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((cityJson) => {
            console.log(cityJson,'kqkqkqkq');
            let ff=cityJson.map(function (tt) {
                return tt.city_en
            });
                console.log(ff,'kqkqkqkq5');
                this.setState({
                    city:ff,
                });
                fetch('http://visitou.ir/api/readHeaderMonitor.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then((response) => response.json())
                    .then((headerJson) => {
                        console.log(headerJson,'kqkqkqkq2');
                        let dd=headerJson.map(function (tt) {
                            return tt.header_name
                        });
                        this.setState({
                            header:dd,
                        });

                        fetch('http://visitou.ir/api/readCategoryMonitor.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                        }).then((response) => response.json())
                            .then((categoryJson) => {
                                console.log(categoryJson,'kqkqkqkq3');
                                let cc=categoryJson.map(function (tt) {
                                    return tt.cat_name
                                });
                                this.setState({
                                    category:cc,
                                });
                                fetch('http://visitou.ir/api/readSubCatMonitor.php', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                }).then((response) => response.json())
                                    .then((subCatJson) => {
                                        console.log(subCatJson,'kqkqkqkq4');
                                        let zz=subCatJson.map(function (tt) {
                                            return tt.sub_cat_name
                                        });
                                        this.setState({
                                            sub_sub:zz,
                                            loading:false
                                        });



                                    });

                            });
                    });

            });

    }

    setProduct() {

        if (this.state.name !== '' && this.state.product_category !=='category' && this.state.sub_cat !=='sub_cat' && this.state.header_cat !== 'header'
            && this.state.properties !== '' && this.state.unitPrice!=='' && this.state.forCity!=='city' ) {
            this.setState({waiting: true});
            setTimeout(() => {
                this.setState({waiting: false})
            }, 2000);
            let pp = {

                name: this.state.name,
                product_category: this.state.product_category,
                sub_cat: this.state.sub_cat,
                header_cat: this.state.header_cat,
                properties: this.state.properties,
                unitPrice: this.state.unitPrice.toLowerCase(),
                forCity: this.state.forCity,
                available: '1',
                unit:'بسته',
                url:this.state.url
            };
            console.log(pp,'slkcdfldkdl');
            fetch('http://visitou.ir/api/setProduct.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pp)
            }).then((response) =>{
                response.json();
                console.log(response,'lqlqlqlqldfddfff');

                            if(response){
                                this.setState({waiting: false});
                                alert('register success');

                                setTimeout(() => {
                                }, 500);
                                Actions.products();
                            }


                        }
                    )

        } else {
            alert('check your entrys')
        }





    }
    selectCategory(){
        Picker.init({
            pickerTextEllipsisLen:11,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'دسته بندی',
            pickerFontSize:17,
            pickerData: this.state.category,
            onPickerConfirm: data => {
                console.log(this.state.product_category,'q1ww');
                this.setState({product_category:data[0]})

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
    selectSubCat(){
        Picker.init({
            pickerTextEllipsisLen:11,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'زیر شاخه',
            pickerFontSize:17,
            pickerData: this.state.sub_sub,
            onPickerConfirm: data => {
                console.log(this.state.sub_cat,'q1w2');
                this.setState({sub_cat:data[0]})

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
    selectHeader(){
        Picker.init({
            pickerTextEllipsisLen:11,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'سرشاخه  ',
            pickerFontSize:17,
            pickerData: this.state.header,
            onPickerConfirm: data => {
                console.log(this.state.header_cat,'q1w3');
                this.setState({header_cat:data[0]})

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
    selectCity(){
        Picker.init({
            pickerTextEllipsisLen:11,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'تا تاریخ ',
            pickerFontSize:17,
            pickerData: this.state.city,
            onPickerConfirm: data => {
                console.log(this.state.forCity,'q1w4');
                this.setState({forCity:data[0]})

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

    goh() {
        let aaaan = {
            "to": "/topics/" + this.state.name,
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
                Actions.feed();
            }
        );
    }

    render() {
        if (this.state.loading) {
            return (

                <ActivityIndicator />

            );
        }
        return (
            <Content>
                <ProgressDialog
                    visible={false}
                    title="ثبت اطلاعات شما ..."
                    message="لطفا صبر کنید"
                />
                <ScrollView>
                    <View style={{height:37,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Switch
                            onValueChange={(value)=> value ? this.setState({available:'1'}):this.setState({available:'0'})}
                            value={this.state.available === '1' }/>
                        <Text>موجود بودن محصول:</Text>

                    </View>

                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#F39C12'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectCategory()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#F39C12'}}>{this.state.product_category}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#1c375c'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectSubCat()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#1c375c'}}>{this.state.sub_cat}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#03C9A9'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectHeader()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#03C9A9'}}>{this.state.header_cat}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#663399'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectCity()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#663399'}}>{this.state.forCity}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput style={{width: '75%'}}
                                   placeholder={this.state.properties}

                                   onChangeText={(value) => this.setState({properties: value})}/>
                        <Text style={{width: '25%', textAlign: 'center'}}>جزییات:</Text>
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
                        <Text style={{width: '25%', textAlign: 'center'}}>نام  :</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput style={{width: '75%'}}
                                   placeholder={this.state.unitPrice}
                                   keyboardType={'numeric'}

                                   onChangeText={(value) => this.setState({unitPrice: value})}/>
                        <Text style={{width: '25%', textAlign: 'center'}}>قیمت واحد:</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput style={{width: '75%'}}
                                   placeholder={this.state.url}
                                   keyboardType={'numeric'}

                                   onChangeText={(value) => this.setState({url: value})}/>
                        <Text style={{width: '25%', textAlign: 'center'}}>{'آدرس تصویر مدل:'}</Text>
                    </View>
                </ScrollView>
                <Button
                    onPress={() => this.setProduct()}
                    style={{width: '100%', justifyContent: 'center'}}><Text>ثبت   محصول</Text></Button>

            </Content>
        );
    }

}
module.export = NewProduct;
