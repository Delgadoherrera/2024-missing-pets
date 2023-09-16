System.register(["./index-legacy-7bd58e02.js"],(function(t,e){"use strict";var s,o,n,r,i;return{setters:[t=>{s=t.A,o=t.W,n=t._,r=t.M,i=t.L}],execute:function(){var a=function t(e,s){if(e===s)return!0;if(e&&s&&"object"==typeof e&&"object"==typeof s){if(e.constructor!==s.constructor)return!1;var o,n,r;if(Array.isArray(e)){if((o=e.length)!=s.length)return!1;for(n=o;0!=n--;)if(!t(e[n],s[n]))return!1;return!0}if(e.constructor===RegExp)return e.source===s.source&&e.flags===s.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===s.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===s.toString();if((o=(r=Object.keys(e)).length)!==Object.keys(s).length)return!1;for(n=o;0!=n--;)if(!Object.prototype.hasOwnProperty.call(s,r[n]))return!1;for(n=o;0!=n--;){var i=r[n];if(!t(e[i],s[i]))return!1}return!0}return e!=e&&s!=s};const l=s(a);function c(t,e,s,o,n,r){if(n-o<=s)return;const i=o+n>>1;d(t,e,i,o,n,r%2),c(t,e,s,o,i-1,r+1),c(t,e,s,i+1,n,r+1)}function d(t,e,s,o,n,r){for(;n>o;){if(n-o>600){const i=n-o+1,a=s-o+1,l=Math.log(i),c=.5*Math.exp(2*l/3),p=.5*Math.sqrt(l*c*(i-c)/i)*(a-i/2<0?-1:1);d(t,e,s,Math.max(o,Math.floor(s-a*c/i+p)),Math.min(n,Math.floor(s+(i-a)*c/i+p)),r)}const i=e[2*s+r];let a=o,l=n;for(p(t,e,o,s),e[2*n+r]>i&&p(t,e,o,n);a<l;){for(p(t,e,a,l),a++,l--;e[2*a+r]<i;)a++;for(;e[2*l+r]>i;)l--}e[2*o+r]===i?p(t,e,o,l):(l++,p(t,e,l,n)),l<=s&&(o=l+1),s<=l&&(n=l-1)}}function p(t,e,s,o){h(t,s,o),h(e,2*s,2*o),h(e,2*s+1,2*o+1)}function h(t,e,s){const o=t[e];t[e]=t[s],t[s]=o}function u(t,e,s,o){const n=t-s,r=e-o;return n*n+r*r}const g=t=>t[0],m=t=>t[1];class f{constructor(t,e=g,s=m,o=64,n=Float64Array){this.nodeSize=o,this.points=t;const r=t.length<65536?Uint16Array:Uint32Array,i=this.ids=new r(t.length),a=this.coords=new n(2*t.length);for(let l=0;l<t.length;l++)i[l]=l,a[2*l]=e(t[l]),a[2*l+1]=s(t[l]);c(i,a,o,0,i.length-1,0)}range(t,e,s,o){return function(t,e,s,o,n,r,i){const a=[0,t.length-1,0],l=[];let c,d;for(;a.length;){const p=a.pop(),h=a.pop(),u=a.pop();if(h-u<=i){for(let i=u;i<=h;i++)c=e[2*i],d=e[2*i+1],c>=s&&c<=n&&d>=o&&d<=r&&l.push(t[i]);continue}const g=Math.floor((u+h)/2);c=e[2*g],d=e[2*g+1],c>=s&&c<=n&&d>=o&&d<=r&&l.push(t[g]);const m=(p+1)%2;(0===p?s<=c:o<=d)&&(a.push(u),a.push(g-1),a.push(m)),(0===p?n>=c:r>=d)&&(a.push(g+1),a.push(h),a.push(m))}return l}(this.ids,this.coords,t,e,s,o,this.nodeSize)}within(t,e,s){return function(t,e,s,o,n,r){const i=[0,t.length-1,0],a=[],l=n*n;for(;i.length;){const c=i.pop(),d=i.pop(),p=i.pop();if(d-p<=r){for(let n=p;n<=d;n++)u(e[2*n],e[2*n+1],s,o)<=l&&a.push(t[n]);continue}const h=Math.floor((p+d)/2),g=e[2*h],m=e[2*h+1];u(g,m,s,o)<=l&&a.push(t[h]);const f=(c+1)%2;(0===c?s-n<=g:o-n<=m)&&(i.push(p),i.push(h-1),i.push(f)),(0===c?s+n>=g:o+n>=m)&&(i.push(h+1),i.push(d),i.push(f))}return a}(this.ids,this.coords,t,e,s,this.nodeSize)}}const y={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:t=>t},k=Math.fround||(M=new Float32Array(1),t=>(M[0]=+t,M[0]));var M;class w{constructor(t){this.options=_(Object.create(y),t),this.trees=new Array(this.options.maxZoom+1)}load(t){const{log:e,minZoom:s,maxZoom:o,nodeSize:n}=this.options;e&&console.time("total time");const r=`prepare ${t.length} points`;e&&console.time(r),this.points=t;let i=[];for(let a=0;a<t.length;a++)t[a].geometry&&i.push(L(t[a],a));this.trees[o+1]=new f(i,E,z,n,Float32Array),e&&console.timeEnd(r);for(let a=o;a>=s;a--){const t=+Date.now();i=this._cluster(i,a),this.trees[a]=new f(i,E,z,n,Float32Array),e&&console.log("z%d: %d clusters in %dms",a,i.length,+Date.now()-t)}return e&&console.timeEnd("total time"),this}getClusters(t,e){let s=((t[0]+180)%360+360)%360-180;const o=Math.max(-90,Math.min(90,t[1]));let n=180===t[2]?180:((t[2]+180)%360+360)%360-180;const r=Math.max(-90,Math.min(90,t[3]));if(t[2]-t[0]>=360)s=-180,n=180;else if(s>n){const t=this.getClusters([s,o,180,r],e),i=this.getClusters([-180,o,n,r],e);return t.concat(i)}const i=this.trees[this._limitZoom(e)],a=i.range(b(s),x(r),b(n),x(o)),l=[];for(const c of a){const t=i.points[c];l.push(t.numPoints?C(t):this.points[t.index])}return l}getChildren(t){const e=this._getOriginId(t),s=this._getOriginZoom(t),o="No cluster with the specified id.",n=this.trees[s];if(!n)throw new Error(o);const r=n.points[e];if(!r)throw new Error(o);const i=this.options.radius/(this.options.extent*Math.pow(2,s-1)),a=n.within(r.x,r.y,i),l=[];for(const c of a){const e=n.points[c];e.parentId===t&&l.push(e.numPoints?C(e):this.points[e.index])}if(0===l.length)throw new Error(o);return l}getLeaves(t,e,s){e=e||10,s=s||0;const o=[];return this._appendLeaves(o,t,e,s,0),o}getTile(t,e,s){const o=this.trees[this._limitZoom(t)],n=Math.pow(2,t),{extent:r,radius:i}=this.options,a=i/r,l=(s-a)/n,c=(s+1+a)/n,d={features:[]};return this._addTileFeatures(o.range((e-a)/n,l,(e+1+a)/n,c),o.points,e,s,n,d),0===e&&this._addTileFeatures(o.range(1-a/n,l,1,c),o.points,n,s,n,d),e===n-1&&this._addTileFeatures(o.range(0,l,a/n,c),o.points,-1,s,n,d),d.features.length?d:null}getClusterExpansionZoom(t){let e=this._getOriginZoom(t)-1;for(;e<=this.options.maxZoom;){const s=this.getChildren(t);if(e++,1!==s.length)break;t=s[0].properties.cluster_id}return e}_appendLeaves(t,e,s,o,n){const r=this.getChildren(e);for(const i of r){const e=i.properties;if(e&&e.cluster?n+e.point_count<=o?n+=e.point_count:n=this._appendLeaves(t,e.cluster_id,s,o,n):n<o?n++:t.push(i),t.length===s)break}return n}_addTileFeatures(t,e,s,o,n,r){for(const i of t){const t=e[i],a=t.numPoints;let l,c,d;if(a)l=I(t),c=t.x,d=t.y;else{const e=this.points[t.index];l=e.properties,c=b(e.geometry.coordinates[0]),d=x(e.geometry.coordinates[1])}const p={type:1,geometry:[[Math.round(this.options.extent*(c*n-s)),Math.round(this.options.extent*(d*n-o))]],tags:l};let h;a?h=t.id:this.options.generateId?h=t.index:this.points[t.index].id&&(h=this.points[t.index].id),void 0!==h&&(p.id=h),r.features.push(p)}}_limitZoom(t){return Math.max(this.options.minZoom,Math.min(Math.floor(+t),this.options.maxZoom+1))}_cluster(t,e){const s=[],{radius:o,extent:n,reduce:r,minPoints:i}=this.options,a=o/(n*Math.pow(2,e));for(let l=0;l<t.length;l++){const o=t[l];if(o.zoom<=e)continue;o.zoom=e;const n=this.trees[e+1],c=n.within(o.x,o.y,a),d=o.numPoints||1;let p=d;for(const t of c){const s=n.points[t];s.zoom>e&&(p+=s.numPoints||1)}if(p>d&&p>=i){let t=o.x*d,i=o.y*d,a=r&&d>1?this._map(o,!0):null;const h=(l<<5)+(e+1)+this.points.length;for(const s of c){const l=n.points[s];if(l.zoom<=e)continue;l.zoom=e;const c=l.numPoints||1;t+=l.x*c,i+=l.y*c,l.parentId=h,r&&(a||(a=this._map(o,!0)),r(a,this._map(l)))}o.parentId=h,s.push(v(t/p,i/p,h,p,a))}else if(s.push(o),p>1)for(const t of c){const o=n.points[t];o.zoom<=e||(o.zoom=e,s.push(o))}}return s}_getOriginId(t){return t-this.points.length>>5}_getOriginZoom(t){return(t-this.points.length)%32}_map(t,e){if(t.numPoints)return e?_({},t.properties):t.properties;const s=this.points[t.index].properties,o=this.options.map(s);return e&&o===s?_({},o):o}}function v(t,e,s,o,n){return{x:k(t),y:k(e),zoom:1/0,id:s,parentId:-1,numPoints:o,properties:n}}function L(t,e){const[s,o]=t.geometry.coordinates;return{x:k(b(s)),y:k(x(o)),zoom:1/0,index:e,parentId:-1}}function C(t){return{type:"Feature",id:t.id,properties:I(t),geometry:{type:"Point",coordinates:[(e=t.x,360*(e-.5)),P(t.y)]}};var e}function I(t){const e=t.numPoints,s=e>=1e4?`${Math.round(e/1e3)}k`:e>=1e3?Math.round(e/100)/10+"k":e;return _(_({},t.properties),{cluster:!0,cluster_id:t.id,point_count:e,point_count_abbreviated:s})}function b(t){return t/360+.5}function x(t){const e=Math.sin(t*Math.PI/180),s=.5-.25*Math.log((1+e)/(1-e))/Math.PI;return s<0?0:s>1?1:s}function P(t){const e=(180-360*t)*Math.PI/180;return 360*Math.atan(Math.exp(e))/Math.PI-90}function _(t,e){for(const s in e)t[s]=e[s];return t}function E(t){return t.x}function z(t){return t.y}
/*! *****************************************************************************
      Copyright (c) Microsoft Corporation.

      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.

      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */class O{constructor({markers:t,position:e}){this.markers=t,e&&(e instanceof google.maps.LatLng?this._position=e:this._position=new google.maps.LatLng(e))}get bounds(){if(0!==this.markers.length||this._position)return this.markers.reduce(((t,e)=>t.extend(e.getPosition())),new google.maps.LatLngBounds(this._position,this._position))}get position(){return this._position||this.bounds.getCenter()}get count(){return this.markers.filter((t=>t.getVisible())).length}push(t){this.markers.push(t)}delete(){this.marker&&(this.marker.setMap(null),delete this.marker),this.markers.length=0}}class S{constructor({maxZoom:t=16}){this.maxZoom=t}noop({markers:t}){return T(t)}}const T=t=>t.map((t=>new O({position:t.getPosition(),markers:[t]})));class Z extends S{constructor(t){var{maxZoom:e,radius:s=60}=t,o=function(t,e){var s={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(s[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(o=Object.getOwnPropertySymbols(t);n<o.length;n++)e.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(t,o[n])&&(s[o[n]]=t[o[n]])}return s}(t,["maxZoom","radius"]);super({maxZoom:e}),this.superCluster=new w(Object.assign({maxZoom:this.maxZoom,radius:s},o)),this.state={zoom:null}}calculate(t){let e=!1;if(!l(t.markers,this.markers)){e=!0,this.markers=[...t.markers];const s=this.markers.map((t=>({type:"Feature",geometry:{type:"Point",coordinates:[t.getPosition().lng(),t.getPosition().lat()]},properties:{marker:t}})));this.superCluster.load(s)}const s={zoom:t.map.getZoom()};return e||this.state.zoom>this.maxZoom&&s.zoom>this.maxZoom||(e=e||!l(this.state,s)),this.state=s,e&&(this.clusters=this.cluster(t)),{clusters:this.clusters,changed:e}}cluster({map:t}){return this.superCluster.getClusters([-180,-90,180,90],Math.round(t.getZoom())).map(this.transformCluster.bind(this))}transformCluster({geometry:{coordinates:[t,e]},properties:s}){if(s.cluster)return new O({markers:this.superCluster.getLeaves(s.cluster_id,1/0).map((t=>t.properties.marker)),position:new google.maps.LatLng({lat:e,lng:t})});{const t=s.marker;return new O({markers:[t],position:t.getPosition()})}}}class B{constructor(t,e){this.markers={sum:t.length};const s=e.map((t=>t.count)),o=s.reduce(((t,e)=>t+e),0);this.clusters={count:e.length,markers:{mean:o/e.length,sum:o,min:Math.min(...s),max:Math.max(...s)}}}}class j{render({count:t,position:e},s){const o=t>Math.max(10,s.clusters.markers.mean)?"#ff0000":"#0000ff",n=window.btoa(`\n  <svg fill="${o}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">\n    <circle cx="120" cy="120" opacity=".6" r="70" />\n    <circle cx="120" cy="120" opacity=".3" r="90" />\n    <circle cx="120" cy="120" opacity=".2" r="110" />\n  </svg>`);return new google.maps.Marker({position:e,icon:{url:`data:image/svg+xml;base64,${n}`,scaledSize:new google.maps.Size(45,45)},label:{text:String(t),color:"rgba(255,255,255,0.9)",fontSize:"12px"},title:`Cluster of ${t} markers`,zIndex:Number(google.maps.Marker.MAX_ZINDEX)+t})}}class A{constructor(){!function(t,e){for(let s in e.prototype)t.prototype[s]=e.prototype[s]}(A,google.maps.OverlayView)}}var N;!function(t){t.CLUSTERING_BEGIN="clusteringbegin",t.CLUSTERING_END="clusteringend",t.CLUSTER_CLICK="click"}(N||(N={}));const F=(t,e,s)=>{s.fitBounds(e.bounds)};class G extends A{constructor({map:t,markers:e=[],algorithm:s=new Z({}),renderer:o=new j,onClusterClick:n=F}){super(),this.markers=[...e],this.clusters=[],this.algorithm=s,this.renderer=o,this.onClusterClick=n,t&&this.setMap(t)}addMarker(t,e){this.markers.includes(t)||(this.markers.push(t),e||this.render())}addMarkers(t,e){t.forEach((t=>{this.addMarker(t,!0)})),e||this.render()}removeMarker(t,e){const s=this.markers.indexOf(t);return-1!==s&&(t.setMap(null),this.markers.splice(s,1),e||this.render(),!0)}removeMarkers(t,e){let s=!1;return t.forEach((t=>{s=this.removeMarker(t,!0)||s})),s&&!e&&this.render(),s}clearMarkers(t){this.markers.length=0,t||this.render()}render(){const t=this.getMap();if(t instanceof google.maps.Map&&this.getProjection()){google.maps.event.trigger(this,N.CLUSTERING_BEGIN,this);const{clusters:e,changed:s}=this.algorithm.calculate({markers:this.markers,map:t,mapCanvasProjection:this.getProjection()});(s||null==s)&&(this.reset(),this.clusters=e,this.renderClusters()),google.maps.event.trigger(this,N.CLUSTERING_END,this)}}onAdd(){this.idleListener=this.getMap().addListener("idle",this.render.bind(this)),this.render()}onRemove(){google.maps.event.removeListener(this.idleListener),this.reset()}reset(){this.markers.forEach((t=>t.setMap(null))),this.clusters.forEach((t=>t.delete())),this.clusters=[]}renderClusters(){const t=new B(this.markers,this.clusters),e=this.getMap();this.clusters.forEach((s=>{1===s.markers.length?s.marker=s.markers[0]:(s.marker=this.renderer.render(s,t),this.onClusterClick&&s.marker.addListener("click",(t=>{google.maps.event.trigger(this,N.CLUSTER_CLICK,s),this.onClusterClick(t,s,e)}))),s.marker.setMap(e)}))}}t("CapacitorGoogleMapsWeb",class extends o{constructor(){super(...arguments),this.gMapsRef=void 0,this.maps={},this.currMarkerId=0,this.currPolygonId=0,this.currCircleId=0,this.currPolylineId=0,this.onClusterClickHandler=(t,e,s)=>{var o,n;const r=this.getIdFromMap(s),i=[];if(null!=e.markers)for(const a of e.markers){const t=this.getIdFromMarker(r,a);i.push({markerId:t,latitude:null===(o=a.getPosition())||void 0===o?void 0:o.lat(),longitude:null===(n=a.getPosition())||void 0===n?void 0:n.lng(),title:a.getTitle(),snippet:""})}this.notifyListeners("onClusterClick",{mapId:r,latitude:e.position.lat(),longitude:e.position.lng(),size:e.count,items:i})}}getIdFromMap(t){for(const e in this.maps)if(this.maps[e].map==t)return e;return""}getIdFromMarker(t,e){for(const s in this.maps[t].markers)if(this.maps[t].markers[s]==e)return s;return""}async importGoogleLib(t,s,o){if(void 0===this.gMapsRef){const r=new((await n((()=>e.import("./index.esm-legacy-4922c5c5.js")),void 0)).Loader)({apiKey:null!=t?t:"",version:"weekly",libraries:["places"],language:o,region:s}),i=await r.load();this.gMapsRef=i.maps,console.log("Loaded google maps API")}}async enableTouch(t){this.maps[t.id].map.setOptions({gestureHandling:"auto"})}async disableTouch(t){this.maps[t.id].map.setOptions({gestureHandling:"none"})}async setCamera(t){this.maps[t.id].map.moveCamera({center:t.config.coordinate,heading:t.config.bearing,tilt:t.config.angle,zoom:t.config.zoom})}async getMapType(t){let e=this.maps[t.id].map.getMapTypeId();if(void 0!==e)return"roadmap"===e&&(e=r.Normal),{type:`${e.charAt(0).toUpperCase()}${e.slice(1)}`};throw new Error("Map type is undefined")}async setMapType(t){let e=t.mapType.toLowerCase();t.mapType===r.Normal&&(e="roadmap"),this.maps[t.id].map.setMapTypeId(e)}async enableIndoorMaps(){throw new Error("Method not supported on web.")}async enableTrafficLayer(t){var e;const s=null!==(e=this.maps[t.id].trafficLayer)&&void 0!==e?e:new google.maps.TrafficLayer;t.enabled?(s.setMap(this.maps[t.id].map),this.maps[t.id].trafficLayer=s):this.maps[t.id].trafficLayer&&(s.setMap(null),this.maps[t.id].trafficLayer=void 0)}async enableAccessibilityElements(){throw new Error("Method not supported on web.")}dispatchMapEvent(){throw new Error("Method not supported on web.")}async enableCurrentLocation(t){if(t.enabled){if(!navigator.geolocation)throw new Error("Geolocation not supported on web browser.");navigator.geolocation.getCurrentPosition((e=>{const s={lat:e.coords.latitude,lng:e.coords.longitude};this.maps[t.id].map.setCenter(s),this.notifyListeners("onMyLocationButtonClick",{}),this.notifyListeners("onMyLocationClick",{})}),(()=>{throw new Error("Geolocation not supported on web browser.")}))}}async setPadding(t){const e=this.maps[t.id].map.getBounds();void 0!==e&&this.maps[t.id].map.fitBounds(e,t.padding)}async getMapBounds(t){const e=this.maps[t.id].map.getBounds();if(!e)throw new Error("Google Map Bounds could not be found.");return new i({southwest:{lat:e.getSouthWest().lat(),lng:e.getSouthWest().lng()},center:{lat:e.getCenter().lat(),lng:e.getCenter().lng()},northeast:{lat:e.getNorthEast().lat(),lng:e.getNorthEast().lng()}})}async fitBounds(t){const e=this.maps[t.id].map,s=this.getLatLngBounds(t.bounds);e.fitBounds(s,t.padding)}async addMarkers(t){const e=[],s=this.maps[t.id];for(const o of t.markers){const n=this.buildMarkerOpts(o,s.map),r=new google.maps.Marker(n),i=""+this.currMarkerId;s.markers[i]=r,this.setMarkerListeners(t.id,i,r),e.push(i),this.currMarkerId++}return{ids:e}}async addMarker(t){const e=this.buildMarkerOpts(t.marker,this.maps[t.id].map),s=new google.maps.Marker(e),o=""+this.currMarkerId;return this.maps[t.id].markers[o]=s,this.setMarkerListeners(t.id,o,s),this.currMarkerId++,{id:o}}async removeMarkers(t){const e=this.maps[t.id];for(const s of t.markerIds)e.markers[s].setMap(null),delete e.markers[s]}async removeMarker(t){this.maps[t.id].markers[t.markerId].setMap(null),delete this.maps[t.id].markers[t.markerId]}async addPolygons(t){const e=[],s=this.maps[t.id];for(const o of t.polygons){const n=new google.maps.Polygon(o);n.setMap(s.map);const r=""+this.currPolygonId;this.maps[t.id].polygons[r]=n,this.setPolygonListeners(t.id,r,n),e.push(r),this.currPolygonId++}return{ids:e}}async removePolygons(t){const e=this.maps[t.id];for(const s of t.polygonIds)e.polygons[s].setMap(null),delete e.polygons[s]}async addCircles(t){const e=[],s=this.maps[t.id];for(const o of t.circles){const n=new google.maps.Circle(o);n.setMap(s.map);const r=""+this.currCircleId;this.maps[t.id].circles[r]=n,this.setCircleListeners(t.id,r,n),e.push(r),this.currCircleId++}return{ids:e}}async removeCircles(t){const e=this.maps[t.id];for(const s of t.circleIds)e.circles[s].setMap(null),delete e.circles[s]}async addPolylines(t){const e=[],s=this.maps[t.id];for(const o of t.polylines){const n=new google.maps.Polyline(o);n.set("tag",o.tag),n.setMap(s.map);const r=""+this.currPolylineId;this.maps[t.id].polylines[r]=n,this.setPolylineListeners(t.id,r,n),e.push(r),this.currPolylineId++}return{ids:e}}async removePolylines(t){const e=this.maps[t.id];for(const s of t.polylineIds)e.polylines[s].setMap(null),delete e.polylines[s]}async enableClustering(t){var e;const s=[];for(const o in this.maps[t.id].markers)s.push(this.maps[t.id].markers[o]);this.maps[t.id].markerClusterer=new G({map:this.maps[t.id].map,markers:s,algorithm:new Z({minPoints:null!==(e=t.minClusterSize)&&void 0!==e?e:4}),onClusterClick:this.onClusterClickHandler})}async disableClustering(t){var e;null===(e=this.maps[t.id].markerClusterer)||void 0===e||e.setMap(null),this.maps[t.id].markerClusterer=void 0}async onScroll(){throw new Error("Method not supported on web.")}async onResize(){throw new Error("Method not supported on web.")}async onDisplay(){throw new Error("Method not supported on web.")}async create(t){console.log(`Create map: ${t.id}`),await this.importGoogleLib(t.apiKey,t.region,t.language),this.maps[t.id]={map:new window.google.maps.Map(t.element,Object.assign({},t.config)),element:t.element,markers:{},polygons:{},circles:{},polylines:{}},this.setMapListeners(t.id)}async destroy(t){console.log(`Destroy map: ${t.id}`);const e=this.maps[t.id];e.element.innerHTML="",e.map.unbindAll(),delete this.maps[t.id]}async mapBoundsContains(t){const e=this.getLatLngBounds(t.bounds),s=new google.maps.LatLng(t.point.lat,t.point.lng);return{contains:e.contains(s)}}async mapBoundsExtend(t){const e=this.getLatLngBounds(t.bounds),s=new google.maps.LatLng(t.point.lat,t.point.lng);return e.extend(s),{bounds:new i({southwest:{lat:e.getSouthWest().lat(),lng:e.getSouthWest().lng()},center:{lat:e.getCenter().lat(),lng:e.getCenter().lng()},northeast:{lat:e.getNorthEast().lat(),lng:e.getNorthEast().lng()}})}}getLatLngBounds(t){return new google.maps.LatLngBounds(new google.maps.LatLng(t.southwest.lat,t.southwest.lng),new google.maps.LatLng(t.northeast.lat,t.northeast.lng))}async setCircleListeners(t,e,s){s.addListener("click",(()=>{this.notifyListeners("onCircleClick",{mapId:t,circleId:e,tag:s.get("tag")})}))}async setPolygonListeners(t,e,s){s.addListener("click",(()=>{this.notifyListeners("onPolygonClick",{mapId:t,polygonId:e,tag:s.get("tag")})}))}async setPolylineListeners(t,e,s){s.addListener("click",(()=>{this.notifyListeners("onPolylineClick",{mapId:t,polylineId:e,tag:s.get("tag")})}))}async setMarkerListeners(t,e,s){s.addListener("click",(()=>{var o,n;this.notifyListeners("onMarkerClick",{mapId:t,markerId:e,latitude:null===(o=s.getPosition())||void 0===o?void 0:o.lat(),longitude:null===(n=s.getPosition())||void 0===n?void 0:n.lng(),title:s.getTitle(),snippet:""})})),s.addListener("dragstart",(()=>{var o,n;this.notifyListeners("onMarkerDragStart",{mapId:t,markerId:e,latitude:null===(o=s.getPosition())||void 0===o?void 0:o.lat(),longitude:null===(n=s.getPosition())||void 0===n?void 0:n.lng(),title:s.getTitle(),snippet:""})})),s.addListener("drag",(()=>{var o,n;this.notifyListeners("onMarkerDrag",{mapId:t,markerId:e,latitude:null===(o=s.getPosition())||void 0===o?void 0:o.lat(),longitude:null===(n=s.getPosition())||void 0===n?void 0:n.lng(),title:s.getTitle(),snippet:""})})),s.addListener("dragend",(()=>{var o,n;this.notifyListeners("onMarkerDragEnd",{mapId:t,markerId:e,latitude:null===(o=s.getPosition())||void 0===o?void 0:o.lat(),longitude:null===(n=s.getPosition())||void 0===n?void 0:n.lng(),title:s.getTitle(),snippet:""})}))}async setMapListeners(t){const e=this.maps[t].map;e.addListener("idle",(async()=>{var s,o;const n=await this.getMapBounds({id:t});this.notifyListeners("onCameraIdle",{mapId:t,bearing:e.getHeading(),bounds:n,latitude:null===(s=e.getCenter())||void 0===s?void 0:s.lat(),longitude:null===(o=e.getCenter())||void 0===o?void 0:o.lng(),tilt:e.getTilt(),zoom:e.getZoom()})})),e.addListener("center_changed",(()=>{this.notifyListeners("onCameraMoveStarted",{mapId:t,isGesture:!0})})),e.addListener("bounds_changed",(async()=>{var s,o;const n=await this.getMapBounds({id:t});this.notifyListeners("onBoundsChanged",{mapId:t,bearing:e.getHeading(),bounds:n,latitude:null===(s=e.getCenter())||void 0===s?void 0:s.lat(),longitude:null===(o=e.getCenter())||void 0===o?void 0:o.lng(),tilt:e.getTilt(),zoom:e.getZoom()})})),e.addListener("click",(e=>{var s,o;this.notifyListeners("onMapClick",{mapId:t,latitude:null===(s=e.latLng)||void 0===s?void 0:s.lat(),longitude:null===(o=e.latLng)||void 0===o?void 0:o.lng()})})),this.notifyListeners("onMapReady",{mapId:t})}buildMarkerOpts(t,e){var s;let o;return t.iconUrl&&(o={url:t.iconUrl,scaledSize:t.iconSize?new google.maps.Size(t.iconSize.width,t.iconSize.height):null,anchor:t.iconAnchor?new google.maps.Point(t.iconAnchor.x,t.iconAnchor.y):new google.maps.Point(0,0),origin:t.iconOrigin?new google.maps.Point(t.iconOrigin.x,t.iconOrigin.y):new google.maps.Point(0,0)}),{position:t.coordinate,map:e,opacity:t.opacity,title:t.title,icon:o,draggable:t.draggable,zIndex:null!==(s=t.zIndex)&&void 0!==s?s:0}}})}}}));