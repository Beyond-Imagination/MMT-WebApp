import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CSSProperties } from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
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
          <div className="screen" style={{ width: 388, backgroundColor: 'white' }}>
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
