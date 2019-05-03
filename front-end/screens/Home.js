import React from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import { ImagePicker } from 'expo';
import axios from 'axios';

export default class Home extends React.Component {
  
  static navigationOptions = {
    title: 'Home',
    headerTitleStyle: {
        color: '#f1f2f6',
       /* this only styles the title/text (font, color etc.)  */
      },
      headerStyle: {
        backgroundColor: '#34495e'
       /* this will style the header, but does NOT change the text */
      },
      headerTintColor: {
        color: '#f1f2f6'
        /* this will color your back and forward arrows or left and right icons */
      }
  };
  
  state = {
    image: null,
    imageBase64: null,
    uploadBtnTitle: 'Upload Schedule',
    proceedBtnEnable: false,
    schedule: null
  };

  imageLoadedHandler = () => {
    uploadBtnTitle_new = 'Upload Another Schedule';
    this.setState({uploadBtnTitle: uploadBtnTitle_new, proceedBtnEnable:true});

    // send base64 as a post request to backend
    // if(this.state.imageBase64) {
    //   const imgBase64 = this.state.imageBase64;
    //   //console.log(imgBase64);
    //   axios({
    //     method: 'post',
    //     url: 'https://timetable-clarification.herokuapp.com/output/',
    //     data: {
    //       img: imgBase64
    //     },
    //   })
    //   .then((response) => {
    //     console.log(JSON.stringify(response))
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }

  }

  processScheduleHandler = () => {
    
    console.log('Process Pressed');

    if(this.state.imageBase64) {
      const imgBase64 = this.state.imageBase64;
      //console.log(imgBase64);

      axios.post('https://timetable-clarification.herokuapp.com/output/', {
        img: imgBase64 
      })
      .then((response) => {
        console.log('Response:');
        //console.log(response.data);
        const schedule = JSON.stringify(response.data);
        const parsedschedule = JSON.parse(schedule);
        // console.log(parsedschedule);
        // console.log(parsedschedule[2].day, parsedschedule[2].time[0], parsedschedule[3].time[1], parsedschedule[1].place, parsedschedule[2].subject);
        this.props.navigation.navigate('Alarm', parsedschedule);
      })
      .catch((error) => {
        console.log('error:');
        console.log(error);
      });
    }


    //assume the result of processing 
    // const schedule = 
    //   [
    //     {
    //       day : "monday",
    //       time: ["9:20","13:40"],
    //       subject : "math",
    //       place : "room c",
    //       teacher: "ahmed"
    //       },
    //       {
    //       day : "wendesday",
    //       time: ["9:20","10:40"],
    //       subject : "none",
    //       place : "none",
    //       teacher: "none"
    //       },
    //       {
    //       day : "saturday",
    //       time: ["12:30","14:40"],
    //       subject : "Mechanics",
    //       place : "Hall 3",
    //       teacher: "Banna"
    //       },
    //       {
    //       day : "saturday",
    //       time: ["15:00","16:40"],
    //       subject : "circuits",
    //       place : "306c",
    //       teacher: "Bassem"
    //       },
    //       {
    //       day : "saturday",
    //       time: ["10:30","12:20"],
    //       subject : "electronics",
    //       place : "Hall 1",
    //       teacher: "Mark"
    //       },
    //       {
    //       day : "saturday",
    //       time: ["16:45","18:30"],
    //       subject : "Arch",
    //       place : "Hall B",
    //       teacher: "Yasser"
    //       },
    //       {
    //       day : "tuesday",
    //       time: ["12:30","14:40"],
    //       subject : "Chem",
    //       place : "Hall D",
    //       teacher: "Kamal"
    //       },
    //   ]
    // // console.log('BASE64---------------------------------------');
    // // console.log(this.state.imageBase64);
    // // console.log('BASE64---------------------------------------');
    // this.props.navigation.navigate('Alarm', schedule); 
  }

  teamPressedHandler = () => {
    this.props.navigation.navigate('About');
  }

  render() {
    let { image } = this.state;
    
    let proceedBtn = null

    if(this.state.proceedBtnEnable) {
      proceedBtn = <Button
                  style={styles.uploadBtn}
                  title='Process Schedule'
                  onPress={this.processScheduleHandler}
                  color='#4cd137'
                  />
    }

    return (
        <View style={{flex:1, backgroundColor:'#222f3e'}}>
            <View style={styles.container}>
            <Text style={styles.header}>Schedule Reader</Text>
            <Text style={styles.madeBy}>Made By <Text style={styles.teamName} onPress={this.teamPressedHandler}>ElSekka ElHadeed</Text></Text>
            <View style={styles.btnWrapper}>
                <Button
                style={styles.uploadBtn}
                title={this.state.uploadBtnTitle}
                onPress={this._pickImage}
                color='#ff9f43'
                />
            </View>
            {image &&
                <Image source={{ uri: image }} style={{ width: 300, height: 300, marginBottom:20 }} onLoad={this.imageLoadedHandler} />}
            
            <View style={styles.btn2Wrapper}>
                {proceedBtn}
            </View>
            </View>
        </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      //aspect: [1,1],
    });

    //console.log(result.base64);

    if (!result.cancelled) {
      this.setState({ image: result.uri, imageBase64: result.base64 });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'flex-start',
    marginTop: 10
  },
  header: {
    fontSize: 26,
    // fontFamily: 'sans-serif',
    color: '#f1f2f6'
  },
  btnWrapper: {
    width: '98%',
    marginBottom: 30
  },
  btn2Wrapper: {
    width: '50%',
  },
  madeBy: {
    marginBottom: 25,
    fontSize: 14,
    color: '#f1f2f6',
  },
  teamName: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    color: '#2980b9'
  }
});