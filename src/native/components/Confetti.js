import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const PARTICLE_DIMENSIONS = { width: 20, height: 20 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 100;

const colors = [
  'rgba(92,255,97,.6)',
  'rgba(191,225,4,.6)',
  'rgba(228,220,4,.6)',
  'rgba(255,95,88,.6)',
  'rgba(247,39,141,.6)',
  'rgba(0,184,255,.6)',
  'rgba(183,6,254,.6)',
];

const FlippingParticle = ({
  back = false, delay, duration = 1000, source, style = {},
}) => (
  <Animatable.View
    animation={{
      from: { rotateX: back ? '0deg' : '180deg', rotate: !back ? '180deg' : '0deg' },
      to: { rotateX: back ? '360deg' : '-180deg', rotate: !back ? '180deg' : '0deg' },
    }}
    duration={duration}
    delay={delay}
    easing="linear"
    iterationCount="infinite"
    useNativeDriver={false}
    source={source}
    style={{
      ...style,
      backfaceVisibility: 'hidden',
    }}
  />
);

const Swinging = ({
  amplitude, rotation = 7, delay, duration = 700, children,
}) => (
  <Animatable.View
    animation={{
      0: {
        translateX: -amplitude,
        translateY: -amplitude * 0.8,
        rotate: `${rotation}deg`,
      },
      0.5: {
        translateX: 0,
        translateY: 0,
        rotate: '0deg',
      },
      1: {
        translateX: amplitude,
        translateY: -amplitude * 0.8,
        rotate: `${-rotation}deg`,
      },
    }}
    delay={delay}
    duration={duration}
    direction="alternate"
    easing="ease-in-out"
    iterationCount="infinite"
    useNativeDriver={false}
  >
    {children}
  </Animatable.View>
);

const Falling = ({
  duration, delay, style, children,
}) => (
  <Animatable.View
    animation={{
      from: { translateY: -PARTICLE_DIMENSIONS.height - WIGGLE_ROOM },
      to: { translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM },
    }}
    duration={duration}
    delay={delay}
    easing={t => Math.pow(t, 1.7)}
    iterationCount={1}
    useNativeDriver={false}
    style={style}
  >
    {children}
  </Animatable.View>
);

const randomize = max => Math.random() * max;

const range = (count) => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
};

const randomColor = () => colors[Math.floor(randomize(colors.length))];

const Confetti = ({ show, count = 30, duration = 5000 }) => {
  if (show) {
    return (
      <View
        pointerEvents="none"
        style={[
        {
          position: 'absolute',
          top: 0,
          width: SCREEN_DIMENSIONS.width,
          height: SCREEN_DIMENSIONS.height,
        },
      ]}
      >
        {range(count)
          .map(i => randomize(2000))
          .map((flipDelay, i) => (
            <Falling
              key={i}
              duration={duration}
              delay={i * (duration / count)}
              style={{
                position: 'absolute',
                paddingHorizontal: WIGGLE_ROOM,
                left: randomize(SCREEN_DIMENSIONS.width - PARTICLE_DIMENSIONS.width) - WIGGLE_ROOM,
                backgroundColor: 'blue',
              }}
            >
              <Swinging amplitude={PARTICLE_DIMENSIONS.width / 5} delay={randomize(duration)}>
                <FlippingParticle
                  delay={flipDelay}
                  style={{
                    position: 'absolute',
                    width: PARTICLE_DIMENSIONS.width,
                    height: PARTICLE_DIMENSIONS.height,
                    backgroundColor: randomColor(),
                    borderColor: 'white',
                    borderWidth: 1,
                  }}
                />
                <FlippingParticle
                  delay={flipDelay}
                  back
                  style={{
                    position: 'absolute',
                    width: PARTICLE_DIMENSIONS.width,
                    height: PARTICLE_DIMENSIONS.height,
                    backgroundColor: randomColor(),
                    borderColor: 'white',
                    borderWidth: 1,
                  }}
                />
              </Swinging>
            </Falling>
          ))}
      </View>
    );
  }

  return null;
};

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  show: state.confetti.show,
});

export default connect(mapStateToProps, mapDispatchToProps)(Confetti);
