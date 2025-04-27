import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';

const TopBar = ({ darkMode, setDarkMode }) => {
  return (
    <View style={globalStyles(darkMode).topBar}>
      <Text style={globalStyles(darkMode).temp}>25°</Text>
      <Text style={globalStyles(darkMode).appTitle}>Auto-mate</Text>
      <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
        <Text style={{ color: darkMode ? '#fff' : '#000', fontSize: 14 }}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
