import { StyleSheet, View, Text, Pressable} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useContext, useState} from "react";
import { SwitchUserContext } from "../../Context/SwitchUserContext";
import { SessionContext } from "../../Context/SessionContext";


function SideBarButton(props) {
  var BackGround = "transparent";
  if (props.isSelected) BackGround = "rgba(0, 0, 0, 0.3)";


  const styles = StyleSheet.create({
    container: {
      backgroundColor: BackGround,
      padding: 15,
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontWeight: "400",
      fontSize: 16,
      color: "#00767D",
      flex: 1,
      marginStart: 20,
    },
  });

  return (
    <Pressable
      onPress={() => props.onpress(props.text)}
      style={styles.container}
    >
      {props.icon}
      <Text style={styles.text}>{props.text}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
    </Pressable>
  );
}

export default function CustomSidebarMenu(props) {
  const UserData = useContext(SwitchUserContext);
  const Session = useContext(SessionContext);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    Menu: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 50,
      marginBottom: 20,
    },
  });

  function OnclickNavigate(text) {
    if (text === "Map") props.navigation.navigate("Map");
    else if (text === "History") props.navigation.navigate("History");
    else if (text === "Profile") props.navigation.navigate("Profile");
    else if (text === "Settings") props.navigation.navigate("Settings");
    else if (text === "Dashboard") props.navigation.navigate("Dashboard");
    else if (text === "Subscription") props.navigation.navigate("Subscription");
    else if (text === "Signout") {
      Session.ClearSession();
      props.navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      }); 
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.Menu}>
        <Text   
          style={{
            fontWeight: "500",
            fontSize: 18,
            marginStart: 20,
            color: "#00767D",
            fontFamily: "Poppins_500Medium",
          }}
        >
          Menu
        </Text>
        <Pressable
          style={{ padding: 15 }}
          onpress={() => {
            navigation.closeDrawer();
            console.log("close");
          }}
        >
          <Entypo name="cross" size={30} color="#00767D" />
        </Pressable>
      </View>

      <View style={{ height: 1, backgroundColor: "#00767D" }} />
      <SideBarButton
        onpress={OnclickNavigate}
        icon={
          <MaterialCommunityIcons
            name="view-dashboard-outline"
            size={32}
            color="#00767D"
          />
        }
        text={"Dashboard"}
      />
      <SideBarButton
        onpress={OnclickNavigate}
        icon={<FontAwesome5 name="map-marked-alt" size={32} color="#00767D" />}
        text={"Map"}
      />
      <SideBarButton
        onpress={OnclickNavigate}
        icon={
          <MaterialIcons name="history-toggle-off" size={32} color="#00767D" />
        }
        text={"History"}
      />
      <SideBarButton
        onpress={OnclickNavigate}
        icon={<Ionicons name="person-circle-sharp" size={32} color="#00767D" />}
        text={"Profile"}
      />
      <SideBarButton
        onpress={OnclickNavigate}
        icon={<Ionicons name="settings-sharp" size={32} color="#00767D" />}
        text={"Settings"}
      />

      {UserData.SwitchUserDefaultData.isUserDriver ? (
        <SideBarButton
            
          onpress={OnclickNavigate}
          icon={<Ionicons name="medal-outline" size={32} color="#00767D" />}
          text={"Subscription"}
        />
      ) : null}
      <View
        style={{
          height: 1,
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: "#00767D",
        }}
      />

        {!UserData.SwitchUserDefaultData.isUserDriver ? (
            <SideBarButton
              onpress={() => {
                var data = Object.assign({}, UserData.SwitchUserDefaultData);
                data.isUserDriver = !data.isUserDriver;
                Session.ClearSession();
                UserData.setUserData(data);
              }}
              icon={<FontAwesome5 name="car-alt" size={32} color="#00767D" />}
              text="Switch to Driver"
            />
        ): null}

      <SideBarButton
        onpress={OnclickNavigate}
        icon={<Feather name="log-in" size={32} color="#00767D" />}
        text={"Signout"}
      />
    </View>
  );
}
