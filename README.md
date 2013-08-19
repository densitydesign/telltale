# MEAN Stack

MEAN is a boilerplate that provides a nice starting point for MongoDB, Node.js, Express, and AngularJS based applications.  
It is designed to give you quick and organized way to start developing of MEAN based web apps with useful modules like mongoose and passport pre-bundled and configured.  
We mainly try to take care of the connection points between existing popular frameworks and solve common integration problems.  

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/).
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/) - Make sure it's running on the default port(27017).

## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* Mongoose - Defined as npm module in the [package.json](package.json) file.
* Passport - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as bower module in the [bower.json](bower.json) file.
* Twitter Bootstrap - Defined as bower module in the [bower.json](bower.json) file.
* UI Bootstrap - Defined as bower module in the [bower.json](bower.json) file.

## Configuration
See the [config](config/) folder and especially the [config.js](config/config.js) file.

## Quick Install

 The quickest way to get started with MEAN is to clone the project and utilize it like this:

  Install dependencies:

    $ npm install

  Start the server:

    $ grunt

  When not using grunt you can use:

    $ node server

  Then open a browser and go to:
    
    http://localhost:3000
    
## Getting Started
  We pre-included an article example, check it out:
  * [The Model](app/models/article.js) - Where we define our object schema.
  * [The Controller](app/controllers/articles.js) - Where we take care of our backend logic.
  * [NodeJS Routes](config/routes.js) - Where we define our REST service routes.
  * [AngularJs Routes](public/js/config.js) - Where we define our CRUD routes.
  * [The AngularJs Service](public/js/services/articles.js) - Where we connect to our REST service.
  * [The AngularJs Controller](public/js/controllers/articles.js) - Where we take care of  our frontend logic.
  * [The AngularJs Views Folder](public/views/articles) - Where we keep our CRUD views.
  
  
## Build your _stack_

A `stack` is what we call collection of components in the client and the server, that represents a single data model. The simplest stack exposes CRUD paths to an Angular `$resource` Let's explore how to build a new `stack`. 

The best way to do it (coming soon) is to call:

  yo genrate mean:stack STACK_NAME

Until our yeoman generator is out, let's look at how we build the `articles` stack example. 
  
###1. Create your model
Let's say we want to create the stack `articles`. We start by creating the model for our book. We'll create a new file called `article.js` under `app/models`. First we need to include the `mongoose` dependencies:

  var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

Then, we need to define our schema:

  var ArticleSchema = new Schema({
    created: {type : Date, default : Date.now},
    title: {type: String, default: '', trim : true},
    content: {type: String, default: '', trim : true},
    user: {type : Schema.ObjectId, ref : 'User'}
  });
  
In addition to the obvious properties in our schema, notice we aded the `user` property, which is contains a reference to the `user` object. This will helps us figure out which users created which articles. 

We included another function to our `ArticleSchema`:

  ArticleSchema.statics = {
      load: function (id, cb) {
      this.findOne({ _id : id }).populate('user').exec(cb);
      }
  };

This function will allow us to load a specific article, and populate the article schema with the corresponding user data. 

###2. Create a controller
We create a file under `app/controllers`, and call it `articles.js`.
First, we declare our dependcies: 

  var mongoose = require('mongoose')
    , async = require('async')
    , Article = mongoose.model('Article')
    , _ = require('underscore')
(We use underscore for it's `._extend` method.)

We then expose the Mongoose methods to the `express.js` endpoint.

#####Load an entry

  exports.article = function(req, res, next, id){
      var User = mongoose.model('User')
    Article.load(id, function (err, article) {
        if (err) return next(err)
        if (!article) return next(new Error('Failed to load article ' + id))
        req.article = article
        next()
      })
  } 
  
We load the article by ID, and populate our `request` object with the article we found. Notice that since we called the `load` method we defined in the model, the request will also include the user related data for that entry.

#####Create an entry

  exports.create = function (req, res) {
      var article = new Article(req.body)
      article.user = req.user
      article.save()
      res.jsonp(article)
  }
  
This method is very straight forward - we get the article body (in `req.body`) and the user object id (in `req.user`). Later on we'll see how that data arrives from the client. 
  
#####Update an entry

  exports.update = function(req, res){
      var article = req.article
      article = _.extend(article, req.body)

      article.save(function(err) {
        res.jsonp(article)
      })
  }
We use the underscore method `_.extend` to copy the req.body into the article object, and then save the article. 
  
#####Delete an entry
  exports.destroy = function(req, res){
      var article = req.article
      article.remove(function(err){
        if (err) {
        res.render('error', {status: 500});
      } else {      
        res.jsonp(article);
      }
      })
  }

Nothing special going on here.

###3. Add authorization middlware

  exports.article = {
      hasAuthorization : function (req, res, next) {
          if (req.article.user.id != req.user.id) {
          return res.redirect('/articles/'+req.article.id)
        }
        next()
      }
    }


###4. Add Routes

To expose our contoller with Express, we'll add some new routes in the `config/routes.js` file.

First we require our controller:
  var articles = require('../app/controllers/articles')  
  
Then, let's add the routes that don't require any kind of authrization middleware.

      app.get('/articles', articles.all)
      app.get('/articles/:articleId', articles.show)

Now we'll add the routes that require middleware. 

      app.post('/articles', 
        auth.requiresLogin, 
        articles.create)
      app.put('/articles/:articleId', 
        auth.requiresLogin,     
        auth.article.hasAuthorization, 
        articles.update)
      app.del('/articles/:articleId', 
        auth.requiresLogin, 
        auth.article.hasAuthorization, 
        articles.destroy)

      app.param('articleId', articles.article)


##Middleware and Authentication



## MEAN Modules
   Mean presents a growing eco-system of MEAN based modules in the npm repository, To write (and contribute) your own MEAN based module checkout [mean-logger](https://npmjs.org/package/mean-logger) for examples.
  

## More Information

  * Visit our [Ninja's Zone](http://www.meanleanstartupmachine.com/) for extended support.
  * Visit us at [Linnovate.net](http://www.linnovate.net/).
  * Contact amos on any issue via [E-Mail](mailto:mail@amoshaviv.com), [Facebook](http://www.facebook.com/amoshaviv), or [Twitter](http://www.twitter.com/amoshaviv).

## Credits
Inspired by the great work of [Madhusudhan Srinivasa](https://github.com/madhums/)

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
