import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { globalColors } from '../styles/globalColors';

const AlertMessage = ({ visible, message, onPressOk, error }) => (
  <Modal transparent animationType="fade" visible={visible}>
    <View style={styles.modalBackground}>
      <View style={styles.alertWrapper}>
        <Text style={{ color: globalColors.buttonColor, fontSize: 20, fontWeight: 'bold', textAlign: "center" }}>{message}</Text>
        <TouchableOpacity onPress={onPressOk} style={error ? styles.okButtonRed : styles.okButton}>
          <Text style={{ color: globalColors.textColor, fontWeight: 'bold' }}>OK</Text>
        </TouchableOpacity>
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
  alertWrapper: {
    backgroundColor: globalColors.backgroundColor,
    borderRadius: 30,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "70%",
    height: "20%",
  },
  okButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: globalColors.orange,
    borderRadius: 10,
  },
  okButtonRed: {
    marginTop: 20,
    padding: 15,
    backgroundColor: globalColors.alertRed,
    borderRadius: 10,
  },
});

export default AlertMessage;
