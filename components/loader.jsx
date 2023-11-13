import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { globalColors } from '../styles/globalColors';

const Loader = ({ loading }) => (
  <Modal transparent animationType="none" visible={loading}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <Text style={{ color: globalColors.buttonColor, fontSize: 20, fontWeight: 'bold' }}>Please wait</Text>
        <ActivityIndicator animating={loading} size={'large'} color={globalColors.orange} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.432)',
  },
  activityIndicatorWrapper: {
    backgroundColor: globalColors.backgroundColor,
    borderRadius: 30,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: "50%",
    height: "15%",
  },
});

export default Loader;
