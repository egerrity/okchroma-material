// docs-lint — the documentation rules this repo shares with the engine, enforced.
//
//   npm run docs:lint
//
// Checks the README, the docs an outside engineer reads, and the in-app docs pages
// for the classes of drift that recur: em dashes in prose, retired token vocabulary,
// WCAG criteria cited by number alone, internal round IDs and owner-date jargon.
// A hit prints file:line, the rule and the offending text; any hit fails the run.
//
// Not linted: docs/round-1-failures.md, docs/gap-report.md, docs/derivation-audit.md
// and docs/engine-worklist.md, the construction records (their own item IDs and the
// dated rulings are the record).
import * as fs from 'fs'
import * as path from 'path'

type Surface = { path: string; kind: 'md' | 'tsx' }
const SURFACES: Surface[] = [
  { path: 'README.md', kind: 'md' },
  { path: 'docs/customizing-mui.md', kind: 'md' },
  { path: 'docs/okchroma-context.md', kind: 'md' },
  { path: 'docs/okchroma-integration-brief.md', kind: 'md' },
  { path: 'src/docs/DocsSite.tsx', kind: 'tsx' },
  ...fs
    .readdirSync('src/docs/pages')
    .filter(f => f.endsWith('.tsx'))
    .sort()
    .map(f => ({ path: path.join('src/docs/pages', f), kind: 'tsx' as const })),
]

type Rule = { name: string; re: RegExp; why: string }
const RULES: Rule[] = [
  { name: 'em-dash', re: /—/g, why: 'no em dashes in doc prose' },
  { name: 'retired-band', re: /\b(?:wash|wax|lead|mark|ink)-\d+\b/g, why: 'retired band word; the instruments are paper/highlighter/crayon/pencil/pen' },
  { name: 'retired-suffix', re: /\b(?:paper|highlighter|crayon|pencil|pen)-\d+-aaa?\b/g, why: 'the -aa/-aaa conformance suffix is retired; conformance is stated in the description' },
  { name: 'retired-register', re: /\b(?:solid|primitive)\//g, why: 'retired register word; the zones are base/ and utility/, the family is stamp/' },
  { name: 'retired-token', re: /\b(?:cta-border|on-cta|cta-ink|highlight-9|on-highlight|cta-stroke)\b/g, why: 'retired token name' },
  { name: 'retired-plane', re: /\bsunken\b/g, why: 'retired plane word; the planes are dim/low/mid/high' },
  { name: 'criterion-number', re: /\bWCAG ?\d\.\d+\.\d+\b|\b1\.4\.(?:1|3|6|11)\b/g, why: 'state the requirement in plain English (the 4.5:1 text bar, the 3:1 non-text bar); link the clause if citing it' },
  { name: 'round-id', re: /\b[CT]\d{1,3}\b/g, why: 'internal round ID; state the mechanism, link the record if history is needed' },
  { name: 'owner-jargon', re: /\(owner\b|\bowner(?:'s)? (?:ruling|rule|call|decision|directive|spec|mark|pick|correction)\b|\bowner[ -]20\d\d\b/gi, why: 'internal decision jargon; state the rule, not who ruled it' },
]

// tsx: only the rendered prose is a doc surface. Strip block comments, full-line
// comments, and trailing " // " comments (a URL's :// has no space before it).
function proseOf(src: string, kind: Surface['kind']): string {
  if (kind === 'md') return src
  return src
    .replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
    .replace(/^(\s*)\/\/.*$/gm, (m, ws) => ws + ' '.repeat(m.length - ws.length))
    .replace(/(\s)\/\/ .*$/gm, (m, ws) => ws + ' '.repeat(m.length - ws.length))
}

// hex literals are never a round ID (#C61D1B); blank them before the round-id rule
const withoutHex = (line: string) => line.replace(/#[0-9a-fA-F]{6}\b/g, m => ' '.repeat(m.length))

// the integration page quotes the okchroma dependency range; it must match package.json
const range = (JSON.parse(fs.readFileSync('package.json', 'utf8')).dependencies as Record<string, string>).okchroma
if (!fs.readFileSync('src/docs/pages/UsingWithMui.tsx', 'utf8').includes(`okchroma        ${range}`)) {
  console.log(`src/docs/pages/UsingWithMui.tsx: dependency-range: the DEPS block must quote package.json's okchroma range (${range})`)
  process.exitCode = 1
}

let hits = 0
for (const s of SURFACES) {
  if (!fs.existsSync(s.path)) { console.log(`docs-lint: missing surface ${s.path}`); hits++; continue }
  const lines = proseOf(fs.readFileSync(s.path, 'utf8'), s.kind).split('\n')
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      const subject = rule.name === 'round-id' ? withoutHex(line) : line
      const found = subject.match(rule.re)
      if (!found) continue
      hits++
      console.log(`${s.path}:${i + 1}: ${rule.name} (${found.join(', ')}): ${rule.why}\n    ${line.trim().slice(0, 140)}`)
    }
  })
}

if (hits || process.exitCode) {
  console.log(`\ndocs-lint: ${hits} hit${hits === 1 ? '' : 's'}`)
  process.exit(1)
}
console.log('docs-lint: clean')
