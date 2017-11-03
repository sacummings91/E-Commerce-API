process.env.NODE_ENV = 'test';
const HttpMock = require('node-mocks-http');
const Boom = require('boom');
const EntityController = require('./EntityController');

describe('EntityController', () => {
  const entityService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };
  const entityController = new EntityController({
    entityName: 'Entity',
    entityService
  });

  describe('create', () => {
    it('should respond with HTTP status 201 and the created entity', async () => {
      const inputEntity = {
        name: 'Some name',
        description: 'Some description'
      };

      const expectedEntity = Object.assign({}, inputEntity, { id: 1 });

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      entityService.create.mockReturnValueOnce(Promise.resolve(expectedEntity));

      await entityController.create(request, response, () => {});

      const actualEntity = JSON.parse(response._getData());

      expect(actualEntity).toEqual(expectedEntity);
      expect(response._isJSON()).toBe(true);
      expect(response._getStatusCode()).toBe(201);
      expect(response._getHeaders().Location).toBe(`/token`);
    });

    it('should respond with HTTP status 400 when underlying service detects invalid input', async () => {
      const inputEntity = {
        description: 'Some description'
      };

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      const next = jest.fn();

      entityService.create.mockReturnValueOnce(
        Promise.reject(new Error('Service.ERROR_INVALID_INPUT'))
      );

      await entityController.create(request, response, next);

      expect(next).toBeCalledWith(
        Boom.badRequest('Service.ERROR_INVALID_INPUT')
      );
    });
  });

  describe('getAll', () => {
    it('should respond with all the entities', async () => {
      const inputEntity = [
        {
          name: 'Name 1',
          description: 'Description 1'
        },
        {
          name: 'Name 2',
          description: 'Description 2'
        }
      ];

      const expectedEntity = inputEntity;

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      entityService.getAll.mockReturnValueOnce(Promise.resolve(expectedEntity));

      await entityController.getAll(request, response, () => {});

      const actualEntity = JSON.parse(response._getData());

      expect(actualEntity).toEqual(expectedEntity);
    });

    it('should respond with HTTP status 400 when underlying service detects invalid input', async () => {
      const inputEntity = {};

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      const next = jest.fn();

      entityService.getAll.mockReturnValueOnce(
        Promise.reject(new Error('Service.ERROR_UNEXPECTED'))
      );

      await entityController.getAll(request, response, next);

      expect(next).toBeCalledWith(Boom.badRequest('Service.ERROR_UNEXPECTED'));
    });
  });

  describe('getById', () => {
    it('should respond with a specific entity by id', async () => {
      const inputEntity = {
        id: 1,
        name: 'Some Name',
        description: 'Some Description'
      };

      const expectedEntity = inputEntity;

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      entityService.getById.mockReturnValueOnce(
        Promise.resolve(expectedEntity)
      );

      await entityController.getById(request, response, () => {});

      const actualEntity = JSON.parse(response._getData());

      expect(actualEntity).toEqual(expectedEntity);
    });

    it('should respond with HTTP status 400 when underlying service detects invalid input', async () => {
      const inputEntity = {};

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      const next = jest.fn();

      entityService.getById.mockReturnValueOnce(
        Promise.reject(new Error('Service.ERROR_NOT_FOUND'))
      );

      await entityController.getById(request, response, next);

      expect(next).toBeCalledWith(Boom.badRequest('Service.ERROR_NOT_FOUND'));
    });
  });

  describe('update', () => {
    it('should update a specific entity by id', async () => {
      const inputEntity = {
        name: 'Old Name'
      };

      const expectedEntity = {
        name: 'New Name'
      };

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      entityService.update.mockReturnValueOnce(Promise.resolve(expectedEntity));

      await entityController.update(request, response, () => {});

      const actualEntity = JSON.parse(response._getData());

      expect(actualEntity).toEqual(expectedEntity);
    });

    it('should respond with HTTP status 400 when underlying service detects invalid input', async () => {
      const inputEntity = {};

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      const next = jest.fn();

      entityService.update.mockReturnValueOnce(Promise.reject(new Error()));

      await entityController.update(request, response, next);

      expect(next).toBeCalledWith(Boom.badImplementation());
    });
  });

  describe('delete', () => {
    it('should delete a specific entity by id', async () => {
      const inputEntity = {
        name: 'Name 1',
        description: 'Description 1'
      };

      const expectedEntity = {};

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      entityService.delete.mockReturnValueOnce(Promise.resolve(expectedEntity));

      await entityController.delete(request, response, () => {});

      const actualEntity = JSON.parse(response._getData());

      expect(actualEntity).toEqual(expectedEntity);
    });

    it('should respond with HTTP status 400 when underlying service detects invalid input', async () => {
      const inputEntity = {};

      const request = HttpMock.createRequest({ body: inputEntity });
      const response = HttpMock.createResponse();

      const next = jest.fn();

      entityService.delete.mockReturnValueOnce(
        Promise.reject(new Error('Service.ERROR_PERMISSION_DENIED'))
      );

      await entityController.delete(request, response, next);

      expect(next).toBeCalledWith(
        Boom.forbidden('Service.ERROR_PERMISSION_DENIED')
      );
    });
  });
});
