const isFunction = (callback) => typeof callback === "function";
const getRandomItemByWeight = () => {
    const totalWeight = weightList.reduce((total, { weight }) => (total += weight), 0);
    const randomNumber = Math.random() * totalWeight;
    let accumulatedWeight = 0;
    for (const { item, weight } of weightList) {
        accumulatedWeight += weight;
        if (accumulatedWeight >= randomNumber) return item;
    }
};

export { isFunction, getRandomItemByWeight };
