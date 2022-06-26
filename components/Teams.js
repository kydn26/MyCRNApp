import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

function Teams({data, onSelectTeam}) {
    return (
        <View>
            {data.map((item) => (
            <ListItem key={item.id} bottomDivider onPress={() => onSelectTeam(item)}>
                <Avatar source={{uri: item.logo}} rounded />
                <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>
                    <View style={[styles.statusIndicator, item.status? styles.active: styles.inactive]} />
                </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
  statusIndicator: {
    width: 60,
    height: 12
  },
  active: {
    backgroundColor: "green",
  },
  inactive: {
    backgroundColor: "gray",
  }
});

export default Teams;