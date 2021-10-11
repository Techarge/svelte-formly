export function max (val, args) {
  const maxValue = parseFloat(args[0])

  if (
      val === "" ||
      val === '' ||
      val === null ||
      val === undefined
  ) {
    return true
  }

  val = val ? val : ''

  const value = isNaN(val) ? val.length : parseFloat(val)
  return isNaN(value) ? true : value <= maxValue
}
