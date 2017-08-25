
S.map.sw = 800;
S.map.sh = 600;
S.map.W = 4;
S.map.H = 4;

S.vp.w = 320;
S.vp.h = 240;

S.map.set();
S.vp.set();

S.vp.ls();


console.log('S object');
console.log(S);

console.log('ViewPort Object: ');
console.log(S.vp);

console.log('Sections Array: ');
console.log(S.map.secs);


console.log('Loaded Sections Array: ');
console.log(S.map.load);
