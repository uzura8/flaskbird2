export default {
  substr: (text, len, truncation='') => {
    const text_array = text.split('')
    let count = 0
    let str = ''
    for (let i = 0, m = text_array.length; i < m; i++) {
      let n = escape(text_array[i])
      if (n.length < 4) {
        count++
      } else {
        count += 2;
      }
      if (count > len) {
        return str + truncation
      }
      str += text.charAt(i)
    }
    return text
  },

  capitalize: (text) => {
    return text.slice(0, 1).toUpperCase() + text.slice(1)
  },

  ltrimChar: function(str, anyChar) {
    return str.replace(new RegExp('^' + anyChar, 'g'),'')
  },

  rtrimChar: function(str, anyChar) {
    return str.replace(new RegExp(anyChar + '+$', 'g'),'')
  },

  trimChar: function(str, anyChar) {
    return str.replace(new RegExp('^' + anyChar + '+|' + anyChar + '+$', 'g'),'')
  },

  checkEmail: function(text) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(text)
  },
}
