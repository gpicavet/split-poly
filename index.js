'use strict';

function cutPolyLine2D(poly, rayOrig, rayDir) {
	if(!poly || poly.length<3)
		throw "poly must have at least 3 vertices";

	var interPoints = [];

	var start=poly[poly.length-1];
	for(var ivert=0; ivert<poly.length; ivert++) {
		var end=poly[ivert];

		//inter = start + s * (end-start)
		//s = (rayOrig-start) dot (-rayDir.y, rayDir.x) / (end-start) dot (-rayDir.y, rayDir.x)
		//inter in edge if s>=0 && s<=1
		var edgeDir = [end[0]-start[0], end[1]-start[1]];
		var den = rayDir[0] * edgeDir[1] - rayDir[1] * edgeDir[0];
		if(den!=0) {
			var num = rayDir[0] * (rayOrig[1] - start[1]) - rayDir[1] * (rayOrig[0] - start[0]);
			var s = num / den;

			if(s>=0 && s<=1) {
				var p = [
					start[0] + s * edgeDir[0],
					start[1] + s * edgeDir[1]
				];
				//inter = rayOrig + t * rayDir
				//t = det((end-start),(rayOrig-start)) / (end-start) dot (-rayDir.y, rayDir.x)
				num = edgeDir[0] * (rayOrig[1] - start[1]) - edgeDir[1] * (rayOrig[0] - start[0]);
				var t = num / den;
				interPoints.push({
					is:(ivert+poly.length-1)%poly.length,
					ie:ivert,
					p:p,
					t:t});
			}

		}
		start = end;
	}

	//sort inter points by distance from the ray origin
	interPoints.sort(function(a,b) {
		if(a.t<b.t)
			return -1;
		if(a.t>b.t)
			return 1;
		return 0;
	});
//	console.log(interPoints);

	if(interPoints.length%2 !==0)
		throw "unknown error";

	//list of new polygons with a first empty one (make it current)
	var output = [[]];
	var curPoly=output[0];

	//walk through initial poly points
	for(let ivert=0; ivert<poly.length; ivert++) {
//		console.log(ivert);
		//append first point to poly
		curPoly.push(poly[ivert]);

		//is there an intersection point ?
		var inter=null;
		for(var interTmp=0; interTmp<interPoints.length; interTmp++) {
			if(interPoints[interTmp].is == ivert) {
				inter = interTmp;
				break;
			}
		}

		if(inter !== null) {
			//yes, add the inter point to the current poly
			curPoly.push(interPoints[inter].p);
			//set the paired inter point to be the crossback point of this poly
			if(inter%2==0) {
//				console.log("+1");
				interPoints[inter+1].crossback=curPoly;
			} else {
//				console.log("-1");
				interPoints[inter-1].crossback=curPoly;
			}
			//now we have to switch the current poly to a pending one or to a new one
			if(interPoints[inter].crossback) {
				curPoly = interPoints[inter].crossback;
//				console.log("a");
			} else {
//				console.log("b");
				curPoly = [];
				output.push(curPoly);
			}
			//add the inter point the new current
			curPoly.push(interPoints[inter].p);
		}

	}

	return output;
}

module.exports = {
	cutPolyLine2D
}
