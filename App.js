import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Vibration, View } from "react-native";

import { Button } from "react-native-elements";
import NetInfo from "@react-native-community/netinfo";

import TeamModal from "./components/TeamModal";
import Teams from "./components/Teams";

const teamData = [
  {
    id: 1,
    name: "Team 1",
    logo: "https://static-abcblogs.abc.es/wp-content/uploads/sites/66/2017/08/nacho-516x315.jpg",
    status: true,
    players: [{ name: "Hugh" }, { name: "David" }],
  },
  {
    id: 2,
    name: "Team 2",
    logo: "https://via.placeholder.com/200x300",
    status: false,
    players: [{ name: "Sarah" }],
  },
  {
    id: 3,
    name: "Team 3",
    logo: "https://via.placeholder.com/200x300",
    status: true,
    players: [{ name: "Luis" }, { name: "Danna" }],
  },
  {
    id: 4,
    name: "Team 4",
    logo: "https://via.placeholder.com/200x300",
    status: true,
    players: [{ name: "Leyla" }, { name: "Moira" }, { name: "Lana" }],
  },
];

export default function App() {
  const [name, setName] = useState("");
  const [teams, setTeams] = useState(teamData);
  const [selectedTeam, setSelectedTeam] = useState({
    isVisible: false,
    team: {},
    offline: true
  });

  const onSelectTeam = (data) => {
    setSelectedTeam({
      ...selectedTeam,
      isVisible: true,
      team: data,
    })
  }

  const displayNetworkInfo = () => {
    NetInfo.fetch().then(state => {
      Alert.alert(`Connection type: ${state.type}, Is Connected: ${state.isConnected}`);
    });
  }

  const saveData = () => {
    NetInfo.refresh().then(state => {
      if (state.isConnected) {
        Alert.alert("Data sent");
      } else {
        Alert.alert("Verify your internet connection");
      }
  });
  }

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {

      setSelectedTeam({
        ...selectedTeam,
        offline: !state.isConnected
      })

      if(state.isConnected) {
        Alert.alert("Connected to internet");
      } else {
        Alert.alert("Device disconnected to internet");
      }
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  const onToggleTeamModal = () => {
    Vibration.vibrate(1000, 2000, 3000);
    setSelectedTeam({
      ...selectedTeam,
      isVisible: !selectedTeam.isVisible
    })
  }

  return (
    <View style={{marginTop: 24, backgroundColor: "red"}}>
      <Teams data={teams} onSelectTeam={onSelectTeam} />
      <TeamModal isVisible={selectedTeam.isVisible} teamData={selectedTeam.team} onDismiss={onToggleTeamModal} />
      <Button 
        style={{marginTop: 20}}
        icon={{name: "ios-wifi", type: "ionicon", color: "white"}}
        backgroundColor="#4caf50"
        title="Show network info"
        onPress={() => displayNetworkInfo()}
      />
      <Button 
        style={{marginTop: 20}}
        icon={{name: "ios-send", type: "ionicon", color: "white"}}
        backgroundColor="#17a2b8"
        title="Send Data"
        onPress={() => saveData()}
        disabled={selectedTeam.offline}
      />
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
