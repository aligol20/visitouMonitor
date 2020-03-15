import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon4 from 'react-native-vector-icons/EvilIcons'
import StarRating from 'react-native-star-rating';

import {
    ActivityIndicator,
    renderRow,ListView,AsyncStorage,TextInput
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import moment from 'jalali-moment';
import ProgressDialog from "react-native-simple-dialogs/src/ProgressDialog";

export default class Customers extends React.Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: dss.cloneWithRows([]),
            listArray:[],
            waiting:false,
            isLoading:true,
            item:'',

        };
        this.getDate();

    }
    searchMe(value) {

        this.setState({isLoading:true});
        if (value === '') {
            this.setState({item: ''});

        } else {
            this.setState({item: value.toLowerCase()});

        }
        let r=this.state.listArray;
        console.log(r, 'mahnazparivash15');

        let ghoo = r.filter(x => x.name.includes(value));

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



    }
    getDate(){

        fetch('http://visitou.ir/api/loadcustomers.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson,'knvdkldkl')
                let ede = [];

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
    loadMore(){
        this.setState({waiting:true});
        console.log(parseInt(this.state.listArray.length)+25,'dlkdfjdlkf');
        let pp = {lenght: parseInt(this.state.listArray.length)+25};
        fetch('http://visitou.ir/api/loadMoreCustomers.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson,'knvdkldkl')
                let ede = [];

                const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                this.setState({
                    listArray:responseJson,
                    isLoading: false,
                    waiting:false,
                    dataSource: dss.cloneWithRows(responseJson.map(function (tt) {
                        return tt
                    })),
                });

            });
    }
    render(){


        return (
            <Content>
                <ProgressDialog
                    visible={this.state.waiting}
                    message="لطفا صبر کنید"
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    margin: 5
                }}>
                    <TextInput style={{width: '90%'}}
                               onChangeText={(value => this.searchMe(value))}/>
                    <Icon4

                        name={'search'}
                        color={'black'}
                        size={25}/>

                </View>
                {this.state.isLoading && (
                    <ActivityIndicator
                        style={{ height: 80 }}
                        color="#6C7A89"
                        size="small"
                    />
                )}
                <View style={{width:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <ListView

                        style={{width: '100%'}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, rowID, sectionID) =>
                            <View style={{
                                borderColor: '#1E8BC3',
                                borderWidth: 1,
                                borderRadius: 3,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                margin: 3
                            }}>
                                <View style={{margin:3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={parseInt(rowData.user_rate)}
                                    starSize={23}
                                    fullStarColor='#F9BF3B'
                                    halfStar='#F9BF3B'
                                    emptyStarColor="#F9BF3B"


                                />
                                    <Text style={{margin:7,color:'black',fontFamily:'BYekan'}}>{rowData.user_vote}</Text>
                                </View>

                                <View style={{flexDirection: 'row',marginBottom:3}}>
                                    <Text style={{width: '33%', textAlign: 'center'}}>{rowData.name}</Text>
                                    <Text style={{width: '33%', textAlign: 'center'}}>{rowData.family}</Text>
                                    <Text style={{width: '33%', textAlign: 'center'}}>{rowData.phonenumber}</Text>

                                </View>
                                <View style={{flexDirection: 'row',marginBottom:3}}>
                                    <Text style={{width: '20%', textAlign: 'center'}}>{rowData.city}</Text>
                                    <Text style={{width: '80%', textAlign: 'center'}}>{rowData.address1}</Text>
                                </View>
                                <View style={{flexDirection: 'row',marginBottom:3}}>
                                    <Text style={{width: '33%', textAlign: 'center'}}>{rowData.city}</Text>
                                    <Text style={{width: '33%', textAlign: 'center'}}>{rowData.address1}</Text>
                                </View>

                            </View>
                        }/>
                    <View style={this.state.isLoading ? {height:0} : {borderRadius:7}}>
                        <Button onPress={() => this.loadMore()}>
                            <Text>load more</Text>
                        </Button>
                    </View>
                </View>
            </Content>
        );

    }

}
module.export = Customers;
