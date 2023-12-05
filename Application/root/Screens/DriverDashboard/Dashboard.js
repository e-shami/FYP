import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ApiUrl } from "../../Urls/ApiUrls";
import { Picker } from "@react-native-picker/picker";
import LoadingModel from "../Modal/loadingModel";
import ErrorModel from "../Modal/ErrorModel";
import { SessionContext } from "../../Context/SessionContext";
import { SwitchUserContext } from "../../Context/SwitchUserContext";
import MapPickUpDropOff from "../Maps/MapPickUpDropOff";
import { LineChart } from "react-native-chart-kit";

export default function Dashboard(props) {
  let appMode = useContext(SwitchUserContext);
  const [driverData, setDriverData] = useState({
    wallet: 0.0,
    TRT: 0,
    DC: 0,
  });

  const [customerData, setCustomerData] = useState({
    totalCapacity: 0,
    lastReading: 0,
    estimatedRemainingTime: "",
  });

  const imageSize = 50;
  const CirlceSize = 12;
  const [rating, setRating] = useState(0);

  const [graphData, setGraphData] = useState({
    labels: [1],
    datasets: [{ data: [] }],
  });

  const styles2 = StyleSheet.create({
    conatiner: {
      flex: 1,
      flexDirection: "column",
      padding: 22,
      backgroundColor: "#ffffff",
      width: "100%",
      height: "100%",
    },
    image: {
      padding: 15,
      borderRadius: 15,
      paddingVertical: 10,
      flex: 1,
      justifyContent: "space-between",
      paddingVertical: 20,
    },
  });
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "white",
      alignItems: "center",
      padding: 22,
      marginTop: 50,
      justifyContent: "center",
    },
    FirstContainer: {
      width: "100%",
      paddingVertical: 40,
      padding: 30,
      backgroundColor: "rgba(0,118,125,0.65)",
      flexDirection: "column",
      borderRadius: 10,
      marginTop: 10,
      height: 200,
      overflow: "hidden",
      marginBottom: 10,
      justifyContent: "space-between",
    },
    flex: {
      flexDirection: "row",
    },
    ThirdContainer: {
      marginEnd: 36,
      width: "45%",
      height: 150,
      backgroundColor: "#d3d1d1",
      overflow: "hidden",
      borderRadius: 10,
    },
    BackContainer: {
      width: "100%",
      flexDirection: "row",
      borderRadius: 15,
      alignContent: "center",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 20,
      marginBottom: 10,
    },
    PicContainer: {
      alignItems: "center",
      alignSelf: "center",
    },
    pic: {
      textAlign: "center",
      alignSelf: "center",
    },
    Right: {
      alignSelf: "flex-end",
    },
    Circle: {
      width: CirlceSize,
      height: CirlceSize,
      borderRadius: CirlceSize / 2,
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
    },
    innerCircle: {
      width: CirlceSize / 2,
      height: CirlceSize / 2,
      borderRadius: CirlceSize / 4,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      color: "rgba(0, 0, 0, 0.5)",
      fontSize: 10,
      fontWeight: "400",
      fontFamily: "Poppins_400Regular",
    },
    dateFare: {
      marginEnd: 10,
      textAlign: "right",
    },
    Address: {
      fontWeight: "400",
      fontSize: 10,
    },
    titleAddressContainer: {
      paddingStart: 3,
      flexDirection: "column",
    },
    Button: {
      backgroundColor: "black",
      width: "45%",
      borderRadius: 10,
      marginTop: 35,
      marginBottom: 15,
      height: 50,
      alignContent: "center",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
    },
  });
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const filters = [
    { label: "Last 30 mins", value: "LAST_30_MIN" },
    { label: "Last 24 hrs", value: "LAST_24_HOURS" },
    { label: "Last 7 days", value: "LAST_7_DAYS" },
    { label: "Last 30 days", value: "LAST_30_DAYS" },
  ];
  const [filterType, setFilterType] = useState("LAST_30_MIN");
  const onRefresh = useCallback(() => {
    setFilterType("LAST_30_MIN");
    setRefreshing(true);
    getLevelHistory(filterType);
    getDashboard();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  async function getDashboard() {
    let type = "";
    if (appMode.SwitchUserDefaultData.isUserDriver) {
      type = "asDriver";
    } else {
      type = "asRider";
    }
    let data = {
      type: type,
    };

    await fetch(ApiUrl.dashboard, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + session.SessionData.Token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status <= 200) {
          setDriverData(data.msg);
          setLoading(false);
        } else {
          setLoading(false);
          setErrors([data.msg]);
        }
      })
      .catch(function (error) {
        setLoading(false);

        setErrors(["Network Error" + error]);
      });
  }

  const translateIntoGraphData = (data) => {
    let labels = [];
    let datasets = [];
    if (data[0]?.hour) {
      labels = data.map((item) => item.hour);
      let Xdata = data.map((item) => item.tankeLevel);
      Xdata.reverse();
      datasets = [
        {
          data: Xdata,
        },
      ];
      // reverse the array
      labels.reverse();
    } else {
      labels = data.map((item) => item.day);
      let Xdata = data.map((item) => item.tankeLevel);
      Xdata.reverse();
      datasets = [
        {
          data: Xdata,
        },
      ];
      // reverse the array
      labels.reverse();
    }
    let tempData = {
      labels: labels,
      datasets: datasets,
    };
    console.log(tempData);
    setGraphData(tempData);
  };

  async function getLevelHistory(filterType = "LAST_30_MIN") {
    await fetch(`${ApiUrl.getLevelHistory}?filterType=${filterType}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + session.SessionData.Token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status <= 200) {
          console.log("data is: ", data);
          if (filterType !== "LAST_30_MIN") {
            let temp = data;
            temp.estimatedRemainingTime = customerData.estimatedRemainingTime;
            setCustomerData(temp);
            console.log("temp data is: ", temp);
          } else {
            setCustomerData(data);
          }
          translateIntoGraphData(data.msg);

          setLoading(false);
        } else {
          setLoading(false);
          setErrors([data.msg]);
        }
      })
      .catch(function (error) {
        setLoading(false);

        setErrors(["Network Error" + error]);
      });
  }
  const [errors, setErrors] = useState([]);
  const [isLoadingOpen, setLoading] = useState(true);
  const session = useContext(SessionContext);
  const pickerRef = useRef();

  function open() {
    pickerRef.current?.focus();
  }

  function close() {
    pickerRef.current?.blur();
  }

  useEffect(() => {
    getDashboard();
    getLevelHistory("LAST_30_MIN");
  }, []);

  return (
    <ScrollView
      style={styles2.conatiner}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={[
          styles.FirstContainer,
          { height: appMode.SwitchUserDefaultData.isUserDriver ? 200 : 350 },
        ]}
      >
        <Text
          style={{
            color: "rgba(255, 255, 255, 0.71)",
            fontFamily: "Poppins_400Regular",
            fontSize: 20,
          }}
        >
          {appMode.SwitchUserDefaultData.isUserDriver
            ? "Total Earnings"
            : "Water Status"}
        </Text>
        {appMode.SwitchUserDefaultData.isUserDriver ? (
          <Text
            style={{
              color: "white",
              fontSize: 35,
              fontWeight: "800",
              fontFamily: "Poppins_400Regular",
              marginTop: 30,
            }}
          >
            {parseFloat(driverData.wallet).toFixed(2)} Rs
          </Text>
        ) : (
          <>
            <View
              style={{
                justifyContent: "space-between",
                marginHorizontal: 20,
                width: "90%",
                height: "50%",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  width: "90%",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "800",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Total Capacity:
                </Text>

                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "800",
                    fontFamily: "Poppins_400Regular",
                    textDecorationLine: "underline",
                  }}
                >
                  {customerData.totalCapacity} L
                </Text>
              </View>

              <View
                style={{
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  width: "90%",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "800",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Water Remaining:
                </Text>

                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "800",
                    fontFamily: "Poppins_400Regular",
                    textDecorationLine: "underline",
                  }}
                >
                  {customerData.lastReading} %
                </Text>
              </View>

              <View
                style={{
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  width: "90%",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "800",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Estimated Time:
                </Text>

                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "800",
                    fontFamily: "Poppins_400Regular",
                    textDecorationLine: "underline",
                  }}
                >
                  {customerData.estimatedRemainingTime} Hrs
                </Text>
              </View>
            </View>
          </>
        )}
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "Poppins_400Regular",
            textAlign: "right",
          }}
        >
          Updated Today
        </Text>

        {/* </ImageBackground> */}
      </View>
      {appMode.SwitchUserDefaultData.isUserDriver ? null : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "black",
                marginTop: 25,
                fontWeight: "500",
              }}
            >
              Filter By
            </Text>

            <Pressable
              onPress={() => {
                open();
              }}
              style={{
                flexDirection: "row",
              }}
            >
              <Text>
                {filterType === "LAST_30_MIN"
                  ? "Last 30 mins"
                  : filterType === "LAST_24_HOURS"
                  ? "Last 24 hrs"
                  : filterType === "LAST_7_DAYS"
                  ? "Last 7 days"
                  : filterType === "LAST_30_DAYS"
                  ? "Last 30 days"
                  : ""}
              </Text>

              <Picker
                ref={pickerRef}
                selectedValue={filterType}
                onValueChange={(itemValue, itemIndex) => {
                  setFilterType(itemValue);
                  getLevelHistory(itemValue);
                }}
              >
                {filters.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.label}
                      value={item.value}
                      key={index}
                    />
                  );
                })}
              </Picker>
            </Pressable>
          </View>

          {graphData.labels.length > 0 && customerData?.msg?.length > 0 ? (
            <LineChart
              data={{
                labels: graphData?.labels
                  ? graphData.labels
                  : ["January", "February", "March", "April", "May", "June"],
                datasets: graphData.datasets
                  ? graphData.datasets
                  : [
                      {
                        datsa: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ],
                      },
                    ],
              }}
              width={Dimensions.get("window").width - 45} // from react-native
              height={220}
              yAxisSuffix="%"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              propsForHorizontalLabels={{
                fontSize: 10,
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                fontSize: 10,
              }}
            />
          ) : (
            <View>
              <Text
                style={{
                  color: "black",
                  marginTop: 25,
                  fontWeight: "500",
                  fontFamily: "Poppins_400Regular",
                  fontSize: 18,
                }}
              >
                No Data Found
              </Text>
            </View>
          )}
        </>
      )}

      <Text
        style={{
          color: "black",
          marginTop: 25,
          fontWeight: "500",
          fontFamily: "Poppins_400Regular",
          fontSize: 18,
        }}
      >
        Weekly Stats
      </Text>
      <View style={styles.BackContainer}>
        <View style={styles.ThirdContainer}>
          <ImageBackground
            source={require("../../../assets/img/Rectangle15.png")}
            style={styles2.image}
            resizeMode="stretch"
          >
            <View
              style={{
                backgroundColor: "white",
                alignSelf: "flex-start",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <MaterialCommunityIcons name="steering" size={24} color="black" />
            </View>
            <Text
              style={{
                fontSize: 35,
                fontFamily: "Poppins_400Regular",
                fontWeight: "800",
              }}
            >
              {parseInt(driverData.TRT)}
            </Text>
            <Text
              style={{
                color: "rgba(0, 0, 0, 0.47)",
                fontFamily: "Poppins_400Regular",
                fontSize: 13,
              }}
            >
              {appMode.SwitchUserDefaultData.isUserDriver
                ? "Total Orders Taken"
                : "Total Orders"}
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.ThirdContainer}>
          <ImageBackground
            source={require("../../../assets/img/dashboard3.png")}
            style={styles2.image}
            resizeMode="cover"
          >
            <View
              style={{
                backgroundColor: "white",
                fontFamily: "Poppins_400Regular",
                alignSelf: "flex-start",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={24}
                color="black"
              />
            </View>
            <View style={styles.flex}>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "800",
                  alignSelf: "flex-end",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {parseFloat(driverData.DC).toFixed(1)}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "800",
                  alignSelf: "flex-end",
                  fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  marginLeft: 5,
                }}
              >
                {appMode.SwitchUserDefaultData.isUserDriver ? "KM" : " Units"}
              </Text>
            </View>
            <Text
              style={{
                color: "rgba(0, 0, 0, 0.47)",
                fontFamily: "Poppins_400Regular",
                fontSize: 13,
              }}
            >
              {appMode.SwitchUserDefaultData.isUserDriver
                ? "Distance Covered"
                : "Usage Analytics"}
            </Text>
          </ImageBackground>
        </View>

        <LoadingModel
          modalVisible={isLoadingOpen}
          setModalVisible={setLoading}
        />
        <ErrorModel errors={errors} setErrors={setErrors} />
      </View>

      {appMode.SwitchUserDefaultData.isUserDriver ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginHorizontal: 7,
          }}
        >
          <Pressable onPress={() => props.navigation.navigate("Map")}>
            <Text
              style={{
                color: "rgba(0, 0, 0, 0.75)",
                fontFamily: "Poppins_400Regular",
                fontSize: 13,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
              }}
            >
              Search for New Orders
            </Text>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}
