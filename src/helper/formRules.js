const rules = {
  required: (val) => !!val || 'Field is required.',
  email: (val) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return emailRegex.test(val) ? true : 'Invalid Email Address.'
  },
  noSpace: (val) => {
    const noSpaceRegex = /^\S*$/
    return noSpaceRegex.test(val) ? true : 'No spaces allowed.'
  }
}

export { rules }
