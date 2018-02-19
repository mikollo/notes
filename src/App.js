import React, { Component } from "react";
import {
  ScrollView,
  Text,
  UIManager,
  AsyncStorage,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";

import Note from "./Note.js";
import AddNote from "./AddNote.js";

class App extends Component {
  state = {
    notes: [],
    likedNotes: [],
    onlyShowLiked: false
  };

  onlyShowLiked = state => {
    return state.onlyShowLiked
      ? { onlyShowLiked: false }
      : { onlyShowLiked: true };
  };

  addNote = (state, note) => {
    return {
      notes: [note].concat(state.notes)
    };
  };

  removeNote = (state, id) => {
    return {
      notes: state.notes.filter(e => e.id !== id)
    };
  };

  likeNote = (state, id) => {
    if (state.likedNotes.includes(id)) {
      return {
        likedNotes: state.likedNotes.filter(e => e !== id)
      };
    }
    return {
      likedNotes: [id].concat(state.likedNotes)
    };
  };

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  async componentDidMount() {
    const state = await AsyncStorage.getItem("state");
    this.setState(JSON.parse(state));
  }

  componentDidUpdate() {
    AsyncStorage.setItem("state", JSON.stringify(this.state));
  }

  render() {
    return (
      <ScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ paddingVertical: 17.5 }}
      >
        <TouchableOpacity onPress={() => this.setState(this.onlyShowLiked)}>
          <Text
            style={{
              paddingVertical: 40,
              fontSize: 28,
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            {this.state.onlyShowLiked ? "SHOW ALL" : "SHOW LIKED ONLY"}
          </Text>
        </TouchableOpacity>
        <AddNote
          addNote={newNote =>
            this.setState(state => this.addNote(state, newNote))
          }
        />
        {this.state.notes.map(e => {
          const isLiked = this.state.likedNotes.includes(e.id);
          if (this.state.onlyShowLiked && isLiked === false) {
            return null;
          }
          return (
            <Note
              key={e.id}
              liked={isLiked}
              removeNote={id =>
                this.setState(state => this.removeNote(state, id))
              }
              likeNote={id => this.setState(state => this.likeNote(state, id))}
            >
              {e}
            </Note>
          );
        })}
      </ScrollView>
    );
  }
}

export default App;
