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
export default class NewModel extends React.Component {
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
            propro:'تامین کننده/محصول',
            image_url:'http://visitou.ir/images/visitou_model.png'


        };

        fetch('http://visitou.ir/api/readProductsM.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson,'lqoksodksds');
                this.setState({allProducts:responseJson});
                fetch('http://visitou.ir/api/readProviders.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then((response) => response.json())
                    .then((proResponse) => {
                        console.log(proResponse,'lqoksodksds23');

                        this.setState({allProviders:proResponse,loading:false});


                    })
    })




    }

    setModel() {

        if (this.state.name !== '' && this.state.propro !== 'تامین کننده/محصول') {
            let providers = this.state.allProviders;
            let products = this.state.allProducts;
            let prov = providers.filter(x => x.provider_name===this.state.provider);
            let prod = products.filter(x => x.product_name===this.state.product);

            console.log(prod,'ldkfdklfj');
            console.log(prov,'ldkfdklfjkwwkwkw');

            this.setState({waiting: true});
            setTimeout(() => {
                this.setState({waiting: false})
            }, 2000);
            let pp = {

                product_id: parseInt(prod[0].product_id),
                provider_id: parseInt(prov[0].provider_details_id),
                model_name: this.state.name,
                model_image: this.state.image_url,
            };
            console.log(pp,'slkcdfldkdl');
            fetch('http://visitou.ir/api/setModel.php', {
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

                            if(responseJson){
                                this.setState({waiting: false});
                                alert('model setted successfully');

                                setTimeout(() => {
                                }, 500);
                                Actions.feed();
                            }


                        }
                    ))

        } else {
            alert('check your entrys')
        }





    }
    selectProductProvider(){
        Picker.hide();
        Picker.init({
            pickerTextEllipsisLen:11,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'تامین کننده/محصول',
            pickerFontSize:17,
            pickerData: [ this.state.allProducts.map(function (tt) {
                return tt.product_name
            }),this.state.allProviders.map(function (tt) {
                return tt.provider_name
            })],
            onPickerConfirm: data => {
                console.log(data,'q1ww');
                this.setState({product:data[0],provider:data[1],propro:data[1]+'/'+data[0]})

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

                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#F39C12'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectProductProvider()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#F39C12'}}>{this.state.propro}</Text>
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
                                   placeholder={this.state.name}
                                   onChangeText={(value) => this.setState({name: value})}/>
                        <Text style={{width: '25%', textAlign: 'center'}}>{'نام مدل:'}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5
                    }}>
                        <TextInput style={{width: '75%'}}
                                   placeholder={this.state.image_url}
                                   keyboardType={'numeric'}

                                   onChangeText={(value) => this.setState({image_url: value})}/>
                        <Text style={{width: '25%', textAlign: 'center'}}>{'آدرس تصویر مدل:'}</Text>
                    </View>

                </ScrollView>
                <Button
                    onPress={() => this.setModel()}
                    style={{width: '100%', justifyContent: 'center'}}><Text>ثبت  مدل </Text></Button>

            </Content>
        );
    }

}
module.export = NewModel;
