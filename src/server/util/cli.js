export default {
  handleError: (msg, err) => {
    console.error(msg)
    console.error(err)
    process.exit(1)
  },
}
