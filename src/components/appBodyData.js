import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
    Modal,
    Linking, ActivityIndicator, ScrollView,StyleSheet
    , Alert, renderRow, ListView, Dimensions,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Communications from 'react-native-communications';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon5 from 'react-native-vector-icons/Entypo'
import Icon6 from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    button:{justifyContent:'center',alignItems:'center',borderTopWidth:0,borderBottomWidth:0,marginBottom:3,borderColor:'#1F3A93',backgroundColor:'white',borderRadius:0,width:'100%',height:73},
    text:{color:'black'}

});
export default class AppBodyData extends React.Component {


    constructor(props) {

        super(props);

        // this.getData();


        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            imageLoading: true,
            isLoading: false,

            asb: [],
            rrr: '123',
            dataSource: dss.cloneWithRows([]),
            forRank: dss.cloneWithRows([]),
            list: [],
            first: 1,
            reload: true,
            dialog: [],
            loaded: false,
            isUpdateReady: false,
            upDateLink: '',
            modalSeen: false,
            citys: [],
            citySource: dss.cloneWithRows([]),
            rankInfo: [],
            getRank: false,
            rankSetted: [],
            rarra: 3,
            dialogVisible: false,
            user: [],
        };


    }


    render() {


        function goTelegram() {
            console.log('hihibyebye');
            Linking.canOpenURL('https://t.me/koalafruit').then(supported => {
                if (supported) {
                    Linking.openURL('https://t.me/koalafruit');
                    console.log("Don't know how to open URI:fffdfdddfdf " + 'https://t.me/koalafruit');

                } else {
                    console.log("Don't know how to open URI: " + 'https://t.me/koalafruit');
                }
            });

        }

        function callKoala() {
            Communications.phonecall('09387756324', true)
        }

        function introduce() {
            Alert.alert(
                'در خدمتیم!',
                'جهت سفارش های خاص خود و یا ارتباط با ادمین کانال کوالافروت میتوانید با شماره زیر تماس حاصل فرمایید.۰۹۳۸۶۳۶۷۳۶۱',
                [

                    {text: 'خب', onPress: () => console.log('OK lklklkllkll Pressed')},
                    {text: 'کانال ما در تلگرام', onPress: () => goTelegram()},
                    {text: 'تماس با ما', onPress: () => callKoala()}

                ],
                {cancelable: true}
            )
        }


        if (this.state.isLoading) {

            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width; //full width
        let height = Dimensions.get('window').height; //full width
        console.log(width, 'frfrfrfrfrfr');

        return (
            <Container>



                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#1c375c'
                }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '30%',
                        flexDirection: 'row'
                    }}>

                        <View style={{height: 0, width: '70%', backgroundColor: 'red'}}/>


                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center', width: '40%'}}>
                        <Text style={{
                            width: '100%', textAlign: 'center',
                            fontSize: 23, color: '#ffd500',
                        }}>ویزیتو</Text>

                    </View>
                    <View style={{width: '30%'}}/>

                    <View/>
                </View>
                <Content style={{backgroundColor: '#00000000'}}>

                    <ScrollView style={{backgroundColor: '#00000000'}}>
                        <View style={{backgroundColor: 'white', height: 2, width: '100%',alignItems:'center',justifyContent:'center',flexDirection:'column'}}/>
                        <View style={{ width: '100%',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                            <Button style={styles.button}
                        onPress={()=>Actions.newProvider()}>
                            <Text style={styles.text}>
                                new provider</Text>
                            <Icon5

                                name={'add-user'}
                                color={'#3A539B'}
                                size={25}/>
                        </Button>
                            <Button style={styles.button}
                        onPress={()=>Actions.notification()}>
                                <Text style={styles.text}>
                                notification</Text>
                                <Icon5

                                    name={'message'}
                                    color={'#E87E04'}
                                    size={25}/>
                        </Button>
                            <Button style={styles.button}
                        onPress={()=>Actions.providers()}>
                                <Text style={styles.text}>
                                providers</Text>
                                <Icon5

                                    name={'users'}
                                    color={'#00B16A'}
                                    size={25}/>
                        </Button>
                            <Button style={styles.button}
                        onPress={()=>Actions.products()}>
                                <Text style={styles.text}>
                                products</Text>
                                <Icon5

                                    name={'archive'}
                                    color={'#663399'}
                                    size={25}/>
                        </Button>
                            <Button style={styles.button}
                        onPress={()=>Actions.orders()}>
                                <Text style={styles.text}>
                                orders</Text>
                                <Icon5

                                    name={'shopping-cart'}
                                color={'#F22613'}
                                size={25}/>
                        </Button>
                            <Button style={styles.button}
                        onPress={()=>Actions.customers()}>
                                <Text style={styles.text}>
                                customers</Text>
                                <Icon6

                                    name={'users'}
                                    color={'#E9D460'}
                                    size={25}/>
                        </Button>
                            <Button style={styles.button}
                                    onPress={()=>Actions.newModel()}>
                                <Text style={styles.text}>
                                    newModel</Text>
                                <Icon5

                                    name={'colours'}
                                    color={'#663399'}
                                    size={25}/>
                            </Button>
                        </View>




                    </ScrollView>
                </Content>

            </Container>
        );

    }

}


module.export = AppBodyData;