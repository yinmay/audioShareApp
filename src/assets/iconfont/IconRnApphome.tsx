/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconRnApphome: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M556.586667 159.36l288.490666 183.914667A64 64 0 0 1 874.666667 397.248v392.746667a64 64 0 0 1-64 64H555.456l0.021333-196.992H490.666667v196.992H234.666667a64 64 0 0 1-64-64v-398.293334a64 64 0 0 1 30.272-54.4l287.530666-178.346666a64 64 0 0 1 68.138667 0.426666zM810.666667 790.016V397.226667L522.197333 213.333333 234.666667 391.68v398.336h192v-197.013333h192.810666v196.992H810.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRnApphome.defaultProps = {
  size: 18,
};

IconRnApphome = React.memo ? React.memo(IconRnApphome) : IconRnApphome;

export default IconRnApphome;
