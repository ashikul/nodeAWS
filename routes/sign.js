var express = require('express');
var router = express.Router();
var hellosign = require('hellosign-sdk')({
    key: '390ccd769ca10e086147c642b4be62d8a4b60de2b8db089cfdd30bf65d80671f',
    client_id: 'd6549f6f55de34ef02b0b9004a97272b'
});
// var http = require('http');

// var ndapdf = require('./NDA.pdf');

// var ndapdf = express.static(__dirname + './NDA.pdf');

// var ndapdf = request('https://firebasestorage.googleapis.com/v0/b/notary-fb8b1.appspot.com/o/edinfo-sample-forms.pdf?alt=media&token=9ca9f31a-5707-45b0-b474-17adc5e8d0b1.pdf');

// var ndapdf = http.get("http://firebasestorage.googleapis.com/v0/b/notary-fb8b1.appspot.com/o/edinfo-sample-forms.pdf?alt=media&token=9ca9f31a-5707-45b0-b474-17adc5e8d0b1.pdf", function(response) {
//     response.pipe(file);
// });

// var ndapdf = '../assets/NDA.pdf';
var ndapdf = process.cwd() +  "/routes/NDA.pdf";

var options = {
    test_mode: 1,
    // client_id: 'd6549f6f55de34ef02b0b9004a97272b',
    clientId: 'd6549f6f55de34ef02b0b9004a97272b',

    // template_id : 'c0b0d6d496d11b1b365deb403580feec',
    subject: 'NDA pdf embed sign example',
    message: 'Testing examples',
    signers: [
        {
            email_address: 'jack@example.com',
            name: 'Jack',
            role: 'Manager'
        },
        {
            email_address: 'jill@example.com',
            name: 'Jill',
            role: 'Employee'
        }
    ],
    // files: ['NDA.pdf']
    files: ['routes/NDA.pdf']
};

/* GET sign listing. */
router.get('/', function (req, res, next) {
    res.send({
        data: 'hey12323',
        test: true
    });
});

router.get('/NDA', function (req, res, next) {

    var result;
    console.log('NDA!');
    console.log(ndapdf);
    // console.log(hellosign.signatureRequest.createEmbedded(options));

    hellosign.signatureRequest.createEmbedded(options)
        .then(function (response) {
            var signatureId = response.signature_request.signatures[0].signature_id;
            return hellosign.embedded.getSignUrl(signatureId);
        })
        .then(function (response) {
            console.log('URL = ' + response.embedded.sign_url);
            result = response.embedded.sign_url;
            res.send(result);
        })
        .catch(function (err) {
            //catch error
            console.log('ERROR');
            console.log(err);
        });


    // //TODO: this crap aint workgin!!!
    // return hellosign.signatureRequest.createEmbedded(options)
    //     .then(function (response) {
    //         //parse response
    //         console.log('testing signatureRequest');
    //         console.log(response);
    //         var signatureId = response.signature_request.signatures[0].signature_id;
    //         return hellosign.embedded.getSignUrl(signatureId);
    //     })
    //     .then(function (response) {
    //         console.log('URL = ' + response.embedded.sign_url);
    //         result = response.embedded.sign_url;
    //         res.send(result);
    //     })
    //     .catch(function (err) {
    //         //catch error
    //         res.send(error);
    //     });

});

router.post('/', function (req, res, next) {
    res.send('Hello API Event Received');
});

module.exports = router;
