import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {users} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class usersRepository extends DefaultCrudRepository<
  users,
  typeof users.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(users, dataSource);
  }
}
