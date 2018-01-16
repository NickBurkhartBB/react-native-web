'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _applyNativeMethods = require('../../modules/applyNativeMethods');

var _applyNativeMethods2 = _interopRequireDefault(_applyNativeMethods);

var _ColorPropType = require('../ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

var _ViewPropTypes = require('../ViewPropTypes');

var _ViewPropTypes2 = _interopRequireDefault(_ViewPropTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule ProgressBar
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ProgressBar = function (_Component) {
  _inherits(ProgressBar, _Component);

  function ProgressBar() {
    var _temp, _this, _ret;

    _classCallCheck(this, ProgressBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this._setProgressRef = function (element) {
      _this._progressElement = element;
    }, _this._updateProgressWidth = function () {
      var _this$props = _this.props,
          indeterminate = _this$props.indeterminate,
          progress = _this$props.progress;

      var percentageProgress = indeterminate ? 50 : progress * 100;
      var width = indeterminate ? '25%' : percentageProgress + '%';
      if (_this._progressElement) {
        _this._progressElement.setNativeProps({
          style: { width: width }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ProgressBar.prototype.componentDidMount = function componentDidMount() {
    this._updateProgressWidth();
  };

  ProgressBar.prototype.componentDidUpdate = function componentDidUpdate() {
    this._updateProgressWidth();
  };

  ProgressBar.prototype.render = function render() {
    var _props = this.props,
        color = _props.color,
        indeterminate = _props.indeterminate,
        progress = _props.progress,
        trackColor = _props.trackColor,
        style = _props.style,
        other = _objectWithoutProperties(_props, ['color', 'indeterminate', 'progress', 'trackColor', 'style']);

    var percentageProgress = progress * 100;

    return _react2.default.createElement(
      _View2.default,
      _extends({}, other, {
        accessibilityRole: 'progressbar',
        'aria-valuemax': '100',
        'aria-valuemin': '0',
        'aria-valuenow': indeterminate ? null : percentageProgress,
        style: [styles.track, style, { backgroundColor: trackColor }]
      }),
      _react2.default.createElement(_View2.default, {
        ref: this._setProgressRef,
        style: [styles.progress, indeterminate && styles.animation, { backgroundColor: color }]
      })
    );
  };

  return ProgressBar;
}(_react.Component);

ProgressBar.displayName = 'ProgressBar';
ProgressBar.defaultProps = {
  color: '#1976D2',
  indeterminate: false,
  progress: 0,
  trackColor: 'transparent'
};
ProgressBar.propTypes = process.env.NODE_ENV !== "production" ? Object.assign({}, _ViewPropTypes2.default, {
  color: _ColorPropType2.default,
  indeterminate: _propTypes.bool,
  progress: _propTypes.number,
  trackColor: _ColorPropType2.default
}) : {};


var styles = _StyleSheet2.default.create({
  track: {
    height: 5,
    overflow: 'hidden',
    userSelect: 'none',
    zIndex: 0
  },
  progress: {
    height: '100%',
    zIndex: -1
  },
  animation: {
    animationDuration: '1s',
    animationName: 'rn-ProgressBar-animation',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

exports.default = (0, _applyNativeMethods2.default)(ProgressBar);