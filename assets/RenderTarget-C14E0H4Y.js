import{cq as D}from"./index-DPmgT0xU.js";import{af as M,ai as u,aT as S,aS as y,ah as _,aR as $,aQ as j,c1 as O,c2 as N}from"./GeoJSON-DII1Qerq.js";import{h as F,i as w,s as m,e as s,c as L,f as I,d as G,n as Z,j as W,k as U,g as R,G as B,F as q}from"./compileUtil-DqMMTWIK.js";function J(){return{"fill-color":"rgba(255,255,255,0.4)","stroke-color":"#3399CC","stroke-width":1.25,"circle-radius":5,"circle-fill-color":"rgba(255,255,255,0.4)","circle-stroke-width":1.25,"circle-stroke-color":"#3399CC"}}const z=.985,P=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform mat4 u_projectionMatrix;
uniform mat4 u_screenToWorldMatrix;
uniform vec2 u_viewportSizePx;
uniform float u_pixelRatio;
uniform float u_globalAlpha;
uniform float u_time;
uniform float u_zoom;
uniform float u_resolution;
uniform float u_rotation;
uniform vec4 u_renderExtent;
uniform vec2 u_patternOrigin;
uniform float u_depth;
uniform mediump int u_hitDetection;

const float PI = 3.141592653589793238;
const float TWO_PI = 2.0 * PI;
float currentLineMetric = 0.; // an actual value will be used in the stroke shaders
`,E=J();class H{constructor(){this.uniforms_=[],this.attributes_=[],this.hasSymbol_=!1,this.symbolSizeExpression_=`vec2(${F(E["circle-radius"])} + ${F(E["circle-stroke-width"]*.5)})`,this.symbolRotationExpression_="0.0",this.symbolOffsetExpression_="vec2(0.0)",this.symbolColorExpression_=w(E["circle-fill-color"]),this.texCoordExpression_="vec4(0.0, 0.0, 1.0, 1.0)",this.discardExpression_="false",this.symbolRotateWithView_=!1,this.hasStroke_=!1,this.strokeWidthExpression_=F(E["stroke-width"]),this.strokeColorExpression_=w(E["stroke-color"]),this.strokeOffsetExpression_="0.",this.strokeCapExpression_=m("round"),this.strokeJoinExpression_=m("round"),this.strokeMiterLimitExpression_="10.",this.strokeDistanceFieldExpression_="-1000.",this.hasFill_=!1,this.fillColorExpression_=w(E["fill-color"]),this.vertexShaderFunctions_=[],this.fragmentShaderFunctions_=[]}addUniform(e,r){return this.uniforms_.push({name:e,type:r}),this}addAttribute(e,r,n,i){return this.attributes_.push({name:e,type:r,varyingName:e.replace(/^a_/,"v_"),varyingType:i??r,varyingExpression:n??e}),this}setSymbolSizeExpression(e){return this.hasSymbol_=!0,this.symbolSizeExpression_=e,this}getSymbolSizeExpression(){return this.symbolSizeExpression_}setSymbolRotationExpression(e){return this.symbolRotationExpression_=e,this}setSymbolOffsetExpression(e){return this.symbolOffsetExpression_=e,this}getSymbolOffsetExpression(){return this.symbolOffsetExpression_}setSymbolColorExpression(e){return this.hasSymbol_=!0,this.symbolColorExpression_=e,this}getSymbolColorExpression(){return this.symbolColorExpression_}setTextureCoordinateExpression(e){return this.texCoordExpression_=e,this}setFragmentDiscardExpression(e){return this.discardExpression_=e,this}getFragmentDiscardExpression(){return this.discardExpression_}setSymbolRotateWithView(e){return this.symbolRotateWithView_=e,this}setStrokeWidthExpression(e){return this.hasStroke_=!0,this.strokeWidthExpression_=e,this}setStrokeColorExpression(e){return this.hasStroke_=!0,this.strokeColorExpression_=e,this}getStrokeColorExpression(){return this.strokeColorExpression_}setStrokeOffsetExpression(e){return this.strokeOffsetExpression_=e,this}setStrokeCapExpression(e){return this.strokeCapExpression_=e,this}setStrokeJoinExpression(e){return this.strokeJoinExpression_=e,this}setStrokeMiterLimitExpression(e){return this.strokeMiterLimitExpression_=e,this}setStrokeDistanceFieldExpression(e){return this.strokeDistanceFieldExpression_=e,this}setFillColorExpression(e){return this.hasFill_=!0,this.fillColorExpression_=e,this}getFillColorExpression(){return this.fillColorExpression_}addVertexShaderFunction(e){return this.vertexShaderFunctions_.includes(e)?this:(this.vertexShaderFunctions_.push(e),this)}addFragmentShaderFunction(e){return this.fragmentShaderFunctions_.includes(e)?this:(this.fragmentShaderFunctions_.push(e),this)}getSymbolVertexShader(){return this.hasSymbol_?`${P}
${this.uniforms_.map(e=>`uniform ${e.type} ${e.name};`).join(`
`)}
attribute vec2 a_position;
attribute float a_index;
attribute vec4 a_hitColor;

varying vec2 v_texCoord;
varying vec2 v_quadCoord;
varying vec4 v_hitColor;
varying vec2 v_centerPx;
varying float v_angle;
varying vec2 v_quadSizePx;

${this.attributes_.map(e=>`attribute ${e.type} ${e.name};
varying ${e.varyingType} ${e.varyingName};`).join(`
`)}
${this.vertexShaderFunctions_.join(`
`)}
vec2 pxToScreen(vec2 coordPx) {
  vec2 scaled = coordPx / u_viewportSizePx / 0.5;
  return scaled;
}

vec2 screenToPx(vec2 coordScreen) {
  return (coordScreen * 0.5 + 0.5) * u_viewportSizePx;
}

void main(void) {
  v_quadSizePx = ${this.symbolSizeExpression_};
  vec2 halfSizePx = v_quadSizePx * 0.5;
  vec2 centerOffsetPx = ${this.symbolOffsetExpression_};
  vec2 offsetPx = centerOffsetPx;
  if (a_index == 0.0) {
    offsetPx -= halfSizePx;
  } else if (a_index == 1.0) {
    offsetPx += halfSizePx * vec2(1., -1.);
  } else if (a_index == 2.0) {
    offsetPx += halfSizePx;
  } else {
    offsetPx += halfSizePx * vec2(-1., 1.);
  }
  float angle = ${this.symbolRotationExpression_}${this.symbolRotateWithView_?" + u_rotation":""};
  float c = cos(-angle);
  float s = sin(-angle);
  offsetPx = vec2(c * offsetPx.x - s * offsetPx.y, s * offsetPx.x + c * offsetPx.y);
  vec4 center = u_projectionMatrix * vec4(a_position, 0.0, 1.0);
  gl_Position = center + vec4(pxToScreen(offsetPx), u_depth, 0.);
  vec4 texCoord = ${this.texCoordExpression_};
  float u = a_index == 0.0 || a_index == 3.0 ? texCoord.s : texCoord.p;
  float v = a_index == 2.0 || a_index == 3.0 ? texCoord.t : texCoord.q;
  v_texCoord = vec2(u, v);
  v_hitColor = a_hitColor;
  v_angle = angle;
  c = cos(-v_angle);
  s = sin(-v_angle);
  centerOffsetPx = vec2(c * centerOffsetPx.x - s * centerOffsetPx.y, s * centerOffsetPx.x + c * centerOffsetPx.y);
  v_centerPx = screenToPx(center.xy) + centerOffsetPx;
${this.attributes_.map(e=>`  ${e.varyingName} = ${e.varyingExpression};`).join(`
`)}
}`:null}getSymbolFragmentShader(){return this.hasSymbol_?`${P}
${this.uniforms_.map(e=>`uniform ${e.type} ${e.name};`).join(`
`)}
varying vec2 v_texCoord;
varying vec4 v_hitColor;
varying vec2 v_centerPx;
varying float v_angle;
varying vec2 v_quadSizePx;
${this.attributes_.map(e=>`varying ${e.varyingType} ${e.varyingName};`).join(`
`)}
${this.fragmentShaderFunctions_.join(`
`)}

void main(void) {
${this.attributes_.map(e=>`  ${e.varyingType} ${e.name} = ${e.varyingName}; // assign to original attribute name`).join(`
`)}
  if (${this.discardExpression_}) { discard; }
  vec2 coordsPx = gl_FragCoord.xy / u_pixelRatio - v_centerPx; // relative to center
  float c = cos(v_angle);
  float s = sin(v_angle);
  coordsPx = vec2(c * coordsPx.x - s * coordsPx.y, s * coordsPx.x + c * coordsPx.y);
  gl_FragColor = ${this.symbolColorExpression_};
  gl_FragColor.rgb *= gl_FragColor.a;
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.05) { discard; };
    gl_FragColor = v_hitColor;
  }
}`:null}getStrokeVertexShader(){return this.hasStroke_?`${P}
${this.uniforms_.map(e=>`uniform ${e.type} ${e.name};`).join(`
`)}
attribute vec2 a_segmentStart;
attribute vec2 a_segmentEnd;
attribute float a_measureStart;
attribute float a_measureEnd;
attribute float a_parameters;
attribute float a_distance;
attribute vec2 a_joinAngles;
attribute vec4 a_hitColor;

varying vec2 v_segmentStart;
varying vec2 v_segmentEnd;
varying float v_angleStart;
varying float v_angleEnd;
varying float v_width;
varying vec4 v_hitColor;
varying float v_distanceOffsetPx;
varying float v_measureStart;
varying float v_measureEnd;

${this.attributes_.map(e=>`attribute ${e.type} ${e.name};
varying ${e.varyingType} ${e.varyingName};`).join(`
`)}
${this.vertexShaderFunctions_.join(`
`)}
vec2 worldToPx(vec2 worldPos) {
  vec4 screenPos = u_projectionMatrix * vec4(worldPos, 0.0, 1.0);
  return (0.5 * screenPos.xy + 0.5) * u_viewportSizePx;
}

vec4 pxToScreen(vec2 pxPos) {
  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;
  return vec4(screenPos, u_depth, 1.0);
}

bool isCap(float joinAngle) {
  return joinAngle < -0.1;
}

vec2 getJoinOffsetDirection(vec2 normalPx, float joinAngle) {
  float halfAngle = joinAngle / 2.0;
  float c = cos(halfAngle);
  float s = sin(halfAngle);
  vec2 angleBisectorNormal = vec2(s * normalPx.x + c * normalPx.y, -c * normalPx.x + s * normalPx.y);
  float length = 1.0 / s;
  return angleBisectorNormal * length;
}

vec2 getOffsetPoint(vec2 point, vec2 normal, float joinAngle, float offsetPx) {
  // if on a cap or the join angle is too high, offset the line along the segment normal
  if (cos(joinAngle) > 0.998 || isCap(joinAngle)) {
    return point - normal * offsetPx;
  }
  // offset is applied along the inverted normal (positive offset goes "right" relative to line direction)
  return point - getJoinOffsetDirection(normal, joinAngle) * offsetPx;
}

void main(void) {
  v_angleStart = a_joinAngles.x;
  v_angleEnd = a_joinAngles.y;
  float vertexNumber = floor(abs(a_parameters) / 10000. + 0.5);
  currentLineMetric = vertexNumber < 1.5 ? a_measureStart : a_measureEnd;
  // we're reading the fractional part while keeping the sign (so -4.12 gives -0.12, 3.45 gives 0.45)
  float angleTangentSum = fract(abs(a_parameters) / 10000.) * 10000. * sign(a_parameters);

  float lineWidth = ${this.strokeWidthExpression_};
  float lineOffsetPx = ${this.strokeOffsetExpression_};

  // compute segment start/end in px with offset
  vec2 segmentStartPx = worldToPx(a_segmentStart);
  vec2 segmentEndPx = worldToPx(a_segmentEnd);
  vec2 tangentPx = normalize(segmentEndPx - segmentStartPx);
  vec2 normalPx = vec2(-tangentPx.y, tangentPx.x);
  segmentStartPx = getOffsetPoint(segmentStartPx, normalPx, v_angleStart, lineOffsetPx),
  segmentEndPx = getOffsetPoint(segmentEndPx, normalPx, v_angleEnd, lineOffsetPx);

  // compute current vertex position
  float normalDir = vertexNumber < 0.5 || (vertexNumber > 1.5 && vertexNumber < 2.5) ? 1.0 : -1.0;
  float tangentDir = vertexNumber < 1.5 ? 1.0 : -1.0;
  float angle = vertexNumber < 1.5 ? v_angleStart : v_angleEnd;
  vec2 joinDirection;
  vec2 positionPx = vertexNumber < 1.5 ? segmentStartPx : segmentEndPx;
  // if angle is too high, do not make a proper join
  if (cos(angle) > ${z} || isCap(angle)) {
    joinDirection = normalPx * normalDir - tangentPx * tangentDir;
  } else {
    joinDirection = getJoinOffsetDirection(normalPx * normalDir, angle);
  }
  positionPx = positionPx + joinDirection * (lineWidth * 0.5 + 1.); // adding 1 pixel for antialiasing
  gl_Position = pxToScreen(positionPx);

  v_segmentStart = segmentStartPx;
  v_segmentEnd = segmentEndPx;
  v_width = lineWidth;
  v_hitColor = a_hitColor;
  v_distanceOffsetPx = a_distance / u_resolution - (lineOffsetPx * angleTangentSum);
  v_measureStart = a_measureStart;
  v_measureEnd = a_measureEnd;
${this.attributes_.map(e=>`  ${e.varyingName} = ${e.varyingExpression};`).join(`
`)}
}`:null}getStrokeFragmentShader(){return this.hasStroke_?`${P}
${this.uniforms_.map(e=>`uniform ${e.type} ${e.name};`).join(`
`)}
varying vec2 v_segmentStart;
varying vec2 v_segmentEnd;
varying float v_angleStart;
varying float v_angleEnd;
varying float v_width;
varying vec4 v_hitColor;
varying float v_distanceOffsetPx;
varying float v_measureStart;
varying float v_measureEnd;
${this.attributes_.map(e=>`varying ${e.varyingType} ${e.varyingName};`).join(`
`)}
${this.fragmentShaderFunctions_.join(`
`)}

vec2 pxToWorld(vec2 pxPos) {
  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;
  return (u_screenToWorldMatrix * vec4(screenPos, 0.0, 1.0)).xy;
}

bool isCap(float joinAngle) {
  return joinAngle < -0.1;
}

float segmentDistanceField(vec2 point, vec2 start, vec2 end, float width) {
  vec2 tangent = normalize(end - start);
  vec2 normal = vec2(-tangent.y, tangent.x);
  vec2 startToPoint = point - start;
  return abs(dot(startToPoint, normal)) - width * 0.5;
}

float buttCapDistanceField(vec2 point, vec2 start, vec2 end) {
  vec2 startToPoint = point - start;
  vec2 tangent = normalize(end - start);
  return dot(startToPoint, -tangent);
}

float squareCapDistanceField(vec2 point, vec2 start, vec2 end, float width) {
  return buttCapDistanceField(point, start, end) - width * 0.5;
}

float roundCapDistanceField(vec2 point, vec2 start, vec2 end, float width) {
  float onSegment = max(0., 1000. * dot(point - start, end - start)); // this is very high when inside the segment
  return length(point - start) - width * 0.5 - onSegment;
}

float roundJoinDistanceField(vec2 point, vec2 start, vec2 end, float width) {
  return roundCapDistanceField(point, start, end, width);
}

float bevelJoinField(vec2 point, vec2 start, vec2 end, float width, float joinAngle) {
  vec2 startToPoint = point - start;
  vec2 tangent = normalize(end - start);
  float c = cos(joinAngle * 0.5);
  float s = sin(joinAngle * 0.5);
  float direction = -sign(sin(joinAngle));
  vec2 bisector = vec2(c * tangent.x - s * tangent.y, s * tangent.x + c * tangent.y);
  float radius = width * 0.5 * s;
  return dot(startToPoint, bisector * direction) - radius;
}

float miterJoinDistanceField(vec2 point, vec2 start, vec2 end, float width, float joinAngle) {
  if (cos(joinAngle) > ${z}) { // avoid risking a division by zero
    return bevelJoinField(point, start, end, width, joinAngle);
  }
  float miterLength = 1. / sin(joinAngle * 0.5);
  float miterLimit = ${this.strokeMiterLimitExpression_};
  if (miterLength > miterLimit) {
    return bevelJoinField(point, start, end, width, joinAngle);
  }
  return -1000.;
}

float capDistanceField(vec2 point, vec2 start, vec2 end, float width, float capType) {
   if (capType == ${m("butt")}) {
    return buttCapDistanceField(point, start, end);
  } else if (capType == ${m("square")}) {
    return squareCapDistanceField(point, start, end, width);
  }
  return roundCapDistanceField(point, start, end, width);
}

float joinDistanceField(vec2 point, vec2 start, vec2 end, float width, float joinAngle, float joinType) {
  if (joinType == ${m("bevel")}) {
    return bevelJoinField(point, start, end, width, joinAngle);
  } else if (joinType == ${m("miter")}) {
    return miterJoinDistanceField(point, start, end, width, joinAngle);
  }
  return roundJoinDistanceField(point, start, end, width);
}

float computeSegmentPointDistance(vec2 point, vec2 start, vec2 end, float width, float joinAngle, float capType, float joinType) {
  if (isCap(joinAngle)) {
    return capDistanceField(point, start, end, width, capType);
  }
  return joinDistanceField(point, start, end, width, joinAngle, joinType);
}

float distanceFromSegment(vec2 point, vec2 start, vec2 end) {
  vec2 tangent = end - start;
  vec2 startToPoint = point - start;
  // inspire by capsule fn in https://iquilezles.org/articles/distfunctions/
  float h = clamp(dot(startToPoint, tangent) / dot(tangent, tangent), 0.0, 1.0);
  return length(startToPoint - tangent * h);
}

void main(void) {
${this.attributes_.map(e=>`  ${e.varyingType} ${e.name} = ${e.varyingName}; // assign to original attribute name`).join(`
`)}

  vec2 currentPoint = gl_FragCoord.xy / u_pixelRatio;
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  vec2 worldPos = pxToWorld(currentPoint);
  if (
    abs(u_renderExtent[0] - u_renderExtent[2]) > 0.0 && (
      worldPos[0] < u_renderExtent[0] ||
      worldPos[1] < u_renderExtent[1] ||
      worldPos[0] > u_renderExtent[2] ||
      worldPos[1] > u_renderExtent[3]
    )
  ) {
    discard;
  }
  #endif

  float segmentLength = length(v_segmentEnd - v_segmentStart);
  vec2 segmentTangent = (v_segmentEnd - v_segmentStart) / segmentLength;
  vec2 segmentNormal = vec2(-segmentTangent.y, segmentTangent.x);
  vec2 startToPoint = currentPoint - v_segmentStart;
  float lengthToPoint = max(0., min(dot(segmentTangent, startToPoint), segmentLength));
  float currentLengthPx = lengthToPoint + v_distanceOffsetPx;
  float currentRadiusPx = distanceFromSegment(currentPoint, v_segmentStart, v_segmentEnd);
  float currentRadiusRatio = dot(segmentNormal, startToPoint) * 2. / v_width;
  currentLineMetric = mix(
    v_measureStart,
    v_measureEnd,
    lengthToPoint / max(segmentLength, 1.17549429e-38)
  );

  if (${this.discardExpression_}) { discard; }

  float capType = ${this.strokeCapExpression_};
  float joinType = ${this.strokeJoinExpression_};
  float segmentStartDistance = computeSegmentPointDistance(currentPoint, v_segmentStart, v_segmentEnd, v_width, v_angleStart, capType, joinType);
  float segmentEndDistance = computeSegmentPointDistance(currentPoint, v_segmentEnd, v_segmentStart, v_width, v_angleEnd, capType, joinType);
  float distanceField = max(
    segmentDistanceField(currentPoint, v_segmentStart, v_segmentEnd, v_width),
    max(segmentStartDistance, segmentEndDistance)
  );
  distanceField = max(distanceField, ${this.strokeDistanceFieldExpression_});

  vec4 color = ${this.strokeColorExpression_};
  color.a *= smoothstep(0.5, -0.5, distanceField);
  gl_FragColor = color;
  gl_FragColor.a *= u_globalAlpha;
  gl_FragColor.rgb *= gl_FragColor.a;
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.1) { discard; };
    gl_FragColor = v_hitColor;
  }
}`:null}getFillVertexShader(){return this.hasFill_?`${P}
${this.uniforms_.map(e=>`uniform ${e.type} ${e.name};`).join(`
`)}
attribute vec2 a_position;
attribute vec4 a_hitColor;

varying vec4 v_hitColor;

${this.attributes_.map(e=>`attribute ${e.type} ${e.name};
varying ${e.varyingType} ${e.varyingName};`).join(`
`)}
${this.vertexShaderFunctions_.join(`
`)}
void main(void) {
  gl_Position = u_projectionMatrix * vec4(a_position, u_depth, 1.0);
  v_hitColor = a_hitColor;
${this.attributes_.map(e=>`  ${e.varyingName} = ${e.varyingExpression};`).join(`
`)}
}`:null}getFillFragmentShader(){return this.hasFill_?`${P}
${this.uniforms_.map(e=>`uniform ${e.type} ${e.name};`).join(`
`)}
varying vec4 v_hitColor;
${this.attributes_.map(e=>`varying ${e.varyingType} ${e.varyingName};`).join(`
`)}
${this.fragmentShaderFunctions_.join(`
`)}
vec2 pxToWorld(vec2 pxPos) {
  vec2 screenPos = 2.0 * pxPos / u_viewportSizePx - 1.0;
  return (u_screenToWorldMatrix * vec4(screenPos, 0.0, 1.0)).xy;
}

vec2 worldToPx(vec2 worldPos) {
  vec4 screenPos = u_projectionMatrix * vec4(worldPos, 0.0, 1.0);
  return (0.5 * screenPos.xy + 0.5) * u_viewportSizePx;
}

void main(void) {
${this.attributes_.map(e=>`  ${e.varyingType} ${e.name} = ${e.varyingName}; // assign to original attribute name`).join(`
`)}
  vec2 pxPos = gl_FragCoord.xy / u_pixelRatio;
  vec2 pxOrigin = worldToPx(u_patternOrigin);
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  vec2 worldPos = pxToWorld(pxPos);
  if (
    abs(u_renderExtent[0] - u_renderExtent[2]) > 0.0 && (
      worldPos[0] < u_renderExtent[0] ||
      worldPos[1] < u_renderExtent[1] ||
      worldPos[0] > u_renderExtent[2] ||
      worldPos[1] > u_renderExtent[3]
    )
  ) {
    discard;
  }
  #endif
  if (${this.discardExpression_}) { discard; }
  gl_FragColor = ${this.fillColorExpression_};
  gl_FragColor.a *= u_globalAlpha;
  gl_FragColor.rgb *= gl_FragColor.a;
  if (u_hitDetection > 0) {
    if (gl_FragColor.a < 0.1) { discard; };
    gl_FragColor = v_hitColor;
  }
}`:null}}function re(){const t='function t(t,n,x=2){const o=n&&n.length,i=o?n[0]*x:t.length;let u=e(t,0,i,x,!0);const l=[];if(!u||u.next===u.prev)return l;let c,h,y;if(o&&(u=function(t,n,r,x){const o=[];for(let r=0,i=n.length;r<i;r++){const u=e(t,n[r]*x,r<i-1?n[r+1]*x:t.length,x,!1);u===u.next&&(u.steiner=!0),o.push(a(u))}o.sort(f);for(let t=0;t<o.length;t++)r=s(o[t],r);return r}(t,n,u,x)),t.length>80*x){c=1/0,h=1/0;let e=-1/0,n=-1/0;for(let r=x;r<i;r+=x){const x=t[r],o=t[r+1];x<c&&(c=x),o<h&&(h=o),x>e&&(e=x),o>n&&(n=o)}y=Math.max(e-c,n-h),y=0!==y?32767/y:0}return r(u,l,x,c,h,y,0),l}function e(t,e,n,r,x){let o;if(x===function(t,e,n,r){let x=0;for(let o=e,i=n-r;o<n;o+=r)x+=(t[i]-t[o])*(t[o+1]+t[i+1]),i=o;return x}(t,e,n,r)>0)for(let x=e;x<n;x+=r)o=w(x/r|0,t[x],t[x+1],o);else for(let x=n-r;x>=e;x-=r)o=w(x/r|0,t[x],t[x+1],o);return o&&g(o,o.next)&&(A(o),o=o.next),o}function n(t,e){if(!t)return t;e||(e=t);let n,r=t;do{if(n=!1,r.steiner||!g(r,r.next)&&0!==v(r.prev,r,r.next))r=r.next;else{if(A(r),r=e=r.prev,r===r.next)break;n=!0}}while(n||r!==e);return e}function r(t,e,f,s,l,a,h){if(!t)return;!h&&a&&function(t,e,n,r){let x=t;do{0===x.z&&(x.z=c(x.x,x.y,e,n,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next}while(x!==t);x.prevZ.nextZ=null,x.prevZ=null,function(t){let e,n=1;do{let r,x=t;t=null;let o=null;for(e=0;x;){e++;let i=x,u=0;for(let t=0;t<n&&(u++,i=i.nextZ,i);t++);let f=n;for(;u>0||f>0&&i;)0!==u&&(0===f||!i||x.z<=i.z)?(r=x,x=x.nextZ,u--):(r=i,i=i.nextZ,f--),o?o.nextZ=r:t=r,r.prevZ=o,o=r;x=i}o.nextZ=null,n*=2}while(e>1)}(x)}(t,s,l,a);let y=t;for(;t.prev!==t.next;){const c=t.prev,p=t.next;if(a?o(t,s,l,a):x(t))e.push(c.i,t.i,p.i),A(t),t=p.next,y=p.next;else if((t=p)===y){h?1===h?r(t=i(n(t),e),e,f,s,l,a,2):2===h&&u(t,e,f,s,l,a):r(n(t),e,f,s,l,a,1);break}}}function x(t){const e=t.prev,n=t,r=t.next;if(v(e,n,r)>=0)return!1;const x=e.x,o=n.x,i=r.x,u=e.y,f=n.y,s=r.y,l=Math.min(x,o,i),c=Math.min(u,f,s),a=Math.max(x,o,i),h=Math.max(u,f,s);let p=r.next;for(;p!==e;){if(p.x>=l&&p.x<=a&&p.y>=c&&p.y<=h&&y(x,u,o,f,i,s,p.x,p.y)&&v(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function o(t,e,n,r){const x=t.prev,o=t,i=t.next;if(v(x,o,i)>=0)return!1;const u=x.x,f=o.x,s=i.x,l=x.y,a=o.y,h=i.y,p=Math.min(u,f,s),g=Math.min(l,a,h),b=Math.max(u,f,s),M=Math.max(l,a,h),m=c(p,g,e,n,r),Z=c(b,M,e,n,r);let d=t.prevZ,w=t.nextZ;for(;d&&d.z>=m&&w&&w.z<=Z;){if(d.x>=p&&d.x<=b&&d.y>=g&&d.y<=M&&d!==x&&d!==i&&y(u,l,f,a,s,h,d.x,d.y)&&v(d.prev,d,d.next)>=0)return!1;if(d=d.prevZ,w.x>=p&&w.x<=b&&w.y>=g&&w.y<=M&&w!==x&&w!==i&&y(u,l,f,a,s,h,w.x,w.y)&&v(w.prev,w,w.next)>=0)return!1;w=w.nextZ}for(;d&&d.z>=m;){if(d.x>=p&&d.x<=b&&d.y>=g&&d.y<=M&&d!==x&&d!==i&&y(u,l,f,a,s,h,d.x,d.y)&&v(d.prev,d,d.next)>=0)return!1;d=d.prevZ}for(;w&&w.z<=Z;){if(w.x>=p&&w.x<=b&&w.y>=g&&w.y<=M&&w!==x&&w!==i&&y(u,l,f,a,s,h,w.x,w.y)&&v(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function i(t,e){let r=t;do{const n=r.prev,x=r.next.next;!g(n,x)&&b(n,r,r.next,x)&&Z(n,x)&&Z(x,n)&&(e.push(n.i,r.i,x.i),A(r),A(r.next),r=t=x),r=r.next}while(r!==t);return n(r)}function u(t,e,x,o,i,u){let f=t;do{let t=f.next.next;for(;t!==f.prev;){if(f.i!==t.i&&p(f,t)){let s=d(f,t);return f=n(f,f.next),s=n(s,s.next),r(f,e,x,o,i,u,0),void r(s,e,x,o,i,u,0)}t=t.next}f=f.next}while(f!==t)}function f(t,e){let n=t.x-e.x;if(0===n&&(n=t.y-e.y,0===n)){n=(t.next.y-t.y)/(t.next.x-t.x)-(e.next.y-e.y)/(e.next.x-e.x)}return n}function s(t,e){const r=function(t,e){let n=e;const r=t.x,x=t.y;let o,i=-1/0;if(g(t,n))return n;do{if(g(t,n.next))return n.next;if(x<=n.y&&x>=n.next.y&&n.next.y!==n.y){const t=n.x+(x-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(t<=r&&t>i&&(i=t,o=n.x<n.next.x?n:n.next,t===r))return o}n=n.next}while(n!==e);if(!o)return null;const u=o,f=o.x,s=o.y;let c=1/0;n=o;do{if(r>=n.x&&n.x>=f&&r!==n.x&&h(x<s?r:i,x,f,s,x<s?i:r,x,n.x,n.y)){const e=Math.abs(x-n.y)/(r-n.x);Z(n,t)&&(e<c||e===c&&(n.x>o.x||n.x===o.x&&l(o,n)))&&(o=n,c=e)}n=n.next}while(n!==u);return o}(t,e);if(!r)return e;const x=d(r,t);return n(x,x.next),n(r,r.next)}function l(t,e){return v(t.prev,t,e.prev)<0&&v(e.next,t,t.next)<0}function c(t,e,n,r,x){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-n)*x|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-r)*x|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function a(t){let e=t,n=t;do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t);return n}function h(t,e,n,r,x,o,i,u){return(x-i)*(e-u)>=(t-i)*(o-u)&&(t-i)*(r-u)>=(n-i)*(e-u)&&(n-i)*(o-u)>=(x-i)*(r-u)}function y(t,e,n,r,x,o,i,u){return!(t===i&&e===u)&&h(t,e,n,r,x,o,i,u)}function p(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&b(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}(t,e)&&(Z(t,e)&&Z(e,t)&&function(t,e){let n=t,r=!1;const x=(t.x+e.x)/2,o=(t.y+e.y)/2;do{n.y>o!=n.next.y>o&&n.next.y!==n.y&&x<(n.next.x-n.x)*(o-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==t);return r}(t,e)&&(v(t.prev,t,e.prev)||v(t,e.prev,e))||g(t,e)&&v(t.prev,t,t.next)>0&&v(e.prev,e,e.next)>0)}function v(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function g(t,e){return t.x===e.x&&t.y===e.y}function b(t,e,n,r){const x=m(v(t,e,n)),o=m(v(t,e,r)),i=m(v(n,r,t)),u=m(v(n,r,e));return x!==o&&i!==u||(!(0!==x||!M(t,n,e))||(!(0!==o||!M(t,r,e))||(!(0!==i||!M(n,t,r))||!(0!==u||!M(n,e,r)))))}function M(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function m(t){return t>0?1:t<0?-1:0}function Z(t,e){return v(t.prev,t,t.next)<0?v(t,e,t.next)>=0&&v(t,t.prev,e)>=0:v(t,e,t.prev)<0||v(t,t.next,e)<0}function d(t,e){const n=E(t.i,t.x,t.y),r=E(e.i,e.x,e.y),x=t.next,o=e.prev;return t.next=e,e.prev=t,n.next=x,x.prev=n,r.next=n,n.prev=r,o.next=r,r.prev=o,r}function w(t,e,n,r){const x=E(t,e,n);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function A(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function E(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function I(t,e){const n=e[0],r=e[1];return e[0]=t[0]*n+t[2]*r+t[4],e[1]=t[1]*n+t[3]*r+t[5],e}function z(t,e){const n=(r=e)[0]*r[3]-r[1]*r[2];var r;!function(t,e){if(!t)throw new Error(e)}(0!==n,"Transformation matrix cannot be inverted");const x=e[0],o=e[1],i=e[2],u=e[3],f=e[4],s=e[5];return t[0]=u/n,t[1]=-o/n,t[2]=-i/n,t[3]=x/n,t[4]=(i*s-u*f)/n,t[5]=-(x*s-o*f)/n,t}new Array(6);const F=[],P={vertexPosition:0,indexPosition:0};function B(t,e,n,r,x){t[e+0]=n,t[e+1]=r,t[e+2]=x}function N(t,e,n,r,x,o){const i=3+x,u=t[e+0],f=t[e+1],s=F;s.length=x;for(let n=0;n<s.length;n++)s[n]=t[e+2+n];let l=o?o.vertexPosition:0,c=o?o.indexPosition:0;const a=l/i;return B(n,l,u,f,0),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,1),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,2),s.length&&n.set(s,l+3),l+=i,B(n,l,u,f,3),s.length&&n.set(s,l+3),l+=i,r[c++]=a,r[c++]=a+1,r[c++]=a+3,r[c++]=a+1,r[c++]=a+2,r[c++]=a+3,P.vertexPosition=l,P.indexPosition=c,P}function R(t,e,n,r,x,o,i,u,f,s,l){const c=10+u.length,a=o.length/c,h=[t[e+0],t[e+1]],y=[t[n],t[n+1]],p=t[e+2],v=t[n+2],g=I(f,[...h]),b=I(f,[...y]);function M(t,e,n){const r=Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1])),x=[(e[0]-t[0])/r,(e[1]-t[1])/r],o=[-x[1],x[0]],i=Math.sqrt((n[0]-t[0])*(n[0]-t[0])+(n[1]-t[1])*(n[1]-t[1])),u=[(n[0]-t[0])/i,(n[1]-t[1])/i],f=0===r||0===i?0:Math.acos((s=u[0]*x[0]+u[1]*x[1],l=-1,c=1,Math.min(Math.max(s,l),c)));var s,l,c;return u[0]*o[0]+u[1]*o[1]>0?f:2*Math.PI-f}let m=-1,Z=-1,d=l;const w=null!==x;if(null!==r){m=M(g,b,I(f,[...[t[r],t[r+1]]])),Math.cos(m)<=.985&&(d+=Math.tan((m-Math.PI)/2))}if(w){Z=M(b,g,I(f,[...[t[x],t[x+1]]])),Math.cos(Z)<=.985&&(d+=Math.tan((Math.PI-Z)/2))}function A(t,e){return 0===e?1e4*t:Math.sign(e)*(1e4*t+Math.abs(e))}return o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(0,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(1,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(2,l)),o.push(...u),o.push(h[0],h[1],p,y[0],y[1],v,m,Z,s,A(3,l)),o.push(...u),i.push(a,a+1,a+2,a+1,a+3,a+2),{length:s+Math.sqrt((b[0]-g[0])*(b[0]-g[0])+(b[1]-g[1])*(b[1]-g[1])),angle:d}}function S(e,n,r,x,o){const i=2+o;let u=n;const f=e.slice(u,u+o);u+=o;const s=e[u++];let l=0;const c=new Array(s-1);for(let t=0;t<s;t++)l+=e[u++],t<s-1&&(c[t]=l);const a=e.slice(u,u+2*l),h=t(a,c,2);for(let t=0;t<h.length;t++)x.push(h[t]+r.length/i);for(let t=0;t<a.length;t+=2)r.push(a[t],a[t+1],...f);return u+2*l}const T="GENERATE_POLYGON_BUFFERS",_="GENERATE_POINT_BUFFERS",O="GENERATE_LINE_STRING_BUFFERS",U=self;U.onmessage=t=>{const e=t.data;switch(e.type){case _:{const t=3,n=2,r=e.customAttributesSize,x=n+r,o=new Float32Array(e.renderInstructions),i=o.length/x,u=4*i*(r+t),f=new Uint32Array(6*i),s=new Float32Array(u);let l;for(let t=0;t<o.length;t+=x)l=N(o,t,s,f,r,l);const c=Object.assign({vertexBuffer:s.buffer,indexBuffer:f.buffer,renderInstructions:o.buffer},e);U.postMessage(c,[s.buffer,f.buffer,o.buffer]);break}case O:{const t=[],n=[],r=e.customAttributesSize,x=3,o=new Float32Array(e.renderInstructions);let i=0;const u=[1,0,0,1,0,0];let f,s;for(z(u,e.renderInstructionsTransform);i<o.length;){s=Array.from(o.slice(i,i+r)),i+=r,f=o[i++];const e=i,l=i+(f-1)*x,c=o[e]===o[l]&&o[e+1]===o[l+1];let a=0,h=0;for(let r=0;r<f-1;r++){let y=null;r>0?y=i+(r-1)*x:c&&(y=l-x);let p=null;r<f-2?p=i+(r+2)*x:c&&(p=e+x);const v=R(o,i+r*x,i+(r+1)*x,y,p,t,n,s,u,a,h);a=v.length,h=v.angle}i+=f*x}const l=Uint32Array.from(n),c=Float32Array.from(t),a=Object.assign({vertexBuffer:c.buffer,indexBuffer:l.buffer,renderInstructions:o.buffer},e);U.postMessage(a,[c.buffer,l.buffer,o.buffer]);break}case T:{const t=[],n=[],r=e.customAttributesSize,x=new Float32Array(e.renderInstructions);let o=0;for(;o<x.length;)o=S(x,o,t,n,r);const i=Uint32Array.from(n),u=Float32Array.from(t),f=Object.assign({vertexBuffer:u.buffer,indexBuffer:i.buffer,renderInstructions:x.buffer},e);U.postMessage(f,[u.buffer,i.buffer,x.buffer]);break}}};';return new Worker(typeof Blob>"u"?"data:application/javascript;base64,"+D.from(t,"binary").toString("base64"):URL.createObjectURL(new Blob([t],{type:"application/javascript"})))}const ie={GENERATE_POLYGON_BUFFERS:"GENERATE_POLYGON_BUFFERS",GENERATE_POINT_BUFFERS:"GENERATE_POINT_BUFFERS",GENERATE_LINE_STRING_BUFFERS:"GENERATE_LINE_STRING_BUFFERS"};function oe(t,e){e=e||[];const r=256,n=r-1;return e[0]=Math.floor(t/r/r/r)/n,e[1]=Math.floor(t/r/r)%r/n,e[2]=Math.floor(t/r)%r/n,e[3]=t%r/n,e}function se(t){let e=0;const r=256,n=r-1;return e+=Math.round(t[0]*r*r*r*n),e+=Math.round(t[1]*r*r*n),e+=Math.round(t[2]*r*n),e+=Math.round(t[3]*n),e}function b(t){return(JSON.stringify(t).split("").reduce((r,n)=>(r<<5)-r+n.charCodeAt(0),0)>>>0).toString()}function T(t,e,r,n){if(`${n}radius`in t&&n!=="icon-"){let i=s(r,t[`${n}radius`],u);if(`${n}radius2`in t){const o=s(r,t[`${n}radius2`],u);i=`max(${i}, ${o})`}`${n}stroke-width`in t&&(i=`(${i} + ${s(r,t[`${n}stroke-width`],u)} * 0.5)`),e.setSymbolSizeExpression(`vec2(${i} * 2. + 0.5)`)}if(`${n}scale`in t){const i=s(r,t[`${n}scale`],S);e.setSymbolSizeExpression(`${e.getSymbolSizeExpression()} * ${i}`)}`${n}displacement`in t&&e.setSymbolOffsetExpression(s(r,t[`${n}displacement`],y)),`${n}rotation`in t&&e.setSymbolRotationExpression(s(r,t[`${n}rotation`],u)),`${n}rotate-with-view`in t&&e.setSymbolRotateWithView(!!t[`${n}rotate-with-view`])}function A(t,e,r,n,i){let o="vec4(0.)";if(e!==null&&(o=e),r!==null&&n!==null){const l=`smoothstep(-${n} + 0.63, -${n} - 0.58, ${t})`;o=`mix(${r}, ${o}, ${l})`}const f=`(1.0 - smoothstep(-0.63, 0.58, ${t}))`;let a=`${o} * vec4(1.0, 1.0, 1.0, ${f})`;return i!==null&&(a=`${a} * vec4(1.0, 1.0, 1.0, ${i})`),a}function C(t,e,r,n,i){const o=new Image;o.crossOrigin=t[`${n}cross-origin`]===void 0?"anonymous":t[`${n}cross-origin`],M(typeof t[`${n}src`]=="string",`WebGL layers do not support expressions for the ${n}src style property`),o.src=t[`${n}src`],r[`u_texture${i}_size`]=()=>o.complete?[o.width,o.height]:[0,0],e.addUniform(`u_texture${i}_size`,"vec2");const f=`u_texture${i}_size`;return r[`u_texture${i}`]=o,e.addUniform(`u_texture${i}`,"sampler2D"),f}function k(t,e,r,n,i){let o=s(r,t[`${e}offset`],S);if(`${e}offset-origin`in t)switch(t[`${e}offset-origin`]){case"top-right":o=`vec2(${n}.x, 0.) + ${i} * vec2(-1., 0.) + ${o} * vec2(-1., 1.)`;break;case"bottom-left":o=`vec2(0., ${n}.y) + ${i} * vec2(0., -1.) + ${o} * vec2(1., -1.)`;break;case"bottom-right":o=`${n} - ${i} - ${o}`;break}return o}function V(t,e,r,n){n.functions.circleDistanceField=`float circleDistanceField(vec2 point, float radius) {
  return length(point) - radius;
}`,T(t,e,n,"circle-");let i=null;"circle-opacity"in t&&(i=s(n,t["circle-opacity"],u));let o="coordsPx";"circle-scale"in t&&(o=`coordsPx / ${s(n,t["circle-scale"],S)}`);let f=null;"circle-fill-color"in t&&(f=s(n,t["circle-fill-color"],_));let a=null;"circle-stroke-color"in t&&(a=s(n,t["circle-stroke-color"],_));let l=s(n,t["circle-radius"],u),c=null;"circle-stroke-width"in t&&(c=s(n,t["circle-stroke-width"],u),l=`(${l} + ${c} * 0.5)`);const x=`circleDistanceField(${o}, ${l})`,h=A(x,f,a,c,i);e.setSymbolColorExpression(h)}function Y(t,e,r,n){n.functions.round=`float round(float v) {
  return sign(v) * floor(abs(v) + 0.5);
}`,n.functions.starDistanceField=`float starDistanceField(vec2 point, float numPoints, float radius, float radius2, float angle) {
  float startAngle = -PI * 0.5 + angle; // tip starts upwards and rotates clockwise with angle
  float c = cos(startAngle);
  float s = sin(startAngle);
  vec2 pointRotated = vec2(c * point.x - s * point.y, s * point.x + c * point.y);
  float alpha = TWO_PI / numPoints; // the angle of one sector
  float beta = atan(pointRotated.y, pointRotated.x);
  float gamma = round(beta / alpha) * alpha; // angle in sector
  c = cos(-gamma);
  s = sin(-gamma);
  vec2 inSector = vec2(c * pointRotated.x - s * pointRotated.y, abs(s * pointRotated.x + c * pointRotated.y));
  vec2 tipToPoint = inSector + vec2(-radius, 0.);
  vec2 edgeNormal = vec2(radius2 * sin(alpha * 0.5), -radius2 * cos(alpha * 0.5) + radius);
  return dot(normalize(edgeNormal), tipToPoint);
}`,n.functions.regularDistanceField=`float regularDistanceField(vec2 point, float numPoints, float radius, float angle) {
  float startAngle = -PI * 0.5 + angle; // tip starts upwards and rotates clockwise with angle
  float c = cos(startAngle);
  float s = sin(startAngle);
  vec2 pointRotated = vec2(c * point.x - s * point.y, s * point.x + c * point.y);
  float alpha = TWO_PI / numPoints; // the angle of one sector
  float radiusIn = radius * cos(PI / numPoints);
  float beta = atan(pointRotated.y, pointRotated.x);
  float gamma = round((beta - alpha * 0.5) / alpha) * alpha + alpha * 0.5; // angle in sector from mid
  c = cos(-gamma);
  s = sin(-gamma);
  vec2 inSector = vec2(c * pointRotated.x - s * pointRotated.y, abs(s * pointRotated.x + c * pointRotated.y));
  return inSector.x - radiusIn;
}`,T(t,e,n,"shape-");let i=null;"shape-opacity"in t&&(i=s(n,t["shape-opacity"],u));let o="coordsPx";"shape-scale"in t&&(o=`coordsPx / ${s(n,t["shape-scale"],S)}`);let f=null;"shape-fill-color"in t&&(f=s(n,t["shape-fill-color"],_));let a=null;"shape-stroke-color"in t&&(a=s(n,t["shape-stroke-color"],_));let l=null;"shape-stroke-width"in t&&(l=s(n,t["shape-stroke-width"],u));const c=s(n,t["shape-points"],u);let x="0.";"shape-angle"in t&&(x=s(n,t["shape-angle"],u));let h,g=s(n,t["shape-radius"],u);if(l!==null&&(g=`${g} + ${l} * 0.5`),"shape-radius2"in t){let v=s(n,t["shape-radius2"],u);l!==null&&(v=`${v} + ${l} * 0.5`),h=`starDistanceField(${o}, ${c}, ${g}, ${v}, ${x})`}else h=`regularDistanceField(${o}, ${c}, ${g}, ${x})`;const p=A(h,f,a,l,i);e.setSymbolColorExpression(p)}function K(t,e,r,n){let i="vec4(1.0)";"icon-color"in t&&(i=s(n,t["icon-color"],_)),"icon-opacity"in t&&(i=`${i} * vec4(1.0, 1.0, 1.0, ${s(n,t["icon-opacity"],u)})`);const o=b(t["icon-src"]),f=C(t,e,r,"icon-",o);if(e.setSymbolColorExpression(`${i} * texture2D(u_texture${o}, v_texCoord)`).setSymbolSizeExpression(f),"icon-width"in t&&"icon-height"in t&&e.setSymbolSizeExpression(`vec2(${s(n,t["icon-width"],u)}, ${s(n,t["icon-height"],u)})`),"icon-offset"in t&&"icon-size"in t){const a=s(n,t["icon-size"],y),l=e.getSymbolSizeExpression();e.setSymbolSizeExpression(a);const c=k(t,"icon-",n,"v_quadSizePx",a);e.setTextureCoordinateExpression(`(vec4((${c}).xyxy) + vec4(0., 0., ${a})) / (${l}).xyxy`)}if(T(t,e,n,"icon-"),"icon-anchor"in t){const a=s(n,t["icon-anchor"],y);let l="1.0";"icon-scale"in t&&(l=s(n,t["icon-scale"],S));let c;t["icon-anchor-x-units"]==="pixels"&&t["icon-anchor-y-units"]==="pixels"?c=`${a} * ${l}`:t["icon-anchor-x-units"]==="pixels"?c=`${a} * vec2(vec2(${l}).x, v_quadSizePx.y)`:t["icon-anchor-y-units"]==="pixels"?c=`${a} * vec2(v_quadSizePx.x, vec2(${l}).x)`:c=`${a} * v_quadSizePx`;let x=`v_quadSizePx * vec2(0.5, -0.5) + ${c} * vec2(-1., 1.)`;if("icon-anchor-origin"in t)switch(t["icon-anchor-origin"]){case"top-right":x=`v_quadSizePx * -0.5 + ${c}`;break;case"bottom-left":x=`v_quadSizePx * 0.5 - ${c}`;break;case"bottom-right":x=`v_quadSizePx * vec2(-0.5, 0.5) + ${c} * vec2(1., -1.)`;break}e.setSymbolOffsetExpression(`${e.getSymbolOffsetExpression()} + ${x}`)}}function Q(t,e,r,n){if("stroke-color"in t&&e.setStrokeColorExpression(s(n,t["stroke-color"],_)),"stroke-pattern-src"in t){const i=b(t["stroke-pattern-src"]),o=C(t,e,r,"stroke-pattern-",i);let f=o,a="vec2(0.)";"stroke-pattern-offset"in t&&"stroke-pattern-size"in t&&(f=s(n,t["stroke-pattern-size"],y),a=k(t,"stroke-pattern-",n,o,f));let l="0.";"stroke-pattern-spacing"in t&&(l=s(n,t["stroke-pattern-spacing"],u)),n.functions.sampleStrokePattern=`vec4 sampleStrokePattern(sampler2D texture, vec2 textureSize, vec2 textureOffset, vec2 sampleSize, float spacingPx, float currentLengthPx, float currentRadiusRatio, float lineWidth) {
  float currentLengthScaled = currentLengthPx * sampleSize.y / lineWidth;
  float spacingScaled = spacingPx * sampleSize.y / lineWidth;
  float uCoordPx = mod(currentLengthScaled, (sampleSize.x + spacingScaled));
  // make sure that we're not sampling too close to the borders to avoid interpolation with outside pixels
  uCoordPx = clamp(uCoordPx, 0.5, sampleSize.x - 0.5);
  float vCoordPx = (-currentRadiusRatio * 0.5 + 0.5) * sampleSize.y;
  vec2 texCoord = (vec2(uCoordPx, vCoordPx) + textureOffset) / textureSize;
  return texture2D(texture, texCoord);
}`;const c=`u_texture${i}`;let x="1.";"stroke-color"in t&&(x=e.getStrokeColorExpression()),e.setStrokeColorExpression(`${x} * sampleStrokePattern(${c}, ${o}, ${a}, ${f}, ${l}, currentLengthPx, currentRadiusRatio, v_width)`)}if("stroke-width"in t&&e.setStrokeWidthExpression(s(n,t["stroke-width"],u)),"stroke-offset"in t&&e.setStrokeOffsetExpression(s(n,t["stroke-offset"],u)),"stroke-line-cap"in t&&e.setStrokeCapExpression(s(n,t["stroke-line-cap"],$)),"stroke-line-join"in t&&e.setStrokeJoinExpression(s(n,t["stroke-line-join"],$)),"stroke-miter-limit"in t&&e.setStrokeMiterLimitExpression(s(n,t["stroke-miter-limit"],u)),"stroke-line-dash"in t){n.functions.getSingleDashDistance=`float getSingleDashDistance(float distance, float radius, float dashOffset, float dashLength, float dashLengthTotal, float capType, float lineWidth) {
  float localDistance = mod(distance, dashLengthTotal);
  float distanceSegment = abs(localDistance - dashOffset - dashLength * 0.5) - dashLength * 0.5;
  distanceSegment = min(distanceSegment, dashLengthTotal - localDistance);
  if (capType == ${m("square")}) {
    distanceSegment -= lineWidth * 0.5;
  } else if (capType == ${m("round")}) {
    distanceSegment = min(distanceSegment, sqrt(distanceSegment * distanceSegment + radius * radius) - lineWidth * 0.5);
  }
  return distanceSegment;
}`;let i=t["stroke-line-dash"].map(p=>s(n,p,u));i.length%2===1&&(i=[...i,...i]);let o="0.";"stroke-line-dash-offset"in t&&(o=s(n,t["stroke-line-dash-offset"],u));const a=`dashDistanceField_${b(t["stroke-line-dash"])}`,l=i.map((p,v)=>`float dashLength${v}`).join(", "),c=i.map((p,v)=>`dashLength${v}`).join(" + ");let x="0.",h=`getSingleDashDistance(distance, radius, ${x}, dashLength0, totalDashLength, capType, lineWidth)`;for(let p=2;p<i.length;p+=2)x=`${x} + dashLength${p-2} + dashLength${p-1}`,h=`min(${h}, getSingleDashDistance(distance, radius, ${x}, dashLength${p}, totalDashLength, capType, lineWidth))`;n.functions[a]=`float ${a}(float distance, float radius, float capType, float lineWidth, ${l}) {
  float totalDashLength = ${c};
  return ${h};
}`;const g=i.map((p,v)=>`${p}`).join(", ");e.setStrokeDistanceFieldExpression(`${a}(currentLengthPx + ${o}, currentRadiusPx, capType, v_width, ${g})`)}}function X(t,e,r,n){if("fill-color"in t&&e.setFillColorExpression(s(n,t["fill-color"],_)),"fill-pattern-src"in t){const i=b(t["fill-pattern-src"]),o=C(t,e,r,"fill-pattern-",i);let f=o,a="vec2(0.)";"fill-pattern-offset"in t&&"fill-pattern-size"in t&&(f=s(n,t["fill-pattern-size"],y),a=k(t,"fill-pattern-",n,o,f)),n.functions.sampleFillPattern=`vec4 sampleFillPattern(sampler2D texture, vec2 textureSize, vec2 textureOffset, vec2 sampleSize, vec2 pxOrigin, vec2 pxPosition) {
  float scaleRatio = pow(2., mod(u_zoom + 0.5, 1.) - 0.5);
  vec2 pxRelativePos = pxPosition - pxOrigin;
  // rotate the relative position from origin by the current view rotation
  pxRelativePos = vec2(pxRelativePos.x * cos(u_rotation) - pxRelativePos.y * sin(u_rotation), pxRelativePos.x * sin(u_rotation) + pxRelativePos.y * cos(u_rotation));
  // sample position is computed according to the sample offset & size
  vec2 samplePos = mod(pxRelativePos / scaleRatio, sampleSize);
  // also make sure that we're not sampling too close to the borders to avoid interpolation with outside pixels
  samplePos = clamp(samplePos, vec2(0.5), sampleSize - vec2(0.5));
  samplePos.y = sampleSize.y - samplePos.y; // invert y axis so that images appear upright
  return texture2D(texture, (samplePos + textureOffset) / textureSize);
}`;const l=`u_texture${i}`;let c="1.";"fill-color"in t&&(c=e.getFillColorExpression()),e.setFillColorExpression(`${c} * sampleFillPattern(${l}, ${o}, ${a}, ${f}, pxOrigin, pxPos)`)}}function ae(t,e,r){const n=Z(),i=new H,o={};if("icon-src"in t?K(t,i,o,n):"shape-points"in t?Y(t,i,o,n):"circle-radius"in t&&V(t,i,o,n),Q(t,i,o,n),X(t,i,o,n),r){const l=s(n,r,j);i.setFragmentDiscardExpression(`!${l}`)}const f={};function a(l,c,x,h){if(!n[l])return;const g=W(x),p=U(x);i.addAttribute(`a_${c}`,g),f[c]={size:p,callback:h}}return a("geometryType",B,$,l=>R(O(l.getGeometry()))),a("featureId",q,$|u,l=>{const c=l.getId()??null;return typeof c=="string"?R(c):c}),L(i,n),{builder:i,attributes:{...f,...G(n)},uniforms:{...o,...I(n,e)}}}function le(t){const e=Array.isArray(t)?t:[t];if("style"in e[0]){const r=[],n=e,i=[];for(const o of n){const f=Array.isArray(o.style)?o.style:[o.style];let a=o.filter;o.else&&i.length&&(a=["all",...i.map(c=>["!",c])],o.filter&&a.push(o.filter),a.length<3&&(a=a[1])),o.filter&&i.push(o.filter);const l=f.map(c=>({style:c,...a&&{filter:a}}));r.push(...l)}return r}return"builder"in e[0]?e:e.map(r=>({style:r}))}const d=new Uint8Array(4);class ce{constructor(e,r){this.helper_=e;const n=e.getGL();this.texture_=n.createTexture(),this.framebuffer_=n.createFramebuffer(),this.depthbuffer_=n.createRenderbuffer(),this.size_=r||[1,1],this.data_=new Uint8Array(0),this.dataCacheDirty_=!0,this.updateSize_()}setSize(e){N(e,this.size_)||(this.size_[0]=e[0],this.size_[1]=e[1],this.updateSize_())}getSize(){return this.size_}clearCachedData(){this.dataCacheDirty_=!0}readAll(){if(this.dataCacheDirty_){const e=this.size_,r=this.helper_.getGL();r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer_),r.readPixels(0,0,e[0],e[1],r.RGBA,r.UNSIGNED_BYTE,this.data_),this.dataCacheDirty_=!1}return this.data_}readPixel(e,r){if(e<0||r<0||e>this.size_[0]||r>=this.size_[1])return d[0]=0,d[1]=0,d[2]=0,d[3]=0,d;this.readAll();const n=Math.floor(e)+(this.size_[1]-Math.floor(r)-1)*this.size_[0];return d[0]=this.data_[n*4],d[1]=this.data_[n*4+1],d[2]=this.data_[n*4+2],d[3]=this.data_[n*4+3],d}getTexture(){return this.texture_}getFramebuffer(){return this.framebuffer_}getDepthbuffer(){return this.depthbuffer_}updateSize_(){const e=this.size_,r=this.helper_.getGL();this.texture_=this.helper_.createTexture(e,null,this.texture_),r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer_),r.viewport(0,0,e[0],e[1]),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,this.texture_,0),r.bindRenderbuffer(r.RENDERBUFFER,this.depthbuffer_),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_COMPONENT16,e[0],e[1]),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,this.depthbuffer_),this.data_=new Uint8Array(e[0]*e[1]*4)}}export{H as S,ce as W,oe as a,le as b,se as c,ie as d,re as e,ae as p};
//# sourceMappingURL=RenderTarget-C14E0H4Y.js.map
