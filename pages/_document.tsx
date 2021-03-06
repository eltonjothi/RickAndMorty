/* eslint-disable react/jsx-filename-extension */
// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import React from 'react';

// Required for @emotion/css
import { extractCritical } from '@emotion/server';

interface IProps {
  ids: any;
  css: any;
}
export default class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    const { ids } = this.props;
    return (
      <Html lang="en">
        <Head>
          <style
            data-emotion-css={ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
          {/* <link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
