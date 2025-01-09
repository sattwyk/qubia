// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'qubia',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
    };
  },
  async run() {
    const auth = new sst.aws.Auth('QubiaAuth', {
      authorizer: 'auth/index.handler',
    });

    new sst.aws.Nextjs('QubiaWeb', {
      link: [auth],
    });
  },
});
