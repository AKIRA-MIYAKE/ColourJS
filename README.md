ColourJS
========
ColourJS is library of manipulate color in JavaScript.

# Colour object
### Create Colour object

```js
/* From color code */
var red = Colour('#ff0000');

/* From RGB color model values */
var blue = Colour(0, 0, 255);

/* From array of RGB color model values */
var green = Colour([0, 255, 0]);

/* From coord of color system object */
var CIELab = Colour.CIELab(50, 0, 0);
var gray = Colour(CIELab);
```

### Get color coord object

```js
var red = Colour('#ff0000');

var RGB = red.RGB();
var HSV = red.HSV();
var LinearRGB = red.LinearRGB();
var XYZ = red.XYZ();
var CIELab = red.CIELab();
```

# Color coord object
Color coord object has three colors values.  
You refer to an colors values by referring to the index number.  

### RGB
Three colors values of 0–255.  
RGB object can convert to HSV and LinearRGB.  

```js
var RGB = Colour.RGB(150, 120, 180);
RGB.hex();         // return hex string like 9678b4
RGB.toHSV();       // return HSV object
RGB.toLinearRGB(); // return LinearRGB object
```

### HSV
H color value of 0-359, and others values of 0-100.  
HSV object can convert to RGB.  

```js
var HSV = Colour.HSV(270, 30, 70);
HSV.toRGB();       // return RGB object
```

### LinearRGB
In safe color mode, Three colors values of 0-1.  
Default gamma value of 2.2.  
LinearRGB object can covert to RGB and XYZ.  

```js
var LinearRGB = Colour.LinearRGB(0.3, 0.2, 0.5);
LinearRGB.toRGB(); // return RGB object
LinearRGB.toXYZ(); // return XYZ object
```

### XYZ
XYZ object can convert to LinearRGB and CIELab.  

```js
var XYZ = Colour.XYZ(30, 26, 50);
XYZ.toLinearRGB(); // return LinearRGB object
XYZ.toCIELab();    // return CIELab object
```

### CIELab
CIELab object can convert to XYZ.  

```js
var CIELab = Colour.CIELab(58, 19, -21);
CIElab.toXYZ();    // return XYZ object
```

# Manipulate color
Colour object is immutable.  
Manipulate methods returns new colour object.  

### Adjust Hue
```js
var colour = Colour(150, 120, 180);
var newColour = colour.adjustHue(120);
```

### Lighten
Argument value of 0-1.  

```js
var colour = Colour(150, 120, 180);
var lighter = colour.lighten(0.3);
```

### Darken
Argument value of 0-1.  

```js
var colour = Colour(150, 120, 180);
var darker = colour.darken(0.3);
```

### Saturate
Argument value of 0-1.  

```js
var colour = Colour(150, 120, 180);
var vivid = colour.saturate(0.3);
```

### Desaturate
Argument value of 0-1.

```js
var colour = Colour(150, 120, 180);
var dull = colour.desaturate(0.3);
```

### Mix
```js
var colour1 = Colour(150, 120, 180);
var colour2 = Colour(100, 200, 30);
var mixedColour = colour1.mix(colour2);
```

### Clone
```js
var colour = Colour(150, 120, 180);
var newColour = colour.clone();
```
