import React, {Component} from 'react';
import {Container, Content, Header, Item, Right, Input, Icon, Button, Text, List, ListItem, View} from 'native-base';
import {StyleSheet, AsyncStorage, ActivityIndicator, Dimensions, Image, renderRow, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import foot from '../appFooter';
import {ProgressDialog} from 'react-native-simple-dialogs';
import  moment from 'jalali-moment';

let cdc = [];
let fgfgfg = ''

export default class Search extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            item: '',
            asb: [],
            isLoading: false,
            dataSource: dss.cloneWithRows([]),
            list: [],
            first: 'wait',
            second: 'wait',
            third: 'wait',
            today:'',
            month:'',
            year:'',
        };
        AsyncStorage.getItem('AmIlogged', (err, store) => {
            console.log('axsasaa', JSON.parse(store).user);
            this.setState({user: JSON.parse(store).user});
            console.log('axsasaa', JSON.parse(store).user);
            this.getAnalyses(JSON.parse(store).user);


        })
    }


    searchMe(value) {

        this.setState({isLoading: true});
        if (value === '') {
            this.setState({item: 'nothing'});

        } else {
            this.setState({item: value});

        }
        AsyncStorage.getItem('allProducts', (err, stores) => {
            let r = JSON.parse(stores);
            console.log(r, 'mahnazparivash15');

            let ghoo = r.filter(x => x.product_name.includes(this.state.item) && x.unitprice !== 'no');

            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            this.setState({
                list: ghoo,
                isLoading: false,
                dataSource: dss.cloneWithRows(ghoo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            });

            //console.log(ghoo,'mahnazparivash14');


        });
    }

    getAnalyses(id) {

        let yyy = new Date();
        let selectedFormat = "jDD-jMM-jYYYY";
        let rrr = moment(yyy.getTime()).format(selectedFormat);
        let DDD = moment().format('jYYYY-jM-jD');


        let thisDay = moment().format('YYYY-M-D');
        let rrrrr = moment(DDD, 'jYYYY/jM/jD');
        rrrrr.add(1, 'day');
        let nextDay = moment(rrrrr.format('jYYYY/jM/jD'),'jYYYY/jM/jD').format('YYYY-M-D');


        let ffff = moment(DDD, 'jYYYY/jM/jD');
        let MS = moment().format('jYYYY') + '-' + ffff.format('jMM') + '-' + '1';
        let thisMonth = moment(MS,'jYYYY-jMM-jD').format('YYYY-M-D');

        let zzzz  = moment(MS, 'jYYYY/jM/jD');
        zzzz.add(1, 'jMonth');
        let nMS = zzzz.format('jYYYY') + '-' + zzzz.format('jMM') + '-' + '1';
        let nextMonth = moment(nMS,'jYYYY-jMM-jD').format('YYYY-M-D');

        let xxxx = moment(DDD, 'jYYYY/jM/jD');
        let YS = moment().format('jYYYY') + '-' + '1' + '-' + '1';
        let thisYear = moment(YS,'jYYYY-jMM-jD').format('YYYY-M-D');
        xxxx.add(1,'jYear');
        let nYS = xxxx.format('jYYYY') + '-' + '1' + '-' + '1';
        let nextYear= moment(nYS,'jYYYY-jMM-jD').format('YYYY-M-D');

        console.log(thisYear,nextYear,'dflfjdkljfkdjfk');
        console.log(thisMonth,nextMonth,'dflfjdkljfkdjfk2');
        console.log(thisDay,nextDay,'dflfjdkljfkdjfk3');

        console.log(moment(MS,'jYYYY-jMM-jD').format('jMMMM'),'aaaaas');
        console.log(moment(YS,'jYYYY-jMM-jD').format('jYYYY'),'aaaaas2');
        console.log(moment().format('jYYYY-jMM-jD'),'aaaaas3');

        this.setState({today:moment().format('jYYYY-jMM-jD')
        ,month: moment(MS,'jYYYY-jMM-jD').format('jMMMM'),
        year: moment(YS,'jYYYY-jMM-jD').format('jYYYY')});



        let pp = {thisDay: thisDay, nextDay: nextDay, provider: id};
        fetch(
            'https://visitou.ir/api/getAnalys.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pp)
            }
        ).then((response) =>
            response.json()
                .then((responseJson) => {
                    console.log(responseJson[0]["SUM(order_mount*order_price)"], 'dlkdklfdk');
                    if(responseJson[0]["SUM(order_mount*order_price)"]!==null){
                        this.setState({first: responseJson[0]["SUM(order_mount*order_price)"]})
                    }else {
                        this.setState({first: '0'})

                    }
                }));


        let cc = {thisDay: thisMonth, nextDay: nextMonth, provider: id};

        fetch(
            'https://visitou.ir/api/getAnalys.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cc)
            }
        ).then((response) =>
            response.json()
                .then((responseJson) => {
                    console.log(responseJson[0]["SUM(order_mount*order_price)"], 'dlkdklfdk2');

                    if(responseJson[0]["SUM(order_mount*order_price)"]!==null){
                        this.setState({second: responseJson[0]["SUM(order_mount*order_price)"]})
                    }else {
                        this.setState({second: '0'})

                    }
                }));


        let dd = {thisDay: thisYear, nextDay: nextYear, provider: id};

        fetch(
            'https://visitou.ir/api/getAnalys.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dd)
            }
        ).then((response) =>
            response.json()
                .then((responseJson) => {
                    console.log(responseJson[0]["SUM(order_mount*order_price)"], 'dlkdklfdk3');
                    if(responseJson[0]["SUM(order_mount*order_price)"]!==null){
                        this.setState({third: responseJson[0]["SUM(order_mount*order_price)"]})
                    }else {
                        this.setState({third: '0'})

                    }
                }));


        console.log(cdc, 'kollllllll')
    }

    render() {


        let width = Dimensions.get('window').width; //full width
        let yyy = new Date();
        console.log(yyy.getTime(), 'ddddkfjhdkj');


        if (!this.state.third==='wait') {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <Content>


                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center',marginTop:20}}>
                    <Text style={{width: '30%', fontFamily: 'BYekan', textAlign: 'center'}}>فروش امسال</Text>
                    <View style={{width: 1, backgroundColor: 'grey', height: '100%'}}/>
                    <Text style={{width: '30%', fontFamily: 'BYekan', textAlign: 'center'}}>فروش این ماه</Text>
                    <View style={{width: 1, backgroundColor: 'grey', height: '100%'}}/>
                    <Text style={{width: '30%', fontFamily: 'BYekan', textAlign: 'center'}}>فروش امروز</Text>

                </View>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center',marginTop:0}}>
                    <Text style={{width: '30%', fontFamily: 'BYekan', textAlign: 'center'}}>{this.state.year}</Text>
                    <View style={{width: 1, backgroundColor: 'grey', height: '100%'}}/>
                    <Text style={{width: '30%', fontFamily: 'BYekan', textAlign: 'center'}}>{this.state.month}</Text>
                    <View style={{width: 1, backgroundColor: 'grey', height: '100%'}}/>
                    <Text style={{width: '30%', fontFamily: 'BYekan', textAlign: 'center'}}>{this.state.today}</Text>

                </View>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{
                        width: '30%',
                        fontFamily: 'BYekan',
                        textAlign: 'center'
                    }}>{this.state.third +' '+'تومان' }</Text>
                    <View style={{width: 1, backgroundColor: 'grey', height: '100%'}}/>
                    <Text style={{
                        width: '30%',
                        fontFamily: 'BYekan',
                        textAlign: 'center'
                    }}>{this.state.second  +' '+'تومان'  }</Text>
                    <View style={{width: 1, backgroundColor: 'grey', height: '100%'}}/>
                    <Text style={{
                        width: '30%',
                        fontFamily: 'BYekan',
                        textAlign: 'center'
                    }}>{this.state.first  +' '+'تومان'}</Text>

                </View>
                {/*<View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center',marginTop:10}}>*/}
                    {/*<View style={{width: '30%',justifyContent: 'center', alignItems: 'center',flexDirection:'row'}}>*/}
                    {/*<Button style={{margin:2}}>*/}
                        {/*<Text style={{fontFamily: 'BYekan',fontSize:11}}>پی دی اف امسال</Text>*/}
                    {/*</Button>*/}
                    {/*</View>*/}

                    {/*<View style={{width: '30%',justifyContent: 'center', alignItems: 'center',flexDirection:'row'}}>*/}
                    {/*<Button  style={{margin:2}}>*/}
                        {/*<Text style={{fontFamily: 'BYekan',fontSize:11}}>پی دی اف این ماه</Text>*/}

                    {/*</Button>*/}
                    {/*</View>*/}
                    {/*<View style={{width: '30%',justifyContent: 'center', alignItems: 'center',flexDirection:'row'}}>*/}
                    {/*<Button  style={{margin:2}}>*/}
                        {/*<Text style={{fontFamily: 'BYekan',fontSize:11}}>پی دی اف امروز</Text>*/}

                    {/*</Button>*/}
                    {/*</View>*/}

                {/*</View>*/}
                {/*<View style={{width:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:30}}>*/}
                    {/*<Button style={{backgroundColor:'#00B16A'}}>*/}
                        {/*<Text style={{color:'white',fontFamily: 'BYekan',}}>دریافت excel</Text>*/}
                    {/*</Button>*/}
                {/*</View>*/}
            </Content>
        );
    }
}

module.export = Search;