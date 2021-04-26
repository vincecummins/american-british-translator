'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      try {
        let locale = req.body.locale
        if (!locale) {
          return res.json({ error: 'Required field(s) missing' })
        }
        if (locale!= 'british-to-american' && locale!='american-to-british') {
          return res.json({error: 'Invalid value for locale field'})
        }
        let text = req.body.text
        if (text === '') {
          return res.json({error: 'No text to translate'})
        }
        if (!text) {
          return res.json({ error: 'Required field(s) missing' })
        }
        let translated = translator.translate(text, locale)
        return res.json({ translation: translated })
      } catch (err) {
        console.log(err);
        res.json(err)
      }
    });
};
