# Website for a clothing retailer.
You can view the demo [here](http://gajaharan.com/dFashion/).

## Installation

### Clone repository and install dependencies
You must have [nodejs](https://nodejs.org/en/) and [npm](npmjs.com). Run the following commands:

```
$ git clone https://github.com/gajaharan/dFashion
$ cd OMW-basic
$ npm install
$ bower install
```

## Build the app using gulp
```
    $ gulp build
```

## Run the standalone unit tests
```
    $ gulp unit-test
```

## Run the app using gulp.
Using the following command. This will automatically open a new browers on your [localhost:8000](http://localhost:8000) address.
```
    $ gulp
```


#Technology

AngularJS and Bootstrap are the technologies used to keep within the time limit and focus on the meeting the requirement. I needed a framework to help with client side development to iterate faster user story goals while having another framework to help with making the website responsive. Also Angular uses MVC design principle. I also assumed that I just needed to read a flat file structure for the product data. I did not want to use technology stack such as express and node to mimic a web server would of taken more time. However I have implemented two services with uses http directive to read in from whatever URL or file.


#Design

The application was used with best practices I have learnt over the years for AngularJS. For example directory structure and single responsibility are very important. If you look at the source folder there is an easy structure to follow; controllers, services, partials, css, directives, etc. Also controllers will be divided into single responsibility functionality e.g. there is a product controller to handling product related data and basket controller for handling basket items. I used services to get data from external sources as well as handle the communication between product page and basket page. I have voided use the $scope and instead using alias and self(this) method.

The website design is based on research from website such as ASOS, Topman, and Sports Direct and how to make the user journey easy and informative to the user.

#Data Handling and Logic

Assumption was made that the product data and voucher business logic data are retrieved from the database. You do not want to be changing code whenever a new discount is on offer. You would assume that the data for products and vouchers (promotions) are constantly changing. I have not implemented a database and instead contain the data within json file. These files are obtain via a service and then shared between product and basket controller.

Other assumption is made around discounts:
* £5.00 off your order - The user needs to enter a discount voucher code which is stated in the promotions banner.
* '£10.00 off when you spend over £50.00' and '£15.00 off when you have bought at least one footwear item and spent over £75.00'. Both of these discounts are made automatically when certain criteria are met.


#Website Features

As a User I can view the products and their category, price and availability information.
1. As a User I can add a product to my shopping cart.
2. As a User I can remove a product from my shopping cart.
3. As a User I can view the total price for the products in my shopping cart.
4. As a User I can apply a voucher to my shopping cart.
5. As a User I can view the total price for the products in my shopping cart with discounts applied.
6. As a User I am alerted when I apply an invalid voucher to my shopping cart.
7. As a User I am unable to Out of Stock products to the shopping cart.
