//
import Input from './Input';

import Box from './Box';
import Grid from './Grid';
import Card from './Card';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(Input(theme), Box(theme), Grid(theme), Card(theme));
}
