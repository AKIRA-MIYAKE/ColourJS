ColourJS
========
ColourJS is library of manipulate color in JavaScript.

## Create Colour object

    var white = Colour('#ffffff');  // Hex color code
    var blue = Colour(0, 0, 255);   // RGB parameters
    var red = Colour([255, 0, 0]);  // RGB array

## Create Colour object from color coord

    var rgb = Colour.RGB(255, 255, 255);    // Coord from param
    var white = Colour(rgb);

    var hex = Colour.HEX([240, 100, 100]);  // Coord from array
    var blue = Colour(hex);

    var lab = Colour.CIELab({
      L: 53,
      a: 76,
      b: 68
    });                       // Coord from object
    var red = Colour(lab);

## Get color coord from Colour object

    var colour = Colour(160, 160, 160);

    var rgb = colour.RGB();         // RGB
    var hsv = colour.HSV();         // HSV
    var lrgb = colour.LinearRGB();  // Linear RBB
    var xyz = colour.XYZ();         // XYZ
    var lab = colour.CIELab();      // CIELab
