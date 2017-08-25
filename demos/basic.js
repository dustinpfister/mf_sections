
// map section size (pixels)
S.map.sw = 800;
S.map.sh = 600;

// map section size (section count)
S.map.W = 4;
S.map.H = 4;

// map view port size (pixels)
S.vp.w = 320;
S.vp.h = 240;

// setup map, and view port
S.map.set();
S.vp.set();

// load current section
S.vp.ls();

console.log('section count: ' + S.map.secs.length); // 16 sections
console.log('loaded count: ' + S.map.load.length); // 4 sections loaded

// change view port position
S.vp.x = -1600;
S.vp.y = -1200;

S.vp.ls();
console.log('loaded count: ' + S.map.load.length); // 1 sections loaded

// objects
console.log('S object');
console.log(S);

console.log('ViewPort Object: ');
console.log(S.vp);

console.log('Sections Array: ');
console.log(S.map.secs);

console.log('Loaded Sections Array: ');
console.log(S.map.load);
