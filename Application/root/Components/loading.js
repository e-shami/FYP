import {View} from "react-native";
import LottieView from "lottie-react-native";


export  default  function LoadingSplash(props) {

    return (
        <View style={[{flex:1,justifyContent:"center",alignItems:"center"},props.style]}>


            <LottieView
                autoPlay
                style={{
                    width: 100,
                    height: 100,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/anim/data_lodaing.json')}
            />
        </View>
    )
}