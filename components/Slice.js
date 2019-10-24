import React, {Component} from 'react';
import {Path , Text} from 'react-native-svg';
import {
  LongPressGestureHandler,
  ScrollView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import * as shape from 'd3-shape';
const d3 = {shape};

export default class Slice extends Component {
    constructor(props) {
        super(props);
        this.state = {dropZoneValues:null};
        this.doubleTapRef = React.createRef()
        this.arcGenerator = d3.shape.arc()
            .outerRadius(100)
            .padAngle(0)
            .innerRadius(0)
            .padAngle(.02)
            .padRadius(100)
            .cornerRadius(4);
    }

    createPieSlice = (index, endAngle, data) => {
        const arcs = d3.shape.pie()
            .value((item)=>item.number)
            .startAngle(0)
            .endAngle(40)
            (data);
        let arcData = arcs[index];
        return this.arcGenerator(arcData);
    };

    _onSingleTap = event => {
      if (event.nativeEvent.state === State.ACTIVE) {
        Alert.alert("I'm touched");
      }
    };

  setDropZoneValues(event){
      this.setState({
        dropZoneValues: event.nativeEvent.layout
      });
      let index = this.props.index;
      let objectVal = event.nativeEvent.layout;
      this.props.getValues({index, objectVal });
    }

    render() {

        const {
            endAngle,
            color,
            index,
            data,
            getValues
        } = this.props;
        let val = data[index].number;

        return (
            <Path onLayout={this.setDropZoneValues.bind(this)}
                d={this.createPieSlice(index, endAngle, data)}
                fill={color}
            />
        )

    }
}
