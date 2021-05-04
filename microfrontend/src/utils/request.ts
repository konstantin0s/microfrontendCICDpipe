import { IS_DEVELOPMENT, DEV_TOKEN } from '../variables';

export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

/**
 * this builds correct urls irrespective if the base ends with a trailing / or not
 * @param base the base URL
 * @param path the path
 * @constructor
 */
export const BuildRequestURL = (base: string, path: string) => {
  return new URL(path, base).toString();
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return {};
  }
  return response.json();
}

/**
 * Parses the text returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed Text from the request
 */
function parseText(response) {
  if (response.status === 204 || response.status === 205) {
    return '';
  }
  return response.text();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new ResponseError(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {boolean} [needsToken] In case of custom requests with/without token
 * @param  {boolean} [isJSON] Choose if text or JSON response
 * @param  {boolean} [needsValidation] Enable/disable response validation
 *
 * @return {object}           The response data
 */
export default async function request(
  url: string,
  options?: any,
  needsToken = false,
  isJSON = true,
  needsValidation = true,
): Promise<{} | { err: ResponseError }> {
  const { headers, ...rest } = options;
  const parameters =
    IS_DEVELOPMENT && DEV_TOKEN && needsToken
      ? {
          headers: {
            ...headers,
            Authorization: `Bearer ${DEV_TOKEN}`,
          },
          ...rest,
        }
      : options;

  const fetchResponse = await fetch(url, parameters);

  if (needsValidation) {
    const response = await checkStatus(fetchResponse);

    if (isJSON) {
      return parseJSON(response);
    }

    return parseText(response);
  }

  return fetchResponse;
}
