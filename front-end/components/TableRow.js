import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const tableRow = (props) => {

    let cellColor = props.highLight ? '#4cd137':'#f1f2f6';
    return ( 
        <View style={styles.row}>
            <Text style={{color: cellColor}}>{props.day}</Text>
            <Text style={{color: cellColor}}>{props.startTime}</Text>
            <Text style={{color: cellColor}}>{props.endTime}</Text>
            <Text style={{color: cellColor}}>{props.subject}</Text>
        </View>
     );
}

const styles=StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 5
    },
})
 
export default tableRow;