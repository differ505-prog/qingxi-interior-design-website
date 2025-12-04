import 'es-module-lexer';
import './chunks/astro-designed-error-pages_nS_OFtK7.mjs';
import './chunks/astro/server_D7yWafUH.mjs';
import 'clsx';
import 'cookie';
import { s as sequence } from './chunks/index_CCqYzyaT.mjs';

const onRequest$1 = async (context, next) => {
  const { pathname } = context.url;
  {
    if (pathname === "/preview-login") {
      return next();
    }
    const authCookie = context.cookies.get("preview_auth");
    if (!authCookie || authCookie.value !== "true") {
      return context.redirect("/preview-login");
    }
  }
  return next();
};

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
