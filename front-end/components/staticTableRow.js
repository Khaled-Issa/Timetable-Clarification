import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const staticTableRow = (props) => {
    return ( 
        <View style={styles.row}>
            <Text style={styles.cell}>Day</Text>
            <Text style={styles.cell}>Start Time</Text>
            <Text style={styles.cell}>End Time</Text>
            <Text style={styles.cell}>Subject</Text>
        </View>
     );
}

const styles=StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 5,
        borderBottomColor: '#ff9f43',
        borderBottomWidth: 1,
    },
    cell: {
        color: '#f1f2f6',
    }
})
 
export default staticTableRow;