import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  WhereBuilder,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {users} from '../models';
import {usersRepository} from '../repositories';

export class usersController {
  constructor(
    @repository(usersRepository)
    public usersRepository: usersRepository,
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'users model instance',
        content: {'application/json': {schema: {'x-ts-type': users}}},
      },
    },
  })
  async create(@requestBody() users: users): Promise<users> {
    return await this.usersRepository.create(users);
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'users model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(users)) where?: Where,
  ): Promise<Count> {
    return await this.usersRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of users model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': users}},
          },
        },
      },
    },
  })
  async find(@param.array('c', 'query', {type: 'number'}) customers: number[]) {
    let customerWF: any = new Object();
    customerWF = {
      where: {
        or: [],
      },
    };
    if (customers) {
      if (customers.length > 1) {
        customers.map(id => {
          customerWF.where.or.push({
            id,
          });
        });
      } else {
        customerWF.filter.or = [{id: customers[0]}];
      }
    } else {
    }
    console.log(customerWF);
    return await this.usersRepository.find(customerWF);
  } /*
  async find(
    @param.query.object('filter', getFilterSchemaFor(users)) filter?: Filter,
  ): Promise<users[]> {
    console.log(filter);
    return await this.usersRepository.find(filter);
  }
  */
  @patch('/users', {
    responses: {
      '200': {
        description: 'users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() users: users,
    @param.query.object('where', getWhereSchemaFor(users)) where?: Where,
  ): Promise<Count> {
    return await this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'users model instance',
        content: {'application/json': {schema: {'x-ts-type': users}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<users> {
    return await this.usersRepository.findById(id);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'users PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() users: users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'users DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
