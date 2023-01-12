import type {ShopifyMonorailPayload} from './analytics-types.js';

/**
 * Builds a Shopify Monorail payload from a Shopify Analytics payload and a schema ID.
 * @param payload - The payload to format
 * @param schemaId - The schema ID to use
 * @returns The formatted payload
 **/
export function schemaWrapper(schemaId: string, payload: object) {
  if (typeof schemaId !== 'string') {
    throw new Error('`schemaId` must be a string');
  }
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('`payload` must be an object');
  }
  return {
    schema_id: schemaId,
    payload,
    metadata: {
      event_created_at_ms: Date.now(),
    },
  };
}

/**
 * Parses global id (gid) and returns the resource, subResource (complex gid only) and id.
 * @see https://shopify.dev/api/usage/gids
 * @param gid - A shopify GID (string)
 * @returns \{ id: string | number | null, resource: string| null, subResource: string | null \}
 *
 * @example
 * ```ts
 * const {id, resource} = parseGid('gid://shopify/Order/123')
 * // => id = 123, resource = 'Order'
 *
 *  * const {id, resource} = parseGid('gid://shopify/Cart/abc123')
 * // => id = "abc123", resource = 'Cart'
 *
 * ```
 **/
export function parseGid(gid: string | undefined): {
  id: string | number | null;
  resource: string | null;
  subResource: string | null;
} {
  const defaultReturn = {id: null, resource: null, subResource: null};

  if (typeof gid !== 'string') {
    return defaultReturn;
  }

  // complex gids have the following format https://shopify.dev/api/usage/gids#parameterized-global-ids
  // TODO: add support for parsing query parameters on complex gids
  const isComplexGid = /gid:\/\/shopify\/(\w+)\/(\w+)\/([a-z0-9]+)/.test(gid);

  let matches,
    id,
    resource,
    subResource = null;

  if (isComplexGid) {
    matches = gid.match(/^gid:\/\/.hopify\/(\w+)\/(\w+)\/([a-z0-9]+)/);

    if (!matches || matches.length === 1) {
      return defaultReturn;
    }
    id = matches[3] ? matches[3] : null;
    subResource = matches[2] ? matches[2] : null;
    resource = matches[1] ? matches[1] : null;
  } else {
    matches = gid.match(/^gid:\/\/.hopify\/(\w+)\/([a-z0-9]+)/);

    if (!matches || matches.length === 1) {
      return defaultReturn;
    }
    id = matches[2] ? matches[2] : null;
    resource = matches[1] ? matches[1] : null;
  }

  // if id is comprasied of only numbers, return as an integer
  if (id && /^\d+$/.test(id)) {
    return {id: parseInt(id, 10), resource, subResource};
  }
  return {id, resource, subResource};
}

/**
 * Filters properties from an object and returns a new object with only the properties that have a truthy value.
 * @param keyValuePairs - An object of key-value pairs
 * @param formattedData - An object which will hold the truthy values
 * @returns The formatted object
 **/
export function addDataIf(
  keyValuePairs: ShopifyMonorailPayload,
  formattedData: ShopifyMonorailPayload
): ShopifyMonorailPayload {
  if (typeof keyValuePairs !== 'object') {
    return {};
  }
  Object.entries(keyValuePairs).forEach(([key, value]) => {
    if (value) {
      formattedData[key] = value;
    }
  });
  return formattedData;
}

/**
 * Utility that errors if a function is called on the server.
 * @param fnName - The name of the function
 * @returns A boolean
 **/
export function errorIfServer(fnName: string): boolean {
  if (!window) {
    console.error(
      `${fnName} should only be used within the useEffect callback or event handlers`
    );
    return true;
  }
  return false;
}
