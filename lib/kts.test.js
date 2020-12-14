const fs = require('fs');
const request = require('supertest');
const app = require('../app');
const pool = require('../utils/pool');
const Kts = require('../models/kts');
const Soups = require('../models/soups');

describe('tests for app.js endpoints', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));
      
  afterAll(() => pool.end());

  // Kts tests: POST, GET all, GET one, PUT, DELETE
  it('create a new kts with POST', async() => {
    const res = await request(app)
      .post('/api/v1/kts')
      .send({
        id: "1",
        mood: "sad",
        temp: "40"
      });

    expect(res.body).toEqual({
        id: "1",
        mood: "sad",
        temp: "40"
    });
  });

  it('get all kts with GET', async() => {
    const kts = await Promise.all([
        {
            
            mood: "happy",
            temp: 12
        },
        {
            
            mood: "sad",
            temp: 40
        },
        {
          
            mood: "content",
            temp: 55
        }
    ].map(kts => Kts.insert(kts)));

    const res = await request(app)
      .get('/api/v1/kts');

    expect(res.body).toEqual(expect.arrayContaining(kts));
    expect(res.body).toHaveLength(kts.length);
  });  

  it('get one kts JOINed with soups via GET', async() => {
    await Promise.all([
        {
            
            flavor: "tomato",
            savory: "hell yea",
            color: "red"
        },
        {
           
            flavor: "butternut squash",
            savory: "definitely",
            color: "yellow"
        },
        {
           
            flavor: "parsnip",
            savory: "eh",
            color: "white"
        }
    ].map(soups => Soups.insert(soups)));

    const kts = await Kts.insert(
      {
        mood: "content",
        temp: "55",
        soups: ['tomato', 'butternut squash', 'parsnip']
      }
    );

    const res = await request(app)
      .get(`/api/v1/kts/${kts.id}`);

    expect(res.body).toEqual({
        ...kts,
      soups: expect.arrayContaining(['tomato', 'butternut squash', 'parsnip'])
    });
  });

  it('update one kts via PUT', async() => {
    const kts = await Kts.insert(
      {
        mood: "content",
        temp: "55"
      }
    );

    const res = await request(app)
      .put(`/api/v1/kts/${kts.id}`)
      .send(
        {
          mood: "content",
          temp: "55"
        }
      );

    expect(res.body).toEqual(
      {
        ...kts,
        mood: "content",
        temp: "55"

      }
    );
  });

  it('delete one kts via DELETE', async() => {
    const kts = await Kts.insert(
      {
        mood: "sad",
        temp: "40"
      }
    );

    const res = await request(app)
      .delete(`/api/v1//kts${kts.id}`);

    expect(res.text).toEqual(kts);
  });

});

