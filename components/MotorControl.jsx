import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../styles/globalStyles';

const MotorControl = ({ darkMode, waterLevel }) => {
  const getWaterLevelColor = () => {
    if (waterLevel < 30) return '#e74c3c'; // Red
    if (waterLevel < 70) return '#f1c40f'; // Yellow
    return '#2ecc71'; // Green
  };
  return (
    <View style={{ width: '100%', marginBottom: 10 }}>
      <View
        style={{
          width: '100%',
          height: 20,
          borderRadius: 8,
          backgroundColor: '#eee',
          overflow: 'hidden',
        }}>
        <View
          style={{
            height: '100%',
            width: `${waterLevel * 20}%`,
            backgroundColor: getWaterLevelColor(waterLevel),
          }}
        />
      </View>
      <Text
        style={{
          color: darkMode ? '#fff' : '#333',
          marginTop: 5,
          textAlign: 'center',
        }}>
        Level: {waterLevel}
      </Text>
    </View>
  );
};

export default MotorControl;
