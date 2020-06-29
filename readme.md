# labyrinth generator.

This is a simple paradigm of a labyrinth generator.

## API points.

This repository is still in an early stage and will probably continue by making a small memory game
where the user will have to remember where the tiles are and move to the target area.

## Yes, but what does it do now?

Right now it just generates a puzzle NxN tiles with X obstacles. It checks everytime it adds an obstacle
if the puzzle is solvable. If it isn't it just selects a different obstacle and adds it. If you want to
play with it and the values go ahead and get [broswerify](https://guides.github.com/features/mastering-markdown/)
and the [typescript transpiler](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

basic commands to get started:

    tsc ./src/Labyrinth/index.ts

this transpiles Javascript to Typescript then:

    browserify ./src/Labyrinth/index.js > ./bundle.js

To create bundle.js which eventually gets loaded in the broswer. To play with configuration values check 
index.ts where the options are:

```javascript
const OPTIONS = {
    end: {
        x: 4,
        y: 7 
    },
    player: {
        x: 4,
        y: 0
    },
    obstacles: 40,
    board_size: 10
}
```

