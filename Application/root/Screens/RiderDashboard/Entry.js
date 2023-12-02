import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import RideHistoryScreen from "../DriverDashboard/RideHistory";
import ChattingScreen from "../DriverDashboard/ChattingScreen";
import CustomSidebarMenu from "../DriverDashboard/CustomSidebarMenu";
import "react-native-gesture-handler"
import RideDetailScreen from "../DriverDashboard/RideDetailScreen";
import Profile from "../DriverDashboard/Profile";
import SettingsPage from "../Settings/SettingsPage";
import ChangePassword from "../Settings/ChangePassword";
import ChangeEmail from "../Settings/ChangeName";
import ChangePhone from "../Settings/ChangePhone";
import Dashboard from "../DriverDashboard/Dashboard";
import ChangeCity from "../Settings/ChangeCity";
import RiderMap from "./RiderMap";
import MapScreen from "./MapScreen";
import GooglePlacesInput from "../../Components/User/GooglePlaceInput";
import PickUpDropOffProvider from "../../Context/PickUpDropOff";
import SearchingRide from "./SearchingRide";
import OngoingRide from "./OngoingRide";
import RideAcceptedProvider from "../../Context/RideAcceptedContext";
import MapEntryRider from "./MapEntryRider";
import ChangeName from "../Settings/ChangeName";

const Drawer = createDrawerNavigator();

export default function RiderEntry() {

    return (
        <PickUpDropOffProvider>
            <RideAcceptedProvider>

                <Drawer.Navigator
                    drawerContent={(props) => <CustomSidebarMenu {...props} />}
                    initialRouteName="Dashboard">
                    <Drawer.Screen name="Map" component={MapEntryRider} options={{headerShown: false}}/>
                    <Drawer.Screen name="SearchingRide" component={SearchingRide} options={{headerShown: false}}/>
                    <Drawer.Screen name="OngoingRide" component={OngoingRide} options={{headerShown: false}}/>
                    <Drawer.Screen name="Dashboard" component={Dashboard}/>
                    <Drawer.Screen name="Profile" component={Profile}/>

                    <Drawer.Screen name="History" component={RideHistoryScreen}/>
                    <Drawer.Screen name="Chatting Screen" component={ChattingScreen}/>
                    <Drawer.Screen name="Ride Detail" component={RideDetailScreen}/>

                    <Drawer.Screen name="Settings" component={SettingsPage}/>
                    <Drawer.Screen name="Change Password" component={ChangePassword}/>
                    <Drawer.Screen name="Change City" component={ChangeCity}/>
                    <Drawer.Screen name="Change Name" component={ChangeName}/>
                    <Drawer.Screen name="Change Phone No" component={ChangePhone}/>
                    <Drawer.Screen name="ChooseFromMap" component={MapScreen} options={{headerShown: false}}/>
                    <Drawer.Screen name="SearchLocation" component={GooglePlacesInput} options={{headerShown: false}}/>
                </Drawer.Navigator>
            </RideAcceptedProvider>

        </PickUpDropOffProvider>
    );
}