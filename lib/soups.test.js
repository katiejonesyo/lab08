const fs = require('fs');
const request = require('supertest');
const app = require('../app');
const Soups = require('../models/soups');
const pool = require('../utils/pool');

describe('tests for app.js endpoints', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));
      
  afterAll(() => pool.end());

  // Bird tests: POST, GET all, GET one, PUT, DELETE
  it('create a new soups with POST', async() => {
    const res = await request(app)
      .post('/api/v1/soups')
      .send({
        flavor: "tomato",
        savory: "hell yea",
        color: "red"
      });
  
    expect(res.body).toEqual({
        id: "1",
        flavor: "tomato",
        savory: "hell yea",
        color: "red"
    });
  });

  it('get all soups with GET', async() => {
    const soups = await Promise.all(
        [
            {
                id: "1",
                flavor: "tomato",
                savory: "hell yea",
                color: "red"
            },
            {
                id: "2",
                flavor: "butternut squash",
                savory: "definitely",
                color: "yellow"
            },
            {
                id: "3",
                flavor: "parsnip",
                savory: "eh",
                color: "white"
            }
        ].map(soups => Soups.insert(soups)));

    const res = await request(app)
      .get('/api/v1/soups');

    expect(res.body).toEqual(expect.arrayContaining(soups));
    expect(res.body).toHaveLength(soups.length);
  });

  it('get one soups via GET', async() => {
    const soups = await Soups.insert(
      {
                flavor: "tomato",
                savory: "hell yea",
                color: "red"
      }
    );

    const res = await request(app)
      .get(`/api/v1/soups/${soups.id}`);

    expect(res.body).toEqual(soups);
  });

  it('update one soups via PUT', async() => {
    const soups = await Soups.insert(
      {
            flavor: "tomato",
            savory: "hell yea",
            color: "red"
      }
    );

    const res = await request(app)
      .put(`/api/v1/soups/${soups.id}`)
      .send(
        {
            flavor: "tomato",
            savory: "hell yea",
            color: "red"
        }
      );

    expect(res.body).toEqual(
      {
        ...soups,
        flavor: "tomato",
        savory: "hell yea",
        color: "red"
      }
    );
  });

  it('delete one soups via DELETE', async() => {
    const soups = await Soups.insert(
      {
            flavor: "tomato",
            savory: "hell yea",
            color: "red"
      }
    );

    const res = await request(app)
      .delete(`/api/v1/soups/${soups.id}`);

    expect(res.body).toEqual(soups);
  });

});