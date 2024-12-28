precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float rand(float x) {
    return fract(sin(x) * 43758.5453);
}


vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


float f(in vec2 p)
{
    return sin(p.x+sin(p.y+u_time*0.1)) * sin(p.y*p.x*0.1+u_time*0.2);
}

vec2 field(in vec2 p)
{
        vec2 ep = vec2(.05,0.);
    vec2 rz= vec2(0);
        for( int i=0; i<7; i++ )
        {
                float t0 = f(p);
                float t1 = f(p + ep.xy);
                float t2 = f(p + ep.yx);
        vec2 g = vec2((t1-t0), (t2-t0))/ep.xx;
                vec2 t = vec2(-g.y,g.x);
        
        p += .9*t + g*0.3;
        rz= t;
        }
    
    return rz;
}


float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res * res;
}

const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float hash(vec2 p) {
    // Simple pseudo-random hash function
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec2 gradientNoise(vec2 p) {
    vec2 i = floor(p);      // Integer grid point
    vec2 f = fract(p);      // Fractional part for interpolation

    // Fade curve (smooth Hermite interpolation)
    vec2 u = f * f * (3.0 - 2.0 * f);

    // Random values at the corners of the grid cell for x and y components
    float a1 = hash(i);
    float b1 = hash(i + vec2(1.0, 0.0));
    float c1 = hash(i + vec2(0.0, 1.0));
    float d1 = hash(i + vec2(1.0, 1.0));

    float a2 = hash(i + vec2(0.5, 0.5)); // Offset hash for y component
    float b2 = hash(i + vec2(1.5, 0.5));
    float c2 = hash(i + vec2(0.5, 1.5));
    float d2 = hash(i + vec2(1.5, 1.5));

    // Interpolation for x and y components
    float x = mix(mix(a1, b1, u.x), mix(c1, d1, u.x), u.y);
    float y = mix(mix(a2, b2, u.x), mix(c2, d2, u.x), u.y);

    return vec2(x, y);
}

float fbm( vec2 p, float time )
{
    float f = 0.0;

    f += 0.500000*noise( p + 0.2 * time ); p = mtx*p*2.02;
    f += 0.031250*noise( p ); p = mtx*p*2.01;
    f += 0.250000*noise( p ); p = mtx*p*2.03;
    f += 0.125000*noise( p + sin(2. * time) ); p = mtx*p*2.01;
    //f += 0.062500*noise( p + sin(2. * time)); p = mtx*p*2.04;
    //f += 0.015625*noise( p + sin(2.*time) );

    return f/0.983125;
}


float pattern( in vec2 p )
{
  float time = 0.001 * u_time;
  return fbm( p + fbm( p, time + 5. ), time);
}

void main()
{
    float granularity = 5.;

    vec2 p = gl_FragCoord.xy / u_resolution.xy;
    float radius = 5.;
    float time = u_time * 0.02;
    vec2 p_translated = p + radius * vec2(cos(time), sin(time));
    vec2 translatedNoise = gradientNoise(p_translated);
    float value = pattern(field(gradientNoise(p_translated)));
    vec3 col = pal( 1.2 * value, vec3(0.473,0.333,0.532),vec3(0.38,0.413,0.883),vec3(.547,.994,.618),vec3(7.605,5.984,8.022) );
    gl_FragColor = vec4(col, 1.0);
}
