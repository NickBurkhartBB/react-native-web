Object.defineProperty(exports,"__esModule",{value:true});var _invariant=require('fbjs/lib/invariant');var _invariant2=_interopRequireDefault(_invariant);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var ensureComponentIsNative=function ensureComponentIsNative(component){(0,_invariant2.default)(component&&typeof component.setNativeProps==='function','Touchable child must either be native or forward setNativeProps to a native component');};exports.default=ensureComponentIsNative;