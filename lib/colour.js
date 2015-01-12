(function(global, undefined) {

  /* Constants */

  var version = '0.0.2';

  var lightSources = {
    A: {
      Xn: 109.854,
      Yn: 100,
      Zn: 35.58
    },
    C: {
      Xn: 95.039,
      Yn: 100,
      Zn: 108.880
    },
    D65: {
      Xn: 98.071,
      Yn: 100,
      Zn: 118.226
    }
  };


  /* Prototype objects */

  // Colour
  var colour = {
    _objType: 'Colour',
    _raw: {
      RGB: [],
      HSV: [],
      LinearRGB: [],
      XYZ: [],
      CIELab: []
    }
  };

  colour.RGB = function() {
    return createRGB(this._raw.RGB);
  };

  colour.HSV = function() {
    return createHSV(this._raw.HSV);
  };

  colour.LinearRGB = function() {
    return createLinearRGB(this._raw.LinearRGB);
  };

  colour.XYZ = function() {
    return createXYZ(this._raw.XYZ);
  };

  colour.CIELab = function() {
    return createCIELab(this._raw.CIELab);
  };

  colour.lighten = function(value) {
    var L = this._raw.CIELab[0] + value * 100;
    var a = this._raw.CIELab[1];
    var b = this._raw.CIELab[2];
    var lab = createCIELab([L, a, b]);
    return createColour(lab);
  };

  colour.darken = function(value) {
    var L = this._raw.CIELab[0] - value * 100;
    var a = this._raw.CIELab[1];
    var b = this._raw.CIELab[2];
    var lab = createCIELab([L, a, b]);
    return createColour(lab);
  };

  colour.adjustHue = function(degrees) {
    var r = (degrees % 360) / 180 * Math.PI;

    var L = this._raw.CIELab[0];
    var a = this._raw.CIELab[1] * Math.cos(r) - this._raw.CIELab[2] * Math.sin(r);
    var b = this._raw.CIELab[1] * Math.sin(r) + this._raw.CIELab[2] * Math.cos(r);

    var lab = createCIELab([L, a, b]);
    return createColour(lab);
  };

  colour.difference = function(colour) {
    var dArr = this._raw.CIELab.map(function(v, i) {
      return v - colour._raw.CIELab[i];
    });
    var d2 = dArr.reduce(function(p, c) {
      return p + Math.pow(c, 2);
    });
    return Math.pow(d2, 1 / 2);
  };

  colour.mix = function(colour, weight) {
    var w = (typeof weight !== 'undefined') ? weight : 0.5;

    var arr = this._raw.CIELab.map(function(v, i) {
      return (v * (1 - w) + colour._raw.CIELab[i] * w) / 2;
    });

    return createColour(createCIELab(arr));
  };

  colour.clone = function() {
    var c = Object.create(colour);

    var _raw = {};
    Object.keys(this._raw).forEach(function(key) {
      _raw[key] = this._raw[key];
    }, this);

    c._raw = _raw;

    return c;
  };

  // Coord
  var coord = Object.create([0, 0, 0]);
  coord.raw = function() {
    return this.map(function(v) {
      return v;
    });
  };
  coord.round = function(decimal) {
    var arr = this.map(round(decimal));
    return createCoord(this._objType)(arr);
  };

  //RGB
  var rgb = Object.create(coord);
  rgb._objType = 'RGB';
  rgb.hex = function() {
    return this.map(round(0))
      .map(hexFromNumber)
      .reduce(function(p, c) {
        if (('' + c).length < 2) {
          c = '0' + c;
        }
        return p + c;
      });
  }
  rgb.toHSV = function() {
    return createHSV(rgb2hsv(this));
  };
  rgb.toLinearRGB = function() {
    return createLinearRGB(rgb2lrgb(this));
  };

  // HSV
  var hsv = Object.create(coord);
  hsv._objType = 'HSV';
  hsv.toRGB = function() {
    return createRGB(hsv2rgb(this));
  };

  // LinearRGB
  var lrgb = Object.create(coord);
  lrgb._objType = 'LineraRGB';
  lrgb.toRGB = function() {
    return createRGB(lrgb2rgb(this));
  };
  lrgb.toXYZ = function() {
    return createXYZ(lrgb2xyz(this));
  };

  // XYZ
  var xyz = Object.create(coord);
  xyz._objType = 'XYZ';
  xyz.toLinearRGB = function() {
    return createLinearRGB(xyz2lrgb(this));
  };
  xyz.toCIELab = function() {
    return createCIELab(xyz2lab(this));
  };

  // CIELab
  var lab = Object.create(coord);
  lab._objType = 'CIELab';
  lab.toXYZ = function() {
    return createXYZ(lab2xyz(this));
  };


  /* Factory methods */

  // Colour
  var createColour = function(coord) {
    var rgb, hsv, lrgb, xyz, lab;

    switch (coord._objType) {
      case 'RGB':
        rgb = coord.raw();
        hsv = rgb2hsv(rgb);
        lrgb = rgb2lrgb(rgb);
        xyz = lrgb2xyz(lrgb);
        lab = xyz2lab(xyz);
        break;
      case 'HSV':
        hsv = coord.raw();
        rgb = hsv2rgb(hsv);
        lrgb = rgb2lrgb(rgb);
        xyz = lrgb2xyz(lrgb);
        lab = xyz2lab(xyz);
        break;
      case 'LinearRGB':
        lrgb = coord.raw();
        rgb = lrgb2rgb(lrgb);
        hsv = rgb2hsv(rgb);
        xyz = lrgb2xyz(lrgb);
        lab = xyz2lab(xyz);
        break;
      case 'XYZ':
        xyz = coord.raw();
        lab = xyz2lab(xyz);
        lrgb = xyz2lrgb(xyz);
        rgb = lrgb2rgb(lrgb);
        hsv = rgb2hsv(rgb);
        break;
      case 'CIELab':
        lab = coord.raw();
        xyz = lab2xyz(lab);
        lrgb = xyz2lrgb(xyz);
        rgb = lrgb2rgb(lrgb);
        hsv = rgb2hsv(rgb);
        break;
    }

    var c = Object.create(colour);
    c._raw = {
      RGB: rgb,
      HSV: hsv,
      LinearRGB: lrgb,
      XYZ: xyz,
      CIELab: lab
    };

    return c;
  };

  // Coor
  var createCoord = function(objType, arr) {
    var createMethod;
    switch (objType) {
      case 'RGB':
        createMethod = createRGB;
        break;
      case 'HSV':
        createMethod = createHSV;
        break;
      case 'LinearRGB':
        createMethod = createLinearRGB;
        break;
      case 'XYZ':
        createMethod = createXYZ;
        break;
      case 'CIELab':
        createMethod = createCIELab;
        break;
    }

    if (typeof arr === 'undefined') {
      return createMethod;
    } else {
      return createMethod(arr);
    }
  };

  // RGB
  var createRGB = function(arr) {
    var isRight = arr.every(function(v) {
      return (v >= 0 && v <= 255) ? true : false;
    });

    if (!isRight) {
      return;
    }

    var c = Object.create(rgb);
    arr.forEach(function(v, i) {
      c[i] = v;
    });
    return c;
  };

  // HSV
  var createHSV = function(arr) {
    var isRight = arr.every(function(v, i) {
      if (i === 0) {
        return (v >= 0 && v < 360) ? true : false;
      } else {
        return (v >= 0 && v <= 100) ? true : false;
      }
    });

    if (!isRight) {
      return;
    }

    var c = Object.create(hsv);
    arr.forEach(function(v, i) {
      c[i] = v;
    });
    return c;
  };

  // LinearRGB
  var createLinearRGB = function(arr) {
    var c = Object.create(lrgb);
    arr.forEach(function(v, i) {
      c[i] = v;
    });
    return c;
  };

  // XYZ
  var createXYZ = function(arr) {
    var c = Object.create(xyz);
    arr.forEach(function(v, i) {
      c[i] = v;
    });
    return c;
  };

  // CIELab
  var createCIELab = function(arr) {
    var c = Object.create(lab);
    arr.forEach(function(v, i) {
      c[i] = v;
    });
    return c;
  };

  /* Logic methods */

  // RGB
  var rgb2hsv = function(arr) {
    var r = arr[0] / 255;
    var g = arr[1] / 255;
    var b = arr[2] / 255;

    var h, s, v;

    var max = (r > g) ? r : g;
    max = (max > b) ? max : b;

    var min = (r < g) ? r : g;
    min = (min < b) ? min : b;

    if ((max - min) === 0) {
      h = 0;
      s = 0;
      v = max;
    } else {
      if (max === r) {
        h = (60 * (g - b) / (max - min) + 360) % 360;
      } else if (max === g) {
        h = 60 * (b - r) / (max - min) + 120;
      } else if (max == b) {
        h = 60 * (r - g) / (max - min) + 240;
      }

      s = (max - min) / max;
      v = max;
    }

    return [h, s * 100, v * 100];
  };

  var rgb2lrgb = function(arr) {
    var gamma = settings.gamma;
    return arr.map(function(value) {
      var v = value / 255;

      if (v <= 0.04045) {
        return v / 12.92;
      } else {
        return Math.pow((v + 0.055) / 1.055, gamma);
      }
    });
  };

  // HSV
  var hsv2rgb = function(arr) {
    var h = arr[0];
    var s = arr[1] / 100;
    var v = arr[2] / 100;

    var r, g, b;

    if (s === 0) {
      r = v;
      g = v;
      b = v;
    } else {
      var hi =  (h / 60) - Math.floor(h / 60);
      var p = v * (1 - v);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      switch (hi) {
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
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
    }

    return [r * 255, g * 255, b * 255];
  };

  // LinearRGB
  var lrgb2rgb = function(arr) {
    var gamma = settings.gamma;
    return arr.map(function(v) {
      if (v <= 0.0031308) {
        return 12.29 * v * 255;
      } else {
        return (1.055 * Math.pow(v, 1 / gamma) - 0.055) * 255;
      }
    });
  };

  var lrgb2xyz = function(arr) {
    var lR = arr[0];
    var lG = arr[1];
    var lB = arr[2];

    var Xn = 0.4124 * lR + 0.3576 * lG + 0.1805 * lB;
    var Yn = 0.2126 * lR + 0.7152 * lG + 0.0722 * lB;
    var Zn = 0.0193 * lR + 0.1192 * lG + 0.9505 * lB;

    return [Xn * 100, Yn * 100, Zn * 100];
  };

  // XYZ
  var xyz2lrgb = function(arr) {
    var Xn = arr[0] / 100;
    var Yn = arr[1] / 100;
    var Zn = arr[2] / 100;

    var safeColor = settings.safeColor;

    var lR = 3.2406 * Xn - 1.5372 * Yn - 0.4986 * Zn;
    var lG = -0.9689 * Xn + 1.8758 * Yn + 0.0415 * Zn;
    var lB = 0.0557 * Xn - 0.204 * Yn + 1.057 * Zn;

    return [lR, lG, lB].map(function(value) {
      var v = value;

      if (safeColor) {
        if (v > 1) {
          return 1;
        } else if (v < 0) {
          return 0;
        } else {
          return v;
        }
      }
    });
  };

  var xyz2lab = function(arr) {
    var X = arr[0];
    var Y = arr[1];
    var Z = arr[2];

    var lightSource = lightSources[settings.lightSourceType];
    if (typeof lightSource === 'undefined') {
      lightSource = lightSources['D65'];
    }

    var Xn = lightSource.Xn;
    var Yn = lightSource.Yn;
    var Zn = lightSource.Zn;

    var ff = function(t) {
      if (t > 0.008856) {
        return Math.pow(t, 1 / 3);
      } else {
        return (903.3 * t + 16) / 116;
      }
    }

    var L = 116 * ff(Y / Yn) - 16;
    var a = 500 * (ff(X / Xn) - ff(Y / Yn));
    var b = 200 * (ff(Y / Yn) - ff(Z / Zn));

    return [L, a, b];
  };

  // CIELab
  var lab2xyz = function(arr) {
    var L = arr[0];
    var a = arr[1];
    var b = arr[2];

    var lightSource = lightSources[settings.lightSourceType];
    if (typeof lightSource === 'undefined') {
      lightSource = lightSources['D65'];
    }

    var Xn = lightSource.Xn;
    var Yn = lightSource.Yn;
    var Zn = lightSource.Zn;

    var yr = function(L) {
      if (L > 903.3 * 0.008856) {
        return Math.pow((L + 16) / 116, 3);
      } else {
        return L / 903.3;
      }
    };

    var ffy = function(L) {
      if (yr(L) > 0.008856) {
        return (L + 16) / 116;
      } else {
        return (903.0 * yr(L) + 16) / 116;
      }
    };

    var fx = function(L, a) {
      return a / 500 + ffy(L);
    };

    var xr = function(L, a) {
      if (Math.pow(fx(L, a), 3) > 0.008856) {
        return Math.pow(fx(L, a), 3);
      } else {
        return (116 * fx(L, a) - 16) / 903.3;
      }
    };

    var fz = function(L, b) {
      return ffy(L) - b / 200;
    };

    var zr = function(L, b) {
      if (Math.pow(fz(L, b), 3) > 0.008856) {
        return Math.pow(fz(L, b), 3);
      } else {
        return (116 * fz(L, b) - 16) / 903.3;
      }
    };

    var X = xr(L, a) * Xn;
    var Y = yr(L) * Yn;
    var Z = zr(L, b) * Zn;

    return arr = [X, Y, Z];
  };


  /* Utility methods */

  var isString = function(obj) {
    return (typeof obj === 'string') ? true : false;
  };

  var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var isColorCode = function(string) {
    var re = /(^#([\da-fA-F]{6}|[\da-fA-F]{3})$)|(^([\da-fA-F]{6}|[\da-fA-F]{3})$)/;
    return re.test(string);
  };

  var formatColorCode = function(code) {
    var c = code;

    if (/^#/.test(c)) {
      c = c.slice(1);
    }

    if (c.length == 3) {
      var r = c.slice(0, 1) + c.slice(0, 1);
      var g = c.slice(1, 2) + c.slice(1, 2);
      var b = c.slice(2, 3) + c.slice(2, 3);

      c = r + g + b;
    }

    return c;
  };

  var numberFromHex = function(hex) {
    return parseInt(hex, 16);
  };

  var hexFromNumber = function(number) {
    return number.toString(16);
  };

  var round = function(decimal, number) {
    var _round = function(decimal, number) {
      var v = Math.pow(10, decimal);
      return Math.round(number * v) / v;
    };

    if (typeof number === 'undefined') {
      return function(number) {
        if (typeof decimal === 'undefined') {
          decimal = 0;
        }
        return _round(decimal, number);
      };
    } else {
      return _round(decimal, number);
    };
  };

  var arrayFromArguments = function(args) {
    var arr;

    if (args.length === 1) {
      var arg = args[0];

      if (isArray(arg)) {
        if (arg.length === 3) {
          arr = arg;
        }
      }
    } else if (args.length === 3) {
      arr = (function(args) {
        var _arr = [];
        for (var i = 0; i < 3; i++) {
          _arr.push(args[i]);
        }
        return _arr;
      })(args);
    }

    return arr;
  };

  var arrayFromColorCode = function(code) {
    var r = code.slice(0, 2);
    var g = code.slice(2, 4);
    var b = code.slice(4, 6);

    return [r, g, b].map(numberFromHex);
  };


  /* Settings */

  var settings = {
    gamma: 2.2,
    safeColor: true,
    lightSourceType: 'D65'
  };


  /* Library */

  var Colour = function() {
    var colour;

    if (arguments.length === 1) {
      var arg = arguments[0];
      if (typeof arg._objType !== 'undefined') {
        if (arg._objType === 'Colour') {
          colour = arg.clone();
        } else {
          colour = createColour(arg);
        }
      } else {
        if (isString(arg)) {
          if (isColorCode(arg)) {
            var code = formatColorCode(arg);
            var arr = arrayFromColorCode(code);
            colour = createColour(createRGB(arr));
          }
        } else if (isArray(arg)) {
          colour = createColour(createRGB(arg));
        }
      }
    } else if (arguments.length === 3) {
      var arr = (function(args) {
        var _arr = [];
        for (var i = 0; i < 3; i++) {
          _arr.push(args[i]);
        }
        return _arr;
      })(arguments);
      colour = createColour(createRGB(arr));
    }

    return colour;
  };

  Colour.RGB = function() {
    var arr = arrayFromArguments(arguments);

    if (typeof arr === 'undefined' && arguments.length === 1) {
      var arg = arguments[0];
      if (isString(arg)) {
        if (isColorCode(arg)) {
          var code = formatColorCode(arg);
          arr = arrayFromColorCode(code);
        }
      }
    }

    return (typeof arr !== 'undefined') ? createRGB(arr) : undefined;
  };

  Colour.HSV = function() {
    var arr = arrayFromArguments(arguments);
    return (typeof arr !== 'undefined') ? createHSV(arr) : undefined;
  };

  Colour.LinearRGB = function() {
    var arr = arrayFromArguments(arguments);
    return (typeof arr !== 'undefined') ? createLinearRGB(arr) : undefined;
  };

  Colour.XYZ = function() {
    var arr = arrayFromArguments(arguments);
    return (typeof arr !== 'undefined') ? createXYZ(arr) : undefined;
  };

  Colour.CIELab = function() {
    var arr = arrayFromArguments(arguments);
    return (typeof arr !== 'undefined') ? createCIELab(arr) : undefined;
  };

  Colour.getSetting = function(key) {
    return (typeof key !== 'undefined') ? settings[key] : settings;
  };

  Colour.setSetting = function(parameters) {
    if (typeof parameters !== 'undefined') {
      Object.keys(parameters).forEach(function(key) {
        settings[key] = parameters[key];
      });
    }
  };

  Colour.version = version;


  /* Export section */

  if ('process' in global) {
    module['exports'] = Colour;
  }
  global['Colour' in global ? 'Colour_' : 'Colour'] = Colour;

})((this || 0).self || global);
