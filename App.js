import React, { Component } from 'react';
import Svg, {G} from 'react-native-svg';
import {
    Animated,
    StyleSheet,
    View,
    Easing,
    Button,
    PanResponder,
    Dimensions
} from 'react-native';
import Slice from "./components/Slice";

const AnimatedSlice = Animated.createAnimatedComponent(Slice);

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        let data = [
            {
              label:'C1',
              name:"T1",
              number: 20,
              color: '#ECECEC'
            },
            {
                label:'C2',
                name:"T1",
                number: 20,
                color: '#ECECEC'
            },
            {
                label:'C3',
                number: 20,
                color: '#ECECEC'
            },
            {
                label:'C4',
                number: 20,
                color: '#ECECEC'
             }
        ];
        this.dataDrag = [1,2,3,4];
        this.pan = this.dataDrag.map( () => new Animated.ValueXY() );
        this.state = {
            demoData: data,
            animValue: new Animated.Value(0.1),
            pan1             : new Animated.ValueXY(),
            pan2             : new Animated.ValueXY(),
            pan3             : new Animated.ValueXY(),
            pan4             : new Animated.ValueXY(),
            dropZoneValues  : null,
            dropZoneIndex   : []
        };
        this._val = { x:0, y:0 }
        this.panResponder1 = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder : () => true,
            onPanResponderMove: Animated.event([null,{ //Step 3
                dx : this.state.pan1.x,
                dy : this.state.pan1.y
            }]),
            onPanResponderRelease        : (e, gesture) => {} //Step 4
        });
        this.panResponder2 = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder : () => true,
            onPanResponderMove: Animated.event([null,{ //Step 3
                dx : this.state.pan2.x,
                dy : this.state.pan2.y
            }]),
            onPanResponderRelease        : (e, gesture) => {} //Step 4
        });
        this.panResponder3 = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder : () => true,
            onPanResponderMove: Animated.event([null,{ //Step 3
                dx : this.state.pan3.x,
                dy : this.state.pan3.y
            }]),
            onPanResponderRelease        : (e, gesture) => {} //Step 4
        });
        this.panResponder4 = PanResponder.create({    //Step 2
            onStartShouldSetPanResponder : () => true,
            onPanResponderMove: Animated.event([null,{ //Step 3
                dx : this.state.pan4.x,
                dy : this.state.pan4.y
            }]),
            onPanResponderRelease        : (e, gesture) => {} //Step 4
        });
    }

    isDropArea(gesture, ind = 0){
        let droppedSlot = this.state.dropZoneIndex;
        let droppedindex = -1 ;
        let data = this.state.demoData;
        let d = this.state.dropZoneIndex;
        
        console.log('========w', gesture.moveX, '=',gesture.moveY, ' = ', ind)
        console.log('========d', d)
        
        this.state.dropZoneIndex.forEach((obj,i) =>{
            if((gesture.moveX > obj.x && gesture.moveX < (obj.x + obj.width)) && 
                (gesture.moveY > obj.y && gesture.moveY < (obj.y + obj.height))){
                if(ind === 1) {
                    console.log('========i', i)
                    data[i].color = '#e8a062';
                    this.setState({demoData: data});
                } if(ind === 2) {
                    console.log('========i', i)
                    data[i].color = '#5557b1';
                    this.setState({demoData: data});
                } else if(ind === 3) {
                    console.log('========i', i)
                    data[i].color = '#682887';
                    this.setState({demoData: data});
                } else if(ind === 4) {
                    console.log('========i', i)
                    data[i].color = '#87284b';
                    this.setState({demoData: data});
                }
            }
        });
        
        // if((gesture.moveX > (d.x+80) && gesture.moveX < (d.x+80+95)) &&
        // ((gesture.moveY < d.y+179) && gesture.moveY > (d.y+179+100))) {
        //     data[0].color = '#e8a062';
        //     this.setState({demoData: data});
        // }
        // else if((gesture.moveX > (d.x+80) && gesture.moveX < (d.x+80+113)) && 
        // ((gesture.moveY < d.y+179) && gesture.moveY > (d.y+70+110))) {
        //     data[1].color = '#e8a062';
        //     this.setState({demoData: data});
        // } else if((gesture.moveX > (d.x+80) && gesture.moveX < (d.x+80+116)) && 
        // ((gesture.moveY < d.y+179) && gesture.moveY > (d.y+100+119))) {
        //     data[2].color = '#e8a062';
        //     this.setState({demoData: data});
        // }

        // this.state.dropZoneIndex.forEach((obj,i) =>{
        //     console.log('=======',obj);
        //     if((gesture.moveX > (obj.x+80) && gesture.moveX < (obj.x+80+95)) &&
        //         ((gesture.moveY < obj.y+179) && gesture.moveY > (obj.y+179+100))) {
        //         data[0].color = '#e8a062';
        //         this.setState({demoData: data});
        //     }         
        // })
        // console.log("dropped index is::",droppedindex);

        
       // console.log('=======', gesture.moveX, gesture.moveY);
        // let droppedSlot = this.state.dropZoneIndex.forEach(obj =>{

        // })
        return true;
        // var dz = this.state.dropZoneIndex;
        // return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    componentWillMount() {
        this.panResponder1 = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
              null, { dx: this.state.pan1.x, dy: this.state.pan1.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
                this.isDropArea(gesture, 1);
              console.log('=======',gesture.moveX);
              console.log('=======',gesture.moveY);
              Animated.spring(this.state.pan1, {
                toValue: { x: 0, y: 0 },
                friction: 5
              }).start();
            }
            // adjusting delta value
          });
          
          this.panResponder2 = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
              null, { dx: this.state.pan2.x, dy: this.state.pan2.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
              this.isDropArea(gesture, 2);
              console.log('=======',gesture.moveX);
              console.log('=======',gesture.moveY);
              Animated.spring(this.state.pan2, {
                toValue: { x: 0, y: 0 },
                friction: 5
              }).start();
            }
            // adjusting delta value
          });

          this.panResponder3 = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
              null, { dx: this.state.pan3.x, dy: this.state.pan3.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
                this.isDropArea(gesture, 3);
              console.log('=======',gesture.moveX);
              console.log('=======',gesture.moveY);
              Animated.spring(this.state.pan3, {
                toValue: { x: 0, y: 0 },
                friction: 5
              }).start();
            }
            // adjusting delta value
          });

          this.panResponder4 = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
              null, { dx: this.state.pan4.x, dy: this.state.pan4.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
            this.isDropArea(gesture, 4);
              console.log('=======',gesture.moveX);
              console.log('=======',gesture.moveY);
              Animated.spring(this.state.pan4, {
                toValue: { x: 0, y: 0 },
                friction: 5
              }).start();
            }
            // adjusting delta value
          });
        this.state.animValue.setValue({ x:0, y:0})
    }

    resetPie = ()=>{
        this.state.animValue.setValue(0.1);
    };

    animate = ()=>{
        Animated.timing(
            this.state.animValue,
            {
                toValue: 2,
                duration: 500,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            setTimeout(this.resetPie, 2000);
        });
    };

    getValues =(sizes)=> {
        let dropZoneIndex = this.state.dropZoneIndex;
        dropZoneIndex[sizes.index]=sizes.objectVal;
        this.setState({dropZoneIndex});
    }

    render() {
        const panStyle1 = {
            transform: this.state.pan1.getTranslateTransform()
          }
          const panStyle2 = {
            transform: this.state.pan2.getTranslateTransform()
          }
          const panStyle3 = {
            transform: this.state.pan3.getTranslateTransform()
          }
          const panStyle4 = {
            transform: this.state.pan4.getTranslateTransform()
          }
          
        let endAngle = Animated.multiply(this.state.animValue, Math.PI);
        return (
            <View style={styles.container}>
                <Svg
                    width={200}
                    style={styles.pieSVG}
                    height={200}
                    viewBox={`-100 -100 200 200`}>
                    {
                        this.state.demoData.map( (item, index) =>
                            <Slice
                                index={index}
                                endAngle={endAngle}
                                color={item.color}
                                getValues= {this.getValues}
                                data={this.state.demoData}
                                key={'pie_shape_' + index}
                            />
                        )
                    }
                </Svg>            
                <View style={{ flexDirection: 'row',paddingTop:60}}>                    
                    <View>
                        <Animated.View
                        {...this.panResponder1.panHandlers}
                        style={[panStyle1, styles.CircleShapeView1]}
                        />
                    </View>
                    <View>
                    <Animated.View
                        {...this.panResponder2.panHandlers}
                        style={[panStyle2, styles.CircleShapeView2]}
                        /></View>
                    <View >
                    <Animated.View
                        {...this.panResponder3.panHandlers}
                        style={[panStyle3, styles.CircleShapeView3]}
                        /></View>
                    <View >
                    <Animated.View
                        {...this.panResponder4.panHandlers}
                        style={[panStyle4, styles.CircleShapeView4]}
                        /></View>
                </View>

                {/* <View style={{ flexDirection: 'row',paddingTop:60}}>
                    <Button title="Undo" />
                    <Button title="Revert" />
                </View> */}
            </View>
        );
    }
}
let Window = Dimensions.get('window');
let CIRCLE_RADIUS = 36;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    CircleShapeView1: {
        width: 50,
        height: 50,
        borderRadius: 150/2,
        backgroundColor: '#e8a062'
    },
    CircleShapeView2: {
        width: 50,
        height: 50,
        borderRadius: 150/2,
        backgroundColor: '#5557b1'
    },
    CircleShapeView3: {
        width: 50,
        height: 50,
        borderRadius: 150/2,
        backgroundColor: '#682887'
    },
    CircleShapeView4: {
        width: 50,
        height: 50,
        borderRadius: 150/2,
        backgroundColor: '#87284b'
    }
    ,
    pieSVG: {
        // shadowColor: "rgba(59, 74, 116, 0.35)",
        // shadowOffset: {
        //     width: 0,
        //     height: 32
        // },
        backgroundColor: 'transparent',
        // elevation: 12,
        // shadowRadius: 12.5,
        // shadowOpacity: 1,
    },
    row: {
        flexDirection: "row"
      },
      mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height  : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});