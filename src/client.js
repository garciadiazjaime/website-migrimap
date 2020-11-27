import * as sapper from '@sapper/app';
mapboxgl.accessToken = process.mapboxToken

sapper.start({
	target: document.querySelector('#sapper')
});
