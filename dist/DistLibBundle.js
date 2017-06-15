/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module B BaseObject*/

/**
 * Web Apps Javascript Distribution Library
 * Base implementation for the User Object
 *
 */
class BaseObject {

    constructor() {
        /**
         * Set of getProperty functions
         * the object key is the property name to be set/get
         *
         */
        this.getProperty = {
            width: (objName) => {
                return this.getElemFromName(objName).width();
            },
            height: (objName) => {
                return this.getElemFromName(objName).height();
            },
            x: (objName) => {
                var elem = this.getElemFromName(objName);
               // return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10));  // elem.css('transform').split(',')[4])
                return elem.position().left;
            },
            y: (objName) => {
                var elem = this.getElemFromName(objName);
                //return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10));  // elem.css('transform').split(',')[5])
                return elem.position().top;
            },
            Alpha: (objName) => {
                return this.getElemFromName(objName).css('opacity');
            },
            'Background color': (objName) => {
                return this.getElemFromName(objName).css('background-color');
            },
            'Horizontal scroll': (objName) => {
                return this.getElemFromName(objName).css('overflow-x');
            },
            'Vertical scroll': (objName) => {
                return this.getElemFromName(objName).css('overflow-y');
            },


        };

        /**
         * Set of setProperty functions
         * the object key is the property name to be set/get
         *
         */
        this.setProperty = {
            width: (objName, value) => {
                this.getElemFromName(objName).css('width', value + 'px');
            },
            height: (objName, value) => {
                this.getElemFromName(objName).css('height', value + 'px');
            },
            x: (objName, value) => {
                var elem = this.getElemFromName(objName);
                //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
                var yPos = elem.position().top;
                // remove constraints
                this.removeConstraints(elem, 'x');
                elem.css('transform', 'translate(' + value + 'px,' + yPos + 'px)');
            },
            y: (objName, value) => {
                var elem = this.getElemFromName(objName);
                //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
                var xPos = elem.position().left;
                // remove constraints if applied
                this.removeConstraints(elem, 'y');
                elem.css('transform', 'translate(' + xPos + 'px,' + value + 'px)');
            },
            Alpha: (objName, value) => {
                this.getElemFromName(objName).css('opacity', value/100 );
            },
            'Background color': (objName, value) => {
                this.getElemFromName(objName).css('background-color', value);
            },
            'Horizontal scroll': (objName, value) => {
                this.getElemFromName(objName).css('overflow-x', 'hidden');
                if (value) this.getElemFromName(objName).css('overflow-x', 'scroll');
            },
            'Vertical scroll': (objName, value) => {
                this.getElemFromName(objName).css('overflow-y', 'hidden');
                if (value) this.getElemFromName(objName).css('overflow-y', 'scroll');
            },

        };
    }

    /**
     * Remove all constraints if we move the object
     * @param objName
     * @param axis
     */
    removeConstraints (elem, axis) {
        if (elem.css('top') && axis == 'y') elem.css('top', '');
        if (elem.css('left') && axis == 'x') elem.css('left', '');
        if (elem.css('bottom') && axis == 'y') elem.css('bottom', '');
        if (elem.css('right') && axis == 'x') elem.css('right', '');
        // here restore the height and width params
        if (axis == 'y') elem.css('height', elem.attr('original-height') + 'px');
        else elem.css('width', elem.attr('original-width') + 'px');
    }

    /**
     * Retrieves the element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]');
    }

    /**
     * Generic removeGesture block implementation
     * @param objName
     * @param gesture
     */
    removeGesture (objName, gesture) {
        try {
            var elem = this.getElemFromName(objName);
            var gestureStr = this.gestureStr(gesture);
            return elem.unbind(gestureStr);
        } catch (e) {
            throw(e);
        }
    }
    
    animationStart(objName, animation, onCompleteCallback) {
        var elem = this.getElemFromName(objName);
        let duration = animation.duration*1000;
        let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};

        switch(animation.type) {
            case "move":
                elem.animate({left: '+=' + animation.dX + 'px', top: '+=' + animation.dY + 'px'}, options);
                elem.dequeue(animation.id);
                break;
            case "scale":
                let newWidth = elem.width() * animation.dX;
                let newHeight = elem.height() * animation.dY;
                let leftDelta = (newWidth - elem.width()) / 2;
                let topDelta = (newHeight - elem.height()) / 2;
                elem.animate({width:newWidth+'px', height:newHeight+'px', left: '-='+leftDelta+'px', top: '-='+topDelta+'px'}, options);
                elem.dequeue(animation.id);
                break;
            case "rotate":
                 let angle = animation.angle;
                 let currAngle = 0;
                 if( elem.attr('data-angle') ) {
                    currAngle = elem.attr('data-angle');
                 }
                 let finalAngle = parseInt(currAngle) + parseInt(angle);
                 elem.attr('data-angle', finalAngle);
                 var left = elem.position().left;
                 var top = elem.position().top;
                 $({deg:currAngle}).animate({deg: finalAngle}, {
                    duration: duration,
                    step: function(now) {
                        elem.css({
                            'transform':'rotate('+now+'deg)',
                            'left': left+'px',
                            'top': top+'px'
                        });
                    },
                    complete: onCompleteCallback
                });
                break;
            case "fade":
                let alpha = (animation.alpha / 100);
                elem.animate({opacity:alpha}, options);
                elem.dequeue(animation.id);
                break;
        }
    }

    animationCancel(objName, animation) {
        var elem = this.getElemFromName(objName);
        elem.stop(animation.id, false, false);
    }

    animationStop(objName, animation) {
        var elem = this.getElemFromName(objName);
        elem.stop(animation.id, true, true);
    }

    animationStopAll(objName) {
        var elem = this.getElemFromName(objName);
        elem.finish();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseObject);




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class TextObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor(elemSelectorRef) {
        super();

        // Element selector
        this.elemSelectorRef = elemSelectorRef || '';

        var self = this;

        // Getting Text properties values

        this.getProperty = Object.assign(this.getProperty, {
            'Font size': (objName) => {
                return this.getTextElemFromName(objName).css('font-size');
            },
            Alpha: (objName) => {
                return this.getTextElemFromName(objName).css('opacity') * 100;
            },
            'Text Alignment': (objName) => {
                return this.getTextElemFromName(objName).css('text-align');
            },
            'Vertical Alignment': (objName) => {
                return this.getTextElemFromName(objName).css('vertical-align');
            },
            'Font style': (objName) => {
                return this.getTextElemFromName(objName).css('font-style');
            },
            'Font family': (objName) => {
                return this.getTextElemFromName(objName).css('font-family');
            },
            'Background color': (objName) => {
                return this.getTextElemFromName(objName).css('background-color');
            },
            'Text color': (objName) => {
                return this.getTextElemFromName(objName).css('color');
            },
            Text: (objName) => {
                return this.getTextElemFromName(objName).html();
            }
        });

        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                this.getTextElemFromName(objName).html(value);
            },
            'Font size': (objName, value) => {
                this.getTextElemFromName(objName).css('font-size',value+'px');
            },
            Alpha: (objName, value) => {
                this.getTextElemFromName(objName).css('opacity',value/100);
            },
            'Text Alignment': (objName, value) => {
                this.getTextElemFromName(objName).css('text-align',value.toLowerCase());
            },
            'Vertical Alignment': (objName, value) => {
                this.getTextElemFromName(objName).css('vertical-align',value.toLowerCase());
            },
            'Font style': (objName, value) => {
                this.getTextElemFromName(objName).css('font-style',value.toLowerCase());
            },
            'Font family': (objName, value) => {
                this.getTextElemFromName(objName).css('font-family',value.toLowerCase());
            },
            'Background color': (objName, value) => {
                this.getTextElemFromName(objName).css('background-color',value);
            },
            'Text color': (objName, value) => {
                this.getTextElemFromName(objName).css('color',value);
            }
        });
    };

    /**
     * Retrieves the text element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getTextElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]' + this.elemSelectorRef);
    }

    init ( elemSelectorRefValue) {
        this.elemSelectorRef = elemSelectorRefValue;
    };

}

/* harmony default export */ __webpack_exports__["a"] = (TextObject);





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Created by Ravish on 1/05/2017 */

// ES6 imports

class ColourLibraryObject {

  constructor() {}

  getColourFromText (str) {
    return str;
  }

  getRgbFromColour (colour) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour);
    let arr = [];
    arr.push(parseInt(result[1], 16));
    arr.push(parseInt(result[2], 16));
    arr.push(parseInt(result[3], 16));
    return arr;
  }

  getColourFromHsv (h,s,v) {
    let rgb = this.hsvToRgb(h,s,v);
    let hex = this.rgbToHex (rgb[0],rgb[1],rgb[2]);
    return hex;
  }

  getHsvFromColour (colour) {
    let rgb = this.getRgbFromColour(colour);
    let hsv = this.rgb2hsv (rgb[0],rgb[1],rgb[2]);
    return hsv;
  }

  isColourDark (colour) {
    let luma = this.getLuma (colour);
    if (luma < this.getLumaTreshold()) {
      return true;
    }
  }

  isColourLight (colour) {
   let luma = this.getLuma (colour);
   if (luma > this.getLumaTreshold()) {
      return true;
    }
  }

  getLuma (colour) {
    let c = colour.substring(1);  // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >>  8) & 0xff;  // extract green
    let b = (rgb >>  0) & 0xff;  // extract blue

    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }

  getLumaTreshold () {
    return 150;
  }

  getReadabilityTreshold () {
    return 120;
  }

  getLuminosity (colour) {
    return this.getLuma(colour);
  }

  rgb2hsv () {
    let rr, gg, bb,
      r = arguments[0] / 255,
      g = arguments[1] / 255,
      b = arguments[2] / 255,
      h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

    if (diff == 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) {
        h = bb - gg;
      }else if (g === v) {
        h = (1 / 3) + rr - bb;
      }else if (b === v) {
        h = (2 / 3) + gg - rr;
      }
      if (h < 0) {
        h += 1;
      }else if (h > 1) {
        h -= 1;
      }
    }
    return [
      Math.round(h * 360),
      Math.round(s * 100),
      Math.round(v * 100)
    ];
  }

  hsvToRgb (h, s, v) {
    let r, g, b;
    let i;
    let f, p, q, t;
     
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
     
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
     
    if(s == 0) {
      // Achromatic (grey)
      r = g = b = v;
      return [
        Math.round(r * 255), 
        Math.round(g * 255), 
        Math.round(b * 255)
      ];
    }
     
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
     
    switch(i) {
      case 0:
        r = v;
        g = t;
        b = p;
      break;
     
      case 1:
        r = q;
        g = v;
        b = p;
      break;
     
      case 2:
        r = p;
        g = v;
        b = t;
      break;
     
      case 3:
        r = p;
        g = q;
        b = v;
      break;
     
      case 4:
        r = t;
        g = p;
        b = v;
      break;
     
      default: // case 5:
        r = v;
        g = p;
        b = q;
    }
     
    return [
      Math.round(r * 255), 
      Math.round(g * 255), 
      Math.round(b * 255)
    ];
  }

  componentToHex(c) {
    let hex = Math.round(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  isColour (colour) {
    let result  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colour);
    return result;
  }

  mixColour (c1,c2,ratio) {
    return this.blendColours(c1,c2,ratio);
  }

  isReadableOn (c1,c2) {
    let luma1 = this.getLuma (c1);
    let luma2 = this.getLuma (c2);
    let diff = Math.abs(luma2 - luma1);
    console.log (luma1,luma2,diff);
    if (diff > this.getReadabilityTreshold()) {
      return true;
    }
  }

  blendColours(c1, c2, percentage) {
    // check input
    c1 = c1 || '#000000';
    c2 = c2 || '#ffffff';
    percentage = percentage || 0.5;

    // 1: validate input, make sure we have provided a valid hex
    if (c1.length != 4 && c1.length != 7)
      throw new error('colours must be provided as hexes');

    if (c2.length != 4 && c2.length != 7)
      throw new error('colours must be provided as hexes');    

    if (percentage > 1 || percentage < 0)
      throw new error('percentage must be between 0 and 1');


    // 2: check to see if we need to convert 3 char hex to 6 char hex, else slice off hash
    //      the three character hex is just a representation of the 6 hex where each character is repeated
    //      ie: #060 => #006600 (green)
    if (c1.length == 4)
      c1 = c1[1] + c1[1] + c1[2] + c1[2] + c1[3] + c1[3];
    else
      c1 = c1.substring(1);
    if (c2.length == 4)
      c2 = c2[1] + c2[1] + c2[2] + c2[2] + c2[3] + c2[3];
    else
      c2 = c2.substring(1);

    console.log('valid: c1 => ' + c1 + ', c2 => ' + c2);

    // 3: we have valid input, convert colors to rgb
    c1 = [parseInt(c1[0] + c1[1], 16), parseInt(c1[2] + c1[3], 16), parseInt(c1[4] + c1[5], 16)];
    c2 = [parseInt(c2[0] + c2[1], 16), parseInt(c2[2] + c2[3], 16), parseInt(c2[4] + c2[5], 16)];

    console.log('hex -> rgba: c1 => [' + c1.join(', ') + '], c2 => [' + c2.join(', ') + ']');

    // 4: blend
    let c3 = [ 
      (1 - percentage) * c1[0] + percentage * c2[0], 
      (1 - percentage) * c1[1] + percentage * c2[1], 
      (1 - percentage) * c1[2] + percentage * c2[2]
    ];

    console.log('c3 => [' + c3.join(', ') + ']');

    // 5: convert to hex
    c3 = '#' + this.componentToHex(c3[0]) + this.componentToHex(c3[1]) + this.componentToHex(c3[2]);

    console.log(c3);

    // return hex
    return c3;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ColourLibraryObject);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for the Math Library object
 ** Created by Oscar Rangel on 7/12/2016
 */

 // ES6 imports

class MathLibraryObject {

  constructor() {}

  toNumber (num) {
    if (this.isNumber(num)) {
        return Number(num);
    }
    return null;
  }

  isNumber (o) {
    return ! isNaN(o-0) && o !== null && o !== "" && o !== false && o !== true;
  }

  mathCompare (num1, comp, num2) {
    switch (comp) {
      case "EQ":
        return this.toNumber(num1) == this.toNumber(num2);
      case "NEQ":
        return this.toNumber(num1) != this.toNumber(num2);
      case "LT":
        return this.toNumber(num1) < this.toNumber(num2);
      case "LTE":
        return this.toNumber(num1) <= this.toNumber(num2);
      case "GT":
        return this.toNumber(num1) > this.toNumber(num2);
      case "GTE":
        return this.toNumber(num1) >= this.toNumber(num2);
      default:
        return false;
    }
  }

  mathMinMax (num1, comp, num2) {
    switch (comp) {
      case "MIN":
        return Math.min(this.toNumber(num1), this.toNumber(num2));
      case "MAX":
        return Math.max(this.toNumber(num1), this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathModulo (num1, comp, num2) {
    switch (comp) {
      case "MODULO":
        return this.toNumber(num1)%this.toNumber(num2);
      case "QUOTIENT":
        return Math.floor(this.toNumber(num1)/this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathConversionRadDeg (comp, num) {
    switch (comp) {
      case "DEGTORAD":
        return this.toNumber(num) * (Math.PI/180);
      case "RADTODEG":
        return this.toNumber(num) * (180/Math.PI);
      default:
        return 0;
    }
  }

  mathRoundPrecision (num,percision) {
    return Math.round(this.toNumber(num) * Math.pow(10, this.toNumber(percision))) / Math.pow(10, this.toNumber(percision))
  }

  //Define custom exceptions
}

/* harmony default export */ __webpack_exports__["a"] = (MathLibraryObject);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports




class TextLibraryObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */]{

        constructor(){
            super(' TextLibraryObject');
        }

    textComparison (text1, comp, text2) {
    switch (comp) {
        case "LESS":
            return text1.toString() < text2.toString();
        case "EQUAL":
            return text1.toString() == text2.toString();
        case "GREATER":
            return text1.toString() > text2.toString();
        default:
            return false;
        }
    }

    textTrim(text){
    return text.toString().trim();
     }

    textChangeCase(text, comp) {
    switch (comp) {
        case "UPPERCASE":
            return text.toString().toUpperCase();
        case "LOWERCASE":
            return text.toString().toLowerCase();
        default:
            return "";
        }
    }

    textSubstring(text, from, length){
    return text.toString().substring(Number(from),Number(from) + Number(length));
    }


    textContains(string, substring) {
    return ((string.toString().indexOf(substring)) !== -1);
    }

    textIndexOf(string, substring) {
    return string.toString().indexOf(substring);
    }

    textSplitAt(text, index) {
    return [text.toString().substring(0, Number(index)), text.toString().substring(Number(index))];
    }

    textSplitWith(string, separator) {
    return string.toString().split(separator.toString());
    }

    textReplace(textFrom, textTo, textSource){
    var returnText = textSource.toString();
    while (returnText.indexOf(textFrom.toString()) !== -1){
        returnText = returnText.toString().replace(textFrom.toString(),textTo.toString());
    }
    return returnText;
    }

    isText(text) {
    return (typeof text === 'string' || text instanceof String);
    }

    convertToText(data) {
    if( jQuery.isXMLDoc( data ) ) {
        return  (new XMLSerializer()).serializeToString(data);
    }
    else if( jQuery.isArray( data ) )  {
        return data.toString();
    }
    else if( typeof data == 'string' ) {
        return data;
    }
    else {
        return JSON.stringify(data);
    }
}

}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextLibraryObject);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Oscar Rangel on 21/12/16.
*/

class TimeLibraryObject {

    constructor() {}

    createTime (time) {

        return new Date (time);
    }

    createTimeNow () {
        return new Date();
    }

    createTimeFromTimestamp (timestamp) {
        return new Date(Number(timestamp));
    }

    createTimestampFromTime (time) {
        return new Date(time).getTime();
    }


    textFromTime (time, op) {
      var dateTime =  new Date(time);

      switch(op){
        case "DATE_TIME_12":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + a + " " + d + "/" + m + "/" + y;

        case "DATE_TIME_12_US":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + a + " " + m + "/" + d + "/" + y;

        case "DATE_TIME_24":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + d + "/" + m + "/" + y;

        case "DATE_TIME_24_US":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + m + "/" + d + "/" + y;

        case "TIME_12":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            return H + ":" + M + " " + a;

        case "TIME_24":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            return H + ":" + M;

        case "DATE":
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            return d + "/" + m + "/" + y;

        case "DATE_US":
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            return m + "/" + d + "/" + y;

        default:
            return "";
      }
    }

    elapsedComponent (timestamp, num) {
        return Math.floor(timestamp/num);
    }

    elapsedComponentsFromTime (time, components) {
        var dateTime =  new Date(time.getTime());
        var dateZeroTime = new Date(0);
        var y = dateTime.getUTCFullYear() - dateZeroTime.getUTCFullYear();
        var m =  dateTime.getUTCMonth() - dateZeroTime.getUTCMonth();
        var d =  dateTime.getUTCDate() - dateZeroTime.getUTCDate();
        var h =  dateTime.getUTCHours() - dateZeroTime.getUTCHours();
        var M =  dateTime.getUTCMinutes() - dateZeroTime.getUTCMinutes();
        var s =  dateTime.getUTCSeconds() - dateZeroTime.getUTCSeconds();

        switch(components) {
            case "S":
                return [s];
            case "SM":
                return [M,s];
            case "SMH":
                return [h,M,s];
            case "SMHD":
                return [d,h,M,s];
            case "SMHDM":
                return [m,d,h,M,s];
            case "SMHDMY":
                return [y,m,d,h,M,s];
            default:
                return [];
        }
    }

    componentsFromTime (time, components) {
        var dateTime =  new Date(time);
        switch(components) {
            case "S":
                return [dateTime.getSeconds()];
            case "SM":
                return [dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMH":
                return [dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHD":
                return [dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHDM":
                return [dateTime.getMonth()+1, dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHDMY":
                return [dateTime.getFullYear(), dateTime.getMonth()+1, dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            default:
                return [];
        }
    }

    numberDayOfWeekFromDate (time) {
        var dateTime =  new Date(time);
        if (dateTime.getDay() == 0)
            return 7;
        return dateTime.getDay();

    }

    stringDayOfWeekFromDate (time) {
        var dateTime =  new Date(time);
        var ar = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
        return ar[dateTime.getDay()];
    }
    createTimeInterval ( sec, min, hou, day, mon, yea) {
        return [sec,min,hou,day,mon,yea];
    }

    addIntervalFromTime (time, timeInt) {
        if (timeInt.constructor !== Array || timeInt.length != 6){
            return new Date(time);
        }
        var elap = this.componentsFromTime(time, "SMHDMY");
        var year = elap[0] + Number(timeInt[5]);
        var month = (elap[1] - 1) + Number(timeInt[4]);
        var day = elap[2] + Number(timeInt[3]);
        var hours = elap[3] + Number(timeInt[2]);
        var min =elap[4] + Number(timeInt[1]);
        var sec = elap[5] + Number(timeInt[0]);
        return new Date(year, month, day, hours, min, sec);
        //var retTime = new Date(time);
        //retTime.setSeconds(retTime.getSeconds() + Number(timeInt[0]));
        //retTime.setMinutes(retTime.getMinutes() + Number(timeInt[1]));
        //retTime.setHours(retTime.getHours() + Number(timeInt[2]));
        //retTime.setDate(retTime.getDate() + Number(timeInt[3]));
        //retTime.setMonth(retTime.getMonth() + Number(timeInt[4]));
        //retTime.setFullYear(retTime.getFullYear() + Number(timeInt[5]));
        //return retTime;
    }
    subtractIntervalFromTime (time, timeInt) {
        if (timeInt.constructor !== Array || timeInt.length != 6){
            return time;
        }
        var elap = this.componentsFromTime(time, "SMHDMY");
        var year = elap[0] - Number(timeInt[5]);
        var month = (elap[1] - 1) - Number(timeInt[4]);
        var day = elap[2] - Number(timeInt[3]);
        var hours = elap[3] - Number(timeInt[2]);
        var min =elap[4] - Number(timeInt[1]);
        var sec = elap[5] - Number(timeInt[0]);
        return new Date(year, month, day, hours, min, sec);
        //var retTime = new Date(time);
        //retTime.setSeconds(retTime.getSeconds() - Number(timeInt[0]));
        //retTime.setMinutes(retTime.getMinutes() - Number(timeInt[1]));
        //retTime.setHours(retTime.getHours() - Number(timeInt[2]));
        //retTime.setDate(retTime.getDate() - Number(timeInt[3]));
        //retTime.setMonth(retTime.getMonth() - Number(timeInt[4]));
        //retTime.setFullYear(retTime.getFullYear() - Number(timeInt[5]));
        //return retTime;
    }

    dateFormat (dateObj,format){
      var keys = {
        'yyyy': '1',
        'yy':'2',
        'y':'3',
        'MMMM':'4',
        'MMM':'5',
        'MM':'6',
        'M':'7',
        'dd':'8',
        'd':'9',
        'EEEE':'10',
        'EEE':'11',
        'HH':'12',
        'H':'13',
        'hh':'14',
        'h':'15',
        'mm':'16',
        'm':'17',
        'ssss':'18',
        'ss':'19',
        's':'20',
        'a':'21'
      };

      var result = format;
      var fullyear = dateObj.getFullYear();
      var year2dgt =  String(fullyear % 100);
      var month = String(dateObj.getMonth() + 1);
      var monthLit = ['January','February','March','April','May','June','July','August','September','October','November','December'][dateObj.getMonth()];
      var day = String(dateObj.getDate());
      var weekday = String(dateObj.getDay());
      var weekdayLit = ['Sunday','Monday','Thursday','Wednesday','Tuesday','Friday','Saturday'][dateObj.getDay()];
      var min = String(dateObj.getMinutes());
      var hour24 = String(dateObj.getHours());
      var hour12 = (Number(dateObj.getHours()) % 12).toString();
      var sc= String(dateObj.getSeconds());
      var msec = String(dateObj.getMilliseconds());
      var am_pm = (Number(dateObj.getHours()) >= 12)?'PM':'AM';

      // generate escape code
      var escChar = '%';
      while (format.search(escChar)>=0) escChar += '%';

      if (year2dgt.length==1) year2dgt = '0' + year2dgt;
      if (month.length==1) month = '0' + month;
      if (day.length==1) day = '0' + day;
      if (min.length==1) min = '0' + min;
      if (hour24.length==1) hour24 = '0' + hour24;
      if (hour12.length==1) hour12 = '0' + hour12;
      if (sc.length==1) sc = '0' + sc;
      if (msec.length==1) msec = '00' + msec;
      if (msec.length==2) msec = '0' + msec;

      if (Number(hour12) == 0) hour12 = '12';

      var escapeKey = function(string,key){
        return string.replace(key, escapedKey(key));
      }
      var escapedKey = function(key){
        return escChar + keys[key] + escChar;
      }
      var isolateKeys = function(format){
        var isolated = format;

        isolated = escapeKey(isolated,'yyyy');
        isolated = escapeKey(isolated,'yy');
        isolated = escapeKey(isolated,'y');
        isolated = escapeKey(isolated,'MMMM');
        isolated = escapeKey(isolated,'MMM');
        isolated = escapeKey(isolated,'MM');
        isolated = escapeKey(isolated,'M');
        isolated = escapeKey(isolated,'dd');
        isolated = escapeKey(isolated,'d');
        isolated = escapeKey(isolated,'EEEE');
        isolated = escapeKey(isolated,'EEE');
        isolated = escapeKey(isolated,'HH');
        isolated = escapeKey(isolated,'H');
        isolated = escapeKey(isolated,'hh');
        isolated = escapeKey(isolated,'h');
        isolated = escapeKey(isolated,'mm');
        isolated = escapeKey(isolated,'m');
        isolated = escapeKey(isolated,'ssss');
        isolated = escapeKey(isolated,'ss');
        isolated = escapeKey(isolated,'s');
        isolated = escapeKey(isolated,'a');
        return isolated;
      };

      result = isolateKeys(result);

      result = result.replace(escapedKey('yyyy'),fullyear);
      result = result.replace(escapedKey('yy'),year2dgt);
      result = result.replace(escapedKey('y'),Number(fullyear));

      result = result.replace(escapedKey('MMMM'),monthLit);
      result = result.replace(escapedKey('MMM'),monthLit.substr(0,3));
      result = result.replace(escapedKey('MM'),month);
      result = result.replace(escapedKey('M'),Number(month));

      result = result.replace(escapedKey('dd'),day);
      result = result.replace(escapedKey('d'),Number(day));

      result = result.replace(escapedKey('EEEE'),weekdayLit);
      result = result.replace(escapedKey('EEE'),weekdayLit.substr(0,3));

      result = result.replace(escapedKey('HH'),hour24);
      result = result.replace(escapedKey('H'),Number(hour24));

      result = result.replace(escapedKey('hh'),hour12);
      result = result.replace(escapedKey('h'),Number(hour12));

      result = result.replace(escapedKey('mm'),min);
      result = result.replace(escapedKey('m'),Number(min));

      result = result.replace(escapedKey('ssss'),msec);

      result = result.replace(escapedKey('ss'),sc);
      result = result.replace(escapedKey('s'),Number(sc));

      result = result.replace(escapedKey('a'),am_pm);

      return result;
    }

    getTimeFromTimezone (tz) {
        return new Date().toLocaleString('en-US', { timeZone: tz });
    }


}

/* harmony default export */ __webpack_exports__["a"] = (TimeLibraryObject);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class AnimationObject {

  constructor() {}

  animationMove(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "move";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationRotate(id, angle, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "rotate";
    anim.angle = angle;
    anim.duration = duration;
    return anim;
  }

  animationScale(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "scale";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationFade(id, alpha, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "fade";
    anim.alpha = alpha;
    anim.duration = duration;
    return anim;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AnimationObject);



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ApplicationObject {

  constructor() {}

  bringToForeground() {
    /*hs: not implementing this for now
    window.blur();
    setTimeout(window.focus, 0);
    */
  }

  sendToBackground() {
    /* hs: not implementing this for now.
    window.blur();
    */
  }

  getAppName() {
    return window.document.title;
  }

  quitApp() {
    window.close();
  }

  registerEvent(event, callback) {
  	switch(event) {
  		case 'start':
         console.log("Registering Started Event");
         $(window).ready(function() {
          if( callback != undefined ) {
            console.log("Application Started Event");
            callback();
          }
        });
  			break;
  		case 'in_background':
  			console.log("Registering background event");
        $(window).blur(function() {
           console.log("Application is in background");
           if( callback != undefined ) {
              callback();
           }
        });
        break;
  		case 'in_foreground':
        console.log("Registering foreground event");
        $(window).focus(function() {
           console.log("Application is in foreground");
           if( callback != undefined ) {
              callback();
           }
        });
  			break;
  		case 'back_button_press':
  			console.log("Registering back button press event");
        if (window.history && window.history.pushState) {
            window.history.pushState('forward', null, './#forward');
            $(window).on('popstate', function() {
              window.history.back();
              console.log("Back button event triggered");
              callback();
            });

        }
  			break;
  	}
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ApplicationObject);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class ButtonObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' button');
    }

    touchmove_x_y(elemSelector, callback){
        $(elemSelector).on("mousedown touchstart", function(event) {
            $(document.body).on("mousemove touchmove", function(touchmove){
                var ose = $(document.body).offset();
                var mousemove = touchmove.type === 'mousedown'||touchmove.type === 'touchstart',
                    pageX = mousemove ? touchmove.targetTouches[0].clientX : touchmove.clientX - ose.left,
                    pageY = mousemove ? touchmove.targetTouches[0].clientY : touchmove.clientY - ose.top;
                if(pageX<0 ||pageY<0){
                    pageX = 0;
                    callback(pageX,pageY);
                }else{
                    callback(pageX,pageY);
                }

            });
            $(document.body).on("mouseup touchend", function(release){
                $(document.body).off("mousemove touchmove"),
                    $(document.body).off("mousedown touchstart");
            });
        });
    }

    longclick_ev(elemSelector,callback){
        var timeout_id = 0,
            hold_time = 500;
        $(elemSelector).on("mousedown touchstart",function(e) {
            e.stopPropagation();
            timeout_id = setTimeout(function(){
                callback();
            },hold_time);
        }).bind('mouseup mouseleave touchend', function(ev) {
            clearTimeout(timeout_id);
        });
    }

    getElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]');
    }
}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ButtonObject);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Stub for connio object
** Created by Harish Shanthi Kumar on 16/12/2016
*/

class ConnioObject extends com.fc.JavaScriptDistLib.ConnioCore {

  constructor() {
    super();
    this.MQTTClient = null,
    this.MQTTMessageRecvCallback =  null
  }

  configureMQTT() {
    let parent = this;
    if ( !this.MQTTClient ) {
      try {
        if( this.config.BaseURL === '' || this.config.KEY === '' || this.config.Secret === '' ) {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }

        if( this.config.MQTTHost !== '' && this.config.MQTTPort !== '' && this.config.MQTTCientID !== '' &&
          this.config.MQTTUsername !== '' && this.config.MQTTPassword !== '' && this.config.App !== '' ) {
          this.MQTTClient = new Paho.MQTT.Client(this.config.MQTTHost, this.config.MQTTPort, this.config.MQTTCientID);
          // set callback handlers
          this.MQTTClient.onConnectionLost = function(responseObject) {
            parent.handleMQTTConnectionLost(responseObject);
          };
          this.MQTTClient.onMessageArrived = function(message) {
            parent.handleMQTTMessage(message);
          };
        }
        else {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }
      }
      catch(e) {
        console.log("Some of the properties are missing. Go to File->Connio Properties");
      }
    }

  }
  //HS: Deploy Alert!! All runtime objects needs to be reset here!
  reset() {
    this.MQTTClient = null;
    this.MQTTMessageRecvCallback = null;
  }

  connioStartTrackingPropertyChanges(callback) {
    this.configure();
    this.configureMQTT();
    this.MQTTMessageRecvCallback = callback;
    this.connio_mqtt_connect();
  }

  connioStopTrackingPropertyChanges() {
    this.connio_mqtt_disconnect();
  }


  connioReadData(device, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device;
    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          successcallback(response);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read data.");
        }
      });
  }

  connionGetValue(data, valueType, propertyName) {
    this.configure();
    let properties = data.properties;
    if( (properties !== undefined) && (properties.length>0) ) {
      for(let i=0; i<properties.length; i++) {
        let property = properties[i];
        let qname = property.descriptors.qname;

        if( qname.indexOf(propertyName) !== -1)  {
          let value = property.value[valueType];
          if( value!==undefined ) {
            return value;
          }
        }
      }
    }
    return "";
  }

  connioGetDeviceName(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( device.id === id ) {
          return device.name;
        }
      }
    }
    catch(e) {

    }

    return "";
  }

  connioGetDeviceLocation(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( (device.id === id) || (device.name === id) ) {
          let locationObj = {lat: device.location.geo.lat, lng: device.location.geo.lon};
          return locationObj;
        }
      }
    }
    catch(e) {
    }

    return "";
  }

  connioWriteData(device, value, property, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device + "/properties/" + property;
    let data = {};
    data.dps = [];
    let val = {};
    val.t = new Date().toISOString();
    val.v = value;
    data.dps.push(val);

    $.ajax(
      {
        url: url,
        type: 'POST',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret),
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(msg);
          console.log("Could not write data.");
        }
      });
  }

  connioExecuteMethod(device, method, data, successcallback, failurecallback) {
    this.configure();
  }

  connioReadHistorical(device, property, timeStart, timeEnd, descending, limit, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device + "/properties/" + property + "?";

    if( descending ) {
      let sorting = (descending ? "-" : "") + "source.time";
      url += "sort=" + sorting;
    }
    else {
      url += "sort=-source.time";
    }

    if( limit ) {
      url += "&limit=" + limit;
    }

    if (timeStart && timeEnd) {
      url += "&q=source.time:(" + timeStart.toISOString() + "+TO+" + timeEnd.toISOString() + ")";
    }

    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          let timeList = jsonPath(response, "$.results[:].t");
          let valueList = jsonPath(response, "$.results[:].v");
          let formattedTimeList = [];
          for (let i=0;i<timeList.length;i++) {
            formattedTimeList.push(com.fc.JavaScriptDistLib.TimeLibrary.dateFormat(new Date (timeList[i]),'MMM-d HH:mm a'));
          }
          timeList.reverse();
          formattedTimeList.reverse();
          successcallback(formattedTimeList, valueList);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read historical.");
        }
      });
  }

  connio_mqtt_connect() {
    console.log("Connecting to Connio MQTT...");
    let parent = this;
    try {
      this.MQTTClient.connect( {
        onSuccess: function() {
          console.log("Connected to Connio MQTT...");
          parent.subscribeToTopic();
        },
        userName : this.config.MQTTUsername,
        password : this.config.MQTTPassword,
        keepAliveInterval: 25,
        timeout: 60,
        useSSL: true
      });
    }
    catch(e) {
      console.log("Connio MQTT connection failed.")
    }
  }

  connio_mqtt_disconnect() {
    console.log("Disconnecting Connio MQTT...");
    this.MQTTClient.disconnect();
  }

  subscribeToTopic() {
    console.log("Subscribing to topic...");
    let parent = this;
    let subscribeOptions = {
      qos: 0,  // QoS
      invocationContext: {foo: true},
      onSuccess: (context) => {
        parent.handleMQTTSubscribeSuccess(context);
      },
      onFailure: (context) => {
        parent.handleMQTTSubscribeFailed(context);
        console.log("Could not subscribe to topic");
      },
      timeout: 10
    };

    this.MQTTClient.subscribe(this.config.MQTTTopic, subscribeOptions);
  }

  handleMQTTConnectionLost(responseObject) {
    console.log("Connection Lost: " + responseObject.errorMessage);
  }

  handleMQTTSubscribeSuccess(context) {
    console.log("Subscribe success");
  }

  handleMQTTSubscribeFailed(context) {
    console.log("Subscribe failed");
  }

  handleMQTTMessage(message) {
    //console.log("Connio MQTT Message Arrived: " + message.destinationName + " " + message.payloadString);
    if( this.MQTTMessageRecvCallback ) {
      let messageArray = message.destinationName.split("/");
      this.MQTTMessageRecvCallback(messageArray[4], messageArray[6], message.payloadString);
    }
  }

  ConnioConfigException(snappMessage, msg) {
    this.name = "ConnioConfigException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

  ConnioNetworkException(snappMessage, msg) {
    this.name = "ConnioNetworkException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }


  ConnioMQTTException(snappMessage, msg) {
    this.name = "ConnioMQTTException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ConnioObject);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by lorenzo on 05/04/17.
 */



class ContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {

        super(' .container');
    }
}

// ES6 exports

/* harmony default export */ __webpack_exports__["a"] = (ContainerObject);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class DictionaryObject {

  constructor() {}

  createEmptyDictionary () {
    var dict = {};
    return dict;
  }

  removeAllKeys (dictionary) {
    for( var key in dictionary ) {
      delete dictionary[key];
    }
    return dictionary;
  }

  getKeys (dictionary) {
    var keys = [];
    for( var key in dictionary ) {
      keys.push(key);
    }
    return keys;
  }

  getDictValue (dictionary,key) {
    return dictionary[key];
  }

  setDictValue (dictionary,key,value) {
    return dictionary[key] = value;
  }

  removeDictKey (dictionary,key) {
    return delete dictionary[key];
  }

  conatinedInDict (dictionary,key) {
    return (dictionary[key] != undefined ) ? true : false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DictionaryObject);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 24/04/17.
 */

// ES6 imports


class GaugeObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();

        const self = this;
        this.gauge = [];

        $(document).ready(function() {
            //setTimeout( function() {
            $('.element.fc.Gauge').each(function (obj) {
                let objName = $(this)[0].getAttribute('obj-name');
                self.gauge[objName] = self.init(objName);
                //    self.graph[objName].unload();    this is used to hide the Graph when the preview has been loaded
            });
            //   }, 1000);
        });

        this.getProperty = Object.assign(this.getProperty, {
            'Alpha': (objName) => {
                return $(this.getGaugeElemFromName(objName)).css('opacity') * 100;
            },

            'Background color': (objName) => {
                return $(this.getGaugeElemFromName(objName)[0]).css("background-color");
            },

            'Current Value': (objName) => {
               return this.gauge[objName].data()[0].values[0].value;
            },

            'Maximum Value': (objName) => {
                return this.gauge[objName].internal.config.gauge_max;
            },

            'Minimum Value': (objName) => {
                return this.gauge[objName].internal.config.gauge_min;
            },

            'track color': (objName) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                return d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill');

            },

            'pointer color': (objName) => {
                return d3.selectAll(this.getGaugeElemFromName(objName)).select('path.c3-arc-data').style('fill');

            },

            'track width': (objName) => {
                return this.gauge[objName].internal.config.gauge_width;

            }

        });

        this.setProperty = Object.assign(this.setProperty, {
            'Alpha': (objName, value) => {
                d3.selectAll(this.getGaugeElemFromName(objName)).style('opacity', value/100)


            },

            'Background color': (objName, value) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                $(elemSelector + ' svg').css("background-color",value);


            },

            'Current Value': (objName, value) => {
                this.gauge[objName].load({columns: [['data', value]]});
                var el = this.gauge[objName];
               // this.gauge[objName] = this.gaugeRender(objName)


            },

            'Maximum Value': (objName, value) => {
                this.gauge[objName].internal.config.gauge_max = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});

            },

            'Minimum Value': (objName, value) => {

                this.gauge[objName].internal.config.gauge_min = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});
            },

            'track color': (objName, value) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill', value)


            },

            'pointer color': (objName, value) => {
                d3.selectAll(this.getGaugeElemFromName(objName)).select('path.c3-arc-data').style('fill', value);


            },

            'track width': (objName, value) => {
                this.gauge[objName].internal.config.gauge_width = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});

            }
        });

    }

    getGaugeElemFromName (objName) {
        return this.getElemFromName(objName).find('#fcGauge');
    }

    init(objName) {

        var $is = this.getGaugeElemFromName(objName)[0];
        var ele = $is;

        //    this.$el.css({
        //      "opacity": this.getGaugeElemFromName(objName)[0].getAttribute('opacity')
        //});


        var bg = this.getProperty["Background color"](objName);
        var gaugeMin = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeMin');
        var gaugeMax = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeMax');
        var gaugeVal = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeVal');
        var gaugeTrackWidth = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeTrackWidth');
        var gaugeTrackColor = this.getProperty["track color"](objName);
        var gaugePointerColor = this.getProperty["pointer color"](objName);

        const self = this;

        // let gaugeRender2 = function(objName) {
        //
        //     if (self.gauge[objName]) {
        //         bg = self.getProperty["Background color"](objName);
        //         gaugeMin = self.getProperty["Minimum Value"](objName);
        //         gaugeMax = self.getProperty["Maximum Value"](objName);
        //         gaugeVal = self.getProperty["Current Value"](objName);
        //         gaugeTrackColor = self.getProperty["track color"](objName);
        //         gaugePointerColor = self.getProperty["pointer color"](objName );
        //         self.setProperty["pointer color"](objName, gaugePointerColor);
        //         self.setProperty["track color"](objName, gaugeTrackColor);
        //     }
        // };

        this.getGaugeElemFromName(objName).css({
            "background-color": bg
        });


        var gauge = c3.generate({
            bindto:$is,
            data: {
                columns: [
                    ['data', gaugeVal]
                ],
                type: 'gauge',
                color: function (color, d) {
                        return self.getProperty["pointer color"](objName) == 'none' ? color : self.getProperty["pointer color"](objName);
            }
            },
            oninit: function() {
                d3.select(ele).selectAll('path.c3-chart-arcs-background').style("fill", self.getProperty["track color"](objName));
            },
            gauge: {
                min: gaugeMin,
                max: gaugeMax,
                width: gaugeTrackWidth, // for adjusting arc thickness,
                expand: true,
                startingAngle:0,
                label: {
                    format: function(value, ratio) {
                        return "";
                    },
                    show: false
                },

            },
            color: {
                pattern: [gaugePointerColor]
            },
            size: {
                height: self.getProperty["height"](objName) / 2,
                width: self.getProperty["width"](objName)
            },
            tooltip: {
                show: false
            }
        });

        return gauge;


    }

    // animationStart(objName, animation, onCompleteCallback) {
    //     if (animation.type === 'scale') {
    //         let duration = animation.duration*1000;
    //         let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};
    //         let elemDiv = this.getElemFromName(objName);
    //         let elemSvg = $('[obj-name="'+objName+'"] svg');
    //         let newWidth = elemDiv.width() * animation.dX;
    //         let newHeight = elemDiv.height() * animation.dY;
    //         let leftDelta = (newWidth - elemDiv.width()) / 2;
    //         let topDelta = (newHeight - elemDiv.height()) / 2;
    //         var zoom = elemDiv[0].style.transform +' scaleX('+animation.dX+') scaleY('+animation.dY+')';
    //         elemDiv.animate({'transform': zoom}, options);
    //         //
    //         //  newWidth = elemSvg.width() * animation.dX;
    //         //  newHeight = elemSvg.height() * animation.dY;
    //         //  leftDelta = (newWidth - elemSvg.width()) / 2;
    //         //  topDelta = (newHeight - elemSvg.height()) / 2;
    //         // elemSvg.animate({width:newWidth+'px', height:newHeight+'px', left: '-='+leftDelta+'px', top: '-='+topDelta+'px'}, options);
    //         // elemDiv.dequeue(animation.id);
    //         elemDiv.dequeue(animation.id);
    //     }
    //     else  super.animationStart(objName, animation, onCompleteCallback)
    // };
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GaugeObject);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 19/04/17.
 */

// ES6 imports


class GraphContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();
        // this.this.getGraphElemFromName(objName)Ref = this.getGraphElemFromName(objName)Ref || '';
        const self = this;
        this.graph = [];
        $(document).ready(function() {
            //setTimeout( function() {
                $('.element.fc.GraphContainer').each(function (obj) {
                    let objName = $(this)[0].getAttribute('obj-name');
                    let chartData = {};
                    chartData.columns = [['Data', 10, 20, 30, 40, 50]]
                    chartData.unload = true;
                    self.graph[objName] = self.init(chartData, objName);
                //    self.graph[objName].unload();    this is used to hide the Graph when the preview has been loaded
                });
         //   }, 1000);
        });

        this.getProperty = Object.assign(this.getProperty, {
            'BG Color': (objName) => {
                return this.getGraphElemFromName(objName).css('background-color');
            },

            'Type': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('graphType');
            },
            'Legends': (objName) => {
               // let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').style("visibility") == 'visible'? true : false ;
               // return val;
                return this.getGraphElemFromName(objName)[0].getAttribute('legendShow') === 'true'
            },

            'Grid': (objName) => {
               // let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-grid').style('visibility') == 'visible'? true : false ;
              //  return val;
                return this.getGraphElemFromName(objName)[0].getAttribute('gridShow') === 'true'
            },

            'X Axis Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').html();
            },

            'Y Axis Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').html();
            },

            'X Axis Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke");
            },

            'Y Axis Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke");
            },

            'X Axis Text Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill");
            },

            'Y Axis Text Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill");
            },

            'X Axis Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width");
            },

            'Y Axis Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width");
            },

            'Legend Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-x-label').style("stroke");
            },

            'Fill Alpha': (objName) => {
                let type = this.getProperty["Type"](objName);
                if (type == 'line')
                    return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('opacity') * 100;
                else return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity') * 100;
            },

            'Fill Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('fill');
            },

            'Bar Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bar').selectAll('path').style('fill');
            },

            'Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width");
            },

            'Line Circle Color': (objName) => {
                    return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("stroke");
            },

            'Line Filled': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('linePlotDrawfilled') === 'true';
            },

            'Smooth Line': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('linePlotSmoothline') === 'true';
            },

            'Circle Radius': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').attr('r');
            },

            'Draw Line Values': (objName) => {
                let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-text').selectAll('text').style("visibility") == 'visible'? true : false ;
                return val;
            },

            'Draw Values': (objName) => {
                return this.getProperty['Draw Line Values'](objName); //d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-text').style("opacity");
            },

            'Axis Font Size': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size');
            }
        });

        this.setProperty = Object.assign(this.setProperty, {

            'BG Color': (objName, value) => {
                this.getGraphElemFromName(objName).css('background-color',value);
            },

            'Type': (objName, value) => {
                this.getGraphElemFromName(objName).attr('graphType', value);
                this.graph[objName].transform(value);
            },

            'Legends': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                this.getGraphElemFromName(objName).attr('legendShow', value)
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').style("visibility", show);
            },

            'Grid': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                this.getGraphElemFromName(objName).attr('gridShow', value)
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-grid').style('visibility',show);
            },

            'X Axis Text': (objName, value) => {
                this.graph[objName].axis.labels({x: value});
            },

            'Y Axis Text': (objName, value) => {
                this.graph[objName].axis.labels({y: value});
            },

            'X Axis Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke", value);
            },

            'Y Axis Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke", value);
            },

            'X Axis Text Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", value);
            },

            'Y Axis Text Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", value);
            },

            'X Axis Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", value);
            },

            'Y Axis Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", value);
            },

            'Legend Text': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-x-label').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-y-label').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').selectAll('text').style("stroke", value);
            },

            'Fill Alpha': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('opacity',value/100);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity',value/100);
            },

            'Fill Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('fill',value);
            },

            'Bar Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bar').selectAll('path').style('fill',value)
            },

            'Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width", value);
            },

            'Line Circle Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("fill", value);
            },

            'Circle Radius': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').attr('r',value);
            },

            'Draw Line Values': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-text').selectAll('text').style("visibility", show);
            },

            'Draw Values': (objName, value) => {
                this.setProperty["Draw Line Values"](objName, value);
            },

            'Axis Font Size': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size',value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size',value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-text').style('font-size',value);
            },

            'Line Filled': (objName, value) => {
                if (value)
                    this.graph[objName].transform('area');
                else
                    this.graph[objName].transform('line');
                this.getGraphElemFromName(objName).attr('linePlotDrawfilled', value)
            },

            'Smooth Line': (objName, value) => {
                if (value)
                    this.graph[objName].transform('area-spline');
                else
                    this.graph[objName].transform('area');
                this.getGraphElemFromName(objName).attr('linePlotSmoothline', value)
            }
        });
    }

    getGraphElemFromName (objName) {
        return this.getElemFromName(objName).find('#fcLine');
    }
    
    createChartWithList(objName,xArr,yArr,name) {

        let graph = this.graph[objName];
        let xAxisData = [];
        let yAxisData = [];

        if( yArr!=null ) {

            let populateXAxis = false;

            if( xArr!=null ) {
                for(let xIndex=0; xIndex<xArr.length; xIndex++) {
                    xAxisData.push(xArr[xIndex]);
                }
            }
            else {
                populateXAxis = true;
            }

            yAxisData.push(name);
            for(let i=0; i<yArr.length; i++) {
                yAxisData.push(yArr[i]);
                if( populateXAxis )
                    xAxisData.push(i);
            }

            let chartData = {};
            chartData.columns = [];
            chartData.columns.push(yAxisData);
            chartData.categories = xAxisData;
            chartData.unload = true;

            return graph.load(chartData);

        } else { throw this.graphException(e); }
    }

    addChartTransition(objName,x,y) {

        let graph = this.graph[objName];
        let dataArr = [graph.data()[0].id];
        let graphInitArr = [graph.data()[0].id];

        for (let i=0;i<graph.data()[0].values.length;i++) {
            graphInitArr.push(0); // ReInit the Graph
        }
        for (let i=0;i<graph.data()[0].values.length;i++) {
            dataArr.push(graph.data()[0].values[i].value);
        }
        let initGraph = graph.load({
            columns: [graphInitArr]
        });

        let updatedGraph = setTimeout(function () {
            graph.load({  columns: [dataArr]  });
        }, x);

        return [initGraph,updatedGraph];
    }

    addValuesToChart(objName,xVal,yVal,name) {

        let graph = this.graph[objName];
        let xAxisArr = graph.categories();
        xAxisArr.push(xVal);
        let yAxisArr = [name];
        let graphData = graph.data()[0].values;

        for (let i=0;i<graphData.length;i++) {
            yAxisArr.push(graphData[i].value);
        }

        yAxisArr.push(yVal);
        let chartData = {};
        chartData.columns = [];
        chartData.columns.push(yAxisArr);
        chartData.categories = xAxisArr;
        chartData.unload = true;
    
        return graph.load(chartData);
    }

    graphException(snappMessage, msg) {
        this.name = "GraphException";
        this.snappMessage = snappMessage;
        //custom message from snapp.
        this.message = msg || snappMessage;
        this.stack = (new Error()).stack;
    }

    init(chartData, objName) {

        let ele = this.getGraphElemFromName(objName)[0];
        let graphType  = ele.getAttribute('graphType');
        let circleColor = graphType == 'line' ? this.getProperty["Line Circle Color"](objName): '';
        let fillAlpha = this.getProperty["Fill Alpha"](objName);
        let fillColor = graphType == 'line' ? this.getProperty["Fill Color"](objName) : this.getProperty["Bar Color"](objName);
        let linePlotWidth = graphType == 'line' ? this.getProperty["Line Width"](objName) : '';
        let axisFontSize = this.getProperty["Axis Font Size"](objName);
        let xAxisLabelText = this.getProperty["X Axis Text"](objName);
        let yAxisLabelText = this.getProperty["Y Axis Text"](objName);
        let xAxisColor = this.getProperty["X Axis Color"](objName);
        let yAxisColor = this.getProperty["Y Axis Color"](objName);
        let xAxisTextColor = this.getProperty["X Axis Text Color"](objName);
        let yAxisTextColor = this.getProperty["Y Axis Text Color"](objName);
        let xAxisLineWidth = this.getProperty["X Axis Line Width"](objName);
        let yAxisLineWidth = this.getProperty["Y Axis Line Width"](objName);
        let legendTextColor = this.getProperty["Legend Text"](objName);
        let drawLineValues = this.getProperty["Draw Line Values"](objName);
        let drawBarValues = this.getProperty["Draw Values"](objName);
        let legendShow = this.getProperty["Legends"](objName);
        let gridShow = this.getProperty["Grid"](objName);
        let circleRadius = graphType == 'line' ? this.getProperty["Circle Radius"](objName) : '';
        let fillBarAlpha = fillAlpha;
        let chartType;

        if (graphType == 'line') {
            if (ele.getAttribute('linePlotSmoothline')) {
                if (ele.getAttribute('linePlotDrawfilled'))
                    chartType = "area-spline";
                else
                    chartType = "spline";
            } else {
                if (this.getGraphElemFromName(objName)[0].getAttribute('linePlotDrawfilled'))
                    chartType = "area";
                else
                    chartType = "line";
            }
        } else {
            //BAR
            chartType = "bar";
        }
        const self = this;

        let lineInit = function(objName) {

            if (self.graph[objName]) {
                ele = self.getGraphElemFromName(objName)[0];
                graphType  = self.getProperty["Type"](objName);
                circleColor = graphType == 'line' ? self.getProperty["Line Circle Color"](objName) : '';
                fillAlpha = self.getProperty["Fill Alpha"](objName);
                fillColor = graphType == 'line' ? self.getProperty["Fill Color"](objName) : self.getProperty["Bar Color"](objName);
                linePlotWidth = graphType == 'line' ? self.getProperty["Line Width"](objName): '';
                axisFontSize = self.getProperty["Axis Font Size"](objName);
                xAxisLabelText = self.getProperty["X Axis Text"](objName);
                yAxisLabelText = self.getProperty["Y Axis Text"](objName);
                xAxisColor = self.getProperty["X Axis Color"](objName);
                yAxisColor = self.getProperty["Y Axis Color"](objName);
                xAxisTextColor = self.getProperty["X Axis Text Color"](objName);
                yAxisTextColor = self.getProperty["Y Axis Text Color"](objName);
                xAxisLineWidth = self.getProperty["X Axis Line Width"](objName);
                yAxisLineWidth = self.getProperty["Y Axis Line Width"](objName);
                legendTextColor = self.getProperty["Legend Text"](objName);
                drawLineValues = self.getProperty["Draw Line Values"](objName);
                drawBarValues = self.getProperty["Draw Values"](objName);
                legendShow = self.getProperty["Legends"](objName);
                gridShow = self.getProperty["Grid"](objName);
                circleRadius = graphType == 'line' ? self.getProperty["Circle Radius"](objName) : '';
                fillBarAlpha = fillAlpha;

                if (graphType == 'line') {
                    if (self.getProperty["Smooth Line"](objName)) {
                        if (self.getProperty["Line Filled"](objName))
                            chartType = "area-spline";
                        else
                            chartType = "spline";
                    } else {
                        if (self.getProperty["Line Filled"](objName))
                            chartType = "area";
                        else
                            chartType = "line";
                    }
                } else {
                    //BAR
                    chartType = "bar";
                    fillColor =  self.getProperty["Bar Color"](objName);
                }
            }

            d3.select(ele).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", xAxisTextColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", yAxisTextColor);
            d3.select(ele).selectAll('text.c3-axis-x-label').style("stroke", legendTextColor);
            d3.select(ele).selectAll('text.c3-axis-y-label').style("stroke", legendTextColor);
            d3.select(ele).selectAll('g.c3-legend-item').selectAll('text').style("stroke", legendTextColor);
            d3.select(ele).selectAll('g.c3-texts').selectAll('text').style("fill", legendTextColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('path').style("stroke", xAxisColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('path').style("stroke", yAxisColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('g.tick').selectAll('line').style("stroke", xAxisColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('g.tick').selectAll('line').style("stroke", yAxisColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", xAxisLineWidth);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", yAxisLineWidth);

            if (legendShow) {
                d3.select(ele).selectAll('text.c3-axis-x-label').style("visibility", 'visible');
                d3.select(ele).selectAll('text.c3-axis-y-label').style("visibility", 'visible');
                d3.select(ele).selectAll('g.c3-legend-item').style("visibility", 'visible');
            } else {
                d3.select(ele).selectAll('g.c3-legend-item').style("visibility", 'hidden');
            }

            if (gridShow)
                d3.select(ele).selectAll('g.c3-grid').style('visibility', 'visible');
            else
                d3.select(ele).selectAll('g.c3-grid').style('visibility', 'hidden');

            //Draw Values
            if (graphType != 'bar') {
                if (drawLineValues)
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'visible');
                else
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'hidden');
            }

            if (graphType == 'bar') {
                if (drawBarValues)
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'visible');
                else
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'hidden');
            }

            d3.select(ele).selectAll('circle').style("stroke", circleColor);
            d3.select(ele).selectAll('circle').style("fill", circleColor);
            d3.select(ele).selectAll('.c3-area ').style('opacity', fillAlpha);
            d3.select(ele).selectAll('.c3-area ').style('fill', fillColor);
            d3.select(ele).selectAll('.c3-shape ').style('stroke', fillColor);
            d3.select(ele).selectAll('path.c3-line').style('stroke-width', linePlotWidth);
            //Bar
            d3.select(ele).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity', fillBarAlpha);
            d3.select(ele).selectAll('g.c3-chart-bar').selectAll('path').style('fill', fillColor);
            //Font Size
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size', axisFontSize);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size', axisFontSize);
            d3.select(ele).selectAll('text.c3-text').style('font-size', axisFontSize);
        };

        this.getGraphElemFromName(objName).css({
            "background-color": this.getProperty["BG Color"](objName)
        });

        let graph = c3.generate({
            bindto: ele,
            data: {
                columns: chartData.columns,
                labels: true,
                types: {Data :chartType},
                colors: {
                    Data : fillColor
                }
            },
            size: {
                width: parseInt(this.getElemFromName(objName)[0].style['width'], 10),
                height: parseInt(this.getElemFromName(objName)[0].style['height'], 10)
            },
            color: {
                pattern: [fillColor]
            },
            onrendered: function () {
                try {
                    lineInit(objName);
                }  catch (e) {
                }
            },
            point: {r:circleRadius},
            transition: {
                duration: 350
            },
            grid: {
                x : {
                    show:true
                },
                y: {
                    show:true
                }
            },
            axis: {
                x: {
                    type: 'category',
                    categories: ['1', '2','3','4','5'],
                    min:0,
                    label: {
                        text: xAxisLabelText
                    }
                },
                y: {
                    label: {
                        text: yAxisLabelText
                    },
                    tick: {
                        format: d3.format('.0f')
                    }
                }
            }
        });

        return graph;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GraphContainerObject);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class ImageObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super(' image');

        var self = this;

        this.getProperty['Image'] = function(objName) {
            return this.getElemFromName(objName).attr('src');
        };

        this.getProperty['Scaling'] = function(objName) {
            return this.getElemFromName(objName).attr('scale-type');
        };

        this.setProperty['Image'] = function(objName, value) {
            let elemSelector = '[obj-name="' + objName + '"]';
            let elem = $(elemSelector);
            elem.find('img').attr('src',value);
        };

        this.setProperty['Scaling'] = function(objName, value) {
            let elemSelector = '[obj-name="' + objName + '"]';
            let elem = $(elemSelector);
            
            switch (value) {
              case "stretch":
                $(elemSelector + ' img').css('width','inherit');
                $(elemSelector + ' img').css('height','inherit');
                $(elemSelector + ' img').attr('scale-type','stretch');
                break;
              case "fit":
                $(elemSelector + ' img').css('width','inherit');
                $(elemSelector + ' img').css('height','initial');
                $(elemSelector + ' img').attr('scale-type','fit');
                break;
              case "crop":
                $(elemSelector + ' img').css('width','initial');
                $(elemSelector + ' img').css('height','initial');
                $(elemSelector + ' img').attr('scale-type','crop');
                break;
          }
        };
    }

    createImageFromUrl(url, successCallBack) {
      successCallBack (url);
    }

    getWidth (image) {
        let img = new Image();
        img.src = image;
        let width = img.width;
        return width;
    }

    getHeight (image) {
        let img = new Image();
        img.src = image;
        let height = img.height;
        return height;
    }

    isImage (image) {

        let img = new Image();
        img.src = image;
        let width = img.width;
        if (width > 0) {
            return true;
        }
        return false;
    }

    applyFilter (image,effect,obj) {
        let elemSelector = '[obj-name="'+obj+'"]'; 
        let elem = $(elemSelector + ' img');
        switch (effect) {
            case "B&W":
                $(elem).css('filter','grayscale(1)');
            break;
            case "SEPIA":
                $(elem).css('filter','sepia(1)');
            break;
        }
        return image;
    }

    resize (image,width,height,obj) {
        let elemSelector = '[obj-name="'+obj+'"]';
        let elem = $(elemSelector + ' img');
        $(elem).width(width);
        $(elem).height(height);
        return image;
    }

    isImageEqual (image1,image2) {
        let firstImage = new Image();
        let secondImage = new Image();
        firstImage.src = image1;
        secondImage.src = image2;
        if (this.getBase64Image(firstImage) === (this.getBase64Image(secondImage))) {
            return true;
        }
    }

    getBase64Image(img) { 
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    getAverageColourFromImage (image,success) {
        let img = new Image ();
        img.src = image;
        let colour = this.getAverageRGB (img,5);
        success (colour);
    }

    getAverageRGB(imgEl,size) {
    
        let blockSize = size, // only visit every <size> pixels
            defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;
        
        if (!context) {
            return defaultRGB;
        }
        
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        
        context.drawImage(imgEl, 0, 0);
    
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }
        
        length = data.data.length;
        
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
        
        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);
        
        return 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
    
    }

    getPrimaryColour (image,success) {
        let img = new Image ();
        img.src = image;
        let ele = $(img);
        var colorThief = new ColorThief();
        let palette = colorThief.getPalette(img,2); 
        let primaryColour = 'rgb('+palette[0][0]+','+palette[0][1]+','+palette[0][2]+')';
        success (primaryColour);
    }

    getSecondaryColour (image,success) {
        let img = new Image ();
        img.src = image;
        let ele = $(img);
        var colorThief = new ColorThief();
        let palette = colorThief.getPalette(img,2);
        let secondaryColour = 'rgb('+palette[1][0]+','+palette[1][1]+','+palette[1][2]+')';
        success (secondaryColour);
    }


    ImageException(msg) {
      let error = new Error(msg);
      error.name = "ImageException";
      throw error;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ImageObject);



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class JsonObject {

  constructor() {}

  parseJSONDataForPath (data, path) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
      }
      catch(e) {
      }
    }
    else if( typeof(data) == 'object') {
      jsonObject = data;
    }
    let jsonPathObject = jsonPath(jsonObject, path);
    //=== is very important. Otherwise 0 will be treated as false as well.
    if( jsonPathObject === false ) {
      jsonObject = {};
      return jsonObject;
    }
    else {
      return jsonPathObject;
    }
  }

  parseJSONDataWithCallback (data, successcallback, failurecallback) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
        successcallback(jsonObject);
      }
      catch(e) {
        failurecallback(e);
      }
    }
    else if( typeof(data) == 'object') {
      successcallback(data);
    }
    else {
      failurecallback("Not a valid JSON");
    }
  }

  parseJSONData (data) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
      }
      catch(e) {
        e['snappMessage'] = 'The input data does not seem a JSON object';
        throw (e);
      }
      return jsonObject;
    }
    else if( typeof(data) == 'object') {
      return data;
    }
    else {
      return jsonObject;
    }
  }

  isValidJSON (data) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
        return true;
      }
      catch(e) {
        return false;
      }
    }
    else if( typeof(data) == 'object') {
      return true;
    }
    else {
      return false;
    }
  }

  covertToJSON (data) {
    // return this.parseJSONData(data);
    return JSON.stringify(data);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (JsonObject);



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class LabelObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' .label');
        // this.elemSelectorRef = elemSelectorRef || '';
        var self = this;

        this.getProperty = Object.assign(this.getProperty, {
            Text: (objName) => {
                let textFormat = this.getTextElemFromName(objName)[0].getAttribute('textFormat');
                if (textFormat == 'Plain Text') {
                    return this.getTextElemFromName(objName)[0].getAttribute('plain_text');
                } else return this.getTextElemFromName(objName).html();
            },
            'Max lines': (objName) => {
                return this.getElemFromName(objName).css('-webkit-line-clamp');
            }
        });
        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                let textFormat = this.getTextElemFromName(objName)[0].getAttribute('textFormat');
                if (textFormat == 'Plain Text') {
                    this.getTextElemFromName(objName).attr('plain_text', value)
                    var data = $('<div>').text(value.replace(RegExp('\\\\n', 'g'), '\n').replace(RegExp('\\\\t', 'g'), '\t')).html().replace(/\n/g,"<br />").replace(/\t/g,"&nbsp;");
                    this.getTextElemFromName(objName).html(data);
                } else  {
                    this.getTextElemFromName(objName).html(value.replace(RegExp('\\\\n|\\\\t|\\\\r|\\\\r\\\\n', 'g'), ''));
                }
            },
            'Max lines': (objName, value) => {
                var elemSelector2 = '[obj-name= "' + objName + '"]';
                $(elemSelector2 + ' div.label').css({
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'display': '-webkit-box',
                    '-webkit-line-clamp': value.toString(),
                    '-webkit-box-orient': 'vertical',
                    'height': 'auto',
                    'padding': '0'
                })
            }
        });

    };

    //
    //this.getProperty['Max lines'] = function(objName) {
    //    return this.getElemFromName(objName).css('-webkit-line-clamp');
    //};
    //
    //this.setProperty['Max lines'] = function(objName, value) {
    //    var elemSelector2 = '[obj-name= "' + objName + '"]';
    //    $(elemSelector2 + ' div.label').css({
    //      'overflow': 'hidden',
    //      'text-overflow': 'ellipsis',
    //      'display': '-webkit-box',
    //      '-webkit-line-clamp': value.toString(),
    //      '-webkit-box-orient': 'vertical',
    //      'height': 'auto',
    //      'padding':'0'
    //});
};

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (LabelObject);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for list object
** Created by Harish Shanthi Kumar on 09/12/2016
*/

// ES6 imports

class ListsObject {

  constructor() {}

  listAdd (list,item) {
    return list.push(item);
  }

  listContains (list,item) {
    return (list.indexOf(item) > -1) ? true : false;
  }

  listAppend (list1,list2) {
    return list1.concat(list2);
  }

  listCheck (list) {
    return (list instanceof Array) ? true: false;
  }

  listEmpty (list) {
    return list.length = 0;
  }

  listOrder (list,order) {
    list.sort(function(a, b){
      if( order == "ASCENDING" ) {
        return a-b;
      }
      else {
        return b-a;
      }
    });
  }

  //Define custom exceptions pertaining to network module here.
  ListsUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'ListsUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  ListsNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'ListsNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ListsObject);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Location Module
** Created by Harish Shanthi Kumar on 18/14/2017
*/
class LocationObject {
  
  	constructor() {
  		this.watchID = null;
  	}

	locationCreate (lat,lng) {
	  var locationObj = {lat: lat, lng: lng};
	  return locationObj;
	}

	locationCreateFull(lat, lng, altitude, speed) {
	  var locationObj = {lat: lat, lng: lng, altitude: altitude, speed: speed};
	  return locationObj;
	}

	locationCreateHere() {
		var locationObj = {lat: 0.0, lng: 0.0};
		return locationObj;
	}

	locationGetLatitude(loc) {
		return loc.lat;
	}

	locationGetLongitude(loc) {
		return loc.lng;
	}

	locationGetAltitude(loc) {
		return loc.altitude;
	}

	locationGetSpeed(loc) {
		return loc.speed;
	}

	locationGetDistance(loc1, loc2) {
	  var p = 0.017453292519943295;    // Math.PI / 180
	  var c = Math.cos;
	  var a = 0.5 - c((loc2.lat - loc1.lat) * p)/2 + 
	          c(loc1.lat * p) * c(loc2.lat * p) * 
	          (1 - c((loc2.lng - loc1.lng) * p))/2;
	  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}

	createLocationFromText(text, successCallback, errorCallback) {
		console.log ("createLocationFromText " + text);
		var locationArr = text.split(",");
		if( locationArr.length == 2 ) {
			console.log (locationArr);
			var latitude = locationArr[0];
			var longitude = locationArr[1];
			var locationObj = {lat: latitude, lng: longitude};
			successCallback (locationObj);
		}
		else {
			errorCallback ("Invalid Location");
		}
	}

	locationStartTrack(precision, successCallback) {
		var locCallback = function(position) {
			var locationObj = {lat: position.coords.latitude, lng: position.coords.longitude};
			successCallback(locationObj);
		}
		this.watchID = navigator.geolocation.watchPosition(locCallback);
	}

	locationStopTrack() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	locationCheckGPS() {
		return navigator.geolocation;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (LocationObject);



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class NetworkObject {

  constructor() {}

  createHTTPRequest (url, method) {
    let request = {};
    let protocol = url.split(':')[0];
    if( (method === 'GET' || method === 'POST' || method === 'PUT' || method === 'DELETE') &&
        (protocol === 'http' || protocol === 'https') ) {
      request.url = url;
      request.method = method;
      request.headers = {};
      request.data = {};
      return request;
    }
    else {
      this.HTTPUnsupportedRequest("We support basic http/https operations.<br>Request type can be one of GET/POST/PUT or DELETE");
      return request;
    }
  }

  addHTTPHeader (request, key , value) {
    request.headers[key] = value;
  }

  addHTTPParams (request, key, value) {
    request.data[key] = value;
  }

  setHTTPBody (request, body) {
    if( typeof body == 'object' ) {
      request.data = JSON.stringify(body);
    }
    else if (typeof body == 'string') {
      request.data = body;
    }
    else {
      request.data = "";
      throw new IllegalArgumentException("Body can be currently only of type string or json");
    }
  }

  setDataType (request, type) {
    request.dataType = type;
  }

  setProxyState (request, state) {
    request.proxy = state;
  }

  sendHTTPRequest (request, successcallback, failurecallback) {
    // let url = this.getSanitizedURL(request); // use to use the proxy
    let url = request.url;
    let method = request.method;
    let data = request.data;
    let dataType = request.dataType;
    let headers = request.headers;
    let parent = this;

    $.ajax(
      {
        url: url,
        type: method,
        headers: headers,
        dataType: dataType,
        data: data,
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(code + ': '+ msg);
        }
      });
  }

  getSanitizedURL (request) {
    let proxyUrl = "https://iot.snapp.click:8443/"; // backup 1337
    let isProxyRequired = true; //default is proxy required
    let url = request.url;

    if( (request.proxy != undefined) && (request.proxy === false) ) {
      isProxyRequired = false;
    }

    let sanitizedUrl = url;
    if (isProxyRequired) {
      // url = url.replace(/^.+:\/\//, ""); //Removes all possible protocols - NOTE: not needed with the latest proxy implementation
      sanitizedUrl = proxyUrl + url;
      return sanitizedUrl;
    } else {
      return url;
    }
  }

  //Define custom exceptions pertaining to network module here.

  HTTPUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'HTTPUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  HTTPNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'HTTPNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NetworkObject);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 27/03/17.
 */

// ES6 imports


class ScreenObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor(elemSelectorRef) {
        super();

        // Element selector
        this.elemSelectorRef = elemSelectorRef || '';

        // Getting Text properties values

        this.getProperty = Object.assign(this.getProperty, {
            'Background image': (objName) => {
                return this.getScreenElemFromName(objName).css('background-image');
            },
            x: (objName) => { return 0; }, // some properties of the base-object has been overwritten because
            y: (objName) => { return 0; }  // html5 must have the same behaviour of the android and ios platforms
        });

        this.setProperty = Object.assign(this.setProperty, {
            'Background color': (objName, value) => {
                this.getScreenElemFromName(objName).css({
                    'background-color': value,
                    'background-image': '',
                    'background-size': '',
                    'background-repeat': ''
                });
            },
            'Background image': (objName, value) => {
                 this.getScreenElemFromName(objName).css({
                    'background-image': "url('" + value + "')",
                    'background-size': 'contain',
                    'background-color': '',
                    'background-repeat': 'no-repeat'
                });
            },
            width: (objName, value) => {},
            height: (objName, value) => {},
            x: (objName, value) => {},
            y: (objName, value) => {}
        });

        this.screenDict = {};
    };

    /**
     * Retrieves the screen element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getScreenElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]' + this.elemSelectorRef);
    }

    init ( elemSelectorRefValue) {
        this.elemSelectorRef = elemSelectorRefValue;
    };

    screenPopInit () {
        const self = this.screenDict;
        window.addEventListener('popstate', function (e) {
            let currentScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            let currentScreenName = currentScreen[0].getAttribute('obj-name');
            let callbackScreen =  'back' + currentScreenName;
               if (self[callbackScreen]) {
                   history.pushState({'view': currentScreenName}, currentScreenName, currentScreenName);
                   self[callbackScreen]();
              }  else {
                  currentScreen.hide();
                  $('[obj-name="' + e.state.view + '"]').show();
                }
        });
    };

    screenOrientationInit () {
        const self = this.screenDict;
        window.addEventListener( 'orientationchange', function( e ) {
            let currentScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            let currentScreenName = currentScreen[0].getAttribute('obj-name');
            let callbackScreen = 'orientation' + currentScreenName;
            if (self[callbackScreen]) {
                let getOrientation = '';
                switch(window.orientation) {
                    case -90:
                    case 90:
                        getOrientation = 'landscape';
                        break;
                    default:
                        getOrientation = 'portrait';
                        break;
                }
                self[callbackScreen](getOrientation);
            }
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ScreenObject);



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class StorageObject {

  constructor() {}

  add (key,value) {
    return localStorage.setItem(key,value);
  }

  remove (key) {
    return localStorage.removeItem(key);
  }

  clear (key) {
    return localStorage.clear();
  }

  getValue (key) {
    return localStorage.getItem(key);
  }

  getAllKeys () {
    return Object.keys(localStorage);
  }

  //Define custom exceptions pertaining to storage module here.
}

/* harmony default export */ __webpack_exports__["a"] = (StorageObject);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class WebViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super(' web view');

        var self = this;

        this.setProperty['URL'] = function(objName, value) {
            let elem =  $('[obj-name= "' + objName + '"]');
            $(elem).find('iframe').attr('src',value);        
        };

        this.getProperty['URL'] = function(objName) {
            let elem =  $('[obj-name= "' + objName + '"]');
            return $(elem).find('iframe').attr('src');        
        };
    }

    refresh (objName) {
        let elem =  $('[obj-name= "' + objName + '"]');
        let url = $(elem).find('iframe').attr('src');
        $(elem).find('iframe').attr('src',url);
    }


    WebViewException(msg) {
      let error = new Error(msg);
      error.name = "WebViewException";
      throw error;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (WebViewObject);



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects_label_label_module_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_button_button_module_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_network_network_module_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_json_json_module_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_connio_connio_module_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_animation_animation_module_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__objects_screen_screen_module_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__objects_dictionary_dictionary_module_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__objects_TextLibrary_TextLibrary_module_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__objects_image_image_module_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__objects_container_container_module_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__objects_location_location_module_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__objects_MathLibrary_MathLibrary_module_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__objects_lists_lists_module_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__objects_application_application_module_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__objects_graphview_graphview_module_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__objects_storage_storage_module_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__objects_gauge_gauge_module_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__objects_webview_webview_module_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__objects_ColourLibrary_colourlibrary_module_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__objects_TimeLibrary_timelibrary_module_js__ = __webpack_require__(5);
// ES6 imports























var distLib = {};
distLib.Animation = new __WEBPACK_IMPORTED_MODULE_5__objects_animation_animation_module_js__["a" /* default */]();
distLib.Button = new __WEBPACK_IMPORTED_MODULE_1__objects_button_button_module_js__["a" /* default */]();
distLib.Connio = new __WEBPACK_IMPORTED_MODULE_4__objects_connio_connio_module_js__["a" /* default */]();
distLib.Container = new __WEBPACK_IMPORTED_MODULE_10__objects_container_container_module_js__["a" /* default */]();
distLib.Dictionary = new __WEBPACK_IMPORTED_MODULE_7__objects_dictionary_dictionary_module_js__["a" /* default */]();
distLib.Image = new __WEBPACK_IMPORTED_MODULE_9__objects_image_image_module_js__["a" /* default */]();
distLib.JSON = new __WEBPACK_IMPORTED_MODULE_3__objects_json_json_module_js__["a" /* default */]();
distLib.Label = new __WEBPACK_IMPORTED_MODULE_0__objects_label_label_module_js__["a" /* default */]();
distLib.ListLibrary = new __WEBPACK_IMPORTED_MODULE_13__objects_lists_lists_module_js__["a" /* default */]();
distLib.Location = new __WEBPACK_IMPORTED_MODULE_11__objects_location_location_module_js__["a" /* default */]();
distLib.MathLibrary = new __WEBPACK_IMPORTED_MODULE_12__objects_MathLibrary_MathLibrary_module_js__["a" /* default */]();
distLib.GraphContainer = new __WEBPACK_IMPORTED_MODULE_15__objects_graphview_graphview_module_js__["a" /* default */]();
distLib.Network = new __WEBPACK_IMPORTED_MODULE_2__objects_network_network_module_js__["a" /* default */]();
distLib.Screen = new __WEBPACK_IMPORTED_MODULE_6__objects_screen_screen_module_js__["a" /* default */]();
distLib.TextLib = new __WEBPACK_IMPORTED_MODULE_8__objects_TextLibrary_TextLibrary_module_js__["a" /* default */]();
distLib.Application = new __WEBPACK_IMPORTED_MODULE_14__objects_application_application_module_js__["a" /* default */]();
distLib.Storage = new __WEBPACK_IMPORTED_MODULE_16__objects_storage_storage_module_js__["a" /* default */]();
distLib.Gauge = new __WEBPACK_IMPORTED_MODULE_17__objects_gauge_gauge_module_js__["a" /* default */]();
distLib.WebContainer = new __WEBPACK_IMPORTED_MODULE_18__objects_webview_webview_module_js__["a" /* default */]();
distLib.ColourLibrary = new __WEBPACK_IMPORTED_MODULE_19__objects_ColourLibrary_colourlibrary_module_js__["a" /* default */]();
distLib.TimeLibrary = new __WEBPACK_IMPORTED_MODULE_20__objects_TimeLibrary_timelibrary_module_js__["a" /* default */]();

// setting the global variable
com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib = Object.assign(com.fc.JavaScriptDistLib, distLib);

/***/ })
/******/ ]);