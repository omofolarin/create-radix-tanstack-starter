export const colorScale = 12;
export const radixColors = [
  'tomato',
  'red',
  'ruby',
  'crimson',
  'pink',
  'plum',
  'purple',
  'violet',
  'iris',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'jade',
  'green',
  'grass',
  'bronze',
  'gold',
  'brown',
  'orange',
  'amber',
  'yellow',
  'lime',
  'mint',
  'sky',
];

export const radixGrayColors = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'];

export const getColor = (color: string, scale: number, alpha?: boolean) => {
  const colors = Array.from(Array(scale).keys()).reduce(
    (acc, _, i) => {
      acc[i + 1] = `var(--${color}-${alpha ? 'a' : ''}${i + 1})`;
      return acc;
    },
    {} as Record<number | string, string>
  ) as Record<string | number, string>;
  if (!alpha) {
    colors['contrast'] = `var(--${color}-contrast)`;
    colors['surface'] = color === 'accent' ? 'var(--accent-surface)' : `var(--${color}-surface)`;
  }

  return colors;
};

export const getGrayColor = (color: string, scale: number, alpha?: boolean) => {
  const colors = Array.from(Array(scale).keys()).reduce(
    (acc, _, i) => {
      acc[i + 1] = `var(--${color}-${alpha ? 'a' : ''}${i + 1})`;
      return acc;
    },
    {} as Record<number | string, string>
  ) as Record<string | number, string>;

  return colors;
};

export const getColors = (arr: string[], isGray?: boolean) => {
  const colors = arr.reduce(
    (acc, color) => {
      acc[color] = isGray
        ? getGrayColor(color, colorScale, false)
        : getColor(color, colorScale, false);
      return acc;
    },
    {} as Record<string, Record<number | string, string>>
  );

  const alphaColors = arr.reduce(
    (acc, color) => {
      acc[color + '-a'] = isGray
        ? getGrayColor(color, colorScale, true)
        : getColor(color, colorScale, true);
      return acc;
    },
    {} as Record<string, Record<number | string, string>>
  );
  return { ...colors, ...alphaColors };
};
