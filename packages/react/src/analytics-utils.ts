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
 * Parses global id (gid) and returns the resource type and id.
 * @see https://shopify.dev/api/usage/gids
 * @param gid - A shopify GID (string)
 * @returns \{ id: string | number | null, resource: string| null \}
 *
 * @example
 * ```ts
 * const {id, resource} = parseGid('gid://shopify/Order/123')
 * // => id = 123, resource = 'Order'
 *
 *  * const {id, resource} = parseGid('gid://shopify/Cart/abc123')
 * // => id = "abc123", resource = 'Cart'
 * ```
 **/
export function parseGid(gid: string | undefined): {
  id: string | number | null;
  resource: string | null;
} {
  const defaultReturn = {id: null, resource: null};

  if (typeof gid !== 'string') {
    return defaultReturn;
  }

  // TODO: add support for parsing query parameters on complex gids
  const matches = gid.match(/^gid:\/\/.hopify\/(\w+)\/([a-z0-9]+)/);

  if (!matches || matches.length === 1) {
    return defaultReturn;
  }
  const id = matches[2] ?? null;
  const resource = matches[1] ?? null;

  // if id is of only numbers, return as an integer
  if (id && /^\d+$/.test(id)) {
    return {id: parseInt(id, 10), resource};
  }
  return {id, resource};
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
  if (typeof document === 'undefined') {
    console.error(
      `${fnName} should only be used within the useEffect callback or event handlers`
    );
    return true;
  }
  return false;
}
