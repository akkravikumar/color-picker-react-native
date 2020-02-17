import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Dimensions,
  Animated,
} from 'react-native';
import Svg, {G} from 'react-native-svg';
import Slice from './component/Slice';

let dataDrag = [1, 2, 3, 4];
let pan = dataDrag.map(() => new Animated.ValueXY());
const circleColor = ['#e8a062', '#5557b1', '#682887', '#87284b'];
const data = [
  {
    label: 'C1',
    name: 'T1',
    number: 20,
    color: '#ECECEC',
  },
  {
    label: 'C2',
    name: 'T1',
    number: 20,
    color: '#ECECEC',
  },
  {
    label: 'C3',
    number: 20,
    color: '#ECECEC',
  },
  {
    label: 'C4',
    number: 20,
    color: '#ECECEC',
  },
];
export default function ColorComponent() {
  const [demoData, setDemoData] = useState(data);
  const [animValue, setAnimValue] = useState(new Animated.Value(0.1));
  const [dropZoneIndex, setDropZoneIndex] = useState([]);

  const panGesture = (pan, index) => {
    return React.useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: Animated.event([
            null,
            {
              dx: pan.current.x,
              dy: pan.current.y,
            },
          ]),
          onPanResponderRelease: (e, gesture) => {
            isDropArea(gesture, index);
            Animated.spring(pan.current, {
              toValue: {x: 0, y: 0},
              friction: 5,
            }).start();
          },
        }),
      [],
    );
  };

  useEffect(() => {
    animValue.setValue({x: 0, y: 0});
  });

  const isDropArea = (gesture, ind = 0) => {
    let updatedData = demoData;
    let colorName = circleColor[ind - 1];
    dropZoneIndex.forEach((obj, i) => {
      if (
        gesture.moveX > obj.x &&
        gesture.moveX < obj.x + obj.width &&
        gesture.moveY > obj.y &&
        gesture.moveY < obj.y + obj.height
      ) {
        updatedData[i].color = colorName;
        let newArr = [...updatedData];
        setDemoData(newArr);
      }
    });
    return true;
  };

  const getValues = sizes => {
    let dropZoneIndex1 = dropZoneIndex;
    dropZoneIndex1[sizes.index] = sizes.objectVal;
    setDropZoneIndex(dropZoneIndex1);
  };

  let endAngle = Animated.multiply(animValue, Math.PI);
  return (
    <View style={styles.container}>
      <Svg
        width={200}
        style={styles.pieSVG}
        height={200}
        viewBox={`-100 -100 200 200`}>
        {demoData.map((item, index) => (
          <Slice
            index={index}
            endAngle={endAngle}
            color={item.color}
            getValues={getValues}
            data={demoData}
            key={'pie_shape_' + index}
          />
        ))}
      </Svg>
      <View style={{flexDirection: 'row', paddingTop: 60}}>
        {circleColor.map((item, index) => {
          const pan = useRef(new Animated.ValueXY());
          const panStyle = {
            transform: pan.current.getTranslateTransform(),
          };
          return (
            <View key={index}>
              <Animated.View
                {...panGesture(pan, index + 1).panHandlers}
                style={[
                  panStyle,
                  styles.CircleShapeViewCommon,
                  {backgroundColor: circleColor[index]},
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

ColorComponent.navigationOptions = {
  header: null,
};

let Window = Dimensions.get('window');
let CIRCLE_RADIUS = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  CircleShapeViewCommon: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
  },
  pieSVG: {
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
  },
  dropZone: {
    height: 100,
    backgroundColor: '#2c3e50',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
  },
  draggableContainer: {
    position: 'absolute',
    top: Window.height / 2 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS,
  },
  circle: {
    backgroundColor: '#1abc9c',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});
