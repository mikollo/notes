import "react-native";
import React from "react";
import App from "../src/App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<App />);
});

const test = new App();

it("adds note", () => {
  expect(test.addNote({ notes: [] }, { value: "add", id: 1 })).toEqual({
    notes: [{ value: "add", id: 1 }]
  });
});

it("removes note", () => {
  expect(
    test.removeNote(
      {
        notes: [{ value: "add", id: 1 }]
      },
      1
    )
  ).toEqual({
    notes: []
  });
});

it("likes note", () => {
  expect(
    test.likeNote(
      {
        likedNotes: [2]
      },
      1
    )
  ).toEqual({
    likedNotes: [1, 2]
  });
});

it("unlikes note", () => {
  expect(
    test.likeNote(
      {
        likedNotes: [2, 1]
      },
      1
    )
  ).toEqual({
    likedNotes: [2]
  });
});
