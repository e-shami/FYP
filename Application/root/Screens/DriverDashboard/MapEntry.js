import RideAcceptedProvider, {RideAcceptedContext} from "../../Context/RideAcceptedContext";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DriverMap from "./DriverMap";
import * as React from "react";
import LoadingSplash from "../../Components/loading";
import ChattingScreen from "./ChattingScreen";
import RideBottomSheet from "./RideBottomSheet";
import ApiUrls, {ApiUrl} from "../../Urls/ApiUrls";
import {useContext} from "react";
import {SessionContext} from "../../Context/SessionContext";
import STATUS_CODE from "../../Urls/StatusCode";
import RideDetailScreen from "./RideDetailScreen";

const Stack = createNativeStackNavigator();

function Loading() {

    return <LoadingSplash style={{backgroundColor: "white"}}/>
}

function MapEntry(props) {
    const session = useContext(SessionContext);
    return <MapEntryContext session={session}/>
}

class MapEntryContext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRouteName: "Map2"
        }
    }

    init = "";

    componentDidMount() {
        fetch(ApiUrl.checkOnGoingRide, {
            method: "GET",
            headers: {
                Authorization: "Token " + this.props.session.SessionData.Token
            }
        }).then((res) => res.json()).then((resp) => {
            if (resp.status === STATUS_CODE.RIDE_ACCEPTED_SUCCESSFULLY) {
                this.init = "RideBottomSheet"
                console.log(resp.msg);
                this.context.setData(resp.msg);
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
                <Stack.Screen name="Map2" component={DriverMap} options={{headerShown: false}}/>
                <Stack.Screen name="Chatting Screen" component={ChattingScreen} options={{headerShown: false}}/>
                <Stack.Screen name="RideBottomSheet" component={RideBottomSheet} options={{headerShown: false}}/>
                <Stack.Screen name="RideDetail" component={RideDetailScreen}/>

            </Stack.Navigator>
        )
    }

}

MapEntryContext.contextType = RideAcceptedContext;

export default MapEntry;
export {
    Loading
}