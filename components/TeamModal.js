import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';

function TeamModal({ isVisible, teamData, onDismiss}) {
    console.log(JSON.stringify(teamData, null, 2));
    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.modalWrapper}>
                <Card>
                    <Card.Title>{teamData.name}</Card.Title>
                    <Card.Divider />
                    <Card.Image source={{uri: teamData.logo}} />
                    <Text style={{textAlign: "center"}}>
                        {teamData?.players?.length} players
                    </Text>
                    <Text style={{textAlign: "center"}}>
                        Status: {String(teamData?.status)}
                    </Text>
                    <Button title="Dismiss" icon={{name: "close-circle-outline", type: "ionicon", color: "white"}} onPress={() => onDismiss()}/>
                </Card>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: "#ccc",
    justifyContent: "center",
  },
});
  

export default TeamModal;