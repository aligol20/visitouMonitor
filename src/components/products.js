import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {TextInput,
    ActivityIndicator,
    renderRow,ListView,AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Image2 from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Icon4 from 'react-native-vector-icons/EvilIcons'

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: dss.cloneWithRows([]),
            isLoading:true,
            listArray:[],

        };
        this.getDate();

    }
    getDate(){

        fetch('http://visitou.ir/api/readProductsM.php', {
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
    searchMe(value) {

        this.setState({isLoading:true});
        if (value === '') {
            this.setState({item: ''});

        } else {
            this.setState({item: value.toLowerCase()});

        }
        let r=this.state.listArray;
        console.log(r, 'mahnazparivash15');

        let ghoo = r.filter(x => x.product_name.includes(value));

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
    shest(data){
        console.log(data,'dfdkfjdklf');
        AsyncStorage.setItem('Detail',JSON.stringify(data))
        Actions.productDetails()

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
            <Container>
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
            <Content>
                <ListView

                    style={{width: '100%', backgroundColor: '#00000000'}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, rowID, sectionID) =>

                        <View style={{
                            backgroundColor: '#00000000',
                            width: '100%'
                        }}>
                            <View style={{
                                marginBottom: 2,
                                marginRight: 5,
                                marginLeft: 5,
                                marginTop: 1,
                                borderRadius: 7,
                            }}>
                                <Button style={{backgroundColor: 'white', height: 80}}
                                        onPress={() => this.shest(rowData)}>


                                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                                        <View style={{flexDirection: 'column'}}>
                                            <Text style={{
                                                marginBottom: 10,
                                                marginTop: 10,
                                                color: 'green',
                                                fontFamily: 'BYekan'
                                            }}>
                                                 {rowData.unitprice} تومان

                                            </Text>



                                        </View>
                                        <Right>
                                            <Text style={{
                                                alignItems: 'center', marginRight: 7
                                                , fontFamily: 'BYekan'
                                            }}>
                                                {rowData.product_name}

                                            </Text>
                                        </Right>
                                    </View>
                                    <View style={{overflow: 'hidden', margin: 10, borderRadius: 7}}>
                                        <Image2
                                            key={rowID}
                                            source={{uri: rowData.small_image_link, cache: 'force-cache',}}
                                            indicator={Progress}

                                            style={{
                                                width: 60,
                                                height: 60
                                            }}/>

                                    </View>


                                </Button>

                            </View>
                        </View>

                    }/>
            </Content>
                <Button
                    onPress={()=>Actions.newProduct()}
                    style={{width:'100%',height:53,borderRadius:0,justifyContent:'center',alignItems:'center'}}><Text>new product</Text></Button>

            </Container>
        );
    }

}
module.export = Products;
