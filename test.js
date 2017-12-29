const test=require('tape');
const isEqual = require('is-equal');

const {cutPolyLine2D}=require('.');

var poly=[[1,1],[2,5],[3,3],[4,5],[5,2],[4,6],[2,6]];


test('vertical line cutting 2 edges', function (t) {
	let out = cutPolyLine2D(poly, [3.5,0], [0,1]);
	t.ok(isEqual(out, [ 
	[ [ 1, 1 ], [ 2, 5 ], [ 3, 3 ], [ 3.5, 4 ], [ 3.5, 6 ], [ 2, 6 ] ],
  	[ [ 3.5, 4 ], [ 4, 5 ], [ 5, 2 ], [ 4, 6 ], [ 3.5, 6 ] ] ]));
	t.end();
});

test('horizontal line cutting 6 edges', function (t) {
	let out = cutPolyLine2D(poly, [0,4], [1,0]);
	t.ok(isEqual(out, [ 
  [ [ 1, 1 ], [ 1.75, 4 ], [ 1.6, 4 ] ],
  [ [ 1.75, 4 ],
    [ 2, 5 ],
    [ 2.5, 4 ],
    [ 3.5, 4 ],
    [ 4, 5 ],
    [ 4.333333333333333, 4 ],
    [ 4.5, 4 ],
    [ 4, 6 ],
    [ 2, 6 ],
    [ 1.6, 4 ] ],
  [ [ 2.5, 4 ], [ 3, 3 ], [ 3.5, 4 ] ],
  [ [ 4.333333333333333, 4 ], [ 5, 2 ], [ 4.5, 4 ] ] ]));
	t.end();
});

test('splitting line intersects vertex 3', function (t) {
	let out = cutPolyLine2D(poly, [0,3], [1,0]);
	//FIXME duplicate [3,3]
/*	t.ok(isEqual(out, [ 
  [ [ 1, 1 ], [ 1.5, 3 ], [ 1.4, 3 ] ],
  [ [ 1.5, 3 ],
    [ 2, 5 ],
    [ 3, 3 ],
    //[ 3, 3 ],
    [ 4, 5 ],
    [ 4.666666666666667, 3 ],
    [ 4.75, 3 ],
    [ 4, 6 ],
    [ 2, 6 ],
    [ 1.4, 3 ] ],
  //[ [ 3, 3 ], [ 3, 3 ], [ 3, 3 ] ],
  [ [ 4.666666666666667, 3 ], [ 5, 2 ], [ 4.75, 3 ] ] ]
	));*/
	t.end();
});

test('splitting line intersects vertices 2 and 4', function (t) {
	let out = cutPolyLine2D(poly, [0,5], [1,0]);
	//FIXME duplicates
	/*t.ok(isEqual(out, [ [ [ 1, 1 ], [ 2, 5 ], [ 1.8, 5 ] ],
  [ [ 2, 5 ],
    //[ 2, 5 ],
    //[ 2, 5 ],
    [ 4, 5 ],
    //[ 4, 5 ],
    //[ 4, 5 ],
    [ 4.25, 5 ],
    [ 4, 6 ],
    [ 2, 6 ],
    [ 1.8, 5 ] ],
  [ [ 2, 5 ], [ 3, 3 ], [ 4, 5 ] ],
  [ [ 4, 5 ], [ 5, 2 ], [ 4.25, 5 ] ] ]
	));*/
	t.end();
});

test('splitting line contains edge', function (t) {
	let out = cutPolyLine2D(poly, [0,6], [1,0]);
	//FIXME
/*	t.ok(isEqual(out, [ 
  [ [ 1, 1 ],
    [ 2, 5 ],
    [ 3, 3 ],
    [ 4, 5 ],
    [ 5, 2 ],
    [ 4, 6 ],
    [ 2, 6 ] ],
  //[ [ 4, 6 ], [ 4, 6 ], [ 2, 6 ], [ 2, 6 ] ] ]
	));*/
	t.end();
});

test('arbitrary splitting line direction', function (t) {
	let out = cutPolyLine2D(poly, [0,-1], [1,1]);
	t.ok(isEqual(out, [ [ [ 1, 1 ],
    [ 2, 5 ],
    [ 3, 3 ],
    [ 4, 5 ],
    [ 4.5, 3.5 ],
    [ 4.6, 3.6 ],
    [ 4, 6 ],
    [ 2, 6 ] ],
  [ [ 4.5, 3.5 ], [ 5, 2 ], [ 4.6, 3.6 ] ] ]
	));
	t.end();
});