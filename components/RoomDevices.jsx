// components/RoomDevices.js
import React from 'react';
import { View } from 'react-native';
import DeviceCard from './DeviceCard';
import FanControl from './FanControl';
import MotorControl from './MotorControl';
import styles from '../styles/globalStyles';

const RoomDevices = ({
  darkMode,
  fanOn,
  motorOn,
  toggleDevice,
  loadingFan,
  loadingMotor,
  fanSpeed,
  setFanSpeed,
  showFanSlider,
  setShowFanSlider,
  updateFanSpeed,
  loadingFanSpeed,
  waterLevel,
}) => {
  return (
          <View style={styles(darkMode).devicesContainer}>
                  <DeviceCard
                    label="Fan"
                    isOn={fanOn}
                    toggleFn={() => toggleDevice('fan')}
                    loading={loadingFan}>
                    <FanControl
                      darkMode={darkMode}
                      fanSpeed={fanSpeed}
                      setFanSpeed={setFanSpeed}
                      showFanSlider={showFanSlider}
                      setShowFanSlider={setShowFanSlider}
                      updateFanSpeed={updateFanSpeed}
                      loadingFanSpeed={loadingFanSpeed}
                    />
                  </DeviceCard>
          
                  <DeviceCard
                    label="Water Level"
                    isOn={motorOn}
                    toggleFn={() => toggleDevice('motor')}
                    loading={loadingMotor}>
                    <MotorControl
                      darkMode={darkMode}
                      waterLevel={waterLevel}
                    />
                    
                  </DeviceCard>
          
                </View>
  );
};

export default RoomDevices;
