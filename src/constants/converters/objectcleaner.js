const removeEmptyProps = (obj) => {
  for (const prop in obj) {
    if (obj[prop] === '' || (Array.isArray(obj[prop]) && obj[prop].length === 0)) {
      delete obj[prop]
    } else if (typeof obj[prop] === 'object') {
      removeEmptyProps(obj[prop])
      if (Object.keys(obj[prop]).length === 0) { delete obj[prop] }
    }
  }
}

export { removeEmptyProps }
