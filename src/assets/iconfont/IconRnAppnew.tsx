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

let IconRnAppnew: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.637489 1024.00002c-282.362169 0-511.259142-228.896973-511.259142-511.259142S229.276343 1.482758 511.637489 1.482758s511.259142 228.896973 511.259142 511.259142S793.999658 1024.00002 511.637489 1024.00002zM511.637489 33.43671c-264.714278 0-479.30519 214.590913-479.30519 479.30519s214.590913 479.30519 479.30519 479.30519 479.30519-214.590913 479.30519-479.30519S776.351767 33.43671 511.637489 33.43671zM543.591441 768.370449l-63.906882 0L479.68456 544.69483 256.008941 544.69483l0-63.906882 223.675619 0L479.68456 257.112329l63.906882 0 0 223.675619 223.675619 0 0 63.906882L543.591441 544.69483 543.591441 768.370449z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconRnAppnew.defaultProps = {
  size: 18,
};

IconRnAppnew = React.memo ? React.memo(IconRnAppnew) : IconRnAppnew;

export default IconRnAppnew;
