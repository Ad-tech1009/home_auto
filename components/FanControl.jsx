import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import globalStyles from '../styles/globalStyles';

const FanControl = ({ darkMode, fanSpeed, setFanSpeed, showFanSlider, setShowFanSlider, updateFanSpeed, loadingFanSpeed }) => {
  return (
    <>
      <TouchableOpacity
        style={globalStyles(darkMode).adjustButton}
        onPress={() => setShowFanSlider(!showFanSlider)}>
        <Text style={globalStyles(darkMode).adjustButtonText}>Adjust Speed</Text>
      </TouchableOpacity>

      {showFanSlider && (
        <View style={globalStyles(darkMode).sliderContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            value={fanSpeed}
            onValueChange={(value) => {
              setFanSpeed(value);
              updateFanSpeed(value);
            }}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#4CAF50"
          />
          <Text style={globalStyles(darkMode).speedText}>
            {loadingFanSpeed ? 'Updating...' : `Speed: ${fanSpeed}`}
          </Text>
        </View>
      )}
      </>
  );
};

export default FanControl;
