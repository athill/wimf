# What's in my Freezer?

Basic container inventory tracking app using Laravel and React.  

## Developing

```
$ docker-compose build

$ docker-compose run --rm composer install

$ docker-compose run --rm npm i

$ docker-compose run --rm npm run build

$ docker-compose run --rm artisan migrate

$ docker-compose up -d site
```

Site is available at http://localhost

## Todo
- [x] Filter
- [x] Client side update when adding/removing/editing items
- [x] Fix navbar links
- [x] Date Picker
- [x] split vendor in webpack
- [x] use env var to not show redux logging in production
- [ ] send email on registration
- [ ] webpack less
- [ ] export/import
- [ ] Auto-complete (typeahead)
- [ ] Category admin
- [ ] Container admin


