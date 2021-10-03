/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

const $ = require('jquery');
global.$ = global.jQuery = $;
require('jquery-ui');
require('bootstrap');

const routes = require('../public/js/fos_js_routes.json');
import Routing from '../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';
Routing.setRoutingData(routes);
global.Routing = Routing;

import './styles/app.scss';

// start the Stimulus application
import './bootstrap';
