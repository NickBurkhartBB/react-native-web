Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/components/Touchable/Touchable.js';var _AccessibilityUtil=require('../../modules/AccessibilityUtil');var _AccessibilityUtil2=_interopRequireDefault(_AccessibilityUtil);var _BoundingDimensions=require('./BoundingDimensions');var _BoundingDimensions2=_interopRequireDefault(_BoundingDimensions);var _findNodeHandle=require('../../modules/findNodeHandle');var _findNodeHandle2=_interopRequireDefault(_findNodeHandle);var _normalizeCssColor=require('normalize-css-color');var _normalizeCssColor2=_interopRequireDefault(_normalizeCssColor);var _Position=require('./Position');var _Position2=_interopRequireDefault(_Position);var _react=require('react');var _react2=_interopRequireDefault(_react);var _TouchEventUtils=require('fbjs/lib/TouchEventUtils');var _TouchEventUtils2=_interopRequireDefault(_TouchEventUtils);var _UIManager=require('../../apis/UIManager');var _UIManager2=_interopRequireDefault(_UIManager);var _View=require('../../components/View');var _View2=_interopRequireDefault(_View);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var States={NOT_RESPONDER:'NOT_RESPONDER',RESPONDER_INACTIVE_PRESS_IN:'RESPONDER_INACTIVE_PRESS_IN',RESPONDER_INACTIVE_PRESS_OUT:'RESPONDER_INACTIVE_PRESS_OUT',RESPONDER_ACTIVE_PRESS_IN:'RESPONDER_ACTIVE_PRESS_IN',RESPONDER_ACTIVE_PRESS_OUT:'RESPONDER_ACTIVE_PRESS_OUT',RESPONDER_ACTIVE_LONG_PRESS_IN:'RESPONDER_ACTIVE_LONG_PRESS_IN',RESPONDER_ACTIVE_LONG_PRESS_OUT:'RESPONDER_ACTIVE_LONG_PRESS_OUT',ERROR:'ERROR'};var IsActive={RESPONDER_ACTIVE_PRESS_OUT:true,RESPONDER_ACTIVE_PRESS_IN:true};var IsPressingIn={RESPONDER_INACTIVE_PRESS_IN:true,RESPONDER_ACTIVE_PRESS_IN:true,RESPONDER_ACTIVE_LONG_PRESS_IN:true};var IsLongPressingIn={RESPONDER_ACTIVE_LONG_PRESS_IN:true};var Signals={DELAY:'DELAY',RESPONDER_GRANT:'RESPONDER_GRANT',RESPONDER_RELEASE:'RESPONDER_RELEASE',RESPONDER_TERMINATED:'RESPONDER_TERMINATED',ENTER_PRESS_RECT:'ENTER_PRESS_RECT',LEAVE_PRESS_RECT:'LEAVE_PRESS_RECT',LONG_PRESS_DETECTED:'LONG_PRESS_DETECTED'};var Transitions={NOT_RESPONDER:{DELAY:States.ERROR,RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,RESPONDER_RELEASE:States.ERROR,RESPONDER_TERMINATED:States.ERROR,ENTER_PRESS_RECT:States.ERROR,LEAVE_PRESS_RECT:States.ERROR,LONG_PRESS_DETECTED:States.ERROR},RESPONDER_INACTIVE_PRESS_IN:{DELAY:States.RESPONDER_ACTIVE_PRESS_IN,RESPONDER_GRANT:States.ERROR,RESPONDER_RELEASE:States.NOT_RESPONDER,RESPONDER_TERMINATED:States.NOT_RESPONDER,ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,LONG_PRESS_DETECTED:States.ERROR},RESPONDER_INACTIVE_PRESS_OUT:{DELAY:States.RESPONDER_ACTIVE_PRESS_OUT,RESPONDER_GRANT:States.ERROR,RESPONDER_RELEASE:States.NOT_RESPONDER,RESPONDER_TERMINATED:States.NOT_RESPONDER,ENTER_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_IN,LEAVE_PRESS_RECT:States.RESPONDER_INACTIVE_PRESS_OUT,LONG_PRESS_DETECTED:States.ERROR},RESPONDER_ACTIVE_PRESS_IN:{DELAY:States.ERROR,RESPONDER_GRANT:States.ERROR,RESPONDER_RELEASE:States.NOT_RESPONDER,RESPONDER_TERMINATED:States.NOT_RESPONDER,ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},RESPONDER_ACTIVE_PRESS_OUT:{DELAY:States.ERROR,RESPONDER_GRANT:States.ERROR,RESPONDER_RELEASE:States.NOT_RESPONDER,RESPONDER_TERMINATED:States.NOT_RESPONDER,ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_IN,LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_PRESS_OUT,LONG_PRESS_DETECTED:States.ERROR},RESPONDER_ACTIVE_LONG_PRESS_IN:{DELAY:States.ERROR,RESPONDER_GRANT:States.ERROR,RESPONDER_RELEASE:States.NOT_RESPONDER,RESPONDER_TERMINATED:States.NOT_RESPONDER,ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,LONG_PRESS_DETECTED:States.RESPONDER_ACTIVE_LONG_PRESS_IN},RESPONDER_ACTIVE_LONG_PRESS_OUT:{DELAY:States.ERROR,RESPONDER_GRANT:States.ERROR,RESPONDER_RELEASE:States.NOT_RESPONDER,RESPONDER_TERMINATED:States.NOT_RESPONDER,ENTER_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_IN,LEAVE_PRESS_RECT:States.RESPONDER_ACTIVE_LONG_PRESS_OUT,LONG_PRESS_DETECTED:States.ERROR},error:{DELAY:States.NOT_RESPONDER,RESPONDER_GRANT:States.RESPONDER_INACTIVE_PRESS_IN,RESPONDER_RELEASE:States.NOT_RESPONDER,RESPONDER_TERMINATED:States.NOT_RESPONDER,ENTER_PRESS_RECT:States.NOT_RESPONDER,LEAVE_PRESS_RECT:States.NOT_RESPONDER,LONG_PRESS_DETECTED:States.NOT_RESPONDER}};var HIGHLIGHT_DELAY_MS=130;var PRESS_EXPAND_PX=20;var LONG_PRESS_THRESHOLD=500;var LONG_PRESS_DELAY_MS=LONG_PRESS_THRESHOLD-HIGHLIGHT_DELAY_MS;var LONG_PRESS_ALLOWED_MOVEMENT=10;var TouchableMixin={componentDidMount:function componentDidMount(){var _this=this;this._touchableNode=(0,_findNodeHandle2.default)(this);this._touchableBlurListener=function(e){if(_this._isTouchableKeyboardActive){if(_this.state.touchable.touchState&&_this.state.touchable.touchState!==States.NOT_RESPONDER){_this.touchableHandleResponderTerminate({nativeEvent:e});}_this._isTouchableKeyboardActive=false;}};this._touchableNode.addEventListener('blur',this._touchableBlurListener);},componentWillUnmount:function componentWillUnmount(){this._touchableNode.removeEventListener('blur',this._touchableBlurListener);window.removeEventListener('scroll',this._handleScroll);this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);},touchableGetInitialState:function touchableGetInitialState(){return{touchable:{touchState:undefined,responderID:null}};},touchableHandleResponderTerminationRequest:function touchableHandleResponderTerminationRequest(){return!this.props.rejectResponderTermination;},touchableHandleStartShouldSetResponder:function touchableHandleStartShouldSetResponder(){return!this.props.disabled;},touchableLongPressCancelsPress:function touchableLongPressCancelsPress(){return true;},touchableHandleResponderGrant:function touchableHandleResponderGrant(e){var dispatchID=e.currentTarget;e.persist();this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout);this.pressOutDelayTimeout=null;this.state.touchable.touchState=States.NOT_RESPONDER;this.state.touchable.responderID=dispatchID;this._receiveSignal(Signals.RESPONDER_GRANT,e);var delayMS=this.touchableGetHighlightDelayMS!==undefined?Math.max(this.touchableGetHighlightDelayMS(),0):HIGHLIGHT_DELAY_MS;delayMS=isNaN(delayMS)?HIGHLIGHT_DELAY_MS:delayMS;if(delayMS!==0){this.touchableDelayTimeout=setTimeout(this._handleDelay.bind(this,e),delayMS);}else{this.state.touchable.positionOnActivate=null;this._handleDelay(e);}var longDelayMS=this.touchableGetLongPressDelayMS!==undefined?Math.max(this.touchableGetLongPressDelayMS(),10):LONG_PRESS_DELAY_MS;longDelayMS=isNaN(longDelayMS)?LONG_PRESS_DELAY_MS:longDelayMS;this.longPressDelayTimeout=setTimeout(this._handleLongDelay.bind(this,e),longDelayMS+delayMS);},touchableHandleResponderRelease:function touchableHandleResponderRelease(e){if(this.state.touchable.touchState===States.NOT_RESPONDER){return;}this._receiveSignal(Signals.RESPONDER_RELEASE,e);if(e.cancelable&&!e.isDefaultPrevented()){e.preventDefault();}},touchableHandleResponderTerminate:function touchableHandleResponderTerminate(e){this._receiveSignal(Signals.RESPONDER_TERMINATED,e);},touchableHandleResponderMove:function touchableHandleResponderMove(e){if(this.state.touchable.touchState===States.RESPONDER_INACTIVE_PRESS_IN){return;}if(!this.state.touchable.positionOnActivate){return;}if(this.state.touchable.touchState===States.NOT_RESPONDER){return;}var positionOnActivate=this.state.touchable.positionOnActivate;var dimensionsOnActivate=this.state.touchable.dimensionsOnActivate;var pressRectOffset=this.touchableGetPressRectOffset?this.touchableGetPressRectOffset():{left:PRESS_EXPAND_PX,right:PRESS_EXPAND_PX,top:PRESS_EXPAND_PX,bottom:PRESS_EXPAND_PX};var pressExpandLeft=pressRectOffset.left;var pressExpandTop=pressRectOffset.top;var pressExpandRight=pressRectOffset.right;var pressExpandBottom=pressRectOffset.bottom;var hitSlop=this.touchableGetHitSlop?this.touchableGetHitSlop():null;if(hitSlop){pressExpandLeft+=hitSlop.left;pressExpandTop+=hitSlop.top;pressExpandRight+=hitSlop.right;pressExpandBottom+=hitSlop.bottom;}var touch=_TouchEventUtils2.default.extractSingleTouch(e.nativeEvent);var pageX=touch&&touch.pageX;var pageY=touch&&touch.pageY;if(this.pressInLocation){var movedDistance=this._getDistanceBetweenPoints(pageX,pageY,this.pressInLocation.pageX,this.pressInLocation.pageY);if(movedDistance>LONG_PRESS_ALLOWED_MOVEMENT){this._cancelLongPressDelayTimeout();}}var isTouchWithinActive=pageX>positionOnActivate.left-pressExpandLeft&&pageY>positionOnActivate.top-pressExpandTop&&pageX<positionOnActivate.left+dimensionsOnActivate.width+pressExpandRight&&pageY<positionOnActivate.top+dimensionsOnActivate.height+pressExpandBottom;if(isTouchWithinActive){this._receiveSignal(Signals.ENTER_PRESS_RECT,e);var curState=this.state.touchable.touchState;if(curState===States.RESPONDER_INACTIVE_PRESS_IN){this._cancelLongPressDelayTimeout();}}else{this._cancelLongPressDelayTimeout();this._receiveSignal(Signals.LEAVE_PRESS_RECT,e);}},_remeasureMetricsOnActivation:function _remeasureMetricsOnActivation(){var tag=this.state.touchable.responderID;if(tag==null){return;}_UIManager2.default.measure(tag,this._handleQueryLayout);},_handleQueryLayout:function _handleQueryLayout(x,y,width,height,globalX,globalY){if(!x&&!y&&!width&&!height&&!globalX&&!globalY){return;}this.state.touchable.positionOnActivate&&_Position2.default.release(this.state.touchable.positionOnActivate);this.state.touchable.dimensionsOnActivate&&_BoundingDimensions2.default.release(this.state.touchable.dimensionsOnActivate);this.state.touchable.positionOnActivate=_Position2.default.getPooled(globalX,globalY);this.state.touchable.dimensionsOnActivate=_BoundingDimensions2.default.getPooled(width,height);},_handleDelay:function _handleDelay(e){this.touchableDelayTimeout=null;this._receiveSignal(Signals.DELAY,e);},_handleLongDelay:function _handleLongDelay(e){this.longPressDelayTimeout=null;var curState=this.state.touchable.touchState;if(curState!==States.RESPONDER_ACTIVE_PRESS_IN&&curState!==States.RESPONDER_ACTIVE_LONG_PRESS_IN){console.error('Attempted to transition from state `'+curState+'` to `'+States.RESPONDER_ACTIVE_LONG_PRESS_IN+'`, which is not supported. This is '+'most likely due to `Touchable.longPressDelayTimeout` not being cancelled.');}else{this._receiveSignal(Signals.LONG_PRESS_DETECTED,e);}},_handleScroll:function _handleScroll(e){var curState=this.state.touchable.touchState;if(curState!==States.NOT_RESPONDER){this._receiveSignal(Signals.RESPONDER_TERMINATED,e);}},_receiveSignal:function _receiveSignal(signal,e){var responderID=this.state.touchable.responderID;var curState=this.state.touchable.touchState;var nextState=Transitions[curState]&&Transitions[curState][signal];if(!responderID&&signal===Signals.RESPONDER_RELEASE){return;}if(!nextState){throw new Error('Unrecognized signal `'+signal+'` or state `'+curState+'` for Touchable responder `'+responderID+'`');}if(nextState===States.ERROR){throw new Error('Touchable cannot transition from `'+curState+'` to `'+signal+'` for responder `'+responderID+'`');}if(curState!==nextState){this._performSideEffectsForTransition(curState,nextState,signal,e);this.state.touchable.touchState=nextState;}},_cancelLongPressDelayTimeout:function _cancelLongPressDelayTimeout(){this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout);this.longPressDelayTimeout=null;},_isHighlight:function _isHighlight(state){return state===States.RESPONDER_ACTIVE_PRESS_IN||state===States.RESPONDER_ACTIVE_LONG_PRESS_IN;},_savePressInLocation:function _savePressInLocation(e){var touch=_TouchEventUtils2.default.extractSingleTouch(e.nativeEvent);var pageX=touch&&touch.pageX;var pageY=touch&&touch.pageY;var locationX=touch&&touch.locationX;var locationY=touch&&touch.locationY;this.pressInLocation={pageX:pageX,pageY:pageY,locationX:locationX,locationY:locationY};},_getDistanceBetweenPoints:function _getDistanceBetweenPoints(aX,aY,bX,bY){var deltaX=aX-bX;var deltaY=aY-bY;return Math.sqrt(deltaX*deltaX+deltaY*deltaY);},_performSideEffectsForTransition:function _performSideEffectsForTransition(curState,nextState,signal,e){var curIsHighlight=this._isHighlight(curState);var newIsHighlight=this._isHighlight(nextState);var isFirstSignal=signal===Signals.RESPONDER_GRANT;var isFinalSignal=signal===Signals.RESPONDER_TERMINATED||signal===Signals.RESPONDER_RELEASE;if(isFirstSignal){window.addEventListener('scroll',this._handleScroll);}else if(isFinalSignal){this._cancelLongPressDelayTimeout();window.removeEventListener('scroll',this._handleScroll);}if(!IsActive[curState]&&IsActive[nextState]){this._remeasureMetricsOnActivation();}if(IsPressingIn[curState]&&signal===Signals.LONG_PRESS_DETECTED){this.touchableHandleLongPress&&this.touchableHandleLongPress(e);}if(newIsHighlight&&!curIsHighlight){this._startHighlight(e);}else if(!newIsHighlight&&curIsHighlight){this._endHighlight(e);}if(IsPressingIn[curState]&&signal===Signals.RESPONDER_RELEASE){var hasLongPressHandler=!!this.props.onLongPress;var pressIsLongButStillCallOnPress=IsLongPressingIn[curState]&&(!hasLongPressHandler||!this.touchableLongPressCancelsPress());var shouldInvokePress=!IsLongPressingIn[curState]||pressIsLongButStillCallOnPress;if(shouldInvokePress&&this.touchableHandlePress){if(!newIsHighlight&&!curIsHighlight){this._startHighlight(e);this._endHighlight(e);}this.touchableHandlePress(e);}}this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout);this.touchableDelayTimeout=null;},_startHighlight:function _startHighlight(e){this._savePressInLocation(e);this.touchableHandleActivePressIn&&this.touchableHandleActivePressIn(e);},_endHighlight:function _endHighlight(e){var _this2=this;if(this.touchableHandleActivePressOut){if(this.touchableGetPressOutDelayMS&&this.touchableGetPressOutDelayMS()){this.pressOutDelayTimeout=setTimeout(function(){_this2.touchableHandleActivePressOut(e);},this.touchableGetPressOutDelayMS());}else{this.touchableHandleActivePressOut(e);}}},touchableHandleKeyEvent:function touchableHandleKeyEvent(e){var ENTER=13;var SPACE=32;var type=e.type,which=e.which;if(which===ENTER||which===SPACE){if(type==='keydown'){if(!this._isTouchableKeyboardActive){if(!this.state.touchable.touchState||this.state.touchable.touchState===States.NOT_RESPONDER){this.touchableHandleResponderGrant(e);this._isTouchableKeyboardActive=true;}}}else if(type==='keyup'){if(this._isTouchableKeyboardActive){if(this.state.touchable.touchState&&this.state.touchable.touchState!==States.NOT_RESPONDER){this.touchableHandleResponderRelease(e);this._isTouchableKeyboardActive=false;}}}e.stopPropagation();if(!(which===ENTER&&_AccessibilityUtil2.default.propsToAriaRole(this.props)==='link')){e.preventDefault();}}}};var Touchable={Mixin:TouchableMixin,TOUCH_TARGET_DEBUG:false,renderDebugView:function renderDebugView(_ref){var color=_ref.color,hitSlop=_ref.hitSlop;if(process.env.NODE_ENV!=='production'){if(!Touchable.TOUCH_TARGET_DEBUG){return null;}var debugHitSlopStyle={};hitSlop=hitSlop||{top:0,bottom:0,left:0,right:0};for(var key in hitSlop){debugHitSlopStyle[key]=-hitSlop[key];}var hexColor='#'+('00000000'+(0,_normalizeCssColor2.default)(color).toString(16)).substr(-8);return _react2.default.createElement(_View2.default,{pointerEvents:'none',style:_extends({position:'absolute',borderColor:hexColor.slice(0,-2)+'55',borderWidth:1,borderStyle:'dashed',backgroundColor:hexColor.slice(0,-2)+'0F'},debugHitSlopStyle),__source:{fileName:_jsxFileName,lineNumber:880}});}}};exports.default=Touchable;