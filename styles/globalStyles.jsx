import { StyleSheet } from 'react-native';

const globalStyles = (darkMode) => StyleSheet.create({
  // (your existing styles, no changes needed here)
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#1e1e1e' : '#f5f7fa',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temp: {
    fontSize: 24,
    color: darkMode ? '#ecf0f1' : '#2c3e50',
    fontWeight: '600',
  },
  appTitle: {
    fontSize: 24,
    color: darkMode ? '#ecf0f1' : '#2c3e50',
    fontWeight: '600',
  },
  ipInput: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: darkMode ? '#555' : '#ccc',
    color: darkMode ? '#fff' : '#000',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 20,
    color: darkMode ? '#ecf0f1' : '#2c3e50',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    marginRight: 15,
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
    paddingBottom: 4,
  },
  activeTab: {
    color: darkMode ? '#ecf0f1' : '#2c3e50',
    borderBottomWidth: 2,
    borderBottomColor: '#2c3e50',
  },
  devicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  deviceCard: {
    width: '48%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  deviceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: darkMode ? '#ecf0f1' : '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  toggleOn: {
    backgroundColor: '#4CAF50',
  },
  toggleOff: {
    backgroundColor: '#e74c3c',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  adjustButton: {
    marginTop: 10,
    backgroundColor: '#2980b9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  adjustButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  sliderContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  speedText: {
    marginTop: 4,
    fontSize: 14,
    color: '#7f8c8d',
  },
  footerNav: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerNavText: {
    fontSize: 18,
    color: darkMode ? '#ecf0f1' : '#2c3e50',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
  },
});

export default globalStyles;