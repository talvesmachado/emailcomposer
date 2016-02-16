var express = require('express');
var router = express.Router();
var Pageres = require('pageres');
var fs = require('fs');

var template = require('../models/template.js');

/*
8888888b.  8888888888 .d8888b. 88888888888           Y88b         888                                   888          888
888   Y88b 888       d88P  Y88b    888                Y88b        888                                   888          888
888    888 888       Y88b.         888                 Y88b       888                                   888          888
888   d88P 8888888    "Y888b.      888          888888  Y88b      888888 .d88b.  88888b.d88b.  88888b.  888  8888b.  888888 .d88b.  .d8888b
8888888P"  888           "Y88b.    888                  d88P      888   d8P  Y8b 888 "888 "88b 888 "88b 888     "88b 888   d8P  Y8b 88K
888 T88b   888             "888    888          888888 d88P       888   88888888 888  888  888 888  888 888 .d888888 888   88888888 "Y8888b.
888  T88b  888       Y88b  d88P    888                d88P        Y88b. Y8b.     888  888  888 888 d88P 888 888  888 Y88b. Y8b.          X88
888   T88b 8888888888 "Y8888P"     888               d88P          "Y888 "Y8888  888  888  888 88888P"  888 "Y888888  "Y888 "Y8888   88888P'
                                                                                               888
                                                                                               888
                                                                                               888
*/
router.get('/template', function(req, res, next) {
  template.find(function(err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});
router.get('/template/:id', function(req, res, next) {
  template.findById(req.params.id, function(err, post) {
    console.log(err);
    if (err) {
      if (err.name == "CastError") res.sendStatus(404);
      else return next(err)
    };
    res.json(post);
  });
});
router.post('/template', function(req, res, next) {
  template.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.put('/template/:id', function(req, res, next) {
  template.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.delete('/template/:id', function(req, res, next) {
  template.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/*
8888888 888b     d888        d8888  .d8888b.  8888888888       .d8888b.  8888888888 888b    888 8888888888 8888888b.         d8888 88888888888 .d88888b.  8888888b.
  888   8888b   d8888       d88888 d88P  Y88b 888             d88P  Y88b 888        8888b   888 888        888   Y88b       d88888     888    d88P" "Y88b 888   Y88b
  888   88888b.d88888      d88P888 888    888 888             888    888 888        88888b  888 888        888    888      d88P888     888    888     888 888    888
  888   888Y88888P888     d88P 888 888        8888888         888        8888888    888Y88b 888 8888888    888   d88P     d88P 888     888    888     888 888   d88P
  888   888 Y888P 888    d88P  888 888  88888 888             888  88888 888        888 Y88b888 888        8888888P"     d88P  888     888    888     888 8888888P"
  888   888  Y8P  888   d88P   888 888    888 888             888    888 888        888  Y88888 888        888 T88b     d88P   888     888    888     888 888 T88b
  888   888   "   888  d8888888888 Y88b  d88P 888             Y88b  d88P 888        888   Y8888 888        888  T88b   d8888888888     888    Y88b. .d88P 888  T88b
8888888 888       888 d88P     888  "Y8888P88 8888888888       "Y8888P88 8888888888 888    Y888 8888888888 888   T88b d88P     888     888     "Y88888P"  888   T88b
*/
router.get('/snapshot/:id', function(req, res, next) {
  var myURL = "localhost:4500/snapshot/" + req.params.id;
  console.log('CALLED = ' + req.params.id)

  var pageres = new Pageres({
      delay: 2
    })
    .src(myURL, ['640x580', 'iphone 4s'], {
      crop: false
    })
    .dest(__dirname + './../public/images/screens/' + req.params.id)
    .run()
    .then(function(result) {
      console.log('done');
      console.log(result);
      res.json(result)
    });
});

router.get('/sourcecode/:id', function(req, res, next) {
  //var myURL = "http://localhost:4500/snapshot/" + req.params.id;
  var output = '';
  fs.readFile(__dirname + '/../public/styles/snapshot.css', {
    encoding: 'utf-8'
  }, function(err, css) {
    output = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">' +
      '<html lang="fr">' +
      '<head>' +
      '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->' +
      '<meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->' +
      '<meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->' +
      '<title>gabs responsive</title>' +
      '<link rel="stylesheet" type="text/css" />' +
      '<style type="text/css" media="screen">'+String(css)+'</style>'+
      '</head>' +
      '<body>' +
      '<!-- background wrapper (100% background-color) -->' +
      '<table cellpadding="0" cellspacing="0" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" border="0" id="backgroundTable" width="100%">' +
      '  <tr>' +
      '<td align="center"  valign="top" class="main-td">' +
      '  <!-- MAIN WRAPPER TABLES (640px) -->' +
      '  <table align="center" cellpadding="0" cellspacing="0" border="0" class="container" width="640">' +
      '<!--  IMAGE DESKTOP => BACKGROUND ON MOBILE -->' +
      '<tr>';
    template.findById(req.params.id, function(err, post) {
      if (err) {
        if (err.name == "CastError") res.sendStatus(404);
        else return next(err)
      };
      var loadedFiles = 0;
      for (var i = 0; i <= post.list.length-1; i++) {
        fs.readFile(__dirname + '/../public' + post.list[i].type, {
          encoding: 'utf-8'
        }, function(err, data) {
          if (!err) {
            output += String(data);
            loadedFiles ++;
            if (loadedFiles == post.list.length) {
              output += '</tr>' +
                '<!--  / TEMPLATE 3 COLS -->' +
                '</table>' +
                '<!-- /MAIN WRAPPER TABLES -->' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<!-- /background wrapper -->' +
                '</body>' +
                '</html>';
              res.json(output)
            }else{
              output += '</tr>' +
                '<!--  / TEMPLATE 3 COLS -->' +
                '<tr>';
            }
          } else {
            console.log(err);
          }
        });
      };

    });
  });
});

/*
8888888888 888b     d888        d8888 8888888 888           8888888888 8888888b.         d8888 888b     d888 8888888888 888       888  .d88888b.  8888888b.  888    d8P       888888b.   888      .d88888b.   .d8888b.   .d8888b.
888        8888b   d8888       d88888   888   888           888        888   Y88b       d88888 8888b   d8888 888        888   o   888 d88P" "Y88b 888   Y88b 888   d8P        888  "88b  888     d88P" "Y88b d88P  Y88b d88P  Y88b
888        88888b.d88888      d88P888   888   888           888        888    888      d88P888 88888b.d88888 888        888  d8b  888 888     888 888    888 888  d8P         888  .88P  888     888     888 888    888 Y88b.
8888888    888Y88888P888     d88P 888   888   888           8888888    888   d88P     d88P 888 888Y88888P888 8888888    888 d888b 888 888     888 888   d88P 888d88K          8888888K.  888     888     888 888         "Y888b.
888        888 Y888P 888    d88P  888   888   888           888        8888888P"     d88P  888 888 Y888P 888 888        888d88888b888 888     888 8888888P"  8888888b         888  "Y88b 888     888     888 888            "Y88b.
888        888  Y8P  888   d88P   888   888   888           888        888 T88b     d88P   888 888  Y8P  888 888        88888P Y88888 888     888 888 T88b   888  Y88b        888    888 888     888     888 888    888       "888
888        888   "   888  d8888888888   888   888           888        888  T88b   d8888888888 888   "   888 888        8888P   Y8888 Y88b. .d88P 888  T88b  888   Y88b       888   d88P 888     Y88b. .d88P Y88b  d88P Y88b  d88P
8888888888 888       888 d88P     888 8888888 88888888      888        888   T88b d88P     888 888       888 8888888888 888P     Y888  "Y88888P"  888   T88b 888    Y88b      8888888P"  88888888 "Y88888P"   "Y8888P"   "Y8888P"
*/
router.get('/header-blocs', function(req, res, next) {
  res.json(headers);
});
router.get('/footer-blocs', function(req, res, next) {
  res.json(footers);
});
router.get('/contents-blocs', function(req, res, next) {
  res.json(contents);
});

var headers = [{
  id: 1,
  name: 'Header 100%',
  src: '/images/header.gif',
  dsc: 'Full page Header',
  srcTpl: '/images/header.gif',
  type: '/views/items/header.html',
  childs: [[]],
}];
var footers = [{
  id: 2,
  name: 'Footer100%',
  src: '/images/footer.gif',
  dsc: 'Full page Footer',
  srcTpl: '/images/footer.gif',
  type: '/views/items/footer.html',
  childs: [[]],
}];
var contents = [{
  id: 3,
  name: 'Block 100%',
  src: '/images/100.gif',
  dsc: 'Full page block',
  srcTpl: '/images/100.gif',
  type: '/views/items/100.html',
  childs: [[]],
}, {
  id: 4,
  name: 'Block 100% padded',
  src: '/images/100-brd.gif',
  dsc: 'Full page block with padding',
  srcTpl: '/images/100-brd.gif',
  type: '/views/items/100-brd.html',
  childs: [[]],
}, {
  id: 5,
  name: 'Block 50% 50%',
  src: '/images/50-50.gif',
  dsc: 'Two columns blocks',
  srcTpl: '/images/50-50.gif',
  type: '/views/items/50-50.html',
  childs: [[[]],[[]]],
}, {
  id: 6,
  name: 'Block 50% 50% padded',
  src: '/images/50-50-brd.gif',
  dsc: 'Two columns blocks with padding',
  srcTpl: '/images/50-50-brd.gif',
  type: '/views/items/50-50-brd.html',
  childs: [[[]],[[]]],
}, {
  id: 7,
  name: 'Block 70% 30%',
  src: '/images/70-30.gif',
  dsc: 'Two columns blocks with different width',
  srcTpl: '/images/70-30.gif',
  type: '/views/items/70-30.html',
  childs: [[[]],[[]]],
}, {
  id: 8,
  name: 'Block 70% 30% padded',
  src: '/images/70-30-brd.gif',
  dsc: 'Two columns blocks with different width sith padding',
  srcTpl: '/images/70-30-brd.gif',
  type: '/views/items/70-30-brd.html',
  childs: [[[]],[[]]],
}, {
  id: 9,
  name: 'Block 30% 70%',
  src: '/images/30-70.gif',
  dsc: 'Two columns blocks with different width',
  srcTpl: '/images/30-70.gif',
  type: '/views/items/30-70.html',
  childs: [[[]],[[]]],
}, {
  id: 10,
  name: 'Block 30% 70% padded',
  src: '/images/30-70-brd.gif',
  dsc: 'Two columns blocks with different width with padding',
  srcTpl: '/images/30-70-brd.gif',
  type: '/views/items/30-70-brd.html',
  childs: [[[]],[[]]],
}, {
  id: 11,
  name: 'Block 30% 30% 30%',
  src: '/images/30-30-30.gif',
  dsc: 'Three columns blocks',
  srcTpl: '/images/30-30-30.gif',
  type: '/views/items/30-30-30.html',
  childs: [[[]],[[]],[[]]],
}, ];

//#######################
module.exports = router;
