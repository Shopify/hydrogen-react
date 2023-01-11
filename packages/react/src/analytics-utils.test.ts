import {parseGid, addDataIf, schemaWrapper} from './analytics-utils.js';

describe('analytic-utils', () => {
  describe('parseGid', () => {
    it('returns the id and resource type from a gid', () => {
      const {id, resource} = parseGid('gid://shopify/Order/123');
      expect(id).toBe('123');
      expect(resource).toBe('Order');
    });

    it('returns null if the gid is not a string', () => {
      //@ts-expect-error - testing invalid input
      const {id, resource} = parseGid(123);
      expect(id).toBe(null);
      expect(resource).toBe(null);
    });

    it('returns null if the gid is not a valid gid', () => {
      const {id, resource} = parseGid('gid://shopify/Order');
      expect(id).toBe(null);
      expect(resource).toBe(null);
    });

    it('returns the id and resource type from a gid with a query string', () => {
      const {id, resource} = parseGid('gid://shopify/Order/123?namespace=123');
      expect(id).toBe('123');
      expect(resource).toBe('Order');
    });

    it('returns the id and resource type from a gid with a query string and a fragment', () => {
      const {id, resource} = parseGid(
        'gid://shopify/Order/123?namespace=123#fragment'
      );
      expect(id).toBe('123');
      expect(resource).toBe('Order');
    });

    it('returns null if the resource is missing', () => {
      const {id, resource} = parseGid('gid://shopify//123');
      expect(id).toBe(null);
      expect(resource).toBe(null);
    });
  });

  describe('addDataIf', () => {
    it('adds the key value pair when the value is truthy', () => {
      const data = {foo: 'bar'};
      const formattedData = {};

      expect(addDataIf(data, formattedData)).toEqual({foo: 'bar'});
    });

    it('does not add the key value pair when the value is falsy', () => {
      const data = {foo: null, bazz: ''};
      const formattedData = {};

      expect(addDataIf(data, formattedData)).toEqual({});
    });

    it('does not add the key value pair when the value is an empty string', () => {
      const data = {foo: ''};
      const formattedData = {};

      expect(addDataIf(data, formattedData)).toEqual({});
    });

    it('returns and empty object if the key value pairs are not an object', () => {
      const data = 'foo';
      const formattedData = {};

      //@ts-expect-error passing-and-invalid-type-for-testing
      expect(addDataIf(data, formattedData)).toEqual({});
    });
  });

  describe('schemaWrapper', () => {
    it('returns a Shopify Monorail payload from a Shopify Analytics payload and a schema ID', () => {
      const payload = {foo: 'bar'};
      const schemaId = '123';

      expect(schemaWrapper(schemaId, payload)).toEqual({
        schema_id: '123',
        payload: {foo: 'bar'},
        metadata: {event_created_at_ms: expect.any(Number)},
      });
    });

    it('throws an error if the schema ID is not a string', () => {
      const payload = {foo: 'bar'};
      const schemaId = 123;

      //@ts-expect-error passing-and-invalid-type-for-testing
      expect(() => schemaWrapper(schemaId, payload)).toThrow(
        '`schemaId` must be a string'
      );
    });

    it('throws an error if the payload is not an object', () => {
      const payload = 'foo';
      const schemaId = '123';

      //@ts-expect-error passing-and-invalid-type-for-testing
      expect(() => schemaWrapper(schemaId, payload)).toThrow(
        '`payload` must be an object'
      );
    });
  });
});
