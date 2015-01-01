(function(global) {

  /* Define library name */

  var Colour;


  /* Colour function is create colour object */

  Colour = function(parameters) {
    if (typeof parameters === 'undefined') {
      return;
    } else {
      var args = arguments;
      return createColour(args);
    }
  };

  Colour.settings = {
    gamma: 2.2,
    safeColor: true,
    lightSourceType: 'D65'
  };

  Colour.RGB = function() {
    var R, G, B;

    var args = arguments;

    if (args.length == 3) {
      R = args[0];
      G = args[1];
      B = args[2];
    } else if (args.length == 1) {
      var parameters = args[0];

      if (_isArray(parameters)) {
        R = parameters[0];
        G = parameters[1];
        B = parameters[2];
      } else {
        if ('R' in parameters || 'r' in parameters) {
          if (parameters.R) {
            R = parameters.R;
          } else {
            R = parameters.r;
          }
        }

        if ('G' in parameters || 'g' in parameters) {
          if (parameters.G) {
            G = parameters.G;
          } else {
            G = parameters.g;
          }
        }

        if ('B' in parameters || 'b' in parameters) {
          if (parameters.B) {
            B = parameters.B;
          } else {
            B = parameters.b;
          }
        }
      }
    }

    return createRGB(R, G, B);
  };

  Colour.HSV = function() {
    var H, S, V;

    var args = arguments;

    if (args.length == 3) {
      H = args[0];
      S = args[1];
      V = args[2];
    } else if (args.length == 1) {
      var parameters = args[0];

      if (_isArray(parameters)) {
        H = parameters[0];
        S = parameters[1];
        V = parameters[2];
      } else {
        if ('H' in parameters || 'h' in parameters) {
          if (parameters.H) {
            H = parameters.H;
          } else {
            H = parameters.h;
          }
        }

        if ('S' in parameters || 's' in parameters) {
          if (parameters.S) {
            S = parameters.S;
          } else {
            S = parameters.s;
          }
        }

        if ('V' in parameters || 'v' in parameters) {
          if (parameters.V) {
            V = parameters.V;
          } else {
            V = parameters.v;
          }
        }
      }
    }

    return createHSV(H, S, V);
  };

  Colour.LinearRGB = function() {
    var R, G, B;

    var args = arguments;

    if (args.length == 3) {
      R = args[0];
      G = args[1];
      B = args[2];
    } else if (args.length == 1) {
      var parameters = args[0];

      if (_isArray(parameters)) {
        R = parameters[0];
        G = parameters[1];
        B = parameters[2];
      } else {
        if ('R' in parameters || 'r' in parameters) {
          if (parameters.R) {
            R = parameters.R;
          } else {
            R = parameters.r;
          }
        }

        if ('G' in parameters || 'g' in parameters) {
          if (parameters.G) {
            G = parameters.G;
          } else {
            G = parameters.g;
          }
        }

        if ('B' in parameters || 'b' in parameters) {
          if (parameters.B) {
            B = parameters.B;
          } else {
            B = parameters.b;
          }
        }
      }
    }

    return createLinearRGB(R, G, B);
  };

  Colour.XYZ = function() {
    var X, Y, Z;

    var args = arguments;

    if (args.length === 3) {
      X = args[0];
      Y = args[1];
      Z = args[2];
    } else if (args.length === 1) {
      var parameters = args[0];

      if (_isArray(parameters)) {
        X = parameters[0];
        Y = parameters[1];
        Z = parameters[2];
      } else {
        if ('X' in parameters || 'x' in parameters) {
          if (parameters.X) {
            X = parameters.X;
          } else {
            X = parameters.x;
          }
        }

        if ('Y' in parameters || 'y' in parameters) {
          if (parameters.Y) {
            Y = parameters.Y;
          } else {
            Y = parameters.y;
          }
        }

        if ('Z' in parameters || 'z' in parameters) {
          if (parameters.Z) {
            Z = parameters.Z;
          } else {
            Z = parameters.z;
          }
        }
      }
    }

    return createXYZ(X, Y, Z);
  };

  Colour.CIELab = function() {
    var L, a, b;

    var args = arguments;

    if (args.length === 3) {
      L = args[0];
      a = args[1];
      b = args[2];
    } else if (args.length === 1) {
      var parameters = args[0];

      if (_isArray(parameters)) {
        L = parameters[0];
        a = parameters[1];
        b = parameters[2];
      } else {
        if ('L' in parameters || 'l' in parameters) {
          if (parameters.L) {
            L = parameters.L;
          } else {
            L = parameters.l;
          }
        }

        if ('A' in parameters || 'a' in parameters) {
          if (parameters.A) {
            a = parameters.A;
          } else {
            a = parameters.a;
          }
        }

        if ('B' in parameters || 'b' in parameters) {
          if (parameters.B) {
            b = parameters.B;
          } else {
            b = parameters.b;
          }
        }
      }
    }

    return createCIELab(L, a, b);
  };


  /* Define prototype object */

  // colour object
  var colour = {};

  colour.RGB = function() {
    if (typeof this._raw.RGB !== 'undefined') {
      var r = this._raw.RGB;

      return createRGB(
        Math.round(r.R),
        Math.round(r.G),
        Math.round(r.B)
      );
    } else {
      return;
    }
  };

  colour.HSV = function() {
    if (typeof this._raw.HSV !== 'undefined') {
      var r = this._raw.HSV;

      return createHSV(
        Math.round(r.H),
        Math.round(r.S),
        Math.round(r.V)
      );
    } else {
      return;
    }
  };

  colour.LinearRGB = function() {
    if (typeof this._raw.LinearRGB !== 'undefined') {
      var r = this._raw.LinearRGB;

      return createLinearRGB(
        Math.round(r.R * 100) / 100,
        Math.round(r.G * 100) / 100,
        Math.round(r.B * 100) / 100
      );
    } else {
      return;
    }
  };

  colour.XYZ = function() {
    if (typeof this._raw.XYZ !== 'undefined') {
      var r = this._raw.XYZ;

      return createXYZ(
        Math.round(r.X * 100) / 100,
        Math.round(r.Y * 100) / 100,
        Math.round(r.Z * 100) / 100
      );
    } else {
      return;
    }
  };

  colour.CIELab = function() {
    if (typeof this._raw.CIELab !== 'undefined') {
      var r = this._raw.CIELab;

      return createCIELab(
        Math.round(r.L * 100) / 100,
        Math.round(r.a * 100) / 100,
        Math.round(r.b * 100) / 100
      );
    } else {
      return;
    }
  };

  colour.lighten = function(p) {
    var lab = this._raw.CIELab;

    var L = (1 + p) * lab.L;
    var a = lab.a;
    var b = lab.b;

    var newLab = Colour.CIELab(L, a, b);
    return Colour(newLab);
  };

  colour.darken = function(p) {
    var lab = this._raw.CIELab;

    var L = (1 - p) * lab.L;
    var a = lab.a;
    var b = lab.b;

    var newLab = Colour.CIELab(L, a, b);
    return Colour(newLab);
  };

  colour.mix = function(colour) {
    var lab = this._raw.CIELab;
    var newLab = colour.CIELab();

    var L = (lab.L + newLab.L) / 2;
    var a = (lab.a + newLab.a) / 2;
    var b = (lab.b + newLab.b) / 2;

    var mixedLab = Colour.CIELab(L, a, b);
    return Colour(mixedLab);
  };


  var createColour = function(args) {
    var c = Object.create(colour);
    var RGB;

    if (args.length === 3) {
      RGB = createRGB(args[0], args[1], args[2]);
    } else if (args.length === 1) {
      var p = args[0];

      if (_isArray(p)) {
        RGB = createRGB(p[0], p[1], p[2]);
      } else if (typeof p === 'string' && _isColorCode(p)) {
        var code = _unificationColorCode(p);
        RGB = _RGBFromColorCode(code);
      } else if ('type' in p) {
        switch (p.type) {
          case 'RGB':
            RGB = p;
            break;
          case 'HSV':
            RGB = _HSVtoRGB(p);
            break;
          case 'LinearRGB':
            RGB = _LinearRGBtoRGB(p);
            break;
          case 'XYZ':
            var lrgb = _XYZtoLinearRGB(p);
            RGB = _LinearRGBtoRGB(lrgb);
            break;
          case 'CIELab':
            var xyz = _CIELabtoXYZ(p);
            var lrgb = _XYZtoLinearRGB(xyz);
            RGB = _LinearRGBtoRGB(lrgb);
            break;
        }
      }

    } else {
      return;
    }
    if (typeof RGB !== 'undefined') {
      var raw = {};
      raw.RGB = RGB;
      raw.HSV = _RGBtoHSV(raw.RGB);
      raw.LinearRGB = _RGBtoLinearRGB(raw.RGB);
      raw.XYZ = _LinearRGBtoXYZ(raw.LinearRGB);
      raw.CIELab = _XYZtoCIELab(raw.XYZ);

      c._raw = raw;
    } else {
      return;
    }

    return c;
  };


  // coord object
  var coord = {};

  var rgb = Object.create(coord);
  rgb.hex = function(format) {
    var args = [this.R, this.G, this.B].map(function(v) {
      var s = '' + v.toString(16);
      if (s.length === 1) {
        s = '0' + s;
      }
      return s;
    });

    return '#' + args[0] + args[1] + args[2];
  };

  var createRGB = function(R, G, B) {
    if (R < 0 || R > 255) {
      return;
    }

    if (G < 0 || G > 255) {
      return;
    }

    if (B < 0 || B > 255) {
      return;
    }

    var c = Object.create(rgb);
    c.type = 'RGB';
    c.R = R;
    c.G = G;
    c.B = B;

    return c;
  };

  var createHSV = function(H, S, V) {
    if (H < 0 || H > 360) {
      return;
    }

    if (S < 0 || S > 100) {
      return;
    }

    if (V < 0 || V > 100) {
      return;
    }

    var c = Object.create(coord);
    c.type = 'HSV';
    c.H = H;
    c.S = S;
    c.V = V;

    return c;
  };

  var createLinearRGB = function(R, G, B) {
    var c = Object.create(coord);
    c.type = 'LinearRGB';
    c.R = R;
    c.G = G;
    c.B = B;

    return c;
  };

  var createXYZ = function(X, Y, Z) {
    var c = Object.create(coord);
    c.type = 'XYZ';
    c.X = X;
    c.Y = Y;
    c.Z = Z;

    return c;
  };

  var createCIELab = function(L, a, b) {
    var c = Object.create(coord);
    c.type = 'CIELab';
    c.L = L;
    c.a = a;
    c.b = b;

    return c;
  };


  /* Util private methods */

  var _isArray = function(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
  };

  var _isColorCode = function(string) {
    var re = /(^#([\da-fA-F]{6}|[\da-fA-F]{3})$)|(^([\da-fA-F]{6}|[\da-fA-F]{3})$)/;
    return re.test(string);
  };

  var _unificationColorCode = function(code) {
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

  var _RGBFromColorCode = function(code) {
    var rString = code.slice(0, 2);
    var gString = code.slice(2, 4);
    var bString = code.slice(4, 6);

    var R = parseInt(rString, 16);
    var G = parseInt(gString, 16);
    var B = parseInt(bString, 16);

    return createRGB(R, G, B);
  };

  // RGB <-> HSV
  var _RGBtoHSV = function(rgb) {
    var R = rgb.R / 255;
    var G = rgb.G / 255;
    var B = rgb.B / 255;

    var H, S, V;

    if (R == G && R == B) {
      H = 0;
      S = 0;
      V = R;
    } else if (R >= G && R > B) {
      var min = G;
      if (min > B) {
        min = B;
      };
      H = (60 * (G - B) / (R - min) + 0) % 360;
      S = (R - min) / R;
      V = R;
    } else if (G >= B && G > R) {
      var min = B;
      if (min > R) {
        min = R;
      };
      H = (60 * (B - R) / (G -min) + 120) % 360;
      S = (G - min) / G;
      V = G;
    } else if (B >= R && B > G) {
      var min = R;
      if (min > G) {
        min = G;
      };
      H = (60 * (R - G) / (B - min) + 240) % 360;
      S = (B - min) / B;
      V = B;
    };

    return createHSV(H, S * 100, V * 100);
  };

  var _HSVtoRGB = function(hsv) {
    var H = hsv.H;
    var S = hsv.S / 100;
    var V = hsv.V / 100;

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

    return createRGB(R * 255, G * 255, B * 255);
  };

  // RGB <-> LinearRGB
  var _RGBtoLinearRGB = function(rgb) {
    var R = rgb.R / 255;
    var G = rgb.G / 255;
    var B = rgb.B / 255;

    var gamma = Colour.settings.gamma;

    var args = [R, G, B].map(function(v) {
      if (v <= 0.04045) {
        return v / 12.92;
      } else {
        return Math.pow((v + 0.055) / 1.055, gamma);
      }
    });

    return createLinearRGB(args[0], args[1], args[2]);
  };

  var _LinearRGBtoRGB = function(lrgb) {
    var lR = lrgb.R;
    var lG = lrgb.G;
    var lB = lrgb.B;

    var gamma = Colour.settings.gamma;

    var args = [lR, lG, lB].map(function(v) {
      if (v <= 0.0031308) {
        return 12.29 * v;
      } else {
        return 1.055 * Math.pow(v, 1 / gamma) - 0.055
      }
    });

    return createRGB(args[0] * 255, args[1] * 255, args[2] * 255);
  };

  // LinearRGB <-> XYZ
  var _LinearRGBtoXYZ = function(lrgb) {
    var lR = lrgb.R;
    var lG = lrgb.G;
    var lB = lrgb.B;

    var Xn = 0.4124 * lR + 0.3576 * lG + 0.1805 * lB;
    var Yn = 0.2126 * lR + 0.7152 * lG + 0.0722 * lB;
    var Zn = 0.0193 * lR + 0.1192 * lG + 0.9505 * lB;

    return createXYZ(Xn * 100, Yn * 100, Zn * 100);
  };

  var _XYZtoLinearRGB = function(xyz) {
    var Xn = xyz.X / 100;
    var Yn = xyz.Y / 100;
    var Zn = xyz.Z / 100;

    var safeColor = Colour.settings.safeColor;

    var lR = 3.2406 * Xn - 1.5372 * Yn - 0.4986 * Zn;
    var lG = -0.9689 * Xn + 1.8758 * Yn + 0.0415 * Zn;
    var lB = 0.0557 * Xn - 0.204 * Yn + 1.057 * Zn;

    if (safeColor) {
      if (lR > 1) {
        lR = 1;
      }

      if (lR < 0) {
        lR = 0;
      }

      if (lG > 1) {
        lG = 1;
      }

      if (lG < 0) {
        lG = 0;
      }

      if (lB > 1) {
        lB = 1;
      }

      if (lB < 0) {
        lB = 0;
      }
    }

    return createLinearRGB(lR, lG, lB);
  };

  // XYZ <-> CIELab
  var _XYZtoCIELab = function(xyz) {
    var X = xyz.X;
    var Y = xyz.Y;
    var Z = xyz.Z;

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

    return createCIELab(L, a, b);
  };

  var _CIELabtoXYZ = function(lab) {
    var L = lab.L;
    var a = lab.a;
    var b = lab.b;

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

    return createXYZ(X, Y, Z);
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


  /* Export section */

  if ('process' in global) {
    module['exports'] = Colour;
  }
  global['Colour' in global ? 'Colour_' : 'Colour'] = Colour;

})((this || 0).self || global);
