import React, {Component} from 'react';
import {
    Container, Button, Header, Input,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Toast, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
    TextInput,Modal,FlatList,Text,View,Alert,
    renderRow, ScrollView,TouchableHighlight,ActivityIndicator, AsyncStorage,Switch

} from 'react-native';
import Picker from 'react-native-picker';

import {Actions} from 'react-native-router-flux';
import moment from 'jalali-moment';
import ProgressDialog from "react-native-simple-dialogs/src/ProgressDialog";
export default class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name:'',
            product_category:'',
            sub_cat:'',
            header_cat:'',
            properties:'',
            unitPrice:'',
            forCity:'',
            available:'',
            price:false,
            loadload:true,
            selectedProvider:''

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
                                        });



                                    });

                            });
                    });

            });

        AsyncStorage.getItem('Detail', (err, store) => {
            let data= JSON.parse(store);

            console.log(data, 'fkgjfgfgf');
            this.setState({
            name:data.product_name,
            product_category:data.product_category,
            sub_cat:data.sub_cat,
            header_cat:data.header_cat,
            properties:data.properties,
            unitPrice:data.unitprice,
            forCity:data.forCity,
            available:data.available,
            id:data.product_id})

            this.getProviders()




        })
    }
    getProviders(){
        let kk = {id:this.state.id,city:this.state.forCity};
        fetch('http://visitou.ir/api/getprovidersFor.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(kk)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
                    console.log(responseJson,'loaqlksldjs');

                    this.setState({proProviders:responseJson});
                    let fgf = {id:this.state.id};
                    fetch('http://visitou.ir/api/getNowProvider.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(fgf)
                    }).then((response) =>
                        response.json()
                            .then((responseJson) => {
                        console.log(responseJson,'lqoadjcndjndjs');
                                this.setState({availableProvider:responseJson})
                                let bhb = {id:this.state.id};
                                console.log(bhb,'rmrrmrrrr');

                                fetch('http://visitou.ir/api/getModelsFor.php', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(bhb)
                                }).then((response) =>
                                    response.json()
                                        .then((responseJson) => {
                                            console.log(responseJson,'elkelkejeljlkejke');

                                            this.setState({modelsRecieved:responseJson,loadload:false})
                                        }))



                            }))
                   // this.selectProvider()
                }))
    }
    setProduct() {

            if (this.state.name !== '' && this.state.product_category !=='' && this.state.sub_cat !=='' && this.state.header_cat !== ''
                && this.state.properties !== '' && this.state.unitPrice!=='' && this.state.forCity!=='' ) {
                this.setState({waiting: true});
                setTimeout(() => {
                    this.setState({waiting: false})
                }, 10000);
                let pp = {

                    name: this.state.name,
                    product_category: this.state.product_category,
                    sub_cat: this.state.sub_cat,
                    header_cat: this.state.header_cat,
                    properties: this.state.properties,
                    unitPrice: this.state.unitPrice.toLowerCase(),
                    forCity: this.state.forCity,
                    available: this.state.available.toLowerCase(),
                    id: this.state.id
                };
                console.log(pp,'jhhjhjhjhhjhjhhjhj');
                fetch('http://visitou.ir/api/updateProduct.php', {
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

                            if(this.state.proProviders.length===0){
                                this.setState({waiting: false});
                                alert('register success');
                                Actions.products();
                            }else {
                                let r = this.state.proProviders;
                                let ghoo = r.filter(x => x.provider_name.includes(this.state.selectedProvider));
                                console.log(ghoo, this.state.proProviders,'hyhyh');
                                let gg = {
                                    product_id: this.state.id,
                                    provider_name: ghoo[0].provider_name,
                                    provider_details_id:ghoo[0].provider_details_id,
                                    provider_persian: ghoo[0].persian_name,
                                    provider_price: this.state.unitPrice,
                                    is_selected: '0',
                                    rate: 0,
                                    votes: 0
                                };
                                console.log(gg,'lqasslfjf');
                                fetch('http://visitou.ir/api/setProForThis.php', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(gg)
                                }).then((response) =>
                                    response.json()
                                        .then((responseJsonE) => {
                                            console.log('dddddffdf', responseJsonE)

                                            if (responseJsonE) {
                                                this.setState({waiting: false});
                                                alert('register success');
                                                Actions.products();
                                            }


                                        }))
                            }


                        }))
            }





            else {
                alert('check your entrys')
            }





    }
    RemoveProvider(item){
        Alert.alert(
            '',
            'این تامین کننده را از لیست این محصول حذف میکنید؟',
            [
                {text: 'خیر', onPress: () => console.log('OK lklklkllkll Pressed')},
                {
                    text: 'بله', onPress: () =>
                {
                    let opi={id:item.provider_id};
                    fetch('http://visitou.ir/api/removeProviderFromThisPro.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(opi)
                    }).then((response) =>
                        response.json()
                            .then((responseJsonE) => {
                                console.log('dddddffdf', responseJsonE)

                                if (responseJsonE) {
                                    this.setState({waiting: false});
                                    alert('register success');
                                    Actions.products();
                                }


                            }))
                }
                },

            ],
            {cancelable: false}
        )

    }
    RemoveModel(item){
        Alert.alert(
            '',
            'این مدل را حذف می کنید؟',
            [
                {text: 'خیر', onPress: () => console.log('OK lklklkllkll Pressed')},
                {
                    text: 'بله', onPress: () =>
                {
                    let opi={id:item.model_id};
                    fetch('http://visitou.ir/api/removeModelFromThisPro.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(opi)
                    }).then((response) =>
                        response.json()
                            .then((responseJsonE) => {
                                console.log('dddddffdf', responseJsonE)

                                if (responseJsonE) {
                                    this.setState({waiting: false});
                                    alert('register success');
                                    Actions.products();
                                }


                            }))
                }
                },

            ],
            {cancelable: false}
        )

    }
    selectProvider(){
        if(this.state.proProviders.length!==0) {
            console.log(this.state.proProviders,'lqaaaaaaa');
            Picker.hide();

            Picker.init({
                pickerTextEllipsisLen: 11,
                pickerConfirmBtnText: 'تایید',
                pickerCancelBtnText: 'انصراف',
                pickerTitleText: 'تامین کننده',
                pickerFontSize: 17,
                pickerData: this.state.proProviders.map(function (tt) {
                    return tt.provider_name
                }),
                onPickerConfirm: data => {
                    this.setState({price: true, selectedProvider: data})


                },
                onPickerCancel: data => {
                    console.log(data);
                },
                onPickerSelect: data => {
                    console.log(data);
                }
            });
            Picker.show();
        }else {
            alert('برای این شهر تامین کننده ای وجود ندارد!')
        }

    }
    selectCategory(){
        Picker.hide();
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
    registerProviderForThis(){
        let r = this.state.proProviders;

        let ghoo = r.filter(x => x.provider_name.includes(this.state.selectedProvider) );
        console.log(ghoo,'molomomom');


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
        if (this.state.loadload) {
            return (

                <ActivityIndicator />

            );
        }
        return (
            <Content>

                <ScrollView>
                    <View style={{height:37,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Switch
                            onValueChange={(value)=> value ? this.setState({available:'1'}):this.setState({available:'0'})}
                            value={this.state.available==='1' }/>
                        <Text>موجود بودن محصول:</Text>

                    </View>

                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#9A12B3'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectProvider()}>
                            <Text style={{textAlign:'center',margin:10,fontFamily:'B Koodak',color:'#9A12B3'}}>{'افزودن تامین کننده'}</Text>
                        </TouchableHighlight>
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
                                   placeholder={this.state.properties}
                                   keyboardType='number-pad'

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
                                   placeholder={this.state.unitPrice}

                                   onChangeText={(value) => this.setState({unitPrice: value})}/>
                        <Text style={{width: '25%', textAlign: 'center'}}>قیمت واحد:</Text>
                    </View>

                <Button
                    onPress={() => this.setProduct()}
                    style={{width: '100%', justifyContent: 'center'}}><Text>ثبت  تغییرات محصول</Text></Button>

                    <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text>{'تامین کنندگان'}</Text>
                </View>
                <FlatList
                    data={this.state.availableProvider}
                    renderItem={({item}) =>

                            <View style={{flexDirection:'row',backgroundColor:"#ffffff",justifyContent:'center',alignItems:'center',width:'100%',borderRadius:7,marginTop:3}}>
                                <View
                                style={{width:'88%',flexDirection:'row',justifyContent:'center',alignItems:'center',height:53}}
                                >
                                    <TouchableHighlight
                                        underlayColor="white"


                                    onPress={()=>this.RemoveProvider(item)}>
                                        <Text
                                        style={{color:'red',textAlign:'left'}}>{'حذف'}</Text>
                                    </TouchableHighlight>
                                <Text
                                    style={{width:'27%',textAlign:'center'}}
                                >
                                    {item.provider_name}</Text>
                                <Text
                                    style={{width:'27%',textAlign:'center'}}
                                >
                                    {item.provider_persian}</Text>
                                <Text
                                    style={{width:'27%',textAlign:'center'}}
                                >
                                    {item.provider_price}</Text>
                                </View>
                            </View>
                    }
                />

                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{width:'98%',height:3,backgroundColor:'grey',margin:7}}/>

                        <Text>{'مدل ها '}</Text>
                </View>
                <FlatList
                    data={this.state.modelsRecieved}
                    renderItem={({item}) =>

                        <View style={{flexDirection:'row',backgroundColor:"#ffffff",justifyContent:'center',alignItems:'center',width:'100%',borderRadius:7,marginTop:3}}>
                            <View
                                style={{width:'93%',flexDirection:'row',justifyContent:'center',alignItems:'center',height:53}}
                            >
                                <TouchableHighlight
                                    underlayColor="white"


                                    onPress={()=>this.RemoveModel(item)}>
                                    <Text
                                        style={{color:'red',textAlign:'left'}}>{'حذف'}</Text>
                                </TouchableHighlight>
                                <Text
                                    style={{width:'31%',textAlign:'center'}}
                                >
                                    {item.provider_name}</Text>
                                <Text
                                    style={{width:'31%',textAlign:'center'}}
                                >
                                    {item.model_name}</Text>

                            </View>
                        </View>
                    }
                />
                </ScrollView>

            </Content>
        );
    }

}
module.export = ProductDetails;
