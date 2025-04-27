import TopBar from '../components/TopBar';
import RoomDevices from '../components/RoomDevices';
import styles from '../styles/globalStyles';
import React, { useState , useEffect} from 'react';
import {View,Text,TouchableOpacity,Alert,TextInput,} from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [espIP, setEspIP] = useState('http://192.168.15.96');

  const [fanOn, setFanOn] = useState(false);
  const [motorOn, setMotorOn] = useState(false);

  const [loadingFan, setLoadingFan] = useState(false);
  const [loadingMotor, setLoadingMotor] = useState(false);

  const [waterLevel, setWaterLevel] = useState(0);
  const [showWaterLevel, setShowWaterLevel] = useState(false);
  const [fetchingLevel, setFetchingLevel] = useState(false);

  const [showFanSlider, setShowFanSlider] = useState(false);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [loadingFanSpeed, setLoadingFanSpeed] = useState(false);

  const [selectedTab, setSelectedTab] = useState('Living Room');
  const [darkMode, setDarkMode] = useState(false);

  const [motorInterval, setMotorInterval] = useState(null); // NEW for interval control

  const toggleDevice = async (deviceKey) => {
    let deviceState, setDeviceState;
    let isLoading, setIsLoading;
    let deviceLabel;

    switch (deviceKey) {
      case 'fan':
        deviceState = fanOn;
        setDeviceState = setFanOn;
        isLoading = loadingFan;
        setIsLoading = setLoadingFan;
        deviceLabel = 'Fan';
        break;
      case 'motor':
        deviceState = motorOn;
        setDeviceState = setMotorOn;
        isLoading = loadingMotor;
        setIsLoading = setLoadingMotor;
        deviceLabel = 'Motor';
        break;
      default:
        return;
    }

    if (isLoading) return;
    setIsLoading(true);

    const newState = !deviceState;
    try {
      const endpoint = `/relay/${deviceKey}/${newState ? 'on' : 'off'}`;
      await axios.get(`${espIP}${endpoint}`, { timeout: 10000 });
      setDeviceState(newState);

      if (deviceKey === 'motor') {
        if (newState) {
          // Motor turned ON: Start checking water level every 4 seconds
          const intervalId = setInterval(async () => {
            try {
              const response = await axios.get(`${espIP}/level`);
              const level = parseInt(response.data.level);
              if (!isNaN(level)) {
                setWaterLevel(level);
                
                if (level >= 5) {
                  // Auto turn OFF motor
                  clearInterval(intervalId);
                  setMotorInterval(null);
                  await axios.get(`${espIP}/relay/motor/off`);
                  setMotorOn(false);
                  Alert.alert('Motor Auto-Off', 'Water level reached 5.');
                }
              }
            } catch (error) {
              console.error('Error checking water level', error);
            }
          }, 4000);
          setMotorInterval(intervalId);
        } else {
          // Motor turned OFF manually: clear interval
          if (motorInterval) {
            clearInterval(motorInterval);
            setMotorInterval(null);
          }
        }
      }
    } catch (error) {
      Alert.alert('Error', `Failed to toggle ${deviceLabel}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFanSpeed = async (sliderValue) => {
    const newSpeed = sliderValue * 51;
    try {
      const endpoint = `/relay/fan/speed`;
      await axios.post(`${espIP}${endpoint}`, { speed: newSpeed });
      console.log('Fan speed updated:', newSpeed);
    } catch (error) {
      Alert.alert('Error', 'Failed to update fan speed');
    }
  };

  const fetchWaterLevel = async () => {
    if (fetchingLevel) return;
    setFetchingLevel(true);
    try {
      const response = await axios.get(`${espIP}/level`);
      const level = parseInt(response.data.level);
      const newLevel = isNaN(level) ? 0 : level;
      setWaterLevel(newLevel);
      setShowWaterLevel(true);
  
      // NEW LOGIC: Check if level is low, turn motor ON
      if (newLevel < 2 && !motorOn) {
        await axios.get(`${espIP}/relay/motor/on`);
        setMotorOn(true);
  
        // Start auto-monitoring when motor turns ON
        const intervalId = setInterval(async () => {
          try {
            const resp = await axios.get(`${espIP}/level`);
            const currentLevel = parseInt(resp.data.level);
            if (!isNaN(currentLevel)) {
              setWaterLevel(currentLevel);
              if (currentLevel >= 5) {
                clearInterval(intervalId);
                setMotorInterval(null);
                await axios.get(`${espIP}/relay/motor/off`);
                setMotorOn(false);
                Alert.alert('Motor Auto-Off', 'Water level reached 5.');
              }
            }
          } catch (error) {
            console.error('Error checking water level', error);
          }
        }, 4000);
        setMotorInterval(intervalId);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch water level');
    } finally {
      setFetchingLevel(false);
    }
  };

  useEffect(() => {
    const waterLevelInterval = setInterval(async() => {
      fetchWaterLevel();
    }, 5000); // fetch every 5 sec
  
    return () => clearInterval(waterLevelInterval); // cleanup on unmount
  }, []);


  return (
    <View style={styles(darkMode).container}>
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <TextInput
        style={styles(darkMode).ipInput}
        placeholder="Enter ESP IP"
        placeholderTextColor={darkMode ? '#aaa' : '#555'}
        value={espIP}
        onChangeText={setEspIP}
      />

      <Text style={styles(darkMode).greeting}>Hi Sia,</Text>

      <View style={styles(darkMode).tabs}>
        {['Living Room', 'Bedroom', 'Kitchen', 'Dining Room'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles(darkMode).tab,
                selectedTab === tab && styles(darkMode).activeTab,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <RoomDevices
        darkMode={darkMode}
        fanOn={fanOn}
        motorOn={motorOn}
        loadingFan={loadingFan}
        loadingMotor={loadingMotor}
        fanSpeed={fanSpeed}
        setFanSpeed={setFanSpeed}
        showFanSlider={showFanSlider}
        setShowFanSlider={setShowFanSlider}
        updateFanSpeed={updateFanSpeed}
        loadingFanSpeed={loadingFanSpeed}
        waterLevel={waterLevel}
        toggleDevice={toggleDevice}
        fetchWaterLevel={fetchWaterLevel}
      />

      <View style={styles(darkMode).footerNav}>
        <Text style={styles(darkMode).footerNavText}>Home</Text>
        <TouchableOpacity style={styles(darkMode).addButton}>
          <Text style={styles(darkMode).addButtonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles(darkMode).footerNavText}>Profile</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
