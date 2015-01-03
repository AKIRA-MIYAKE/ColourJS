(function() {
  'use strict';

  /* Define library interface */

  var Colour;

  Colour = function() {
    var rgb;

    if (arguments.length === 1) {
      var p = arguments[0];

      if ('_type' in p) {
        switch (p._type) {
          case 'RGB':
            rgb = p;
            break;
          case 'HSV':
            rgb = p.toRGB();
            break;
          case 'LinearRGB':
            rgb = p.toRGB();
            break;
          case 'XYZ':
            rgb = p.toLinearRGB().toRGB();
            break;
          case 'CIELab':
            rgb = p.toXYZ().toLinearRGB().toRGB();
            break;
        }
      } else {
        if (_isArray(p) && p.length === 3) {
          rgb = Colour.RGB(p);
        } else if (typeof p === 'string' && _isColorCode(p)) {
          var colde = _unificationColorCode(p);
          rgb = _RGBFromColorCode(p);
        }
      }
    } else if (arguments.length === 3) {
      rgb = Colour.RGB(Array.prototype.slice.call(arguments));
    }

    if (typeof rgb !== 'undefined') {
      return createColourFromRGB(rgb);
    } else {
      return;
    }
  };

  Colour.RGB = function() {
    var args;

    if (arguments.length === 1) {
      if (arguments[0].length === 3) {
        args = arguments[0];
      }
    } else if (arguments.length === 3) {
      args = Array.prototype.slice.call(arguments);
    }

    if (typeof args !== 'undefined') {
      return createRGB(args);
    } else {
      return;
    }
  };

  Colour.HSV = function() {
    var args;

    if (arguments.length === 1) {
      if (arguments[0].length === 3) {
        args = arguments[0];
      }
    } else if (arguments.length === 3) {
      args = Array.prototype.slice.call(arguments);
    }

    if (typeof args !== 'undefined') {
      return createHSV(args);
    } else {
      return;
    }
  };

  Colour.LinearRGB = function() {
    var args;

    if (arguments.length === 1) {
      if (arguments[0].length === 3) {
        args = arguments[0];
      }
    } else if (arguments.length === 3) {
      args = Array.prototype.slice.call(arguments);
    }

    if (typeof args !== 'undefined') {
      return createLinearRGB(args);
    } else {
      return;
    }
  };

  Colour.XYZ = function() {
    var args;

    if (arguments.length === 1) {
      if (arguments[0].length === 3) {
        args = arguments[0];
      }
    } else if (arguments.length === 3) {
      args = Array.prototype.slice.call(arguments);
    }

    if (typeof args !== 'undefined') {
      return createXYZ(args);
    } else {
      return;
    }
  };

  Colour.CIELab = function() {
    var args;

    if (arguments.length === 1) {
      if (arguments[0].length === 3) {
        args = arguments[0];
      }
    } else if (arguments.length === 3) {
      args = Array.prototype.slice.call(arguments);
    }

    if (typeof args !== 'undefined') {
      return createCIELab(args);
    } else {
      return;
    }
  };

  Colour.settings = {
    gamma: 2.2,
    safeColor: true,
    lightSourceType: 'D65'
  };

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


  /* Define create function */

  var createColourFromRGB = function(RGB) {
    var c = Object.create(colour);

    var raw = {
      RGB: RGB,
      HSV: RGB.toHSV(),
      LinearRGB: RGB.toLinearRGB(),
      XYZ: RGB.toLinearRGB().toXYZ(),
      CIELab: RGB.toLinearRGB().toXYZ().toCIELab()
    };

    c._raw = raw;

    return c;
  };

  var createRGB = function(args) {
    var c = Object.create(RGB);

    args.forEach(function(v) {
      if (v >= 0 && v <= 255) {
        c.push(v);
      }
    });

    if (c.length === 3) {
      return c;
    } else {
      return;
    }
  };

  var createHSV = function(args) {
    var c = Object.create(HSV);

    args.forEach(function(v, i) {
      if (i === 0) {
        if (v >= 0 && v < 360) {
          c.push(v);
        } else if (v < 0) {
          c.push(v + 360);
        }
      } else {
        if (v >= 0 && v <= 100) {
          c.push(v);
        }
      }
    });

    if (c.length === 3) {
      return c;
    } else {
      return;
    }
  };

  var createLinearRGB = function(args) {
    var c = Object.create(LinearRGB);

    args.forEach(function(v) {
      c.push(v);
    });

    if (c.length === 3) {
      return c;
    } else {
      return;
    }
  };

  var createXYZ = function(args) {
    var c = Object.create(XYZ);

    args.forEach(function(v) {
      c.push(v);
    });

    if (c.length === 3) {
      return c;
    } else {
      return;
    }
  };

  var createCIELab = function(args) {
    var c = Object.create(CIELab);

    args.forEach(function(v) {
      c.push(v);
    });

    if (c.length === 3) {
      return c;
    } else {
      return;
    }
  };


  /* Define prototype objects */

  // Colour object
  var colour = {};
  colour.RGB = function() {
    var args = this._raw.RGB.map(function(v) {
      return Math.round(v);
    });
    return Colour.RGB(args);
  };
  colour.HSV = function() {
    var args = this._raw.HSV.map(function(v) {
      return Math.round(v);
    });
    return Colour.HSV(args);
  };
  colour.LinearRGB = function() {
    var args = this._raw.LinearRGB.map(function(v) {
      return Math.round(v * 100) / 100;
    });
    return Colour.LinearRGB(args);
  };
  colour.XYZ = function() {
    var args = this._raw.XYZ.map(function(v) {
      return Math.round(v * 100) / 100;
    });
    return Colour.XYZ(args);
  };
  colour.CIELab = function() {
    var args = this._raw.CIELab.map(function(v) {
      return Math.round(v * 100) / 100;
    });
    return Colour.CIELab(args);
  };

  colour.lighten = function(parameter) {
    var L = this._raw.CIELab[0] + 100 * parameter;
    var a = this._raw.CIELab[1];
    var b = this._raw.CIELab[2];
    var lab = Colour.CIELab(L, a, b);
    return Colour(lab);
  };
  colour.darken = function(parameter) {
    var L = this._raw.CIELab[0] - 100 * parameter;
    var a = this._raw.CIELab[1];
    var b = this._raw.CIELab[2];
    var lab = Colour.CIELab(L, a, b);
    return Colour(lab);
  };
  colour.mix = function(other) {
    var L = (this._raw.CIELab[0] + other._raw.CIELab[0]) / 2;
    var a = (this._raw.CIELab[1] + other._raw.CIELab[1]) / 2;
    var b = (this._raw.CIELab[2] + other._raw.CIELab[2]) / 2;
    var lab = Colour.CIELab(L, a, b);
    return Colour(lab);
  };
  colour.difference = function(other) {
    var dL = this._raw.CIELab[0] - other._raw.CIELab[0];
    var da = this._raw.CIELab[1] - other._raw.CIELab[1];
    var db = this._raw.CIELab[2] - other._raw.CIELab[2];
    var d = Math.pow(Math.pow(dL, 2) + Math.pow(da, 2) + Math.pow(db, 2), 0.5);
    return Math.round(d * 100) / 100;
  };
  colour.adjustHue = function(degrees) {
    var H = this._raw.HSV[0] + degrees % 360;
    var S = this._raw.HSV[1];
    var V = this._raw.HSV[2];
    var hsv = Colour.HSV(H, S, V);
    return Colour(hsv);
  };

  // Coordinate object
  var coordinate = Object.create(new Array());

  // RGB
  var RGB = Object.create(coordinate);
  RGB._type = 'RGB';
  RGB.hex = function() {
    var args = this.map(function(v) {
      var h = v.toString(16);
      if (h.length === 1) {
        h = '0' + h;
      }
      return h;
    });
    return args.join('');
  };
  RGB.toHSV = function() {
    var R = this[0] / 255;
    var G = this[1] / 255;
    var B = this[2] / 255;

    var H, S, V;

    if (R == G && R == B) {
      H = 0;
      S = 0;
      V = R;
    } else if (R > G && R > B) {
      var max = R;
      var min = G;
      if (min > B) {
        min = B;
      }

      H = (60 * (G - B) / (max - min) + 0) % 360;
      S = (max - min) / max;
      V = max;
    } else if (G > B && G > R) {
      var max = G;
      var min = B;
      if (min > R) {
        min = R;
      }

      H = (60 * (B - R) / (max - min) + 120) % 360;
      S = (max - min) / max;
      V = max;
    } else if (B > R && B > G) {
      var max = B;
      var min = R;
      if (min > G) {
        min = G;
      }

      H = (60 * (R - G) / (max - min) + 240) % 360;
      S = (max - min) / max;
      V = max;
    }

    return Colour.HSV(H, S * 100, V * 100);
  };
  RGB.toLinearRGB = function() {
    var gamma = Colour.settings.gamma;

    var args = this.map(function(value) {
      var v = value / 255;

      if (v <= 0.04045) {
        return v / 12.92;
      } else {
        return Math.pow((v + 0.055) / 1.055, gamma);
      }
    });

    return Colour.LinearRGB(args);
  };

  // HSV
  var HSV = Object.create(coordinate);
  HSV._type = 'HSV';
  HSV.toRGB = function() {
    var H = this[0];
    var S = this[1] / 100;
    var V = this[2] / 100;

    var R, G, B;

    if (S == 0) {
      R = V;
      G = V;
      B = V;
    } else {
      var hi = Math.floor(H / 60) % 6;
      var f = (H / 60) - Math.floor(H / 60);
      var p = V * (1 - S);
      var q = V * (1 - f * S);
      var t = V * (1 - (1 - f) * S);

      switch (hi) {
        case 0:
          R = V;
          G = t;
          B = p;
          break;
        case 1:
          R = q;
          G = V;
          B = p;
          break;
        case 2:
          R = p;
          G = V;
          B = t;
          break;
        case 3:
          R = p;
          G = q;
          B = V;
          break;
        case 4:
          R = t;
          G = p;
          B = V;
          break;
        case 5:
          R = V;
          G = p;
          B = q;
          break;
      };
    }

    return Colour.RGB(R * 255, G * 255, B * 255);
  };

  // LinearRGB
  var LinearRGB = Object.create(coordinate);
  LinearRGB._type = 'LinearRGB';
  LinearRGB.toRGB = function() {
    var gamma = Colour.settings.gamma;

    var args = this.map(function(value) {
      var v = value;

      if (v <= 0.0031308) {
        return 12.29 * v * 255;
      } else {
        return (1.055 * Math.pow(v, 1 / gamma) - 0.055) * 255;
      }
    });

    return Colour.RGB(args);
  };
  LinearRGB.toXYZ = function() {
    var lR = this[0];
    var lG = this[1];
    var lB = this[2];

    var Xn = 0.4124 * lR + 0.3576 * lG + 0.1805 * lB;
    var Yn = 0.2126 * lR + 0.7152 * lG + 0.0722 * lB;
    var Zn = 0.0193 * lR + 0.1192 * lG + 0.9505 * lB;

    return Colour.XYZ(Xn * 100, Yn * 100, Zn * 100);
  };

  // XYZ
  var XYZ = Object.create(coordinate);
  XYZ._type = 'XYZ';
  XYZ.toLinearRGB = function() {
    var Xn = this[0] / 100;
    var Yn = this[1] / 100;
    var Zn = this[2] / 100;

    var safeColor = Colour.settings.safeColor;

    var lR = 3.2406 * Xn - 1.5372 * Yn - 0.4986 * Zn;
    var lG = -0.9689 * Xn + 1.8758 * Yn + 0.0415 * Zn;
    var lB = 0.0557 * Xn - 0.204 * Yn + 1.057 * Zn;

    var args = [lR, lG, lB].map(function(value) {
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

    return Colour.LinearRGB(args);
  };
  XYZ.toCIELab = function() {
    var X = this[0];
    var Y = this[1];
    var Z = this[2];

    var lightSource = lightSources[Colour.settings.lightSourceType];
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

    return Colour.CIELab(L, a, b);
  };

  // CIELab
  var CIELab = Object.create(coordinate);
  CIELab._type = 'CIELab';
  CIELab.toXYZ = function() {
    var L = this[0];
    var a = this[1];
    var b = this[2];

    var lightSource = lightSources[Colour.settings.lightSourceType];
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

    return Colour.XYZ(X, Y, Z);
  };


  /* Utility methods */

  var _isArray = function(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
  };


  /* Export section */

  if ('process' in global) {
    module['exports'] = Colour;
  }
  global['Colour' in global ? 'Colour_' : 'Colour'] = Colour;

})((this || 0).self || global);
