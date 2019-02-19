import {expect, test} from '@oclif/test'

describe('delete-project', () => {
  test
    .stdout()
    .command(['delete-project'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['delete-project', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})
