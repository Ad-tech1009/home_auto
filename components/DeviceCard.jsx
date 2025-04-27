import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import globalStyles from '../styles/globalStyles';

const DeviceCard = ({ darkMode, label, isOn, toggleFn, loading, children }) => (
  <View style={[globalStyles(darkMode).deviceCard, { backgroundColor: darkMode ? '#333' : '#fff' }]}>
    <Text style={globalStyles(darkMode).deviceLabel}>{label}</Text>

    {children}

    <TouchableOpacity
      style={[
        globalStyles(darkMode).toggleButton,
        isOn ? globalStyles(darkMode).toggleOn : globalStyles(darkMode).toggleOff,
      ]}
      onPress={toggleFn}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={globalStyles(darkMode).toggleButtonText}>
          {isOn ? 'On' : 'Off'}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

export default DeviceCard;
