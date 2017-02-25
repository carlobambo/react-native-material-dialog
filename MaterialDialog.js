import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from './colors';

// TODO: Support custom actions
// TODO: Stacked full-width buttons

class ActionButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.actionContainer}
        underlayColor={colors.androidPressedUnderlay}
        onPress={this.props.onPress}>
        <Text
          style={[styles.actionText, { color: this.props.colorAccent }]}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default class MaterialDialog extends Component {
  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        hardwareAccelerated
        visible={this.props.visible}
        onRequestClose={this.props.onCancel}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.backgroundOverlay}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View>
                  {this.props.title != null
                    ? <View
                        style={this.props.scrolled
                        ? styles.titleContainerScrolled
                        : styles.titleContainer}>
                        <Text
                          style={[styles.titleText, { color: this.props.titleColor }]}>
                          {this.props.title}
                        </Text>
                      </View>
                    : null}
                  <View
                    style={this.props.scrolled
                    ? styles.contentContainerScrolled
                    : styles.contentContainer}>
                    {this.props.children}
                  </View>
                  {this.props.onOk != null && this.props.onCancel != null
                    ? <View
                        style={this.props.scrolled
                        ? styles.actionsContainerScrolled
                        : styles.actionsContainer}>
                        <ActionButton
                          colorAccent={this.props.colorAccent}
                          onPress={this.props.onCancel}
                          label={this.props.cancelLabel} />
                        <ActionButton
                          colorAccent={this.props.colorAccent}
                          onPress={this.props.onOk}
                          label={this.props.okLabel} />
                      </View>
                    : null}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backgroundOverlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundOverlay,
  },
  modalContainer: {
    marginHorizontal: 16,
    marginVertical: 56,
    paddingTop: 24,
    minWidth: 280,
    borderRadius: 2,
    backgroundColor: colors.background,
    elevation: 24,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainerScrolled: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
  },
  contentContainer: {
    flex: -1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  contentContainerScrolled: {
    flex: -1,
    paddingHorizontal: 24,
  },
  actionsContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
  },
  actionsContainerScrolled: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  actionContainer: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
  },
});

MaterialDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  scrolled: PropTypes.bool,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  colorAccent: PropTypes.string,
  children: PropTypes.element.isRequired,
};

MaterialDialog.defaultProps = {
  titleColor: colors.androidPrimaryTextColor,
  colorAccent: colors.androidColorAccent,
  scrolled: false,
  okLabel: 'OK',
  cancelLabel: 'CANCEL',
};

ActionButton.propTypes = {
  colorAccent: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};