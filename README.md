# Test P5.js and jsdom repo

This runs a few basic tests through `jsdom` to see if this works for my use case.


once we want to use the p5.js native functions for saving files, we need to make sure that `URL.createObjectURL` exists. This seems to not be the case in `jsdom`. Currently `saveCanvas('test', 'png');` throws errors.
