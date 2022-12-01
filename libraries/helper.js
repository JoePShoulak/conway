function lerpColors(progress, ...colors) {
  colors = colors.map((c) => (c instanceof p5.Color ? c : color(c)));

  const n = colors.length - 1;

  if (progress <= 0) return colors[0];
  if (progress >= 1) return colors[n];

  const i = ~~(progress * n);
  return lerpColor(colors[i], colors[i + 1], (progress * n) % 1);
}

function newArr(n) {
  return Array(n).fill();
}
