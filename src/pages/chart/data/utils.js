import _random from 'lodash/random'

const makeRandomToArray = ({min, max, num}) => {
    const arr = []
    for (let i = 0; i < num; i++) {
        arr.push(_random(min, max))
    }
    return arr
}

const makeChartColors = () => {
    const rgb = `${_random(0, 255)}, ${_random(0, 255)}, ${_random(0, 255)}`
	return {
        bgColor: `rgba(${rgb}, 0.7)`,
        bdColor: `rgba(${rgb}, 0.9)`
    }
};

export {makeRandomToArray, makeChartColors}