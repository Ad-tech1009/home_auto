import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import axios from "axios";

const ESP_IP = "http://192.168.17.226"; // Ensure 'http://' is included

const App = () => {
  const [relay1On, setRelay1On] = useState(false);
  const [relay2On, setRelay2On] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const toggleRelay = async (relay) => {
    if ((relay === 1 && loading1) || (relay === 2 && loading2)) return;

    if (relay === 1) setLoading1(true);
    if (relay === 2) setLoading2(true);

    try {
      const newState = relay === 1 ? !relay1On : !relay2On;
      const endpoint = `/relay${relay}/${newState ? "on" : "off"}`;

      await axios.get(`${ESP_IP}${endpoint}`, { timeout: 10000 });

      if (relay === 1) setRelay1On(newState);
      else setRelay2On(newState);
    } catch (error) {
      Alert.alert("Error", `Failed to toggle Relay ${relay}`);
      console.error(`Error toggling Relay ${relay}:`, error);
    } finally {
      if (relay === 1) setLoading1(false);
      if (relay === 2) setLoading2(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ESP32 Relay Control</Text>

      <View style={styles.relayContainer}>
        <Text style={styles.relayLabel}>Relay 1</Text>
        <TouchableOpacity
          style={[styles.button, relay1On ? styles.buttonOn : styles.buttonOff]}
          onPress={() => toggleRelay(1)}
          disabled={loading1}
        >
          {loading1 ? <ActivityIndicator color="white" /> : (
            <Text style={styles.buttonText}>
              {relay1On ? "Turn OFF" : "Turn ON"}
            </Text>
          )}
        </TouchableOpacity>
        <View style={[styles.statusIndicator, relay1On ? styles.statusOn : styles.statusOff]} />
      </View>

      <View style={styles.relayContainer}>
        <Text style={styles.relayLabel}>Relay 2</Text>
        <TouchableOpacity
          style={[styles.button, relay2On ? styles.buttonOn : styles.buttonOff]}
          onPress={() => toggleRelay(2)}
          disabled={loading2}
        >
          {loading2 ? <ActivityIndicator color="white" /> : (
            <Text style={styles.buttonText}>
              {relay2On ? "Turn OFF" : "Turn ON"}
            </Text>
          )}
        </TouchableOpacity>
        <View style={[styles.statusIndicator, relay2On ? styles.statusOn : styles.statusOff]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  title: { fontSize: 26, color: "#FFF", fontWeight: "bold", marginBottom: 30 },
  relayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#1E1E1E",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  relayLabel: { fontSize: 18, color: "#FFF", fontWeight: "bold" },
  button: { padding: 12, borderRadius: 8, minWidth: 100, alignItems: "center" },
  buttonOn: { backgroundColor: "#4CAF50" },
  buttonOff: { backgroundColor: "#D32F2F" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  statusIndicator: { width: 20, height: 20, borderRadius: 10, marginLeft: 10 },
  statusOn: { backgroundColor: "#4CAF50" },
  statusOff: { backgroundColor: "#D32F2F" },
});

export default App;
