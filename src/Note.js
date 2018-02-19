import React, { Component } from "react";
import { View, Text, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default class Note extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);
  }

  throttle = false;
  distance = 50
  render() {
    return (
      <Animated.ScrollView
        ref={scrollView => (this.scrollView = scrollView)}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.animatedValue } } }],
          {
            useNativeDriver: true,
            listener: event => {
              if (event.nativeEvent.contentOffset.x > -5) {
                this.throttle = false;
              }

              if (event.nativeEvent.contentOffset.x === width) {
                this.props.removeNote(this.props.children.id);
              }
              if (
                event.nativeEvent.contentOffset.x < -(width / 10) &&
                this.throttle === false
              ) {
                this.props.likeNote(this.props.children.id);
                this.throttle = true;
              }
            }
          }
        )}
        scrollEventThrottle={1}
        horizontal
        pagingEnabled
        style={{
          width,
          flexDirection: "row",
          height: 0,
          backgroundColor: "white"
        }}
      >
        <Animated.View

          style={{
            transform: [
              {
                scaleX: this.animatedValue.interpolate({
                  inputRange: [-width, 0, width],
                  outputRange: [0.75, 1, 0.75],
                  extrapolate: "clamp"
                })
              },
              {
                scaleY: this.animatedValue.interpolate({
                  inputRange: [-width, 0, width],
                  outputRange: [0.75, 1, 0.75],
                  extrapolate: "clamp"
                })
              }
            ],
            backgroundColor: this.props.liked
              ? "rgb(0,155,255)"
              : "rgb(229,229,234)",
            width: width - 30,

            borderRadius: 6,
            marginHorizontal: 15,

            marginVertical: 7.5
          }}
        >
          <Text
            onLayout={evt =>
              this.scrollView.setNativeProps({
                height: evt.nativeEvent.layout.height + 40
              })
            }
            style={{
              fontSize: 15,
              margin: 12.5,
              color: this.props.liked ? "white" : "black"
            }}
          >
            {this.props.children.value}
          </Text>
        </Animated.View>

        <View style={{ width, height: 200, backgroundColor: "white" }} />
      </Animated.ScrollView >
    );
  }
}
