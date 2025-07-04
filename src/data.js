
export const API_KEY = 'AIzaSyBGeYz64BoGlfFjDYJTmbCO22b123R6g_k';


export const value_converter = (value) => {
  const num = Number(value);
  if (isNaN(num)) return value; 

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + "K";
  } else {
    return num.toString();
  }
};
