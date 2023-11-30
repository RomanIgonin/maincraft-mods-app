export const getRandomElements = (arr: any[], amount: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
};
