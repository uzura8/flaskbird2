export default {
  example: state => (exampleId) => {
    return state.example.list.find(item => {
      return item.id === exampleId
    })
  },
}
