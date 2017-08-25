## sections.js

Sections is a JavaScript micro framework (around 2KB or lower so far) developed as my solution for helping with breaking down a large map area into smaller sections. The main reason for doing this is so that I do not have to loop over a very large array of objects, but rather just a few objects that are in the arrays of the current loaded 'sections'.

In other words say you have a space shooter game in which you have a map that contains 20,000 planet objects, are you going to loop over all twenty thousand planet object instances on each frame tick? Of course not, you need to break it down some way. Sections can be regarded as my solution to this problem.

### Getting Started Example

```js
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
```

## sections_zoom.js

I also made sections_zoom.js as a more advanced variant that introduces a zoom feature.