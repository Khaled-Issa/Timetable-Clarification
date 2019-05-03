import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';

class About extends Component {

    static navigationOptions = {
        title: 'About',
        headerTitleStyle: {
            color: '#f1f2f6',
          },
          headerStyle: {
            backgroundColor: '#34495e'
          },
          headerTintColor: '#f1f2f6'
      };

    render() {
        return(
            <View style={{flex:1, backgroundColor:'#222f3e'}}>
                <View style={Styles.container}>
                    <Text style={Styles.header}>Team ElSekka ElHadeed</Text>
                    <Text style={Styles.member}>Ahmed Wael</Text>
                    <Text style={Styles.member}>Khaled Issa</Text>
                    <Text style={Styles.member}>Youssef Adel</Text>
                    <Text style={Styles.member}>Maged Mabrouk</Text>
                    <Text style={Styles.member}>Osama Hafez</Text>             
                </View>
            </View>
        );
    }

}
export default About;

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'flex-start',
        marginTop: 10
      },
      header: {
        fontSize: 26,
        color: '#2980b9',
        marginBottom: 20
      },
      member: {
        fontSize: 20,
        color: '#f1f2f6',
        marginBottom: 10
      }
});