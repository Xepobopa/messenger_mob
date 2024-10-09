import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileDefaultIcon = ({ width = 50, height = 50, style = {} }) => {
  return (
    <Svg viewBox="0 0 100 100" width={width} height={height} style={style}>
      {/* Контур головы */}
      <Path
        d="M50 10C28.667 10 11 27.667 11 49C11 70.333 28.667 88 50 88C71.333 88 89 70.333 89 49C89 27.667 71.333 10 50 10Z"
        fill="#6bbfff"
        stroke="#6bbfff"
        strokeWidth="2"
      />

    </Svg>
  );
};

export default ProfileDefaultIcon;
