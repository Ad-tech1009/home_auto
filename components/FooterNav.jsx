import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';

const FooterNav = ({ darkMode }) => {
  return (
    <View style={globalStyles(darkMode).footerNav}>
      <Text style={globalStyles(darkMode).footerNavText}>Home</Text>
      <TouchableOpacity style={globalStyles(darkMode).addButton}>
        <Text style={globalStyles(darkMode).addButtonText}>+</Text>
      </TouchableOpacity>
      <Text style={globalStyles(darkMode).footerNavText}>Profile</Text>
    </View>
  );
};

export default FooterNav;
