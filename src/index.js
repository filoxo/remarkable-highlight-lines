const RE = /{([\d,-]+)}/

export default md => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options] = args
    const {params, content} = tokens[idx]
    if (!params || !RE.test(params)) {
      return fence(...args)
    }
    const lineNumbers = RE.exec(params)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)))
    const langName = params.replace(RE, '').trim()
    const code = options.highlight ?
      options.highlight(content, langName) :
      content
    const codeSplits = code.split('\n').map((split, index) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) => start && end
        ? lineNumber >= start && lineNumber <= end
        : lineNumber === start
      )
      return inRange 
        ? {
          code: `<span class="highlighted-line">${split}</span>`,
          highlighted: true
        }
        : {code: split}
    })
    let highlightedCode = codeSplits.reduce((code, split) => {
      code += split.highlighted ? split.code : `${split.code}\n`
      return code
    }, '')
    // If custom highlighter wraps code with starting <pre..., don't wrap code
    if (highlightedCode.startsWith('<pre')) {
      return highlightedCode
    }
    return `<pre><code ${langName ? `class="${options.langPrefix}${langName}"` : ''}>${highlightedCode.trim()}</code></pre>`
  }
}
