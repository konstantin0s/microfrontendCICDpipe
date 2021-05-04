const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const DEV_TOKEN = process.env.REACT_APP_DEV_TOKEN;

const MFE_UI_NAMESPACE = 'starter-mfe-ui';

const BACK_URL = process.env.REACT_APP_BACK_URL;

export { IS_PRODUCTION, IS_DEVELOPMENT, DEV_TOKEN, MFE_UI_NAMESPACE, BACK_URL };
