import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  description: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    width: '45%',
  },
  cancelButton: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
});
