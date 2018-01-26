# Echo

## Quickstart

1. Clone the repo and checkout develop
2. `npm install -g grunt-cli`
3. `npm install -g bower`
4. `npm install`
5. `bower install`
6. `grunt serve:mocks`
7. Navigate to [http://localhost:9000](http://localhost:9000)

## Core Technologies

* Angular 1.5
* Express 4.x
* Bootstrap 3.3 (LESS)
* Grunt 1.x
* Karma, Jasmine, and Protractor 3.x

## Project Structure

### Folders

```
client                                        - angular app
  app
    common                                    - when built, this code is included in all pages
      components                              - reusable components across entire app (ex. header, footer, etc...)
        {component-name}
          {component-name}.component.js
          {component-name}.component.spec.js
          {component-name}.less
          {component-name}.template.jade
        components.js                         - module that brings in all common components
      config
        api
          api-config.js                       - contains enum of all api endpoints
          api-config.spec.js
      directives                              - app should mostly contain components, however common directives will be store here
        {directive-name}
          {directive-name}.directive.js
          {directive-name}.directive.spec.js
          {directive-name}.less
          {directive-name}.template.jade
        directives.js                         - module that brings in all common directives
      filters
        {filter-name}
          {filter-name}.filter.js
          {filter-name}.filter.spec.js
        filters.js                            - module that brings in all common filters
      models
        {model-name}.model.js                 - models implemented via constructor functions and factories
        {model-name}.model.spec.js
      modules                                 - views that exist on more than one page
        {view-name}
          {view-name}.js
          {view-name}.controller.js
          {view-name}.controller.spec.js
          {view-name}.less
          {view-name}.template.jade
      services
        {service-name}
          {service-name}.service.js           - factory or service, used to communicate with an api
          {service-name}.service.spec.js
        services.js                           - module that brings in all common services
      state
          {state-name}
            {service-name}.service.js         - singleton state service to manage page state
            {service-name}.service.spec.js
          app-states.js                       - module that brings in all common state services
    less                                      - (see CSS Structure below)
    pages
      {page-name}                             - root of an individual 'Single Page Application (SPA)'
        components                            - angular components specific to page 
        {view-name}                           - views that exist only on this particular page
          {view-name}.js
          {view-name}.controller.js
          {view-name}.controller.spec.js
          {view-name}.less
          {view-name}.template.jade
        {page-name}.html                      - ng-app is on the body of this page. all scripts and css are injected here.
        {page-name}.js                        - page config (i.e. routes, etc....)
        {page-name}.controller.js
        {page-name}.controller.spec.js
        {page-name}.less                      - css scoped to this page (mobile first approach)
        {page-name}-sm.less                   - as with most other less locations in the project, optional files if media queries are needed
        {page-name}-md.less
        {page-name}-lg.less
    app.js
    app.spec.js
    version.html                              - shows the current branch name, hash, and date/time the dist was built
coverage
dist
e2e
  {directive/module/feature-name}             - all end to end (protractor) tests must live within this folder
    {directive/module/feature-name}.po.js}    - page object (http://angular.github.io/protractor/#/page-objects)
    {directive/module/feature-name}.spec.js}
server                                        - express server implementation for local dev and mocking REST-ful endpoints when necessary
  config
    env
      {env-name}.js                           - file name corresponds to NODE_ENV set. Contains proxy info, port numbers, and folder location
  data
    {root-endpoint-name}
      {endpoint-response-name}.js             - a mock data response that can be used from within a handler file
  handlers
    {handler-name}.js                         - figures out where to get data from, and exposes it through methods
  keys
  middleware
  routes.js                                   - registration of endpoints. references handler modules in handler folder
  server.js

note: excluding bower, grunt, npm items for brevity
```


### File/Folder Naming Conventions

Folders and files use dashes to separate words in a name. However, to differentiate from one js file to another, angular/logical
type extensions are added using periods before the final real file extension.

####Examples:

* folder    - `folder-name`
* component - `custom-grid.component.js`
* directive - `slider-bar.directive.js`
* model     - `user.model.js`
* service   - `auth.service.js`
* filter    - `ellipsis.filter.js`
* partial   - `header.component.html`
* style     - `slider-bar.directive.less`

By sticking to a common naming convention, it's easy to search for and to setup grunt tasks
to target specific types of files, while not having to keep all of those files in the same directory.

### CSS Structure

```
client/app/less
  bootstrap-less-overrides
    bootstrap-variable-overrides.less         - @imports
    override-{bs-filename}.less               - one to one mapping to bootstrap/less files. used to override something not achievable through variable override
  bootstrap-variable-overrides
    bootstrap-variable-overrides.less         - @imports
    override-{variables-section-name}.less    - one to one mapping of a single section in bootstraps variables.less
  bootstrap-imports.less                      - imports, bootstrap, ngmp overrides of bootstrap variables, ngmp overrides of boostrap styles
  buttons.less                                - site-wide button classes created with bootstrap mixins
  color-mappings.less                         - mappings to all colors in the site
  icons.less                                  - all 'icons' exposed as classes. could be referencing font icons, svg icons, or sprite icons
  main.less                                   - puts it all together
  typography-font-faces.less                  - use of external/custom fonts
  typography-mappings.less                    - mappings to all font sizes in the site
  zindex-mappings.less                        - mappings to all z-indices on the site
```

#### Mappings (color, typography, z-index)

The three mappings files are used to maintain related variables in one location. It provides a one-stop place to change
every color or font size on the site. By seeing all of these variables together, it also helps to derive commonalities
between elements on the site. No CSS should be placed directly in these files.

##### color-mappings
The convention for colors is to define a color palette at the top of the file. These colors
are meant to never be referenced outside of this file directly. The rest of the color-mappings file contains
sections of variables mapping a color from the palette to a variable used inside a view/directive/etc... somewhere
else in the folder structure. Prepend all color variables with `@c-`.

Example:
*color-mappings.less*
```less
@c-red-1: #F00;
@c-article-directive-header: @c-red-1;
```

*article.directive.less*
```less
.article-directive-header {
  color: @c-article-directive-header;
}
```

##### typography-mappings
Similarly to colors, font sizes and weights are all mapped from this file. There is no 'palette' defined
for font sizes, but that could easily be implemented in this file if your specific project has a clear palette
of font sizes.
Prepend all font size vairables with `@fs-` and all font weight variables with `@fw-`. This makes it easier for
auto-complete and searching.

## Grunt Tasks / Configuration

At the highest level, grunt is used to build and start an express server to serve the site during development.
It's also used to minify and deploy the site to a remote host (untethered from Grunt).

### Build Process

[TODO]

### Serve

The application is runnable from two different sets of front end files.
#### 1. /build/public
When the server is started (`grunt serve:envName`), the build process is ran, and the express server is started directly from
the `/server` folder with a dev configuration. It statically serves up the `build/public` folder.

#### 2. /dist/public
When the server is started (`grunt envName`), the build process is ran, the build is minified and copied to dist, the server and package.json are copied to dist, 
and the server is started from `/dist/server`. It statically serves up the `dist/public` folder.

## Testing

### Unit

Karma is used in conjunction with Jasmine for running and writing unit tests. Each js file that is being tested should
have a corresponding `*.spec.js` file. The grunt task `grunt build` builds the app, then runs karma tests wherever a `*.spec.js`
file can be found in client/app.

To run unit tests:

1. `grunt karma`

### E2E

Protractor is used in conjunction with Jasmine for running and writing end to end tests. All `*.spec.js` files that live in
the e2e directory will be executed.
A pattern used to create common selectors and method objects that represent a viewable page is the 'Page Object' pattern.
(http://angular.github.io/protractor/#/page-objects). These files are to be named as `*.po.js`.

To run protractor tests:

1. `grunt serve`
2. `grunt protractor`

## Debugging

### Source Maps

#### Development mode (grunt serve)

For JavaScript, source maps aren't necessary here since each javascript file is untouched and fully available in the browser
for debugging.

For CSS, since we are using the LESS preprocessor, we generate a sourceMap and place it next to the main css file. This
sourceMap file contains all of the LESS code from main.less.

* `grunt serve:mocks` - Points to local express mocks
* `grunt serve:local` - Points to http://api.local 
* `grunt serve:dev` - Points to the dev environment http://carrierportal.dev.echogl.net:81
* `grunt serve:stage` - Points to the stage environment http://carrierportal-stage.dev.echogl.net:81
* `grunt serve:test` - Points to the test environment http://test-carrapi.dev.echogl.net:81

#### Dist mode (grunt envName)

For each JavaScript file that is minified and concatenated, a source map should be generated. 

For the CSS files, a sourceMap is not included. The browser debugging tools are good enough to find what is needed. This is partially
a limitation of using cssmin since the sourceMaps generated by contrib-less don't carry over after minification.

* `grunt dev` - Points to the dev environment http://carrierportal.dev.echogl.net:81
* `grunt stage` - Points to the stage environment http://carrierportal-stage.dev.echogl.net:81
* `grunt test` - Points to the test environment http://test-carrapi.dev.echogl.net:81

### Middleman v4 Front-end Starter Kit
Middleman v4 starter kit template created for middleman front-end development.
If you wonder about middleman please [check out here](https://middlemanapp.com/)

### Quick start
`middleman init your_project_name --template=middleman-starter-kit`

More information is [here](https://middlemanapp.com/advanced/project_templates/)

### Warning
This middleman kit build on [middleman v4](https://middlemanapp.com/basics/upgrade-v4/), so maybe some [extension](https://directory.middlemanapp.com/#/extensions/all) doesn't work. Please be careful.

### What's Include
Middleman start kit template basically build on HTML5 Boilerplate front-end
template. Ready to use Rails assets file structure, Sass file structure.

- Middleman v4
- HAML
- Sass
- jQuery
- Bootstrap
- Font Awesome (CDN)
- Editor Config
- Simple sitemap helper
- humans.txt
- Open graph meta tags
- Middleman Deploy
# echo-ui

