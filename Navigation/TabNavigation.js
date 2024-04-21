import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Profile from "../screen/Components/Profile/Profile";
import AI from "../screen/Components/AI/Al";
import Home from "../screen/Components/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LottieView from "lottie-react-native";
// import Svg, { Path, G, Defs } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}) => {
  const { bottom } = useSafeAreaInsets();
  const ref = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const svgHeight = 124 * (screenWidth / 428); // Calculate the height based on the aspect ratio

  const shadow = {
    position: "absolute",
    width: screenWidth,
    height: svgHeight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4, // Android elevation
    backgroundColor: "transparent", // Required to ensure shadow is visible on Android
    bottom: 0,
  };
  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      {/* <Svg
        width={Dimensions.get("window").width}
        height="124"
        viewBox="0 0 428 124"
        fill="none"
        style={{
          position: "absolute",
          transform: [{ translateY: -30 }],
          width: "100%",
          left: 0,
        }}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M260.212 48.3011C267.635 37.4547 274.105 28 285 28H428V124H0V28H139C148.902 28 155.201 37.0582 162.541 47.6134C172.788 62.3481 185.063 80 212 80C238.519 80 250.227 62.8914 260.212 48.3011Z"
          fill="#ffffff"
        />
      </Svg> */}
      <View style={shadow}>
        <Svg
          width={screenWidth}
          height={svgHeight}
          viewBox="0 0 428 124"
          fill="none"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M260.212 48.3011C267.635 37.4547 274.105 28 285 28H428V124H0V28H139C148.902 28 155.201 37.0582 162.541 47.6134C172.788 62.3481 185.063 80 212 80C238.519 80 250.227 62.8914 260.212 48.3011Z"
            fill="white"
          />
        </Svg>
      </View>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <Pressable
              onPress={() => {
                navigation.navigate(route.name);
              }}
              onLayout={() => {}}
              style={[styles.component, { top: index === 1 ? -20 : 0 }]}
            >
              <View
                style={[
                  styles.componentCircle,
                  {
                    transform: [
                      {
                        scale: 1,
                      },
                    ],
                  },
                ]}
              />
              <View
                style={[
                  styles.iconContainer,
                  {
                    transform: [
                      {
                        scale: 1,
                      },
                    ],
                  },
                ]}
              >
                {/* @ts-ignore */}
                {options.tabBarIcon ? (
                  options.tabBarIcon({ ref })
                ) : (
                  <Text>?</Text>
                )}
              </View>
            </Pressable>
            // <View
            //   key={route?.key}
            //   style={{ width: 60, height: 60, backgroundColor: "#ffffff00" }}
            // >
            //   {index === 0 && <Text style={{ color: "white" }}> Hi</Text>}
            // </View>
          );
        })}
      </View>
    </View>
  );
};

const TabNavigation = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />}>
          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: ({ ref }) => (
                <LottieView
                  ref={ref}
                  loop={false}
                  source={require("../assets/lottie/home.icon.json")}
                  style={styles.icon}
                />
              ),
            }}
            component={Home}
          />
          <Tab.Screen
            name="Chat"
            options={{
              tabBarIcon: ({ ref }) => (
                <LottieView
                  ref={ref}
                  loop={false}
                  source={require("../assets/lottie/chat.icon.json")}
                  style={styles.icon}
                />
              ),
            }}
            component={AI}
          />
          <Tab.Screen
            name="Settings"
            options={{
              tabBarIcon: ({ ref }) => (
                <LottieView
                  ref={ref}
                  loop={false}
                  source={require("../assets/lottie/settings.icon.json")}
                  style={styles.icon}
                />
              ),
            }}
            component={Profile}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
  },
  activeBackground: {
    position: "absolute",
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  component: {
    height: 60,
    width: 60,
    top: 0,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "white",
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 36,
    width: 36,
  },
});

export default TabNavigation;
