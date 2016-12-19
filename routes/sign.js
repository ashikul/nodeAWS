var express = require('express');
var router = express.Router();
var hellosign = require('hellosign-sdk')({key: '390ccd769ca10e086147c642b4be62d8a4b60de2b8db089cfdd30bf65d80671f'});

var options = {
    test_mode : 1,
    clientId : 'YOUR_clientId',
    subject : 'My First embedded signature request',
    message : 'Awesome, right?',
    signers : [
        {
            email_address : 'alam.ashikul@gmail.com',
            name : 'Ashikul Alam'
        }
    ],
    files : ['NDA.pdf']
};

hellosign.signatureRequest.createEmbedded(options)
    .then(function(response){
        //parse response
    })
    .catch(function(err){
        //catch error
    });


/* GET sign listing. */
router.get('/', function (req, res, next) {
    res.send({
        data: 'hey123',
        test: true
    });
});

router.post('/', function (req, res, next) {
    res.send('Hello API Event Received');
});

module.exports = router;
