import React from "react";
import { View, Dimensions, TextInput } from "react-native";
const { width } = Dimensions.get("window");

const AddNote = props => (
  <View
    style={{
      backgroundColor: "rgb(229,229,234)",
      paddingVertical: 12.5,
      marginTop: 12.5 / 2,
      marginBottom: 12.5 / 2,
      alignSelf: "center",
      flexDirection: "row",

      borderRadius: 6,
      width: width - 30
    }}
  >
    <TextInput
      blurOnSubmit
      placeholder={"Add Your note..."}
      multiline
      ref={input => (this.input = input)}
      underlineColorAndroid={"rgba(0,0,0,0)"}
      style={{
        padding: 0,
        backgroundColor: "rgba(0,0,0,0.0)",
        paddingHorizontal: 12.5,
        paddingLeft: 12.5,
        height: 18,
        paddingTop: 0,
        textAlignVertical: "top",
        width: width - 40,
        borderRadius: 6,
        textAlign: "left",
        fontSize: 15,
        fontWeight: "400",
        color: "rgb(20,20,20)"
      }}
      onSubmitEditing={e => {
        props.addNote({
          value: e.nativeEvent.text,
          id: Date.now()
        });
        this.input.setNativeProps({
          text: "",
          height: 18
        });
      }}
      onContentSizeChange={evt => {
        if (evt.nativeEvent.contentSize.height) {
          this.input.setNativeProps({
            height: evt.nativeEvent.contentSize.height
          });
        }
      }}
      returnKeyType={"done"}
    />
  </View>
);

export default AddNote;
