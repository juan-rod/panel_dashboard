export const scrollTo = (pos, duration = 750) => new Promise(resolve => {
  animateScroll(document.documentElement, 'scrollTop', pos, duration, 'easeInOutSine', resolve)
})

export const kebabify = (words) =>
  words
    .toLowerCase()
    .replace(' ', '-')

export const separateDash = (name) => name.split("-")
    
export const digitsOnly = (string) => string.replace (/[^\d]/g, "")

export const flatten = function(obj, name, stem) {
  var out = {};

  var newStem = (typeof stem !== 'undefined' && stem !== '') ? stem + '_' + name : name;

  var merge = function(objects) {
    var out = {};
    for (var i = 0; i < objects.length; i++) {
      for (var p in objects[i]) {
        out[p] = objects[i][p];
      }
    }
  
    return out;
  }

  if (typeof obj !== 'object') {
    out[newStem] = obj;
    return out;
  }

  for (var p in obj) {
    var prop = flatten(obj[p], p, newStem);
    out = merge([out, prop]);
  }

  return out;
}
export const isEmpty = (obj) => Object.values(obj).indexOf(undefined) >= 0;

export const isNil = (val) => val == null || val.length === 0;

export const filterObj = (theKeys, theObj) => theKeys.reduce((result, key) => { result[key] = theObj[key]; return result; }, {});

export const findDuplicate = (arrArg) => arrArg.filter((elem, pos, arr) => { return pos !== arr.indexOf(elem)})

export const filterDOB = (dob) => new Date(dob).toLocaleString().split(',')

export const editClassName = (name) => name.split('_')

export const twoDigits = (arrArg) => arrArg.map((elem) => {return (elem < 10 ? '0' : '') + elem})

export const unMaskDOB = (dob) => {
  const splitDOB = dob.split("/")
  return splitDOB[2]+'-'+splitDOB[0] +'-'+splitDOB[1] +'T12:00:00.000Z'
} 
export const splitDOB = (dob) => {
  const split = dob.split("/")
  return split
} 

export const unMaskPhone = (phone) => phone.replace(/[^+\d]+/g, "")