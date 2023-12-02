import RideAcceptedProvider, {RideAcceptedContext} from "../../Context/RideAcceptedContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as React from "react";
import {SessionContext} from "../../Context/SessionContext";
import STATUS_CODE from "../../Urls/StatusCode";
import {useContext} from "react";
import {ApiUrl} from "../../Urls/ApiUrls";
import RiderMap from "./RiderMap";
import ChattingScreen from "../DriverDashboard/ChattingScreen";
import OngoingRide from "./OngoingRide";
import SearchingRide from "./SearchingRide";
import {Loading} from "../DriverDashboard/MapEntry";
import RideDetailScreen from "../DriverDashboard/RideDetailScreen";

const Stack = createNativeStackNavigator();


function MapEntryRider(props) {
    const session = useContext(SessionContext);
    return <MapEntryContextRider session={session}/>
}

class MapEntryContextRider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    init = "";

    componentDidMount() {
        fetch(ApiUrl.checkRideStatus, {
            method: "GET",
            headers: {
                Authorization: "Token " + this.props.session.SessionData.Token
            }
        }).then((res) => res.json()).then((resp) => {
            console.log("=======",resp)
            if (resp.status === STATUS_CODE.FOUND_IP_RIDE) {
                if(resp.ride.rideStatus ==="SR")
                {
                    this.init = "SearchingRide"
                }
                else
                {
                    this.init = "OngoingRide"
                }
                this.context.setData(resp.ride);
            } else
                this.init = "Map2"
            this.forceUpdate()
        }).catch(erro=>{
            console.log(erro)
        })


    }

    componentDidUpdate() {

    }

    render() {
        if (this.init.length === 0)
            return <Loading/>
        return (
            <Stack.Navigator
                initialRouteName={this.init}
            >
                <Stack.Screen name="Map2" component={RiderMap} options={{headerShown: false}}/>
                <Stack.Screen name="Chatting Screen" component={ChattingScreen} options={{headerShown: false}}/>
                <Stack.Screen name="OngoingRide" component={OngoingRide} options={{headerShown: false}}/>
                <Stack.Screen name="SearchingRide" component={SearchingRide} options={{headerShown: false}}/>
                <Stack.Screen name="RideDetail" component={RideDetailScreen}/>
            </Stack.Navigator>
        )
    }

}

MapEntryContextRider.contextType = RideAcceptedContext;

export default MapEntryRider;
