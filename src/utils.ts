export function shuffle<T> (array : T[]) : T[] {
  const cloneArray = JSON.parse(JSON.stringify(array))

  let curIndex = cloneArray.length
  while (curIndex != 0) {
    const randomIndex = Math.floor(Math.random() * curIndex)
    curIndex--

    const tempValue = cloneArray[curIndex]
    cloneArray[curIndex] = cloneArray[randomIndex]
    cloneArray[randomIndex] = tempValue

  }

  return cloneArray
}