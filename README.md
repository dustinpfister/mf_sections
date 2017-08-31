## sections.js

Sections is a JavaScript micro framework (around 2KB or lower so far) developed as my solution for helping with breaking down a large map area into smaller sections. The main reason for doing this is so that I do not have to loop over a very large array of objects, but rather just a few objects that are in the arrays of the current loaded 'sections'.

In other words say you have a space shooter game in which you have a map that contains 20,000 planet objects, are you going to loop over all twenty thousand planet object instances on each frame tick? Of course not, you need to break it down some way. Sections can be regarded as my solution to this problem.

### Getting Started Example

```js
 // I want 640 x 480 px sections, and I want a 10 * 8 grid of them
 S.set(640,480,10,8);
 
 // set look ahead to 1
 S.la = 1;
 
 // load sections with the given view port values
 S.ls(0,0,320,240);
 
 console.log(S.secs.length); // 80 sections
 console.log(S.load.length); // 9 currently loaded.
```

## The Props

### S.sw

The pixel width of a section

### S.sh

The pixel height of a section

### S.W

The width of the section grid

### S.H

The height of the section grid

### S.la

how many sections to look ahead. If set to 0 only the sections that lay within the view port values given when calling S.ls(x,y,w,h) will be loaded into S.load.

### S.secs

The array of sections

## S.load

The currently loaded sections, this is what I will be looping over on each frame tick. The whole point of this dependency is because of this array, as it helps to reduce workload.

## The Methods


### S.set(sw,sh,W,H);

```js
 S.set(640,480,10,10);
 
 console.log(S.secs.length); // 100
```

### S.getPos(x,y)

Get a section at the given x, and y pixel location.

```js
 S.set(640,480,10,8);
 
 var section = S.getPos(680,200); // get the section at pixel location 680,200
 
 console.log(section.X + ',' +section.Y); // 1,0
```

### S.get(X,Y)

Get a section at the given grid location

 S.set(640,480,10,8);
 
 var section = S.get(1,0); // get the section at grid location 1,0
 
 console.log(section.X + ',' +section.Y); // 1,0
 
### S.ls(x,y,w,h)

load sections into S.load based on the given view port values, and preexisting load is lost.