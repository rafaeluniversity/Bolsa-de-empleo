import React from 'react';
import { icons } from 'feather-icons';

const DEFAULT_PROPS = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export default ({ name, ...props }) => (
  <svg
    {...DEFAULT_PROPS}
    {...props}
    dangerouslySetInnerHTML={{ __html: icons[name] }}
  />
);