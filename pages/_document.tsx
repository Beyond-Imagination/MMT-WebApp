import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CSSProperties } from 'react'


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render () {
    const KAKAO_SDK_JAVASCRIPT_KEY = process.env.KAKAO_SDK_JAVASCRIPT_KEY
    const kakaoScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_SDK_JAVASCRIPT_KEY}&libraries=services,clusterer`
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />{' '}
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <script type="text/javascript" src={kakaoScriptSrc} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
