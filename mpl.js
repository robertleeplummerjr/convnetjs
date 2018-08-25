
//matrix pattern logger

module.exports = function mpl(json) {
  var tracker = [];
  json.forEach(function(value) {

  });
};

module.exports = class MPL {
  constructor(name, width, height) {
    this.width = width;
    this.height = height;
    this.widths = {};
    this.heights = {};
    this.name = name;
    this.root = {};
    for (var y = 0; y < height; y++) {
      var row = this.root[y] = {};
      for (var x = 0; x < width; x++) {
        row[x] = {};
      }
    }
  }
  add(patternName, rootX, rootY, patternX, patternY, patternWidth, patternHeight) {
    if (!this.root[rootY][rootX][patternName]) {
      this.widths[patternName] = 0;
      this.heights[patternName] = 0;
      this.root[rootY][rootX][patternName] = {};
    }
    const pattern = this.root[rootY][rootX][patternName];

    if (!pattern[patternY]) {
      pattern[patternY] = []
    }
    pattern[patternY].push(patternX);
    if (patternWidth > this.widths[patternName]) {
      this.widths[patternName] = patternWidth;
    }
    if (patternHeight > this.heights[patternName]) {
      this.heights[patternName] = patternHeight;
    }
  }
  toString(patternName) {
    var result = [];
    for (var rootY = 0; rootY < this.height; rootY++) {
      for (var rootX = 0; rootX < this.width; rootX++) {
        var pattern = this.root[rootY][rootX][patternName];
        if (!pattern) continue;
        var patternWidth = this.widths[patternName];
        var patternHeight = this.heights[patternName];
        var rows = [`${patternName}${ ' '.repeat(patternWidth * 3) }\t\t${ this.name }`];
        for (var patternY = 0; patternY < patternHeight; patternY++) {
          var row = '';
          for (var patternX = 0; patternX < patternWidth; patternX++) {
            if (pattern[patternY] && pattern[patternY].indexOf(patternX) > -1) {
              row += '[*]';
            } else {
              row += '[ ]';
            }
          }


          if (patternY < this.height) {
            row += '\t\t\t';
            for (var x = 0; x < this.width; x++) {
              if (x === rootX && patternY === rootY) {
                row += '[*]';
              } else {
                row += '[ ]';
              }
            }
          }

          rows.push(row);

          if (patternY + 1 === patternHeight) {
            var beyondPatternHeight = patternY + 1;
            while (beyondPatternHeight < this.height) {
              var beyondRow = ' '.repeat(patternWidth * 3);
              beyondRow += '\t\t\t';
              for (var x = 0; x < this.width; x++) {
                if (x === rootX && beyondPatternHeight === rootY) {
                  beyondRow += '[*]';
                } else {
                  beyondRow += '[ ]';
                }
              }
              rows.push(beyondRow);
              beyondPatternHeight++;
            }
            rows.push('');
          }
        }

        result.push(rows.join('\n'));
      }
    }
    return result.join('\n');
  }
};