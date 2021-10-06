export function min (val, args) {
  const minValue = parseFloat(args[0])

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

  return value >= minValue
}
