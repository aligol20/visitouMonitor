
import {Platform,AppState,StatusBar,PushNotificationIOS,StyleSheet, AsyncStorage,NetInfo,Alert,ActivityIndicator,Image,Text, View} from 'react-native';
import React, {Component} from 'react';
import {Container, Button} from 'native-base';
import {Router, Scene} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import RNExitApp from 'react-native-exit-app-no-history';
let catTi = 0;
const gooz = 7;

import Orders from './src/components/orders'
import AppBodyData from './src/components/appBodyData'
import Customers from './src/components/customers'
import Products from './src/components/products'
import Notification from './src/components/notification'
import Providers from './src/components/providers'
import NewProvider from './src/components/newProvider'
import ProDetails from './src/components/ProDetails'
import ProductDetails from './src/components/productDetails'
import NewProduct from './src/components/newProduct'
import NewModel from './src/components/newModel'


// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS

export default class App extends Component<{}> {

    constructor(props) {

        super(props);
        this.state = {
            userTitle: '',
            catTi: '',
            intro: true,
            name: 'intro',
            koon: 5,
            offer: false,
            shir: 1,
            khar:true,
            connection:false,
        };
        AsyncStorage.getItem('AmIlogged',(err,store)=>{
            console.log(store,'alalalalal');
            if (store) {
                this.setState({shir:7});

                let pp = JSON.parse(store);
                console.log(this.state.shir,'alalalalal5');

                fetch('http://visitou.ir/api/logProIN.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pp)
                }).then((response) =>
                    response.json()
                        .then((responseJson) => {
                            let r='';
                            //AsyncStorage.setItem('proList', JSON.stringify(responseJson));
                            console.log(responseJson,'alalalalal4');
                            for(let i=0;i<responseJson.length;i++){
                                r=r+responseJson[i].product_id+',';
                            }
                            r=r+'0';
                            // Actions.feed();
                            console.log(JSON.stringify(r),'alalalalal467');

                            fetch('http://visitou.ir/api/getpropro.php', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(r)
                            }).then((response) =>
                                response.json()
                                    .then((responseJson) => {

                                            AsyncStorage.setItem('proList', JSON.stringify(responseJson));
                                            AsyncStorage.setItem('AmIlogged', JSON.stringify(pp));
                                            console.log(responseJson, 'alalalalal46');
                                            this.setState({isLoading: false});

                                        }

                                    ))

                        })
                )


            } else {
                this.setState({shir:7});
            }

        });
    }
    componentDidMount(){

        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings

        AppState.addEventListener('change',this.handleAppStateChange);
    }
    componentWillMount() {
        AppState.removeEventListener('change',this.handleAppStateChange);
        // this.notificationListener.remove();

        // AsyncStorage.getItem('introSeen', (err, store) => {
        //     console.log(store, 'ridim...2');




        // });
    }
    handleAppStateChange(appState){
        if(appState=== 'background'){
            // PushNotification.localNotificationSchedule({
            //     message: "My Notification Message", // (required)
            //     date: new Date(Date.now() + (10 * 1000)) // in 60 secs
            // });
        }

    }
    otherMethods(){

        FCM.subscribeToTopic('/topics/ahmad');
        FCM.unsubscribeFromTopic('/topics/foo-bar');
        FCM.presentLocalNotification({
            id: "UNIQ_ID_STRING",                               // (optional for instant notification)
            title: "My Notification Title",                     // as FCM payload
            body: "My Notification Message",                    // as FCM payload (required)
            sound: "default",                                   // as FCM payload
            priority: "high",                                   // as FCM payload
            click_action: "com.myapp.MyCategory",               // as FCM payload - this is used as category identifier on iOS.
            badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
            number: 10,                                         // Android only
            ticker: "My Notification Ticker",                   // Android only
            auto_cancel: true,                                  // Android only (default true)
            large_icon: "ic_launcher",                           // Android only
            icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
            big_text: "Show when notification is expanded",     // Android only
            sub_text: "This is a subText",                      // Android only
            color: "red",                                       // Android only
            vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
            wake_screen: true,                                  // Android only, wake up screen when notification arrives
            group: "group",                                     // Android only
            picture: "https://google.png",                      // Android only bigPicture style
            ongoing: true,                                      // Android only
            my_custom_data:'my_custom_field_value',             // extra data you want to throw
            lights: true,                                       // Android only, LED blinking (default false)
            show_in_foreground                                  // notification when app is in foreground (local & remote)
        });

        FCM.scheduleLocalNotification({
            fire_date: new Date().getTime(),      //RN's converter is used, accept epoch time and whatever that converter supports
            id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
            body: "from future past",
            repeat_interval: "week" //day, hour
        })

        FCM.getScheduledLocalNotifications().then(notif=>console.log(notif));

        //these clears notification from notification center/tray
        FCM.removeAllDeliveredNotifications()
        FCM.removeDeliveredNotification("UNIQ_ID_STRING")

        //these removes future local notifications
        FCM.cancelAllLocalNotifications()
        FCM.cancelLocalNotification("UNIQ_ID_STRING")

        FCM.setBadgeNumber(1);                                       // iOS and supporting android.
        FCM.getBadgeNumber().then(number=>console.log(number));     // iOS and supporting android.
        FCM.send('984XXXXXXXXX', {
            my_custom_data_1: 'my_custom_field_value_1',
            my_custom_data_2: 'my_custom_field_value_2'
        });

        // Call this somewhere at initialization to register types of your actionable notifications. See https://goo.gl/UanU9p.
        FCM.setNotificationCategories([
            {
                id: 'com.myapp.MyCategory',
                actions: [
                    {
                        type: NotificationActionType.Default, // or NotificationActionType.TextInput
                        id: 'com.myapp.MyCategory.Confirm',
                        title: 'Confirm', // Use with NotificationActionType.Default
                        textInputButtonTitle: 'Send', // Use with NotificationActionType.TextInput
                        textInputPlaceholder: 'Message', // Use with NotificationActionType.TextInput
                        // Available options: NotificationActionOption.None, NotificationActionOption.AuthenticationRequired, NotificationActionOption.Destructive and NotificationActionOption.Foreground.
                        options: NotificationActionOption.AuthenticationRequired, // single or array
                    },
                ],
                intentIdentifiers: [],
                // Available options: NotificationCategoryOption.None, NotificationCategoryOption.CustomDismissAction and NotificationCategoryOption.AllowInCarPlay.
                // On iOS >= 11.0 there is also NotificationCategoryOption.PreviewsShowTitle and NotificationCategoryOption.PreviewsShowSubtitle.
                options: [NotificationCategoryOption.CustomDismissAction, NotificationCategoryOption.PreviewsShowTitle], // single or array
            },
        ]);

        FCM.deleteInstanceId()
            .then( () => {
                //Deleted instance id successfully
                //This will reset Instance ID and revokes all tokens.
            })
            .catch(error => {
                //Error while deleting instance id
            });
    }
    fetchJsons() {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
        function handleFirstConnectivityChange(isConnected) {

            console.log('Then,shoombool is ' + (isConnected ? 'online' : 'offline'));
            // this.setState({connection:true});
            if (isConnected){
                try {

                    // Promise.all() lets us coalesce multiple promises into a single super-promise


                    fetch('http://visitou.ir/api/readCity.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('cityList', JSON.stringify(responseJson));

                            // console.log(responseJson,'hfjjghjgjhgjfjf')

                        });

                    fetch('http://visitou.ir/api/readCategory.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('categoryList', JSON.stringify(responseJson));

                            console.log(responseJson,'categoryList')

                        });
                    fetch('http://visitou.ir/api/header.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('header', JSON.stringify(responseJson));

                            console.log(responseJson,'header')

                        });
                    fetch('http://visitoumonitor.ir/api/sub_cat.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('sub_cat', JSON.stringify(responseJson));

                            console.log(responseJson,'sub_cat')

                        });
                    fetch('http://visitoumonitor.ir/api/readLocals.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('localsList', JSON.stringify(responseJson));

                            console.log(responseJson,'localsList')

                        });
                    fetch('http://visitoumonitor.ir/api/read_delivery_time.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('deliveryTimes', JSON.stringify(responseJson));

                            console.log(responseJson,'deliveryTimes')

                        });
                    fetch('http://visitoumonitor.ir/api/read_delivery_text.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('deliveryText', JSON.stringify(responseJson));

                            console.log(responseJson,'deliveryText')

                        });
                    fetch('http://visitoumonitor.ir/api/get_dialogs.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('dialogs', JSON.stringify(responseJson));
                            console.log(responseJson,'dialogs')
                            const ghoo = responseJson.filter(x => x.dialog_type.includes("firstdialog"));


                        });
                    fetch('http://visitoumonitor.ir/api/checkupdate.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('checkUpdates', JSON.stringify(responseJson));

                            console.log(responseJson,'checkUpdates')

                        });
                    // AsyncStorage.getItem('whereAmI', (err, store) => {
                    //     let pp={city: JSON.parse(store)};
                    //     console.log(JSON.parse(store), 'hthththt2');
                    //
                    //
                    //     if (store !== null) {
                    //         fetch('http://visitoumonitor.ir/api/readProducts_offer_new.php', {
                    //             method: 'POST',
                    //             headers: {
                    //                 'Accept': 'application/json',
                    //                 'Content-Type': 'application/json',
                    //             },
                    //             body: JSON.stringify(pp)
                    //         }).then((response) => {
                    //                 console.log(JSON.parse(response._bodyInit), 'hthththt233');
                    //                 AsyncStorage.setItem('offerList', response._bodyInit);
                    //
                    //             }
                    //         );
                    //
                    //         fetch('http://visitoumonitor.ir/api/readProducts_new.php', {
                    //             method: 'POST',
                    //             headers: {
                    //                 'Accept': 'application/json',
                    //                 'Content-Type': 'application/json',
                    //             },
                    //             body: JSON.stringify(pp)
                    //         }).then((response) => {
                    //                 AsyncStorage.setItem('allProducts', response._bodyInit);
                    //                 console.log(response._bodyInit, 'nananana2');
                    //
                    //             }
                    //         );
                    //     }
                    // });
                    fetch('http://visitoumonitor.ir/api/read_delivery_costs.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('deliveryCost', JSON.stringify(responseJson));


                        });





                    //
                    // AsyncStorage.setItem('offerList', JSON.stringify(data[0]));
                    // AsyncStorage.setItem('allProducts', JSON.stringify(data[1]));
                    // AsyncStorage.setItem('categoryList', JSON.stringify(data[2]));
                    // AsyncStorage.setItem('localsList', JSON.stringify(data[3]));
                    // AsyncStorage.setItem('deliveryTimes', JSON.stringify(data[4]));
                    // AsyncStorage.setItem('deliveryText', JSON.stringify(data[5]));
                    // AsyncStorage.setItem('dialogs', JSON.stringify(data[6]));
                    // AsyncStorage.setItem('checkUpdates', JSON.stringify(data[7]));
                    // AsyncStorage.setItem('deliveryCost', JSON.stringify(data[8]));


                    // for (var i of data) {
                    //     console.log(`RESPONSE ITEM \n`);
                    //     for (var obj of i) {
                    //         console.log(obj);
                    //         console.log(i,'kooni');
                    //         console.log(obj,'kooni');
                    //         //logger utility method, logs output to screen
                    //         //console.log(obj);
                    //     }
                    // }

                    // await this.setState({loaded:data[0]});

                } catch (error) {
                    console.log(error, 'akhond dozd');
                }
            }else {
                RNExitApp.exitApp();



            }


            NetInfo.isConnected.removeEventListener(
                'connectionChange',
                handleFirstConnectivityChange
            );
        }
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );

        console.log('ridim...');

        // if(this.state.connection){

        // }else {
        //     Alert.alert(
        //         'پیغام',
        //         'اتصال اینترنت خود را بررسی کنید',
        //
        //         [
        //
        //             {text: 'خب', onPress: () => console.log('OK Pressed')},
        //         ],
        //         { cancelable: false }
        //     );
        //     // RNExitApp.exitApp();
        //
        //
        // }

        console.log('ridim...234');

    }
    onBackFunction() {
        console.log("mahnazparivash20");
        Actions.cart();
    }
    onBackPress = () => {
        if (Actions.currentScene === 'feed') {
            return false
        }
        Actions.pop();
        return true
    };
    render() {
        let rrr='';


        console.log( Actions.currentScene,'ridim...478');

        // console.log( frd,'ridim...437');


        if (this.state.shir === 7) {
            return (
                <Container>
                    <StatusBar backgroundColor="#055389" barStyle="light-content" />

                    <Router backAndroidHandler={this.onBackPress} >

                        <Scene   key="root" sceneStyle={{fontFamily: 'BYekan'}}  navigationBarStyle={{backgroundColor:'#1c4473'}}  titleStyle={{fontFamily: 'BYekan'}} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7">
                            <Scene key="feed" component={AppBodyData} title="خانه" hideNavBar={true} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="newProvider" component={NewProvider} title=" new provider " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="notification" component={Notification} title=" نوتیفیکیشن" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="products" component={Products} title=" محصولات"
                                   onBack={() => this.onBackFunction()} navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="orders" component={Orders} title="سفارش ها"  navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="customers" component={Customers} title="مشتری" navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="providers" component={Providers} title="تامین کننده " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="proDe" component={ProDetails} title=" جزییات تامین کننده " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="productDetails" component={ProductDetails} title=" جزییات محصول " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="newProduct" component={NewProduct} title=" محصول جدید " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>
                            <Scene key="newModel" component={NewModel} title=" مدل جدید " navBarButtonColor="#FDE3A7" backButtonTintColor="#FDE3A7"/>


                        </Scene>
                    </Router>



                </Container>
            );
        }

        else {
            return (
                <Container style={{backgroundColor:'white'}}>


                </Container>
            );
        }


    }


}
