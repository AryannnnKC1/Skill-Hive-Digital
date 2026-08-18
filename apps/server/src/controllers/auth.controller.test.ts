import test from 'node:test';
import assert from 'node:assert/strict';
import User from '../models/user.model';
import { registerController } from './auth.controller';

const originalFindOne = User.findOne;
const originalSave = (User as any).prototype.save;

test('registerController accepts name payloads and returns 201', async () => {
  (User as any).findOne = async () => null;
  (User as any).prototype.save = async function () {
    this._id = 'user-123';
    this.role = this.role || 'user';
    return this;
  };

  const statusCalls: number[] = [];
  const jsonCalls: unknown[] = [];
  const res = {
    status(code: number) {
      statusCalls.push(code);
      return this;
    },
    json(payload: unknown) {
      jsonCalls.push(payload);
      return this;
    },
    cookie() {
      return this;
    },
  } as any;

  await registerController(
    {
      body: {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'Password1!',
      },
    } as any,
    res
  );

  assert.equal(statusCalls[0], 201);
  assert.equal(jsonCalls[0].message, 'User registered successfully');
  assert.equal((jsonCalls[0] as any).user.email, 'jane@example.com');
});

test.after(() => {
  (User as any).findOne = originalFindOne;
  (User as any).prototype.save = originalSave;
});
