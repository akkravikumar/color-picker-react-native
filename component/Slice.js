import React, {Component, useState, useRef} from 'react';
import {Path, Text} from 'react-native-svg';
import {
  LongPressGestureHandler,
  ScrollView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import * as shape from 'd3-shape';
const d3 = {shape};

export default function Slide(props) {
  const [dropZoneValues, setDropZoneValues] = useState(null);
  const arcGenerator = d3.shape
    .arc()
    .outerRadius(100)
    .padAngle(0)
    .innerRadius(0)
    .padAngle(0.02)
    .padRadius(100)
    .cornerRadius(4);

  const createPieSlice = (index, endAngle, data) => {
    const arcs = d3.shape
      .pie()
      .value(item => item.number)
      .startAngle(0)
      .endAngle(40)(data);
    let arcData = arcs[index];
    return arcGenerator(arcData);
  };

  const _onSingleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      Alert.alert("I'm touched");
    }
  };

  const setDropZoneValues1 = event => {
    setDropZoneValues(event.nativeEvent.layout)    
    let index = props.index;
    let objectVal = event.nativeEvent.layout;
    props.getValues({index, objectVal});
  };

  const {endAngle, color, index, data, getValues} = props;
  return (
    <Path
      onLayout={setDropZoneValues1.bind(this)}
      d={createPieSlice(index, endAngle, data)}
      fill={color}
    />
  );
}
