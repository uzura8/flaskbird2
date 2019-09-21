import config from '@/config/config'
import str from './str'

export default {
  uri: (path) => {
    const domain = config.domain
    const port = config.port ? ':' + config.port: ''
    const basePath = config.baseUrl
    const schem = config.isSSL ? 'https://' : 'http://'
    let items = [schem, domain, port, basePath, str.ltrimChar(path, '/'), '/']
    return items.join('')
  },
}
