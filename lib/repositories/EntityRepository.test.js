process.env.NODE_ENV = 'test';
const knex = require('knex');
const KnexMock = require('mock-knex');
const EntityRepository = require('./EntityRepository');

describe('EntityRepository', () => {
  const db = knex({ client: 'pg' });
  let entityRepository = null;
  let knexTracker = null;

  beforeAll(() => {
    KnexMock.mock(db);
    entityRepository = new EntityRepository({
      entityName: 'Entity',
      db,
      logError: console.error // eslint-disable-line no-console
    });
  });

  beforeEach(() => {
    knexTracker = KnexMock.getTracker();
    knexTracker.install();
  });

  describe('create', () => {
    it('should create an Entity', async () => {
      const inputEntity = {
        name: 'Some name',
        description: 'Some description'
      };

      const expectedEntity = Object.assign({}, inputEntity, { id: 1 });

      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('insert');
        query.response([expectedEntity]);
      });

      const actualEntity = await entityRepository.create(inputEntity);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('getAll', () => {
    it('should get all the Entities', async () => {
      const inputEntity = [
        {
          id: 1,
          name: 'Name 1',
          description: 'Description 1'
        },
        {
          id: 2,
          name: 'Name 2',
          description: 'Description 2'
        }
      ];

      const expectedEntity = inputEntity;

      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('select');
        query.response(expectedEntity);
      });

      const actualEntity = await entityRepository.getAll(inputEntity);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('getById', () => {
    it('should get an entity by Id', async () => {
      const inputEntity = {
        id: 1,
        name: 'Name 1',
        description: 'Description 1'
      };

      const expectedEntity = inputEntity;

      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('select');
        query.response([expectedEntity]);
      });

      const actualEntity = await entityRepository.getById(inputEntity);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('findByAttribute', () => {
    it('should get an entity by attribute', async () => {
      const inputEntity = {
        id: 1,
        name: 'Name 1',
        description: 'Description 1'
      };

      const expectedEntity = inputEntity;

      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('select');
        query.response(expectedEntity);
      });

      const actualEntity = await entityRepository.findByAttribute(inputEntity);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  describe('update', () => {
    it('should update an entity', async () => {
      const inputEntity = {
        id: 1,
        name: 'Name 1',
        description: 'old description'
      };

      const expectedEntity = {
        id: 1,
        name: 'Name 1',
        description: 'new description'
      };

      knexTracker.on('query', (query, step) => {
        expect(query.method).toBe('update');
        query.response(expectedEntity);
      });

      const actualEntity = await entityRepository.update(inputEntity);

      expect(actualEntity).toEqual(expectedEntity);
    });
  });

  afterEach(() => {
    knexTracker.uninstall();
  });

  afterAll(() => {
    KnexMock.unmock(db);
  });
});
