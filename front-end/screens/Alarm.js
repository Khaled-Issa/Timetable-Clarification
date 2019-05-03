import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';
import TableRow from '../components/TableRow';
import StaticTableRow from '../components/staticTableRow';

class Alarm extends Component {

    static navigationOptions = {
        title: 'Notifier',
        headerTitleStyle: {
            color: '#f1f2f6',
          },
          headerStyle: {
            backgroundColor: '#34495e'
          },
          headerTintColor: '#f1f2f6'
      };

      state= {
        time: {
            day: moment().format('dddd'),
            hr: moment().format('HH'),
            min: moment().format('mm'),
        },
        
        fullTime: moment().format('LTS'),
      };

      intervalVar = '';

      componentDidMount() {
        this.intervalVar = setInterval(()=> {
            this.setState({
                fullTime: moment().format('LTS')
            })
        }, 1000);
      }

      componentWillUnmount() {
        clearInterval(this.intervalVar);
      }

    render() {        
        const schedule = this.props.navigation.state.params.map((cell, key) => {

            // check if lecture time has come so i can highlight it
            let highLight = false;
            let currentTime = moment();
            let beforeTime = moment(cell.time[0], 'hh:mm');
            let afterTime = moment(cell.time[1], 'hh:mm');
            if(cell.day.toLowerCase() == this.state.time.day.toLowerCase()) {
                if(currentTime.isBetween(beforeTime, afterTime)) {
                    highLight = true;
                }
            }

            // check if a scheule is empty so that we don't print it
            if(cell.subject == 'none') {
                return null;
            } 
            else {
                return(
                    <TableRow 
                    key={key}
                    day={cell.day} 
                    startTime={cell.time[0]} 
                    endTime={cell.time[1]}
                    subject={cell.subject}
                    place={cell.place} 
                    highLight={highLight} 
                    />
                );
            }
        }); 

        return(
            <View style={{flex:1, backgroundColor:'#222f3e'}}>
                <View style={Styles.container}>
                    <Text style={Styles.clock}>{this.state.time.day}</Text>
                    <Text style={Styles.clock}>{this.state.fullTime}</Text>
                </View>
                <ScrollView>
                    <StaticTableRow />
                    {schedule}       
                </ScrollView>
            </View>
        );
    }
}
export default Alarm;

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 20
      },
      clock: {
        color: '#ff9f43',
        fontSize: 40,
        // fontFamily: 'sans-serif',
      },
});