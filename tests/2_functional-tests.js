const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    test('Translation with text and locale fields: POST request to /api/translate',  function(done){
      const strText = 'Mangoes are my favorite fruit.';
      const strLocale = 'american-to-british';
      const strTranslation = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
      chai.request(server)
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale
        })
        .end(function(err, res){
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', "Response should be json");
          assert.property(res.body, 'translation', 'Response should contain propertie translation');
          assert.equal(res.body.translation, strTranslation, 'Response translation should be equal: "'+strTranslation+'"');
          done();
        });
      //
    });
  
    test('Translation with text and invalid locale field: POST request to /api/translate',  function(done){
      const strText = 'Mangas são a minha fruta favorita.';
      const strLocale = 'portuguese-to-british';
      chai.request(server)
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale
        })
        .end(function(err, res){
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.body.error, 'Invalid value for locale field', 'Response error should be equal: "Invalid value for locale field"');
          done();
        });
      //
    });
  
    test('Translation with missing text field: POST request to /api/translate',  function(done){
      const strLocale = 'american-to-british';
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: strLocale
        })
        .end(function(err, res){
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', "Response should be json");
          assert.property(res.body, 'error', 'Response should contain propertie error');
          assert.equal(res.body.error, 'Required field(s) missing', 'Response error should be equal: "Required field(s) missing"');
          done();
        });
    });
  
    test('Translation with missing locale field: POST request to /api/translate',  function(done){
      const strText = 'Mangoes are my favorite fruit.';
      chai.request(server)
        .post('/api/translate')
        .send({
          text: strText
        })
        .end(function(err, res){
            console.log(res.body)
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', "Response should be json");
          assert.property(res.body, 'error', 'Response should contain propertie error');
          assert.equal(res.body.error, 'Required field(s) missing', 'Response error should be equal: "Required field(s) missing"');
          done();
        });
      //
    });
  
    test('Translation with empty text: POST request to /api/translate',  function(done){
      const strText = '';
      const strLocale = 'american-to-british';
      chai.request(server)
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale
        })
        .end(function(err, res){
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', "Response should be json");
          assert.property(res.body, 'error', 'Response should contain propertie error');
          assert.equal(res.body.error, 'No text to translate', 'Response error should be equal: "No text to translate"');
          done();
        });
      //
    });
  
    test('Translation with text that needs no translation: POST request to /api/translate',  function(done){
      const strText = 'We watched the footie match for a while.';
      const strLocale = 'american-to-british';
      chai.request(server)
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale
        })
        .end(function(err, res){
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', "Response should be json");
          assert.property(res.body, 'translation', 'Response should contain propertie translation');
          assert.equal(res.body.translation, 'Everything looks good to me!', 'Response translation should be equal "Everything looks good to me!"');
          done();
        });
      //
    });
  
  });
