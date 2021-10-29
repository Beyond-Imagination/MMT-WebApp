import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const KAKAO_SDK_JAVASCRIPT_KEY = '1fa3d84c220e7a4cbc19ac98ad079f9a';
    const kakaoScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_SDK_JAVASCRIPT_KEY}&libraries=services,clusterer`;
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />{' '}
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <script type="text/javascript" src={kakaoScriptSrc} />
          <script src="https://developers.kakao.com/sdk/js/kakao.min.js" />
        </Head>
        <body
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#ABABAB',
            height: '100%',
          }}
        >
          <div className="screen">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
