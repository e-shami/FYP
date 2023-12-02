import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RideRequestScreen from "./RideRequestScreen";
import RideBottomSheet from "./RideBottomSheet";
import RideHistoryScreen from "./RideHistory";
import CustomSidebarMenu from "./CustomSidebarMenu";
import "react-native-gesture-handler"
import RideDetailScreen from "./RideDetailScreen";
import Profile from "./Profile";
import SettingsPage from "../Settings/SettingsPage";
import ChangePassword from "../Settings/ChangePassword";
import ChangeEmail from "../Settings/ChangeName";
import ChangePhone from "../Settings/ChangePhone";
import Dashboard from "./Dashboard";
import Subscription from "./Subscription";
import ChangeCity from "../Settings/ChangeCity";
import MapEntry from "./MapEntry";
import RideAcceptedProvider from "../../Context/RideAcceptedContext";
import ChangeName from "../Settings/ChangeName";

const Drawer = createDrawerNavigator();

export default function DriverEntery({navigation}) {
    return (
        <RideAcceptedProvider>
            <Drawer.Navigator
                drawerContent={(props) => <CustomSidebarMenu {...props} />}
                initialRouteName="Dashboard">
                <Drawer.Screen name="Map" component={MapEntry} options={{headerShown: false}}/>
                <Drawer.Screen name="RideRequest" component={RideRequestScreen} options={{headerShown: false}}/>
                <Drawer.Screen name="Dashboard" component={Dashboard}/>
                <Drawer.Screen name="RideBottomSheet" component={RideBottomSheet} options={{headerShown: false}}/>
                <Drawer.Screen name="History" component={RideHistoryScreen}/>
                <Drawer.Screen name="Ride Detail" component={RideDetailScreen}/>
                <Drawer.Screen name="Profile" component={Profile}/>
                <Drawer.Screen name="Settings" component={SettingsPage}/>
                <Drawer.Screen name="Change Password" component={ChangePassword}/>
                <Drawer.Screen name="Change City" component={ChangeCity}/>
                <Drawer.Screen name="Change Name" component={ChangeName}/>
                <Drawer.Screen name="Change Phone No" component={ChangePhone}/>
                <Drawer.Screen name="Subscription" component={Subscription}/>
            </Drawer.Navigator>
        </RideAcceptedProvider>
    );
}