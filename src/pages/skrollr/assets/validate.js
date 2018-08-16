const isNumber = (value) => {
  return /^[0-9.-]+$/.test(value)
}

const isColor = (value) => {
  return /^(rgba?\([0-9., ]+\))|(#[0-9a-f]{3}([0-9a-f]{3})?)$/.test(value)
}

export { isNumber, isColor }
